"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const geojson_1 = require("./schema/geojson");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utc2NoZW1hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJnZS1zY2hlbWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQXFEO0FBQ3JELHFDQU1pQjtBQUNqQiw4Q0FBdUM7QUFFdkMsbUJBQXlCLE9BQWM7SUFDckMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbkUsT0FBTztZQUNMLEdBQUcsR0FBRztZQUNOLEdBQUcsS0FBSztTQUNULENBQUM7SUFDSixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFHUCxNQUFNLFNBQVMsR0FBRyxJQUFJLDJCQUFpQixDQUFDO1FBQ3RDLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsaUJBQU8sQ0FBQyxpQkFBaUI7Z0JBQy9CLElBQUksRUFBRSxTQUFTO2dCQUNmLGlHQUFpRztnQkFDakcsT0FBTyxFQUFFLENBQUMsQ0FBVSxFQUFFLEVBQVcsRUFBRSxFQUFFLFdBQVcsRUFBTyxFQUFFLEVBQUU7b0JBQ3pELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7YUFDRjtZQUNELHdCQUF3QjtZQUN4QiwyQ0FBMkM7WUFDM0MsWUFBWTtZQUNaLGVBQWU7WUFDZiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxrQkFBa0I7WUFDbEIsOENBQThDO1lBQzlDLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIsNkJBQTZCO1lBQzdCLFNBQVM7WUFDVCxtQkFBbUI7WUFDbkIsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixRQUFRO1lBQ1IsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLFdBQVc7WUFDWCx1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsU0FBUztZQUNULHFFQUFxRTtZQUNyRSx5Q0FBeUM7WUFDekMsb0VBQW9FO1lBQ3BFLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QixrR0FBa0c7WUFDbEcsaUZBQWlGO1lBQ2pGLDRHQUE0RztZQUM1RyxnQkFBZ0I7WUFDaEIsZUFBZTtZQUNmLHlCQUF5QjtZQUN6Qiw0RkFBNEY7WUFDNUYsVUFBVTtZQUNWLHNDQUFzQztZQUN0QyxvQ0FBb0M7WUFDcEMsZ0RBQWdEO1lBQ2hELDJFQUEyRTtZQUMzRSx1Q0FBdUM7WUFDdkMsbUZBQW1GO1lBQ25GLDRHQUE0RztZQUM1RyxtQkFBbUI7WUFDbkIsbUdBQW1HO1lBQ25HLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsc0NBQXNDO1lBQ3RDLDJFQUEyRTtZQUMzRSxpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLHdDQUF3QztZQUN4QyxjQUFjO1lBQ2QsYUFBYTtZQUNiLDRCQUE0QjtZQUM1Qix1Q0FBdUM7WUFDdkMsMEJBQTBCO1lBQzFCLGFBQWE7WUFDYixXQUFXO1lBQ1gsUUFBUTtZQUNSLE9BQU87WUFDUCxLQUFLO1lBQ0wsb0JBQW9CO1lBQ3BCLDJDQUEyQztZQUMzQyxZQUFZO1lBQ1osZUFBZTtZQUNmLDZFQUE2RTtZQUM3RSw4QkFBOEI7WUFDOUIsU0FBUztZQUNULGtCQUFrQjtZQUNsQiw2RUFBNkU7WUFDN0UsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixnRUFBZ0U7WUFDaEUscUVBQXFFO1lBQ3JFLHlDQUF5QztZQUN6Qyx3R0FBd0c7WUFDeEcsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxnRkFBZ0Y7WUFDaEYsa0dBQWtHO1lBQ2xHLFVBQVU7WUFDVixPQUFPO1lBQ1AsS0FBSztZQUNMLEdBQUcsZUFBZTtTQUNuQjtLQUNGLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBQSxxQkFBWSxFQUFDO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLElBQUksdUJBQWEsQ0FBQztnQkFDaEIsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQztTQUNIO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9IRCw0QkErSEM7QUFFRCw2QkFBNkI7QUFDN0IsdUJBQXVCO0FBQ3ZCLElBQUk7QUFDSiw2REFBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtZXJnZVNjaGVtYXMgfSBmcm9tICdAZ3JhcGhxbC10b29scy9zY2hlbWEnO1xuaW1wb3J0IHtcbiAgLy8gR3JhcGhRTEJvb2xlYW4sXG4gIC8vIEdyYXBoUUxMaXN0LFxuICBHcmFwaFFMT2JqZWN0VHlwZSxcbiAgR3JhcGhRTFNjaGVtYSxcbiAgLy8gR3JhcGhRTFN0cmluZ1xufSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBHZW9KU09OIGZyb20gJy4vc2NoZW1hL2dlb2pzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocXVlcmllczogW2FueV0pIHtcbiAgY29uc3QgY29tYmluZWRRdWVyaWVzID0gT2JqZWN0LnZhbHVlcyhxdWVyaWVzKS5yZWR1Y2UoKG9iaiwgcXVlcnkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ub2JqLFxuICAgICAgLi4ucXVlcnksXG4gICAgfTtcbiAgfSwge30pO1xuXG5cbiAgY29uc3QgUm9vdFF1ZXJ5ID0gbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnUm9vdFF1ZXJ5VHlwZScsXG4gICAgZmllbGRzOiB7XG4gICAgICBzZXR1cDoge1xuICAgICAgICB0eXBlOiBHZW9KU09OLkdlb21ldHJ5VHlwZVVuaW9uLFxuICAgICAgICBhcmdzOiB1bmRlZmluZWQsXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgcmVzb2x2ZTogKF86IHVua25vd24sIF9fOiB1bmtub3duLCB7IGRhdGFTb3VyY2VzIH06IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIC8vIGZlYXR1cmVfY29sbGVjdGlvbjoge1xuICAgICAgLy8gICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgICAgLy8gICBhcmdzOiB7XG4gICAgICAvLyAgICAgdGFibGU6IHtcbiAgICAgIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIGNvdW50aWVzOiB7XG4gICAgICAvLyAgICAgICB0eXBlOiBuZXcgR3JhcGhRTExpc3QoR3JhcGhRTFN0cmluZyksXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICBzdGF0ZV9hYmJyOiB7XG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nLFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAgc2tpcENhY2hlOiB7XG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMQm9vbGVhbixcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICByZXNvbHZlOiBhc3luYyAoXG4gICAgICAvLyAgICAgXzogdW5rbm93bixcbiAgICAgIC8vICAgICB7XG4gICAgICAvLyAgICAgICB0YWJsZSxcbiAgICAgIC8vICAgICAgIHN0YXRlX2FiYnIsXG4gICAgICAvLyAgICAgICBjb3VudGllcyxcbiAgICAgIC8vICAgICAgIHNraXBDYWNoZSxcbiAgICAgIC8vICAgICB9OiB7XG4gICAgICAvLyAgICAgICB0YWJsZTogc3RyaW5nO1xuICAgICAgLy8gICAgICAgc3RhdGVfYWJicjogc3RyaW5nO1xuICAgICAgLy8gICAgICAgY291bnRpZXM6IHN0cmluZ1tdO1xuICAgICAgLy8gICAgICAgc2tpcENhY2hlOiBib29sZWFuO1xuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIC8vICAgICB7IGRhdGFTb3VyY2VzLCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgLy8gICAgIGluZm86IHVua25vd25cbiAgICAgIC8vICAgKSA9PiB7XG4gICAgICAvLyAgICAgaWYgKHN0YXRlX2FiYnIpIHtcbiAgICAgIC8vICAgICAgIHJldHVybiBza2lwQ2FjaGVcbiAgICAgIC8vICAgICAgICAgPyBhd2FpdCBkYXRhU291cmNlcy5weXRob25BcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApXG4gICAgICAvLyAgICAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtzdGF0ZV9hYmJyfWAsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBhd2FpdCBkYXRhU291cmNlcy5weXRob25BcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP3N0YXRlX2FiYnI9JHtzdGF0ZV9hYmJyfWApO1xuICAgICAgLy8gICAgICAgICAgIH0pO1xuICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgICBpZiAoIWNvdW50aWVzKSB7XG4gICAgICAvLyAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2hlbiBubyBzdGF0ZSBhYmJyIGlzIHNwZWNpZmllZCB5b3UgTVVTdCBmaWx0ZXIgYnkgc3RhdGVfYWJicicpO1xuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgICAgcmV0dXJuIGF3YWl0IGNvdW50aWVzLnJlZHVjZShcbiAgICAgIC8vICAgICAgICAgYXN5bmMgKGZjLCBnZW9pZF9jbykgPT4ge1xuICAgICAgLy8gICAgICAgICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gYXdhaXQgZmM7XG4gICAgICAvLyAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIC8vICAgICAgICAgICBjb25zdCByZXM6IGFueSA9IHNraXBDYWNoZVxuICAgICAgLy8gICAgICAgICAgICAgPyBhd2FpdCByZWRpc0NsaWVudC5jaGVja0NhY2hlKGAke3RhYmxlfS0ke2dlb2lkX2NvfWAsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZGF0YVNvdXJjZXMucHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvJHt0YWJsZX0vZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgLy8gICAgICAgICAgICAgICB9KVxuICAgICAgLy8gICAgICAgICAgICAgOiBhd2FpdCBkYXRhU291cmNlcy5weXRob25BcGkuZ2V0SXRlbShgYmNhdC8ke3RhYmxlfS9nZW9qc29uP2dlb2lkX2NvPSR7Z2VvaWRfY299YCk7XG4gICAgICAvLyAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgIC8vICAgICAgICAgICAgICAgLi4uZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICAvLyAgICAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlQ29sbGVjdGlvbi5mZWF0dXJlcy5jb25jYXQocmVzLmZlYXR1cmVzKSxcbiAgICAgIC8vICAgICAgICAgICAgIH07XG4gICAgICAvLyAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBmZWF0dXJlQ29sbGVjdGlvbjtcbiAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAvLyAgICAgICAgIH0sXG4gICAgICAvLyAgICAgICAgIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAvLyAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgIC8vICAgICAgICAgICBmZWF0dXJlczogW10sXG4gICAgICAvLyAgICAgICAgIH0pXG4gICAgICAvLyAgICAgICApO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyBjb3VudHlfZmVhdHVyZToge1xuICAgICAgLy8gICB0eXBlOiBHZW9KU09OLkZlYXR1cmVDb2xsZWN0aW9uT2JqZWN0LFxuICAgICAgLy8gICBhcmdzOiB7XG4gICAgICAvLyAgICAgdGFibGU6IHtcbiAgICAgIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAvLyAgICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIGdlb2lkX2NvOiB7XG4gICAgICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgLy8gICAgICAgdHlwZTogR3JhcGhRTFN0cmluZyEsXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgLy8gICAgIF86IHVua25vd24sXG4gICAgICAvLyAgICAgeyB0YWJsZSwgZ2VvaWRfY28gfTogeyB0YWJsZTogc3RyaW5nOyBnZW9pZF9jbzogc3RyaW5nIH0sXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIC8vICAgICB7IGRhdGFTb3VyY2VzLCByZWRpc0NsaWVudCB9OiBhbnksXG4gICAgICAvLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycywgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgLy8gICAgIGluZm86IGFueVxuICAgICAgLy8gICApID0+IHtcbiAgICAgIC8vICAgICByZXR1cm4gYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgJHt0YWJsZX0tJHtnZW9pZF9jb31gLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyAgICAgICByZXR1cm4gYXdhaXQgZGF0YVNvdXJjZXMucHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvJHt0YWJsZX0vZ2VvanNvbj9nZW9pZF9jbz0ke2dlb2lkX2NvfWApO1xuICAgICAgLy8gICAgIH0pO1xuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICAgIC4uLmNvbWJpbmVkUXVlcmllcyxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gbWVyZ2VTY2hlbWFzKHtcbiAgICBzY2hlbWFzOiBbXG4gICAgICBuZXcgR3JhcGhRTFNjaGVtYSh7XG4gICAgICAgIHF1ZXJ5OiBSb290UXVlcnksXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbn1cblxuLy8gaWYgKCFleGlzdHNTeW5jKCdkaXN0JykpIHtcbi8vICAgbWtkaXJTeW5jKCdkaXN0Jyk7XG4vLyB9XG4vLyB3cml0ZUZpbGVTeW5jKCdkaXN0L3NjaGVtYS5ncmFwaHFsJywgcHJpbnRTY2hlbWEoc2NoZW1hKSk7XG4iXX0=