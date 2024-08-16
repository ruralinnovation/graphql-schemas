import { GraphQLObjectType } from "graphql/type";
declare const s3_list_data: {
    type: GraphQLObjectType<any, any>;
    args: {
        bucket: {
            type: import("graphql/type").GraphQLScalarType<string, string>;
        };
        container_name: {
            type: import("graphql/type").GraphQLScalarType<string, string>;
        };
    };
    resolve: (_: any, { bucket, container_name }: {
        bucket: string;
        container_name: string;
    }, { dataSources: { restApi, s3DataSource } }: any, info: any) => Promise<{
        type: string;
        list: any;
        test: {
            "S3ListData resolver can list objects": boolean;
            "S3ListData manifest can be encoded as a valid character string": boolean;
            "S3ListData manifest object is valid JSON": boolean;
            "S3ListData manifest contains valid list of data": boolean;
        };
    }>;
};
export default s3_list_data;
