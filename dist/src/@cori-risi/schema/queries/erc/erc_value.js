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
        // const s3 = new S3((s3DataSource as any).config);
        const s3 = new client_s3_1.S3();
        const Bucket = "erc-public";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3ZhbHVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY192YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUF1RDtBQUN2RCxrREFBd0Q7QUFDeEQsdUNBS3NCO0FBR3RCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxTQUFTLEdBQUc7SUFDaEIsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDbkIsd0RBQXdEO0lBQzVELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixtQ0FBbUM7WUFDbkMscUNBQXFDO1lBQ3JDLGtDQUFrQztZQUNsQyw4QkFBOEI7WUFDOUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFZLEVBQUU7U0FDOUIsQ0FBQztLQUNILENBQUM7SUFDSixJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQU8sRUFDUCxFQUNFLFdBQVcsRUFBRSxFQUNYLFNBQVMsRUFDVCxZQUFZLEVBQ2IsRUFDRyxFQUNOLElBQVMsRUFDVCxFQUFFO1FBRUYsdUNBQXVDO1FBQ3ZDLDBDQUEwQztRQUMxQyxlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLFNBQVM7UUFFVCxtREFBbUQ7UUFDbkQsTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFFLEVBQUUsQ0FBQztRQUNwQixNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFFNUIsaURBQWlEO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDNUMsTUFBTTtZQUNOLEdBQUcsRUFBRSxvQkFBb0I7U0FDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSixNQUFNLDJCQUEyQixHQUFHLENBQUMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoRixDQUFDLE1BQU0saUJBQWlCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELDRDQUE0QyxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLDJCQUEyQixFQUFFLENBQUMsQ0FBQztRQUU5RCxNQUFNLEtBQUssR0FBRztZQUNaLFNBQVMsRUFBRSwyQkFBMkI7WUFDdEMsT0FBTyxFQUFFLEdBQUc7U0FDYixDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHdEQUF3RDtJQUNwRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0Bhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyJztcbmltcG9ydCB7IFMzLCBTM0NsaWVudENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcbmltcG9ydCB7XG4gIEdyYXBoUUxGbG9hdCxcbiAgR3JhcGhRTEludCxcbiAgR3JhcGhRTE9iamVjdFR5cGUsXG4gIEdyYXBoUUxTdHJpbmdcbn0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCk7XG5cbmNvbnN0IGVyY192YWx1ZSA9IHtcbiAgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaVxuICB0eXBlOiAvLyBuZXcgR3JhcGhRTExpc3QoXG4gICAgICAgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gICAgbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICAgIG5hbWU6ICdFUkNWYWx1ZScsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIC8vIG1ldHJpYzogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIC8vIHZhcmlhYmxlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgLy8gZ2VvaWQ6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICAvLyB5ZWFyOiB7IHR5cGU6IEdyYXBoUUxJbnQgfSxcbiAgICAgICAgdmFsdWU6IHsgdHlwZTogR3JhcGhRTEZsb2F0IH1cbiAgICAgIH0pXG4gICAgfSksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICBweXRob25BcGksXG4gICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgfVxuICAgIH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuXG4gICAgLy8gbG9nZ2VyLmluZm8oJ1RoaXMgaXMgYW4gSU5GTyBsb2chJyk7XG4gICAgLy8gbG9nZ2VyLmluZm8oYGRhdGFTb3VyY2VzOiAke3N0cmluZ2lmeShbXG4gICAgLy8gICBweXRob25BcGksXG4gICAgLy8gICBzM0RhdGFTb3VyY2VcbiAgICAvLyBdKX1gKTtcblxuICAgIC8vIGNvbnN0IHMzID0gbmV3IFMzKChzM0RhdGFTb3VyY2UgYXMgYW55KS5jb25maWcpO1xuICAgIGNvbnN0IHMzID0gbmV3IFMzKCk7XG4gICAgY29uc3QgQnVja2V0ID0gXCJlcmMtcHVibGljXCI7XG5cbiAgICAvLyBUT0RPOiBUcnkgdG8gZmV0Y2ggUzMgcmVzb3VyY2UgKG9iamVjdCBieSBrZXkpXG4gICAgY29uc3QgZXJjX21ldGFkYXRhX2pzb24gPSAoYXdhaXQgczMuZ2V0T2JqZWN0KHtcbiAgICAgIEJ1Y2tldCxcbiAgICAgIEtleTogXCJ0ZXN0L21ldGFkYXRhLmpzb25cIlxuICAgIH0pKTtcbiAgICBjb25zdCBlcmNfbWV0YWRhdGFfYm9keV90b19zdHJpbmcgPSAodHlwZW9mIGVyY19tZXRhZGF0YV9qc29uLkJvZHkgPT09IFwib2JqZWN0XCIpID9cbiAgICAgIChhd2FpdCBlcmNfbWV0YWRhdGFfanNvbi5Cb2R5Py50cmFuc2Zvcm1Ub1N0cmluZygpKSA6XG4gICAgICBgeyBcIkVycm9yXCI6IFwiUzMgb2JqZWN0IEJvZHkgaXMgdW5kZWZpbmVkXCIgfWA7XG5cbiAgICBsb2dnZXIuaW5mbyhgUzMgb2JqZWN0IEJvZHk6ICR7ZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nfWApO1xuXG4gICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICBcIm1lc3NhZ2VcIjogZXJjX21ldGFkYXRhX2JvZHlfdG9fc3RyaW5nLFxuICAgICAgXCJ2YWx1ZVwiOiAxLjBcbiAgICB9O1xuXG4gICAgcmV0dXJuIFt7IC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGkuLi5cbiAgICAgICAgLi4udmFsdWVcbiAgICB9XVswXTsgICAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZXJjX3ZhbHVlO1xuIl19