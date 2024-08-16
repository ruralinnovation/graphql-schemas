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
            if (!manifest.hasOwnProperty("data")
                || typeof manifest["data"] !== "object"
                || manifest["data"].length < 1) {
                // 5a) manifest does not list data, so check the directory list
                if (!manifest.hasOwnProperty("directories")
                    || typeof manifest["directories"] !== "object"
                    || manifest["directories"].length < 1) {
                    // 5b) manifest does not list directories
                    return ({
                        type: "s3_list_data",
                        list: [],
                        test: test
                    });
                }
                else {
                    // 5b) Call this function for each directory listed
                    const list_dir_data = (await Promise.all(manifest["directories"].map((d) => S3ListData(Bucket, (!!name) ? name + "/" + d : d))));
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
                                }
                                else {
                                    return prev;
                                }
                            }, {})
                        ],
                        test: test
                    });
                }
            }
            else {
                test["S3ListData manifest contains valid list of data"] = true;
                // 6 list the data
                return ({
                    type: "s3_list_data",
                    list: manifest["data"],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNMaXN0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL1MzTGlzdERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFjQSw2QkE0TEM7QUExTUQsa0RBQXdDO0FBR3hDLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUV6QixNQUFNLElBQUksR0FBRztJQUNULHNDQUFzQyxFQUFFLEtBQUs7SUFDN0MsZ0VBQWdFLEVBQUUsS0FBSztJQUN2RSwwQ0FBMEMsRUFBRSxLQUFLO0lBQ2pELGlEQUFpRCxFQUFFLEtBQUs7Q0FDM0QsQ0FBQztBQUVGLE1BQU0sRUFBRSxHQUFHLElBQUksY0FBRSxFQUFFLENBQUM7QUFFTCxLQUFLLFVBQVUsVUFBVSxDQUFFLFNBQWlCLGdCQUFnQixFQUFFLGNBQXVCO0lBRWhHLHFDQUFxQztJQUVyQyxJQUFJLENBQUM7UUFFRDs7V0FFRztRQUVILHFDQUFxQztRQUNyQyxNQUFNLElBQUksR0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLGNBQWMsQ0FBQyxDQUFDO1lBQ2hCLCtEQUErRDtZQUMvRCxFQUFFLENBQUM7UUFFTCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFFLE1BQU07UUFFcEY7O1dBRUc7UUFDSCxvQ0FBb0M7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLENBQUM7UUFFekQsTUFBTSxjQUFjLEdBQUcsTUFBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDMUMsTUFBTTtZQUNOLE1BQU0sRUFBRSxHQUFHLElBQUks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RVAsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFMzIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuXG5cbmxldCBtYW5pZmVzdF9zdHJpbmcgPSBcIlwiO1xuXG5jb25zdCB0ZXN0ID0ge1xuICAgIFwiUzNMaXN0RGF0YSByZXNvbHZlciBjYW4gbGlzdCBvYmplY3RzXCI6IGZhbHNlLFxuICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBjYW4gYmUgZW5jb2RlZCBhcyBhIHZhbGlkIGNoYXJhY3RlciBzdHJpbmdcIjogZmFsc2UsXG4gICAgXCJTM0xpc3REYXRhIG1hbmlmZXN0IG9iamVjdCBpcyB2YWxpZCBKU09OXCI6IGZhbHNlLFxuICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBjb250YWlucyB2YWxpZCBsaXN0IG9mIGRhdGFcIjogZmFsc2Vcbn07XG5cbmNvbnN0IHMzID0gbmV3IFMzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIFMzTGlzdERhdGEgKEJ1Y2tldDogc3RyaW5nID0gXCJjb3JpLXJpc2ktYXBwc1wiLCBjb250YWluZXJfbmFtZT86IHN0cmluZykge1xuXG4gICAgLy8gY29uc3QgY29udGFpbmVyX25hbWUgPSBcImV4YW1wbGVzXCI7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBGaW5kIG1hbmlmZXN0IGZvciBjb250YWluZXIgbmFtZVxuICAgICAgICAgKi9cblxuICAgICAgICAvLyAxKSBEb2VzIGNvbnRhaW5lcl9uYW1lIGhhdmUgdmFsdWU/XG4gICAgICAgIGNvbnN0IG5hbWU6IHN0cmluZyA9ICghIWNvbnRhaW5lcl9uYW1lICYmIGNvbnRhaW5lcl9uYW1lLmxlbmd0aCA+IDApID9cbiAgICAgICAgICBjb250YWluZXJfbmFtZSA6XG4gICAgICAgICAgLy8gMWEuKSBpZiBub3QsIG9ubHkgZ2V0IG1hbmlmZXN0IGZvciBidWNrZXQgKGNvbnN0YW50IGZvciBub3cpXG4gICAgICAgICAgXCJcIjtcblxuICAgICAgICBsZXQgcGF0aF90b19tYW5pZmVzdCA9ICghIW5hbWUpID8gbmFtZSArIFwiL21hbmlmZXN0Lmpzb25cIiA6IFwibWFuaWZlc3QuanNvblwiOyAgLy8gXCJcIjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzogcGFnZSB0aHJvdWdoIHMzX29iamVjdF9saXN0LkNvbnRlbnRzIHdoZW4gdGhlcmUgYXJlIG1vcmUgdGhhbiBsaW1pdCBvZiBzaW5nbGUgcmVxL3Jlc1xuICAgICAgICAgKi9cbiAgICAgICAgLy8gMjogTGlzdCBvYmplY3RzIGluIGNvbnRhaW5lciBuYW1lXG4gICAgICAgIGNvbnNvbGUubG9nKGBzMy5saXN0T2JqZWN0c1YyKCR7QnVja2V0fSwgXCIke25hbWV9XCIpLi4uYCk7XG5cbiAgICAgICAgY29uc3QgczNfb2JqZWN0X2xpc3QgPSBhd2FpdChzMy5saXN0T2JqZWN0c1YyKHtcbiAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIFByZWZpeDogYCR7bmFtZX1gLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIC4uLiB3b3JrcywgYnV0IHRoZSBmaWxlIGtleXMgYXJlIHJldHVybmVkIGFzIGEgcGFydGlhbCBsaXN0IHdpdGhvdXRcbiAgICAgICAgLy8gc3BlY2lmaWVkIG9yZGVyOyBzZXQgaXMgbm90IGd1YXJhbnRlZWQgKGkuZS4gdGVzdGFibGUpXG5cbiAgICAgICAgLy8gLy8gVE9ETzogMzogSXMgbWFuaWZlc3QuanNvbiBpbiB0aGUgbGlzdCBvZiBvYmplY3RzP1xuICAgICAgICAvLyBsZXQgcGF0aF90b19tYW5pZmVzdCA9IFwiXCI7XG4gICAgICAgIGlmICh0eXBlb2YgczNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgczNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vJHtuYW1lfWApO1xuICAgICAgICAgICAgLy8gIDNhLikgTm8gbWFuaWZlc3QgZm91bmQsIHNvIHdpbGwgbm90IGNvbnRpbnVlIChkYXRhIGhhcyBub3QgYmVlbiBpbmRleGVkIGZvciB0aGlzIGNvbnRhaW5lcilcbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiczNfbGlzdF9kYXRhXCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW10sXG4gICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoYXdhaXQgczNfb2JqZWN0X2xpc3QuQ29udGVudHMpLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYy5LZXk/LnRvU3RyaW5nKCkgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudF9wYXRoID0gYy5LZXk/LnRvU3RyaW5nKCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWluZXJfcGF0aF9yZWdleCA9ICghIW5hbWUpID9cbiAgICAgICAgICAgICAgICAgIFJlZ0V4cChgXiR7bmFtZX0vbWFuaWZlc3RgKSA6IC9ebWFuaWZlc3QvO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDaGVjayBtYXRjaCBmb3IgY29udGVudF9uYW1lOlwiLCBjb250ZW50X3BhdGgubWF0Y2goY29udGFpbmVyX3BhdGhfcmVnZXgpKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50X3BhdGgubWF0Y2goY29udGFpbmVyX3BhdGhfcmVnZXgpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm91bmQgbWFuaWZlc3QuanNvbiFcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoX3RvX21hbmlmZXN0ID0gY29udGVudF9wYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0W1xuICAgICAgICAgICAgICBcIlMzTGlzdERhdGEgcmVzb2x2ZXIgY2FuIGxpc3Qgb2JqZWN0c1wiXG4gICAgICAgICAgICAgIF0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIDNhLikgTm8gbWFuaWZlc3QgZm91bmQsIHNvIHdpbGwgbm90IGNvbnRpbnVlIChkYXRhIGhhcyBub3QgYmVlbiBpbmRleGVkIGZvciB0aGlzIGNvbnRhaW5lcilcbiAgICAgICAgaWYgKCFwYXRoX3RvX21hbmlmZXN0IHx8IHBhdGhfdG9fbWFuaWZlc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzM19saXN0X2RhdGFcIixcbiAgICAgICAgICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDQ6IEZldGNoIG1hbmlmZXN0IGFuZCBjb252ZXJ0IHRvIGpzb25cblxuICAgICAgICBjb25zb2xlLmxvZyhgczMuZ2V0T2JqZWN0KFwiJHtCdWNrZXR9XCIsIFwiJHtwYXRoX3RvX21hbmlmZXN0fVwiKS4uLmApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTMyBHZXQgKERhdGEpXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBtYW5pZmVzdF9qc29uID0gKGF3YWl0IHMzLmdldE9iamVjdCh7XG4gICAgICAgICAgICBCdWNrZXQsXG4gICAgICAgICAgICBLZXk6IHBhdGhfdG9fbWFuaWZlc3RcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hbmlmZXN0X3N0cmluZyA9ICh0eXBlb2YgbWFuaWZlc3RfanNvbi5Cb2R5ID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAgICAgKGF3YWl0IG1hbmlmZXN0X2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgICAgIGB7IFwiRXJyb3JcIjogXCJTM0xpc3REYXRhIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZCBmb3IgJHtwYXRoX3RvX21hbmlmZXN0fVwiIH1gO1xuXG4gICAgICAgIHRlc3RbXG4gICAgICAgICAgXCJTM0xpc3REYXRhIG1hbmlmZXN0IGNhbiBiZSBlbmNvZGVkIGFzIGEgdmFsaWQgY2hhcmFjdGVyIHN0cmluZ1wiXG4gICAgICAgICAgXSA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgbWFuaWZlc3QgPSBKU09OLnBhcnNlKG1hbmlmZXN0X3N0cmluZyk7XG5cbiAgICAgICAgaWYgKCFtYW5pZmVzdCB8fCB0eXBlb2YgbWFuaWZlc3QgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIC8vIDRhLikgbWFuaWZlc3QgaXMgbm90IHZhbGlkIGpzb25cbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiczNfbGlzdF9kYXRhXCIsXG4gICAgICAgICAgICAgICAgbGlzdDogW10sXG4gICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlc3RbXG4gICAgICAgICAgICAgIFwiUzNMaXN0RGF0YSBtYW5pZmVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiXG4gICAgICAgICAgICAgIF0gPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyA1KSBEb2VzIG1hbmlmZXN0IGNvbnRhaW4gZGF0YSBsaXN0P1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhbWFuaWZlc3QuaGFzT3duUHJvcGVydHkoXCJkYXRhXCIpXG4gICAgICAgICAgICAgIHx8IHR5cGVvZiBtYW5pZmVzdFtcImRhdGFcIl0gIT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICAgfHwgbWFuaWZlc3RbXCJkYXRhXCJdLmxlbmd0aCA8IDFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIDVhKSBtYW5pZmVzdCBkb2VzIG5vdCBsaXN0IGRhdGEsIHNvIGNoZWNrIHRoZSBkaXJlY3RvcnkgbGlzdFxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICFtYW5pZmVzdC5oYXNPd25Qcm9wZXJ0eShcImRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAgICAgICB8fCB0eXBlb2YgbWFuaWZlc3RbXCJkaXJlY3Rvcmllc1wiXSAhPT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgICAgICAgfHwgbWFuaWZlc3RbXCJkaXJlY3Rvcmllc1wiXS5sZW5ndGggPCAxXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIDViKSBtYW5pZmVzdCBkb2VzIG5vdCBsaXN0IGRpcmVjdG9yaWVzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzM19saXN0X2RhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdDogdGVzdFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyA1YikgQ2FsbCB0aGlzIGZ1bmN0aW9uIGZvciBlYWNoIGRpcmVjdG9yeSBsaXN0ZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdF9kaXJfZGF0YSA9IChhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgICAgICAgICBtYW5pZmVzdFtcImRpcmVjdG9yaWVzXCJdLm1hcCgoZDogc3RyaW5nKSA9PiBTM0xpc3REYXRhKEJ1Y2tldCwgKCEhbmFtZSkgPyBuYW1lICsgXCIvXCIgKyBkIDogZCkpXG4gICAgICAgICAgICAgICAgICAgICkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9VTkQ6XCIsIGxpc3RfZGlyX2RhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzM19saXN0X2RhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubGlzdF9kaXJfZGF0YS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJldiwgY3Vycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyLmhhc093blByb3BlcnR5KFwibGlzdFwiKSAmJiBjdXJyW1wibGlzdFwiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHByZXYuaGFzT3duUHJvcGVydHkoXCJsZW5ndGhcIikgJiYgcHJldi5sZW5ndGggPiAwKSA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3VycltcImxpc3RcIl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmN1cnJbXCJsaXN0XCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0OiB0ZXN0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXN0W1xuICAgICAgICAgICAgICAgICAgXCJTM0xpc3REYXRhIG1hbmlmZXN0IGNvbnRhaW5zIHZhbGlkIGxpc3Qgb2YgZGF0YVwiXG4gICAgICAgICAgICAgICAgICBdID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIDYgbGlzdCB0aGUgZGF0YVxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInMzX2xpc3RfZGF0YVwiLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OiBtYW5pZmVzdFtcImRhdGFcIl0sXG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IHRlc3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvcihlLnRvU3RyaW5nKCkpO1xuICAgICAgICBtYW5pZmVzdF9zdHJpbmcgPSBgeyBcIkVycm9yXCI6IFwiJHtlLnRvU3RyaW5nKCl9XCIgfWA7XG5cbiAgICB9IGZpbmFsbHkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBTM0xpc3REYXRhIG1hbmlmZXN0IEJvZHk6XG4ke21hbmlmZXN0X3N0cmluZ31cbmApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuXG4gICAgfVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB0aGVyZSB3YXMgcHJvYmFibHkgYW4gZXJyb3IgYWJvdmVcbiAgICByZXR1cm4gKHtcbiAgICAgICAgdHlwZTogXCJzM19saXN0X2RhdGFcIixcbiAgICAgICAgbGlzdDogW10sXG4gICAgICAgIHRlc3Q6IHRlc3RcbiAgICB9KTtcblxufVxuIl19