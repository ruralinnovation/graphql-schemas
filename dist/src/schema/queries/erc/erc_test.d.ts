import { GraphQLObjectType } from "graphql/type";
declare const erc_s3_test: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { pythonApi } }: any, info: any) => Promise<{
        erc_s3_test: {
            message: string;
        };
        message: string;
        geoid_co: string;
        name: string;
        value: number;
        category: string;
        variable: string;
        category_pl: string;
        description: string;
    }>;
};
export default erc_s3_test;
