"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../types/geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const auction_904_authorized_geojson = {
    type: geojson_1.default.FeatureCollectionObject,
    args: {
        geoid_co: {
            type: type_1.GraphQLString,
        },
        geoid_bl: {
            type: new type_1.GraphQLList(type_1.GraphQLString),
        },
        limit: {
            type: type_1.GraphQLInt
        },
        offset: {
            type: type_1.GraphQLInt
        },
        page: {
            type: type_1.GraphQLInt
        },
        skipCache: {
            type: type_1.GraphQLBoolean,
        },
    },
    resolve: async (_, { geoid_co, geoid_bl, limit, offset, page, skipCache }, { dataSources: { restApi }, redisClient }, info) => {
        const geoids = (typeof geoid_bl !== 'undefined' && geoid_bl !== null && geoid_bl.length > 0) ?
            geoid_bl.map(c => c.toString()).join(",") :
            "";
        const page_size = (typeof limit !== 'undefined' && limit === limit) ?
            limit :
            10;
        const count_offset = (typeof offset !== 'undefined' && offset === offset) ?
            offset :
            0;
        const page_number = (typeof page !== 'undefined' && page === page) ?
            page :
            0;
        if (!!skipCache && typeof redisClient.disconnect === 'function') {
            // Disconnect from redis when ever skipCache == true
            console.log("Disconnect from redis when ever skipCache == true");
            redisClient.disconnect();
        }
        // TODO: Remove after testing call to local Python REST API
        console.log(`Query restApi: ${restApi.baseURL}bcat/auction_904_authorized/geojson`
            + `?geoid_co=${geoid_co}` + ((!!geoids) ? `&geoid_bl=${geoids}` : ``)
            + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        const test_req = (0, cross_fetch_1.fetch)(`${restApi.baseURL}bcat/auction_904_authorized/geojson`
            + `?geoid_co=${geoid_co}` + ((!!geoids) ? `&geoid_bl=${geoids}` : ``)
            + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        test_req
            .catch((err) => console.log("Test Python REST error: ", err))
            .then((res) => console.log("Test Python REST response: ", res));
        const check_res = await test_req;
        console.log(test_req);
        return skipCache
            ? await restApi.getItem(`bcat/auction_904_authorized/geojson`
                + `?geoid_co=${geoid_co}` + ((!!geoids) ? `&geoid_bl=${geoids}` : ``)
                + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
            : await redisClient.checkCache(`auction_904_authorized-`
                + `${geoid_co}` + ((!!geoids) ? `-${geoids}` : ``) + `-${page_size}-${count_offset}-${page_number}`, async () => {
                return await restApi.getItem(`bcat/auction_904_authorized/geojson`
                    + `?geoid_co=${geoid_co}` + ((!!geoids) ? `&geoid_bl=${geoids}` : ``)
                    + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
            });
    },
};
exports.default = auction_904_authorized_geojson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfYXV0aG9yaXplZF9nZW9qc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMvYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkX2dlb2pzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBMEM7QUFDMUMsdUNBQXNGO0FBRXRGLDJEQUEyRDtBQUMzRCw2Q0FBb0M7QUFFcEMsTUFBTSw4QkFBOEIsR0FBRztJQUNyQyxJQUFJLEVBQUUsaUJBQU8sQ0FBQyx1QkFBdUI7SUFDckMsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLG9CQUFjO1NBQ3JCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLElBQUksa0JBQVcsQ0FBQyxvQkFBYSxDQUFFO1NBQ3RDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLHFCQUFjO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQU9uRCxFQUNELEVBQUUsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFPLEVBQzlDLElBQVMsRUFDVCxFQUFFO1FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsUUFBUSxDQUFDLEdB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TSxPQUFPLENBQUMsT0FBTyxDQUFDLHFDQUFxQztzQkFDOUQsYUFBYSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxhQUFhLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7c0JBQ2xFLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSw4QkFBOEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi90eXBlcy9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBhdWN0aW9uXzkwNF9hdXRob3JpemVkX2dlb2pzb24gPSB7XG4gIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gIGFyZ3M6IHtcbiAgICBnZW9pZF9jbzoge1xuICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgfSxcbiAgICBnZW9pZF9ibDoge1xuICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgICB9LFxuICAgIGxpbWl0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHNraXBDYWNoZToge1xuICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICB7IGdlb2lkX2NvLCBnZW9pZF9ibCwgbGltaXQsIG9mZnNldCwgcGFnZSwgc2tpcENhY2hlIH06IHtcbiAgICAgIGdlb2lkX2NvOiBzdHJpbmc7XG4gICAgICBnZW9pZF9ibDogc3RyaW5nW107XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHJlc3RBcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgIGluZm86IGFueVxuICApID0+IHtcblxuICAgIGNvbnN0IGdlb2lkcyA9ICh0eXBlb2YgZ2VvaWRfYmwgIT09ICd1bmRlZmluZWQnICYmIGdlb2lkX2JsICE9PSBudWxsICYmIGdlb2lkX2JsLmxlbmd0aCA+IDApID9cbiAgICAgIGdlb2lkX2JsLm1hcChjID0+IGMudG9TdHJpbmcoKSkuam9pbihcIixcIikgOlxuICAgICAgXCJcIjtcblxuICAgIGNvbnN0IHBhZ2Vfc2l6ZSA9ICh0eXBlb2YgbGltaXQgIT09ICd1bmRlZmluZWQnICYmIGxpbWl0ID09PSBsaW1pdCkgP1xuICAgICAgbGltaXQgOlxuICAgICAgMTA7XG5cbiAgICBjb25zdCBjb3VudF9vZmZzZXQgPSAodHlwZW9mIG9mZnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb2Zmc2V0ID09PSBvZmZzZXQpID9cbiAgICAgIG9mZnNldCA6XG4gICAgICAwO1xuXG4gICAgY29uc3QgcGFnZV9udW1iZXIgPSAodHlwZW9mIHBhZ2UgIT09ICd1bmRlZmluZWQnICYmIHBhZ2UgPT09IHBhZ2UpID9cbiAgICAgIHBhZ2UgOlxuICAgICAgMDtcblxuICAgIGlmICghIXNraXBDYWNoZSAmJiB0eXBlb2YgcmVkaXNDbGllbnQuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coXCJEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXCIpXG4gICAgICByZWRpc0NsaWVudC5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICBjb25zb2xlLmxvZyhgUXVlcnkgcmVzdEFwaTogJHtyZXN0QXBpLmJhc2VVUkx9YmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkL2dlb2pzb25gXG4gICAgICArIGA/Z2VvaWRfY289JHtnZW9pZF9jb31gICsgKCghIWdlb2lkcyk/IGAmZ2VvaWRfYmw9JHtnZW9pZHN9YCA6IGBgKVxuICAgICAgKyBgJmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICBjb25zdCB0ZXN0X3JlcSA9IGZldGNoKGAke3Jlc3RBcGkuYmFzZVVSTH1iY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWQvZ2VvanNvbmBcbiAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfWAgKyAoKCEhZ2VvaWRzKT8gYCZnZW9pZF9ibD0ke2dlb2lkc31gIDogYGApXG4gICAgICArIGAmbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuXG4gICAgdGVzdF9yZXFcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKSk7XG5cbiAgICBjb25zdCBjaGVja19yZXMgPSBhd2FpdCB0ZXN0X3JlcTtcblxuICAgIGNvbnNvbGUubG9nKHRlc3RfcmVxKTtcblxuICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgID8gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWQvZ2VvanNvbmBcbiAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRfY299YCArICgoISFnZW9pZHMpPyBgJmdlb2lkX2JsPSR7Z2VvaWRzfWAgOiBgYClcbiAgICAgICAgKyBgJmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9hdXRob3JpemVkLWBcbiAgICAgICAgKyBgJHtnZW9pZF9jb31gICsgKCghIWdlb2lkcykgPyBgLSR7Z2VvaWRzfWAgOiBgYCkgKyBgLSR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXN0QXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZC9nZW9qc29uYFxuICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfWAgKyAoKCEhZ2VvaWRzKT8gYCZnZW9pZF9ibD0ke2dlb2lkc31gIDogYGApXG4gICAgICAgICAgKyBgJmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVjdGlvbl85MDRfYXV0aG9yaXplZF9nZW9qc29uO1xuIl19