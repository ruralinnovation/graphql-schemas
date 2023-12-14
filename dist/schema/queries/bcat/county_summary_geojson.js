"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const county_summary_geojson = {
    type: geojson_1.default.FeatureCollectionObject,
    args: {
        geoid_co: {
            type: type_1.GraphQLString,
        },
        skipCache: {
            type: type_1.GraphQLBoolean,
        },
    },
    resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
        if (!!skipCache && typeof redisClient.disconnect === 'function') {
            // Disconnect from redis when ever skipCache == true
            console.log("Disconnect from redis when ever skipCache == true");
            redisClient.disconnect();
        }
        // TODO: Remove after testing call to local Python REST API
        console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
        const test_req = (0, cross_fetch_1.fetch)(`${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
        test_req
            .catch((err) => console.log("Test Python REST error: ", err))
            .then((res) => console.log("Test Python REST response: ", res));
        const check_res = await test_req;
        console.log(test_req);
        return skipCache
            ? await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`county_summary-${geoid_co}`, async () => {
                return await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`);
            });
    },
};
exports.default = county_summary_geojson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnR5X3N1bW1hcnlfZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NjaGVtYS9xdWVyaWVzL2JjYXQvY291bnR5X3N1bW1hcnlfZ2VvanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUNwQyx1Q0FBNkQ7QUFFN0QsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsb0JBQWM7U0FDckI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBd0QsRUFDN0UsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQU8sRUFDaEQsSUFBUyxFQUNULEVBQUU7UUFFRixJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxXQUFXLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUMvRCxvREFBb0Q7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO1lBQ2hFLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMxQjtRQUVELDJEQUEyRDtRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixTQUFTLENBQUMsT0FBTyx3Q0FBd0MsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyRyxNQUFNLFFBQVEsR0FBRyxJQUFBLG1CQUFLLEVBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyx3Q0FBd0MsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUUvRixRQUFRO2FBQ0wsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDO1FBRWpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEIsT0FBTyxTQUFTO1lBQ2QsQ0FBQyxDQUFDLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsUUFBUSxFQUFFLENBQUM7WUFDN0UsQ0FBQyxDQUFDLE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsUUFBUSxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RFLE9BQU8sTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcblxuLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbmltcG9ydCB7IGZldGNoIH0gZnJvbSBcImNyb3NzLWZldGNoXCI7XG5cbmNvbnN0IGNvdW50eV9zdW1tYXJ5X2dlb2pzb24gPSB7XG4gIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gIGFyZ3M6IHtcbiAgICBnZW9pZF9jbzoge1xuICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgfSxcbiAgICBza2lwQ2FjaGU6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgIGluZm86IGFueVxuICApID0+IHtcblxuICAgIGlmICghIXNraXBDYWNoZSAmJiB0eXBlb2YgcmVkaXNDbGllbnQuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coXCJEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXCIpXG4gICAgICByZWRpc0NsaWVudC5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgY29uc29sZS5sb2coYFF1ZXJ5IHB5dGhvbkFwaTogJHtweXRob25BcGkuYmFzZVVSTH1iY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICBjb25zdCB0ZXN0X3JlcSA9IGZldGNoKGAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuXG4gICAgdGVzdF9yZXFcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLGVycikpXG4gICAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgcmVzcG9uc2U6IFwiLHJlcykpO1xuXG4gICAgY29uc3QgY2hlY2tfcmVzID0gYXdhaXQgdGVzdF9yZXE7XG5cbiAgICBjb25zb2xlLmxvZyh0ZXN0X3JlcSk7XG5cbiAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY291bnR5X3N1bW1hcnlfZ2VvanNvbjtcbiJdfQ==