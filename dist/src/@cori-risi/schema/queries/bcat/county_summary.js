"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../types/geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const county_summary = {
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
        const rest_uri = `${restApi.baseURL}/bcat/county_summary${(geoids === "all") ?
            "?limit=0" :
            `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`}`;
        // return await geoid_co.reduce(
        //   async (fc, geoid_co) => {
        return await ((async () => {
            console.log("Query restApi: ", rest_uri);
            // const featureCollection = await fc;
            const res = (geoids === "all") ? await (async () => {
                const fc = (typeof redisClient === "undefined" || !!skipCache)
                    ? await restApi.getItem(`/bcat/county_summary?limit=0`)
                    : await redisClient.checkCache(`county_summary-0`, async () => {
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
                        return await restApi.getItem(`/bcat/county_summary?limit=0`);
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
                    // @TODO: Fix this so that we send individual requests for *each* geoid
                    // and then merge the results into single feature collection
                    ? await restApi.getItem(`/bcat/county_summary`
                        + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`county_summary-`
                        + `${geoids}-${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => console.log("Test Python REST response: ", res));
                        return await restApi.getItem(`/bcat/county_summary`
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
exports.default = county_summary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnR5X3N1bW1hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9iY2F0L2NvdW50eV9zdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTBDO0FBQzFDLHVDQUFzRjtBQUV0RiwyREFBMkQ7QUFDM0QsNkNBQW9DO0FBRXBDLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUNFLFdBQVcsRUFBRSxFQUNYLE9BQU8sRUFDUixFQUNELFdBQVcsRUFDUCxFQUNOLElBQVMsRUFDVCxFQUFFO1FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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QUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzNGLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBRW5DLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDUixvQ0FBb0M7b0JBQ3hCLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtpQkFDM0IsQ0FDRixDQUFDLENBQUM7Z0JBQ1QsMEJBQTBCO2dCQUNwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNFLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxFQUFFO2lCQUNmLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUU7UUFDSixPQUFPO1FBQ1Asc0JBQXNCO1FBQ3RCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi90eXBlcy9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBjb3VudHlfc3VtbWFyeSA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgIH0sXG4gICAgbGltaXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgcGFnZToge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgc2tpcENhY2hlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIHsgZ2VvaWRfY28sIGxpbWl0LCBvZmZzZXQsIHBhZ2UsIHNraXBDYWNoZSB9OiB7XG4gICAgICBnZW9pZF9jbzogc3RyaW5nW107XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICByZXN0QXBpXG4gICAgICB9LFxuICAgICAgcmVkaXNDbGllbnRcbiAgICB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAxMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKHR5cGVvZiByZWRpc0NsaWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhIXNraXBDYWNoZSAmJiB0eXBlb2YgcmVkaXNDbGllbnQuZGlzY29ubmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVxuICAgICAgY29uc29sZS5sb2coXCJEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXCIpO1xuICAgICAgcmVkaXNDbGllbnQuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RfdXJpID0gYCR7cmVzdEFwaS5iYXNlVVJMfS9iY2F0L2NvdW50eV9zdW1tYXJ5JHtcbiAgICAgIChnZW9pZHMgPT09IFwiYWxsXCIpID8gXG4gICAgICAgIFwiP2xpbWl0PTBcIiA6IFxuICAgICAgICBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YFxuICAgIH1gO1xuXG4gICAgLy8gcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAvLyAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICByZXR1cm4gYXdhaXQgKFxuICAgICAgKGFzeW5jICgpID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ5IHJlc3RBcGk6IFwiLCByZXN0X3VyaSk7XG5cbiAgICAgICAgLy8gY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgY29uc3QgcmVzOiBhbnkgPSAoZ2VvaWRzID09PSBcImFsbFwiKSA/IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmYyA9ICh0eXBlb2YgcmVkaXNDbGllbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgISFza2lwQ2FjaGUpXG4gICAgICAgICAgICAgID8gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9jb3VudHlfc3VtbWFyeT9saW1pdD0wYClcbiAgICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS0wYCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIGVycm9yOiBcIiwgZXJyKSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGMgPSAoPGFueT4oPFJlc3BvbnNlPnJlcykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZlYXR1cmVDb2xsZWN0aW9uOiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAodGMuaGFzT3duUHJvcGVydHkoXCJmZWF0dXJlc1wiKSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PnRjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0Yy5mZWF0dXJlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9jb3VudHlfc3VtbWFyeT9saW1pdD0wYCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IChmYy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmZjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgIGZjLmZlYXR1cmVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSgpOlxuICAgICAgICAgICh0eXBlb2YgcmVkaXNDbGllbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgISFza2lwQ2FjaGUpXG4gICAgICAgICAgICAvLyBAVE9ETzogRml4IHRoaXMgc28gdGhhdCB3ZSBzZW5kIGluZGl2aWR1YWwgcmVxdWVzdHMgZm9yICplYWNoKiBnZW9pZFxuICAgICAgICAgICAgLy8gYW5kIHRoZW4gbWVyZ2UgdGhlIHJlc3VsdHMgaW50byBzaW5nbGUgZmVhdHVyZSBjb2xsZWN0aW9uXG4gICAgICAgICAgICA/IGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvY291bnR5X3N1bW1hcnlgXG4gICAgICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9zdW1tYXJ5LWBcbiAgICAgICAgICAgICAgKyBgJHtnZW9pZHN9LSR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvY291bnR5X3N1bW1hcnlgXG4gICAgICAgICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlczogXCIsIGF3YWl0IHJlcyk7XG5cbiAgICAgICAgcmV0dXJuICgocmVzKSA/XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogcmVzLmZlYXR1cmVzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSA6XG4gICAgLy8gICAgICAgZmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSkoKVxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgLy8gICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAvLyAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgLy8gICB9KVxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50eV9zdW1tYXJ5O1xuIl19