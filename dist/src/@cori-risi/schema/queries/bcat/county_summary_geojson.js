"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../types/geojson");
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
    resolve: async (_, { geoid_co, skipCache }, { dataSources: { restApi }, redisClient }, info) => {
        if (!!skipCache && typeof redisClient.disconnect === 'function') {
            // Disconnect from redis when ever skipCache == true
            console.log("Disconnect from redis when ever skipCache == true");
            redisClient.disconnect();
        }
        // TODO: Remove after testing call to local Python REST API
        console.log(`Query restApi: ${restApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
        const test_req = (0, cross_fetch_1.fetch)(`${restApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
        test_req
            .catch((err) => console.log("Test Python REST error: ", err))
            .then((res) => console.log("Test Python REST response: ", res));
        const check_res = await test_req;
        console.log(test_req);
        return skipCache
            ? await restApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`county_summary-${geoid_co}`, async () => {
                return await restApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`);
            });
    },
};
exports.default = county_summary_geojson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnR5X3N1bW1hcnlfZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL2JjYXQvY291bnR5X3N1bW1hcnlfZ2VvanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEwQztBQUMxQyx1Q0FBNkQ7QUFFN0QsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsb0JBQWM7U0FDckI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBd0QsRUFDN0UsRUFBRSxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQU8sRUFDOUMsSUFBUyxFQUNULEVBQUU7UUFFRixJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxXQUFXLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ2hFLG9EQUFvRDtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDaEUsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCwyREFBMkQ7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLE9BQU8sd0NBQXdDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakcsTUFBTSxRQUFRLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sd0NBQXdDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFN0YsUUFBUTthQUNMLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBQyxHQUFHLENBQUMsQ0FBQzthQUMzRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVqRSxNQUFNLFNBQVMsR0FBRyxNQUFNLFFBQVEsQ0FBQztRQUVqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLE9BQU8sU0FBUztZQUNkLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0NBQXdDLFFBQVEsRUFBRSxDQUFDO1lBQzNFLENBQUMsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLFFBQVEsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUN0RSxPQUFPLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNuRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2VvSlNPTiBmcm9tIFwiLi4vLi4vdHlwZXMvZ2VvanNvblwiO1xuaW1wb3J0IHsgR3JhcGhRTEJvb2xlYW4sIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBjb3VudHlfc3VtbWFyeV9nZW9qc29uID0ge1xuICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICBhcmdzOiB7XG4gICAgZ2VvaWRfY286IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgIH0sXG4gICAgc2tpcENhY2hlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIHsgZ2VvaWRfY28sIHNraXBDYWNoZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcmVzdEFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICBjb25zb2xlLmxvZyhgUXVlcnkgcmVzdEFwaTogJHtyZXN0QXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgY29uc3QgdGVzdF9yZXEgPSBmZXRjaChgJHtyZXN0QXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG5cbiAgICB0ZXN0X3JlcVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsZXJyKSlcbiAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIscmVzKSk7XG5cbiAgICBjb25zdCBjaGVja19yZXMgPSBhd2FpdCB0ZXN0X3JlcTtcblxuICAgIGNvbnNvbGUubG9nKHRlc3RfcmVxKTtcblxuICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgID8gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50eV9zdW1tYXJ5X2dlb2pzb247XG4iXX0=