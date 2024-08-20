"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../types/geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const auction_904_authorized = {
    type: geojson_1.default.FeatureCollectionObject,
    args: {
        geoid_co: {
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
    resolve: async (_, { geoid_co, limit, offset, page, skipCache }, { dataSources: { restApi }, redisClient }, info) => {
        const geoids = (typeof geoid_co !== 'undefined' && geoid_co !== null && geoid_co.length > 0) ?
            geoid_co.map(c => c.toString()).join(",") :
            "all";
        const page_size = (typeof limit !== 'undefined' && limit === limit) ?
            limit :
            0;
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
        const rest_uri = `${restApi.baseURL}/bcat/auction_904_authorized${(geoids === "all") ?
            `?limit=${page_size}&offset=${count_offset}&page=${page_number}` :
            `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`}`;
        // return await geoid_co.reduce(
        //   async (fc, geoid_co) => {
        return await ((async () => {
            console.log("Query restApi: ", rest_uri);
            //     const featureCollection = await fc;
            const res = (geoids === "all") ? await (async () => {
                const fc = (skipCache)
                    ? await restApi.getItem(`/bcat/auction_904_authorized?limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_authorized-`
                        + `${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => {
                            console.log("Test Python REST response: ", res);
                            const tc = res;
                            console.log("FeatureCollection: ", (tc.hasOwnProperty("features")) ?
                                tc.features
                                    .map(f => ({
                                    ...f,
                                    "id": f.properties.geoid_co
                                })) :
                                tc.features);
                        });
                        return await restApi.getItem(`/bcat/auction_904_authorized?limit=${page_size}&offset=${count_offset}&page=${page_number}`);
                    });
                return ({
                    type: 'FeatureCollection',
                    features: (fc.hasOwnProperty("features")) ?
                        fc.features
                            .map(f => ({
                            ...f,
                            "id": f.properties.geoid_co
                        })) :
                        fc.features
                });
            })() :
                (skipCache)
                    ? await restApi.getItem(`/bcat/auction_904_authorized`
                        + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_authorized-`
                        + `${geoids}-${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => console.log("Test Python REST response: ", res));
                        return await restApi.getItem(`/bcat/auction_904_authorized`
                            + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
                    });
            // console.log("res: ", await res);
            return ((res) ?
                await Promise.resolve({
                    //             ...featureCollection,
                    "type": 'FeatureCollection',
                    "features": res.features
                }) :
                //       featureCollection
                await Promise.resolve({
                    "type": 'FeatureCollection',
                    "features": []
                }));
        })()
        //   },
        //   Promise.resolve({
        //     type: 'FeatureCollection',
        //     features: [],
        //   })
        );
    }
};
exports.default = auction_904_authorized;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEwQztBQUMxQyx1Q0FBc0Y7QUFFdEYsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUM5QyxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMs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YSxNQUFNLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUMzRixDQUFDLENBQUMsQ0FBQztZQUVQLG1DQUFtQztZQUVuQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FDbkI7b0JBQ1Isb0NBQW9DO29CQUN4QixNQUFNLEVBQUUsbUJBQW1CO29CQUMzQixVQUFVLEVBQUUsR0FBRyxDQUFDLFFBQVE7aUJBQzNCLENBQ0YsQ0FBQyxDQUFDO2dCQUNULDBCQUEwQjtnQkFDcEIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDRSxNQUFNLEVBQUUsbUJBQW1CO29CQUMzQixVQUFVLEVBQUUsRUFBRTtpQkFDZixDQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUFFO1FBQ0osT0FBTztRQUNQLHNCQUFzQjtRQUN0QixpQ0FBaUM7UUFDakMsb0JBQW9CO1FBQ3BCLE9BQU87U0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi90eXBlcy9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBhdWN0aW9uXzkwNF9hdXRob3JpemVkID0ge1xuICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICBhcmdzOiB7XG4gICAgZ2VvaWRfY286IHtcbiAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSEsXG4gICAgfSxcbiAgICBsaW1pdDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBwYWdlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBza2lwQ2FjaGU6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgeyBnZW9pZF9jbywgbGltaXQsIG9mZnNldCwgcGFnZSwgc2tpcENhY2hlIH06IHtcbiAgICAgIGdlb2lkX2NvOiBzdHJpbmdbXTtcbiAgICAgIGxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBvZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHBhZ2U6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcmVzdEFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAwO1xuXG4gICAgY29uc3QgY291bnRfb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCA9PT0gb2Zmc2V0KSA/XG4gICAgICBvZmZzZXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IHBhZ2VfbnVtYmVyID0gKHR5cGVvZiBwYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYWdlID09PSBwYWdlKSA/XG4gICAgICBwYWdlIDpcbiAgICAgIDA7XG5cbiAgICBpZiAoISFza2lwQ2FjaGUgJiYgdHlwZW9mIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIERpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVwiKVxuICAgICAgcmVkaXNDbGllbnQuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RfdXJpID0gYCR7cmVzdEFwaS5iYXNlVVJMfS9iY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWQke1xuICAgICAgKGdlb2lkcyA9PT0gXCJhbGxcIikgP1xuICAgICAgICBgP2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gIDogXG4gICAgICAgIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gXG4gICAgfWA7XG5cbiAgICAvLyByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgIC8vICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgIHJldHVybiBhd2FpdCAoXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUXVlcnkgcmVzdEFwaTogXCIsIHJlc3RfdXJpKTtcblxuICAgICAgICAvLyAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgY29uc3QgcmVzOiBhbnkgPSAoZ2VvaWRzID09PSBcImFsbFwiKSA/IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmYyA9IChza2lwQ2FjaGUpXG4gICAgICAgICAgICAgID8gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkP2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGF1Y3Rpb25fOTA0X2F1dGhvcml6ZWQtYFxuICAgICAgICAgICAgICAgICsgYCR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIGVycm9yOiBcIiwgZXJyKSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGMgPSAoPGFueT4oPFJlc3BvbnNlPnJlcykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZlYXR1cmVDb2xsZWN0aW9uOiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAodGMuaGFzT3duUHJvcGVydHkoXCJmZWF0dXJlc1wiKSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PnRjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0Yy5mZWF0dXJlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkP2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBmZWF0dXJlczogKGZjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAoPEFycmF5PGFueT4+ZmMuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmLnByb3BlcnRpZXMuZ2VvaWRfY29cbiAgICAgICAgICAgICAgICAgIH0pKSA6XG4gICAgICAgICAgICAgICAgZmMuZmVhdHVyZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKCk6XG4gICAgICAgICAgKHNraXBDYWNoZSlcbiAgICAgICAgICAgID8gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkYFxuICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9hdXRob3JpemVkLWBcbiAgICAgICAgICAgICAgKyBgJHtnZW9pZHN9LSR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZGBcbiAgICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzOiBcIiwgYXdhaXQgcmVzKTtcblxuICAgICAgICByZXR1cm4gKChyZXMpID9cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiByZXMuZmVhdHVyZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApIDpcbiAgICAvLyAgICAgICBmZWF0dXJlQ29sbGVjdGlvblxuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KSgpXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAvLyAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIC8vICAgICBmZWF0dXJlczogW10sXG4gICAgICAvLyAgIH0pXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVjdGlvbl85MDRfYXV0aG9yaXplZDtcbiJdfQ==