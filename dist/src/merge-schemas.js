"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            //         ? await dataSources.pythonApi.getItem(`bcat/${table}/geojson?state_abbr=${state_abbr}`)
            //         : await redisClient.checkCache(`${table}-${state_abbr}`, async () => {
            //             return await dataSources.pythonApi.getItem(`bcat/${table}/geojson?state_abbr=${state_abbr}`);
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
            //                 return await dataSources.pythonApi.getItem(`bcat/${table}/geojson?geoid_co=${geoid_co}`);
            //               })
            //             : await dataSources.pythonApi.getItem(`bcat/${table}/geojson?geoid_co=${geoid_co}`);
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
            //       return await dataSources.pythonApi.getItem(`bcat/${table}/geojson?geoid_co=${geoid_co}`);
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
exports.default = default_1;
// if (!existsSync('dist')) {
//   mkdirSync('dist');
// }
// writeFileSync('dist/schema.graphql', printSchema(schema));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc2NoZW1hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJnZS1zY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQXFEO0FBQ3JELHFDQU1pQjtBQUNqQiwrREFBd0Q7QUFFeEQsbUJBQXlCLE9BQWM7SUFDckMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbkUsT0FBTztZQUNMLEdBQUcsR0FBRztZQUNOLEdBQUcsS0FBSztTQUNULENBQUM7SUFDSixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFHUCxNQUFNLFNBQVMsR0FBRyxJQUFJLDJCQUFpQixDQUFDO1FBQ3RDLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsaUJBQU8sQ0FBQyxpQkFBaUI7Z0JBQy9CLElBQUksRUFBRSxTQUFTO2dCQUNmLGlHQUFpRztnQkFDakcsT0FBTyxFQUFFLENBQUMsQ0FBVSxFQUFFLEVBQVcsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUFFLEVBQUU7b0JBQ3pELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7YUFDRjtZQUNELHdCQUF3QjtZQUN4QiwyQ0FBMkM7WUFDM0MsWUFBWTtZQUNaLGVBQWU7WUFDZiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxrQkFBa0I7WUFDbEIsOENBQThDO1lBQzlDLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIsNkJBQTZCO1lBQzdCLFNBQVM7WUFDVCxtQkFBbUI7WUFDbkIsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixRQUFRO1lBQ1IsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLFdBQVc7WUFDWCx1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsU0FBUztZQUNULHFFQUFxRTtZQUNyRSx5Q0FBeUM7WUFDekMsb0VBQW9FO1lBQ3BFLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QixrR0FBa0c7WUFDbEcsaUZBQWlGO1lBQ2pGLDRHQUE0RztZQUM1RyxnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLHlCQUF5QjtZQUN6Qiw0RkFBNEY7WUFDNUYsVUFBVTtZQUNWLHNDQUFzQztZQUN0QyxvQ0FBb0M7WUFDcEMsZ0RBQWdEO1lBQ2hELDJFQUEyRTtZQUMzRSx1Q0FBdUM7WUFDdkMsbUZBQW1GO1lBQ25GLDRHQUE0RztZQUM1RyxtQkFBbUI7WUFDbkIsbUdBQW1HO1lBQ25HLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsc0NBQXNDO1lBQ3RDLDJFQUEyRTtZQUMzRSxpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLHdDQUF3QztZQUN4QyxjQUFjO1lBQ2QsYUFBYTtZQUNiLDRCQUE0QjtZQUM1Qix1Q0FBdUM7WUFDdkMsMEJBQTBCO1lBQzFCLGFBQWE7WUFDYixXQUFXO1lBQ1gsUUFBUTtZQUNSLE9BQU87WUFDUCxLQUFLO1lBQ0wsb0JBQW9CO1lBQ3BCLDJDQUEyQztZQUMzQyxZQUFZO1lBQ1osZUFBZTtZQUNmLDZFQUE2RTtZQUM3RSw4QkFBOEI7WUFDOUIsU0FBUztZQUNULGtCQUFrQjtZQUNsQiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixnRUFBZ0U7WUFDaEUscUVBQXFFO1lBQ3JFLHlDQUF5QztZQUN6Qyx3R0FBd0c7WUFDeEcsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxnRkFBZ0Y7WUFDaEYsa0dBQWtHO1lBQ2xHLFVBQVU7WUFDVixPQUFPO1lBQ1AsS0FBSztZQUNMLEdBQUcsZUFBZTtTQUNuQjtLQUNGLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBQSxxQkFBWSxFQUFDO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLElBQUksdUJBQWEsQ0FBQztnQkFDaEIsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNIO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9IRCw0QkErSEM7QUFFRCw2QkFBNkI7QUFDN0IsdUJBQXVCO0FBQ3ZCLElBQUk7QUFDSiw2REFBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtZXJnZVNjaGVtYXMgfSBmcm9tICdAZ3JhcGhxbC10b29scy9zY2hlbWEnO1xuaW1wb3J0IHtcbiAgLy8gR3JhcGhRTEJvb2xlYW4sXG4gIC8vIEdyYXBoUUxMaXN0LFxuICBHcmFwaFFMT2JqZWN0VHlwZSxcbiAgR3JhcGhRTFNjaGVtYSxcbiAgLy8gR3JhcGhRTFN0cmluZ1xufSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBHZW9KU09OIGZyb20gJy4vQGNvcmktcmlzaS9zY2hlbWEvdHlwZXMvZ2VvanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChxdWVyaWVzOiBbYW55XSkge1xuICBjb25zdCBjb21iaW5lZFF1ZXJpZXMgPSBPYmplY3QudmFsdWVzKHF1ZXJpZXMpLnJlZHVjZSgob2JqLCBxdWVyeSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5vYmosXG4gICAgICAuLi5xdWVyeSxcbiAgICB9O1xuICB9LCB7fSk7XG5cblxuICBjb25zdCBSb290UXVlcnkgPSBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgIG5hbWU6ICdSb290UXVlcnlUeXBlJyxcbiAgICBmaWVsZHM6IHtcbiAgICAgIHNldHVwOiB7XG4gICAgICAgIHR5cGU6IEdlb0pTT04uR2VvbWV0cnlUeXBlVW5pb24sXG4gICAgICAgIGFyZ3M6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICByZXNvbHZlOiAoXzogdW5rbm93biwgX186IHVua25vd24sIHsgZGF0YVNvdXJjZXMgfTogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgLy8gZmVhdHVyZV9jb2xsZWN0aW9uOiB7XG4gICAgICAvLyAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgICAvLyAgIGFyZ3M6IHtcbiAgICAgIC8vICAgICB0YWJsZToge1xuICAgICAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAgY291bnRpZXM6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IG5ldyBHcmFwaFFMTGlzdChHcmFwaFFMU3RyaW5nKSxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIHN0YXRlX2FiYnI6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmcsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICBza2lwQ2FjaGU6IHtcbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxCb29sZWFuLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyAgIHJlc29sdmU6IGFzeW5jIChcbiAgICAgIC8vICAgICBfOiB1bmtub3duLFxuICAgICAgLy8gICAgIHtcbiAgICAgIC8vICAgICAgIHRhYmxlLFxuICAgICAgLy8gICAgICAgc3RhdGVfYWJicixcbiAgICAgIC8vICAgICAgIGNvdW50aWVzLFxuICAgICAgLy8gICAgICAgc2tpcENhY2hlLFxuICAgICAgLy8gICAgIH06IHtcbiAgICAgIC8vICAgICAgIHRhYmxlOiBzdHJpbmc7XG4gICAgICAvLyAgICAgICBzdGF0ZV9hYmJyOiBzdHJpbmc7XG4gICAgICAvLyAgICAgICBjb3VudGllczogc3RyaW5nW107XG4gICAgICAvLyAgICAgICBza2lwQ2FjaGU6IGJvb2xlYW47XG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIHsgZGF0YVNvdXJjZXMsIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAvLyAgICAgaW5mbzogdW5rbm93blxuICAgICAgLy8gICApID0+IHtcbiAgICAgIC8vICAgICBpZiAoc3RhdGVfYWJicikge1xuICAgICAgLy8gICAgICAgcmV0dXJuIHNraXBDYWNoZVxuICAgICAgLy8gICAgICAgICA/IGF3YWl0IGRhdGFTb3VyY2VzLnB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0LyR7dGFibGV9L2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YClcbiAgICAgIC8vICAgICAgICAgOiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGAke3RhYmxlfS0ke3N0YXRlX2FiYnJ9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGRhdGFTb3VyY2VzLnB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0LyR7dGFibGV9L2dlb2pzb24/c3RhdGVfYWJicj0ke3N0YXRlX2FiYnJ9YCk7XG4gICAgICAvLyAgICAgICAgICAgfSk7XG4gICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgIGlmICghY291bnRpZXMpIHtcbiAgICAgIC8vICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIG5vIHN0YXRlIGFiYnIgaXMgc3BlY2lmaWVkIHlvdSBNVVN0IGZpbHRlciBieSBzdGF0ZV9hYmJyJyk7XG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICAgICByZXR1cm4gYXdhaXQgY291bnRpZXMucmVkdWNlKFxuICAgICAgLy8gICAgICAgICBhc3luYyAoZmMsIGdlb2lkX2NvKSA9PiB7XG4gICAgICAvLyAgICAgICAgICAgY29uc3QgZmVhdHVyZUNvbGxlY3Rpb24gPSBhd2FpdCBmYztcbiAgICAgIC8vICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgICAgICAgIGNvbnN0IHJlczogYW55ID0gc2tpcENhY2hlXG4gICAgICAvLyAgICAgICAgICAgICA/IGF3YWl0IHJlZGlzQ2xpZW50LmNoZWNrQ2FjaGUoYCR7dGFibGV9LSR7Z2VvaWRfY299YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBkYXRhU291cmNlcy5weXRob25BcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgICAgICAgICAgIH0pXG4gICAgICAvLyAgICAgICAgICAgICA6IGF3YWl0IGRhdGFTb3VyY2VzLnB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0LyR7dGFibGV9L2dlb2pzb24/Z2VvaWRfY289JHtnZW9pZF9jb31gKTtcbiAgICAgIC8vICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAvLyAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgLy8gICAgICAgICAgICAgICAuLi5mZWF0dXJlQ29sbGVjdGlvbixcbiAgICAgIC8vICAgICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLmNvbmNhdChyZXMuZmVhdHVyZXMpLFxuICAgICAgLy8gICAgICAgICAgICAgfTtcbiAgICAgIC8vICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIGZlYXR1cmVDb2xsZWN0aW9uO1xuICAgICAgLy8gICAgICAgICAgIH1cbiAgICAgIC8vICAgICAgICAgfSxcbiAgICAgIC8vICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIC8vICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgLy8gICAgICAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIC8vICAgICAgICAgfSlcbiAgICAgIC8vICAgICAgICk7XG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICAgIC8vIGNvdW50eV9mZWF0dXJlOiB7XG4gICAgICAvLyAgIHR5cGU6IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb25PYmplY3QsXG4gICAgICAvLyAgIGFyZ3M6IHtcbiAgICAgIC8vICAgICB0YWJsZToge1xuICAgICAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIC8vICAgICAgIHR5cGU6IEdyYXBoUUxTdHJpbmchLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAgZ2VvaWRfY286IHtcbiAgICAgIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICByZXNvbHZlOiBhc3luYyAoXG4gICAgICAvLyAgICAgXzogdW5rbm93bixcbiAgICAgIC8vICAgICB7IHRhYmxlLCBnZW9pZF9jbyB9OiB7IHRhYmxlOiBzdHJpbmc7IGdlb2lkX2NvOiBzdHJpbmcgfSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIHsgZGF0YVNvdXJjZXMsIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICAgIC8vICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAvLyAgICAgaW5mbzogYW55XG4gICAgICAvLyAgICkgPT4ge1xuICAgICAgLy8gICAgIHJldHVybiBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGAke3RhYmxlfS0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vICAgICAgIHJldHVybiBhd2FpdCBkYXRhU291cmNlcy5weXRob25BcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgfSk7XG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9LFxuICAgICAgLi4uY29tYmluZWRRdWVyaWVzLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiBtZXJnZVNjaGVtYXMoe1xuICAgIHNjaGVtYXM6IFtcbiAgICAgIG5ldyBHcmFwaFFMU2NoZW1hKHtcbiAgICAgICAgcXVlcnk6IFJvb3RRdWVyeSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xufVxuXG4vLyBpZiAoIWV4aXN0c1N5bmMoJ2Rpc3QnKSkge1xuLy8gICBta2RpclN5bmMoJ2Rpc3QnKTtcbi8vIH1cbi8vIHdyaXRlRmlsZVN5bmMoJ2Rpc3Qvc2NoZW1hLmdyYXBocWwnLCBwcmludFNjaGVtYShzY2hlbWEpKTtcbiJdfQ==