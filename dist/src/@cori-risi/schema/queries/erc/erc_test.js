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
            type: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi, s3DataSource } }, info) => {
        // logger.info('This is an INFO log!');
        // logger.info(`dataSources: ${stringify([
        //   pythonApi,
        //   s3DataSource
        // ])}`);
        // const s3 = new S3((s3DataSource as any).config);
        const s3 = new client_s3_1.S3();
        const Bucket = "erc-public";
        // TODO: Try to fetch list of objects in bucket/prefix
        const erc_object_list = await (s3.listObjectsV2({
            Bucket,
            Prefix: `test/`,
        }));
        logger.info(`s3.listObjectsV2(${Bucket}, "test/")...`);
        if (typeof erc_object_list.Contents !== "object" || erc_object_list.Contents?.length === 0) {
            logger.info(`No objects found under s3://${Bucket}/test/`);
        }
        else {
            erc_object_list.Contents.forEach(c => {
                logger.info(c.Key?.toString() || "");
            });
        }
        // ... works, but the file keys are returned as a partial list; not reliable
        // TODO: Try to fetch S3 resource (object by key)
        const erc_metadata_json = (await s3.getObject({
            Bucket,
            Key: "test/metadata.json"
        }));
        logger.info(`s3.getObject()...`);
        const erc_metadata_body_to_string = (typeof erc_metadata_json.Body === "object") ?
            (await erc_metadata_json.Body?.transformToString()) :
            `{ "Error": "S3 object Body is undefined" }`;
        logger.info(`S3 object Body: ${erc_metadata_body_to_string}`);
        const value = {
            "erc_s3_test": JSON.parse(erc_metadata_body_to_string),
            "message": erc_metadata_body_to_string,
            "type": "erc_test"
        };
        return [{
                ...value
            }][0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9lcmMvZXJjX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBdUQ7QUFDdkQsa0RBQXdEO0FBQ3hELHVDQUFnRTtBQUVoRSx1Q0FBeUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztBQUU1QixNQUFNLFFBQVEsR0FBRztJQUNmLDZEQUE2RDtJQUM3RCxJQUFJLEVBQUUsbUJBQW1CO0lBQ25CLHdEQUF3RDtJQUM1RCxJQUFJLHdCQUFpQixDQUFDO1FBQ3BCLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQVUsRUFBRTtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtZQUNoQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUM5QixDQUFDO0tBQ0gsQ0FBQztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUNQLEVBQ0UsV0FBVyxFQUFFLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDYixFQUNHLEVBQ04sSUFBUyxFQUNULEVBQUU7UUFFRix1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsU0FBUztRQUVULG1EQUFtRDtRQUNuRCxNQUFNLEVBQUUsR0FBRyxJQUFJLGNBQUUsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQztRQUU1QixzREFBc0Q7UUFDdEQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDOUMsTUFBTTtZQUNOLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsTUFBTSxlQUFlLENBQUMsQ0FBQztRQUV2RCxJQUFJLE9BQU8sZUFBZSxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0YsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsTUFBTSxRQUFRLENBQUMsQ0FBQztRQUM3RCxDQUFDO2FBQU0sQ0FBQztZQUNOLGVBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsNEVBQTRFO1FBRTVFLGlEQUFpRDtRQUNqRCxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzVDLE1BQU07WUFDTixHQUFHLEVBQUUsb0JBQW9CO1NBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxPQUFPLGlCQUFpQixDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsNENBQTRDLENBQUM7UUFFL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBRTlELE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7WUFDdEQsU0FBUyxFQUFFLDJCQUEyQjtZQUN0QyxNQUFNLEVBQUUsVUFBVTtTQUNuQixDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHdEQUF3RDtJQUNwRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgc3RyaW5naWZ5LCB0b0pTT04gfSBmcm9tIFwiZmxhdHRlZFwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNvbnN0IGVyY190ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgICAgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0VSQ1MzVGVzdE9iamVjdCcsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIGVyY19zM190ZXN0OiB7IHR5cGU6IEpTT05PYmplY3QgfSxcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIHR5cGU6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9XG4gICAgICB9KVxuICAgIH0pLFxuICBhcmdzOiBudWxsLFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIF9fOiBhbnksXG4gICAge1xuICAgICAgZGF0YVNvdXJjZXM6IHtcbiAgICAgICAgcHl0aG9uQXBpLFxuICAgICAgICBzM0RhdGFTb3VyY2VcbiAgICAgIH1cbiAgICB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcblxuICAgIC8vIGxvZ2dlci5pbmZvKCdUaGlzIGlzIGFuIElORk8gbG9nIScpO1xuICAgIC8vIGxvZ2dlci5pbmZvKGBkYXRhU291cmNlczogJHtzdHJpbmdpZnkoW1xuICAgIC8vICAgcHl0aG9uQXBpLFxuICAgIC8vICAgczNEYXRhU291cmNlXG4gICAgLy8gXSl9YCk7XG5cbiAgICAvLyBjb25zdCBzMyA9IG5ldyBTMygoczNEYXRhU291cmNlIGFzIGFueSkuY29uZmlnKTtcbiAgICBjb25zdCBzMyA9IG5ldyBTMygpO1xuICAgIGNvbnN0IEJ1Y2tldCA9IFwiZXJjLXB1YmxpY1wiO1xuXG4gICAgLy8gVE9ETzogVHJ5IHRvIGZldGNoIGxpc3Qgb2Ygb2JqZWN0cyBpbiBidWNrZXQvcHJlZml4XG4gICAgY29uc3QgZXJjX29iamVjdF9saXN0ID0gYXdhaXQgKHMzLmxpc3RPYmplY3RzVjIoe1xuICAgICAgQnVja2V0LFxuICAgICAgUHJlZml4OiBgdGVzdC9gLFxuICAgIH0pKTtcblxuICAgIGxvZ2dlci5pbmZvKGBzMy5saXN0T2JqZWN0c1YyKCR7QnVja2V0fSwgXCJ0ZXN0L1wiKS4uLmApO1xuXG4gICAgaWYgKHR5cGVvZiBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9L3Rlc3QvYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyY19vYmplY3RfbGlzdC5Db250ZW50cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAuLi4gd29ya3MsIGJ1dCB0aGUgZmlsZSBrZXlzIGFyZSByZXR1cm5lZCBhcyBhIHBhcnRpYWwgbGlzdDsgbm90IHJlbGlhYmxlXG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggUzMgcmVzb3VyY2UgKG9iamVjdCBieSBrZXkpXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgIEJ1Y2tldCxcbiAgICAgIEtleTogXCJ0ZXN0L21ldGFkYXRhLmpzb25cIlxuICAgIH0pKTtcblxuICAgIGxvZ2dlci5pbmZvKGBzMy5nZXRPYmplY3QoKS4uLmApO1xuXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nID0gKHR5cGVvZiBlcmNfbWV0YWRhdGFfanNvbi5Cb2R5ID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAoYXdhaXQgZXJjX21ldGFkYXRhX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgYHsgXCJFcnJvclwiOiBcIlMzIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZFwiIH1gO1xuXG4gICAgbG9nZ2VyLmluZm8oYFMzIG9iamVjdCBCb2R5OiAke2VyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZ31gKTtcblxuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgXCJlcmNfczNfdGVzdFwiOiBKU09OLnBhcnNlKGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyksXG4gICAgICBcIm1lc3NhZ2VcIjogZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nLFxuICAgICAgXCJ0eXBlXCI6IFwiZXJjX3Rlc3RcIlxuICAgIH07XG5cbiAgICByZXR1cm4gW3sgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaS4uLlxuICAgICAgICAuLi52YWx1ZVxuICAgIH1dWzBdOyAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBlcmNfdGVzdDtcbiJdfQ==