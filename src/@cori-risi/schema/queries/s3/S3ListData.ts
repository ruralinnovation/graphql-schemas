import { S3 } from "@aws-sdk/client-s3";


let manifest_string = "";

const test = {
    "S3ListData resolver can list objects": false,
    "S3ListData manifest can be encoded as a valid character string": false,
    "S3ListData manifest object is valid JSON": false,
    "S3ListData manifest contains valid list of data": false
};

const s3 = new S3();

export default async function S3ListData (Bucket: string = "cori-risi-apps", container_name?: string) {

    // const container_name = "examples";

    try {

        /**
         * TODO: Find manifest for container name
         */

        // 1) Does container_name have value?
        const name: string = (!!container_name && container_name.length > 0) ?
          container_name :
          // 1a.) if not, only get manifest for bucket (constant for now)
          "";

        let path_to_manifest = (!!name) ? name + "/manifest.json" : "manifest.json";  // "";

        /**
         * TODO: page through s3_object_list.Contents when there are more than limit of single req/res
         */
        // 2: List objects in container name
        console.log(`s3.listObjectsV2(${Bucket}, "${name}")...`);

        const s3_object_list = await(s3.listObjectsV2({
            Bucket,
            Prefix: `${name}`,
        }));
        // ... works, but the file keys are returned as a partial list without
        // specified order; set is not guaranteed (i.e. testable)

        // // TODO: 3: Is manifest.json in the list of objects?
        // let path_to_manifest = "";
        if (typeof s3_object_list.Contents !== "object" || s3_object_list.Contents?.length === 0) {
            console.log(`No objects found under s3://${Bucket}/${name}`);
            //  3a.) No manifest found, so will not continue (data has not been indexed for this container)
            return ({
                type: "s3_list_data",
                list: [],
                test: test
            });
        } else {
            (await s3_object_list.Contents).forEach(c => {
                // console.log(c.Key?.toString() || "");
                const content_path = c.Key?.toString() || "";
                const container_path_regex = (!!name) ?
                  RegExp(`^${name}/manifest`) : /^manifest/;

                // console.log("Check match for content_name:", content_path.match(container_path_regex));

                if (content_path.match(container_path_regex) !== null) {
                    console.log("found manifest.json!");
                    let path_to_manifest = content_path;
                }
            });

            test[
              "S3ListData resolver can list objects"
              ] = true;
        }

        //  3a.) No manifest found, so will not continue (data has not been indexed for this container)
        if (!path_to_manifest || path_to_manifest.length < 1) {
            return ({
                type: "s3_list_data",
                list: [],
                test: test
            });
        }

        // 4: Fetch manifest and convert to json

        console.log(`s3.getObject("${Bucket}", "${path_to_manifest}")...`);

        /**
         * S3 Get (Data)
         */
        const manifest_json = (await s3.getObject({
            Bucket,
            Key: path_to_manifest
        }));

        manifest_string = (typeof manifest_json.Body === "object") ?
          (await manifest_json.Body?.transformToString()) :
          `{ "Error": "S3ListData object Body is undefined for ${path_to_manifest}" }`;

        test[
          "S3ListData manifest can be encoded as a valid character string"
          ] = true;

        const manifest = JSON.parse(manifest_string);

        if (!manifest || typeof manifest !== "object") {
            // 4a.) manifest is not valid json
            return ({
                type: "s3_list_data",
                list: [],
                test: test
            });

        } else {
            test[
              "S3ListData manifest object is valid JSON"
              ] = true;

            // 5) Does manifest contain data list?
            if (
              !manifest.hasOwnProperty("data")
              || typeof manifest["data"] !== "object"
              || manifest["data"].length < 1
            ) {
                // 5a) manifest does not list data, so check the directory list
                if (
                  !manifest.hasOwnProperty("directories")
                  || typeof manifest["directories"] !== "object"
                  || manifest["directories"].length < 1
                ) {
                    // 5b) manifest does not list directories
                    return ({
                        type: "s3_list_data",
                        list: [],
                        test: test
                    });
                } else {
                    // 5b) Call this function for each directory listed
                    const list_dir_data = (await Promise.all(
                      manifest["directories"].map((d: string) => S3ListData(Bucket, (!!name) ? name + "/" + d : d))
                    ));

                    // console.log("FOUND:", list_dir_data);

                    return ({
                        type: "s3_list_data",
                        list: [
                          ...list_dir_data.reduce((prev, curr) => {
                                // console.log(prev, curr);
                                if (curr.hasOwnProperty("list") && curr["list"].length > 0) {
                                    return (prev.hasOwnProperty("length") && prev.length > 0) ? [
                                      ...prev,
                                      ...curr["list"]
                                    ] : [
                                      ...curr["list"]
                                    ];
                                } else {
                                    return prev;
                                }
                            }, {})
                        ],
                        test: test
                    });

                }
            } else {
                test[
                  "S3ListData manifest contains valid list of data"
                  ] = true;

                // 6 list the data
                return ({
                    type: "s3_list_data",
                    list: manifest["data"],
                    test: test
                });
            }
        }

    } catch (e: any) {

        console.error(e.toString());
        manifest_string = `{ "Error": "${e.toString()}" }`;

    } finally {

        console.log(`S3ListData manifest Body:
${manifest_string}
`);

        console.log(test);

    }

    // At this point there was probably an error above
    return ({
        type: "s3_list_data",
        list: [],
        test: test
    });

}
