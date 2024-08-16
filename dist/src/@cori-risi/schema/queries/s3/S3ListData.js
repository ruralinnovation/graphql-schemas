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
        console.log(`s3.listObjectsV2("${Bucket}", "${name}")...`);
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
                type: "S3DataList",
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
                type: "S3DataList",
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
                type: "S3DataList",
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
                    type: "S3DataList",
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
                    type: "S3DataList",
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
        type: "S3DataList",
        list: [],
        test: test
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNMaXN0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL1MzTGlzdERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQkEsNkJBK0xDO0FBbk5ELGtEQUF3QztBQUd4QyxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFFekIsTUFBTSxJQUFJLEdBQUc7SUFDVCxzQ0FBc0MsRUFBRSxLQUFLO0lBQzdDLGdFQUFnRSxFQUFFLEtBQUs7SUFDdkUsMENBQTBDLEVBQUUsS0FBSztJQUNqRCxpREFBaUQsRUFBRSxLQUFLO0NBQzNELENBQUM7QUFFRixNQUFNLEVBQUUsR0FBRyxJQUFJLGNBQUUsRUFBRSxDQUFDO0FBUUwsS0FBSyxVQUFVLFVBQVUsQ0FDdEMsU0FBaUIsZ0JBQWdCLEVBQ2pDLGNBQXVCO0lBR3JCLHFDQUFxQztJQUVyQyxJQUFJLENBQUM7UUFFRDs7V0FFRztRQUVILHFDQUFxQztRQUNyQyxNQUFNLElBQUksR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLGNBQWMsQ0FBQyxDQUFDO1lBQ2hCLCtEQUErRDtZQUMvRCxFQUFFLENBQUM7UUFFTCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFFLE1BQU07UUFFcEY7O1dBRUc7UUFDSCxvQ0FBb0M7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsTUFBTSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUM7UUFFM0QsTUFBTSxjQUFjLEdBQUcsTUFBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDMUMsTUFBTTtZQUNOLE1BQU0sRUFBRSxHQUFHLElB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QztBQUVQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTMyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcblxuXG5sZXQgbWFuaWZlc3Rfc3RyaW5nID0gXCJcIjtcblxuY29uc3QgdGVzdCA9IHtcbiAgICBcIlMzTGlzdERhdGEgcmVzb2x2ZXIgY2FuIGxpc3Qgb2JqZWN0c1wiOiBmYWxzZSxcbiAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY2FuIGJlIGVuY29kZWQgYXMgYSB2YWxpZCBjaGFyYWN0ZXIgc3RyaW5nXCI6IGZhbHNlLFxuICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiOiBmYWxzZSxcbiAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY29udGFpbnMgdmFsaWQgbGlzdCBvZiBkYXRhXCI6IGZhbHNlXG59O1xuXG5jb25zdCBzMyA9IG5ldyBTMygpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFMzRGF0YUxpc3Qge1xuICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiO1xuICAgIGxpc3Q6IGFueVtdLFxuICAgIHRlc3Q6IGFueVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBTM0xpc3REYXRhIChcbiAgQnVja2V0OiBzdHJpbmcgPSBcImNvcmktcmlzaS1hcHBzXCIsXG4gIGNvbnRhaW5lcl9uYW1lPzogc3RyaW5nXG4pOiBQcm9taXNlPFMzRGF0YUxpc3Q+ICB7XG5cbiAgICAvLyBjb25zdCBjb250YWluZXJfbmFtZSA9IFwiZXhhbXBsZXNcIjtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IEZpbmQgbWFuaWZlc3QgZm9yIGNvbnRhaW5lciBuYW1lXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8vIDEpIERvZXMgY29udGFpbmVyX25hbWUgaGF2ZSB2YWx1ZT9cbiAgICAgICAgY29uc3QgbmFtZTogc3RyaW5nID0gKCEhY29udGFpbmVyX25hbWUgJiYgY29udGFpbmVyX25hbWUubGVuZ3RoID4gMCkgP1xuICAgICAgICAgIGNvbnRhaW5lcl9uYW1lIDpcbiAgICAgICAgICAvLyAxYS4pIGlmIG5vdCwgb25seSBnZXQgbWFuaWZlc3QgZm9yIGJ1Y2tldCAoY29uc3RhbnQgZm9yIG5vdylcbiAgICAgICAgICBcIlwiO1xuXG4gICAgICAgIGxldCBwYXRoX3RvX21hbmlmZXN0ID0gKCEhbmFtZSkgPyBuYW1lICsgXCIvbWFuaWZlc3QuanNvblwiIDogXCJtYW5pZmVzdC5qc29uXCI7ICAvLyBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBwYWdlIHRocm91Z2ggczNfb2JqZWN0X2xpc3QuQ29udGVudHMgd2hlbiB0aGVyZSBhcmUgbW9yZSB0aGFuIGxpbWl0IG9mIHNpbmdsZSByZXEvcmVzXG4gICAgICAgICAqL1xuICAgICAgICAvLyAyOiBMaXN0IG9iamVjdHMgaW4gY29udGFpbmVyIG5hbWVcbiAgICAgICAgY29uc29sZS5sb2coYHMzLmxpc3RPYmplY3RzVjIoXCIke0J1Y2tldH1cIiwgXCIke25hbWV9XCIpLi4uYCk7XG5cbiAgICAgICAgY29uc3QgczNfb2JqZWN0X2xpc3QgPSBhd2FpdChzMy5saXN0T2JqZWN0c1YyKHtcbiAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIFByZWZpeDogYCR7bmFtZX1gLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIC4uLiB3b3JrcywgYnV0IHRoZSBmaWxlIGtleXMgYXJlIHJldHVybmVkIGFzIGEgcGFydGlhbCBsaXN0IHdpdGhvdXRcbiAgICAgICAgLy8gc3BlY2lmaWVkIG9yZGVyOyBzZXQgaXMgbm90IGd1YXJhbnRlZWQgKGkuZS4gdGVzdGFibGUpXG5cbiAgICAgICAgLy8gLy8gVE9ETzogMzogSXMgbWFuaWZlc3QuanNvbiBpbiB0aGUgbGlzdCBvZiBvYmplY3RzP1xuICAgICAgICAvLyBsZXQgcGF0aF90b19tYW5pZmVzdCA9IFwiXCI7XG4gICAgICAgIGlmICh0eXBlb2YgczNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgczNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vJHtuYW1lfWApO1xuICAgICAgICAgICAgLy8gIDNhLikgTm8gbWFuaWZlc3QgZm91bmQsIHNvIHdpbGwgbm90IGNvbnRpbnVlIChkYXRhIGhhcyBub3QgYmVlbiBpbmRleGVkIGZvciB0aGlzIGNvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKGF3YWl0IHMzX29iamVjdF9saXN0LkNvbnRlbnRzKS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRfcGF0aCA9IGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyX3BhdGhfcmVnZXggPSAoISFuYW1lKSA/XG4gICAgICAgICAgICAgICAgICBSZWdFeHAoYF4ke25hbWV9L21hbmlmZXN0YCkgOiAvXm1hbmlmZXN0LztcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2hlY2sgbWF0Y2ggZm9yIGNvbnRlbnRfbmFtZTpcIiwgY29udGVudF9wYXRoLm1hdGNoKGNvbnRhaW5lcl9wYXRoX3JlZ2V4KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudF9wYXRoLm1hdGNoKGNvbnRhaW5lcl9wYXRoX3JlZ2V4KSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1hbmlmZXN0Lmpzb24hXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aF90b19tYW5pZmVzdCA9IGNvbnRlbnRfcGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgXCJTM0xpc3REYXRhIHJlc29sdmVyIGNhbiBsaXN0IG9iamVjdHNcIlxuICAgICAgICAgICAgICBdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAzYS4pIE5vIG1hbmlmZXN0IGZvdW5kLCBzbyB3aWxsIG5vdCBjb250aW51ZSAoZGF0YSBoYXMgbm90IGJlZW4gaW5kZXhlZCBmb3IgdGhpcyBjb250YWluZXIpXG4gICAgICAgIGlmICghcGF0aF90b19tYW5pZmVzdCB8fCBwYXRoX3RvX21hbmlmZXN0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNDogRmV0Y2ggbWFuaWZlc3QgYW5kIGNvbnZlcnQgdG8ganNvblxuXG4gICAgICAgIGNvbnNvbGUubG9nKGBzMy5nZXRPYmplY3QoXCIke0J1Y2tldH1cIiwgXCIke3BhdGhfdG9fbWFuaWZlc3R9XCIpLi4uYCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFMzIEdldCAoRGF0YSlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0X2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIEtleTogcGF0aF90b19tYW5pZmVzdFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFuaWZlc3Rfc3RyaW5nID0gKHR5cGVvZiBtYW5pZmVzdF9qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgICAgICAoYXdhaXQgbWFuaWZlc3RfanNvbi5Cb2R5Py50cmFuc2Zvcm1Ub1N0cmluZygpKSA6XG4gICAgICAgICAgYHsgXCJFcnJvclwiOiBcIlMzTGlzdERhdGEgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkIGZvciAke3BhdGhfdG9fbWFuaWZlc3R9XCIgfWA7XG5cbiAgICAgICAgdGVzdFtcbiAgICAgICAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY2FuIGJlIGVuY29kZWQgYXMgYSB2YWxpZCBjaGFyYWN0ZXIgc3RyaW5nXCJcbiAgICAgICAgICBdID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBtYW5pZmVzdCA9IEpTT04ucGFyc2UobWFuaWZlc3Rfc3RyaW5nKTtcblxuICAgICAgICBpZiAoIW1hbmlmZXN0IHx8IHR5cGVvZiBtYW5pZmVzdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgLy8gNGEuKSBtYW5pZmVzdCBpcyBub3QgdmFsaWQganNvblxuICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJTM0RhdGFMaXN0XCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW10sXG4gICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlc3RbXG4gICAgICAgICAgICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiXG4gICAgICAgICAgICAgIF0gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyA1KSBEb2VzIG1hbmlmZXN0IGNvbnRhaW4gZGF0YSBsaXN0P1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IChcbiAgICAgICAgICAgICAgISFtYW5pZmVzdC5oYXNPd25Qcm9wZXJ0eShcImRhdGFcIilcbiAgICAgICAgICAgICAgJiYgdHlwZW9mIG1hbmlmZXN0W1wiZGF0YVwiXSA9PT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgICAmJiBtYW5pZmVzdFtcImRhdGFcIl0ubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBjb250YWlucyB2YWxpZCBsaXN0IG9mIGRhdGFcIlxuICAgICAgICAgICAgICAgICAgXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyA1YSkgbGlzdCB0aGUgZGF0YVxuICAgICAgICAgICAgICAgIHJldHVybiBtYW5pZmVzdFtcImRhdGFcIl07XG4gICAgICAgICAgICB9KSgpIDogW107XG5cbiAgICAgICAgICAgIC8vIDYpIERvIHN1YmRpcmVjdG9yaWVzIGNvbnRhaW4gZGF0YT9cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgISFtYW5pZmVzdC5oYXNPd25Qcm9wZXJ0eShcImRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAgICYmIHR5cGVvZiBtYW5pZmVzdFtcImRpcmVjdG9yaWVzXCJdID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICYmIG1hbmlmZXN0W1wiZGlyZWN0b3JpZXNcIl0ubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gNmEpIENhbGwgdGhpcyBmdW5jdGlvbiBmb3IgZWFjaCBkaXJlY3RvcnkgbGlzdGVkXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdF9kaXJfZGF0YSA9IChhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgICAgIG1hbmlmZXN0W1wiZGlyZWN0b3JpZXNcIl0ubWFwKChkOiBzdHJpbmcpID0+IFMzTGlzdERhdGEoQnVja2V0LCAoISFuYW1lKSA/IG5hbWUgKyBcIi9cIiArIGQgOiBkKSlcbiAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9VTkQ6XCIsIGxpc3RfZGlyX2RhdGEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICAgICAgICAgICAgLi4ubGlzdCxcbiAgICAgICAgICAgICAgICAgICAgICAuLi5saXN0X2Rpcl9kYXRhLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByZXYsIGN1cnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyLmhhc093blByb3BlcnR5KFwibGlzdFwiKSAmJiBjdXJyW1wibGlzdFwiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocHJldi5oYXNPd25Qcm9wZXJ0eShcImxlbmd0aFwiKSAmJiBwcmV2Lmxlbmd0aCA+IDApID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3VycltcImxpc3RcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jdXJyW1wibGlzdFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyA2YSkgbWFuaWZlc3QgZG9lcyBub3QgbGlzdCBkaXJlY3Rvcmllc1xuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlMzRGF0YUxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogbGlzdCxcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xuICAgICAgICBtYW5pZmVzdF9zdHJpbmcgPSBgeyBcIkVycm9yXCI6IFwiJHtlLnRvU3RyaW5nKCl9XCIgfWA7XG5cbiAgICB9IGZpbmFsbHkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBTM0xpc3REYXRhIG1hbmlmZXN0IEJvZHk6XG4ke21hbmlmZXN0X3N0cmluZ31cbmApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuXG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGVyZSB3YXMgcHJvYmFibHkgYW4gZXJyb3IgYWJvdmVcbiAgICByZXR1cm4gKHtcbiAgICAgICAgdHlwZTogXCJTM0RhdGFMaXN0XCIsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgfSk7XG5cbn1cbiJdfQ==