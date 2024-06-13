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
        name: 'ERCS3TestObject',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9lcmMvZXJjX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBdUQ7QUFDdkQsa0RBQXdEO0FBQ3hELHVDQUFnRTtBQUVoRSx1Q0FBeUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztBQUU1QixNQUFNLFFBQVEsR0FBRztJQUNmLDZEQUE2RDtJQUM3RCxJQUFJLEVBQUUsbUJBQW1CO0lBQ25CLHdEQUF3RDtJQUM1RCxJQUFJLHdCQUFpQixDQUFDO1FBQ3BCLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQVUsRUFBRTtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUNqQyxDQUFDO0tBQ0gsQ0FBQztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUNQLEVBQ0UsV0FBVyxFQUFFLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDYixFQUNHLEVBQ04sSUFBUyxFQUNULEVBQUU7UUFFRix1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsU0FBUztRQUVULE1BQU0sRUFBRSxHQUFHLElBQUksY0FBRSxDQUFFLFlBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRTVCLHlEQUF5RDtRQUN6RCxvREFBb0Q7UUFDcEQsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixPQUFPO1FBQ1AsZ0dBQWdHO1FBQ2hHLGdFQUFnRTtRQUNoRSxXQUFXO1FBQ1gsNENBQTRDO1FBQzVDLDRDQUE0QztRQUM1QyxRQUFRO1FBQ1IsSUFBSTtRQUNKLCtFQUErRTtRQUUvRSxpREFBaUQ7UUFDakQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxNQUFNO1lBQ04sR0FBRyxFQUFFLG9CQUFvQjtTQUMxQixDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLGlCQUFpQixDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsNENBQTRDLENBQUM7UUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBRTlELE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7WUFDdEQsU0FBUyxFQUFFLDJCQUEyQjtTQUN2QyxDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHdEQUF3RDtJQUNwRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgc3RyaW5naWZ5LCB0b0pTT04gfSBmcm9tIFwiZmxhdHRlZFwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNvbnN0IGVyY190ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgICAgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0VSQ1MzVGVzdE9iamVjdCcsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIGVyY19zM190ZXN0OiB7IHR5cGU6IEpTT05PYmplY3QgfSxcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICB9KVxuICAgIH0pLFxuICBhcmdzOiBudWxsLFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIF9fOiBhbnksXG4gICAge1xuICAgICAgZGF0YVNvdXJjZXM6IHtcbiAgICAgICAgcHl0aG9uQXBpLFxuICAgICAgICBzM0RhdGFTb3VyY2VcbiAgICAgIH1cbiAgICB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcblxuICAgIC8vIGxvZ2dlci5pbmZvKCdUaGlzIGlzIGFuIElORk8gbG9nIScpO1xuICAgIC8vIGxvZ2dlci5pbmZvKGBkYXRhU291cmNlczogJHtzdHJpbmdpZnkoW1xuICAgIC8vICAgcHl0aG9uQXBpLFxuICAgIC8vICAgczNEYXRhU291cmNlXG4gICAgLy8gXSl9YCk7XG5cbiAgICBjb25zdCBzMyA9IG5ldyBTMygoczNEYXRhU291cmNlIGFzIGFueSkuY29uZmlnKTtcbiAgICBjb25zdCBCdWNrZXQgPSBcImVyYy1wdWJsaWNcIjtcblxuICAgIC8vIC8vIFRPRE86IFRyeSB0byBmZXRjaCBsaXN0IG9mIG9iamVjdHMgaW4gYnVja2V0L3ByZWZpeFxuICAgIC8vIGNvbnN0IGVyY19vYmplY3RfbGlzdCA9IGF3YWl0IChzMy5saXN0T2JqZWN0c1YyKHtcbiAgICAvLyAgIEJ1Y2tldCxcbiAgICAvLyAgIFByZWZpeDogYHRlc3QvYCxcbiAgICAvLyB9KSk7XG4gICAgLy8gaWYgKHR5cGVvZiBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAvLyAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9L3Rlc3QvYCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGVyY19vYmplY3RfbGlzdC5Db250ZW50cy5mb3JFYWNoKGMgPT4ge1xuICAgIC8vICAgICBsb2dnZXIuaW5mbyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgICAvLyAvLyAuLi4gd29ya3MsIGJ1dCB0aGUgZmlsZSBrZXlzIGFyZSByZXR1cm5lZCBhcyBhIHBhcnRpYWwgbGlzdDsgbm90IHJlbGlhYmxlXG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggUzMgcmVzb3VyY2UgKG9iamVjdCBieSBrZXkpXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgIEJ1Y2tldCxcbiAgICAgIEtleTogXCJ0ZXN0L21ldGFkYXRhLmpzb25cIlxuICAgIH0pKTtcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmcgPSAodHlwZW9mIGVyY19tZXRhZGF0YV9qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgIChhd2FpdCBlcmNfbWV0YWRhdGFfanNvbi5Cb2R5Py50cmFuc2Zvcm1Ub1N0cmluZygpKSA6XG4gICAgICBgeyBcIkVycm9yXCI6IFwiUzMgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkXCIgfWA7XG5cbiAgICBsb2dnZXIuaW5mbyhgUzMgb2JqZWN0IEJvZHk6ICR7ZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nfWApO1xuXG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBcImVyY19zM190ZXN0XCI6IEpTT04ucGFyc2UoZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nKSxcbiAgICAgIFwibWVzc2FnZVwiOiBlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmdcbiAgICB9O1xuXG4gICAgcmV0dXJuIFt7IC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGkuLi5cbiAgICAgICAgLi4udmFsdWVcbiAgICB9XVswXTsgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZXJjX3Rlc3Q7XG4iXX0=