import { GraphQLObjectType } from "graphql/type";
declare const s3_test: {
    type: GraphQLObjectType<any, any>;
    args: null;
    resolve: (_: any, __: any, { dataSources: { restApi, s3DataSource } }: any, info: any) => Promise<{
        type: string;
        message: string;
        test: {
            "S3Test resolver can list objects in `cori-risi-app` under the examples/ prefix": boolean;
            "S3Test object can be encoded as a valid character string": boolean;
            "S3Test object is valid JSON": boolean;
        };
    }>;
};
export default s3_test;
