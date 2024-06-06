"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
// import { GraphQLList } from "graphql";
const sequelize_1 = require("sequelize");
const ch_test = {
    // An array (list) fails to transfer gzipped by local sam cli
    type: // new GraphQLList(
    // ... but a single return object can be gzipped locally
    new type_1.GraphQLObjectType({
        name: 'CHTestObject',
        fields: () => ({
            "geoid_co": { type: type_1.GraphQLString },
            "geoid_tr": { type: type_1.GraphQLString },
            "message": { type: type_1.GraphQLString },
            "name": { type: type_1.GraphQLString },
            "value": { type: type_1.GraphQLFloat },
            "category": { type: type_1.GraphQLString },
            "variable": { type: type_1.GraphQLString },
            "category_pl": { type: type_1.GraphQLString },
            "description": { type: type_1.GraphQLString },
        })
    }),
    // ),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi } }, info) => {
        console.log("Can now access pythonApi.getDBConfig...", typeof pythonApi.getDBConfig);
        const config = pythonApi.getDBConfig('proj_connect_humanity')[process.env.NODE_ENV || "development"];
        const sequelize = new sequelize_1.Sequelize(config.database, config.user, config.password, config);
        // const value = {
        //   ...config,
        //   "acs_test": {
        //     "message": "value of a an \"acs_test\" encapsulated property"
        //   },
        //   "message": ("value of a top level property"),
        //   "geoid_co": "33009",
        //   "name": "pct_bb_25_3",
        //   "value": 0.8366,
        //   "category": "bb",
        //   "variable": "25_3",
        //   "category_pl": "Broadband",
        //   "description": "Percent of broadband serviceable locations with access to 25/3",
        // };
        console.log("Resolve ch_tets no args: \n", __);
        const values = await sequelize.query(`
SELECT geoid, geoid_tr, CONCAT(statefp, countyfp) as geoid_co, pct_bb_25_3, st_simplify(st_transform(geom, 4326), 0.0) as geom
    FROM sch_census_tiger.source_tiger_2020_tracts, proj_climate.ch_app_wide_tract
    WHERE statefp = '33' AND countyfp = '009' AND geoid = geoid_tr;
`, { type: sequelize_1.QueryTypes.SELECT });
        return values.map(v => {
            console.log("ch_test resolver will return value: ", {
                // ...value,
                ...v
            });
            console.log("pct_bb_25_3", v["pct_bb_25_3"]);
            return {
                // ...value,
                ...v,
                "value": v["pct_bb_25_3"]
            };
        }) // An array (list) fails to transfer gzipped by local sam cli
        [0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = ch_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NjaGVtYS9xdWVyaWVzL2NoL2NoX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBOEU7QUFDOUUseUNBQXlDO0FBQ3pDLHlDQUFrRDtBQUVsRCxNQUFNLE9BQU8sR0FBRztJQUNkLDZEQUE2RDtJQUM3RCxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLHdEQUF3RDtJQUN0RCxJQUFJLHdCQUFpQixDQUFDO1FBQ3BCLElBQUksRUFBRSxjQUFjO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDL0IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFZLEVBQUU7WUFDL0IsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDdEMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7U0FDdkMsQ0FBQztLQUNILENBQUM7SUFDSixLQUFLO0lBQ0wsSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBTyxFQUNuQyxJQUFTLEVBQ1QsRUFBRTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUcsT0FBTyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDO1FBRXJHLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV2RixrQkFBa0I7UUFDbEIsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixvRUFBb0U7UUFDcEUsT0FBTztRQUNQLGtEQUFrRDtRQUNsRCx5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLGdDQUFnQztRQUNoQyxxRkFBcUY7UUFDckYsS0FBSztRQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDOzs7O0NBSXhDLEVBQ0ssRUFBRSxJQUFJLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFO2dCQUNsRCxZQUFZO2dCQUNaLEdBQUcsQ0FBQzthQUNMLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRTdDLE9BQU87Z0JBQ0wsWUFBWTtnQkFDWixHQUFHLENBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7YUFDMUIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFNLDZEQUE2RDtTQUNsRSxDQUFDLENBQUMsQ0FBQyxDQUFFLHdEQUF3RDtJQUNsRSxDQUFDO0NBQ0YsQ0FBQztBQUdGLGtCQUFlLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoUUxGbG9hdCwgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG4vLyBpbXBvcnQgeyBHcmFwaFFMTGlzdCB9IGZyb20gXCJncmFwaHFsXCI7XG5pbXBvcnQgeyBRdWVyeVR5cGVzLCBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5cbmNvbnN0IGNoX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnQ0hUZXN0T2JqZWN0JyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgXCJnZW9pZF9jb1wiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJnZW9pZF90clwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJtZXNzYWdlXCI6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICBcIm5hbWVcIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwidmFsdWVcIjogeyB0eXBlOiBHcmFwaFFMRmxvYXQgfSxcbiAgICAgICAgXCJjYXRlZ29yeVwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJ2YXJpYWJsZVwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJjYXRlZ29yeV9wbFwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIC8vICksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHB5dGhvbkFwaSB9IH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiAge1xuICAgIGNvbnNvbGUubG9nKFwiQ2FuIG5vdyBhY2Nlc3MgcHl0aG9uQXBpLmdldERCQ29uZmlnLi4uXCIsICB0eXBlb2YgcHl0aG9uQXBpLmdldERCQ29uZmlnKTtcbiAgICBjb25zdCBjb25maWcgPSBweXRob25BcGkuZ2V0REJDb25maWcoJ3Byb2pfY29ubmVjdF9odW1hbml0eScpW3Byb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIl07XG5cbiAgICBjb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGNvbmZpZy5kYXRhYmFzZSwgY29uZmlnLnVzZXIsIGNvbmZpZy5wYXNzd29yZCwgY29uZmlnKTtcblxuICAgIC8vIGNvbnN0IHZhbHVlID0ge1xuICAgIC8vICAgLi4uY29uZmlnLFxuICAgIC8vICAgXCJhY3NfdGVzdFwiOiB7XG4gICAgLy8gICAgIFwibWVzc2FnZVwiOiBcInZhbHVlIG9mIGEgYW4gXFxcImFjc190ZXN0XFxcIiBlbmNhcHN1bGF0ZWQgcHJvcGVydHlcIlxuICAgIC8vICAgfSxcbiAgICAvLyAgIFwibWVzc2FnZVwiOiAoXCJ2YWx1ZSBvZiBhIHRvcCBsZXZlbCBwcm9wZXJ0eVwiKSxcbiAgICAvLyAgIFwiZ2VvaWRfY29cIjogXCIzMzAwOVwiLFxuICAgIC8vICAgXCJuYW1lXCI6IFwicGN0X2JiXzI1XzNcIixcbiAgICAvLyAgIFwidmFsdWVcIjogMC44MzY2LFxuICAgIC8vICAgXCJjYXRlZ29yeVwiOiBcImJiXCIsXG4gICAgLy8gICBcInZhcmlhYmxlXCI6IFwiMjVfM1wiLFxuICAgIC8vICAgXCJjYXRlZ29yeV9wbFwiOiBcIkJyb2FkYmFuZFwiLFxuICAgIC8vICAgXCJkZXNjcmlwdGlvblwiOiBcIlBlcmNlbnQgb2YgYnJvYWRiYW5kIHNlcnZpY2VhYmxlIGxvY2F0aW9ucyB3aXRoIGFjY2VzcyB0byAyNS8zXCIsXG4gICAgLy8gfTtcblxuICAgIGNvbnNvbGUubG9nKFwiUmVzb2x2ZSBjaF90ZXRzIG5vIGFyZ3M6IFxcblwiLCBfXyk7XG5cbiAgICBjb25zdCB2YWx1ZXMgPSBhd2FpdCBzZXF1ZWxpemUucXVlcnkoYFxuU0VMRUNUIGdlb2lkLCBnZW9pZF90ciwgQ09OQ0FUKHN0YXRlZnAsIGNvdW50eWZwKSBhcyBnZW9pZF9jbywgcGN0X2JiXzI1XzMsIHN0X3NpbXBsaWZ5KHN0X3RyYW5zZm9ybShnZW9tLCA0MzI2KSwgMC4wKSBhcyBnZW9tXG4gICAgRlJPTSBzY2hfY2Vuc3VzX3RpZ2VyLnNvdXJjZV90aWdlcl8yMDIwX3RyYWN0cywgcHJval9jbGltYXRlLmNoX2FwcF93aWRlX3RyYWN0XG4gICAgV0hFUkUgc3RhdGVmcCA9ICczMycgQU5EIGNvdW50eWZwID0gJzAwOScgQU5EIGdlb2lkID0gZ2VvaWRfdHI7XG5gLFxuICAgICAgeyB0eXBlOiBRdWVyeVR5cGVzLlNFTEVDVCB9KTtcblxuICAgIHJldHVybiB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJjaF90ZXN0IHJlc29sdmVyIHdpbGwgcmV0dXJuIHZhbHVlOiBcIiwge1xuICAgICAgICAvLyAuLi52YWx1ZSxcbiAgICAgICAgLi4udlxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhcInBjdF9iYl8yNV8zXCIsIHZbXCJwY3RfYmJfMjVfM1wiXSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC8vIC4uLnZhbHVlLFxuICAgICAgICAuLi52LFxuICAgICAgICBcInZhbHVlXCI6IHZbXCJwY3RfYmJfMjVfM1wiXVxuICAgICAgfTtcbiAgICB9KSAgICAgIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgICAgIFswXTsgIC8vIC4uLiBidXQgYSBzaW5nbGUgcmV0dXJuIG9iamVjdCBjYW4gYmUgZ3ppcHBlZCBsb2NhbGx5XG4gIH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgY2hfdGVzdDtcbiJdfQ==