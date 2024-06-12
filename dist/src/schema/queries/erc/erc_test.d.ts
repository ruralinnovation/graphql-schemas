import { GraphQLObjectType } from "graphql/type";
declare const erc_test: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { pythonApi } }: any, info: any) => Promise<{
        erc_s3_test: {
            Body: any;
        };
        message: string;
    }>;
};
export default erc_test;
