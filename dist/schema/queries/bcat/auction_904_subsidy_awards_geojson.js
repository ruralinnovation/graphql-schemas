"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../geojson");
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
    resolve: async (_, { geoid_co, limit, offset, page, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
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
        console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/auction_904_subsidy_awards/geojson`
            + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        const test_req = (0, cross_fetch_1.fetch)(`${pythonApi.baseURL}bcat/auction_904_subsidy_awards/geojson`
            + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        test_req
            .catch((err) => console.log("Test Python REST error: ", err))
            .then((res) => console.log("Test Python REST response: ", res));
        const check_res = await test_req;
        console.log(test_req);
        return skipCache
            ? await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson`
                + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
            : await redisClient.checkCache(`auction_904_subsidy_awards-`
                + `${geoid_co}-${page_size}-${count_offset}-${page_number}`, async () => {
                return await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson`
                    + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
            });
    },
};
exports.default = auction_904_subsidy_awards_geojson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NjaGVtYS9xdWVyaWVzL2JjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUNwQyx1Q0FBeUU7QUFFekUsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLGtDQUFrQyxHQUFHO0lBQ3pDLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsb0JBQWM7U0FDckI7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUNoRCxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUssQ0FBQyxDQUFDO1lBQ1AsRUFBRSxDQUFDO1FBRUwsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLENBQUM7WUFDUixDQUFDLENBQUM7UUFFSixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFdBQVcsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQy9ELG9EQUFvRDtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDaEUsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFCO1FBRUQsMkRBQTJEO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLFNBQVMsQ0FBQyxPQUFPLHlDQUF5QztjQUN0RixhQUFhLFFBQVEsVUFBVSxTQUFTLFdBQVcsWUFBWSxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDM0YsTUFBTSxRQUFRLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8seUNBQXlDO2NBQ2hGLGFBQWEsUUFBUSxVQUFVLFNBQVMsV0FBVyxZQUFZLFNBQVMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUUzRixRQUFRO2FBQ0wsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzVELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDO1FBRWpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEIsT0FBTyxTQUFTO1lBQ2QsQ0FBQyxDQUFDLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyx5Q0FBeUM7a0JBQy9ELGFBQWEsUUFBUSxVQUFVLFNBQVMsV0FBVyxZQUFZLFNBQVMsV0FBVyxFQUFFLENBQUM7WUFDMUYsQ0FBQyxDQUFDLE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkI7a0JBQ3hELEdBQUcsUUFBUSxJQUFJLFNBQVMsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hFLE9BQU8sTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLHlDQUF5QztzQkFDcEUsYUFBYSxRQUFRLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQzdGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxrQ0FBa0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcblxuLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbmltcG9ydCB7IGZldGNoIH0gZnJvbSBcImNyb3NzLWZldGNoXCI7XG5cbmNvbnN0IGF1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzX2dlb2pzb24gPSB7XG4gIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gIGFyZ3M6IHtcbiAgICBnZW9pZF9jbzoge1xuICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgfSxcbiAgICBsaW1pdDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBwYWdlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBza2lwQ2FjaGU6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgeyBnZW9pZF9jbywgbGltaXQsIG9mZnNldCwgcGFnZSwgc2tpcENhY2hlIH06IHtcbiAgICAgIGdlb2lkX2NvOiBzdHJpbmc7XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAxMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuICAgIGNvbnNvbGUubG9nKGBRdWVyeSBweXRob25BcGk6ICR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uYFxuICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRfY299JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICBjb25zdCB0ZXN0X3JlcSA9IGZldGNoKGAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbmBcbiAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG5cbiAgICB0ZXN0X3JlcVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgcmVzcG9uc2U6IFwiLCByZXMpKTtcblxuICAgIGNvbnN0IGNoZWNrX3JlcyA9IGF3YWl0IHRlc3RfcmVxO1xuXG4gICAgY29uc29sZS5sb2codGVzdF9yZXEpO1xuXG4gICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uYFxuICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZF9jb30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApXG4gICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGF1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzLWBcbiAgICAgICAgKyBgJHtnZW9pZF9jb30tJHtwYWdlX3NpemV9LSR7Y291bnRfb2Zmc2V0fS0ke3BhZ2VfbnVtYmVyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzL2dlb2pzb25gXG4gICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRfY299JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbjtcbiJdfQ==