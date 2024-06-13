import { GraphQLObjectType } from "graphql/type";
declare const erc_test: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { pythonApi, s3DataSource } }: any, info: any) => Promise<{
        erc_s3_test: any;
        message: string;
    }>;
};
export default erc_test;
