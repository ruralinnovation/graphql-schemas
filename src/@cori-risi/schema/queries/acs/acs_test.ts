import { GraphQLObjectType, GraphQLString } from "graphql/type";

const acs_test = {
  type: new GraphQLObjectType({
    name: 'ACSTestObject',
    fields: () => ({
      message: { type: GraphQLString },
      type: { type: GraphQLString }
    })
  }),
  args: null,
  resolve: async (
    _: any,
    __: any,
    { dataSources: { restApi } }: any,
    info: any
  ) =>  ({
    type: "acs_test",
    ...(await restApi.getItem(`acs/testing`))
  })
};

export default acs_test;
