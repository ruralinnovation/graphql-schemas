import { GraphQLList } from "graphql/type";
declare const county_summary: {
    type: any;
    args: {
        geoid_co: {
            type: GraphQLList<import("graphql/type").GraphQLScalarType<string, string>>;
        };
        limit: {
            type: import("graphql/type").GraphQLScalarType<number, number>;
        };
        offset: {
            type: import("graphql/type").GraphQLScalarType<number, number>;
        };
        page: {
            type: import("graphql/type").GraphQLScalarType<number, number>;
        };
        skipCache: {
            type: import("graphql/type").GraphQLScalarType<boolean, boolean>;
        };
    };
    resolve: (_: any, { geoid_co, limit, offset, page, skipCache }: {
        geoid_co: string[];
        limit: number | undefined;
        offset: number | undefined;
        page: number | undefined;
        skipCache: boolean | undefined;
    }, { dataSources: { restApi }, redisClient }: any, info: any) => Promise<{
        type: string;
        features: any;
    }>;
};
export default county_summary;
