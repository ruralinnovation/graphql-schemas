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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfcmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvYmNhdC9hdWN0aW9uXzkwNF9yZWFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFvQztBQUNwQyx1Q0FBc0Y7QUFFdEYsMkRBQTJEO0FBQzNELDZDQUFvQztBQUVwQyxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtJQUNyQyxJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxrQkFBVyxDQUFDLG9CQUFhLENBQUU7U0FDdEM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQVU7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUscUJBQWM7U0FDckI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFNekMsRUFDRCxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUNoRCxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMz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QVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUMzRixDQUFDLENBQUMsQ0FBQztZQUVQLG1DQUFtQztZQUVuQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FDbkI7b0JBQ1Isb0NBQW9DO29CQUN4QixNQUFNLEVBQUUsbUJBQW1CO29CQUMzQixVQUFVLEVBQUUsR0FBRyxDQUFDLFFBQVE7aUJBQzNCLENBQ0YsQ0FBQyxDQUFDO2dCQUNULDBCQUEwQjtnQkFDcEIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUNuQjtvQkFDRSxNQUFNLEVBQUUsbUJBQW1CO29CQUMzQixVQUFVLEVBQUUsRUFBRTtpQkFDZixDQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUFFO1FBQ0osT0FBTztRQUNQLHNCQUFzQjtRQUN0QixpQ0FBaUM7UUFDakMsb0JBQW9CO1FBQ3BCLE9BQU87U0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHZW9KU09OIGZyb20gXCIuLi8uLi9nZW9qc29uXCI7XG5pbXBvcnQgeyBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gXCJjcm9zcy1mZXRjaFwiO1xuXG5jb25zdCBhdWN0aW9uXzkwNF9yZWFkeSA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgIH0sXG4gICAgbGltaXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgcGFnZToge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgc2tpcENhY2hlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIHsgZ2VvaWRfY28sIGxpbWl0LCBvZmZzZXQsIHBhZ2UsIHNraXBDYWNoZSB9OiB7XG4gICAgICBnZW9pZF9jbzogc3RyaW5nW107XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAwO1xuXG4gICAgY29uc3QgY291bnRfb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCA9PT0gb2Zmc2V0KSA/XG4gICAgICBvZmZzZXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IHBhZ2VfbnVtYmVyID0gKHR5cGVvZiBwYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYWdlID09PSBwYWdlKSA/XG4gICAgICBwYWdlIDpcbiAgICAgIDA7XG5cbiAgICBpZiAoISFza2lwQ2FjaGUgJiYgdHlwZW9mIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIERpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVwiKVxuICAgICAgcmVkaXNDbGllbnQuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RfdXJpID0gYCR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9hdWN0aW9uXzkwNF9yZWFkeSR7XG4gICAgICAoZ2VvaWRzID09PSBcImFsbFwiKSA/XG4gICAgICAgIGA/bGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWAgOiBcbiAgICAgICAgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWBcbiAgICB9YDtcblxuICAgIC8vIHJldHVybiBhd2FpdCBnZW9pZF9jby5yZWR1Y2UoXG4gICAgLy8gICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IChcbiAgICAgIChhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJRdWVyeSBweXRob25BcGk6IFwiLCByZXN0X3VyaSk7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgIGNvbnN0IHJlczogYW55ID0gKGdlb2lkcyA9PT0gXCJhbGxcIikgPyBhd2FpdCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmMgPSAoc2tpcENhY2hlKVxuICAgICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3JlYWR5P2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGF1Y3Rpb25fOTA0X3JlYWR5LWBcbiAgICAgICAgICAgICAgICArIGAke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuICAgICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRjID0gKDxhbnk+KDxSZXNwb25zZT5yZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZWF0dXJlQ29sbGVjdGlvbjogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKHRjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICg8QXJyYXk8YW55Pj50Yy5mZWF0dXJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGYucHJvcGVydGllcy5nZW9pZF9jb1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGMuZmVhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3JlYWR5P2xpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBmZWF0dXJlczogKGZjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAoPEFycmF5PGFueT4+ZmMuZmVhdHVyZXMpXG4gICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBmLnByb3BlcnRpZXMuZ2VvaWRfY29cbiAgICAgICAgICAgICAgICAgIH0pKSA6XG4gICAgICAgICAgICAgICAgZmMuZmVhdHVyZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pKCk6XG4gICAgICAgICAgKHNraXBDYWNoZSlcbiAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfcmVhZHlgXG4gICAgICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGF1Y3Rpb25fOTA0X3JlYWR5LWBcbiAgICAgICAgICAgICAgKyBgJHtnZW9pZHN9LSR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3JlYWR5YFxuICAgICAgICAgICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkc30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXM6IFwiLCBhd2FpdCByZXMpO1xuXG4gICAgICAgIHJldHVybiAoKHJlcykgP1xuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IHJlcy5mZWF0dXJlc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICkgOlxuICAgIC8vICAgICAgIGZlYXR1cmVDb2xsZWN0aW9uXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInR5cGVcIjogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgXCJmZWF0dXJlc1wiOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0pKClcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIC8vICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgLy8gICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIC8vICAgfSlcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhdWN0aW9uXzkwNF9yZWFkeTtcbiJdfQ==