"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = S3ListData;
const client_s3_1 = require("@aws-sdk/client-s3");
let manifest_string = "";
const test = {
    "S3ListData resolver can list objects": false,
    "S3ListData manifest can be encoded as a valid character string": false,
    "S3ListData manifest object is valid JSON": false,
    "S3ListData manifest contains valid list of data": false
};
const s3 = new client_s3_1.S3();
async function S3ListData(Bucket = "cori-risi-apps", container_name) {
    // const container_name = "examples";
    try {
        /**
         * TODO: Find manifest for container name
         */
        // 1) Does container_name have value?
        const name = (!!container_name && container_name.length > 0) ?
            container_name :
            // 1a.) if not, only get manifest for bucket (constant for now)
            "";
        let path_to_manifest = (!!name) ? name + "/manifest.json" : "manifest.json"; // "";
        /**
         * TODO: page through s3_object_list.Contents when there are more than limit of single req/res
         */
        // 2: List objects in container name
        console.log(`s3.listObjectsV2(${Bucket}, "${name}")...`);
        const s3_object_list = await (s3.listObjectsV2({
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
        }
        else {
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
            test["S3ListData resolver can list objects"] = true;
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
        test["S3ListData manifest can be encoded as a valid character string"] = true;
        const manifest = JSON.parse(manifest_string);
        if (!manifest || typeof manifest !== "object") {
            // 4a.) manifest is not valid json
            return ({
                type: "s3_list_data",
                list: [],
                test: test
            });
        }
        else {
            test["S3ListData manifest object is valid JSON"] = true;
            // 5) Does manifest contain data list?
            const list = (!!manifest.hasOwnProperty("data")
                && typeof manifest["data"] === "object"
                && manifest["data"].length > 0) ? (() => {
                test["S3ListData manifest contains valid list of data"] = true;
                // 5a) list the data
                return manifest["data"];
            })() : [];
            // 6) Do subdirectories contain data?
            if (!!manifest.hasOwnProperty("directories")
                && typeof manifest["directories"] === "object"
                && manifest["directories"].length > 0) {
                // 6a) Call this function for each directory listed
                const list_dir_data = (await Promise.all(manifest["directories"].map((d) => S3ListData(Bucket, (!!name) ? name + "/" + d : d))));
                // console.log("FOUND:", list_dir_data);
                return ({
                    type: "s3_list_data",
                    list: [
                        ...list,
                        ...list_dir_data.reduce((prev, curr) => {
                            // console.log(prev, curr);
                            if (curr.hasOwnProperty("list") && curr["list"].length > 0) {
                                return (prev.hasOwnProperty("length") && prev.length > 0) ? [
                                    ...prev,
                                    ...curr["list"]
                                ] : [
                                    ...curr["list"]
                                ];
                            }
                            else {
                                return prev;
                            }
                        }, {})
                    ],
                    test: test
                });
            }
            else {
                // 6a) manifest does not list directories
                return ({
                    type: "s3_list_data",
                    list: list,
                    test: test
                });
            }
        }
    }
    catch (e) {
        console.error(e.toString());
        manifest_string = `{ "Error": "${e.toString()}" }`;
    }
    finally {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNMaXN0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL1MzTGlzdERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFjQSw2QkE0TEM7QUExTUQsa0RBQXdDO0FBR3hDLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUV6QixNQUFNLElBQUksR0FBRztJQUNULHNDQUFzQyxFQUFFLEtBQUs7SUFDN0MsZ0VBQWdFLEVBQUUsS0FBSztJQUN2RSwwQ0FBMEMsRUFBRSxLQUFLO0lBQ2pELGlEQUFpRCxFQUFFLEtBQUs7Q0FDM0QsQ0FBQztBQUVGLE1BQU0sRUFBRSxHQUFHLElBQUksY0FBRSxFQUFFLENBQUM7QUFFTCxLQUFLLFVBQVUsVUFBVSxDQUFFLFNBQWlCLGdCQUFnQixFQUFFLGNBQXVCO0lBRWhHLHFDQUFxQztJQUVyQyxJQUFJLENBQUM7UUFFRDs7V0FFRztRQUVILHFDQUFxQztRQUNyQyxNQUFNLElBQUksR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLGNBQWMsQ0FBQyxDQUFDO1lBQ2hCLCtEQUErRDtZQUMvRCxFQUFFLENBQUM7UUFFTCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFFLE1BQU07UUFFcEY7O1dBRUc7UUFDSCxvQ0FBb0M7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLENBQUM7UUFFekQsTUFBTSxjQUFjLEdBQUcsTUFBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDMUMsTUFBTTtZQUNOLE1BQU0sRUFBRSxHQUFHLElBQUks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QUVQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTMyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcblxuXG5sZXQgbWFuaWZlc3Rfc3RyaW5nID0gXCJcIjtcblxuY29uc3QgdGVzdCA9IHtcbiAgICBcIlMzTGlzdERhdGEgcmVzb2x2ZXIgY2FuIGxpc3Qgb2JqZWN0c1wiOiBmYWxzZSxcbiAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY2FuIGJlIGVuY29kZWQgYXMgYSB2YWxpZCBjaGFyYWN0ZXIgc3RyaW5nXCI6IGZhbHNlLFxuICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiOiBmYWxzZSxcbiAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY29udGFpbnMgdmFsaWQgbGlzdCBvZiBkYXRhXCI6IGZhbHNlXG59O1xuXG5jb25zdCBzMyA9IG5ldyBTMygpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBTM0xpc3REYXRhIChCdWNrZXQ6IHN0cmluZyA9IFwiY29yaS1yaXNpLWFwcHNcIiwgY29udGFpbmVyX25hbWU/OiBzdHJpbmcpIHtcblxuICAgIC8vIGNvbnN0IGNvbnRhaW5lcl9uYW1lID0gXCJleGFtcGxlc1wiO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzogRmluZCBtYW5pZmVzdCBmb3IgY29udGFpbmVyIG5hbWVcbiAgICAgICAgICovXG5cbiAgICAgICAgLy8gMSkgRG9lcyBjb250YWluZXJfbmFtZSBoYXZlIHZhbHVlP1xuICAgICAgICBjb25zdCBuYW1lOiBzdHJpbmcgPSAoISFjb250YWluZXJfbmFtZSAmJiBjb250YWluZXJfbmFtZS5sZW5ndGggPiAwKSA/XG4gICAgICAgICAgY29udGFpbmVyX25hbWUgOlxuICAgICAgICAgIC8vIDFhLikgaWYgbm90LCBvbmx5IGdldCBtYW5pZmVzdCBmb3IgYnVja2V0IChjb25zdGFudCBmb3Igbm93KVxuICAgICAgICAgIFwiXCI7XG5cbiAgICAgICAgbGV0IHBhdGhfdG9fbWFuaWZlc3QgPSAoISFuYW1lKSA/IG5hbWUgKyBcIi9tYW5pZmVzdC5qc29uXCIgOiBcIm1hbmlmZXN0Lmpzb25cIjsgIC8vIFwiXCI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IHBhZ2UgdGhyb3VnaCBzM19vYmplY3RfbGlzdC5Db250ZW50cyB3aGVuIHRoZXJlIGFyZSBtb3JlIHRoYW4gbGltaXQgb2Ygc2luZ2xlIHJlcS9yZXNcbiAgICAgICAgICovXG4gICAgICAgIC8vIDI6IExpc3Qgb2JqZWN0cyBpbiBjb250YWluZXIgbmFtZVxuICAgICAgICBjb25zb2xlLmxvZyhgczMubGlzdE9iamVjdHNWMigke0J1Y2tldH0sIFwiJHtuYW1lfVwiKS4uLmApO1xuXG4gICAgICAgIGNvbnN0IHMzX29iamVjdF9saXN0ID0gYXdhaXQoczMubGlzdE9iamVjdHNWMih7XG4gICAgICAgICAgICBCdWNrZXQsXG4gICAgICAgICAgICBQcmVmaXg6IGAke25hbWV9YCxcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyAuLi4gd29ya3MsIGJ1dCB0aGUgZmlsZSBrZXlzIGFyZSByZXR1cm5lZCBhcyBhIHBhcnRpYWwgbGlzdCB3aXRob3V0XG4gICAgICAgIC8vIHNwZWNpZmllZCBvcmRlcjsgc2V0IGlzIG5vdCBndWFyYW50ZWVkIChpLmUuIHRlc3RhYmxlKVxuXG4gICAgICAgIC8vIC8vIFRPRE86IDM6IElzIG1hbmlmZXN0Lmpzb24gaW4gdGhlIGxpc3Qgb2Ygb2JqZWN0cz9cbiAgICAgICAgLy8gbGV0IHBhdGhfdG9fbWFuaWZlc3QgPSBcIlwiO1xuICAgICAgICBpZiAodHlwZW9mIHMzX29iamVjdF9saXN0LkNvbnRlbnRzICE9PSBcIm9iamVjdFwiIHx8IHMzX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9LyR7bmFtZX1gKTtcbiAgICAgICAgICAgIC8vICAzYS4pIE5vIG1hbmlmZXN0IGZvdW5kLCBzbyB3aWxsIG5vdCBjb250aW51ZSAoZGF0YSBoYXMgbm90IGJlZW4gaW5kZXhlZCBmb3IgdGhpcyBjb250YWluZXIpXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInMzX2xpc3RfZGF0YVwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKGF3YWl0IHMzX29iamVjdF9saXN0LkNvbnRlbnRzKS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRfcGF0aCA9IGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyX3BhdGhfcmVnZXggPSAoISFuYW1lKSA/XG4gICAgICAgICAgICAgICAgICBSZWdFeHAoYF4ke25hbWV9L21hbmlmZXN0YCkgOiAvXm1hbmlmZXN0LztcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2hlY2sgbWF0Y2ggZm9yIGNvbnRlbnRfbmFtZTpcIiwgY29udGVudF9wYXRoLm1hdGNoKGNvbnRhaW5lcl9wYXRoX3JlZ2V4KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudF9wYXRoLm1hdGNoKGNvbnRhaW5lcl9wYXRoX3JlZ2V4KSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1hbmlmZXN0Lmpzb24hXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aF90b19tYW5pZmVzdCA9IGNvbnRlbnRfcGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgXCJTM0xpc3REYXRhIHJlc29sdmVyIGNhbiBsaXN0IG9iamVjdHNcIlxuICAgICAgICAgICAgICBdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAzYS4pIE5vIG1hbmlmZXN0IGZvdW5kLCBzbyB3aWxsIG5vdCBjb250aW51ZSAoZGF0YSBoYXMgbm90IGJlZW4gaW5kZXhlZCBmb3IgdGhpcyBjb250YWluZXIpXG4gICAgICAgIGlmICghcGF0aF90b19tYW5pZmVzdCB8fCBwYXRoX3RvX21hbmlmZXN0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiczNfbGlzdF9kYXRhXCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW10sXG4gICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA0OiBGZXRjaCBtYW5pZmVzdCBhbmQgY29udmVydCB0byBqc29uXG5cbiAgICAgICAgY29uc29sZS5sb2coYHMzLmdldE9iamVjdChcIiR7QnVja2V0fVwiLCBcIiR7cGF0aF90b19tYW5pZmVzdH1cIikuLi5gKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUzMgR2V0IChEYXRhKVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgbWFuaWZlc3RfanNvbiA9IChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgICAgICAgQnVja2V0LFxuICAgICAgICAgICAgS2V5OiBwYXRoX3RvX21hbmlmZXN0XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYW5pZmVzdF9zdHJpbmcgPSAodHlwZW9mIG1hbmlmZXN0X2pzb24uQm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICAgIChhd2FpdCBtYW5pZmVzdF9qc29uLkJvZHk/LnRyYW5zZm9ybVRvU3RyaW5nKCkpIDpcbiAgICAgICAgICBgeyBcIkVycm9yXCI6IFwiUzNMaXN0RGF0YSBvYmplY3QgQm9keSBpcyB1bmRlZmluZWQgZm9yICR7cGF0aF90b19tYW5pZmVzdH1cIiB9YDtcblxuICAgICAgICB0ZXN0W1xuICAgICAgICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBjYW4gYmUgZW5jb2RlZCBhcyBhIHZhbGlkIGNoYXJhY3RlciBzdHJpbmdcIlxuICAgICAgICAgIF0gPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gSlNPTi5wYXJzZShtYW5pZmVzdF9zdHJpbmcpO1xuXG4gICAgICAgIGlmICghbWFuaWZlc3QgfHwgdHlwZW9mIG1hbmlmZXN0ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAvLyA0YS4pIG1hbmlmZXN0IGlzIG5vdCB2YWxpZCBqc29uXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInMzX2xpc3RfZGF0YVwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXN0W1xuICAgICAgICAgICAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3Qgb2JqZWN0IGlzIHZhbGlkIEpTT05cIlxuICAgICAgICAgICAgICBdID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gNSkgRG9lcyBtYW5pZmVzdCBjb250YWluIGRhdGEgbGlzdD9cbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSAoXG4gICAgICAgICAgICAgICEhbWFuaWZlc3QuaGFzT3duUHJvcGVydHkoXCJkYXRhXCIpXG4gICAgICAgICAgICAgICYmIHR5cGVvZiBtYW5pZmVzdFtcImRhdGFcIl0gPT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgJiYgbWFuaWZlc3RbXCJkYXRhXCJdLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICkgPyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRlc3RbXG4gICAgICAgICAgICAgICAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY29udGFpbnMgdmFsaWQgbGlzdCBvZiBkYXRhXCJcbiAgICAgICAgICAgICAgICAgIF0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gNWEpIGxpc3QgdGhlIGRhdGFcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFuaWZlc3RbXCJkYXRhXCJdO1xuICAgICAgICAgICAgfSkoKSA6IFtdO1xuXG4gICAgICAgICAgICAvLyA2KSBEbyBzdWJkaXJlY3RvcmllcyBjb250YWluIGRhdGE/XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICEhbWFuaWZlc3QuaGFzT3duUHJvcGVydHkoXCJkaXJlY3Rvcmllc1wiKVxuICAgICAgICAgICAgICAmJiB0eXBlb2YgbWFuaWZlc3RbXCJkaXJlY3Rvcmllc1wiXSA9PT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgICAmJiBtYW5pZmVzdFtcImRpcmVjdG9yaWVzXCJdLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIDZhKSBDYWxsIHRoaXMgZnVuY3Rpb24gZm9yIGVhY2ggZGlyZWN0b3J5IGxpc3RlZFxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RfZGlyX2RhdGEgPSAoYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgICAgICBtYW5pZmVzdFtcImRpcmVjdG9yaWVzXCJdLm1hcCgoZDogc3RyaW5nKSA9PiBTM0xpc3REYXRhKEJ1Y2tldCwgKCEhbmFtZSkgPyBuYW1lICsgXCIvXCIgKyBkIDogZCkpXG4gICAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkZPVU5EOlwiLCBsaXN0X2Rpcl9kYXRhKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInMzX2xpc3RfZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICAgICAgICAgICAgLi4ubGlzdCxcbiAgICAgICAgICAgICAgICAgICAgICAuLi5saXN0X2Rpcl9kYXRhLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByZXYsIGN1cnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyLmhhc093blByb3BlcnR5KFwibGlzdFwiKSAmJiBjdXJyW1wibGlzdFwiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocHJldi5oYXNPd25Qcm9wZXJ0eShcImxlbmd0aFwiKSAmJiBwcmV2Lmxlbmd0aCA+IDApID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3VycltcImxpc3RcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jdXJyW1wibGlzdFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyA2YSkgbWFuaWZlc3QgZG9lcyBub3QgbGlzdCBkaXJlY3Rvcmllc1xuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInMzX2xpc3RfZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OiBsaXN0LFxuICAgICAgICAgICAgICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcblxuICAgICAgICBjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XG4gICAgICAgIG1hbmlmZXN0X3N0cmluZyA9IGB7IFwiRXJyb3JcIjogXCIke2UudG9TdHJpbmcoKX1cIiB9YDtcblxuICAgIH0gZmluYWxseSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFMzTGlzdERhdGEgbWFuaWZlc3QgQm9keTpcbiR7bWFuaWZlc3Rfc3RyaW5nfVxuYCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGVzdCk7XG5cbiAgICB9XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZXJlIHdhcyBwcm9iYWJseSBhbiBlcnJvciBhYm92ZVxuICAgIHJldHVybiAoe1xuICAgICAgICB0eXBlOiBcInMzX2xpc3RfZGF0YVwiLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdGVzdDogdGVzdFxuICAgIH0pO1xuXG59XG4iXX0=