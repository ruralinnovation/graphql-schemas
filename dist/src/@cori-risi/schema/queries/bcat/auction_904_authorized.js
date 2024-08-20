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
        if (typeof redisClient !== "undefined" && !!skipCache && typeof redisClient.disconnect === 'function') {
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
                const fc = (typeof redisClient === "undefined" || !!skipCache)
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
                (typeof redisClient === "undefined" || !!skipCache)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEwQztBQUMxQyx1Q0FBc0Y7QUFFdEYsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUM5QyxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMs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R0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBRWxFLE9BQU8sTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLDhCQUE4Qjs4QkFDdkQsYUFBYSxNQUFNLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUMzRixDQUFDLENBQUMsQ0FBQztZQUVQLG1DQUFtQztZQUVuQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FDbkI7b0JBQ1Isb0NBQW9DO29CQUN4QixNQUFNLEVBQUUsbUJBQW1CO29CQUMzQixVQUFVLEVBQUUsR0FBRyxDQUFDLFFBQVE7aUJBQzNCLENBQ0YsQ0FBQyxDQUFDO2dCQUNULDBCQUEwQjtnQkFDcEIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDRSxNQUFNLEVBQUUsbUJBQW1CO29CQUMzQixVQUFVLEVBQUUsRUFBRTtpQkFDZixDQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUFFO1FBQ0osT0FBTztRQUNQLHNCQUFzQjtRQUN0QixpQ0FBaUM7UUFDakMsb0JBQW9CO1FBQ3BCLE9BQU87U0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi90eXBlcy9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBhdWN0aW9uXzkwNF9hdXRob3JpemVkID0ge1xuICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICBhcmdzOiB7XG4gICAgZ2VvaWRfY286IHtcbiAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSEsXG4gICAgfSxcbiAgICBsaW1pdDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBwYWdlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBza2lwQ2FjaGU6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgeyBnZW9pZF9jbywgbGltaXQsIG9mZnNldCwgcGFnZSwgc2tpcENhY2hlIH06IHtcbiAgICAgIGdlb2lkX2NvOiBzdHJpbmdbXTtcbiAgICAgIGxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBvZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHBhZ2U6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcmVzdEFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAwO1xuXG4gICAgY29uc3QgY291bnRfb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCA9PT0gb2Zmc2V0KSA/XG4gICAgICBvZmZzZXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IHBhZ2VfbnVtYmVyID0gKHR5cGVvZiBwYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYWdlID09PSBwYWdlKSA/XG4gICAgICBwYWdlIDpcbiAgICAgIDA7XG5cbiAgICBpZiAodHlwZW9mIHJlZGlzQ2xpZW50ICE9PSBcInVuZGVmaW5lZFwiICYmICEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0X3VyaSA9IGAke3Jlc3RBcGkuYmFzZVVSTH0vYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkJHtcbiAgICAgIChnZW9pZHMgPT09IFwiYWxsXCIpID9cbiAgICAgICAgYD9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCA6IFxuICAgICAgICBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YFxuICAgIH1gO1xuXG4gICAgLy8gcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAvLyAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICByZXR1cm4gYXdhaXQgKFxuICAgICAgKGFzeW5jICgpID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ5IHJlc3RBcGk6IFwiLCByZXN0X3VyaSk7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgIGNvbnN0IHJlczogYW55ID0gKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmMgPSAodHlwZW9mIHJlZGlzQ2xpZW50ID09PSBcInVuZGVmaW5lZFwiIHx8ICEhc2tpcENhY2hlKVxuICAgICAgICAgICAgICA/IGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZD9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9hdXRob3JpemVkLWBcbiAgICAgICAgICAgICAgICArIGAke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuICAgICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRjID0gKDxhbnk+KDxSZXNwb25zZT5yZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZWF0dXJlQ29sbGVjdGlvbjogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKHRjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICg8QXJyYXk8YW55Pj50Yy5mZWF0dXJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGYucHJvcGVydGllcy5nZW9pZF9jb1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGMuZmVhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZD9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IChmYy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmZjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgIGZjLmZlYXR1cmVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSgpOlxuICAgICAgICAgICh0eXBlb2YgcmVkaXNDbGllbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgISFza2lwQ2FjaGUpXG4gICAgICAgICAgICA/IGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZGBcbiAgICAgICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfYXV0aG9yaXplZC1gXG4gICAgICAgICAgICAgICsgYCR7Z2VvaWRzfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcykpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXN0QXBpLmdldEl0ZW0oYC9iY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWRgXG4gICAgICAgICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlczogXCIsIGF3YWl0IHJlcyk7XG5cbiAgICAgICAgcmV0dXJuICgocmVzKSA/XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogcmVzLmZlYXR1cmVzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSA6XG4gICAgLy8gICAgICAgZmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSkoKVxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgLy8gICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAvLyAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgLy8gICB9KVxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGF1Y3Rpb25fOTA0X2F1dGhvcml6ZWQ7XG4iXX0=