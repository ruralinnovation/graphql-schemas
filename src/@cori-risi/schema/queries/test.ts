/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLBoolean, GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';
import GeoJSON from '../types/geojson';

export default {
  test: {
    type: GeoJSON.FeatureCollectionObject,
    args: {
      county: {
        type: GraphQLString!,
      },
      skipCache: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (
      _: any,
      { county, skipCache }: { county: string[]; skipCache: boolean | undefined },
      { dataSources: { restApi }, redisClient }: any,
      info: any
    ) => {
      return skipCache
        ? await restApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${county}`)
        : await redisClient.checkCache(`county_adjacency_crosswalk-${county}`, async () => {
            return await restApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${county}`);
          });
    },
  },
};
