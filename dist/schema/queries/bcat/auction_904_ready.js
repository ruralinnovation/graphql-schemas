"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const auction_904_ready = {
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
        const rest_uri = `${pythonApi.baseURL}bcat/auction_904_ready${(geoids === "all") ?
            `?limit=${page_size}&offset=${count_offset}&page=${page_number}` :
            `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`}`;
        // return await geoid_co.reduce(
        //   async (fc, geoid_co) => {
        return await ((async () => {
            console.log("Query pythonApi: ", rest_uri);
            //     const featureCollection = await fc;
            const res = (geoids === "all") ? await (async () => {
                const fc = (skipCache)
                    ? await pythonApi.getItem(`bcat/auction_904_ready?limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_ready-`
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
                        return await pythonApi.getItem(`bcat/auction_904_ready?limit=${page_size}&offset=${count_offset}&page=${page_number}`);
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
                    ? await pythonApi.getItem(`bcat/auction_904_ready`
                        + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_ready-`
                        + `${geoids}-${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => console.log("Test Python REST response: ", res));
                        return await pythonApi.getItem(`bcat/auction_904_ready`
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
exports.default = auction_904_ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfcmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zY2hlbWEvcXVlcmllcy9iY2F0L2F1Y3Rpb25fOTA0X3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQW9DO0FBQ3BDLHVDQUFzRjtBQUV0RiwyREFBMkQ7QUFDM0QsNkNBQW9DO0FBRXBDLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsSUFBSSxFQUFFLGlCQUFPLENBQUMsdUJBQXVCO0lBQ3JDLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxJQUFJLGtCQUFXLENBQUMsb0JBQWEsQ0FBRTtTQUN0QztRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxpQkFBVTtTQUNqQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxpQkFBVTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxpQkFBVTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxxQkFBYztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQU16QyxFQUNELEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFPLEVBQ2hELElBQVMsRUFDVCxFQUFFO1FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEtBQUss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LENBQUMsQ0FBQztvQkFDM0YsQ0FBQyxDQUFDLENBQUM7WUFFUCxtQ0FBbUM7WUFFbkMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNSLG9DQUFvQztvQkFDeEIsTUFBTSxFQUFFLG1CQUFtQjtvQkFDM0IsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2lCQUMzQixDQUNGLENBQUMsQ0FBQztnQkFDVCwwQkFBMEI7Z0JBQ3BCLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FDbkI7b0JBQ0UsTUFBTSxFQUFFLG1CQUFtQjtvQkFDM0IsVUFBVSxFQUFFLEVBQUU7aUJBQ2YsQ0FDRixDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsRUFBRTtRQUNKLE9BQU87UUFDUCxzQkFBc0I7UUFDdEIsaUNBQWlDO1FBQ2pDLG9CQUFvQjtRQUNwQixPQUFPO1NBQ1IsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2VvSlNPTiBmcm9tIFwiLi4vLi4vZ2VvanNvblwiO1xuaW1wb3J0IHsgR3JhcGhRTEJvb2xlYW4sIEdyYXBoUUxJbnQsIEdyYXBoUUxMaXN0LCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcblxuY29uc3QgYXVjdGlvbl85MDRfcmVhZHkgPSB7XG4gIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gIGFyZ3M6IHtcbiAgICBnZW9pZF9jbzoge1xuICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgICB9LFxuICAgIGxpbWl0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHNraXBDYWNoZToge1xuICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICB7IGdlb2lkX2NvLCBsaW1pdCwgb2Zmc2V0LCBwYWdlLCBza2lwQ2FjaGUgfToge1xuICAgICAgZ2VvaWRfY286IHN0cmluZ1tdO1xuICAgICAgbGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIG9mZnNldDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgcGFnZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgIGluZm86IGFueVxuICApID0+IHtcblxuICAgIGNvbnN0IGdlb2lkcyA9ICh0eXBlb2YgZ2VvaWRfY28gIT09ICd1bmRlZmluZWQnICYmIGdlb2lkX2NvICE9PSBudWxsICYmIGdlb2lkX2NvLmxlbmd0aCA+IDApID9cbiAgICAgIGdlb2lkX2NvLm1hcChjID0+IGMudG9TdHJpbmcoKSkuam9pbihcIixcIikgOlxuICAgICAgXCJhbGxcIjtcblxuICAgIGNvbnN0IHBhZ2Vfc2l6ZSA9ICh0eXBlb2YgbGltaXQgIT09ICd1bmRlZmluZWQnICYmIGxpbWl0ID09PSBsaW1pdCkgP1xuICAgICAgbGltaXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0X3VyaSA9IGAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvYXVjdGlvbl85MDRfcmVhZHkke1xuICAgICAgKGdlb2lkcyA9PT0gXCJhbGxcIikgP1xuICAgICAgICBgP2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gIDogXG4gICAgICAgIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gXG4gICAgfWA7XG5cbiAgICAvLyByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgIC8vICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgIHJldHVybiBhd2FpdCAoXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUXVlcnkgcHl0aG9uQXBpOiBcIiwgcmVzdF91cmkpO1xuXG4gICAgICAgIC8vICAgICBjb25zdCBmZWF0dXJlQ29sbGVjdGlvbiA9IGF3YWl0IGZjO1xuICAgICAgICBjb25zdCByZXM6IGFueSA9IChnZW9pZHMgPT09IFwiYWxsXCIpID8gYXdhaXQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZjID0gKHNraXBDYWNoZSlcbiAgICAgICAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9yZWFkeT9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9yZWFkeS1gXG4gICAgICAgICAgICAgICAgKyBgJHtwYWdlX3NpemV9LSR7Y291bnRfb2Zmc2V0fS0ke3BhZ2VfbnVtYmVyfWAsIGFzeW5jICgpID0+IHtcblxuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgICBmZXRjaChyZXN0X3VyaSlcbiAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgcmVzcG9uc2U6IFwiLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YyA9ICg8YW55Pig8UmVzcG9uc2U+cmVzKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmVhdHVyZUNvbGxlY3Rpb246IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICh0Yy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAoPEFycmF5PGFueT4+dGMuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmLnByb3BlcnRpZXMuZ2VvaWRfY29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRjLmZlYXR1cmVzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9yZWFkeT9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IChmYy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmZjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgIGZjLmZlYXR1cmVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSgpOlxuICAgICAgICAgIChza2lwQ2FjaGUpXG4gICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3JlYWR5YFxuICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9yZWFkeS1gXG4gICAgICAgICAgICAgICsgYCR7Z2VvaWRzfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcykpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9yZWFkeWBcbiAgICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzOiBcIiwgYXdhaXQgcmVzKTtcblxuICAgICAgICByZXR1cm4gKChyZXMpID9cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiByZXMuZmVhdHVyZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApIDpcbiAgICAvLyAgICAgICBmZWF0dXJlQ29sbGVjdGlvblxuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KSgpXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAvLyAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIC8vICAgICBmZWF0dXJlczogW10sXG4gICAgICAvLyAgIH0pXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXVjdGlvbl85MDRfcmVhZHk7XG4iXX0=