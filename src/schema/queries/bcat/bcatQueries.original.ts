/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLArgumentConfig, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import GeoJSON from '../../geojson';

// TODO: Remove after testing call to local Python REST API
import { fetch } from 'cross-fetch';

export const bcatQueries: any = {
  // auction_904_subsidy_awards_schema_vl_mvt: {
  //   type: [object]
  //
  // },
  auction_904_subsidy_awards_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: new GraphQLList(GraphQLString)!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string[]; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return await geoid_co.reduce(
        async (fc, geoid_co) => {
          const featureCollection = await fc;
          const res: any = skipCache
            ? await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`auction_904_subsidy_awards-${geoid_co}`, async () => {
                return await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`);
              });
          if (res) {
            return {
              ...featureCollection,
              features: featureCollection.features.concat(res.features),
            };
          } else {
            return featureCollection;
          }
        },
        Promise.resolve({
          type: 'FeatureCollection',
          features: [],
        })
      );
    },
  },
  auction_904_subsidy_awards_county_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`)
        : await redisClient.checkCache(`auction_904_subsidy_awards-${geoid_co}`, async () => {
            return await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson?geoid_co=${geoid_co}`);
          });
    },
  },
  broadband_unserved_blocks_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: new GraphQLList(GraphQLString)!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string[]; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return await geoid_co.reduce(
        async (fc, geoid_co) => {
          const featureCollection = await fc;
          const res: any = skipCache
            ? await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`broadband_unserved_blocks-${geoid_co}`, async () => {
                return await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`);
              });
          if (res) {
            return {
              ...featureCollection,
              features: featureCollection.features.concat(res.features),
            };
          } else {
            return featureCollection;
          }
        },
        Promise.resolve({
          type: 'FeatureCollection',
          features: [],
        })
      );
    },
  },
  broadband_unserved_blocks_county_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`)
        : await redisClient.checkCache(`broadband_unserved_blocks-${geoid_co}`, async () => {
            return await pythonApi.getItem(`bcat/broadband_unserved_blocks/geojson?geoid_co=${geoid_co}`);
          });
    },
  },
  county_broadband_farm_bill_eligibility_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      state_abbr: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { state_abbr, skipCache }: { state_abbr: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/county_broadband_farm_bill_eligibility/geojson?state_abbr=${state_abbr}`)
        : await redisClient.checkCache(`county_broadband_farm_bill_eligibility-${state_abbr}`, async () => {
            return await pythonApi.getItem(
              `bcat/county_broadband_farm_bill_eligibility/geojson?state_abbr=${state_abbr}`
            );
          });
    },
  },
  county_broadband_pending_rural_dev_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      state_abbr: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { state_abbr, skipCache }: { state_abbr: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/county_broadband_pending_rural_dev/geojson?state_abbr=${state_abbr}`)
        : await redisClient.checkCache(`county_broadband_pending_rural_dev-${state_abbr}`, async () => {
            return await pythonApi.getItem(`bcat/county_broadband_pending_rural_dev/geojson?state_abbr=${state_abbr}`);
          });
    },
  },
  county_ilecs_geo_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      state_abbr: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { state_abbr, skipCache }: { state_abbr: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/county_ilecs_geo/geojson?state_abbr=${state_abbr}`)
        : await redisClient.checkCache(`county_ilecs_geo-${state_abbr}`, async () => {
            return await pythonApi.getItem(`bcat/county_ilecs_geo/geojson?state_abbr=${state_abbr}`);
          });
    },
  },
  county_rural_dev_broadband_protected_borrowers_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      state_abbr: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { state_abbr, skipCache }: { state_abbr: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/county_rural_dev_broadband_protected_borrowers/geojson?state_abbr=${state_abbr}`)
        : await redisClient.checkCache(`county_rural_dev_broadband_protected_borrowers-${state_abbr}`, async () => {
            return await pythonApi.getItem(
              `bcat/county_rural_dev_broadband_protected_borrowers/geojson?state_abbr=${state_abbr}`
            );
          });
    },
  },
  county_summary_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: new GraphQLList(GraphQLString)!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string[]; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {

      return await geoid_co.reduce(
        async (fc, geoid_co) => {
          // TODO: Remove after testing call to local Python REST API
          console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
          fetch(`${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`)
            .catch((err) => console.log(err))
            .then((res) => console.log(res));

          const featureCollection = await fc;
          const res: any = skipCache
            ? await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`county_summary-${geoid_co}`, async () => {
                return await pythonApi.getItem(`bcat/county_summary/geojson?geoid_co=${geoid_co}`);
              });
          if (res) {
            return {
              ...featureCollection,
              features: featureCollection.features.concat(res.features),
            };
          } else {
            return featureCollection;
          }
        },
        Promise.resolve({
          type: 'FeatureCollection',
          features: [],
        })
      );
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
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      // TODO: Remove after testing call to local Python REST API
      console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`);
      fetch(`${pythonApi.baseURL}bcat/county_summary/geojson?geoid_co=${geoid_co}`)
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
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: new GraphQLList(GraphQLString)!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string[]; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return await geoid_co.reduce(
        async (fc, geoid_co) => {
          const featureCollection = await fc;
          const res: any = skipCache
            ? await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`fiber_cable_unserved_blocks-${geoid_co}`, async () => {
                return await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`);
              });
          if (res) {
            return {
              ...featureCollection,
              features: featureCollection.features.concat(res.features),
            };
          } else {
            return featureCollection;
          }
        },
        Promise.resolve({
          type: 'FeatureCollection',
          features: [],
        })
      );
    },
  },
  fiber_cable_unserved_blocks_county_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`)
        : await redisClient.checkCache(`fiber_cable_unserved_blocks-${geoid_co}`, async () => {
            return await pythonApi.getItem(`bcat/fiber_cable_unserved_blocks/geojson?geoid_co=${geoid_co}`);
          });
    },
  },
  incumbent_electric_providers_geo_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      state_abbr: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { state_abbr, skipCache }: { state_abbr: string; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/incumbent_electric_providers_geo/geojson?state_abbr=${state_abbr}`)
        : await redisClient.checkCache(`incumbent_electric_providers_geo-${state_abbr}`, async () => {
            return await pythonApi.getItem(`bcat/incumbent_electric_providers_geo/geojson?state_abbr=${state_abbr}`);
          });
    },
  },
  county_adjacency_crosswalk_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: new GraphQLList(GraphQLString)!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string[]; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return await geoid_co.reduce(
        async (fc, geoid_co) => {
          const featureCollection = await fc;
          const res: any = skipCache
            ? await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`)
            : await redisClient.checkCache(`county_adjacency_crosswalk-${geoid_co}`, async () => {
                return await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`);
              });
          if (res) {
            return {
              ...featureCollection,
              features: featureCollection.features.concat(res.features),
            };
          } else {
            return featureCollection;
          }
        },
        Promise.resolve({
          type: 'FeatureCollection',
          features: [],
        })
      );
    },
  },
  county_adjacency_crosswalk_county_geojson: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      geoid_co: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { geoid_co, skipCache }: { geoid_co: string[]; skipCache: boolean | undefined },
      { dataSources: { pythonApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`)
        : await redisClient.checkCache(`county_adjacency_crosswalk-${geoid_co}`, async () => {
            return await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${geoid_co}`);
          });
    },
  },
};

export default bcatQueries;
