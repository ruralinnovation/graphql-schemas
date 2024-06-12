import { GraphQLObjectType } from "graphql/type";
declare const erc_test: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { pythonApi } }: any, info: any) => Promise<{
        erc_s3_test: import("@smithy/types").StreamingBlobPayloadOutputTypes | undefined;
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
export default erc_test;
