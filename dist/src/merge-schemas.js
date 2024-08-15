"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const geojson_1 = require("./@cori-risi/schema/types/geojson");
function default_1(queries) {
    const combinedQueries = Object.values(queries).reduce((obj, query) => {
        return {
            ...obj,
            ...query,
        };
    }, {});
    const RootQuery = new graphql_1.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            setup: {
                type: geojson_1.default.GeometryTypeUnion,
                args: undefined,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                resolve: (_, __, { dataSources }) => {
                    return true;
                },
            },
            // feature_collection: {
            //   type: GeoJSON.FeatureCollectionObject,
            //   args: {
            //     table: {
            //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            //       type: GraphQLString!,
            //     },
            //     counties: {
            //       type: new GraphQLList(GraphQLString),
            //     },
            //     state_abbr: {
            //       type: GraphQLString,
            //     },
            //     skipCache: {
            //       type: GraphQLBoolean,
            //     },
            //   },
            //   resolve: async (
            //     _: unknown,
            //     {
            //       table,
            //       state_abbr,
            //       counties,
            //       skipCache,
            //     }: {
            //       table: string;
            //       state_abbr: string;
            //       counties: string[];
            //       skipCache: boolean;
            //     },
            //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //     { dataSources, redisClient }: any,
            //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
            //     info: unknown
            //   ) => {
            //     if (state_abbr) {
            //       return skipCache
            //         ? await dataSources.restApi.getItem(`bcat/${table}/geojson?state_abbr=${state_abbr}`)
            //         : await redisClient.checkCache(`${table}-${state_abbr}`, async () => {
            //             return await dataSources.restApi.getItem(`bcat/${table}/geojson?state_abbr=${state_abbr}`);
            //           });
            //     } else {
            //       if (!counties) {
            //         throw new Error('When no state abbr is specified you MUSt filter by state_abbr');
            //       }
            //       return await counties.reduce(
            //         async (fc, geoid_co) => {
            //           const featureCollection = await fc;
            //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //           const res: any = skipCache
            //             ? await redisClient.checkCache(`${table}-${geoid_co}`, async () => {
            //                 return await dataSources.restApi.getItem(`bcat/${table}/geojson?geoid_co=${geoid_co}`);
            //               })
            //             : await dataSources.restApi.getItem(`bcat/${table}/geojson?geoid_co=${geoid_co}`);
            //           if (res) {
            //             return {
            //               ...featureCollection,
            //               features: featureCollection.features.concat(res.features),
            //             };
            //           } else {
            //             return featureCollection;
            //           }
            //         },
            //         Promise.resolve({
            //           type: 'FeatureCollection',
            //           features: [],
            //         })
            //       );
            //     }
            //   },
            // },
            // county_feature: {
            //   type: GeoJSON.FeatureCollectionObject,
            //   args: {
            //     table: {
            //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            //       type: GraphQLString!,
            //     },
            //     geoid_co: {
            //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            //       type: GraphQLString!,
            //     },
            //   },
            //   resolve: async (
            //     _: unknown,
            //     { table, geoid_co }: { table: string; geoid_co: string },
            //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
            //     { dataSources, redisClient }: any,
            //     // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            //     info: any
            //   ) => {
            //     return await redisClient.checkCache(`${table}-${geoid_co}`, async () => {
            //       return await dataSources.restApi.getItem(`bcat/${table}/geojson?geoid_co=${geoid_co}`);
            //     });
            //   },
            // },
            ...combinedQueries,
        },
    });
    return (0, schema_1.mergeSchemas)({
        schemas: [
            new graphql_1.GraphQLSchema({
                query: RootQuery,
            }),
        ],
    });
}
// if (!existsSync('dist')) {
//   mkdirSync('dist');
// }
// writeFileSync('dist/schema.graphql', printSchema(schema));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc2NoZW1hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJnZS1zY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsNEJBK0hDO0FBeklELGtEQUFxRDtBQUNyRCxxQ0FNaUI7QUFDakIsK0RBQXdEO0FBRXhELG1CQUF5QixPQUFjO0lBQ3JDLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25FLE9BQU87WUFDTCxHQUFHLEdBQUc7WUFDTixHQUFHLEtBQUs7U0FDVCxDQUFDO0lBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBR1AsTUFBTSxTQUFTLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQztRQUN0QyxJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLGlCQUFPLENBQUMsaUJBQWlCO2dCQUMvQixJQUFJLEVBQUUsU0FBUztnQkFDZixpR0FBaUc7Z0JBQ2pHLE9BQU8sRUFBRSxDQUFDLENBQVUsRUFBRSxFQUFXLEVBQUUsRUFBRSxXQUFXLEVBQU8sRUFBRSxFQUFFO29CQUN6RCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2FBQ0Y7WUFDRCx3QkFBd0I7WUFDeEIsMkNBQTJDO1lBQzNDLFlBQVk7WUFDWixlQUFlO1lBQ2YsNkVBQTZFO1lBQzdFLDhCQUE4QjtZQUM5QixTQUFTO1lBQ1Qsa0JBQWtCO1lBQ2xCLDhDQUE4QztZQUM5QyxTQUFTO1lBQ1Qsb0JBQW9CO1lBQ3BCLDZCQUE2QjtZQUM3QixTQUFTO1lBQ1QsbUJBQW1CO1lBQ25CLDhCQUE4QjtZQUM5QixTQUFTO1lBQ1QsT0FBTztZQUNQLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsUUFBUTtZQUNSLGVBQWU7WUFDZixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixXQUFXO1lBQ1gsdUJBQXVCO1lBQ3ZCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsNEJBQTRCO1lBQzVCLFNBQVM7WUFDVCxxRUFBcUU7WUFDckUseUNBQXlDO1lBQ3pDLG9FQUFvRTtZQUNwRSxvQkFBb0I7WUFDcEIsV0FBVztZQUNYLHdCQUF3QjtZQUN4Qix5QkFBeUI7WUFDekIsZ0dBQWdHO1lBQ2hHLGlGQUFpRjtZQUNqRiwwR0FBMEc7WUFDMUcsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZix5QkFBeUI7WUFDekIsNEZBQTRGO1lBQzVGLFVBQVU7WUFDVixzQ0FBc0M7WUFDdEMsb0NBQW9DO1lBQ3BDLGdEQUFnRDtZQUNoRCwyRUFBMkU7WUFDM0UsdUNBQXVDO1lBQ3ZDLG1GQUFtRjtZQUNuRiwwR0FBMEc7WUFDMUcsbUJBQW1CO1lBQ25CLGlHQUFpRztZQUNqRyx1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHNDQUFzQztZQUN0QywyRUFBMkU7WUFDM0UsaUJBQWlCO1lBQ2pCLHFCQUFxQjtZQUNyQix3Q0FBd0M7WUFDeEMsY0FBYztZQUNkLGFBQWE7WUFDYiw0QkFBNEI7WUFDNUIsdUNBQXVDO1lBQ3ZDLDBCQUEwQjtZQUMxQixhQUFhO1lBQ2IsV0FBVztZQUNYLFFBQVE7WUFDUixPQUFPO1lBQ1AsS0FBSztZQUNMLG9CQUFvQjtZQUNwQiwyQ0FBMkM7WUFDM0MsWUFBWTtZQUNaLGVBQWU7WUFDZiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxrQkFBa0I7WUFDbEIsNkVBQTZFO1lBQzdFLDhCQUE4QjtZQUM5QixTQUFTO1lBQ1QsT0FBTztZQUNQLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsZ0VBQWdFO1lBQ2hFLHFFQUFxRTtZQUNyRSx5Q0FBeUM7WUFDekMsd0dBQXdHO1lBQ3hHLGdCQUFnQjtZQUNoQixXQUFXO1lBQ1gsZ0ZBQWdGO1lBQ2hGLGdHQUFnRztZQUNoRyxVQUFVO1lBQ1YsT0FBTztZQUNQLEtBQUs7WUFDTCxHQUFHLGVBQWU7U0FDbkI7S0FDRixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUEscUJBQVksRUFBQztRQUNsQixPQUFPLEVBQUU7WUFDUCxJQUFJLHVCQUFhLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxTQUFTO2FBQ2pCLENBQUM7U0FDSDtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCw2QkFBNkI7QUFDN0IsdUJBQXVCO0FBQ3ZCLElBQUk7QUFDSiw2REFBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtZXJnZVNjaGVtYXMgfSBmcm9tICdAZ3JhcGhxbC10b29scy9zY2hlbWEnO1xuaW1wb3J0IHtcbiAgLy8gR3JhcGhRTEJvb2xlYW4sXG4gIC8vIEdyYXBoUUxMaXN0LFxuICBHcmFwaFFMT2JqZWN0VHlwZSxcbiAgR3JhcGhRTFNjaGVtYSxcbiAgLy8gR3JhcGhRTFN0cmluZ1xufSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBHZW9KU09OIGZyb20gJy4vQGNvcmktcmlzaS9zY2hlbWEvdHlwZXMvZ2VvanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChxdWVyaWVzOiBbYW55XSkge1xuICBjb25zdCBjb21iaW5lZFF1ZXJpZXMgPSBPYmplY3QudmFsdWVzKHF1ZXJpZXMpLnJlZHVjZSgob2JqLCBxdWVyeSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5vYmosXG4gICAgICAuLi5xdWVyeSxcbiAgICB9O1xuICB9LCB7fSk7XG5cblxuICBjb25zdCBSb290UXVlcnkgPSBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgIG5hbWU6ICdSb290UXVlcnlUeXBlJyxcbiAgICBmaWVsZHM6IHtcbiAgICAgIHNldHVwOiB7XG4gICAgICAgIHR5cGU6IEdlb0pTT04uR2VvbWV0cnlUeXBlVW5pb24sXG4gICAgICAgIGFyZ3M6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICByZXNvbHZlOiAoXzogdW5rbm93biwgX186IHVua25vd24sIHsgZGF0YVNvdXJjZXMgfTogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgLy8gZmVhdHVyZV9jb2xsZWN0aW9uOiB7XG4gICAgICAvLyAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgICAvLyAgIGFyZ3M6IHtcbiAgICAgIC8vICAgICB0YWJsZToge1xuICAgICAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAgY291bnRpZXM6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIHN0YXRlX2FiYnI6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmcsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICBza2lwQ2FjaGU6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIC8vICAgICBfOiB1bmtub3duLFxuICAgICAgLy8gICAgIHtcbiAgICAgIC8vICAgICAgIHRhYmxlLFxuICAgICAgLy8gICAgICAgc3RhdGVfYWJicixcbiAgICAgIC8vICAgICAgIGNvdW50aWVzLFxuICAgICAgLy8gICAgICAgc2tpcENhY2hlLFxuICAgICAgLy8gICAgIH06IHtcbiAgICAgIC8vICAgICAgIHRhYmxlOiBzdHJpbmc7XG4gICAgICAvLyAgICAgICBzdGF0ZV9hYmJyOiBzdHJpbmc7XG4gICAgICAvLyAgICAgICBjb3VudGllczogc3RyaW5nW107XG4gICAgICAvLyAgICAgICBza2lwQ2FjaGU6IGJvb2xlYW47XG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIHsgZGF0YVNvdXJjZXMsIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAvLyAgICAgaW5mbzogdW5rbm93blxuICAgICAgLy8gICApID0+IHtcbiAgICAgIC8vICAgICBpZiAoc3RhdGVfYWJicikge1xuICAgICAgLy8gICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgLy8gICAgICAgICA/IGF3YWl0IGRhdGFTb3VyY2VzLnJlc3RBcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApXG4gICAgICAvLyAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtzdGF0ZV9hYmJyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCBkYXRhU291cmNlcy5yZXN0QXBpLmdldEl0ZW0oYGJjYXQvJHt0YWJsZX0vZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKTtcbiAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgaWYgKCFjb3VudGllcykge1xuICAgICAgLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1doZW4gbm8gc3RhdGUgYWJiciBpcyBzcGVjaWZpZWQgeW91IE1VU3QgZmlsdGVyIGJ5IHN0YXRlX2FiYnInKTtcbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICAgIHJldHVybiBhd2FpdCBjb3VudGllcy5yZWR1Y2UoXG4gICAgICAvLyAgICAgICAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICAgIC8vICAgICAgICAgICBjb25zdCBmZWF0dXJlQ29sbGVjdGlvbiA9IGF3YWl0IGZjO1xuICAgICAgLy8gICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAvLyAgICAgICAgICAgY29uc3QgcmVzOiBhbnkgPSBza2lwQ2FjaGVcbiAgICAgIC8vICAgICAgICAgICAgID8gYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGRhdGFTb3VyY2VzLnJlc3RBcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgICAgICAgICAgIH0pXG4gICAgICAvLyAgICAgICAgICAgICA6IGF3YWl0IGRhdGFTb3VyY2VzLnJlc3RBcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgIC8vICAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAvLyAgICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgIC8vICAgICAgICAgICAgIH07XG4gICAgICAvLyAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAvLyAgICAgICAgIH0sXG4gICAgICAvLyAgICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAvLyAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIC8vICAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAvLyAgICAgICAgIH0pXG4gICAgICAvLyAgICAgICApO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyBjb3VudHlfZmVhdHVyZToge1xuICAgICAgLy8gICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgICAgLy8gICBhcmdzOiB7XG4gICAgICAvLyAgICAgdGFibGU6IHtcbiAgICAgIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIGdlb2lkX2NvOiB7XG4gICAgICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgLy8gICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgLy8gICAgIF86IHVua25vd24sXG4gICAgICAvLyAgICAgeyB0YWJsZSwgZ2VvaWRfY28gfTogeyB0YWJsZTogc3RyaW5nOyBnZW9pZF9jbzogc3RyaW5nIH0sXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIC8vICAgICB7IGRhdGFTb3VyY2VzLCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIGluZm86IGFueVxuICAgICAgLy8gICApID0+IHtcbiAgICAgIC8vICAgICByZXR1cm4gYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyAgICAgICByZXR1cm4gYXdhaXQgZGF0YVNvdXJjZXMucmVzdEFwaS5nZXRJdGVtKGBiY2F0LyR7dGFibGV9L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAuLi5jb21iaW5lZFF1ZXJpZXMsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIG1lcmdlU2NoZW1hcyh7XG4gICAgc2NoZW1hczogW1xuICAgICAgbmV3IEdyYXBoUUxTY2hlbWEoe1xuICAgICAgICBxdWVyeTogUm9vdFF1ZXJ5LFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG59XG5cbi8vIGlmICghZXhpc3RzU3luYygnZGlzdCcpKSB7XG4vLyAgIG1rZGlyU3luYygnZGlzdCcpO1xuLy8gfVxuLy8gd3JpdGVGaWxlU3luYygnZGlzdC9zY2hlbWEuZ3JhcGhxbCcsIHByaW50U2NoZW1hKHNjaGVtYSkpO1xuIl19