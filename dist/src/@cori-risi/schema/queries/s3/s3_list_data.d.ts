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
    }, { dataSources: { restApi, s3DataSource } }: any, info: any) => Promise<import("../../types").S3DataList>;
};
export default s3_list_data;
