"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@aws-lambda-powertools/logger");
const client_s3_1 = require("@aws-sdk/client-s3");
const type_1 = require("graphql/type");
const flatted_1 = require("flatted");
const types_1 = require("../../types");
const logger = new logger_1.Logger();
const erc_test = {
    // An array (list) fails to transfer gzipped by local sam cli
    type: // new GraphQLList(
    // ... but a single return object can be gzipped locally
    new type_1.GraphQLObjectType({
        name: 'ERCS3TestObject',
        fields: () => ({
            erc_s3_test: { type: types_1.JSONObject },
            message: { type: type_1.GraphQLString },
        })
    }),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi, s3DataSource } }, info) => {
        logger.info('This is an INFO log!');
        logger.info(`dataSources: ${(0, flatted_1.stringify)([
            pythonApi,
            s3DataSource
        ])}`);
        const s3 = new client_s3_1.S3(s3DataSource.config);
        const Bucket = "erc-public";
        // // TODO: Try to fetch list of buckets
        // const s3_bucket_list = await (s3.listBuckets());
        // if (typeof s3_bucket_list.Buckets !== "object" || s3_bucket_list.Buckets?.length === 0) {
        //   logger.info(`No S3 buckets found`);
        // } else {
        //   s3_bucket_list.Buckets.forEach(b => {
        //     logger.info(b.Name?.toString() || "");
        //   });
        // }
        // TODO: Try to fetch list of objects in bucket/prefix
        const erc_object_list = await (s3.listObjectsV2({
            Bucket,
            Prefix: `test/`,
        }));
        if (typeof erc_object_list.Contents !== "object" || erc_object_list.Contents?.length === 0) {
            logger.info(`No objects found under s3://${Bucket}/test/`);
        }
        else {
            erc_object_list.Contents.forEach(c => {
                logger.info(c.Key?.toString() || "");
            });
        }
        // TODO: Try to fetch S3 resource
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMERBQXVEO0FBQ3ZELGtEQUF3RDtBQUN4RCx1Q0FBZ0U7QUFDaEUscUNBQTRDO0FBQzVDLHVDQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0FBRTVCLE1BQU0sUUFBUSxHQUFHO0lBQ2YsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDbkIsd0RBQXdEO0lBQzVELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBVSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ2pDLENBQUM7S0FDSCxDQUFDO0lBQ0osSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFDRSxXQUFXLEVBQUUsRUFDWCxTQUFTLEVBQ1QsWUFBWSxFQUNiLEVBQ0csRUFDTixJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFBLG1CQUFTLEVBQUM7WUFDcEMsU0FBUztZQUNULFlBQVk7U0FDYixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRU4sTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFFLENBQUUsWUFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFFNUIsd0NBQXdDO1FBQ3hDLG1EQUFtRDtRQUNuRCw0RkFBNEY7UUFDNUYsd0NBQXdDO1FBQ3hDLFdBQVc7UUFDWCwwQ0FBMEM7UUFDMUMsNkNBQTZDO1FBQzdDLFFBQVE7UUFDUixJQUFJO1FBRUosc0RBQXNEO1FBQ3RELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQzlDLE1BQU07WUFDTixNQUFNLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksT0FBTyxlQUFlLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMzRixNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixNQUFNLFFBQVEsQ0FBQyxDQUFDO1FBQzdELENBQUM7YUFBTSxDQUFDO1lBQ04sZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxpQ0FBaUM7UUFDakMsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxNQUFNO1lBQ04sR0FBRyxFQUFFLG9CQUFvQjtTQUMxQixDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLGlCQUFpQixDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsNENBQTRDLENBQUM7UUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBRTlELE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7WUFDdEQsU0FBUyxFQUFFLDJCQUEyQjtTQUN2QyxDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHdEQUF3RDtJQUNwRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgc3RyaW5naWZ5LCB0b0pTT04gfSBmcm9tIFwiZmxhdHRlZFwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNvbnN0IGVyY190ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgICAgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0VSQ1MzVGVzdE9iamVjdCcsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIGVyY19zM190ZXN0OiB7IHR5cGU6IEpTT05PYmplY3QgfSxcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICB9KVxuICAgIH0pLFxuICBhcmdzOiBudWxsLFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIF9fOiBhbnksXG4gICAge1xuICAgICAgZGF0YVNvdXJjZXM6IHtcbiAgICAgICAgcHl0aG9uQXBpLFxuICAgICAgICBzM0RhdGFTb3VyY2VcbiAgICAgIH1cbiAgICB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcblxuICAgIGxvZ2dlci5pbmZvKCdUaGlzIGlzIGFuIElORk8gbG9nIScpO1xuICAgIGxvZ2dlci5pbmZvKGBkYXRhU291cmNlczogJHtzdHJpbmdpZnkoW1xuICAgICAgcHl0aG9uQXBpLFxuICAgICAgczNEYXRhU291cmNlXG4gICAgXSl9YCk7XG5cbiAgICBjb25zdCBzMyA9IG5ldyBTMygoczNEYXRhU291cmNlIGFzIGFueSkuY29uZmlnKTtcbiAgICBjb25zdCBCdWNrZXQgPSBcImVyYy1wdWJsaWNcIjtcblxuICAgIC8vIC8vIFRPRE86IFRyeSB0byBmZXRjaCBsaXN0IG9mIGJ1Y2tldHNcbiAgICAvLyBjb25zdCBzM19idWNrZXRfbGlzdCA9IGF3YWl0IChzMy5saXN0QnVja2V0cygpKTtcbiAgICAvLyBpZiAodHlwZW9mIHMzX2J1Y2tldF9saXN0LkJ1Y2tldHMgIT09IFwib2JqZWN0XCIgfHwgczNfYnVja2V0X2xpc3QuQnVja2V0cz8ubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gICBsb2dnZXIuaW5mbyhgTm8gUzMgYnVja2V0cyBmb3VuZGApO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBzM19idWNrZXRfbGlzdC5CdWNrZXRzLmZvckVhY2goYiA9PiB7XG4gICAgLy8gICAgIGxvZ2dlci5pbmZvKGIuTmFtZT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBsaXN0IG9mIG9iamVjdHMgaW4gYnVja2V0L3ByZWZpeFxuICAgIGNvbnN0IGVyY19vYmplY3RfbGlzdCA9IGF3YWl0IChzMy5saXN0T2JqZWN0c1YyKHtcbiAgICAgIEJ1Y2tldCxcbiAgICAgIFByZWZpeDogYHRlc3QvYCxcbiAgICB9KSk7XG4gICAgaWYgKHR5cGVvZiBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9L3Rlc3QvYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyY19vYmplY3RfbGlzdC5Db250ZW50cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBTMyByZXNvdXJjZVxuICAgIGNvbnN0IGVyY19tZXRhZGF0YV9qc29uID0gKGF3YWl0IHMzLmdldE9iamVjdCh7XG4gICAgICBCdWNrZXQsXG4gICAgICBLZXk6IFwidGVzdC9tZXRhZGF0YS5qc29uXCJcbiAgICB9KSk7XG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nID0gKHR5cGVvZiBlcmNfbWV0YWRhdGFfanNvbi5Cb2R5ID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAoYXdhaXQgZXJjX21ldGFkYXRhX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgYHsgXCJFcnJvclwiOiBcIlMzIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZFwiIH1gO1xuXG4gICAgbG9nZ2VyLmluZm8oYFMzIG9iamVjdCBCb2R5OiAke2VyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZ31gKTtcblxuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgXCJlcmNfczNfdGVzdFwiOiBKU09OLnBhcnNlKGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyksXG4gICAgICBcIm1lc3NhZ2VcIjogZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nXG4gICAgfTtcblxuICAgIHJldHVybiBbeyAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpLi4uXG4gICAgICAgIC4uLnZhbHVlXG4gICAgfV1bMF07ICAgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVyY190ZXN0O1xuIl19