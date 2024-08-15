"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Logger } from "@aws-lambda-powertools/logger";
const type_1 = require("graphql/type");
const types_1 = require("../../types");
const client_s3_1 = require("@aws-sdk/client-s3");
// const logger = new Logger();
// // Logger object is currently producing this error when run locally w/ SAM:
// // RangeError: Invalid time zone specified: :/etc/localtime,
// //     at new DateTimeFormat (<anonymous>),
// //     at #getDateFormatter (/var/task/index.js:127448:16),
// //     at #generateISOTimestampWithOffset (/var/task/index.js:127460:82),
// //     at PowertoolsLogFormatter2.formatTimestamp (/var/task/index.js:127429:54),
// //     at PowertoolsLogFormatter2.formatAttributes (/var/task/index.js:127540:27),
// //     at Logger2.createAndPopulateLogItem (/var/task/index.js:127832:39),
// //     at Logger2.processLogItem (/var/task/index.js:127870:42),
// //     at Logger2.info (/var/task/index.js:127670:14),
// //     at resolve (/var/task/index.js:128046:17),
// //     at field.resolve (/var/task/index.js:57435:22)
const s3_test = {
    type: new type_1.GraphQLObjectType({
        name: 'S3Test',
        fields: () => ({
            message: { type: type_1.GraphQLString },
            test: { type: types_1.JSONObject }, // <-- object containing results of all tests
            // <-- run by the resolver stored as:
            // <-- { "test description": true | false }
            type: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, // { ...args }: { arg: type, ... }
    { dataSources: { restApi, s3DataSource } }, info) => {
        console.log("Resolve S3Test...", {
            restApi,
            s3DataSource
        });
        let manifest_string = "", rural_places_string = "";
        const test = {
            "S3Test resolver can list objects in `cori-risi-app` under the examples/ prefix": false,
            "S3Test object can be encoded as a valid character string": false,
            "S3Test object is valid JSON": false
        };
        const s3 = new client_s3_1.S3();
        const Bucket = "cori-risi-apps";
        const directory = "examples";
        try {
            /**
             * TODO: S3 List (Buckets)
             */
            /**
             * TODO: S3 List (Data)
             */
            console.log(`s3.listObjectsV2(${Bucket}, "${directory}")...`);
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
            }
            else {
                s3_object_list.Contents.forEach(c => {
                    console.log(c.Key?.toString() || "");
                });
                test["S3Test resolver can list objects in `cori-risi-app` under the examples/ prefix"] = true;
            }
            // console.log(`s3.getObject(${Bucket}, "manifest.json")...`);
            //
            // /**
            //  * S3 Get (Data)
            //  */
            // const manifest_json =  (await s3.getObject({
            //     Bucket,
            //     Key: "manifest.json"
            // }));
            //
            // manifest_string = (typeof manifest_json.Body === "object") ?
            //   (await manifest_json.Body?.transformToString()) :
            //   `{ "Error": "S3 object Body is undefined" }`;
            //
            // const rural_places_json =  (await s3.getObject({
            //     Bucket,
            //     Key: directory + "/who-wins-b2s/rural_places_2500_plus.json"
            // }));
            //
            // rural_places_string = (typeof rural_places_json.Body === "object") ?
            //   (await rural_places_json.Body?.transformToString()) :
            //   `{ "Error": "S3 object Body is undefined" }`;
            //
            // test[
            //   "S3Test object can be encoded as a valid character string"
            //   ] = true;
            //
            // const rural_places =  JSON.parse(rural_places_string);
            //
            // if (!!rural_places && typeof rural_places === "object") {
            //     test[
            //       "S3Test object is valid JSON"
            //       ] = true;
            // }
        }
        catch (e) {
            console.error(e.toString());
            manifest_string = `{ "Error": "${e.toString()}" }`;
        }
        finally {
            console.log(`S3 object Body:
${manifest_string}
`);
            console.log(test);
        }
        // return ({
        //   "message": manifest_string,
        //   "test": test,
        //   "type": "s3_test"
        // });
        return ({
            "type": "s3_test",
            "message": "test",
            "test": test
        });
    }
};
exports.default = s3_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczNfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL3MzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBMEQ7QUFDMUQsdUNBQWdFO0FBQ2hFLHVDQUF5QztBQUN6QyxrREFBd0M7QUFHeEMsK0JBQStCO0FBQy9CLDhFQUE4RTtBQUM5RSwrREFBK0Q7QUFDL0QsOENBQThDO0FBQzlDLDhEQUE4RDtBQUM5RCw0RUFBNEU7QUFDNUUsb0ZBQW9GO0FBQ3BGLHFGQUFxRjtBQUNyRiw2RUFBNkU7QUFDN0UsbUVBQW1FO0FBQ25FLHlEQUF5RDtBQUN6RCxvREFBb0Q7QUFDcEQsd0RBQXdEO0FBRXhELE1BQU0sT0FBTyxHQUFHO0lBQ1osSUFBSSxFQUFFLElBQUksd0JBQWlCLENBQUM7UUFDeEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNYLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ2hDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBVSxFQUFFLEVBQUUsNkNBQTZDO1lBQzdDLHFDQUFxQztZQUNyQywyQ0FBMkM7WUFDdkUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7U0FDaEMsQ0FBQztLQUNMLENBQUM7SUFDRixJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQU8sRUFBRSxrQ0FBa0M7SUFDM0MsRUFDSSxXQUFXLEVBQUUsRUFDVCxPQUFPLEVBQ1AsWUFBWSxFQUNmLEVBQ0MsRUFDTixJQUFTLEVBQ1QsRUFBRTtRQUVBLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IsT0FBTztZQUNQLFlBQVk7U0FDZixDQUFDLENBQUM7UUFFSCxJQUFJLGVBQWUsR0FBRyxFQUFFLEVBQ3BCLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUU3QixNQUFNLElBQUksR0FBRztZQUNULGdGQUFnRixFQUFFLEtBQUs7WUFDdkYsMERBQTBELEVBQUUsS0FBSztZQUNqRSw2QkFBNkIsRUFBRSxLQUFLO1NBQ3ZDLENBQUM7UUFHRixNQUFNLEVBQUUsR0FBRyxJQUFJLGNBQUUsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUM7WUFFRDs7ZUFFRztZQUVIOztlQUVHO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsTUFBTSxNQUFNLFNBQVMsT0FBTyxDQUFDLENBQUM7WUFFOUQ7O2VBRUc7WUFDSCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDM0MsTUFBTTtnQkFDTixNQUFNLEVBQUUsR0FBRyxTQUFTLEVBQUU7YUFDekIsQ0FBQyxDQUFDLENBQUM7WUFDSixzRUFBc0U7WUFDdEUseURBQXlEO1lBRXpELElBQUksT0FBTyxjQUFjLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDdEUsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FDRixnRkFBZ0YsQ0FDL0UsR0FBRyxJQUFJLENBQUM7WUFDZixDQUFDO1lBRUQsOERBQThEO1lBQzlELEVBQUU7WUFDRixNQUFNO1lBQ04sbUJBQW1CO1lBQ25CLE1BQU07WUFDTiwrQ0FBK0M7WUFDL0MsY0FBYztZQUNkLDJCQUEyQjtZQUMzQixPQUFPO1lBQ1AsRUFBRTtZQUNGLCtEQUErRDtZQUMvRCxzREFBc0Q7WUFDdEQsa0RBQWtEO1lBQ2xELEVBQUU7WUFDRixtREFBbUQ7WUFDbkQsY0FBYztZQUNkLG1FQUFtRTtZQUNuRSxPQUFPO1lBQ1AsRUFBRTtZQUNGLHVFQUF1RTtZQUN2RSwwREFBMEQ7WUFDMUQsa0RBQWtEO1lBQ2xELEVBQUU7WUFDRixRQUFRO1lBQ1IsK0RBQStEO1lBQy9ELGNBQWM7WUFDZCxFQUFFO1lBQ0YseURBQXlEO1lBQ3pELEVBQUU7WUFDRiw0REFBNEQ7WUFDNUQsWUFBWTtZQUNaLHNDQUFzQztZQUN0QyxrQkFBa0I7WUFDbEIsSUFBSTtRQUVSLENBQUM7UUFBQyxPQUFPLENBQU0sRUFBRSxDQUFDO1lBRWQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM1QixlQUFlLEdBQUcsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztRQUV2RCxDQUFDO2dCQUFTLENBQUM7WUFFUCxPQUFPLENBQUMsR0FBRyxDQUFDO0VBQ3RCLGVBQWU7Q0FDaEIsQ0FBQyxDQUFDO1lBRVMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixDQUFDO1FBRUQsWUFBWTtRQUNaLGdDQUFnQztRQUNoQyxrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLE1BQU07UUFFTixPQUFPLENBQUM7WUFDSixNQUFNLEVBQUUsU0FBUztZQUNqQixTQUFTLEVBQUUsTUFBTTtZQUNqQixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUVQLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkBhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBHcmFwaFFMT2JqZWN0VHlwZSwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcbmltcG9ydCB7IEpTT05PYmplY3QgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IFMzIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuXG5cbi8vIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcbi8vIC8vIExvZ2dlciBvYmplY3QgaXMgY3VycmVudGx5IHByb2R1Y2luZyB0aGlzIGVycm9yIHdoZW4gcnVuIGxvY2FsbHkgdy8gU0FNOlxuLy8gLy8gUmFuZ2VFcnJvcjogSW52YWxpZCB0aW1lIHpvbmUgc3BlY2lmaWVkOiA6L2V0Yy9sb2NhbHRpbWUsXG4vLyAvLyAgICAgYXQgbmV3IERhdGVUaW1lRm9ybWF0ICg8YW5vbnltb3VzPiksXG4vLyAvLyAgICAgYXQgI2dldERhdGVGb3JtYXR0ZXIgKC92YXIvdGFzay9pbmRleC5qczoxMjc0NDg6MTYpLFxuLy8gLy8gICAgIGF0ICNnZW5lcmF0ZUlTT1RpbWVzdGFtcFdpdGhPZmZzZXQgKC92YXIvdGFzay9pbmRleC5qczoxMjc0NjA6ODIpLFxuLy8gLy8gICAgIGF0IFBvd2VydG9vbHNMb2dGb3JtYXR0ZXIyLmZvcm1hdFRpbWVzdGFtcCAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzQyOTo1NCksXG4vLyAvLyAgICAgYXQgUG93ZXJ0b29sc0xvZ0Zvcm1hdHRlcjIuZm9ybWF0QXR0cmlidXRlcyAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzU0MDoyNyksXG4vLyAvLyAgICAgYXQgTG9nZ2VyMi5jcmVhdGVBbmRQb3B1bGF0ZUxvZ0l0ZW0gKC92YXIvdGFzay9pbmRleC5qczoxMjc4MzI6MzkpLFxuLy8gLy8gICAgIGF0IExvZ2dlcjIucHJvY2Vzc0xvZ0l0ZW0gKC92YXIvdGFzay9pbmRleC5qczoxMjc4NzA6NDIpLFxuLy8gLy8gICAgIGF0IExvZ2dlcjIuaW5mbyAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzY3MDoxNCksXG4vLyAvLyAgICAgYXQgcmVzb2x2ZSAoL3Zhci90YXNrL2luZGV4LmpzOjEyODA0NjoxNyksXG4vLyAvLyAgICAgYXQgZmllbGQucmVzb2x2ZSAoL3Zhci90YXNrL2luZGV4LmpzOjU3NDM1OjIyKVxuXG5jb25zdCBzM190ZXN0ID0ge1xuICAgIHR5cGU6IG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICAgIG5hbWU6ICdTM1Rlc3QnLFxuICAgICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgICAgIHRlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LCAvLyA8LS0gb2JqZWN0IGNvbnRhaW5pbmcgcmVzdWx0cyBvZiBhbGwgdGVzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LS0gcnVuIGJ5IHRoZSByZXNvbHZlciBzdG9yZWQgYXM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0tIHsgXCJ0ZXN0IGRlc2NyaXB0aW9uXCI6IHRydWUgfCBmYWxzZSB9XG4gICAgICAgICAgICB0eXBlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfVxuICAgICAgICB9KVxuICAgIH0pLFxuICAgIGFyZ3M6IG51bGwsXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgX186IGFueSwgLy8geyAuLi5hcmdzIH06IHsgYXJnOiB0eXBlLCAuLi4gfVxuICAgICAge1xuICAgICAgICAgIGRhdGFTb3VyY2VzOiB7XG4gICAgICAgICAgICAgIHJlc3RBcGksXG4gICAgICAgICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgICAgIH1cbiAgICAgIH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4gIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc29sdmUgUzNUZXN0Li4uXCIsIHtcbiAgICAgICAgICAgIHJlc3RBcGksXG4gICAgICAgICAgICBzM0RhdGFTb3VyY2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1hbmlmZXN0X3N0cmluZyA9IFwiXCIsXG4gICAgICAgICAgICBydXJhbF9wbGFjZXNfc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBjb25zdCB0ZXN0ID0ge1xuICAgICAgICAgICAgXCJTM1Rlc3QgcmVzb2x2ZXIgY2FuIGxpc3Qgb2JqZWN0cyBpbiBgY29yaS1yaXNpLWFwcGAgdW5kZXIgdGhlIGV4YW1wbGVzLyBwcmVmaXhcIjogZmFsc2UsXG4gICAgICAgICAgICBcIlMzVGVzdCBvYmplY3QgY2FuIGJlIGVuY29kZWQgYXMgYSB2YWxpZCBjaGFyYWN0ZXIgc3RyaW5nXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJTM1Rlc3Qgb2JqZWN0IGlzIHZhbGlkIEpTT05cIjogZmFsc2VcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGNvbnN0IHMzID0gbmV3IFMzKCk7XG4gICAgICAgIGNvbnN0IEJ1Y2tldCA9IFwiY29yaS1yaXNpLWFwcHNcIjtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5ID0gXCJleGFtcGxlc1wiO1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVE9ETzogUzMgTGlzdCAoQnVja2V0cylcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRPRE86IFMzIExpc3QgKERhdGEpXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgY29uc29sZS5sb2coYHMzLmxpc3RPYmplY3RzVjIoJHtCdWNrZXR9LCBcIiR7ZGlyZWN0b3J5fVwiKS4uLmApO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFMzIExpc3QgKE9iamVjdHMpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnN0IHMzX29iamVjdF9saXN0ID0gYXdhaXQgKHMzLmxpc3RPYmplY3RzVjIoe1xuICAgICAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgICAgICBQcmVmaXg6IGAke2RpcmVjdG9yeX1gLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgLy8gLi4uIHdvcmtzLCBidXQgdGhlIGZpbGUga2V5cyBhcmUgcmV0dXJuZWQgYXMgYSBwYXJ0aWFsIGxpc3Qgd2l0aG91dFxuICAgICAgICAgICAgLy8gc3BlY2lmaWVkIG9yZGVyOyBzZXQgaXMgbm90IGd1YXJhbnRlZWQgKGkuZS4gdGVzdGFibGUpXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgczNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgczNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9LyR7ZGlyZWN0b3J5fWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzM19vYmplY3RfbGlzdC5Db250ZW50cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRlc3RbXG4gICAgICAgICAgICAgICAgICBcIlMzVGVzdCByZXNvbHZlciBjYW4gbGlzdCBvYmplY3RzIGluIGBjb3JpLXJpc2ktYXBwYCB1bmRlciB0aGUgZXhhbXBsZXMvIHByZWZpeFwiXG4gICAgICAgICAgICAgICAgICBdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHMzLmdldE9iamVjdCgke0J1Y2tldH0sIFwibWFuaWZlc3QuanNvblwiKS4uLmApO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIC8qKlxuICAgICAgICAgICAgLy8gICogUzMgR2V0IChEYXRhKVxuICAgICAgICAgICAgLy8gICovXG4gICAgICAgICAgICAvLyBjb25zdCBtYW5pZmVzdF9qc29uID0gIChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgICAgICAgLy8gICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIC8vICAgICBLZXk6IFwibWFuaWZlc3QuanNvblwiXG4gICAgICAgICAgICAvLyB9KSk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gbWFuaWZlc3Rfc3RyaW5nID0gKHR5cGVvZiBtYW5pZmVzdF9qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgICAgICAgIC8vICAgKGF3YWl0IG1hbmlmZXN0X2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgICAgICAgLy8gICBgeyBcIkVycm9yXCI6IFwiUzMgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkXCIgfWA7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gY29uc3QgcnVyYWxfcGxhY2VzX2pzb24gPSAgKGF3YWl0IHMzLmdldE9iamVjdCh7XG4gICAgICAgICAgICAvLyAgICAgQnVja2V0LFxuICAgICAgICAgICAgLy8gICAgIEtleTogZGlyZWN0b3J5ICsgXCIvd2hvLXdpbnMtYjJzL3J1cmFsX3BsYWNlc18yNTAwX3BsdXMuanNvblwiXG4gICAgICAgICAgICAvLyB9KSk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gcnVyYWxfcGxhY2VzX3N0cmluZyA9ICh0eXBlb2YgcnVyYWxfcGxhY2VzX2pzb24uQm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICAgICAgLy8gICAoYXdhaXQgcnVyYWxfcGxhY2VzX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgICAgICAgLy8gICBgeyBcIkVycm9yXCI6IFwiUzMgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkXCIgfWA7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gdGVzdFtcbiAgICAgICAgICAgIC8vICAgXCJTM1Rlc3Qgb2JqZWN0IGNhbiBiZSBlbmNvZGVkIGFzIGEgdmFsaWQgY2hhcmFjdGVyIHN0cmluZ1wiXG4gICAgICAgICAgICAvLyAgIF0gPSB0cnVlO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGNvbnN0IHJ1cmFsX3BsYWNlcyA9ICBKU09OLnBhcnNlKHJ1cmFsX3BsYWNlc19zdHJpbmcpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGlmICghIXJ1cmFsX3BsYWNlcyAmJiB0eXBlb2YgcnVyYWxfcGxhY2VzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAvLyAgICAgdGVzdFtcbiAgICAgICAgICAgIC8vICAgICAgIFwiUzNUZXN0IG9iamVjdCBpcyB2YWxpZCBKU09OXCJcbiAgICAgICAgICAgIC8vICAgICAgIF0gPSB0cnVlO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBtYW5pZmVzdF9zdHJpbmcgPSBgeyBcIkVycm9yXCI6IFwiJHtlLnRvU3RyaW5nKCl9XCIgfWA7XG5cbiAgICAgICAgfSBmaW5hbGx5IHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYFMzIG9iamVjdCBCb2R5OlxuJHttYW5pZmVzdF9zdHJpbmd9XG5gKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codGVzdCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiAoe1xuICAgICAgICAvLyAgIFwibWVzc2FnZVwiOiBtYW5pZmVzdF9zdHJpbmcsXG4gICAgICAgIC8vICAgXCJ0ZXN0XCI6IHRlc3QsXG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwiczNfdGVzdFwiXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiczNfdGVzdFwiLFxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwidGVzdFwiLFxuICAgICAgICAgICAgXCJ0ZXN0XCI6IHRlc3RcbiAgICAgICAgfSk7XG5cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzM190ZXN0O1xuIl19