"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcatQueries = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const graphql_1 = require("graphql");
const geojson_1 = require("../../types/geojson");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
exports.bcatQueries = {
    // auction_904_subsidy_awards_schema_vl_mvt: {
    //   type: [object]
    //
    // },
    auction_904_subsidy_awards_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return await geoid_co.reduce(async (fc, geoid_co) => {
                const featureCollection = await fc;
                const res = skipCache
                    ? await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`)
                    : await redisClient.checkCache(`auction_904_subsidy_awards-${geoid_co}`, async () => {
                        return await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`);
                    });
                if (res) {
                    return {
                        ...featureCollection,
                        features: featureCollection.features.concat(res.features),
                    };
                }
                else {
                    return featureCollection;
                }
            }, Promise.resolve({
                type: 'FeatureCollection',
                features: [],
            }));
        },
    },
    auction_904_subsidy_awards_county_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`)
                : await redisClient.checkCache(`auction_904_subsidy_awards-${geoid_co}`, async () => {
                    return await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`);
                });
        },
    },
    broadband_unserved_blocks_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return await geoid_co.reduce(async (fc, geoid_co) => {
                const featureCollection = await fc;
                const res = skipCache
                    ? await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`)
                    : await redisClient.checkCache(`broadband_unserved_blocks-${geoid_co}`, async () => {
                        return await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`);
                    });
                if (res) {
                    return {
                        ...featureCollection,
                        features: featureCollection.features.concat(res.features),
                    };
                }
                else {
                    return featureCollection;
                }
            }, Promise.resolve({
                type: 'FeatureCollection',
                features: [],
            }));
        },
    },
    broadband_unserved_blocks_county_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`)
                : await redisClient.checkCache(`broadband_unserved_blocks-${geoid_co}`, async () => {
                    return await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`);
                });
        },
    },
    county_broadband_farm_bill_eligibility_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            state_abbr: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { state_abbr, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/county_broadband_farm_bill_eligibility/geojson?state_abbr=${state_abbr}`)
                : await redisClient.checkCache(`county_broadband_farm_bill_eligibility-${state_abbr}`, async () => {
                    return await pythonApi.getItem(`bcat/county_broadband_farm_bill_eligibility/geojson?state_abbr=${state_abbr}`);
                });
        },
    },
    county_broadband_pending_rural_dev_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            state_abbr: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { state_abbr, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/county_broadband_pending_rural_dev/geojson?state_abbr=${state_abbr}`)
                : await redisClient.checkCache(`county_broadband_pending_rural_dev-${state_abbr}`, async () => {
                    return await pythonApi.getItem(`bcat/county_broadband_pending_rural_dev/geojson?state_abbr=${state_abbr}`);
                });
        },
    },
    county_ilecs_geo_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            state_abbr: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { state_abbr, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/county_ilecs_geo/geojson?state_abbr=${state_abbr}`)
                : await redisClient.checkCache(`county_ilecs_geo-${state_abbr}`, async () => {
                    return await pythonApi.getItem(`bcat/county_ilecs_geo/geojson?state_abbr=${state_abbr}`);
                });
        },
    },
    county_rural_dev_broadband_protected_borrowers_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            state_abbr: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { state_abbr, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/county_rural_dev_broadband_protected_borrowers/geojson?state_abbr=${state_abbr}`)
                : await redisClient.checkCache(`county_rural_dev_broadband_protected_borrowers-${state_abbr}`, async () => {
                    return await pythonApi.getItem(`bcat/county_rural_dev_broadband_protected_borrowers/geojson?state_abbr=${state_abbr}`);
                });
        },
    },
    county_summary_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return await geoid_co.reduce(async (fc, geoid_co) => {
                // TODO: Remove after testing call to local Python REST API
                console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
                (0, cross_fetch_1.fetch)(`${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`)
                    .catch((err) => console.log(err))
                    .then((res) => console.log(res));
                const featureCollection = await fc;
                const res = skipCache
                    ? await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`)
                    : await redisClient.checkCache(`county_summary-${geoid_co}`, async () => {
                        return await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`);
                    });
                if (res) {
                    return {
                        ...featureCollection,
                        features: featureCollection.features.concat(res.features),
                    };
                }
                else {
                    return featureCollection;
                }
            }, Promise.resolve({
                type: 'FeatureCollection',
                features: [],
            }));
        },
    },
    // county_summary_pages_geojson: {
    //   type: GeoJSON.FeatureCollectionObject,
    //   args: {
    //     geoid_co: {
    //       type: new GraphQLList(GraphQLString)!,
    //     },
    //     page: {
    //       type: new GraphQLInt,
    //     }
    //   },
    //   resolve: async (
    //     _: any,
    //     { geoid_co, page }: { geoid_co: string[]; page: number | undefined },
    //     { dataSources: { pythonApi } }: any,
    //     info: any
    //   ) => {
    //     return await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}&page=${page}`);
    //         if (res) {
    //           return {
    //             ...featureCollection,
    //             features: featureCollection.features.concat(res.features),
    //           };
    //         } else {
    //           return featureCollection;
    //         }
    //       },
    //       Promise.resolve({
    //         type: 'FeatureCollection',
    //         features: [],
    //       })
    //     );
    //   },
    // },
    county_summary_county_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            // TODO: Remove after testing call to local Python REST API
            console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
            (0, cross_fetch_1.fetch)(`${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`)
                .catch((err) => console.log(err))
                .then((res) => console.log(res));
            return skipCache
                ? await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`)
                : await redisClient.checkCache(`county_summary-${geoid_co}`, async () => {
                    return await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`);
                });
        },
    },
    fiber_cable_unserved_blocks_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return await geoid_co.reduce(async (fc, geoid_co) => {
                const featureCollection = await fc;
                const res = skipCache
                    ? await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`)
                    : await redisClient.checkCache(`fiber_cable_unserved_blocks-${geoid_co}`, async () => {
                        return await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`);
                    });
                if (res) {
                    return {
                        ...featureCollection,
                        features: featureCollection.features.concat(res.features),
                    };
                }
                else {
                    return featureCollection;
                }
            }, Promise.resolve({
                type: 'FeatureCollection',
                features: [],
            }));
        },
    },
    fiber_cable_unserved_blocks_county_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`)
                : await redisClient.checkCache(`fiber_cable_unserved_blocks-${geoid_co}`, async () => {
                    return await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`);
                });
        },
    },
    incumbent_electric_providers_geo_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            state_abbr: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { state_abbr, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/incumbent_electric_providers_geo/geojson?state_abbr=${state_abbr}`)
                : await redisClient.checkCache(`incumbent_electric_providers_geo-${state_abbr}`, async () => {
                    return await pythonApi.getItem(`bcat/incumbent_electric_providers_geo/geojson?state_abbr=${state_abbr}`);
                });
        },
    },
    county_adjacency_crosswalk_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return await geoid_co.reduce(async (fc, geoid_co) => {
                const featureCollection = await fc;
                const res = skipCache
                    ? await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`)
                    : await redisClient.checkCache(`county_adjacency_crosswalk-${geoid_co}`, async () => {
                        return await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`);
                    });
                if (res) {
                    return {
                        ...featureCollection,
                        features: featureCollection.features.concat(res.features),
                    };
                }
                else {
                    return featureCollection;
                }
            }, Promise.resolve({
                type: 'FeatureCollection',
                features: [],
            }));
        },
    },
    county_adjacency_crosswalk_county_geojson: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            geoid_co: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { geoid_co, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`)
                : await redisClient.checkCache(`county_adjacency_crosswalk-${geoid_co}`, async () => {
                    return await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`);
                });
        },
    },
};
exports.default = exports.bcatQueries;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNhdFF1ZXJpZXMub3JpZ2luYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvYmNhdC9iY2F0UXVlcmllcy5vcmlnaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFBNkQ7QUFDN0Qsc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCxxQ0FBd0c7QUFDeEcsaURBQTBDO0FBRTFDLDJEQUEyRDtBQUMzRCw2Q0FBb0M7QUFFdkIsUUFBQSxXQUFXLEdBQVE7SUFDOUIsOENBQThDO0lBQzlDLG1CQUFtQjtJQUNuQixFQUFFO0lBQ0YsS0FBSztJQUNMLGtDQUFrQyxFQUFFO1FBQ2xDLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtRQUNyQyxJQUFJLEVBQUU7WUFDSixRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLElBQUkscUJBQVcsQ0FBQyx1QkFBYSxDQUFFO2FBQ3RDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSx3QkFBYzthQUNyQjtTQUNGO1FBQ0QsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUEwRCxFQUMvRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUNoRCxJQUFTLEVBQ1QsRUFBRTtZQUNGLE9BQU8sTUFBTSxRQUFRLENBQUMsTUFBTSxDQUMxQixLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNyQixNQUFNLGlCQUFpQixHQUFHLE1BQU0sRUFBRSxDQUFDO2dCQUNuQyxNQUFNLEdBQUcsR0FBUSxTQUFTO29CQUN4QixDQUFDLENBQUMsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLG9EQUFvRCxRQUFRLEVBQUUsQ0FBQztvQkFDekYsQ0FBQyxDQUFDLE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsUUFBUSxFQUFFLEVBQUUs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UUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDakcsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsa0JBQWUsbUJBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IHsgR3JhcGhRTEFyZ3VtZW50Q29uZmlnLCBHcmFwaFFMQm9vbGVhbiwgR3JhcGhRTEludCwgR3JhcGhRTExpc3QsIEdyYXBoUUxTdHJpbmcgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBHZW9KU09OIGZyb20gJy4uLy4uL3R5cGVzL2dlb2pzb24nO1xuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBjb25zdCBiY2F0UXVlcmllczogYW55ID0ge1xuICAvLyBhdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkc19zY2hlbWFfdmxfbXZ0OiB7XG4gIC8vICAgdHlwZTogW29iamVjdF1cbiAgLy9cbiAgLy8gfSxcbiAgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgZ2VvaWRfY286IHtcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZ1tdOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAgICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgICAgY29uc3QgcmVzOiBhbnkgPSBza2lwQ2FjaGVcbiAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGF1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzLSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMuY29uY2F0KHJlcy5mZWF0dXJlcyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBhdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkc19jb3VudHlfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgZ2VvaWRfY286IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgZ2VvaWRfY28sIHNraXBDYWNoZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMtJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGJyb2FkYmFuZF91bnNlcnZlZF9ibG9ja3NfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgZ2VvaWRfY286IHtcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZ1tdOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAgICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgICAgY29uc3QgcmVzOiBhbnkgPSBza2lwQ2FjaGVcbiAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYnJvYWRiYW5kX3Vuc2VydmVkX2Jsb2Nrcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYnJvYWRiYW5kX3Vuc2VydmVkX2Jsb2Nrcy0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYnJvYWRiYW5kX3Vuc2VydmVkX2Jsb2Nrcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMuY29uY2F0KHJlcy5mZWF0dXJlcyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBicm9hZGJhbmRfdW5zZXJ2ZWRfYmxvY2tzX2NvdW50eV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9icm9hZGJhbmRfdW5zZXJ2ZWRfYmxvY2tzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGJyb2FkYmFuZF91bnNlcnZlZF9ibG9ja3MtJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYnJvYWRiYW5kX3Vuc2VydmVkX2Jsb2Nrcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgY291bnR5X2Jyb2FkYmFuZF9mYXJtX2JpbGxfZWxpZ2liaWxpdHlfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgc3RhdGVfYWJicjoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBzdGF0ZV9hYmJyLCBza2lwQ2FjaGUgfTogeyBzdGF0ZV9hYmJyOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X2Jyb2FkYmFuZF9mYXJtX2JpbGxfZWxpZ2liaWxpdHkvZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9icm9hZGJhbmRfZmFybV9iaWxsX2VsaWdpYmlsaXR5LSR7c3RhdGVfYWJicn1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oXG4gICAgICAgICAgICAgIGBiY2F0L2NvdW50eV9icm9hZGJhbmRfZmFybV9iaWxsX2VsaWdpYmlsaXR5L2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb3VudHlfYnJvYWRiYW5kX3BlbmRpbmdfcnVyYWxfZGV2X2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIHN0YXRlX2FiYnI6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgc3RhdGVfYWJiciwgc2tpcENhY2hlIH06IHsgc3RhdGVfYWJicjogc3RyaW5nOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9icm9hZGJhbmRfcGVuZGluZ19ydXJhbF9kZXYvZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9icm9hZGJhbmRfcGVuZGluZ19ydXJhbF9kZXYtJHtzdGF0ZV9hYmJyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYnJvYWRiYW5kX3BlbmRpbmdfcnVyYWxfZGV2L2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgY291bnR5X2lsZWNzX2dlb19nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBzdGF0ZV9hYmJyOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IHN0YXRlX2FiYnIsIHNraXBDYWNoZSB9OiB7IHN0YXRlX2FiYnI6IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfaWxlY3NfZ2VvL2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YClcbiAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfaWxlY3NfZ2VvLSR7c3RhdGVfYWJicn1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X2lsZWNzX2dlby9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGNvdW50eV9ydXJhbF9kZXZfYnJvYWRiYW5kX3Byb3RlY3RlZF9ib3Jyb3dlcnNfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgc3RhdGVfYWJicjoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBzdGF0ZV9hYmJyLCBza2lwQ2FjaGUgfTogeyBzdGF0ZV9hYmJyOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3J1cmFsX2Rldl9icm9hZGJhbmRfcHJvdGVjdGVkX2JvcnJvd2Vycy9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgY291bnR5X3J1cmFsX2Rldl9icm9hZGJhbmRfcHJvdGVjdGVkX2JvcnJvd2Vycy0ke3N0YXRlX2FiYnJ9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKFxuICAgICAgICAgICAgICBgYmNhdC9jb3VudHlfcnVyYWxfZGV2X2Jyb2FkYmFuZF9wcm90ZWN0ZWRfYm9ycm93ZXJzL2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb3VudHlfc3VtbWFyeV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nW107IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG5cbiAgICAgIHJldHVybiBhd2FpdCBnZW9pZF9jby5yZWR1Y2UoXG4gICAgICAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuICAgICAgICAgIGNvbnNvbGUubG9nKGBRdWVyeSBweXRob25BcGk6ICR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgZmV0Y2goYCR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2cocmVzKSk7XG5cbiAgICAgICAgICBjb25zdCBmZWF0dXJlQ29sbGVjdGlvbiA9IGF3YWl0IGZjO1xuICAgICAgICAgIGNvbnN0IHJlczogYW55ID0gc2tpcENhY2hlXG4gICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmNvbmNhdChyZXMuZmVhdHVyZXMpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgLy8gY291bnR5X3N1bW1hcnlfcGFnZXNfZ2VvanNvbjoge1xuICAvLyAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gIC8vICAgYXJnczoge1xuICAvLyAgICAgZ2VvaWRfY286IHtcbiAgLy8gICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgLy8gICAgIH0sXG4gIC8vICAgICBwYWdlOiB7XG4gIC8vICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMSW50LFxuICAvLyAgICAgfVxuICAvLyAgIH0sXG4gIC8vICAgcmVzb2x2ZTogYXN5bmMgKFxuICAvLyAgICAgXzogYW55LFxuICAvLyAgICAgeyBnZW9pZF9jbywgcGFnZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmdbXTsgcGFnZTogbnVtYmVyIHwgdW5kZWZpbmVkIH0sXG4gIC8vICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9IH06IGFueSxcbiAgLy8gICAgIGluZm86IGFueVxuICAvLyAgICkgPT4ge1xuICAvLyAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb30mcGFnZT0ke3BhZ2V9YCk7XG4gIC8vICAgICAgICAgaWYgKHJlcykge1xuICAvLyAgICAgICAgICAgcmV0dXJuIHtcbiAgLy8gICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gIC8vICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgLy8gICAgICAgICAgIH07XG4gIC8vICAgICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gIC8vICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgLy8gICAgICAgICBmZWF0dXJlczogW10sXG4gIC8vICAgICAgIH0pXG4gIC8vICAgICApO1xuICAvLyAgIH0sXG4gIC8vIH0sXG4gIGNvdW50eV9zdW1tYXJ5X2NvdW50eV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICBjb25zb2xlLmxvZyhgUXVlcnkgcHl0aG9uQXBpOiAke3B5dGhvbkFwaS5iYXNlVVJMfWJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgZmV0Y2goYCR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpO1xuXG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgY291bnR5X3N1bW1hcnktJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGZpYmVyX2NhYmxlX3Vuc2VydmVkX2Jsb2Nrc19nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nW107IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgICAgICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgICBjb25zdCByZXM6IGFueSA9IHNraXBDYWNoZVxuICAgICAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9maWJlcl9jYWJsZV91bnNlcnZlZF9ibG9ja3MvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGZpYmVyX2NhYmxlX3Vuc2VydmVkX2Jsb2Nrcy0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvZmliZXJfY2FibGVfdW5zZXJ2ZWRfYmxvY2tzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIGZpYmVyX2NhYmxlX3Vuc2VydmVkX2Jsb2Nrc19jb3VudHlfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgZ2VvaWRfY286IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgZ2VvaWRfY28sIHNraXBDYWNoZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvZmliZXJfY2FibGVfdW5zZXJ2ZWRfYmxvY2tzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGZpYmVyX2NhYmxlX3Vuc2VydmVkX2Jsb2Nrcy0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9maWJlcl9jYWJsZV91bnNlcnZlZF9ibG9ja3MvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGluY3VtYmVudF9lbGVjdHJpY19wcm92aWRlcnNfZ2VvX2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIHN0YXRlX2FiYnI6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgc3RhdGVfYWJiciwgc2tpcENhY2hlIH06IHsgc3RhdGVfYWJicjogc3RyaW5nOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2luY3VtYmVudF9lbGVjdHJpY19wcm92aWRlcnNfZ2VvL2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YClcbiAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBpbmN1bWJlbnRfZWxlY3RyaWNfcHJvdmlkZXJzX2dlby0ke3N0YXRlX2FiYnJ9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2luY3VtYmVudF9lbGVjdHJpY19wcm92aWRlcnNfZ2VvL2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgY291bnR5X2FkamFjZW5jeV9jcm9zc3dhbGtfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgZ2VvaWRfY286IHtcbiAgICAgICAgdHlwZTogbmV3IEdyYXBoUUxMaXN0KEdyYXBoUUxTdHJpbmcpISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZ1tdOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAgICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgICAgY29uc3QgcmVzOiBhbnkgPSBza2lwQ2FjaGVcbiAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X2FkamFjZW5jeV9jcm9zc3dhbGsvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrLSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsay9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMuY29uY2F0KHJlcy5mZWF0dXJlcyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICBjb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsa19jb3VudHlfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgZ2VvaWRfY286IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgZ2VvaWRfY28sIHNraXBDYWNoZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmdbXTsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsay9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsay0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsay9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJjYXRRdWVyaWVzO1xuIl19