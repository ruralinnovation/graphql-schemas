"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../types/geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const auction_904_defaults = {
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
        const rest_uri = `${restApi.baseURL}/bcat/auction_904_defaults${(geoids === "all") ?
            `?limit=${page_size}&offset=${count_offset}&page=${page_number}` :
            `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`}`;
        // return await geoid_co.reduce(
        //   async (fc, geoid_co) => {
        return await ((async () => {
            console.log("Query restApi: ", rest_uri);
            //     const featureCollection = await fc;
            const res = (geoids === "all") ? await (async () => {
                const fc = (skipCache)
                    ? await restApi.getItem(`/bcat/auction_904_defaults?limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_defaults-`
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
                        return await restApi.getItem(`/bcat/auction_904_defaults?limit=${page_size}&offset=${count_offset}&page=${page_number}`);
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
                    ? await restApi.getItem(`/bcat/auction_904_defaults`
                        + `?geoid_co=${geoids}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
                    : await redisClient.checkCache(`auction_904_defaults-`
                        + `${geoids}-${page_size}-${count_offset}-${page_number}`, async () => {
                        // TODO: Remove after testing call to local Python REST API
                        (0, cross_fetch_1.fetch)(rest_uri)
                            .catch((err) => console.log("Test Python REST error: ", err))
                            .then((res) => console.log("Test Python REST response: ", res));
                        return await restApi.getItem(`/bcat/auction_904_defaults`
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
exports.default = auction_904_defaults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9iY2F0L2F1Y3Rpb25fOTA0X2RlZmF1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTBDO0FBQzFDLHVDQUFzRjtBQUV0RiwyREFBMkQ7QUFDM0QsNkNBQW9DO0FBRXBDLE1BQU0sb0JBQW9CLEdBQUc7SUFDM0IsSUFBSSxFQUFFLGlCQUFPLENBQUMsdUJBQXVCO0lBQ3JDLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxJQUFJLGtCQUFXLENBQUMsb0JBQWEsQ0FBRTtTQUN0QztRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxpQkFBVTtTQUNqQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxpQkFBVTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxpQkFBVTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxxQkFBYztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQU16QyxFQUNELEVBQUUsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFPLEVBQzlDLElBQVMsRUFDVCxFQUFFO1FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFH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QU0sVUFBVSxTQUFTLFdBQVcsWUFBWSxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzNGLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBRW5DLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDUixvQ0FBb0M7b0JBQ3hCLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUTtpQkFDM0IsQ0FDRixDQUFDLENBQUM7Z0JBQ1QsMEJBQTBCO2dCQUNwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNFLE1BQU0sRUFBRSxtQkFBbUI7b0JBQzNCLFVBQVUsRUFBRSxFQUFFO2lCQUNmLENBQ0YsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQUU7UUFDSixPQUFPO1FBQ1Asc0JBQXNCO1FBQ3RCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb0pTT04gZnJvbSBcIi4uLy4uL3R5cGVzL2dlb2pzb25cIjtcbmltcG9ydCB7IEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMSW50LCBHcmFwaFFMTGlzdCwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcblxuLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbmltcG9ydCB7IGZldGNoIH0gZnJvbSBcImNyb3NzLWZldGNoXCI7XG5cbmNvbnN0IGF1Y3Rpb25fOTA0X2RlZmF1bHRzID0ge1xuICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICBhcmdzOiB7XG4gICAgZ2VvaWRfY286IHtcbiAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSEsXG4gICAgfSxcbiAgICBsaW1pdDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBwYWdlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBza2lwQ2FjaGU6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgeyBnZW9pZF9jbywgbGltaXQsIG9mZnNldCwgcGFnZSwgc2tpcENhY2hlIH06IHtcbiAgICAgIGdlb2lkX2NvOiBzdHJpbmdbXTtcbiAgICAgIGxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBvZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHBhZ2U6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcmVzdEFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAwO1xuXG4gICAgY29uc3QgY291bnRfb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCA9PT0gb2Zmc2V0KSA/XG4gICAgICBvZmZzZXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IHBhZ2VfbnVtYmVyID0gKHR5cGVvZiBwYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYWdlID09PSBwYWdlKSA/XG4gICAgICBwYWdlIDpcbiAgICAgIDA7XG5cbiAgICBpZiAoISFza2lwQ2FjaGUgJiYgdHlwZW9mIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIERpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVwiKVxuICAgICAgcmVkaXNDbGllbnQuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RfdXJpID0gYCR7cmVzdEFwaS5iYXNlVVJMfS9iY2F0L2F1Y3Rpb25fOTA0X2RlZmF1bHRzJHtcbiAgICAgIChnZW9pZHMgPT09IFwiYWxsXCIpID9cbiAgICAgICAgYD9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCA6IFxuICAgICAgICBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YFxuICAgIH1gO1xuXG4gICAgLy8gcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAvLyAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICByZXR1cm4gYXdhaXQgKFxuICAgICAgKGFzeW5jICgpID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ5IHJlc3RBcGk6IFwiLCByZXN0X3VyaSk7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgIGNvbnN0IHJlczogYW55ID0gKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmMgPSAoc2tpcENhY2hlKVxuICAgICAgICAgICAgICA/IGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfZGVmYXVsdHM/bGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApXG4gICAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfZGVmYXVsdHMtYFxuICAgICAgICAgICAgICAgICsgYCR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIGVycm9yOiBcIiwgZXJyKSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGMgPSAoPGFueT4oPFJlc3BvbnNlPnJlcykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZlYXR1cmVDb2xsZWN0aW9uOiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAodGMuaGFzT3duUHJvcGVydHkoXCJmZWF0dXJlc1wiKSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PnRjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB0Yy5mZWF0dXJlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdEFwaS5nZXRJdGVtKGAvYmNhdC9hdWN0aW9uXzkwNF9kZWZhdWx0cz9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IChmYy5oYXNPd25Qcm9wZXJ0eShcImZlYXR1cmVzXCIpKSA/XG4gICAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmZjLmZlYXR1cmVzKVxuICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogZi5wcm9wZXJ0aWVzLmdlb2lkX2NvXG4gICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgIGZjLmZlYXR1cmVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSgpOlxuICAgICAgICAgIChza2lwQ2FjaGUpXG4gICAgICAgICAgICA/IGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfZGVmYXVsdHNgXG4gICAgICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGF1Y3Rpb25fOTA0X2RlZmF1bHRzLWBcbiAgICAgICAgICAgICAgKyBgJHtnZW9pZHN9LSR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3RBcGkuZ2V0SXRlbShgL2JjYXQvYXVjdGlvbl85MDRfZGVmYXVsdHNgXG4gICAgICAgICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlczogXCIsIGF3YWl0IHJlcyk7XG5cbiAgICAgICAgcmV0dXJuICgocmVzKSA/XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogcmVzLmZlYXR1cmVzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSA6XG4gICAgLy8gICAgICAgZmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSkoKVxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgLy8gICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAvLyAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgLy8gICB9KVxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGF1Y3Rpb25fOTA0X2RlZmF1bHRzO1xuIl19