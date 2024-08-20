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
        if (!!skipCache && typeof redisClient.disconnect === 'function') {
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
                const fc = (skipCache)
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
                (skipCache)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnR5X3N1bW1hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9iY2F0L2NvdW50eV9zdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTBDO0FBQzFDLHVDQUFzRjtBQUV0RiwyREFBMkQ7QUFDM0QsNkNBQW9DO0FBRXBDLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUNFLFdBQVcsRUFBRSxFQUNYLE9BQU8sRUFDUixFQUNELFdBQVcsRUFDUCxFQUNOLElBQVMsRUFDVCxFQUFFO1FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEtBQUssQ0FBQztRQUVSLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUssQ0FBQyxDQUFDO1lBQ1AsRUFBRSxDQUFDO1FBRUwsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLENBQUM7WUFDUixDQUFDLENBQUM7UUFFSixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFdBQVcsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDaEUsb0RBQW9EO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQTtZQUNoRSxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVELE1BQU0sUUFBUSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sdUJBQ2pDLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLENBQUM7WUFDWixhQUFhLE1BQU0sVUFBVSxTQUFTLFdBQVcsWUFBWSxTQUFTLFdBQVcsRUFDckYsRUFBRSxDQUFDO1FBRUgsZ0NBQWdDO1FBQ2hDLDhCQUE4QjtRQUM5QixPQUFPLE1BQU0sQ0FDWCxDQUFDLEtBQUssSUFBSSxFQUFFO1lBRVYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUV6QyxzQ0FBc0M7WUFDdEMsTUFBTSxHQUFHLEdBQVEsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDcEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7b0JBQ3ZELENBQUMsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0JBQzVELDJEQUEyRDt3QkFDM0QsSUFBQSxtQkFBSyxFQUFDLFFBQVEsQ0FBQzs2QkFDWixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7NkJBQzVELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ2hELE1BQU0sRUFBRSxHQUFvQixHQUFLLENBQUM7NEJBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQy9CLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2xCLEVBQUUsQ0FBQyxRQUFTO3FDQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29DQUNULEdBQUcsQ0FBQztvQ0FDSixJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2lDQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNQLEVBQUUsQ0FBQyxRQUFRLENBQ2QsQ0FBQzt3QkFDSixDQUFDLENBQUMsQ0FBQzt3QkFFTCxPQUFPLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO29CQUMvRCxDQUFDLENBQUMsQ0FBQztnQkFFTCxPQUFPLENBQUM7b0JBQ04sSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLEVBQUUsQ0FBQyxRQUFTOzZCQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUNULEdBQUcsQ0FBQzs0QkFDSixJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRO3lCQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNQLEVBQUUsQ0FBQyxRQUFRO2lCQUNkLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxFQUFFLENBQUEsQ0FBQztnQkFDTCxDQUFDLFNBQVMsQ0FBQztvQkFDVCx1RUFBdUU7b0JBQ3ZFLDREQUE0RDtvQkFDNUQsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0I7MEJBQzFDLGFBQWEsTUFBTSxVQUFVLFNBQVMsV0FBVyxZQUFZLFNBQVMsV0FBVyxFQUFFLENBQUM7b0JBQ3hGLENBQUMsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCOzBCQUM1QyxHQUFHLE1BQU0sSUFBSSxTQUFTLElBQUksWUFBWSxJQUFJLFdBQVcsRUFBRSxFQUFFLEtBQUssSUFBSSxFQUFFO3dCQUV0RSwyREFBMkQ7d0JBQzNELElBQUEsbUJBQUssRUFBQyxRQUFRLENBQUM7NkJBQ1osS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxDQUFDOzZCQUM1RCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFFbEUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsc0JBQXNCOzhCQUMvQyxhQUFhLE1BQU0sVUFBVSxTQUFTLFdBQVcsWUFBWSxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzNGLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBRW5DLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDUixvQ0FBb0M7b0JBQ3hCLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtpQkFDM0IsQ0FDRixDQUFDLENBQUM7Z0JBQ1QsMEJBQTBCO2dCQUNwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNFLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxFQUFFO2lCQUNmLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUU7UUFDSixPQUFPO1FBQ1Asc0JBQXNCO1FBQ3RCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi90eXBlcy9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBjb3VudHlfc3VtbWFyeSA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgIH0sXG4gICAgbGltaXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgcGFnZToge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgc2tpcENhY2hlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIHsgZ2VvaWRfY28sIGxpbWl0LCBvZmZzZXQsIHBhZ2UsIHNraXBDYWNoZSB9OiB7XG4gICAgICBnZW9pZF9jbzogc3RyaW5nW107XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7XG4gICAgICBkYXRhU291cmNlczoge1xuICAgICAgICByZXN0QXBpXG4gICAgICB9LFxuICAgICAgcmVkaXNDbGllbnRcbiAgICB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAxMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0X3VyaSA9IGAke3Jlc3RBcGkuYmFzZVVSTH0vYmNhdC9jb3VudHlfc3VtbWFyeSR7XG4gICAgICAoZ2VvaWRzID09PSBcImFsbFwiKSA/IFxuICAgICAgICBcIj9saW1pdD0wXCIgOiBcbiAgICAgICAgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWBcbiAgICB9YDtcblxuICAgIC8vIHJldHVybiBhd2FpdCBnZW9pZF9jby5yZWR1Y2UoXG4gICAgLy8gICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IChcbiAgICAgIChhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJRdWVyeSByZXN0QXBpOiBcIiwgcmVzdF91cmkpO1xuXG4gICAgICAgIC8vIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgIGNvbnN0IHJlczogYW55ID0gKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmMgPSAoc2tpcENhY2hlKVxuICAgICAgICAgICAgICA/IGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvY291bnR5X3N1bW1hcnk/bGltaXQ9MGApXG4gICAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgY291bnR5X3N1bW1hcnktMGAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuICAgICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRjID0gKDxhbnk+KDxSZXNwb25zZT5yZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZWF0dXJlQ29sbGVjdGlvbjogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKHRjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICg8QXJyYXk8YW55Pj50Yy5mZWF0dXJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGYucHJvcGVydGllcy5nZW9pZF9jb1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGMuZmVhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvY291bnR5X3N1bW1hcnk/bGltaXQ9MGApO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgIGZlYXR1cmVzOiAoZmMuaGFzT3duUHJvcGVydHkoXCJmZWF0dXJlc1wiKSkgP1xuICAgICAgICAgICAgICAgICg8QXJyYXk8YW55Pj5mYy5mZWF0dXJlcylcbiAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGYucHJvcGVydGllcy5nZW9pZF9jb1xuICAgICAgICAgICAgICAgICAgfSkpIDpcbiAgICAgICAgICAgICAgICBmYy5mZWF0dXJlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkoKTpcbiAgICAgICAgICAoc2tpcENhY2hlKVxuICAgICAgICAgICAgLy8gQFRPRE86IEZpeCB0aGlzIHNvIHRoYXQgd2Ugc2VuZCBpbmRpdmlkdWFsIHJlcXVlc3RzIGZvciAqZWFjaCogZ2VvaWRcbiAgICAgICAgICAgIC8vIGFuZCB0aGVuIG1lcmdlIHRoZSByZXN1bHRzIGludG8gc2luZ2xlIGZlYXR1cmUgY29sbGVjdGlvblxuICAgICAgICAgICAgPyBhd2FpdCByZXN0QXBpLmdldEl0ZW0oYC9iY2F0L2NvdW50eV9zdW1tYXJ5YFxuICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS1gXG4gICAgICAgICAgICAgICsgYCR7Z2VvaWRzfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcykpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXN0QXBpLmdldEl0ZW0oYC9iY2F0L2NvdW50eV9zdW1tYXJ5YFxuICAgICAgICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXM6IFwiLCBhd2FpdCByZXMpO1xuXG4gICAgICAgIHJldHVybiAoKHJlcykgP1xuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IHJlcy5mZWF0dXJlc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICkgOlxuICAgIC8vICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pKClcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIC8vICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgLy8gICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIC8vICAgfSlcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb3VudHlfc3VtbWFyeTtcbiJdfQ==