"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../types/geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const auction_904_subsidy_awards_geojson = {
    type: geojson_1.default.FeatureCollectionObject,
    args: {
        geoid_co: {
            type: type_1.GraphQLString,
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
    resolve: async (_, { geoid_co, limit, offset, page, skipCache }, { dataSources: { restApi }, redisClient }, info) => {
        const page_size = (typeof limit !== 'undefined' && limit === limit) ?
            limit :
            10;
        const count_offset = (typeof offset !== 'undefined' && offset === offset) ?
            offset :
            0;
        const page_number = (typeof page !== 'undefined' && page === page) ?
            page :
            0;
        if (typeof redisClient !== "undefined" && !!skipCache && typeof redisClient.disconnect === 'function') {
            // Disconnect from redis when ever skipCache == true
            console.log("Disconnect from redis when ever skipCache == true");
            redisClient.disconnect();
        }
        // TODO: Remove after testing call to local Python REST API
        console.log(`Query restApi: ${restApi.baseURL}/bcat/auction_904_subsidy_awards/geojson`
            + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        const test_req = (0, cross_fetch_1.fetch)(`${restApi.baseURL}/bcat/auction_904_subsidy_awards/geojson`
            + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        test_req
            .catch((err) => console.log("Test Python REST error: ", err))
            .then((res) => console.log("Test Python REST response: ", res));
        const check_res = await test_req;
        console.log(test_req);
        return skipCache
            ? await restApi.getItem(`/bcat/auction_904_subsidy_awards/geojson`
                + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
            : await redisClient.checkCache(`auction_904_subsidy_awards-`
                + `${geoid_co}-${page_size}-${count_offset}-${page_number}`, async () => {
                return await restApi.getItem(`/bcat/auction_904_subsidy_awards/geojson`
                    + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
            });
    },
};
exports.default = auction_904_subsidy_awards_geojson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL2JjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEwQztBQUMxQyx1Q0FBeUU7QUFFekUsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLGtDQUFrQyxHQUFHO0lBQ3pDLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsb0JBQWM7U0FDckI7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUM5QyxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUssQ0FBQyxDQUFDO1lBQ1AsRUFBRSxDQUFDO1FBRUwsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLENBQUM7WUFDUixDQUFDLENBQUM7UUFFSixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQztRQUVKLElBQUksT0FBTyxXQUFXLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxXQUFXLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3RHLG9EQUFvRDtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDaEUsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCwyREFBMkQ7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLE9BQU8sMENBQTBDO2NBQ25GLGFBQWEsUUFBUSxVQUFVLFNBQVMsV0FBVyxZQUFZLFNBQVMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMzRixNQUFNLFFBQVEsR0FBRyxJQUFBLG1CQUFLLEVBQUMsR0FBRyxPQUFPLENBQUMsT0FBTywwQ0FBMEM7Y0FDL0UsYUFBYSxRQUFRLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTNGLFFBQVE7YUFDTCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDNUQsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUM7UUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QixPQUFPLFNBQVM7WUFDZCxDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLDBDQUEwQztrQkFDOUQsYUFBYSxRQUFRLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQztZQUMxRixDQUFDLENBQUMsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLDZCQUE2QjtrQkFDeEQsR0FBRyxRQUFRLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxXQUFXLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDeEUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsMENBQTBDO3NCQUNuRSxhQUFhLFFBQVEsVUFBVSxTQUFTLFdBQVcsWUFBWSxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDN0YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGtDQUFrQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb0pTT04gZnJvbSBcIi4uLy4uL3R5cGVzL2dlb2pzb25cIjtcbmltcG9ydCB7IEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMSW50LCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcblxuY29uc3QgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbiA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICB9LFxuICAgIGxpbWl0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHNraXBDYWNoZToge1xuICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICB7IGdlb2lkX2NvLCBsaW1pdCwgb2Zmc2V0LCBwYWdlLCBza2lwQ2FjaGUgfToge1xuICAgICAgZ2VvaWRfY286IHN0cmluZztcbiAgICAgIGxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBvZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHBhZ2U6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcmVzdEFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAxMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKHR5cGVvZiByZWRpc0NsaWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhIXNraXBDYWNoZSAmJiB0eXBlb2YgcmVkaXNDbGllbnQuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coXCJEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXCIpXG4gICAgICByZWRpc0NsaWVudC5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICBjb25zb2xlLmxvZyhgUXVlcnkgcmVzdEFwaTogJHtyZXN0QXBpLmJhc2VVUkx9L2JjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbmBcbiAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgY29uc3QgdGVzdF9yZXEgPSBmZXRjaChgJHtyZXN0QXBpLmJhc2VVUkx9L2JjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbmBcbiAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG5cbiAgICB0ZXN0X3JlcVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgcmVzcG9uc2U6IFwiLCByZXMpKTtcblxuICAgIGNvbnN0IGNoZWNrX3JlcyA9IGF3YWl0IHRlc3RfcmVxO1xuXG4gICAgY29uc29sZS5sb2codGVzdF9yZXEpO1xuXG4gICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgPyBhd2FpdCByZXN0QXBpLmdldEl0ZW0oYC9iY2F0L2F1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzL2dlb2pzb25gXG4gICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMtYFxuICAgICAgICArIGAke2dlb2lkX2NvfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uYFxuICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGF1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzX2dlb2pzb247XG4iXX0=