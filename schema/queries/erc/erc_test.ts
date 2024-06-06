import { GraphQLObjectType, GraphQLString } from "graphql/type";

const erc_s3_test = {
  // An array (list) fails to transfer gzipped by local sam cli
  type: // new GraphQLList(
  // ... but a single return object can be gzipped locally
    new GraphQLObjectType({
      name: 'ERCS3TestObject',
      fields: () => ({
        message: { type: GraphQLString }
      })
    }),
  args: null,
  resolve: async (
    _: any,
    __: any,
    { dataSources: { pythonApi } }: any,
    info: any
  ) =>  {

    const value = {
      "erc_s3_test": {
        "message": "value of a an \"erc_s3_test\" encapsulated property"
      },
      "message": ("value of a top level property"),
      "geoid_co": "33009",
      "name": "pct_bb_25_3",
      "value": 0.8366,
      "category": "bb",
      "variable": "25_3",
      "category_pl": "Broadband",
      "description": "Percent of broadband serviceable locations with access to 25/3",
    };

    return [{
        ...value
    }]      // An array (list) fails to transfer gzipped by local sam cli
      [0];  // ... but a single return object can be gzipped locally
  }
};


export default erc_s3_test;
