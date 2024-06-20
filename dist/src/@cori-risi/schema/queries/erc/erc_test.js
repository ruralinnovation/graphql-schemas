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
        // TODO: Try to fetch list of objects in bucket/prefix
        const erc_object_list = await (s3.listObjectsV2({
            Bucket,
            Prefix: `test/`,
        }));
        logger.info(`s3.listObjectsV2()...`);
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
            "message": erc_metadata_body_to_string
        };
        return [{
                ...value
            }][0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9lcmMvZXJjX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBdUQ7QUFDdkQsa0RBQXdEO0FBQ3hELHVDQUFnRTtBQUVoRSx1Q0FBeUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztBQUU1QixNQUFNLFFBQVEsR0FBRztJQUNmLDZEQUE2RDtJQUM3RCxJQUFJLEVBQUUsbUJBQW1CO0lBQ25CLHdEQUF3RDtJQUM1RCxJQUFJLHdCQUFpQixDQUFDO1FBQ3BCLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQVUsRUFBRTtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUNqQyxDQUFDO0tBQ0gsQ0FBQztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUNQLEVBQ0UsV0FBVyxFQUFFLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDYixFQUNHLEVBQ04sSUFBUyxFQUNULEVBQUU7UUFFRix1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsU0FBUztRQUVULE1BQU0sRUFBRSxHQUFHLElBQUksY0FBRSxDQUFFLFlBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRTVCLHNEQUFzRDtRQUN0RCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUM5QyxNQUFNO1lBQ04sTUFBTSxFQUFFLE9BQU87U0FDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFckMsSUFBSSxPQUFPLGVBQWUsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLE1BQU0sUUFBUSxDQUFDLENBQUM7UUFDN0QsQ0FBQzthQUFNLENBQUM7WUFDTixlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELDRFQUE0RTtRQUU1RSxpREFBaUQ7UUFDakQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM1QyxNQUFNO1lBQ04sR0FBRyxFQUFFLG9CQUFvQjtTQUMxQixDQUFDLENBQUMsQ0FBQztRQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVqQyxNQUFNLDJCQUEyQixHQUFHLENBQUMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoRixDQUFDLE1BQU0saUJBQWlCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELDRDQUE0QyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLDJCQUEyQixFQUFFLENBQUMsQ0FBQztRQUU5RCxNQUFNLEtBQUssR0FBRztZQUNaLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDO1lBQ3RELFNBQVMsRUFBRSwyQkFBMkI7U0FDdkMsQ0FBQztRQUVGLE9BQU8sQ0FBQztnQkFDSixHQUFHLEtBQUs7YUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBSSx3REFBd0Q7SUFDcEUsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAYXdzLWxhbWJkYS1wb3dlcnRvb2xzL2xvZ2dlcic7XG5pbXBvcnQgeyBTMywgUzNDbGllbnRDb25maWcgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5pbXBvcnQgeyBHcmFwaFFMT2JqZWN0VHlwZSwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcbmltcG9ydCB7IHN0cmluZ2lmeSwgdG9KU09OIH0gZnJvbSBcImZsYXR0ZWRcIjtcbmltcG9ydCB7IEpTT05PYmplY3QgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcigpO1xuXG5jb25zdCBlcmNfdGVzdCA9IHtcbiAgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaVxuICB0eXBlOiAvLyBuZXcgR3JhcGhRTExpc3QoXG4gICAgICAgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gICAgbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICAgIG5hbWU6ICdFUkNTM1Rlc3RPYmplY3QnLFxuICAgICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgICBlcmNfczNfdGVzdDogeyB0eXBlOiBKU09OT2JqZWN0IH0sXG4gICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgfSlcbiAgICB9KSxcbiAgYXJnczogbnVsbCxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICBfXzogYW55LFxuICAgIHtcbiAgICAgIGRhdGFTb3VyY2VzOiB7XG4gICAgICAgIHB5dGhvbkFwaSxcbiAgICAgICAgczNEYXRhU291cmNlXG4gICAgICB9XG4gICAgfTogYW55LFxuICAgIGluZm86IGFueVxuICApID0+ICB7XG5cbiAgICAvLyBsb2dnZXIuaW5mbygnVGhpcyBpcyBhbiBJTkZPIGxvZyEnKTtcbiAgICAvLyBsb2dnZXIuaW5mbyhgZGF0YVNvdXJjZXM6ICR7c3RyaW5naWZ5KFtcbiAgICAvLyAgIHB5dGhvbkFwaSxcbiAgICAvLyAgIHMzRGF0YVNvdXJjZVxuICAgIC8vIF0pfWApO1xuXG4gICAgY29uc3QgczMgPSBuZXcgUzMoKHMzRGF0YVNvdXJjZSBhcyBhbnkpLmNvbmZpZyk7XG4gICAgY29uc3QgQnVja2V0ID0gXCJlcmMtcHVibGljXCI7XG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggbGlzdCBvZiBvYmplY3RzIGluIGJ1Y2tldC9wcmVmaXhcbiAgICBjb25zdCBlcmNfb2JqZWN0X2xpc3QgPSBhd2FpdCAoczMubGlzdE9iamVjdHNWMih7XG4gICAgICBCdWNrZXQsXG4gICAgICBQcmVmaXg6IGB0ZXN0L2AsXG4gICAgfSkpO1xuXG4gICAgbG9nZ2VyLmluZm8oYHMzLmxpc3RPYmplY3RzVjIoKS4uLmApO1xuXG4gICAgaWYgKHR5cGVvZiBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9L3Rlc3QvYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyY19vYmplY3RfbGlzdC5Db250ZW50cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAuLi4gd29ya3MsIGJ1dCB0aGUgZmlsZSBrZXlzIGFyZSByZXR1cm5lZCBhcyBhIHBhcnRpYWwgbGlzdDsgbm90IHJlbGlhYmxlXG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggUzMgcmVzb3VyY2UgKG9iamVjdCBieSBrZXkpXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgIEJ1Y2tldCxcbiAgICAgIEtleTogXCJ0ZXN0L21ldGFkYXRhLmpzb25cIlxuICAgIH0pKTtcblxuICAgIGxvZ2dlci5pbmZvKGBzMy5nZXRPYmplY3QoKS4uLmApO1xuXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nID0gKHR5cGVvZiBlcmNfbWV0YWRhdGFfanNvbi5Cb2R5ID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAoYXdhaXQgZXJjX21ldGFkYXRhX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgYHsgXCJFcnJvclwiOiBcIlMzIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZFwiIH1gO1xuXG4gICAgbG9nZ2VyLmluZm8oYFMzIG9iamVjdCBCb2R5OiAke2VyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZ31gKTtcblxuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgXCJlcmNfczNfdGVzdFwiOiBKU09OLnBhcnNlKGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyksXG4gICAgICBcIm1lc3NhZ2VcIjogZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nXG4gICAgfTtcblxuICAgIHJldHVybiBbeyAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpLi4uXG4gICAgICAgIC4uLnZhbHVlXG4gICAgfV1bMF07ICAgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVyY190ZXN0O1xuIl19