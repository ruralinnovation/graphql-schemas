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
async function S3ListData(Bucket, container_name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNMaXN0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL1MzTGlzdERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFjQSw2QkErTEM7QUE3TUQsa0RBQXdDO0FBR3hDLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUV6QixNQUFNLElBQUksR0FBRztJQUNULHNDQUFzQyxFQUFFLEtBQUs7SUFDN0MsZ0VBQWdFLEVBQUUsS0FBSztJQUN2RSwwQ0FBMEMsRUFBRSxLQUFLO0lBQ2pELGlEQUFpRCxFQUFFLEtBQUs7Q0FDM0QsQ0FBQztBQUVGLE1BQU0sRUFBRSxHQUFHLElBQUksY0FBRSxFQUFFLENBQUM7QUFFTCxLQUFLLFVBQVUsVUFBVSxDQUN0QyxNQUFjLEVBQ2QsY0FBdUI7SUFHckIscUNBQXFDO0lBRXJDLElBQUksQ0FBQztRQUVEOztXQUVHO1FBRUgscUNBQXFDO1FBQ3JDLE1BQU0sSUFBSSxHQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsY0FBYyxDQUFDLENBQUM7WUFDaEIsK0RBQStEO1lBQy9ELEVBQUUsQ0FBQztRQUVMLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUUsTUFBTTtRQUVwRjs7V0FFRztRQUNILG9DQUFvQztRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixNQUFNLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQztRQUUzRCxNQUFNLGNBQWMsR0FBRyxNQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUMxQyxNQUFNO1lBQ04sTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFO1NB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QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFMzIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgUzNEYXRhTGlzdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5sZXQgbWFuaWZlc3Rfc3RyaW5nID0gXCJcIjtcblxuY29uc3QgdGVzdCA9IHtcbiAgICBcIlMzTGlzdERhdGEgcmVzb2x2ZXIgY2FuIGxpc3Qgb2JqZWN0c1wiOiBmYWxzZSxcbiAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY2FuIGJlIGVuY29kZWQgYXMgYSB2YWxpZCBjaGFyYWN0ZXIgc3RyaW5nXCI6IGZhbHNlLFxuICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiOiBmYWxzZSxcbiAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY29udGFpbnMgdmFsaWQgbGlzdCBvZiBkYXRhXCI6IGZhbHNlXG59O1xuXG5jb25zdCBzMyA9IG5ldyBTMygpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBTM0xpc3REYXRhIChcbiAgQnVja2V0OiBzdHJpbmcsXG4gIGNvbnRhaW5lcl9uYW1lPzogc3RyaW5nXG4pOiBQcm9taXNlPFMzRGF0YUxpc3Q+ICB7XG5cbiAgICAvLyBjb25zdCBjb250YWluZXJfbmFtZSA9IFwiZXhhbXBsZXNcIjtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IEZpbmQgbWFuaWZlc3QgZm9yIGNvbnRhaW5lciBuYW1lXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8vIDEpIERvZXMgY29udGFpbmVyX25hbWUgaGF2ZSB2YWx1ZT9cbiAgICAgICAgY29uc3QgbmFtZTogc3RyaW5nID0gKCEhY29udGFpbmVyX25hbWUgJiYgY29udGFpbmVyX25hbWUubGVuZ3RoID4gMCkgP1xuICAgICAgICAgIGNvbnRhaW5lcl9uYW1lIDpcbiAgICAgICAgICAvLyAxYS4pIGlmIG5vdCwgb25seSBnZXQgbWFuaWZlc3QgZm9yIGJ1Y2tldCAoY29uc3RhbnQgZm9yIG5vdylcbiAgICAgICAgICBcIlwiO1xuXG4gICAgICAgIGxldCBwYXRoX3RvX21hbmlmZXN0ID0gKCEhbmFtZSkgPyBuYW1lICsgXCIvbWFuaWZlc3QuanNvblwiIDogXCJtYW5pZmVzdC5qc29uXCI7ICAvLyBcIlwiO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBwYWdlIHRocm91Z2ggczNfb2JqZWN0X2xpc3QuQ29udGVudHMgd2hlbiB0aGVyZSBhcmUgbW9yZSB0aGFuIGxpbWl0IG9mIHNpbmdsZSByZXEvcmVzXG4gICAgICAgICAqL1xuICAgICAgICAvLyAyOiBMaXN0IG9iamVjdHMgaW4gY29udGFpbmVyIG5hbWVcbiAgICAgICAgY29uc29sZS5sb2coYHMzLmxpc3RPYmplY3RzVjIoXCIke0J1Y2tldH1cIiwgXCIke25hbWV9XCIpLi4uYCk7XG5cbiAgICAgICAgY29uc3QgczNfb2JqZWN0X2xpc3QgPSBhd2FpdChzMy5saXN0T2JqZWN0c1YyKHtcbiAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIFByZWZpeDogYCR7bmFtZX1gLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIC4uLiB3b3JrcywgYnV0IHRoZSBmaWxlIGtleXMgYXJlIHJldHVybmVkIGFzIGEgcGFydGlhbCBsaXN0IHdpdGhvdXRcbiAgICAgICAgLy8gc3BlY2lmaWVkIG9yZGVyOyBzZXQgaXMgbm90IGd1YXJhbnRlZWQgKGkuZS4gdGVzdGFibGUpXG5cbiAgICAgICAgLy8gLy8gVE9ETzogMzogSXMgbWFuaWZlc3QuanNvbiBpbiB0aGUgbGlzdCBvZiBvYmplY3RzP1xuICAgICAgICAvLyBsZXQgcGF0aF90b19tYW5pZmVzdCA9IFwiXCI7XG4gICAgICAgIGlmICh0eXBlb2YgczNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgczNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vJHtuYW1lfWApO1xuICAgICAgICAgICAgLy8gIDNhLikgTm8gbWFuaWZlc3QgZm91bmQsIHNvIHdpbGwgbm90IGNvbnRpbnVlIChkYXRhIGhhcyBub3QgYmVlbiBpbmRleGVkIGZvciB0aGlzIGNvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKGF3YWl0IHMzX29iamVjdF9saXN0LkNvbnRlbnRzKS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRfcGF0aCA9IGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyX3BhdGhfcmVnZXggPSAoISFuYW1lKSA/XG4gICAgICAgICAgICAgICAgICBSZWdFeHAoYF4ke25hbWV9L21hbmlmZXN0YCkgOiAvXm1hbmlmZXN0LztcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2hlY2sgbWF0Y2ggZm9yIGNvbnRlbnRfbmFtZTpcIiwgY29udGVudF9wYXRoLm1hdGNoKGNvbnRhaW5lcl9wYXRoX3JlZ2V4KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudF9wYXRoLm1hdGNoKGNvbnRhaW5lcl9wYXRoX3JlZ2V4KSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvdW5kIG1hbmlmZXN0Lmpzb24hXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aF90b19tYW5pZmVzdCA9IGNvbnRlbnRfcGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgXCJTM0xpc3REYXRhIHJlc29sdmVyIGNhbiBsaXN0IG9iamVjdHNcIlxuICAgICAgICAgICAgICBdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAzYS4pIE5vIG1hbmlmZXN0IGZvdW5kLCBzbyB3aWxsIG5vdCBjb250aW51ZSAoZGF0YSBoYXMgbm90IGJlZW4gaW5kZXhlZCBmb3IgdGhpcyBjb250YWluZXIpXG4gICAgICAgIGlmICghcGF0aF90b19tYW5pZmVzdCB8fCBwYXRoX3RvX21hbmlmZXN0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiLFxuICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNDogRmV0Y2ggbWFuaWZlc3QgYW5kIGNvbnZlcnQgdG8ganNvblxuXG4gICAgICAgIGNvbnNvbGUubG9nKGBzMy5nZXRPYmplY3QoXCIke0J1Y2tldH1cIiwgXCIke3BhdGhfdG9fbWFuaWZlc3R9XCIpLi4uYCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFMzIEdldCAoRGF0YSlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IG1hbmlmZXN0X2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIEtleTogcGF0aF90b19tYW5pZmVzdFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFuaWZlc3Rfc3RyaW5nID0gKHR5cGVvZiBtYW5pZmVzdF9qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgICAgICAoYXdhaXQgbWFuaWZlc3RfanNvbi5Cb2R5Py50cmFuc2Zvcm1Ub1N0cmluZygpKSA6XG4gICAgICAgICAgYHsgXCJFcnJvclwiOiBcIlMzTGlzdERhdGEgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkIGZvciAke3BhdGhfdG9fbWFuaWZlc3R9XCIgfWA7XG5cbiAgICAgICAgdGVzdFtcbiAgICAgICAgICBcIlMzTGlzdERhdGEgbWFuaWZlc3QgY2FuIGJlIGVuY29kZWQgYXMgYSB2YWxpZCBjaGFyYWN0ZXIgc3RyaW5nXCJcbiAgICAgICAgICBdID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBtYW5pZmVzdCA9IEpTT04ucGFyc2UobWFuaWZlc3Rfc3RyaW5nKTtcblxuICAgICAgICBpZiAoIW1hbmlmZXN0IHx8IHR5cGVvZiBtYW5pZmVzdCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgLy8gNGEuKSBtYW5pZmVzdCBpcyBub3QgdmFsaWQganNvblxuICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJTM0RhdGFMaXN0XCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW10sXG4gICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlc3RbXG4gICAgICAgICAgICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiXG4gICAgICAgICAgICAgIF0gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyA1KSBEb2VzIG1hbmlmZXN0IGNvbnRhaW4gZGF0YSBsaXN0P1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IChcbiAgICAgICAgICAgICAgISFtYW5pZmVzdC5oYXNPd25Qcm9wZXJ0eShcImRhdGFcIilcbiAgICAgICAgICAgICAgJiYgdHlwZW9mIG1hbmlmZXN0W1wiZGF0YVwiXSA9PT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgICAmJiBtYW5pZmVzdFtcImRhdGFcIl0ubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSA/ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBjb250YWlucyB2YWxpZCBsaXN0IG9mIGRhdGFcIlxuICAgICAgICAgICAgICAgICAgXSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyA1YSkgbGlzdCB0aGUgZGF0YVxuICAgICAgICAgICAgICAgIHJldHVybiBtYW5pZmVzdFtcImRhdGFcIl07XG4gICAgICAgICAgICB9KSgpIDogW107XG5cbiAgICAgICAgICAgIC8vIDYpIERvIHN1YmRpcmVjdG9yaWVzIGNvbnRhaW4gZGF0YT9cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgISFtYW5pZmVzdC5oYXNPd25Qcm9wZXJ0eShcImRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAgICYmIHR5cGVvZiBtYW5pZmVzdFtcImRpcmVjdG9yaWVzXCJdID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICYmIG1hbmlmZXN0W1wiZGlyZWN0b3JpZXNcIl0ubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gNmEpIENhbGwgdGhpcyBmdW5jdGlvbiBmb3IgZWFjaCBkaXJlY3RvcnkgbGlzdGVkXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdF9kaXJfZGF0YSA9IChhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgICAgIG1hbmlmZXN0W1wiZGlyZWN0b3JpZXNcIl0ubWFwKChkOiBzdHJpbmcpID0+IFMzTGlzdERhdGEoQnVja2V0LCAoISFuYW1lKSA/IG5hbWUgKyBcIi9cIiArIGQgOiBkKSlcbiAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9VTkQ6XCIsIGxpc3RfZGlyX2RhdGEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUzNEYXRhTGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICAgICAgICAgICAgLi4ubGlzdCxcbiAgICAgICAgICAgICAgICAgICAgICAuLi5saXN0X2Rpcl9kYXRhLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByZXYsIGN1cnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyLmhhc093blByb3BlcnR5KFwibGlzdFwiKSAmJiBjdXJyW1wibGlzdFwiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocHJldi5oYXNPd25Qcm9wZXJ0eShcImxlbmd0aFwiKSAmJiBwcmV2Lmxlbmd0aCA+IDApID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3VycltcImxpc3RcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5jdXJyW1wibGlzdFwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyA2YSkgbWFuaWZlc3QgZG9lcyBub3QgbGlzdCBkaXJlY3Rvcmllc1xuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlMzRGF0YUxpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogbGlzdCxcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xuICAgICAgICBtYW5pZmVzdF9zdHJpbmcgPSBgeyBcIkVycm9yXCI6IFwiJHtlLnRvU3RyaW5nKCl9XCIgfWA7XG5cbiAgICB9IGZpbmFsbHkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBTM0xpc3REYXRhIG1hbmlmZXN0IEJvZHk6XG4ke21hbmlmZXN0X3N0cmluZ31cbmApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuXG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGVyZSB3YXMgcHJvYmFibHkgYW4gZXJyb3IgYWJvdmVcbiAgICByZXR1cm4gKHtcbiAgICAgICAgdHlwZTogXCJTM0RhdGFMaXN0XCIsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgfSk7XG5cbn1cbiJdfQ==