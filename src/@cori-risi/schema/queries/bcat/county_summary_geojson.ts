import GeoJSON from "../../types/geojson";
import { GraphQLBoolean, GraphQLString } from "graphql/type";

// TODO: Remove after testing call to local Python REST API
import { fetch } from "cross-fetch";

const county_summary_geojson = {
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
    { dataSources: { restApi }, redisClient }: any,
    info: any
  ) => {

    if (typeof redisClient !== "undefined" && !!skipCache && typeof redisClient.disconnect === 'function') {
      // Disconnect from redis when ever skipCache == true
      console.log("Disconnect from redis when ever skipCache == true")
      redisClient.disconnect();
    }
    
    // TODO: Remove after testing call to local Python REST API
    console.log(`Query restApi: ${restApi.baseURL}/bcat/county_summary/geojson?geoid_co=${geoid_co}`);
    const test_req = fetch(`${restApi.baseURL}/bcat/county_summary/geojson?geoid_co=${geoid_co}`);

    test_req
      .catch((err) => console.log("Test Python REST error: ",err))
      .then((res) => console.log("Test Python REST response: ",res));

    const check_res = await test_req;

    console.log(test_req);

    return (typeof redisClient === "undefined" || !!skipCache)
      ? await restApi.getItem(`/bcat/county_summary/geojson?geoid_co=${geoid_co}`)
      : await redisClient.checkCache(`county_summary-${geoid_co}`, async () => {
        return await restApi.getItem(`/bcat/county_summary/geojson?geoid_co=${geoid_co}`);
      });
  },
};

export default county_summary_geojson;
