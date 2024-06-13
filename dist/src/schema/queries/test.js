"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const graphql_1 = require("graphql");
const geojson_1 = require("../types/geojson");
exports.default = {
    test: {
        type: geojson_1.default.FeatureCollectionObject,
        args: {
            county: {
                type: graphql_1.GraphQLString,
            },
            skipCache: {
                type: graphql_1.GraphQLBoolean,
            },
        },
        resolve: async (_, { county, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
            return skipCache
                ? await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${county}`)
                : await redisClient.checkCache(`county_adjacency_crosswalk-${county}`, async () => {
                    return await pythonApi.getItem(`bcat/county_adjacency_crosswalk/geojson?geoid_co=${county}`);
                });
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY2hlbWEvcXVlcmllcy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTZEO0FBQzdELHNEQUFzRDtBQUN0RCx1REFBdUQ7QUFDdkQscUNBQXdGO0FBQ3hGLDhDQUF1QztBQUV2QyxrQkFBZTtJQUNiLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxpQkFBTyxDQUFDLHVCQUF1QjtRQUNyQyxJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLHVCQUFjO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSx3QkFBYzthQUNyQjtTQUNGO1FBQ0QsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUF3RCxFQUMzRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUNoRCxJQUFTLEVBQ1QsRUFBRTtZQUNGLE9BQU8sU0FBUztnQkFDZCxDQUFDLENBQUMsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLG9EQUFvRCxNQUFNLEVBQUUsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsTUFBTSxFQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQzlFLE9BQU8sTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLG9EQUFvRCxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRixDQUFDLENBQUMsQ0FBQztRQUNULENBQUM7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCB7IEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMTGlzdCwgR3JhcGhRTFN0cmluZywgR3JhcGhRTE9iamVjdFR5cGUgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBHZW9KU09OIGZyb20gJy4uL3R5cGVzL2dlb2pzb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlc3Q6IHtcbiAgICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgIGFyZ3M6IHtcbiAgICAgIGNvdW50eToge1xuICAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIH0sXG4gICAgICBza2lwQ2FjaGU6IHtcbiAgICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgeyBjb3VudHksIHNraXBDYWNoZSB9OiB7IGNvdW50eTogc3RyaW5nW107IHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB9LFxuICAgICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSwgcmVkaXNDbGllbnQgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICAgID8gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvY291bnR5X2FkamFjZW5jeV9jcm9zc3dhbGsvZ2VvanNvbj9nZW9pZF9jbz0ke2NvdW50eX1gKVxuICAgICAgICA6IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYGNvdW50eV9hZGphY2VuY3lfY3Jvc3N3YWxrLSR7Y291bnR5fWAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYmNhdC9jb3VudHlfYWRqYWNlbmN5X2Nyb3Nzd2Fsay9nZW9qc29uP2dlb2lkX2NvPSR7Y291bnR5fWApO1xuICAgICAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG59O1xuIl19