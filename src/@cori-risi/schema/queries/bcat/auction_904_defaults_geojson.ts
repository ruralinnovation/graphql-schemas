import GeoJSON from "../../types/geojson";
import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString } from "graphql/type";

// TODO: Remove after testing call to local Python REST API
import { fetch } from "cross-fetch";

const auction_904_defaults_geojson = {
  type: GeoJSON.FeatureCollectionObject,
  args: {
    geoid_co: {
      type: GraphQLString!,
    },
    geoid_bl: {
      type: new GraphQLList(GraphQLString)!,
    },
    limit: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    },
    page: {
      type: GraphQLInt
    },
    skipCache: {
      type: GraphQLBoolean,
    },
  },
  resolve: async (
    _: any,
    { geoid_co, geoid_bl, limit, offset, page, skipCache }: {
      geoid_co: string;
      geoid_bl: string[];
      limit: number | undefined;
      offset: number | undefined;
      page: number | undefined;
      skipCache: boolean | undefined;
    },
    { dataSources: { restApi }, redisClient }: any,
    info: any
  ) => {

    const geoids = (typeof geoid_bl !== 'undefined' && geoid_bl !== null && geoid_bl.length > 0) ?
      geoid_bl.map(c => c.toString()).join(",") :
      "";

    const page_size = (typeof limit !== 'undefined' && limit === limit) ?
      limit :
      10;

    const count_offset = (typeof offset !== 'undefined' && offset === offset) ?
      offset :
      0;

    const page_number = (typeof page !== 'undefined' && page === page) ?
      page :
      0;

    if (typeof redisClient !== "undefined" && !!skipCache && typeof redisClient.disconnect === 'function') {
      // Disconnect from redis when ever skipCache == true
      console.log("Disconnect from redis when ever skipCache == true")
      redisClient.disconnect();
    }

    // TODO: Remove after testing call to local Python REST API
    console.log(`Query restApi: ${restApi.baseURL}/bcat/auction_904_defaults/geojson`
      + `?geoid_co=${geoid_co}` + ((!!geoids)? `&geoid_bl=${geoids}` : ``)
      + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
    const test_req = fetch(`${restApi.baseURL}/bcat/auction_904_defaults/geojson`
      + `?geoid_co=${geoid_co}` + ((!!geoids)? `&geoid_bl=${geoids}` : ``)
      + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`);

    test_req
      .catch((err) => console.log("Test Python REST error: ", err))
      .then((res) => console.log("Test Python REST response: ", res));

    const check_res = await test_req;

    console.log(test_req);

    return (typeof redisClient === "undefined" || !!skipCache)
      ? await restApi.getItem(`/bcat/auction_904_defaults/geojson`
        + `?geoid_co=${geoid_co}` + ((!!geoids)? `&geoid_bl=${geoids}` : ``)
        + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
      : await redisClient.checkCache(`auction_904_defaults-`
        + `${geoid_co}` + ((!!geoids) ? `-${geoids}` : ``) + `-${page_size}-${count_offset}-${page_number}`, async () => {
        return await restApi.getItem(`/bcat/auction_904_defaults/geojson`
          + `?geoid_co=${geoid_co}` + ((!!geoids)? `&geoid_bl=${geoids}` : ``)
          + `&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
      });
  },
};

export default auction_904_defaults_geojson;
