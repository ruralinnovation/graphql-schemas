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
        // TODO: Try to fetch S3 resource
        logger.info(`S3 buckets: ${(0, flatted_1.stringify)(s3.listBuckets())}`);
        const erc_metadata_json = (await s3.getObject({
            Key: "test/metadata.json",
            Bucket: "erc-public"
        }));
        logger.info(`S3 object: ${(0, flatted_1.stringify)(erc_metadata_json.Body)}`);
        const value = {
            "erc_s3_test": erc_metadata_json.Body,
            "message": ("value of a top level property"),
            "geoid_co": "33009",
            "name": "pct_bb_25_3",
            "value": 0.8366,
            "category": "bb",
            "variable": "25_3",
            "category_pl": "Broadband",
            "description": "Percent of broadband serviceable locations with access to 25/3",
        };
        return [{
                ...value
            }][0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWdFO0FBQ2hFLDBEQUF1RDtBQUN2RCxrREFBd0Q7QUFDeEQscUNBQW1DO0FBQ25DLHVDQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0FBRTVCLE1BQU0sUUFBUSxHQUFHO0lBQ2YsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDbkIsd0RBQXdEO0lBQzVELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxrQkFBVSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ2pDLENBQUM7S0FDSCxDQUFDO0lBQ0osSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBTyxFQUNuQyxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixJQUFBLG1CQUFTLEVBQUM7WUFDaEQsU0FBUztTQUNWLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFTiw4QkFBOEI7UUFDOUIsb0RBQW9EO1FBQ3BELG1EQUFtRDtRQUNuRCxzREFBc0Q7UUFDdEQsK0VBQStFO1FBQy9FLHFGQUFxRjtRQUNyRixzQkFBc0I7UUFDdEIsZ0RBQWdEO1FBQ2hELHdEQUF3RDtRQUN4RCxvQ0FBb0M7UUFDcEMsTUFBTTtRQUVOLE1BQU0sU0FBUyxHQUFtQjtZQUNoQyxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRTtnQkFDaEQsZUFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLElBQUksRUFBRTthQUN6RDtZQUNELE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7U0FDL0IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUEsbUJBQVMsRUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsaUNBQWlDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFBLG1CQUFTLEVBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDNUMsR0FBRyxFQUFFLG9CQUFvQjtZQUN6QixNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFBLG1CQUFTLEVBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDNUMsVUFBVSxFQUFFLE9BQU87WUFDbkIsTUFBTSxFQUFFLGFBQWE7WUFDckIsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsTUFBTTtZQUNsQixhQUFhLEVBQUUsV0FBVztZQUMxQixhQUFhLEVBQUUsZ0VBQWdFO1NBQ2hGLENBQUM7UUFFRixPQUFPLENBQUM7Z0JBQ0osR0FBRyxLQUFLO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksd0RBQXdEO0lBQ3BFLENBQUM7Q0FDRixDQUFDO0FBR0Ysa0JBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAYXdzLWxhbWJkYS1wb3dlcnRvb2xzL2xvZ2dlcic7XG5pbXBvcnQgeyBTMywgUzNDbGllbnRDb25maWcgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnl9IGZyb20gXCJmbGF0dGVkXCI7XG5pbXBvcnQgeyBKU09OT2JqZWN0IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuY29uc3QgZXJjX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAgICAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnRVJDUzNUZXN0T2JqZWN0JyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgZXJjX3MzX3Rlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LFxuICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9IH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgbG9nZ2VyLmluZm8oYGVyY19zM190ZXN0IGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgICBweXRob25BcGlcbiAgICBdKX1gKTtcblxuICAgIC8vIFRPRE86IEFkZCBTMyBmZXRjaCBsb2dpYy4uLlxuICAgIC8vIC8vIFRPRE86IEZpbmQgYSBuZXcgd2F5IHRvIHNldCBjcmVkZW50aWFscyBmb3IgUzNcbiAgICAvLyAvLyBUaGlzIG1ldGhvZCBvZiBzZXR0aW5nIGNyZWRzIGlzIGRlcHJlY2F0ZWQuLi5cbiAgICAvLyAvLyBKUyBTREsgdjMgZG9lcyBub3Qgc3VwcG9ydCBnbG9iYWwgY29uZmlndXJhdGlvbi5cbiAgICAvLyAvLyBDb2RlbW9kIGhhcyBhdHRlbXB0ZWQgdG8gcGFzcyB2YWx1ZXMgdG8gZWFjaCBzZXJ2aWNlIGNsaWVudCBpbiB0aGlzIGZpbGUuXG4gICAgLy8gLy8gWW91IG1heSBuZWVkIHRvIHVwZGF0ZSBjbGllbnRzIG91dHNpZGUgb2YgdGhpcyBmaWxlLCBpZiB0aGV5IHVzZSBnbG9iYWwgY29uZmlnLlxuICAgIC8vIEFXUy5jb25maWcudXBkYXRlKHtcbiAgICAvLyAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcbiAgICAvLyAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuICAgIC8vICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgczNfY29uZmlnOiBTM0NsaWVudENvbmZpZyA9IHtcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCB8fCBcIlwiLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCBcIlwiLFxuICAgICAgfSxcbiAgICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTixcbiAgICB9O1xuICAgIGxvZ2dlci5pbmZvKGBBV1MgY3JlZGVudGlhbHM6ICR7c3RyaW5naWZ5KHMzX2NvbmZpZyl9YCk7XG4gICAgY29uc3QgczMgPSBuZXcgUzMoczNfY29uZmlnKTtcblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBTMyByZXNvdXJjZVxuICAgIGxvZ2dlci5pbmZvKGBTMyBidWNrZXRzOiAke3N0cmluZ2lmeShzMy5saXN0QnVja2V0cygpKX1gKTtcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfanNvbiA9IChhd2FpdCBzMy5nZXRPYmplY3Qoe1xuICAgICAgS2V5OiBcInRlc3QvbWV0YWRhdGEuanNvblwiLFxuICAgICAgQnVja2V0OiBcImVyYy1wdWJsaWNcIlxuICAgIH0pKTtcblxuICAgIGxvZ2dlci5pbmZvKGBTMyBvYmplY3Q6ICR7c3RyaW5naWZ5KGVyY19tZXRhZGF0YV9qc29uLkJvZHkpfWApO1xuXG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBcImVyY19zM190ZXN0XCI6IGVyY19tZXRhZGF0YV9qc29uLkJvZHksXG4gICAgICBcIm1lc3NhZ2VcIjogKFwidmFsdWUgb2YgYSB0b3AgbGV2ZWwgcHJvcGVydHlcIiksXG4gICAgICBcImdlb2lkX2NvXCI6IFwiMzMwMDlcIixcbiAgICAgIFwibmFtZVwiOiBcInBjdF9iYl8yNV8zXCIsXG4gICAgICBcInZhbHVlXCI6IDAuODM2NixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJiYlwiLFxuICAgICAgXCJ2YXJpYWJsZVwiOiBcIjI1XzNcIixcbiAgICAgIFwiY2F0ZWdvcnlfcGxcIjogXCJCcm9hZGJhbmRcIixcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJQZXJjZW50IG9mIGJyb2FkYmFuZCBzZXJ2aWNlYWJsZSBsb2NhdGlvbnMgd2l0aCBhY2Nlc3MgdG8gMjUvM1wiLFxuICAgIH07XG5cbiAgICByZXR1cm4gW3sgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaS4uLlxuICAgICAgICAuLi52YWx1ZVxuICAgIH1dWzBdOyAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGVyY190ZXN0O1xuIl19