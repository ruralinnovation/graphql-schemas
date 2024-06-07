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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfYXV0aG9yaXplZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zY2hlbWEvcXVlcmllcy9iY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBb0M7QUFDcEMsdUNBQXNGO0FBRXRGLDJEQUEyRDtBQUMzRCw2Q0FBb0M7QUFFcEMsTUFBTSxzQkFBc0IsR0FBRztJQUM3QixJQUFJLEVBQUUsaUJBQU8sQ0FBQyx1QkFBdUI7SUFDckMsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLElBQUksa0JBQVcsQ0FBQyxvQkFBYSxDQUFFO1NBQ3RDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLHFCQUFjO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBTXpDLEVBQ0QsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQU8sRUFDaEQsSUFBUyxFQUNULEVBQUU7UUFFRixNQUFNLE1BQU0sR0FBRyxDQUFDLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFD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QVMsV0FBVyxZQUFZLFNBQVMsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDM0YsQ0FBQyxDQUFDLENBQUM7WUFFUCxtQ0FBbUM7WUFFbkMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQ25CO29CQUNSLG9DQUFvQztvQkFDeEIsTUFBTSxFQUFFLG1CQUFtQjtvQkFDM0IsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2lCQUMzQixDQUNGLENBQUMsQ0FBQztnQkFDVCwwQkFBMEI7Z0JBQ3BCLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FDbkI7b0JBQ0UsTUFBTSxFQUFFLG1CQUFtQjtvQkFDM0IsVUFBVSxFQUFFLEVBQUU7aUJBQ2YsQ0FDRixDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsRUFBRTtRQUNKLE9BQU87UUFDUCxzQkFBc0I7UUFDdEIsaUNBQWlDO1FBQ2pDLG9CQUFvQjtRQUNwQixPQUFPO1NBQ1IsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsc0JBQXNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2VvSlNPTiBmcm9tIFwiLi4vLi4vZ2VvanNvblwiO1xuaW1wb3J0IHsgR3JhcGhRTEJvb2xlYW4sIEdyYXBoUUxJbnQsIEdyYXBoUUxMaXN0LCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcblxuY29uc3QgYXVjdGlvbl85MDRfYXV0aG9yaXplZCA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgIH0sXG4gICAgbGltaXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgcGFnZToge1xuICAgICAgdHlwZTogR3JhcGhRTEludFxuICAgIH0sXG4gICAgc2tpcENhY2hlOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIHsgZ2VvaWRfY28sIGxpbWl0LCBvZmZzZXQsIHBhZ2UsIHNraXBDYWNoZSB9OiB7XG4gICAgICBnZW9pZF9jbzogc3RyaW5nW107XG4gICAgICBsaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgb2Zmc2V0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4ge1xuXG4gICAgY29uc3QgZ2VvaWRzID0gKHR5cGVvZiBnZW9pZF9jbyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2VvaWRfY28gIT09IG51bGwgJiYgZ2VvaWRfY28ubGVuZ3RoID4gMCkgP1xuICAgICAgZ2VvaWRfY28ubWFwKGMgPT4gYy50b1N0cmluZygpKS5qb2luKFwiLFwiKSA6XG4gICAgICBcImFsbFwiO1xuXG4gICAgY29uc3QgcGFnZV9zaXplID0gKHR5cGVvZiBsaW1pdCAhPT0gJ3VuZGVmaW5lZCcgJiYgbGltaXQgPT09IGxpbWl0KSA/XG4gICAgICBsaW1pdCA6XG4gICAgICAwO1xuXG4gICAgY29uc3QgY291bnRfb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCA9PT0gb2Zmc2V0KSA/XG4gICAgICBvZmZzZXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IHBhZ2VfbnVtYmVyID0gKHR5cGVvZiBwYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYWdlID09PSBwYWdlKSA/XG4gICAgICBwYWdlIDpcbiAgICAgIDA7XG5cbiAgICBpZiAoISFza2lwQ2FjaGUgJiYgdHlwZW9mIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIERpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVwiKVxuICAgICAgcmVkaXNDbGllbnQuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3RfdXJpID0gYCR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkJHtcbiAgICAgIChnZW9pZHMgPT09IFwiYWxsXCIpID9cbiAgICAgICAgYD9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCA6IFxuICAgICAgICBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YFxuICAgIH1gO1xuXG4gICAgLy8gcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAvLyAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICByZXR1cm4gYXdhaXQgKFxuICAgICAgKGFzeW5jICgpID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ5IHB5dGhvbkFwaTogXCIsIHJlc3RfdXJpKTtcblxuICAgICAgICAvLyAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgY29uc3QgcmVzOiBhbnkgPSAoZ2VvaWRzID09PSBcImFsbFwiKSA/IGF3YWl0IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmYyA9IChza2lwQ2FjaGUpXG4gICAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfYXV0aG9yaXplZD9saW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9hdXRob3JpemVkLWBcbiAgICAgICAgICAgICAgICArIGAke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuXG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuICAgICAgICAgICAgICAgIGZldGNoKHJlc3RfdXJpKVxuICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRjID0gKDxhbnk+KDxSZXNwb25zZT5yZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZWF0dXJlQ29sbGVjdGlvbjogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgKHRjLmhhc093blByb3BlcnR5KFwiZmVhdHVyZXNcIikpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICg8QXJyYXk8YW55Pj50Yy5mZWF0dXJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGYucHJvcGVydGllcy5nZW9pZF9jb1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGMuZmVhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWQ/bGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgIGZlYXR1cmVzOiAoZmMuaGFzT3duUHJvcGVydHkoXCJmZWF0dXJlc1wiKSkgP1xuICAgICAgICAgICAgICAgICg8QXJyYXk8YW55Pj5mYy5mZWF0dXJlcylcbiAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGYucHJvcGVydGllcy5nZW9pZF9jb1xuICAgICAgICAgICAgICAgICAgfSkpIDpcbiAgICAgICAgICAgICAgICBmYy5mZWF0dXJlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkoKTpcbiAgICAgICAgICAoc2tpcENhY2hlKVxuICAgICAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9hdXRob3JpemVkYFxuICAgICAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZHN9JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9hdXRob3JpemVkLWBcbiAgICAgICAgICAgICAgKyBgJHtnZW9pZHN9LSR7cGFnZV9zaXplfS0ke2NvdW50X29mZnNldH0tJHtwYWdlX251bWJlcn1gLCBhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgICAgICAgICAgZmV0Y2gocmVzdF91cmkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCBlcnJvcjogXCIsIGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIHJlc3BvbnNlOiBcIiwgcmVzKSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X2F1dGhvcml6ZWRgXG4gICAgICAgICAgICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRzfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlczogXCIsIGF3YWl0IHJlcyk7XG5cbiAgICAgICAgcmV0dXJuICgocmVzKSA/XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICAgIFwiZmVhdHVyZXNcIjogcmVzLmZlYXR1cmVzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSA6XG4gICAgLy8gICAgICAgZmVhdHVyZUNvbGxlY3Rpb25cbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidHlwZVwiOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgICBcImZlYXR1cmVzXCI6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSkoKVxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgLy8gICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAvLyAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgLy8gICB9KVxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGF1Y3Rpb25fOTA0X2F1dGhvcml6ZWQ7XG4iXX0=