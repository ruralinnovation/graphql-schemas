"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = S3Test;
const client_s3_1 = require("@aws-sdk/client-s3");
const child_process_1 = require("child_process");
async function S3Test() {
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
    (0, child_process_1.exec)('uname -a', (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        console.log("");
        if (err) {
            // node couldn't execute the command
            return;
        }
    });
    (0, child_process_1.exec)('ls -l /usr/share/zoneinfo/', (err, stdout, stderr) => {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
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
    (0, child_process_1.exec)('date', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNUZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMvczMvUzNUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEseUJBbU5DO0FBdk5ELGtEQUF3QztBQUN4QyxpREFBcUM7QUFHdEIsS0FBSyxVQUFVLE1BQU07SUFFaEM7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFFSCxJQUFBLG9CQUFJLEVBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyw0Q0FBNEM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoQixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ04sb0NBQW9DO1lBQ3BDLE9BQU87UUFDWCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFBLG9CQUFJLEVBQUMsNEJBQTRCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3ZELDRDQUE0QztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqQyxvQ0FBb0M7UUFFcEMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNOLG9DQUFvQztZQUNwQyxPQUFPO1FBQ1gsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBQSxvQkFBSSxFQUFDLHNCQUFzQixFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNqRCw0Q0FBNEM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLE1BQU0sRUFBRSxDQUFDLENB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LENBQUMsQ0FBQztRQUM1QixlQUFlLEdBQUcsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUV2RCxDQUFDO1lBQVMsQ0FBQztRQUVQLE9BQU8sQ0FBQyxHQUFHLENBQUM7RUFDbEIsZUFBZTtDQUNoQixDQUFDLENBQUM7UUFFSyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXRCLENBQUM7SUFFRCxZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsTUFBTTtJQUVOLE9BQU8sQ0FBQztRQUNKLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFNBQVMsRUFBRSxlQUFlO1FBQzFCLE1BQU0sRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFMzIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gUzNUZXN0KCkge1xuXG4gICAgLyoqXG4gICAgICogVE9ETzogRGVidWcgdGhpcyBsb2NhbCBlcnJvci4uLlxuICAgICAvLyBjb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG4gICAgICogUmFuZ2VFcnJvcjogSW52YWxpZCB0aW1lIHpvbmUgc3BlY2lmaWVkOiA6L2V0Yy9sb2NhbHRpbWUsXG4gICAgICogIGF0IG5ldyBEYXRlVGltZUZvcm1hdCAoPGFub255bW91cz4pLFxuICAgICAqICBhdCAjZ2V0RGF0ZUZvcm1hdHRlciAoL3Zhci90YXNrL2luZGV4LmpzOjEyNzQ0ODoxNiksXG4gICAgICogIGF0ICNnZW5lcmF0ZUlTT1RpbWVzdGFtcFdpdGhPZmZzZXQgKC92YXIvdGFzay9pbmRleC5qczoxMjc0NjA6ODIpLFxuICAgICAqICBhdCBQb3dlcnRvb2xzTG9nRm9ybWF0dGVyMi5mb3JtYXRUaW1lc3RhbXAgKC92YXIvdGFzay9pbmRleC5qczoxMjc0Mjk6NTQpLFxuICAgICAqICBhdCBQb3dlcnRvb2xzTG9nRm9ybWF0dGVyMi5mb3JtYXRBdHRyaWJ1dGVzICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NTQwOjI3KSxcbiAgICAgKiAgYXQgTG9nZ2VyMi5jcmVhdGVBbmRQb3B1bGF0ZUxvZ0l0ZW0gKC92YXIvdGFzay9pbmRleC5qczoxMjc4MzI6MzkpLFxuICAgICAqICBhdCBMb2dnZXIyLnByb2Nlc3NMb2dJdGVtICgvdmFyL3Rhc2svaW5kZXguanM6MTI3ODcwOjQyKSxcbiAgICAgKiAgYXQgTG9nZ2VyMi5pbmZvICgvdmFyL3Rhc2svaW5kZXguanM6MTI3NjcwOjE0KSxcbiAgICAgKiAgYXQgcmVzb2x2ZSAoL3Zhci90YXNrL2luZGV4LmpzOjEyODA0NjoxNyksXG4gICAgICogIGF0IGZpZWxkLnJlc29sdmUgKC92YXIvdGFzay9pbmRleC5qczo1NzQzNToyMilcbiAgICAgKi9cblxuICAgIGV4ZWMoJ3VuYW1lIC1hJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlwiKTtcblxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAvLyBub2RlIGNvdWxkbid0IGV4ZWN1dGUgdGhlIGNvbW1hbmRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGV4ZWMoJ2xzIC1sIC91c3Ivc2hhcmUvem9uZWluZm8vJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZXhlYygnbHMgLWwgL2V0Yy9sb2NhbHRpbWUnLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICAvLyB0aGUgKmVudGlyZSogc3Rkb3V0IGFuZCBzdGRlcnIgKGJ1ZmZlcmVkKVxuICAgICAgICBjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG5cbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgLy8gbm9kZSBjb3VsZG4ndCBleGVjdXRlIHRoZSBjb21tYW5kXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBleGVjKCdtdiAvZXRjL2xvY2FsdGltZSAvZXRjL2xvY2FsdGltZS5iYWsnLCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIC8vICAgICAvLyB0aGUgKmVudGlyZSogc3Rkb3V0IGFuZCBzdGRlcnIgKGJ1ZmZlcmVkKVxuICAgIC8vICAgICBjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgIC8vXG4gICAgLy8gICAgIGlmIChlcnIpIHtcbiAgICAvLyAgICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG4gICAgLy8gZXhlYygnbG4gLXMgL3Vzci9zaGFyZS96b25laW5mby9BbWVyaWNhL05ld19Zb3JrIC9ldGMvbG9jYWx0aW1lJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAvLyAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICAvLyAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAvL1xuICAgIC8vICAgICBpZiAoZXJyKSB7XG4gICAgLy8gICAgICAgICAvLyBub2RlIGNvdWxkbid0IGV4ZWN1dGUgdGhlIGNvbW1hbmRcbiAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIGV4ZWMoJ2xzIC1sIC9ldGMvbG9jYWx0aW1lJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAvLyAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICAvLyAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuICAgIC8vXG4gICAgLy8gICAgIGlmIChlcnIpIHtcbiAgICAvLyAgICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG4gICAgZXhlYygnZGF0ZScsIChlcnIsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuICAgIH0pO1xuICAgIGV4ZWMoJ3pkdW1wIC9ldGMvbG9jYWx0aW1lJywgKGVyciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgLy8gdGhlICplbnRpcmUqIHN0ZG91dCBhbmQgc3RkZXJyIChidWZmZXJlZClcbiAgICAgICAgY29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xuXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vIG5vZGUgY291bGRuJ3QgZXhlY3V0ZSB0aGUgY29tbWFuZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgbWFuaWZlc3Rfc3RyaW5nID0gXCJcIixcbiAgICAgIHJ1cmFsX3BsYWNlc19zdHJpbmcgPSBcIlwiO1xuXG4gICAgY29uc3QgdGVzdCA9IHtcbiAgICAgICAgXCJTM1Rlc3QgcmVzb2x2ZXIgY2FuIGxpc3Qgb2JqZWN0cyBpbiBgY29yaS1yaXNpLWFwcGAgdW5kZXIgdGhlIGV4YW1wbGVzLyBwcmVmaXhcIjogZmFsc2UsXG4gICAgICAgIFwiUzNUZXN0IG9iamVjdCBjYW4gYmUgZW5jb2RlZCBhcyBhIHZhbGlkIGNoYXJhY3RlciBzdHJpbmdcIjogZmFsc2UsXG4gICAgICAgIFwiUzNUZXN0IG9iamVjdCBpcyB2YWxpZCBKU09OXCI6IGZhbHNlXG4gICAgfTtcblxuXG4gICAgY29uc3QgczMgPSBuZXcgUzMoKTtcbiAgICBjb25zdCBCdWNrZXQgPSBcImNvcmktcmlzaS1hcHBzXCI7XG4gICAgY29uc3QgZGlyZWN0b3J5ID0gXCJleGFtcGxlc1wiO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzogUzMgTGlzdCAoQnVja2V0cylcbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IFMzIExpc3QgKERhdGEpXG4gICAgICAgICAqL1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGBzMy5saXN0T2JqZWN0c1YyKFwiJHtCdWNrZXR9XCIsIFwiJHtkaXJlY3Rvcnl9XCIpLi4uYCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFMzIExpc3QgKE9iamVjdHMpXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBzM19vYmplY3RfbGlzdCA9IGF3YWl0IChzMy5saXN0T2JqZWN0c1YyKHtcbiAgICAgICAgICAgIEJ1Y2tldCxcbiAgICAgICAgICAgIFByZWZpeDogYCR7ZGlyZWN0b3J5fWAsXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gLi4uIHdvcmtzLCBidXQgdGhlIGZpbGUga2V5cyBhcmUgcmV0dXJuZWQgYXMgYSBwYXJ0aWFsIGxpc3Qgd2l0aG91dFxuICAgICAgICAvLyBzcGVjaWZpZWQgb3JkZXI7IHNldCBpcyBub3QgZ3VhcmFudGVlZCAoaS5lLiB0ZXN0YWJsZSlcblxuICAgICAgICBpZiAodHlwZW9mIHMzX29iamVjdF9saXN0LkNvbnRlbnRzICE9PSBcIm9iamVjdFwiIHx8IHMzX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9LyR7ZGlyZWN0b3J5fWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczNfb2JqZWN0X2xpc3QuQ29udGVudHMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0W1xuICAgICAgICAgICAgICBcIlMzVGVzdCByZXNvbHZlciBjYW4gbGlzdCBvYmplY3RzIGluIGBjb3JpLXJpc2ktYXBwYCB1bmRlciB0aGUgZXhhbXBsZXMvIHByZWZpeFwiXG4gICAgICAgICAgICAgIF0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coYHMzLmdldE9iamVjdCgke0J1Y2tldH0sIFwibWFuaWZlc3QuanNvblwiKS4uLmApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTMyBHZXQgKERhdGEpXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBtYW5pZmVzdF9qc29uID0gIChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgICAgICAgQnVja2V0LFxuICAgICAgICAgICAgS2V5OiBcIm1hbmlmZXN0Lmpzb25cIlxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFuaWZlc3Rfc3RyaW5nID0gKHR5cGVvZiBtYW5pZmVzdF9qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgICAgICAoYXdhaXQgbWFuaWZlc3RfanNvbi5Cb2R5Py50cmFuc2Zvcm1Ub1N0cmluZygpKSA6XG4gICAgICAgICAgYHsgXCJFcnJvclwiOiBcIlMzIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZFwiIH1gO1xuXG4gICAgICAgIGNvbnN0IHJ1cmFsX3BsYWNlc19qc29uID0gIChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgICAgICAgQnVja2V0LFxuICAgICAgICAgICAgS2V5OiBkaXJlY3RvcnkgKyBcIi93aG8td2lucy1iMnMvcnVyYWxfcGxhY2VzXzI1MDBfcGx1cy5qc29uXCJcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHJ1cmFsX3BsYWNlc19zdHJpbmcgPSAodHlwZW9mIHJ1cmFsX3BsYWNlc19qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgICAgICAoYXdhaXQgcnVyYWxfcGxhY2VzX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgICAgIGB7IFwiRXJyb3JcIjogXCJTMyBvYmplY3QgQm9keSBpcyB1bmRlZmluZWRcIiB9YDtcblxuICAgICAgICB0ZXN0W1xuICAgICAgICAgIFwiUzNUZXN0IG9iamVjdCBjYW4gYmUgZW5jb2RlZCBhcyBhIHZhbGlkIGNoYXJhY3RlciBzdHJpbmdcIlxuICAgICAgICAgIF0gPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IHJ1cmFsX3BsYWNlcyA9ICBKU09OLnBhcnNlKHJ1cmFsX3BsYWNlc19zdHJpbmcpO1xuXG4gICAgICAgIGlmICghIXJ1cmFsX3BsYWNlcyAmJiB0eXBlb2YgcnVyYWxfcGxhY2VzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0ZXN0W1xuICAgICAgICAgICAgICBcIlMzVGVzdCBvYmplY3QgaXMgdmFsaWQgSlNPTlwiXG4gICAgICAgICAgICAgIF0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcblxuICAgICAgICBjb25zb2xlLmVycm9yKGUudG9TdHJpbmcoKSk7XG4gICAgICAgIG1hbmlmZXN0X3N0cmluZyA9IGB7IFwiRXJyb3JcIjogXCIke2UudG9TdHJpbmcoKX1cIiB9YDtcblxuICAgIH0gZmluYWxseSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coYFMzIG9iamVjdCBCb2R5OlxuJHttYW5pZmVzdF9zdHJpbmd9XG5gKTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0ZXN0KTtcblxuICAgIH1cblxuICAgIC8vIHJldHVybiAoe1xuICAgIC8vICAgICBcInR5cGVcIjogXCJzM190ZXN0XCIsXG4gICAgLy8gICAgIFwibWVzc2FnZVwiOiBcInRlc3RcIixcbiAgICAvLyAgICAgXCJ0ZXN0XCI6IHRlc3RcbiAgICAvLyB9KTtcblxuICAgIHJldHVybiAoe1xuICAgICAgICBcInR5cGVcIjogXCJzM190ZXN0XCIsXG4gICAgICAgIFwibWVzc2FnZVwiOiBtYW5pZmVzdF9zdHJpbmcsXG4gICAgICAgIFwidGVzdFwiOiB0ZXN0LFxuICAgIH0pO1xufVxuIl19