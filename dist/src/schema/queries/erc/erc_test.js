"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
const logger_1 = require("@aws-lambda-powertools/logger");
const client_s3_1 = require("@aws-sdk/client-s3");
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
    resolve: async (_, __, { dataSources: { pythonApi } }, info) => {
        logger.info('This is an INFO log!');
        logger.info(`erc_s3_test dataSources: ${(0, flatted_1.stringify)([
            pythonApi
        ])}`);
        // TODO: Add S3 fetch logic...
        // // TODO: Find a new way to set credentials for S3
        // // This method of setting creds is deprecated...
        // // JS SDK v3 does not support global configuration.
        // // Codemod has attempted to pass values to each service client in this file.
        // // You may need to update clients outside of this file, if they use global config.
        // AWS.config.update({
        //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //   region: process.env.AWS_REGION,
        // });
        const s3_config = {
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
            },
            region: process.env.AWS_REGION,
        };
        logger.info(`AWS credentials: ${(0, flatted_1.stringify)(s3_config)}`);
        const s3 = new client_s3_1.S3(s3_config);
        logger.info(`S3 buckets: ${(0, flatted_1.stringify)(s3.listBuckets())}`);
        // TODO: Try to fetch list of objects in bucket/prefix
        const erc_list = await (s3.listObjectsV2({
            Bucket: "erc-public",
            Prefix: `test/`,
        }));
        if (typeof erc_list.Contents !== "object" || erc_list.Contents?.length === 0) {
            logger.info(`No objects found under s3://erc-public/test/`);
        }
        else {
            erc_list.Contents.forEach(c => {
                logger.info(c.Key?.toString() || "");
            });
        }
        // TODO: Try to fetch S3 resource
        const erc_metadata_json = (await s3.getObject({
            Bucket: "erc-public",
            Key: "test/metadata.json"
        }));
        const erc_metadata_body = erc_metadata_json.Body;
        const erc_metadata_body_to_string = (typeof erc_metadata_body === "object") ?
            (await erc_metadata_body.transformToString()) :
            "S3 object Body is undefined";
        logger.info(`S3 object Body: ${erc_metadata_body_to_string}`);
        const value = {
            "erc_s3_test": {
                "Body": JSON.parse(erc_metadata_body_to_string)
            },
            "message": erc_metadata_body_to_string
        };
        return [{
                ...value
            }][0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWdFO0FBQ2hFLDBEQUF1RDtBQUN2RCxrREFBd0Q7QUFDeEQscUNBQW9DO0FBQ3BDLHVDQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0FBRTVCLE1BQU0sUUFBUSxHQUFHO0lBQ2YsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDbkIsd0RBQXdEO0lBQzVELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBVSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ2pDLENBQUM7S0FDSCxDQUFDO0lBQ0osSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBTyxFQUNuQyxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixJQUFBLG1CQUFTLEVBQUM7WUFDaEQsU0FBUztTQUNWLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFTiw4QkFBOEI7UUFDOUIsb0RBQW9EO1FBQ3BELG1EQUFtRDtRQUNuRCxzREFBc0Q7UUFDdEQsK0VBQStFO1FBQy9FLHFGQUFxRjtRQUNyRixzQkFBc0I7UUFDdEIsZ0RBQWdEO1FBQ2hELHdEQUF3RDtRQUN4RCxvQ0FBb0M7UUFDcEMsTUFBTTtRQUVOLE1BQU0sU0FBUyxHQUFtQjtZQUNoQyxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRTtnQkFDaEQsZUFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRTthQUN6RDtZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7U0FDL0IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUEsbUJBQVMsRUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUEsbUJBQVMsRUFBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFMUQsc0RBQXNEO1FBQ3RELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxPQUFPLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztRQUM5RCxDQUFDO2FBQU0sQ0FBQztZQUNOLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsaUNBQWlDO1FBQ2pDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDNUMsTUFBTSxFQUFFLFlBQVk7WUFDcEIsR0FBRyxFQUFFLG9CQUFvQjtTQUMxQixDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQ2pELE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLGlCQUFpQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0UsQ0FBQyxNQUFNLGlCQUFpQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9DLDZCQUE2QixDQUFDO1FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLDJCQUEyQixFQUFFLENBQUMsQ0FBQztRQUU5RCxNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRTtnQkFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQzthQUNoRDtZQUNELFNBQVMsRUFBRSwyQkFBMkI7U0FDdkMsQ0FBQztRQUVGLE9BQU8sQ0FBQztnQkFDSixHQUFHLEtBQUs7YUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBSSx3REFBd0Q7SUFDcEUsQ0FBQztDQUNGLENBQUM7QUFHRixrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaFFMT2JqZWN0VHlwZSwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJmbGF0dGVkXCI7XG5pbXBvcnQgeyBKU09OT2JqZWN0IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuY29uc3QgZXJjX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAgICAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnRVJDUzNUZXN0T2JqZWN0JyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgZXJjX3MzX3Rlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LFxuICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9IH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgbG9nZ2VyLmluZm8oYGVyY19zM190ZXN0IGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgICBweXRob25BcGlcbiAgICBdKX1gKTtcblxuICAgIC8vIFRPRE86IEFkZCBTMyBmZXRjaCBsb2dpYy4uLlxuICAgIC8vIC8vIFRPRE86IEZpbmQgYSBuZXcgd2F5IHRvIHNldCBjcmVkZW50aWFscyBmb3IgUzNcbiAgICAvLyAvLyBUaGlzIG1ldGhvZCBvZiBzZXR0aW5nIGNyZWRzIGlzIGRlcHJlY2F0ZWQuLi5cbiAgICAvLyAvLyBKUyBTREsgdjMgZG9lcyBub3Qgc3VwcG9ydCBnbG9iYWwgY29uZmlndXJhdGlvbi5cbiAgICAvLyAvLyBDb2RlbW9kIGhhcyBhdHRlbXB0ZWQgdG8gcGFzcyB2YWx1ZXMgdG8gZWFjaCBzZXJ2aWNlIGNsaWVudCBpbiB0aGlzIGZpbGUuXG4gICAgLy8gLy8gWW91IG1heSBuZWVkIHRvIHVwZGF0ZSBjbGllbnRzIG91dHNpZGUgb2YgdGhpcyBmaWxlLCBpZiB0aGV5IHVzZSBnbG9iYWwgY29uZmlnLlxuICAgIC8vIEFXUy5jb25maWcudXBkYXRlKHtcbiAgICAvLyAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcbiAgICAvLyAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuICAgIC8vICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgczNfY29uZmlnOiBTM0NsaWVudENvbmZpZyA9IHtcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCB8fCBcIlwiLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCBcIlwiLFxuICAgICAgfSxcbiAgICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTixcbiAgICB9O1xuICAgIGxvZ2dlci5pbmZvKGBBV1MgY3JlZGVudGlhbHM6ICR7c3RyaW5naWZ5KHMzX2NvbmZpZyl9YCk7XG4gICAgY29uc3QgczMgPSBuZXcgUzMoczNfY29uZmlnKTtcblxuICAgIGxvZ2dlci5pbmZvKGBTMyBidWNrZXRzOiAke3N0cmluZ2lmeShzMy5saXN0QnVja2V0cygpKX1gKTtcblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBsaXN0IG9mIG9iamVjdHMgaW4gYnVja2V0L3ByZWZpeFxuICAgIGNvbnN0IGVyY19saXN0ID0gYXdhaXQgKHMzLmxpc3RPYmplY3RzVjIoe1xuICAgICAgQnVja2V0OiBcImVyYy1wdWJsaWNcIixcbiAgICAgIFByZWZpeDogYHRlc3QvYCxcbiAgICB9KSk7XG4gICAgaWYgKHR5cGVvZiBlcmNfbGlzdC5Db250ZW50cyAhPT0gXCJvYmplY3RcIiB8fCBlcmNfbGlzdC5Db250ZW50cz8ubGVuZ3RoID09PSAwKSB7XG4gICAgICBsb2dnZXIuaW5mbyhgTm8gb2JqZWN0cyBmb3VuZCB1bmRlciBzMzovL2VyYy1wdWJsaWMvdGVzdC9gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJjX2xpc3QuQ29udGVudHMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYy5LZXk/LnRvU3RyaW5nKCkgfHwgXCJcIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggUzMgcmVzb3VyY2VcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfanNvbiA9IChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgQnVja2V0OiBcImVyYy1wdWJsaWNcIixcbiAgICAgIEtleTogXCJ0ZXN0L21ldGFkYXRhLmpzb25cIlxuICAgIH0pKTtcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfYm9keSA9IGVyY19tZXRhZGF0YV9qc29uLkJvZHk7XG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nID0gKHR5cGVvZiBlcmNfbWV0YWRhdGFfYm9keSA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgKGF3YWl0IGVyY19tZXRhZGF0YV9ib2R5LnRyYW5zZm9ybVRvU3RyaW5nKCkpIDpcbiAgICAgIFwiUzMgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkXCI7XG5cbiAgICBsb2dnZXIuaW5mbyhgUzMgb2JqZWN0IEJvZHk6ICR7ZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nfWApO1xuXG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBcImVyY19zM190ZXN0XCI6IHtcbiAgICAgICAgXCJCb2R5XCI6IEpTT04ucGFyc2UoZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nKVxuICAgICAgfSxcbiAgICAgIFwibWVzc2FnZVwiOiBlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmdcbiAgICB9O1xuXG4gICAgcmV0dXJuIFt7IC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGkuLi5cbiAgICAgICAgLi4udmFsdWVcbiAgICB9XVswXTsgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBlcmNfdGVzdDtcbiJdfQ==