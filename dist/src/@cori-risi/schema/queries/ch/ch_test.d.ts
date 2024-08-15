import { GraphQLObjectType } from "graphql/type";
declare const ch_test: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { restApi } }: any, info: any) => Promise<{
        value: any;
    }>;
};
export default ch_test;
