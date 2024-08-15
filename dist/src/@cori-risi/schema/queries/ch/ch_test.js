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
    resolve: async (_, __, { dataSources: { restApi } }, info) => {
        console.log("Can now access restApi.getDBConfig...", typeof restApi.getDBConfig);
        const config = restApi.getDBConfig('proj_connect_humanity')[process.env.NODE_ENV || "development"];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL2NoL2NoX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBOEU7QUFDOUUseUNBQXlDO0FBQ3pDLHlDQUFrRDtBQUVsRCxNQUFNLE9BQU8sR0FBRztJQUNkLDZEQUE2RDtJQUM3RCxJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLHdEQUF3RDtJQUN0RCxJQUFJLHdCQUFpQixDQUFDO1FBQ3BCLElBQUksRUFBRSxjQUFjO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDL0IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLG1CQUFZLEVBQUU7WUFDL0IsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDbkMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDdEMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7U0FDdkMsQ0FBQztLQUNILENBQUM7SUFDSixLQUFLO0lBQ0wsSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFBRSxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBTyxFQUNqQyxJQUFTLEVBQ1QsRUFBRTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUcsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEYsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUFDO1FBRW5HLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV2RixrQkFBa0I7UUFDbEIsZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixvRUFBb0U7UUFDcEUsT0FBTztRQUNQLGtEQUFrRDtRQUNsRCx5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLGdDQUFnQztRQUNoQyxxRkFBcUY7UUFDckYsS0FBSztRQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDOzs7O0NBSXhDLEVBQ0ssRUFBRSxJQUFJLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFO2dCQUNsRCxZQUFZO2dCQUNaLEdBQUcsQ0FBQzthQUNMLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRTdDLE9BQU87Z0JBQ0wsWUFBWTtnQkFDWixHQUFHLENBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7YUFDMUIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFNLDZEQUE2RDtTQUNsRSxDQUFDLENBQUMsQ0FBQyxDQUFFLHdEQUF3RDtJQUNsRSxDQUFDO0NBQ0YsQ0FBQztBQUdGLGtCQUFlLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoUUxGbG9hdCwgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG4vLyBpbXBvcnQgeyBHcmFwaFFMTGlzdCB9IGZyb20gXCJncmFwaHFsXCI7XG5pbXBvcnQgeyBRdWVyeVR5cGVzLCBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5cbmNvbnN0IGNoX3Rlc3QgPSB7XG4gIC8vIEFuIGFycmF5IChsaXN0KSBmYWlscyB0byB0cmFuc2ZlciBnemlwcGVkIGJ5IGxvY2FsIHNhbSBjbGlcbiAgdHlwZTogLy8gbmV3IEdyYXBoUUxMaXN0KFxuICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICAgIG5ldyBHcmFwaFFMT2JqZWN0VHlwZSh7XG4gICAgICBuYW1lOiAnQ0hUZXN0T2JqZWN0JyxcbiAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgXCJnZW9pZF9jb1wiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJnZW9pZF90clwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJtZXNzYWdlXCI6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICBcIm5hbWVcIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwidmFsdWVcIjogeyB0eXBlOiBHcmFwaFFMRmxvYXQgfSxcbiAgICAgICAgXCJjYXRlZ29yeVwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJ2YXJpYWJsZVwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJjYXRlZ29yeV9wbFwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgIH0pXG4gICAgfSksXG4gIC8vICksXG4gIGFyZ3M6IG51bGwsXG4gIHJlc29sdmU6IGFzeW5jIChcbiAgICBfOiBhbnksXG4gICAgX186IGFueSxcbiAgICB7IGRhdGFTb3VyY2VzOiB7IHJlc3RBcGkgfSB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcbiAgICBjb25zb2xlLmxvZyhcIkNhbiBub3cgYWNjZXNzIHJlc3RBcGkuZ2V0REJDb25maWcuLi5cIiwgIHR5cGVvZiByZXN0QXBpLmdldERCQ29uZmlnKTtcbiAgICBjb25zdCBjb25maWcgPSByZXN0QXBpLmdldERCQ29uZmlnKCdwcm9qX2Nvbm5lY3RfaHVtYW5pdHknKVtwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcImRldmVsb3BtZW50XCJdO1xuXG4gICAgY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShjb25maWcuZGF0YWJhc2UsIGNvbmZpZy51c2VyLCBjb25maWcucGFzc3dvcmQsIGNvbmZpZyk7XG5cbiAgICAvLyBjb25zdCB2YWx1ZSA9IHtcbiAgICAvLyAgIC4uLmNvbmZpZyxcbiAgICAvLyAgIFwiYWNzX3Rlc3RcIjoge1xuICAgIC8vICAgICBcIm1lc3NhZ2VcIjogXCJ2YWx1ZSBvZiBhIGFuIFxcXCJhY3NfdGVzdFxcXCIgZW5jYXBzdWxhdGVkIHByb3BlcnR5XCJcbiAgICAvLyAgIH0sXG4gICAgLy8gICBcIm1lc3NhZ2VcIjogKFwidmFsdWUgb2YgYSB0b3AgbGV2ZWwgcHJvcGVydHlcIiksXG4gICAgLy8gICBcImdlb2lkX2NvXCI6IFwiMzMwMDlcIixcbiAgICAvLyAgIFwibmFtZVwiOiBcInBjdF9iYl8yNV8zXCIsXG4gICAgLy8gICBcInZhbHVlXCI6IDAuODM2NixcbiAgICAvLyAgIFwiY2F0ZWdvcnlcIjogXCJiYlwiLFxuICAgIC8vICAgXCJ2YXJpYWJsZVwiOiBcIjI1XzNcIixcbiAgICAvLyAgIFwiY2F0ZWdvcnlfcGxcIjogXCJCcm9hZGJhbmRcIixcbiAgICAvLyAgIFwiZGVzY3JpcHRpb25cIjogXCJQZXJjZW50IG9mIGJyb2FkYmFuZCBzZXJ2aWNlYWJsZSBsb2NhdGlvbnMgd2l0aCBhY2Nlc3MgdG8gMjUvM1wiLFxuICAgIC8vIH07XG5cbiAgICBjb25zb2xlLmxvZyhcIlJlc29sdmUgY2hfdGV0cyBubyBhcmdzOiBcXG5cIiwgX18pO1xuXG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgc2VxdWVsaXplLnF1ZXJ5KGBcblNFTEVDVCBnZW9pZCwgZ2VvaWRfdHIsIENPTkNBVChzdGF0ZWZwLCBjb3VudHlmcCkgYXMgZ2VvaWRfY28sIHBjdF9iYl8yNV8zLCBzdF9zaW1wbGlmeShzdF90cmFuc2Zvcm0oZ2VvbSwgNDMyNiksIDAuMCkgYXMgZ2VvbVxuICAgIEZST00gc2NoX2NlbnN1c190aWdlci5zb3VyY2VfdGlnZXJfMjAyMF90cmFjdHMsIHByb2pfY2xpbWF0ZS5jaF9hcHBfd2lkZV90cmFjdFxuICAgIFdIRVJFIHN0YXRlZnAgPSAnMzMnIEFORCBjb3VudHlmcCA9ICcwMDknIEFORCBnZW9pZCA9IGdlb2lkX3RyO1xuYCxcbiAgICAgIHsgdHlwZTogUXVlcnlUeXBlcy5TRUxFQ1QgfSk7XG5cbiAgICByZXR1cm4gdmFsdWVzLm1hcCh2ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hfdGVzdCByZXNvbHZlciB3aWxsIHJldHVybiB2YWx1ZTogXCIsIHtcbiAgICAgICAgLy8gLi4udmFsdWUsXG4gICAgICAgIC4uLnZcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coXCJwY3RfYmJfMjVfM1wiLCB2W1wicGN0X2JiXzI1XzNcIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyAuLi52YWx1ZSxcbiAgICAgICAgLi4udixcbiAgICAgICAgXCJ2YWx1ZVwiOiB2W1wicGN0X2JiXzI1XzNcIl1cbiAgICAgIH07XG4gICAgfSkgICAgICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gICAgICBbMF07ICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNoX3Rlc3Q7XG4iXX0=