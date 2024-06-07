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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnR5X3N1bW1hcnlfZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zY2hlbWEvcXVlcmllcy9iY2F0L2NvdW50eV9zdW1tYXJ5X2dlb2pzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBb0M7QUFDcEMsdUNBQTZEO0FBRTdELDJEQUEyRDtBQUMzRCw2Q0FBb0M7QUFFcEMsTUFBTSxzQkFBc0IsR0FBRztJQUM3QixJQUFJLEVBQUUsaUJBQU8sQ0FBQyx1QkFBdUI7SUFDckMsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLG9CQUFjO1NBQ3JCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLHFCQUFjO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQXdELEVBQzdFLEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFPLEVBQ2hELElBQVMsRUFDVCxFQUFFO1FBRUYsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sV0FBVyxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNoRSxvREFBb0Q7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO1lBQ2hFLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsMkRBQTJEO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLFNBQVMsQ0FBQyxPQUFPLHdDQUF3QyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3JHLE1BQU0sUUFBUSxHQUFHLElBQUEsbUJBQUssRUFBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLHdDQUF3QyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRS9GLFFBQVE7YUFDTCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0QsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFakUsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUM7UUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QixPQUFPLFNBQVM7WUFDZCxDQUFDLENBQUMsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxRQUFRLEVBQUUsQ0FBQztZQUM3RSxDQUFDLENBQUMsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLGtCQUFrQixRQUFRLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDdEUsT0FBTyxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsd0NBQXdDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb0pTT04gZnJvbSBcIi4uLy4uL2dlb2pzb25cIjtcbmltcG9ydCB7IEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcblxuY29uc3QgY291bnR5X3N1bW1hcnlfZ2VvanNvbiA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICB9LFxuICAgIHNraXBDYWNoZToge1xuICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICBjb25zb2xlLmxvZyhgUXVlcnkgcHl0aG9uQXBpOiAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgIGNvbnN0IHRlc3RfcmVxID0gZmV0Y2goYCR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG5cbiAgICB0ZXN0X3JlcVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsZXJyKSlcbiAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIscmVzKSk7XG5cbiAgICBjb25zdCBjaGVja19yZXMgPSBhd2FpdCB0ZXN0X3JlcTtcblxuICAgIGNvbnNvbGUubG9nKHRlc3RfcmVxKTtcblxuICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9zdW1tYXJ5LSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb3VudHlfc3VtbWFyeV9nZW9qc29uO1xuIl19