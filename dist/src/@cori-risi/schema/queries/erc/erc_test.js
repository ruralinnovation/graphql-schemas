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
        // const s3 = new S3((s3DataSource as any).config);
        const s3 = new client_s3_1.S3();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9lcmMvZXJjX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBdUQ7QUFDdkQsa0RBQXdEO0FBQ3hELHVDQUFnRTtBQUVoRSx1Q0FBeUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztBQUU1QixNQUFNLFFBQVEsR0FBRztJQUNmLDZEQUE2RDtJQUM3RCxJQUFJLEVBQUUsbUJBQW1CO0lBQ25CLHdEQUF3RDtJQUM1RCxJQUFJLHdCQUFpQixDQUFDO1FBQ3BCLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQVUsRUFBRTtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUNqQyxDQUFDO0tBQ0gsQ0FBQztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUNQLEVBQ0UsV0FBVyxFQUFFLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDYixFQUNHLEVBQ04sSUFBUyxFQUNULEVBQUU7UUFFRix1Q0FBdUM7UUFDdkMsMENBQTBDO1FBQzFDLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsU0FBUztRQUVULG1EQUFtRDtRQUNuRCxNQUFNLEVBQUUsR0FBRyxJQUFJLGNBQUUsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQztRQUU1QixzREFBc0Q7UUFDdEQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDOUMsTUFBTTtZQUNOLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXJDLElBQUksT0FBTyxlQUFlLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMzRixNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixNQUFNLFFBQVEsQ0FBQyxDQUFDO1FBQzdELENBQUM7YUFBTSxDQUFDO1lBQ04sZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCw0RUFBNEU7UUFFNUUsaURBQWlEO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDNUMsTUFBTTtZQUNOLEdBQUcsRUFBRSxvQkFBb0I7U0FDMUIsQ0FBQyxDQUFDLENBQUM7UUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFakMsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLE9BQU8saUJBQWlCLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEYsQ0FBQyxNQUFNLGlCQUFpQixDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCw0Q0FBNEMsQ0FBQztRQUUvQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQiwyQkFBMkIsRUFBRSxDQUFDLENBQUM7UUFFOUQsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQztZQUN0RCxTQUFTLEVBQUUsMkJBQTJCO1NBQ3ZDLENBQUM7UUFFRixPQUFPLENBQUM7Z0JBQ0osR0FBRyxLQUFLO2FBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksd0RBQXdEO0lBQ3BFLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGF3cy1sYW1iZGEtcG93ZXJ0b29scy9sb2dnZXInO1xuaW1wb3J0IHsgUzMsIFMzQ2xpZW50Q29uZmlnIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnksIHRvSlNPTiB9IGZyb20gXCJmbGF0dGVkXCI7XG5pbXBvcnQgeyBKU09OT2JqZWN0IH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuY29uc3QgZXJjX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAgICAgICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnRVJDUzNUZXN0T2JqZWN0JyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgZXJjX3MzX3Rlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LFxuICAgICAgICBtZXNzYWdlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICBweXRob25BcGksXG4gICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgfVxuICAgIH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgLy8gbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgLy8gbG9nZ2VyLmluZm8oYGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgLy8gICBweXRob25BcGksXG4gICAgLy8gICBzM0RhdGFTb3VyY2VcbiAgICAvLyBdKX1gKTtcblxuICAgIC8vIGNvbnN0IHMzID0gbmV3IFMzKChzM0RhdGFTb3VyY2UgYXMgYW55KS5jb25maWcpO1xuICAgIGNvbnN0IHMzID0gbmV3IFMzKCk7XG4gICAgY29uc3QgQnVja2V0ID0gXCJlcmMtcHVibGljXCI7XG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggbGlzdCBvZiBvYmplY3RzIGluIGJ1Y2tldC9wcmVmaXhcbiAgICBjb25zdCBlcmNfb2JqZWN0X2xpc3QgPSBhd2FpdCAoczMubGlzdE9iamVjdHNWMih7XG4gICAgICBCdWNrZXQsXG4gICAgICBQcmVmaXg6IGB0ZXN0L2AsXG4gICAgfSkpO1xuXG4gICAgbG9nZ2VyLmluZm8oYHMzLmxpc3RPYmplY3RzVjIoKS4uLmApO1xuXG4gICAgaWYgKHR5cGVvZiBlcmNfb2JqZWN0X2xpc3QuQ29udGVudHMgIT09IFwib2JqZWN0XCIgfHwgZXJjX29iamVjdF9saXN0LkNvbnRlbnRzPy5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZ2dlci5pbmZvKGBObyBvYmplY3RzIGZvdW5kIHVuZGVyIHMzOi8vJHtCdWNrZXR9L3Rlc3QvYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyY19vYmplY3RfbGlzdC5Db250ZW50cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsb2dnZXIuaW5mbyhjLktleT8udG9TdHJpbmcoKSB8fCBcIlwiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyAuLi4gd29ya3MsIGJ1dCB0aGUgZmlsZSBrZXlzIGFyZSByZXR1cm5lZCBhcyBhIHBhcnRpYWwgbGlzdDsgbm90IHJlbGlhYmxlXG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggUzMgcmVzb3VyY2UgKG9iamVjdCBieSBrZXkpXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgIEJ1Y2tldCxcbiAgICAgIEtleTogXCJ0ZXN0L21ldGFkYXRhLmpzb25cIlxuICAgIH0pKTtcblxuICAgIGxvZ2dlci5pbmZvKGBzMy5nZXRPYmplY3QoKS4uLmApO1xuXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nID0gKHR5cGVvZiBlcmNfbWV0YWRhdGFfanNvbi5Cb2R5ID09PSBcIm9iamVjdFwiKSA/XG4gICAgICAoYXdhaXQgZXJjX21ldGFkYXRhX2pzb24uQm9keT8udHJhbnNmb3JtVG9TdHJpbmcoKSkgOlxuICAgICAgYHsgXCJFcnJvclwiOiBcIlMzIG9iamVjdCBCb2R5IGlzIHVuZGVmaW5lZFwiIH1gO1xuXG4gICAgbG9nZ2VyLmluZm8oYFMzIG9iamVjdCBCb2R5OiAke2VyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZ31gKTtcblxuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgXCJlcmNfczNfdGVzdFwiOiBKU09OLnBhcnNlKGVyY19tZXRhZGF0YV9ib2R5X3RvX3N0cmluZyksXG4gICAgICBcIm1lc3NhZ2VcIjogZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nXG4gICAgfTtcblxuICAgIHJldHVybiBbeyAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpLi4uXG4gICAgICAgIC4uLnZhbHVlXG4gICAgfV1bMF07ICAgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVyY190ZXN0O1xuIl19