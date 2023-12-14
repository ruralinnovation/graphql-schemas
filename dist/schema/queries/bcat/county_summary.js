"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../geojson");
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
    resolve: async (_, { geoid_co, limit, offset, page, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
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
        if (!!skipCache && typeof redisClient.disconnect === 'function') {
            // Disconnect from redis when ever skipCache == true
            console.log("Disconnect from redis when ever skipCache == true");
            redisClient.disconnect();
        }
        const rest_uri = `${pythonApi.baseURL}bcat/county_summary${(geoids === "all") ?
            "?limit=0" :
            `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`}`;
        // return await geoid_co.reduce(
        //   async (fc, geoid_co) => {
        return await ((async () => {
            console.log("Query pythonApi: ", rest_uri);
            // const featureCollection = await fc;
            const res = (geoids === "all") ? await (async () => {
                const fc = (skipCache)
                    ? await pythonApi.getItem(`bcat/county_summary?limit=0`)
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
                        return await pythonApi.getItem(`bcat/county_summary?limit=0`);
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
                    // @TODO: Fix this so that we send individual requests for *each* geoid
                    // and then merge the results into single feature collection
                    ? await pythonApi.getItem(`bcat/county_summary`
                        + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`county_summary-`
                        + `${geoids}-${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => console.log("Test Python REST response: ", res));
                        return await pythonApi.getItem(`bcat/county_summary`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnR5X3N1bW1hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zY2hlbWEvcXVlcmllcy9iY2F0L2NvdW50eV9zdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQW9DO0FBQ3BDLHVDQUFzRjtBQUV0RiwyREFBMkQ7QUFDM0QsNkNBQW9DO0FBRXBDLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUNoRCxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxLQUFLLENBQUM7UUFF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QUNuQjtvQkFDUixvQ0FBb0M7b0JBQ3hCLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtpQkFDM0IsQ0FDRixDQUFDLENBQUM7Z0JBQ1QsMEJBQTBCO2dCQUNwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNFLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxFQUFFO2lCQUNmLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUU7UUFDSixPQUFPO1FBQ1Asc0JBQXNCO1FBQ3RCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBjb3VudHlfc3VtbWFyeSA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgIH0sXG4gICAgbGltaXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgcGFnZToge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgc2tpcENhY2hlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIHsgZ2VvaWRfY28sIGxpbWl0LCBvZmZzZXQsIHBhZ2UsIHNraXBDYWNoZSB9OiB7XG4gICAgICBnZW9pZF9jbzogc3RyaW5nW107XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAxMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0X3VyaSA9IGAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvY291bnR5X3N1bW1hcnkke1xuICAgICAgKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBcbiAgICAgICAgXCI/bGltaXQ9MFwiIDogXG4gICAgICAgIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gXG4gICAgfWA7XG5cbiAgICAvLyByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgIC8vICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgIHJldHVybiBhd2FpdCAoXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUXVlcnkgcHl0aG9uQXBpOiBcIiwgcmVzdF91cmkpO1xuXG4gICAgICAgIC8vIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgIGNvbnN0IHJlczogYW55ID0gKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmMgPSAoc2tpcENhY2hlKVxuICAgICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5P2xpbWl0PTBgKVxuICAgICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9zdW1tYXJ5LTBgLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgICBmZXRjaChyZXN0X3VyaSlcbiAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgcmVzcG9uc2U6IFwiLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YyA9ICg8YW55Pig8UmVzcG9uc2U+cmVzKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmVhdHVyZUNvbGxlY3Rpb246IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICh0Yy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAoPEFycmF5PGFueT4+dGMuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmLnByb3BlcnRpZXMuZ2VvaWRfY29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRjLmZlYXR1cmVzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfc3VtbWFyeT9saW1pdD0wYCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IChmYy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmZjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgIGZjLmZlYXR1cmVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSgpOlxuICAgICAgICAgIChza2lwQ2FjaGUpXG4gICAgICAgICAgICAvLyBAVE9ETzogRml4IHRoaXMgc28gdGhhdCB3ZSBzZW5kIGluZGl2aWR1YWwgcmVxdWVzdHMgZm9yICplYWNoKiBnZW9pZFxuICAgICAgICAgICAgLy8gYW5kIHRoZW4gbWVyZ2UgdGhlIHJlc3VsdHMgaW50byBzaW5nbGUgZmVhdHVyZSBjb2xsZWN0aW9uXG4gICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5YFxuICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS1gXG4gICAgICAgICAgICAgICsgYCR7Z2VvaWRzfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcykpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfc3VtbWFyeWBcbiAgICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzOiBcIiwgYXdhaXQgcmVzKTtcblxuICAgICAgICByZXR1cm4gKChyZXMpID9cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiByZXMuZmVhdHVyZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApIDpcbiAgICAvLyAgICAgICBmZWF0dXJlQ29sbGVjdGlvblxuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KSgpXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAvLyAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIC8vICAgICBmZWF0dXJlczogW10sXG4gICAgICAvLyAgIH0pXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY291bnR5X3N1bW1hcnk7XG4iXX0=