import { S3 } from "@aws-sdk/client-s3";
import { exec } from "child_process";


export default async function S3Test() {

    /**
     * TODO: Debug this local error...
     // const logger = new Logger();
     * RangeError: Invalid time zone specified: :/etc/localtime,
     *  at new DateTimeFormat (<anonymous>),
     *  at #getDateFormatter (/var/task/index.js:127448:16),
     *  at #generateISOTimestampWithOffset (/var/task/index.js:127460:82),
     *  at PowertoolsLogFormatter2.formatTimestamp (/var/task/index.js:127429:54),
     *  at PowertoolsLogFormatter2.formatAttributes (/var/task/index.js:127540:27),
     *  at Logger2.createAndPopulateLogItem (/var/task/index.js:127832:39),
     *  at Logger2.processLogItem (/var/task/index.js:127870:42),
     *  at Logger2.info (/var/task/index.js:127670:14),
     *  at resolve (/var/task/index.js:128046:17),
     *  at field.resolve (/var/task/index.js:57435:22)
     */

    exec('uname -a', (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        console.log("");

        if (err) {
            // node couldn't execute the command
            return;
        }
    });
    exec('ls -l /usr/share/zoneinfo/', (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);

        if (err) {
            // node couldn't execute the command
            return;
        }
    });
    exec('ls -l /etc/localtime', (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);

        if (err) {
            // node couldn't execute the command
            return;
        }
    });
    // exec('mv /etc/localtime /etc/localtime.bak', (err, stdout, stderr) => {
    //     // the *entire* stdout and stderr (buffered)
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    //     console.log("");
    //
    //     if (err) {
    //         // node couldn't execute the command
    //         return;
    //     }
    // });
    // exec('ln -s /usr/share/zoneinfo/America/New_York /etc/localtime', (err, stdout, stderr) => {
    //     // the *entire* stdout and stderr (buffered)
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    //     console.log("");
    //
    //     if (err) {
    //         // node couldn't execute the command
    //         return;
    //     }
    // });
    // exec('ls -l /etc/localtime', (err, stdout, stderr) => {
    //     // the *entire* stdout and stderr (buffered)
    //     console.log(`stdout: ${stdout}`);
    //     // console.log(`stderr: ${stderr}`);
    //
    //     if (err) {
    //         // node couldn't execute the command
    //         return;
    //     }
    // });
    exec('date', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
    });
    exec('zdump /etc/localtime', (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);

        if (err) {
            // node couldn't execute the command
            return;
        }
    });

    let manifest_string = "",
      rural_places_string = "";

    const test = {
        "S3Test resolver can list objects in `cori-risi-app` under the examples/ prefix": false,
        "S3Test object can be encoded as a valid character string": false,
        "S3Test object is valid JSON": false
    };


    const s3 = new S3();
    const Bucket = "cori-risi-apps";
    const directory = "examples";

    try {

        /**
         * TODO: S3 List (Buckets)
         */

        /**
         * TODO: S3 List (Data)
         */

        console.log(`s3.listObjectsV2("${Bucket}", "${directory}")...`);

        /**
         * S3 List (Objects)
         */
        const s3_object_list = await (s3.listObjectsV2({
            Bucket,
            Prefix: `${directory}`,
        }));
        // ... works, but the file keys are returned as a partial list without
        // specified order; set is not guaranteed (i.e. testable)

        if (typeof s3_object_list.Contents !== "object" || s3_object_list.Contents?.length === 0) {
            console.log(`No objects found under s3://${Bucket}/${directory}`);
        } else {
            s3_object_list.Contents.forEach(c => {
                console.log(c.Key?.toString() || "");
            });

            test[
              "S3Test resolver can list objects in `cori-risi-app` under the examples/ prefix"
              ] = true;
        }

        console.log(`s3.getObject(${Bucket}, "manifest.json")...`);

        /**
         * S3 Get (Data)
         */
        const manifest_json =  (await s3.getObject({
            Bucket,
            Key: "manifest.json"
        }));

        manifest_string = (typeof manifest_json.Body === "object") ?
          (await manifest_json.Body?.transformToString()) :
          `{ "Error": "S3 object Body is undefined" }`;

        const rural_places_json =  (await s3.getObject({
            Bucket,
            Key: directory + "/who-wins-b2s/rural_places_2500_plus.json"
        }));

        rural_places_string = (typeof rural_places_json.Body === "object") ?
          (await rural_places_json.Body?.transformToString()) :
          `{ "Error": "S3 object Body is undefined" }`;

        test[
          "S3Test object can be encoded as a valid character string"
          ] = true;

        const rural_places =  JSON.parse(rural_places_string);

        if (!!rural_places && typeof rural_places === "object") {
            test[
              "S3Test object is valid JSON"
              ] = true;
        }

    } catch (e: any) {

        console.error(e.toString());
        manifest_string = `{ "Error": "${e.toString()}" }`;

    } finally {

        console.log(`S3 object Body:
${manifest_string}
`);

        console.log(test);

    }

    // return ({
    //     "type": "s3_test",
    //     "message": "test",
    //     "test": test
    // });

    return ({
        "type": "s3_test",
        "message": manifest_string,
        "test": test,
    });
}
