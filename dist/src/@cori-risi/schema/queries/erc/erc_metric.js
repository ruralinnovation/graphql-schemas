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
        name: 'ERCMetric',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX21ldHJpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL2VyYy9lcmNfbWV0cmljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMERBQXVEO0FBQ3ZELGtEQUF3RDtBQUN4RCx1Q0FBZ0U7QUFFaEUsdUNBQXlDO0FBRXpDLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxRQUFRLEdBQUc7SUFDZiw2REFBNkQ7SUFDN0QsSUFBSSxFQUFFLG1CQUFtQjtJQUNuQix3REFBd0Q7SUFDNUQsSUFBSSx3QkFBaUIsQ0FBQztRQUNwQixJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBVSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ2pDLENBQUM7S0FDSCxDQUFDO0lBQ0osSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFDRSxXQUFXLEVBQUUsRUFDWCxTQUFTLEVBQ1QsWUFBWSxFQUNiLEVBQ0csRUFDTixJQUFTLEVBQ1QsRUFBRTtRQUVGLHVDQUF1QztRQUN2QywwQ0FBMEM7UUFDMUMsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixTQUFTO1FBRVQsTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFFLENBQUUsWUFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFFNUIseURBQXlEO1FBQ3pELG9EQUFvRDtRQUNwRCxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLE9BQU87UUFDUCxnR0FBZ0c7UUFDaEcsZ0VBQWdFO1FBQ2hFLFdBQVc7UUFDWCw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLFFBQVE7UUFDUixJQUFJO1FBQ0osK0VBQStFO1FBRS9FLGlEQUFpRDtRQUNqRCxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzVDLE1BQU07WUFDTixHQUFHLEVBQUUsb0JBQW9CO1NBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSwyQkFBMkIsR0FBRyxDQUFDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEYsQ0FBQyxNQUFNLGlCQUFpQixDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCw0Q0FBNEMsQ0FBQztRQUUvQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQiwyQkFBMkIsRUFBRSxDQUFDLENBQUM7UUFFOUQsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQztZQUN0RCxTQUFTLEVBQUUsMkJBQTJCO1NBQ3ZDLENBQUM7UUFFRixPQUFPLENBQUM7Z0JBQ0osR0FBRyxLQUFLO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksd0RBQXdEO0lBQ3BFLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGF3cy1sYW1iZGEtcG93ZXJ0b29scy9sb2dnZXInO1xuaW1wb3J0IHsgUzMsIFMzQ2xpZW50Q29uZmlnIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnksIHRvSlNPTiB9IGZyb20gXCJmbGF0dGVkXCI7XG5pbXBvcnQgeyBKU09OT2JqZWN0IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuY29uc3QgZXJjX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAgICAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnRVJDTWV0cmljJyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgZXJjX3MzX3Rlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LFxuICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICBweXRob25BcGksXG4gICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgfVxuICAgIH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgLy8gbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgLy8gbG9nZ2VyLmluZm8oYGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgLy8gICBweXRob25BcGksXG4gICAgLy8gICBzM0RhdGFTb3VyY2VcbiAgICAvLyBdKX1gKTtcblxuICAgIGNvbnN0IHMzID0gbmV3IFMzKChzM0RhdGFTb3VyY2UgYXMgYW55KS5jb25maWcpO1xuICAgIGNvbnN0IEJ1Y2tldCA9IFwiZXJjLXB1YmxpY1wiO1xuXG4gICAgLy8gLy8gVE9ETzogVHJ5IHRvIGZldGNoIGxpc3Qgb2Ygb2JqZWN0cyBpbiBidWNrZXQvcHJlZml4XG4gICAgLy8gY29uc3QgZXJjX29iamVjdF9saXN0ID0gYXdhaXQgKHMzLmxpc3RPYmplY3RzVjIoe1xuICAgIC8vICAgQnVja2V0LFxuICAgIC8vICAgUHJlZml4OiBgdGVzdC9gLFxuICAgIC8vIH0pKTtcbiAgICAvLyBpZiAodHlwZW9mIGVyY19vYmplY3RfbGlzdC5Db250ZW50cyAhPT0gXCJvYmplY3RcIiB8fCBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgIC8vICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vdGVzdC9gKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzLmZvckVhY2goYyA9PiB7XG4gICAgLy8gICAgIGxvZ2dlci5pbmZvKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfVxuICAgIC8vIC8vIC4uLiB3b3JrcywgYnV0IHRoZSBmaWxlIGtleXMgYXJlIHJldHVybmVkIGFzIGEgcGFydGlhbCBsaXN0OyBub3QgcmVsaWFibGVcblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBTMyByZXNvdXJjZSAob2JqZWN0IGJ5IGtleSlcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfanNvbiA9IChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgQnVja2V0LFxuICAgICAgS2V5OiBcInRlc3QvbWV0YWRhdGEuanNvblwiXG4gICAgfSkpO1xuICAgIGNvbnN0IGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyA9ICh0eXBlb2YgZXJjX21ldGFkYXRhX2pzb24uQm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgKGF3YWl0IGVyY19tZXRhZGF0YV9qc29uLkJvZHk/LnRyYW5zZm9ybVRvU3RyaW5nKCkpIDpcbiAgICAgIGB7IFwiRXJyb3JcIjogXCJTMyBvYmplY3QgQm9keSBpcyB1bmRlZmluZWRcIiB9YDtcblxuICAgIGxvZ2dlci5pbmZvKGBTMyBvYmplY3QgQm9keTogJHtlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmd9YCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgIFwiZXJjX3MzX3Rlc3RcIjogSlNPTi5wYXJzZShlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmcpLFxuICAgICAgXCJtZXNzYWdlXCI6IGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZ1xuICAgIH07XG5cbiAgICByZXR1cm4gW3sgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaS4uLlxuICAgICAgICAuLi52YWx1ZVxuICAgIH1dWzBdOyAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlcmNfdGVzdDtcbiJdfQ==