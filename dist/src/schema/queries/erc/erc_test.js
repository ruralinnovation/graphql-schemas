"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
const client_s3_1 = require("@aws-sdk/client-s3");
const erc_s3_test = {
    // An array (list) fails to transfer gzipped by local sam cli
    type: // new GraphQLList(
    // ... but a single return object can be gzipped locally
    new type_1.GraphQLObjectType({
        name: 'ERCS3TestObject',
        fields: () => ({
            message: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi } }, info) => {
        console.log("dataSources:", [
            pythonApi
        ]);
        // TODO: Add S3 fetch logic...
        console.log("AWS credentials:", {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
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
        const s3 = new client_s3_1.S3(s3_config);
        // TODO: Try to fetch S3 resource
        console.log("S3 buckets:", s3.listBuckets);
        const value = {
            "erc_s3_test": {
                "message": "value of a an \"erc_s3_test\" encapsulated property"
            },
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
exports.default = erc_s3_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWdFO0FBR2hFLGtEQUF3RDtBQUV4RCxNQUFNLFdBQVcsR0FBRztJQUNsQiw2REFBNkQ7SUFDN0QsSUFBSSxFQUFFLG1CQUFtQjtJQUNuQix3REFBd0Q7SUFDNUQsSUFBSSx3QkFBaUIsQ0FBQztRQUNwQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7U0FDakMsQ0FBQztLQUNILENBQUM7SUFDSixJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQU8sRUFDUCxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFPLEVBQ25DLElBQVMsRUFDVCxFQUFFO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDMUIsU0FBUztTQUNWLENBQUMsQ0FBQztRQUVILDhCQUE4QjtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFO1lBQzlCLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtZQUMxQyxlQUFlLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7WUFDbEQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtTQUMvQixDQUFDLENBQUM7UUFDSCxvREFBb0Q7UUFDcEQsbURBQW1EO1FBQ25ELHNEQUFzRDtRQUN0RCwrRUFBK0U7UUFDL0UscUZBQXFGO1FBQ3JGLHNCQUFzQjtRQUN0QixnREFBZ0Q7UUFDaEQsd0RBQXdEO1FBQ3hELG9DQUFvQztRQUNwQyxNQUFNO1FBRU4sTUFBTSxTQUFTLEdBQW1CO1lBQ2hDLFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFO2dCQUNoRCxlQUFlLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxFQUFFO2FBQ3pEO1lBRUQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVTtTQUMvQixDQUFDO1FBQ0YsTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsaUNBQWlDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUzQyxNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRTtnQkFDYixTQUFTLEVBQUUscURBQXFEO2FBQ2pFO1lBQ0QsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDNUMsVUFBVSxFQUFFLE9BQU87WUFDbkIsTUFBTSxFQUFFLGFBQWE7WUFDckIsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsTUFBTTtZQUNsQixhQUFhLEVBQUUsV0FBVztZQUMxQixhQUFhLEVBQUUsZ0VBQWdFO1NBQ2hGLENBQUM7UUFFRixPQUFPLENBQUM7Z0JBQ0osR0FBRyxLQUFLO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksd0RBQXdEO0lBQ3BFLENBQUM7Q0FDRixDQUFDO0FBR0Ysa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5cbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcblxuY29uc3QgZXJjX3MzX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAgICAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnRVJDUzNUZXN0T2JqZWN0JyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH1cbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9IH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuICAgIGNvbnNvbGUubG9nKFwiZGF0YVNvdXJjZXM6XCIsIFtcbiAgICAgIHB5dGhvbkFwaVxuICAgIF0pO1xuXG4gICAgLy8gVE9ETzogQWRkIFMzIGZldGNoIGxvZ2ljLi4uXG4gICAgY29uc29sZS5sb2coXCJBV1MgY3JlZGVudGlhbHM6XCIsIHtcbiAgICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcbiAgICAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuICAgICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICAgIH0pO1xuICAgIC8vIC8vIFRPRE86IEZpbmQgYSBuZXcgd2F5IHRvIHNldCBjcmVkZW50aWFscyBmb3IgUzNcbiAgICAvLyAvLyBUaGlzIG1ldGhvZCBvZiBzZXR0aW5nIGNyZWRzIGlzIGRlcHJlY2F0ZWQuLi5cbiAgICAvLyAvLyBKUyBTREsgdjMgZG9lcyBub3Qgc3VwcG9ydCBnbG9iYWwgY29uZmlndXJhdGlvbi5cbiAgICAvLyAvLyBDb2RlbW9kIGhhcyBhdHRlbXB0ZWQgdG8gcGFzcyB2YWx1ZXMgdG8gZWFjaCBzZXJ2aWNlIGNsaWVudCBpbiB0aGlzIGZpbGUuXG4gICAgLy8gLy8gWW91IG1heSBuZWVkIHRvIHVwZGF0ZSBjbGllbnRzIG91dHNpZGUgb2YgdGhpcyBmaWxlLCBpZiB0aGV5IHVzZSBnbG9iYWwgY29uZmlnLlxuICAgIC8vIEFXUy5jb25maWcudXBkYXRlKHtcbiAgICAvLyAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCxcbiAgICAvLyAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuICAgIC8vICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICAgIC8vIH0pO1xuXG4gICAgY29uc3QgczNfY29uZmlnOiBTM0NsaWVudENvbmZpZyA9IHtcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBwcm9jZXNzLmVudi5BV1NfQUNDRVNTX0tFWV9JRCB8fCBcIlwiLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2Nlc3MuZW52LkFXU19TRUNSRVRfQUNDRVNTX0tFWSB8fCBcIlwiLFxuICAgICAgfSxcblxuICAgICAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OLFxuICAgIH07XG4gICAgY29uc3QgczMgPSBuZXcgUzMoczNfY29uZmlnKTtcblxuICAgIC8vIFRPRE86IFRyeSB0byBmZXRjaCBTMyByZXNvdXJjZVxuICAgIGNvbnNvbGUubG9nKFwiUzMgYnVja2V0czpcIiwgczMubGlzdEJ1Y2tldHMpO1xuXG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBcImVyY19zM190ZXN0XCI6IHtcbiAgICAgICAgXCJtZXNzYWdlXCI6IFwidmFsdWUgb2YgYSBhbiBcXFwiZXJjX3MzX3Rlc3RcXFwiIGVuY2Fwc3VsYXRlZCBwcm9wZXJ0eVwiXG4gICAgICB9LFxuICAgICAgXCJtZXNzYWdlXCI6IChcInZhbHVlIG9mIGEgdG9wIGxldmVsIHByb3BlcnR5XCIpLFxuICAgICAgXCJnZW9pZF9jb1wiOiBcIjMzMDA5XCIsXG4gICAgICBcIm5hbWVcIjogXCJwY3RfYmJfMjVfM1wiLFxuICAgICAgXCJ2YWx1ZVwiOiAwLjgzNjYsXG4gICAgICBcImNhdGVnb3J5XCI6IFwiYmJcIixcbiAgICAgIFwidmFyaWFibGVcIjogXCIyNV8zXCIsXG4gICAgICBcImNhdGVnb3J5X3BsXCI6IFwiQnJvYWRiYW5kXCIsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IFwiUGVyY2VudCBvZiBicm9hZGJhbmQgc2VydmljZWFibGUgbG9jYXRpb25zIHdpdGggYWNjZXNzIHRvIDI1LzNcIixcbiAgICB9O1xuXG4gICAgcmV0dXJuIFt7IC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGkuLi5cbiAgICAgICAgLi4udmFsdWVcbiAgICB9XVswXTsgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBlcmNfczNfdGVzdDtcbiJdfQ==