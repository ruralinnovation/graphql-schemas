"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../geojson");
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
        const rest_uri = `${pythonApi.baseURL}bcat/auction_904_authorized${(geoids === "all") ?
            `?limit=${page_size}&offset=${count_offset}&page=${page_number}` :
            `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`}`;
        // return await geoid_co.reduce(
        //   async (fc, geoid_co) => {
        return await ((async () => {
            console.log("Query pythonApi: ", rest_uri);
            //     const featureCollection = await fc;
            const res = (geoids === "all") ? await (async () => {
                const fc = (skipCache)
                    ? await pythonApi.getItem(`bcat/auction_904_authorized?limit=${page_size}&offset=${count_offset}&page=${page_number}`)
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
                        return await pythonApi.getItem(`bcat/auction_904_authorized?limit=${page_size}&offset=${count_offset}&page=${page_number}`);
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
                    ? await pythonApi.getItem(`bcat/auction_904_authorized`
                        + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_authorized-`
                        + `${geoids}-${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => console.log("Test Python REST response: ", res));
                        return await pythonApi.getItem(`bcat/auction_904_authorized`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NjaGVtYS9xdWVyaWVzL2JjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUNwQyx1Q0FBc0Y7QUFFdEYsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUNoRCxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZ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LFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzNGLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBRW5DLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDUixvQ0FBb0M7b0JBQ3hCLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtpQkFDM0IsQ0FDRixDQUFDLENBQUM7Z0JBQ1QsMEJBQTBCO2dCQUNwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNFLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxFQUFFO2lCQUNmLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUU7UUFDSixPQUFPO1FBQ1Asc0JBQXNCO1FBQ3RCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb0pTT04gZnJvbSBcIi4uLy4uL2dlb2pzb25cIjtcbmltcG9ydCB7IEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMSW50LCBHcmFwaFFMTGlzdCwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcblxuLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbmltcG9ydCB7IGZldGNoIH0gZnJvbSBcImNyb3NzLWZldGNoXCI7XG5cbmNvbnN0IGF1Y3Rpb25fOTA0X2F1dGhvcml6ZWQgPSB7XG4gIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gIGFyZ3M6IHtcbiAgICBnZW9pZF9jbzoge1xuICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgICB9LFxuICAgIGxpbWl0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHNraXBDYWNoZToge1xuICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICB7IGdlb2lkX2NvLCBsaW1pdCwgb2Zmc2V0LCBwYWdlLCBza2lwQ2FjaGUgfToge1xuICAgICAgZ2VvaWRfY286IHN0cmluZ1tdO1xuICAgICAgbGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIG9mZnNldDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgcGFnZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgIGluZm86IGFueVxuICApID0+IHtcblxuICAgIGNvbnN0IGdlb2lkcyA9ICh0eXBlb2YgZ2VvaWRfY28gIT09ICd1bmRlZmluZWQnICYmIGdlb2lkX2NvICE9PSBudWxsICYmIGdlb2lkX2NvLmxlbmd0aCA+IDApID9cbiAgICAgIGdlb2lkX2NvLm1hcChjID0+IGMudG9TdHJpbmcoKSkuam9pbihcIixcIikgOlxuICAgICAgXCJhbGxcIjtcblxuICAgIGNvbnN0IHBhZ2Vfc2l6ZSA9ICh0eXBlb2YgbGltaXQgIT09ICd1bmRlZmluZWQnICYmIGxpbWl0ID09PSBsaW1pdCkgP1xuICAgICAgbGltaXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IGNvdW50X29mZnNldCA9ICh0eXBlb2Ygb2Zmc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvZmZzZXQgPT09IG9mZnNldCkgP1xuICAgICAgb2Zmc2V0IDpcbiAgICAgIDA7XG5cbiAgICBjb25zdCBwYWdlX251bWJlciA9ICh0eXBlb2YgcGFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFnZSA9PT0gcGFnZSkgP1xuICAgICAgcGFnZSA6XG4gICAgICAwO1xuXG4gICAgaWYgKCEhc2tpcENhY2hlICYmIHR5cGVvZiByZWRpc0NsaWVudC5kaXNjb25uZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBEaXNjb25uZWN0IGZyb20gcmVkaXMgd2hlbiBldmVyIHNraXBDYWNoZSA9PSB0cnVlXG4gICAgICBjb25zb2xlLmxvZyhcIkRpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcIilcbiAgICAgIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN0X3VyaSA9IGAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZCR7XG4gICAgICAoZ2VvaWRzID09PSBcImFsbFwiKSA/XG4gICAgICAgIGA/bGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWAgOiBcbiAgICAgICAgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWBcbiAgICB9YDtcblxuICAgIC8vIHJldHVybiBhd2FpdCBnZW9pZF9jby5yZWR1Y2UoXG4gICAgLy8gICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IChcbiAgICAgIChhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJRdWVyeSBweXRob25BcGk6IFwiLCByZXN0X3VyaSk7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgIGNvbnN0IHJlczogYW55ID0gKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmMgPSAoc2tpcENhY2hlKVxuICAgICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWQ/bGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApXG4gICAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfYXV0aG9yaXplZC1gXG4gICAgICAgICAgICAgICAgKyBgJHtwYWdlX3NpemV9LSR7Y291bnRfb2Zmc2V0fS0ke3BhZ2VfbnVtYmVyfWAsIGFzeW5jICgpID0+IHtcblxuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgICBmZXRjaChyZXN0X3VyaSlcbiAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgcmVzcG9uc2U6IFwiLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YyA9ICg8YW55Pig8UmVzcG9uc2U+cmVzKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmVhdHVyZUNvbGxlY3Rpb246IFwiLFxuICAgICAgICAgICAgICAgICAgICAgICh0Yy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAoPEFycmF5PGFueT4+dGMuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmLnByb3BlcnRpZXMuZ2VvaWRfY29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRjLmZlYXR1cmVzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkP2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBmZWF0dXJlczogKGZjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAoPEFycmF5PGFueT4+ZmMuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmLnByb3BlcnRpZXMuZ2VvaWRfY29cbiAgICAgICAgICAgICAgICAgIH0pKSA6XG4gICAgICAgICAgICAgICAgZmMuZmVhdHVyZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKCk6XG4gICAgICAgICAgKHNraXBDYWNoZSlcbiAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZGBcbiAgICAgICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfYXV0aG9yaXplZC1gXG4gICAgICAgICAgICAgICsgYCR7Z2VvaWRzfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcIlRlc3QgUHl0aG9uIFJFU1QgZXJyb3I6IFwiLCBlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcykpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkYFxuICAgICAgICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXM6IFwiLCBhd2FpdCByZXMpO1xuXG4gICAgICAgIHJldHVybiAoKHJlcykgP1xuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IHJlcy5mZWF0dXJlc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICkgOlxuICAgIC8vICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pKClcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIC8vICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgLy8gICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIC8vICAgfSlcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhdWN0aW9uXzkwNF9hdXRob3JpemVkO1xuIl19