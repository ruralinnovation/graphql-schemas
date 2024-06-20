import { GraphQLObjectType } from "graphql/type";
declare const erc_value: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { pythonApi, s3DataSource } }: any, info: any) => Promise<{
        message: string;
        value: number;
    }>;
};
export default erc_value;
