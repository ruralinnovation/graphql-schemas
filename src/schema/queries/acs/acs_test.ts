import { GraphQLObjectType, GraphQLString } from "graphql/type";

const acs_test = {
  type: new GraphQLObjectType({
    name: 'ACSTestObject',
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
  ) =>  await pythonApi.getItem(`acs/testing`)
};

export default acs_test;
