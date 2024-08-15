"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Logger } from "@aws-lambda-powertools/logger";
const type_1 = require("graphql/type");
const types_1 = require("../../types");
const client_s3_1 = require("@aws-sdk/client-s3");
const child_process_1 = require("child_process");
/**
 * TODO: Debug this error...
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
// exec('date', (err, stdout, stderr) => {
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     // console.log(`stderr: ${stderr}`);
//
//     if (err) {
//         // node couldn't execute the command
//         return;
//     }
// });
(0, child_process_1.exec)('ls -l /etc/localtime', (err, stdout, stderr) => {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    if (err) {
        // node couldn't execute the command
        return;
    }
});
(0, child_process_1.exec)('timedatectl set-timezone America/New_York', (err, stdout, stderr) => {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    console.log("");
    if (err) {
        // node couldn't execute the command
        return;
    }
});
(0, child_process_1.exec)('ls -l /etc/localtime', (err, stdout, stderr) => {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    if (err) {
        // node couldn't execute the command
        return;
    }
});
(0, child_process_1.exec)('zdump /etc/localtime', (err, stdout, stderr) => {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    if (err) {
        // node couldn't execute the command
        return;
    }
});
// // Logger object is currently producing an error when run locally w/ SAM...
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
            console.log(`s3.getObject(${Bucket}, "manifest.json")...`);
            /**
             * S3 Get (Data)
             */
            const manifest_json = (await s3.getObject({
                Bucket,
                Key: "manifest.json"
            }));
            manifest_string = (typeof manifest_json.Body === "object") ?
                (await manifest_json.Body?.transformToString()) :
                `{ "Error": "S3 object Body is undefined" }`;
            const rural_places_json = (await s3.getObject({
                Bucket,
                Key: directory + "/who-wins-b2s/rural_places_2500_plus.json"
            }));
            rural_places_string = (typeof rural_places_json.Body === "object") ?
                (await rural_places_json.Body?.transformToString()) :
                `{ "Error": "S3 object Body is undefined" }`;
            test["S3Test object can be encoded as a valid character string"] = true;
            const rural_places = JSON.parse(rural_places_string);
            if (!!rural_places && typeof rural_places === "object") {
                test["S3Test object is valid JSON"] = true;
            }
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
};
exports.default = s3_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczNfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL3MzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBMEQ7QUFDMUQsdUNBQWdFO0FBQ2hFLHVDQUF5QztBQUN6QyxrREFBd0M7QUFDeEMsaURBQXFDO0FBRXJDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsMENBQTBDO0FBQzFDLG1EQUFtRDtBQUNuRCx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLEVBQUU7QUFDRixpQkFBaUI7QUFDakIsK0NBQStDO0FBQy9DLGtCQUFrQjtBQUNsQixRQUFRO0FBQ1IsTUFBTTtBQUNOLElBQUEsb0JBQUksRUFBQyxzQkFBc0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDakQsNENBQTRDO0lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLG9DQUFvQztJQUVwQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ04sb0NBQW9DO1FBQ3BDLE9BQU87SUFDWCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxJQUFBLG9CQUFJLEVBQUMsMkNBQTJDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3RFLDRDQUE0QztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWhCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDTixvQ0FBb0M7UUFDcEMsT0FBTztJQUNYLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUNI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QUV0RCxJQUFJLENBQUMsQ0FBQyxZQUFZLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FDRiw2QkFBNkIsQ0FDNUIsR0FBRyxJQUFJLENBQUM7WUFDZixDQUFDO1FBRUwsQ0FBQztRQUFDLE9BQU8sQ0FBTSxFQUFFLENBQUM7WUFFZCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLGVBQWUsR0FBRyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO1FBRXZELENBQUM7Z0JBQVMsQ0FBQztZQUVQLE9BQU8sQ0FBQyxHQUFHLENBQUM7RUFDdEIsZUFBZTtDQUNoQixDQUFDLENBQUM7WUFFUyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLENBQUM7UUFFRCxZQUFZO1FBQ1oseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QixtQkFBbUI7UUFDbkIsTUFBTTtRQUVOLE9BQU8sQ0FBQztZQUNKLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQGF3cy1sYW1iZGEtcG93ZXJ0b29scy9sb2dnZXJcIjtcbmltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgUzMgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLyoqXG4gKiBUT0RPOiBEZWJ1ZyB0aGlzIGVycm9yLi4uXG4vLyBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gKiBSYW5nZUVycm9yOiBJbnZhbGlkIHRpbWUgem9uZSBzcGVjaWZpZWQ6IDovZXRjL2xvY2FsdGltZSxcbiAqICBhdCBuZXcgRGF0ZVRpbWVGb3JtYXQgKDxhbm9ueW1vdXM+KSxcbiAqICBhdCAjZ2V0RGF0ZUZvcm1hdHRlciAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzQ0ODoxNiksXG4gKiAgYXQgI2dlbmVyYXRlSVNPVGltZXN0YW1wV2l0aE9mZnNldCAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzQ2MDo4MiksXG4gKiAgYXQgUG93ZXJ0b29sc0xvZ0Zvcm1hdHRlcjIuZm9ybWF0VGltZXN0YW1wICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NDI5OjU0KSxcbiAqICBhdCBQb3dlcnRvb2xzTG9nRm9ybWF0dGVyMi5mb3JtYXRBdHRyaWJ1dGVzICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NTQwOjI3KSxcbiAqICBhdCBMb2dnZXIyLmNyZWF0ZUFuZFBvcHVsYXRlTG9nSXRlbSAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzgzMjozOSksXG4gKiAgYXQgTG9nZ2VyMi5wcm9jZXNzTG9nSXRlbSAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzg3MDo0MiksXG4gKiAgYXQgTG9nZ2VyMi5pbmZvICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NjcwOjE0KSxcbiAqICBhdCByZXNvbHZlICgvdmFyL3Rhc2svaW5kZXguanM6MTI4MDQ2OjE3KSxcbiAqICBhdCBmaWVsZC5yZXNvbHZlICgvdmFyL3Rhc2svaW5kZXguanM6NTc0MzU6MjIpXG4gKi9cblxuLy8gZXhlYygnZGF0ZScsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4vLyAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbi8vICAgICBjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcbi8vICAgICAvLyBjb25zb2xlLmxvZyhgc3RkZXJyOiAke3N0ZGVycn1gKTtcbi8vXG4vLyAgICAgaWYgKGVycikge1xuLy8gICAgICAgICAvLyBub2RlIGNvdWxkbid0IGV4ZWN1dGUgdGhlIGNvbW1hbmRcbi8vICAgICAgICAgcmV0dXJuO1xuLy8gICAgIH1cbi8vIH0pO1xuZXhlYygnbHMgLWwgL2V0Yy9sb2NhbHRpbWUnLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIC8vIHRoZSAqZW50aXJlKiBzdGRvdXQgYW5kIHN0ZGVyciAoYnVmZmVyZWQpXG4gICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgLy8gY29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG5cbiAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgICAgICByZXR1cm47XG4gICAgfVxufSk7XG5leGVjKCd0aW1lZGF0ZWN0bCBzZXQtdGltZXpvbmUgQW1lcmljYS9OZXdfWW9yaycsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICBjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcbiAgICBjb25zb2xlLmxvZyhgc3RkZXJyOiAke3N0ZGVycn1gKTtcbiAgICBjb25zb2xlLmxvZyhcIlwiKTtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gbm9kZSBjb3VsZG4ndCBleGVjdXRlIHRoZSBjb21tYW5kXG4gICAgICAgIHJldHVybjtcbiAgICB9XG59KTtcbmV4ZWMoJ2xzIC1sIC9ldGMvbG9jYWx0aW1lJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAvLyB0aGUgKmVudGlyZSogc3Rkb3V0IGFuZCBzdGRlcnIgKGJ1ZmZlcmVkKVxuICAgIGNvbnNvbGUubG9nKGBzdGRvdXQ6ICR7c3Rkb3V0fWApO1xuICAgIC8vIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuXG4gICAgaWYgKGVycikge1xuICAgICAgICAvLyBub2RlIGNvdWxkbid0IGV4ZWN1dGUgdGhlIGNvbW1hbmRcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn0pO1xuZXhlYygnemR1bXAgL2V0Yy9sb2NhbHRpbWUnLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIC8vIHRoZSAqZW50aXJlKiBzdGRvdXQgYW5kIHN0ZGVyciAoYnVmZmVyZWQpXG4gICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgLy8gY29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG5cbiAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgICAgICByZXR1cm47XG4gICAgfVxufSk7XG5cbi8vIC8vIExvZ2dlciBvYmplY3QgaXMgY3VycmVudGx5IHByb2R1Y2luZyBhbiBlcnJvciB3aGVuIHJ1biBsb2NhbGx5IHcvIFNBTS4uLlxuXG4vLyAvLyBSYW5nZUVycm9yOiBJbnZhbGlkIHRpbWUgem9uZSBzcGVjaWZpZWQ6IDovZXRjL2xvY2FsdGltZSxcbi8vIC8vICAgICBhdCBuZXcgRGF0ZVRpbWVGb3JtYXQgKDxhbm9ueW1vdXM+KSxcbi8vIC8vICAgICBhdCAjZ2V0RGF0ZUZvcm1hdHRlciAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzQ0ODoxNiksXG4vLyAvLyAgICAgYXQgI2dlbmVyYXRlSVNPVGltZXN0YW1wV2l0aE9mZnNldCAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzQ2MDo4MiksXG4vLyAvLyAgICAgYXQgUG93ZXJ0b29sc0xvZ0Zvcm1hdHRlcjIuZm9ybWF0VGltZXN0YW1wICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NDI5OjU0KSxcbi8vIC8vICAgICBhdCBQb3dlcnRvb2xzTG9nRm9ybWF0dGVyMi5mb3JtYXRBdHRyaWJ1dGVzICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NTQwOjI3KSxcbi8vIC8vICAgICBhdCBMb2dnZXIyLmNyZWF0ZUFuZFBvcHVsYXRlTG9nSXRlbSAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzgzMjozOSksXG4vLyAvLyAgICAgYXQgTG9nZ2VyMi5wcm9jZXNzTG9nSXRlbSAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzg3MDo0MiksXG4vLyAvLyAgICAgYXQgTG9nZ2VyMi5pbmZvICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NjcwOjE0KSxcbi8vIC8vICAgICBhdCByZXNvbHZlICgvdmFyL3Rhc2svaW5kZXguanM6MTI4MDQ2OjE3KSxcbi8vIC8vICAgICBhdCBmaWVsZC5yZXNvbHZlICgvdmFyL3Rhc2svaW5kZXguanM6NTc0MzU6MjIpXG5cbmNvbnN0IHMzX3Rlc3QgPSB7XG4gICAgdHlwZTogbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICAgICAgbmFtZTogJ1MzVGVzdCcsXG4gICAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICAgICAgdGVzdDogeyB0eXBlOiBKU09OT2JqZWN0IH0sIC8vIDwtLSBvYmplY3QgY29udGFpbmluZyByZXN1bHRzIG9mIGFsbCB0ZXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtLSBydW4gYnkgdGhlIHJlc29sdmVyIHN0b3JlZCBhczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LS0geyBcInRlc3QgZGVzY3JpcHRpb25cIjogdHJ1ZSB8IGZhbHNlIH1cbiAgICAgICAgICAgIHR5cGU6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9XG4gICAgICAgIH0pXG4gICAgfSksXG4gICAgYXJnczogbnVsbCxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICBfXzogYW55LCAvLyB7IC4uLmFyZ3MgfTogeyBhcmc6IHR5cGUsIC4uLiB9XG4gICAgICB7XG4gICAgICAgICAgZGF0YVNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgcmVzdEFwaSxcbiAgICAgICAgICAgICAgczNEYXRhU291cmNlXG4gICAgICAgICAgfVxuICAgICAgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiAge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzb2x2ZSBTM1Rlc3QuLi5cIiwge1xuICAgICAgICAgICAgcmVzdEFwaSxcbiAgICAgICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbWFuaWZlc3Rfc3RyaW5nID0gXCJcIixcbiAgICAgICAgICAgIHJ1cmFsX3BsYWNlc19zdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIGNvbnN0IHRlc3QgPSB7XG4gICAgICAgICAgICBcIlMzVGVzdCByZXNvbHZlciBjYW4gbGlzdCBvYmplY3RzIGluIGBjb3JpLXJpc2ktYXBwYCB1bmRlciB0aGUgZXhhbXBsZXMvIHByZWZpeFwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwiUzNUZXN0IG9iamVjdCBjYW4gYmUgZW5jb2RlZCBhcyBhIHZhbGlkIGNoYXJhY3RlciBzdHJpbmdcIjogZmFsc2UsXG4gICAgICAgICAgICBcIlMzVGVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiOiBmYWxzZVxuICAgICAgICB9O1xuXG5cbiAgICAgICAgY29uc3QgczMgPSBuZXcgUzMoKTtcbiAgICAgICAgY29uc3QgQnVja2V0ID0gXCJjb3JpLXJpc2ktYXBwc1wiO1xuICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSBcImV4YW1wbGVzXCI7XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUT0RPOiBTMyBMaXN0IChCdWNrZXRzKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVE9ETzogUzMgTGlzdCAoRGF0YSlcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgczMubGlzdE9iamVjdHNWMigke0J1Y2tldH0sIFwiJHtkaXJlY3Rvcnl9XCIpLi4uYCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUzMgTGlzdCAoT2JqZWN0cylcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29uc3QgczNfb2JqZWN0X2xpc3QgPSBhd2FpdCAoczMubGlzdE9iamVjdHNWMih7XG4gICAgICAgICAgICAgICAgQnVja2V0LFxuICAgICAgICAgICAgICAgIFByZWZpeDogYCR7ZGlyZWN0b3J5fWAsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAvLyAuLi4gd29ya3MsIGJ1dCB0aGUgZmlsZSBrZXlzIGFyZSByZXR1cm5lZCBhcyBhIHBhcnRpYWwgbGlzdCB3aXRob3V0XG4gICAgICAgICAgICAvLyBzcGVjaWZpZWQgb3JkZXI7IHNldCBpcyBub3QgZ3VhcmFudGVlZCAoaS5lLiB0ZXN0YWJsZSlcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzM19vYmplY3RfbGlzdC5Db250ZW50cyAhPT0gXCJvYmplY3RcIiB8fCBzM19vYmplY3RfbGlzdC5Db250ZW50cz8ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vJHtkaXJlY3Rvcnl9YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMzX29iamVjdF9saXN0LkNvbnRlbnRzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgICAgIFwiUzNUZXN0IHJlc29sdmVyIGNhbiBsaXN0IG9iamVjdHMgaW4gYGNvcmktcmlzaS1hcHBgIHVuZGVyIHRoZSBleGFtcGxlcy8gcHJlZml4XCJcbiAgICAgICAgICAgICAgICAgIF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgczMuZ2V0T2JqZWN0KCR7QnVja2V0fSwgXCJtYW5pZmVzdC5qc29uXCIpLi4uYCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUzMgR2V0IChEYXRhKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBtYW5pZmVzdF9qc29uID0gIChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgICAgICBLZXk6IFwibWFuaWZlc3QuanNvblwiXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIG1hbmlmZXN0X3N0cmluZyA9ICh0eXBlb2YgbWFuaWZlc3RfanNvbi5Cb2R5ID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAgICAgICAgIChhd2FpdCBtYW5pZmVzdF9qc29uLkJvZHk/LnRyYW5zZm9ybVRvU3RyaW5nKCkpIDpcbiAgICAgICAgICAgICAgYHsgXCJFcnJvclwiOiBcIlMzIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZFwiIH1gO1xuXG4gICAgICAgICAgICBjb25zdCBydXJhbF9wbGFjZXNfanNvbiA9ICAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgICAgICAgICAgICBCdWNrZXQsXG4gICAgICAgICAgICAgICAgS2V5OiBkaXJlY3RvcnkgKyBcIi93aG8td2lucy1iMnMvcnVyYWxfcGxhY2VzXzI1MDBfcGx1cy5qc29uXCJcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcnVyYWxfcGxhY2VzX3N0cmluZyA9ICh0eXBlb2YgcnVyYWxfcGxhY2VzX2pzb24uQm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICAgICAgICAoYXdhaXQgcnVyYWxfcGxhY2VzX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgICAgICAgICBgeyBcIkVycm9yXCI6IFwiUzMgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkXCIgfWA7XG5cbiAgICAgICAgICAgIHRlc3RbXG4gICAgICAgICAgICAgIFwiUzNUZXN0IG9iamVjdCBjYW4gYmUgZW5jb2RlZCBhcyBhIHZhbGlkIGNoYXJhY3RlciBzdHJpbmdcIlxuICAgICAgICAgICAgICBdID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29uc3QgcnVyYWxfcGxhY2VzID0gIEpTT04ucGFyc2UocnVyYWxfcGxhY2VzX3N0cmluZyk7XG5cbiAgICAgICAgICAgIGlmICghIXJ1cmFsX3BsYWNlcyAmJiB0eXBlb2YgcnVyYWxfcGxhY2VzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdGVzdFtcbiAgICAgICAgICAgICAgICAgIFwiUzNUZXN0IG9iamVjdCBpcyB2YWxpZCBKU09OXCJcbiAgICAgICAgICAgICAgICAgIF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBtYW5pZmVzdF9zdHJpbmcgPSBgeyBcIkVycm9yXCI6IFwiJHtlLnRvU3RyaW5nKCl9XCIgfWA7XG5cbiAgICAgICAgfSBmaW5hbGx5IHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYFMzIG9iamVjdCBCb2R5OlxuJHttYW5pZmVzdF9zdHJpbmd9XG5gKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codGVzdCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiAoe1xuICAgICAgICAvLyAgICAgXCJ0eXBlXCI6IFwiczNfdGVzdFwiLFxuICAgICAgICAvLyAgICAgXCJtZXNzYWdlXCI6IFwidGVzdFwiLFxuICAgICAgICAvLyAgICAgXCJ0ZXN0XCI6IHRlc3RcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJzM190ZXN0XCIsXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIjogbWFuaWZlc3Rfc3RyaW5nLFxuICAgICAgICAgICAgXCJ0ZXN0XCI6IHRlc3QsXG4gICAgICAgIH0pO1xuXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgczNfdGVzdDtcbiJdfQ==