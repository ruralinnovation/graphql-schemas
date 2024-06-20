"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@aws-lambda-powertools/logger");
const client_s3_1 = require("@aws-sdk/client-s3");
const type_1 = require("graphql/type");
const types_1 = require("../../types");
const logger = new logger_1.Logger();
const erc_test = {
    // An array (list) fails to transfer gzipped by local sam cli
    type: // new GraphQLList(
    // ... but a single return object can be gzipped locally
    new type_1.GraphQLObjectType({
        name: 'ERCVariable',
        fields: () => ({
            erc_s3_test: { type: types_1.JSONObject },
            message: { type: type_1.GraphQLString },
        })
    }),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi, s3DataSource } }, info) => {
        // logger.info('This is an INFO log!');
        // logger.info(`dataSources: ${stringify([
        //   pythonApi,
        //   s3DataSource
        // ])}`);
        const s3 = new client_s3_1.S3(s3DataSource.config);
        const Bucket = "erc-public";
        // // TODO: Try to fetch list of objects in bucket/prefix
        // const erc_object_list = await (s3.listObjectsV2({
        //   Bucket,
        //   Prefix: `test/`,
        // }));
        // if (typeof erc_object_list.Contents !== "object" || erc_object_list.Contents?.length === 0) {
        //   logger.info(`No objects found under s3://${Bucket}/test/`);
        // } else {
        //   erc_object_list.Contents.forEach(c => {
        //     logger.info(c.Key?.toString() || "");
        //   });
        // }
        // // ... works, but the file keys are returned as a partial list; not reliable
        // TODO: Try to fetch S3 resource (object by key)
        const erc_metadata_json = (await s3.getObject({
            Bucket,
            Key: "test/metadata.json"
        }));
        const erc_metadata_body_to_string = (typeof erc_metadata_json.Body === "object") ?
            (await erc_metadata_json.Body?.transformToString()) :
            `{ "Error": "S3 object Body is undefined" }`;
        logger.info(`S3 object Body: ${erc_metadata_body_to_string}`);
        const value = {
            "erc_s3_test": JSON.parse(erc_metadata_body_to_string),
            "message": erc_metadata_body_to_string
        };
        return [{
                ...value
            }][0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3ZhcmlhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY192YXJpYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RDtBQUN2RCxrREFBd0Q7QUFDeEQsdUNBQWdFO0FBRWhFLHVDQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0FBRTVCLE1BQU0sUUFBUSxHQUFHO0lBQ2YsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDbkIsd0RBQXdEO0lBQzVELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQVUsRUFBRTtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUNqQyxDQUFDO0tBQ0gsQ0FBQztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUNQLEVBQ0UsV0FBVyxFQUFFLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDYixFQUNHLEVBQ04sSUFBUyxFQUNULEVBQUU7UUFFRix1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsU0FBUztRQUVULE1BQU0sRUFBRSxHQUFHLElBQUksY0FBRSxDQUFFLFlBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRTVCLHlEQUF5RDtRQUN6RCxvREFBb0Q7UUFDcEQsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixPQUFPO1FBQ1AsZ0dBQWdHO1FBQ2hHLGdFQUFnRTtRQUNoRSxXQUFXO1FBQ1gsNENBQTRDO1FBQzVDLDRDQUE0QztRQUM1QyxRQUFRO1FBQ1IsSUFBSTtRQUNKLCtFQUErRTtRQUUvRSxpREFBaUQ7UUFDakQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxNQUFNO1lBQ04sR0FBRyxFQUFFLG9CQUFvQjtTQUMxQixDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLGlCQUFpQixDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsNENBQTRDLENBQUM7UUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBRTlELE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7WUFDdEQsU0FBUyxFQUFFLDJCQUEyQjtTQUN2QyxDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHdEQUF3RDtJQUNwRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgc3RyaW5naWZ5LCB0b0pTT04gfSBmcm9tIFwiZmxhdHRlZFwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNvbnN0IGVyY190ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgICAgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0VSQ1ZhcmlhYmxlJyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgZXJjX3MzX3Rlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LFxuICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICBweXRob25BcGksXG4gICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgfVxuICAgIH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgLy8gbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgLy8gbG9nZ2VyLmluZm8oYGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgLy8gICBweXRob25BcGksXG4gICAgLy8gICBzM0RhdGFTb3VyY2VcbiAgICAvLyBdKX1gKTtcblxuICAgIGNvbnN0IHMzID0gbmV3IFMzKChzM0RhdGFTb3VyY2UgYXMgYW55KS5jb25maWcpO1xuICAgIGNvbnN0IEJ1Y2tldCA9IFwiZXJjLXB1YmxpY1wiO1xuXG4gICAgLy8gLy8gVE9ETzogVHJ5IHRvIGZldGNoIGxpc3Qgb2Ygb2JqZWN0cyBpbiBidWNrZXQvcHJlZml4XG4gICAgLy8gY29uc3QgZXJjX29iamVjdF9saXN0ID0gYXdhaXQgKHMzLmxpc3RPYmplY3RzVjIoe1xuICAgIC8vICAgQnVja2V0LFxuICAgIC8vICAgUHJlZml4OiBgdGVzdC9gLFxuICAgIC8vIH0pKTtcbiAgICAvLyBpZiAodHlwZW9mIGVyY19vYmplY3RfbGlzdC5Db250ZW50cyAhPT0gXCJvYmplY3RcIiB8fCBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgIC8vICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vdGVzdC9gKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzLmZvckVhY2goYyA9PiB7XG4gICAgLy8gICAgIGxvZ2dlci5pbmZvKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfVxuICAgIC8vIC8vIC4uLiB3b3JrcywgYnV0IHRoZSBmaWxlIGtleXMgYXJlIHJldHVybmVkIGFzIGEgcGFydGlhbCBsaXN0OyBub3QgcmVsaWFibGVcblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBTMyByZXNvdXJjZSAob2JqZWN0IGJ5IGtleSlcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfanNvbiA9IChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgQnVja2V0LFxuICAgICAgS2V5OiBcInRlc3QvbWV0YWRhdGEuanNvblwiXG4gICAgfSkpO1xuICAgIGNvbnN0IGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyA9ICh0eXBlb2YgZXJjX21ldGFkYXRhX2pzb24uQm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgKGF3YWl0IGVyY19tZXRhZGF0YV9qc29uLkJvZHk/LnRyYW5zZm9ybVRvU3RyaW5nKCkpIDpcbiAgICAgIGB7IFwiRXJyb3JcIjogXCJTMyBvYmplY3QgQm9keSBpcyB1bmRlZmluZWRcIiB9YDtcblxuICAgIGxvZ2dlci5pbmZvKGBTMyBvYmplY3QgQm9keTogJHtlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmd9YCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgIFwiZXJjX3MzX3Rlc3RcIjogSlNPTi5wYXJzZShlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmcpLFxuICAgICAgXCJtZXNzYWdlXCI6IGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZ1xuICAgIH07XG5cbiAgICByZXR1cm4gW3sgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaS4uLlxuICAgICAgICAuLi52YWx1ZVxuICAgIH1dWzBdOyAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlcmNfdGVzdDtcbiJdfQ==