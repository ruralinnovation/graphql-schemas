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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNhdFF1ZXJpZXMub3JpZ2luYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9iY2F0L2JjYXRRdWVyaWVzLm9yaWdpbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUE2RDtBQUM3RCxzREFBc0Q7QUFDdEQsdURBQXVEO0FBQ3ZELHFDQUF3RztBQUN4RyxpREFBMEM7QUFFMUMsMkRBQTJEO0FBQzNELDZDQUFvQztBQUV2QixRQUFBLFdBQVcsR0FBUTtJQUM5Qiw4Q0FBOEM7SUFDOUMsbUJBQW1CO0lBQ25CLEVBQUU7SUFDRixLQUFLO0lBQ0wsa0NBQWtDLEVBQUU7UUFDbEMsSUFBSSxFQUFFLGlCQUFPLENBQUMsdUJBQXVCO1FBQ3JDLElBQUksRUFBRTtZQUNKLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsSUFBSSxxQkFBVyxDQUFDLHVCQUFhLENBQUU7YUFDdEM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLHdCQUFjO2FBQ3JCO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQTBELEVBQy9FLEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsV0FBVyxFQUFPLEVBQ2hELElBQVMsRUFDVCxFQUFFO1lBQ0YsT0FBTyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQzFCLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3JCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sR0FBRyxHQUFRLFNBQVM7b0JBQ3hCLENBQUMsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0RBQW9ELFFBQVEsRUFBRSxDQUFDO29CQUN6RixDQUFDLENBQUMsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLDhCQUE4QixR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TyxDQUFDLG9EQUFvRCxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUM7S0FDRjtDQUNGLENBQUM7QUFFRixrQkFBZSxtQkFBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5pbXBvcnQgeyBHcmFwaFFMQXJndW1lbnRDb25maWcsIEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMSW50LCBHcmFwaFFMTGlzdCwgR3JhcGhRTFN0cmluZyB9IGZyb20gJ2dyYXBocWwnO1xuaW1wb3J0IEdlb0pTT04gZnJvbSAnLi4vLi4vdHlwZXMvZ2VvanNvbic7XG5cbi8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG5pbXBvcnQgeyBmZXRjaCB9IGZyb20gJ2Nyb3NzLWZldGNoJztcblxuZXhwb3J0IGNvbnN0IGJjYXRRdWVyaWVzOiBhbnkgPSB7XG4gIC8vIGF1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzX3NjaGVtYV92bF9tdnQ6IHtcbiAgLy8gICB0eXBlOiBbb2JqZWN0XVxuICAvL1xuICAvLyB9LFxuICBhdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkc19nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nW107IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgICAgICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgICBjb25zdCByZXM6IGFueSA9IHNraXBDYWNoZVxuICAgICAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMtJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIGF1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzX2NvdW50eV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBhdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgYnJvYWRiYW5kX3Vuc2VydmVkX2Jsb2Nrc19nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nW107IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgICAgICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgICBjb25zdCByZXM6IGFueSA9IHNraXBDYWNoZVxuICAgICAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9icm9hZGJhbmRfdW5zZXJ2ZWRfYmxvY2tzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBicm9hZGJhbmRfdW5zZXJ2ZWRfYmxvY2tzLSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9icm9hZGJhbmRfdW5zZXJ2ZWRfYmxvY2tzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIGJyb2FkYmFuZF91bnNlcnZlZF9ibG9ja3NfY291bnR5X2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIGdlb2lkX2NvOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2Jyb2FkYmFuZF91bnNlcnZlZF9ibG9ja3MvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYnJvYWRiYW5kX3Vuc2VydmVkX2Jsb2Nrcy0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9icm9hZGJhbmRfdW5zZXJ2ZWRfYmxvY2tzL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb3VudHlfYnJvYWRiYW5kX2Zhcm1fYmlsbF9lbGlnaWJpbGl0eV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBzdGF0ZV9hYmJyOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IHN0YXRlX2FiYnIsIHNraXBDYWNoZSB9OiB7IHN0YXRlX2FiYnI6IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYnJvYWRiYW5kX2Zhcm1fYmlsbF9lbGlnaWJpbGl0eS9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgY291bnR5X2Jyb2FkYmFuZF9mYXJtX2JpbGxfZWxpZ2liaWxpdHktJHtzdGF0ZV9hYmJyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShcbiAgICAgICAgICAgICAgYGJjYXQvY291bnR5X2Jyb2FkYmFuZF9mYXJtX2JpbGxfZWxpZ2liaWxpdHkvZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGNvdW50eV9icm9hZGJhbmRfcGVuZGluZ19ydXJhbF9kZXZfZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgc3RhdGVfYWJicjoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBzdGF0ZV9hYmJyLCBza2lwQ2FjaGUgfTogeyBzdGF0ZV9hYmJyOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X2Jyb2FkYmFuZF9wZW5kaW5nX3J1cmFsX2Rldi9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgY291bnR5X2Jyb2FkYmFuZF9wZW5kaW5nX3J1cmFsX2Rldi0ke3N0YXRlX2FiYnJ9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9icm9hZGJhbmRfcGVuZGluZ19ydXJhbF9kZXYvZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb3VudHlfaWxlY3NfZ2VvX2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIHN0YXRlX2FiYnI6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgc3RhdGVfYWJiciwgc2tpcENhY2hlIH06IHsgc3RhdGVfYWJicjogc3RyaW5nOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9pbGVjc19nZW8vZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9pbGVjc19nZW8tJHtzdGF0ZV9hYmJyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfaWxlY3NfZ2VvL2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgY291bnR5X3J1cmFsX2Rldl9icm9hZGJhbmRfcHJvdGVjdGVkX2JvcnJvd2Vyc19nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBzdGF0ZV9hYmJyOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IHN0YXRlX2FiYnIsIHNraXBDYWNoZSB9OiB7IHN0YXRlX2FiYnI6IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfcnVyYWxfZGV2X2Jyb2FkYmFuZF9wcm90ZWN0ZWRfYm9ycm93ZXJzL2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YClcbiAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfcnVyYWxfZGV2X2Jyb2FkYmFuZF9wcm90ZWN0ZWRfYm9ycm93ZXJzLSR7c3RhdGVfYWJicn1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oXG4gICAgICAgICAgICAgIGBiY2F0L2NvdW50eV9ydXJhbF9kZXZfYnJvYWRiYW5kX3Byb3RlY3RlZF9ib3Jyb3dlcnMvZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4gIGNvdW50eV9zdW1tYXJ5X2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIGdlb2lkX2NvOiB7XG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgZ2VvaWRfY28sIHNraXBDYWNoZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmdbXTsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcblxuICAgICAgcmV0dXJuIGF3YWl0IGdlb2lkX2NvLnJlZHVjZShcbiAgICAgICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgICAgICAgY29uc29sZS5sb2coYFF1ZXJ5IHB5dGhvbkFwaTogJHtweXRob25BcGkuYmFzZVVSTH1iY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICBmZXRjaChgJHtweXRob25BcGkuYmFzZVVSTH1iY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhyZXMpKTtcblxuICAgICAgICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAgICAgY29uc3QgcmVzOiBhbnkgPSBza2lwQ2FjaGVcbiAgICAgICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9zdW1tYXJ5LSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXMuY29uY2F0KHJlcy5mZWF0dXJlcyksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmVhdHVyZUNvbGxlY3Rpb247XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICAvLyBjb3VudHlfc3VtbWFyeV9wYWdlc19nZW9qc29uOiB7XG4gIC8vICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgLy8gICBhcmdzOiB7XG4gIC8vICAgICBnZW9pZF9jbzoge1xuICAvLyAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAvLyAgICAgfSxcbiAgLy8gICAgIHBhZ2U6IHtcbiAgLy8gICAgICAgdHlwZTogbmV3IEdyYXBoUUxJbnQsXG4gIC8vICAgICB9XG4gIC8vICAgfSxcbiAgLy8gICByZXNvbHZlOiBhc3luYyAoXG4gIC8vICAgICBfOiBhbnksXG4gIC8vICAgICB7IGdlb2lkX2NvLCBwYWdlIH06IHsgZ2VvaWRfY286IHN0cmluZ1tdOyBwYWdlOiBudW1iZXIgfCB1bmRlZmluZWQgfSxcbiAgLy8gICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0gfTogYW55LFxuICAvLyAgICAgaW5mbzogYW55XG4gIC8vICAgKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X3N1bW1hcnkvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfSZwYWdlPSR7cGFnZX1gKTtcbiAgLy8gICAgICAgICBpZiAocmVzKSB7XG4gIC8vICAgICAgICAgICByZXR1cm4ge1xuICAvLyAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgLy8gICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmNvbmNhdChyZXMuZmVhdHVyZXMpLFxuICAvLyAgICAgICAgICAgfTtcbiAgLy8gICAgICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfSxcbiAgLy8gICAgICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgLy8gICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAvLyAgICAgICAgIGZlYXR1cmVzOiBbXSxcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICk7XG4gIC8vICAgfSxcbiAgLy8gfSxcbiAgY291bnR5X3N1bW1hcnlfY291bnR5X2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIGdlb2lkX2NvOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgLy8gVE9ETzogUmVtb3ZlIGFmdGVyIHRlc3RpbmcgY2FsbCB0byBsb2NhbCBQeXRob24gUkVTVCBBUElcbiAgICAgIGNvbnNvbGUubG9nKGBRdWVyeSBweXRob25BcGk6ICR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICBmZXRjaChgJHtweXRob25BcGkuYmFzZVVSTH1iY2F0L2NvdW50eV9zdW1tYXJ5L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2cocmVzKSk7XG5cbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGBjb3VudHlfc3VtbWFyeS0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfc3VtbWFyeS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgZmliZXJfY2FibGVfdW5zZXJ2ZWRfYmxvY2tzX2dlb2pzb246IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIGdlb2lkX2NvOiB7XG4gICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSEsXG4gICAgICB9LFxuICAgICAgc2tpcENhY2hlOiB7XG4gICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIF86IGFueSxcbiAgICAgIHsgZ2VvaWRfY28sIHNraXBDYWNoZSB9OiB7IGdlb2lkX2NvOiBzdHJpbmdbXTsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBnZW9pZF9jby5yZWR1Y2UoXG4gICAgICAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICAgICAgICBjb25zdCBmZWF0dXJlQ29sbGVjdGlvbiA9IGF3YWl0IGZjO1xuICAgICAgICAgIGNvbnN0IHJlczogYW55ID0gc2tpcENhY2hlXG4gICAgICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2ZpYmVyX2NhYmxlX3Vuc2VydmVkX2Jsb2Nrcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgZmliZXJfY2FibGVfdW5zZXJ2ZWRfYmxvY2tzLSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9maWJlcl9jYWJsZV91bnNlcnZlZF9ibG9ja3MvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmNvbmNhdChyZXMuZmVhdHVyZXMpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAgZmliZXJfY2FibGVfdW5zZXJ2ZWRfYmxvY2tzX2NvdW50eV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZzsgc2tpcENhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkIH0sXG4gICAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9LCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICBpbmZvOiBhbnlcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9maWJlcl9jYWJsZV91bnNlcnZlZF9ibG9ja3MvZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApXG4gICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgZmliZXJfY2FibGVfdW5zZXJ2ZWRfYmxvY2tzLSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2ZpYmVyX2NhYmxlX3Vuc2VydmVkX2Jsb2Nrcy9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbiAgaW5jdW1iZW50X2VsZWN0cmljX3Byb3ZpZGVyc19nZW9fZ2VvanNvbjoge1xuICAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgYXJnczoge1xuICAgICAgc3RhdGVfYWJicjoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBzdGF0ZV9hYmJyLCBza2lwQ2FjaGUgfTogeyBzdGF0ZV9hYmJyOiBzdHJpbmc7IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvaW5jdW1iZW50X2VsZWN0cmljX3Byb3ZpZGVyc19nZW8vZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGluY3VtYmVudF9lbGVjdHJpY19wcm92aWRlcnNfZ2VvLSR7c3RhdGVfYWJicn1gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvaW5jdW1iZW50X2VsZWN0cmljX3Byb3ZpZGVyc19nZW8vZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxuICBjb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsa19nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZykhLFxuICAgICAgfSxcbiAgICAgIHNraXBDYWNoZToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICB7IGdlb2lkX2NvLCBza2lwQ2FjaGUgfTogeyBnZW9pZF9jbzogc3RyaW5nW107IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2VvaWRfY28ucmVkdWNlKFxuICAgICAgICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgICAgICBjb25zdCByZXM6IGFueSA9IHNraXBDYWNoZVxuICAgICAgICAgICAgPyBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsay9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YClcbiAgICAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgY291bnR5X2FkamFjZW5jeV9jcm9zc3dhbGstJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0sXG4gIH0sXG4gIGNvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrX2NvdW50eV9nZW9qc29uOiB7XG4gICAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgICBhcmdzOiB7XG4gICAgICBnZW9pZF9jbzoge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBnZW9pZF9jbywgc2tpcENhY2hlIH06IHsgZ2VvaWRfY286IHN0cmluZ1tdOyBza2lwQ2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfSxcbiAgICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4ge1xuICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrLSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2NvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrL2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgICAgICB9KTtcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYmNhdFF1ZXJpZXM7XG4iXX0=