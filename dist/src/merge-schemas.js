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
    console.log("combinedQueries:", combinedQueries);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc2NoZW1hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJnZS1zY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsNEJBZ0lDO0FBMUlELGtEQUFxRDtBQUNyRCxxQ0FNaUI7QUFDakIsK0RBQXdEO0FBRXhELG1CQUF5QixPQUFjO0lBQ3JDLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ25FLE9BQU87WUFDTCxHQUFHLEdBQUc7WUFDTixHQUFHLEtBQUs7U0FDVCxDQUFDO0lBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUVqRCxNQUFNLFNBQVMsR0FBRyxJQUFJLDJCQUFpQixDQUFDO1FBQ3RDLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsaUJBQU8sQ0FBQyxpQkFBaUI7Z0JBQy9CLElBQUksRUFBRSxTQUFTO2dCQUNmLGlHQUFpRztnQkFDakcsT0FBTyxFQUFFLENBQUMsQ0FBVSxFQUFFLEVBQVcsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUFFLEVBQUU7b0JBQ3pELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7YUFDRjtZQUNELHdCQUF3QjtZQUN4QiwyQ0FBMkM7WUFDM0MsWUFBWTtZQUNaLGVBQWU7WUFDZiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxrQkFBa0I7WUFDbEIsOENBQThDO1lBQzlDLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIsNkJBQTZCO1lBQzdCLFNBQVM7WUFDVCxtQkFBbUI7WUFDbkIsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixRQUFRO1lBQ1IsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLFdBQVc7WUFDWCx1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsU0FBUztZQUNULHFFQUFxRTtZQUNyRSx5Q0FBeUM7WUFDekMsb0VBQW9FO1lBQ3BFLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QixnR0FBZ0c7WUFDaEcsaUZBQWlGO1lBQ2pGLDBHQUEwRztZQUMxRyxnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLHlCQUF5QjtZQUN6Qiw0RkFBNEY7WUFDNUYsVUFBVTtZQUNWLHNDQUFzQztZQUN0QyxvQ0FBb0M7WUFDcEMsZ0RBQWdEO1lBQ2hELDJFQUEyRTtZQUMzRSx1Q0FBdUM7WUFDdkMsbUZBQW1GO1lBQ25GLDBHQUEwRztZQUMxRyxtQkFBbUI7WUFDbkIsaUdBQWlHO1lBQ2pHLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsc0NBQXNDO1lBQ3RDLDJFQUEyRTtZQUMzRSxpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLHdDQUF3QztZQUN4QyxjQUFjO1lBQ2QsYUFBYTtZQUNiLDRCQUE0QjtZQUM1Qix1Q0FBdUM7WUFDdkMsMEJBQTBCO1lBQzFCLGFBQWE7WUFDYixXQUFXO1lBQ1gsUUFBUTtZQUNSLE9BQU87WUFDUCxLQUFLO1lBQ0wsb0JBQW9CO1lBQ3BCLDJDQUEyQztZQUMzQyxZQUFZO1lBQ1osZUFBZTtZQUNmLDZFQUE2RTtZQUM3RSw4QkFBOEI7WUFDOUIsU0FBUztZQUNULGtCQUFrQjtZQUNsQiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixnRUFBZ0U7WUFDaEUscUVBQXFFO1lBQ3JFLHlDQUF5QztZQUN6Qyx3R0FBd0c7WUFDeEcsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxnRkFBZ0Y7WUFDaEYsZ0dBQWdHO1lBQ2hHLFVBQVU7WUFDVixPQUFPO1lBQ1AsS0FBSztZQUNMLEdBQUcsZUFBZTtTQUNuQjtLQUNGLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBQSxxQkFBWSxFQUFDO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLElBQUksdUJBQWEsQ0FBQztnQkFDaEIsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNIO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELDZCQUE2QjtBQUM3Qix1QkFBdUI7QUFDdkIsSUFBSTtBQUNKLDZEQUE2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1lcmdlU2NoZW1hcyB9IGZyb20gJ0BncmFwaHFsLXRvb2xzL3NjaGVtYSc7XG5pbXBvcnQge1xuICAvLyBHcmFwaFFMQm9vbGVhbixcbiAgLy8gR3JhcGhRTExpc3QsXG4gIEdyYXBoUUxPYmplY3RUeXBlLFxuICBHcmFwaFFMU2NoZW1hLFxuICAvLyBHcmFwaFFMU3RyaW5nXG59IGZyb20gJ2dyYXBocWwnO1xuaW1wb3J0IEdlb0pTT04gZnJvbSAnLi9AY29yaS1yaXNpL3NjaGVtYS90eXBlcy9nZW9qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHF1ZXJpZXM6IFthbnldKSB7XG4gIGNvbnN0IGNvbWJpbmVkUXVlcmllcyA9IE9iamVjdC52YWx1ZXMocXVlcmllcykucmVkdWNlKChvYmosIHF1ZXJ5KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm9iaixcbiAgICAgIC4uLnF1ZXJ5LFxuICAgIH07XG4gIH0sIHt9KTtcblxuICBjb25zb2xlLmxvZyhcImNvbWJpbmVkUXVlcmllczpcIiwgY29tYmluZWRRdWVyaWVzKTtcblxuICBjb25zdCBSb290UXVlcnkgPSBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgIG5hbWU6ICdSb290UXVlcnlUeXBlJyxcbiAgICBmaWVsZHM6IHtcbiAgICAgIHNldHVwOiB7XG4gICAgICAgIHR5cGU6IEdlb0pTT04uR2VvbWV0cnlUeXBlVW5pb24sXG4gICAgICAgIGFyZ3M6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICByZXNvbHZlOiAoXzogdW5rbm93biwgX186IHVua25vd24sIHsgZGF0YVNvdXJjZXMgfTogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgLy8gZmVhdHVyZV9jb2xsZWN0aW9uOiB7XG4gICAgICAvLyAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgICAvLyAgIGFyZ3M6IHtcbiAgICAgIC8vICAgICB0YWJsZToge1xuICAgICAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAgY291bnRpZXM6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIHN0YXRlX2FiYnI6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmcsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICBza2lwQ2FjaGU6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIC8vICAgICBfOiB1bmtub3duLFxuICAgICAgLy8gICAgIHtcbiAgICAgIC8vICAgICAgIHRhYmxlLFxuICAgICAgLy8gICAgICAgc3RhdGVfYWJicixcbiAgICAgIC8vICAgICAgIGNvdW50aWVzLFxuICAgICAgLy8gICAgICAgc2tpcENhY2hlLFxuICAgICAgLy8gICAgIH06IHtcbiAgICAgIC8vICAgICAgIHRhYmxlOiBzdHJpbmc7XG4gICAgICAvLyAgICAgICBzdGF0ZV9hYmJyOiBzdHJpbmc7XG4gICAgICAvLyAgICAgICBjb3VudGllczogc3RyaW5nW107XG4gICAgICAvLyAgICAgICBza2lwQ2FjaGU6IGJvb2xlYW47XG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIHsgZGF0YVNvdXJjZXMsIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAvLyAgICAgaW5mbzogdW5rbm93blxuICAgICAgLy8gICApID0+IHtcbiAgICAgIC8vICAgICBpZiAoc3RhdGVfYWJicikge1xuICAgICAgLy8gICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgLy8gICAgICAgICA/IGF3YWl0IGRhdGFTb3VyY2VzLnJlc3RBcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApXG4gICAgICAvLyAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtzdGF0ZV9hYmJyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCBkYXRhU291cmNlcy5yZXN0QXBpLmdldEl0ZW0oYGJjYXQvJHt0YWJsZX0vZ2VvanNvbj9zdGF0ZV9hYmJyPSR7c3RhdGVfYWJicn1gKTtcbiAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgaWYgKCFjb3VudGllcykge1xuICAgICAgLy8gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1doZW4gbm8gc3RhdGUgYWJiciBpcyBzcGVjaWZpZWQgeW91IE1VU3QgZmlsdGVyIGJ5IHN0YXRlX2FiYnInKTtcbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICAgIHJldHVybiBhd2FpdCBjb3VudGllcy5yZWR1Y2UoXG4gICAgICAvLyAgICAgICAgIGFzeW5jIChmYywgZ2VvaWRfY28pID0+IHtcbiAgICAgIC8vICAgICAgICAgICBjb25zdCBmZWF0dXJlQ29sbGVjdGlvbiA9IGF3YWl0IGZjO1xuICAgICAgLy8gICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAvLyAgICAgICAgICAgY29uc3QgcmVzOiBhbnkgPSBza2lwQ2FjaGVcbiAgICAgIC8vICAgICAgICAgICAgID8gYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGRhdGFTb3VyY2VzLnJlc3RBcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgICAgICAgICAgIH0pXG4gICAgICAvLyAgICAgICAgICAgICA6IGF3YWl0IGRhdGFTb3VyY2VzLnJlc3RBcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgIC8vICAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAvLyAgICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgIC8vICAgICAgICAgICAgIH07XG4gICAgICAvLyAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAvLyAgICAgICAgIH0sXG4gICAgICAvLyAgICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAvLyAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIC8vICAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAvLyAgICAgICAgIH0pXG4gICAgICAvLyAgICAgICApO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyBjb3VudHlfZmVhdHVyZToge1xuICAgICAgLy8gICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgICAgLy8gICBhcmdzOiB7XG4gICAgICAvLyAgICAgdGFibGU6IHtcbiAgICAgIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIGdlb2lkX2NvOiB7XG4gICAgICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgLy8gICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgLy8gICAgIF86IHVua25vd24sXG4gICAgICAvLyAgICAgeyB0YWJsZSwgZ2VvaWRfY28gfTogeyB0YWJsZTogc3RyaW5nOyBnZW9pZF9jbzogc3RyaW5nIH0sXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIC8vICAgICB7IGRhdGFTb3VyY2VzLCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIGluZm86IGFueVxuICAgICAgLy8gICApID0+IHtcbiAgICAgIC8vICAgICByZXR1cm4gYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyAgICAgICByZXR1cm4gYXdhaXQgZGF0YVNvdXJjZXMucmVzdEFwaS5nZXRJdGVtKGBiY2F0LyR7dGFibGV9L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgIC8vICAgICB9KTtcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAuLi5jb21iaW5lZFF1ZXJpZXMsXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIG1lcmdlU2NoZW1hcyh7XG4gICAgc2NoZW1hczogW1xuICAgICAgbmV3IEdyYXBoUUxTY2hlbWEoe1xuICAgICAgICBxdWVyeTogUm9vdFF1ZXJ5LFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG59XG5cbi8vIGlmICghZXhpc3RzU3luYygnZGlzdCcpKSB7XG4vLyAgIG1rZGlyU3luYygnZGlzdCcpO1xuLy8gfVxuLy8gd3JpdGVGaWxlU3luYygnZGlzdC9zY2hlbWEuZ3JhcGhxbCcsIHByaW50U2NoZW1hKHNjaGVtYSkpO1xuIl19