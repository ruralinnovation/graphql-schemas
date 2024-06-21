"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@aws-lambda-powertools/logger");
const client_s3_1 = require("@aws-sdk/client-s3");
const type_1 = require("graphql/type");
const logger = new logger_1.Logger();
const erc_value = {
    // An array (list) fails to transfer gzipped by local sam cli
    type: // new GraphQLList(
    // ... but a single return object can be gzipped locally
    new type_1.GraphQLObjectType({
        name: 'ERCValue',
        fields: () => ({
            // metric: { type: GraphQLString },
            // variable: { type: GraphQLString },
            // geoid: { type: GraphQLString },
            // year: { type: GraphQLInt },
            value: { type: type_1.GraphQLFloat }
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
            "message": erc_metadata_body_to_string,
            "value": 1.0
        };
        return [{
                ...value
            }][0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_value;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY192YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RDtBQUN2RCxrREFBd0Q7QUFDeEQsdUNBS3NCO0FBR3RCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxTQUFTLEdBQUc7SUFDaEIsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDbkIsd0RBQXdEO0lBQzVELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixtQ0FBbUM7WUFDbkMscUNBQXFDO1lBQ3JDLGtDQUFrQztZQUNsQyw4QkFBOEI7WUFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFZLEVBQUU7U0FDOUIsQ0FBQztLQUNILENBQUM7SUFDSixJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQU8sRUFDUCxFQUNFLFdBQVcsRUFBRSxFQUNYLFNBQVMsRUFDVCxZQUFZLEVBQ2IsRUFDRyxFQUNOLElBQVMsRUFDVCxFQUFFO1FBRUYsdUNBQXVDO1FBQ3ZDLDBDQUEwQztRQUMxQyxlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLFNBQVM7UUFFVCxNQUFNLEVBQUUsR0FBRyxJQUFJLGNBQUUsQ0FBRSxZQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQztRQUU1Qix5REFBeUQ7UUFDekQsb0RBQW9EO1FBQ3BELFlBQVk7UUFDWixxQkFBcUI7UUFDckIsT0FBTztRQUNQLGdHQUFnRztRQUNoRyxnRUFBZ0U7UUFDaEUsV0FBVztRQUNYLDRDQUE0QztRQUM1Qyw0Q0FBNEM7UUFDNUMsUUFBUTtRQUNSLElBQUk7UUFDSiwrRUFBK0U7UUFFL0UsaURBQWlEO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDNUMsTUFBTTtZQUNOLEdBQUcsRUFBRSxvQkFBb0I7U0FDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSixNQUFNLDJCQUEyQixHQUFHLENBQUMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoRixDQUFDLE1BQU0saUJBQWlCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELDRDQUE0QyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLDJCQUEyQixFQUFFLENBQUMsQ0FBQztRQUU5RCxNQUFNLEtBQUssR0FBRztZQUNaLFNBQVMsRUFBRSwyQkFBMkI7WUFDdEMsT0FBTyxFQUFFLEdBQUc7U0FDYixDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHdEQUF3RDtJQUNwRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7XG4gIEdyYXBoUUxGbG9hdCxcbiAgR3JhcGhRTEludCxcbiAgR3JhcGhRTE9iamVjdFR5cGUsXG4gIEdyYXBoUUxTdHJpbmdcbn0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNvbnN0IGVyY192YWx1ZSA9IHtcbiAgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaVxuICB0eXBlOiAvLyBuZXcgR3JhcGhRTExpc3QoXG4gICAgICAgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gICAgbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICAgIG5hbWU6ICdFUkNWYWx1ZScsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIC8vIG1ldHJpYzogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIC8vIHZhcmlhYmxlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgLy8gZ2VvaWQ6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICAvLyB5ZWFyOiB7IHR5cGU6IEdyYXBoUUxJbnQgfSxcbiAgICAgICAgdmFsdWU6IHsgdHlwZTogR3JhcGhRTEZsb2F0IH1cbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICBweXRob25BcGksXG4gICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgfVxuICAgIH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgLy8gbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgLy8gbG9nZ2VyLmluZm8oYGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgLy8gICBweXRob25BcGksXG4gICAgLy8gICBzM0RhdGFTb3VyY2VcbiAgICAvLyBdKX1gKTtcblxuICAgIGNvbnN0IHMzID0gbmV3IFMzKChzM0RhdGFTb3VyY2UgYXMgYW55KS5jb25maWcpO1xuICAgIGNvbnN0IEJ1Y2tldCA9IFwiZXJjLXB1YmxpY1wiO1xuXG4gICAgLy8gLy8gVE9ETzogVHJ5IHRvIGZldGNoIGxpc3Qgb2Ygb2JqZWN0cyBpbiBidWNrZXQvcHJlZml4XG4gICAgLy8gY29uc3QgZXJjX29iamVjdF9saXN0ID0gYXdhaXQgKHMzLmxpc3RPYmplY3RzVjIoe1xuICAgIC8vICAgQnVja2V0LFxuICAgIC8vICAgUHJlZml4OiBgdGVzdC9gLFxuICAgIC8vIH0pKTtcbiAgICAvLyBpZiAodHlwZW9mIGVyY19vYmplY3RfbGlzdC5Db250ZW50cyAhPT0gXCJvYmplY3RcIiB8fCBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHM/Lmxlbmd0aCA9PT0gMCkge1xuICAgIC8vICAgbG9nZ2VyLmluZm8oYE5vIG9iamVjdHMgZm91bmQgdW5kZXIgczM6Ly8ke0J1Y2tldH0vdGVzdC9gKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzLmZvckVhY2goYyA9PiB7XG4gICAgLy8gICAgIGxvZ2dlci5pbmZvKGMuS2V5Py50b1N0cmluZygpIHx8IFwiXCIpO1xuICAgIC8vICAgfSk7XG4gICAgLy8gfVxuICAgIC8vIC8vIC4uLiB3b3JrcywgYnV0IHRoZSBmaWxlIGtleXMgYXJlIHJldHVybmVkIGFzIGEgcGFydGlhbCBsaXN0OyBub3QgcmVsaWFibGVcblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBTMyByZXNvdXJjZSAob2JqZWN0IGJ5IGtleSlcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfanNvbiA9IChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgQnVja2V0LFxuICAgICAgS2V5OiBcInRlc3QvbWV0YWRhdGEuanNvblwiXG4gICAgfSkpO1xuICAgIGNvbnN0IGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyA9ICh0eXBlb2YgZXJjX21ldGFkYXRhX2pzb24uQm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgKGF3YWl0IGVyY19tZXRhZGF0YV9qc29uLkJvZHk/LnRyYW5zZm9ybVRvU3RyaW5nKCkpIDpcbiAgICAgIGB7IFwiRXJyb3JcIjogXCJTMyBvYmplY3QgQm9keSBpcyB1bmRlZmluZWRcIiB9YDtcblxuICAgIGxvZ2dlci5pbmZvKGBTMyBvYmplY3QgQm9keTogJHtlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmd9YCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgIFwibWVzc2FnZVwiOiBlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmcsXG4gICAgICBcInZhbHVlXCI6IDEuMFxuICAgIH07XG5cbiAgICByZXR1cm4gW3sgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaS4uLlxuICAgICAgICAuLi52YWx1ZVxuICAgIH1dWzBdOyAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlcmNfdmFsdWU7XG4iXX0=