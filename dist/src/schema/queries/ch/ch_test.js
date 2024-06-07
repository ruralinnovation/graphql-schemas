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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zY2hlbWEvcXVlcmllcy9jaC9jaF90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQThFO0FBQzlFLHlDQUF5QztBQUN6Qyx5Q0FBa0Q7QUFFbEQsTUFBTSxPQUFPLEdBQUc7SUFDZCw2REFBNkQ7SUFDN0QsSUFBSSxFQUFFLG1CQUFtQjtJQUN6Qix3REFBd0Q7SUFDdEQsSUFBSSx3QkFBaUIsQ0FBQztRQUNwQixJQUFJLEVBQUUsY0FBYztRQUNwQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ25DLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ25DLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQy9CLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBWSxFQUFFO1lBQy9CLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ25DLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ25DLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1lBQ3RDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ3ZDLENBQUM7S0FDSCxDQUFDO0lBQ0osS0FBSztJQUNMLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUNQLEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQU8sRUFDbkMsSUFBUyxFQUNULEVBQUU7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxFQUFHLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUMsQ0FBQztRQUVyRyxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkYsa0JBQWtCO1FBQ2xCLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsb0VBQW9FO1FBQ3BFLE9BQU87UUFDUCxrREFBa0Q7UUFDbEQseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHdCQUF3QjtRQUN4QixnQ0FBZ0M7UUFDaEMscUZBQXFGO1FBQ3JGLEtBQUs7UUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQzs7OztDQUl4QyxFQUNLLEVBQUUsSUFBSSxFQUFFLHNCQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUUvQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDbEQsWUFBWTtnQkFDWixHQUFHLENBQUM7YUFDTCxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUU3QyxPQUFPO2dCQUNMLFlBQVk7Z0JBQ1osR0FBRyxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO2FBQzFCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBTSw2REFBNkQ7U0FDbEUsQ0FBQyxDQUFDLENBQUMsQ0FBRSx3REFBd0Q7SUFDbEUsQ0FBQztDQUNGLENBQUM7QUFHRixrQkFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaFFMRmxvYXQsIEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuLy8gaW1wb3J0IHsgR3JhcGhRTExpc3QgfSBmcm9tIFwiZ3JhcGhxbFwiO1xuaW1wb3J0IHsgUXVlcnlUeXBlcywgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuXG5jb25zdCBjaF90ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0NIVGVzdE9iamVjdCcsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIFwiZ2VvaWRfY29cIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwiZ2VvaWRfdHJcIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwibWVzc2FnZVwiOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfSxcbiAgICAgICAgXCJuYW1lXCI6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICBcInZhbHVlXCI6IHsgdHlwZTogR3JhcGhRTEZsb2F0IH0sXG4gICAgICAgIFwiY2F0ZWdvcnlcIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwidmFyaWFibGVcIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwiY2F0ZWdvcnlfcGxcIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH0sXG4gICAgICB9KVxuICAgIH0pLFxuICAvLyApLFxuICBhcmdzOiBudWxsLFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIF9fOiBhbnksXG4gICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcbiAgICBjb25zb2xlLmxvZyhcIkNhbiBub3cgYWNjZXNzIHB5dGhvbkFwaS5nZXREQkNvbmZpZy4uLlwiLCAgdHlwZW9mIHB5dGhvbkFwaS5nZXREQkNvbmZpZyk7XG4gICAgY29uc3QgY29uZmlnID0gcHl0aG9uQXBpLmdldERCQ29uZmlnKCdwcm9qX2Nvbm5lY3RfaHVtYW5pdHknKVtwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcImRldmVsb3BtZW50XCJdO1xuXG4gICAgY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShjb25maWcuZGF0YWJhc2UsIGNvbmZpZy51c2VyLCBjb25maWcucGFzc3dvcmQsIGNvbmZpZyk7XG5cbiAgICAvLyBjb25zdCB2YWx1ZSA9IHtcbiAgICAvLyAgIC4uLmNvbmZpZyxcbiAgICAvLyAgIFwiYWNzX3Rlc3RcIjoge1xuICAgIC8vICAgICBcIm1lc3NhZ2VcIjogXCJ2YWx1ZSBvZiBhIGFuIFxcXCJhY3NfdGVzdFxcXCIgZW5jYXBzdWxhdGVkIHByb3BlcnR5XCJcbiAgICAvLyAgIH0sXG4gICAgLy8gICBcIm1lc3NhZ2VcIjogKFwidmFsdWUgb2YgYSB0b3AgbGV2ZWwgcHJvcGVydHlcIiksXG4gICAgLy8gICBcImdlb2lkX2NvXCI6IFwiMzMwMDlcIixcbiAgICAvLyAgIFwibmFtZVwiOiBcInBjdF9iYl8yNV8zXCIsXG4gICAgLy8gICBcInZhbHVlXCI6IDAuODM2NixcbiAgICAvLyAgIFwiY2F0ZWdvcnlcIjogXCJiYlwiLFxuICAgIC8vICAgXCJ2YXJpYWJsZVwiOiBcIjI1XzNcIixcbiAgICAvLyAgIFwiY2F0ZWdvcnlfcGxcIjogXCJCcm9hZGJhbmRcIixcbiAgICAvLyAgIFwiZGVzY3JpcHRpb25cIjogXCJQZXJjZW50IG9mIGJyb2FkYmFuZCBzZXJ2aWNlYWJsZSBsb2NhdGlvbnMgd2l0aCBhY2Nlc3MgdG8gMjUvM1wiLFxuICAgIC8vIH07XG5cbiAgICBjb25zb2xlLmxvZyhcIlJlc29sdmUgY2hfdGV0cyBubyBhcmdzOiBcXG5cIiwgX18pO1xuXG4gICAgY29uc3QgdmFsdWVzID0gYXdhaXQgc2VxdWVsaXplLnF1ZXJ5KGBcblNFTEVDVCBnZW9pZCwgZ2VvaWRfdHIsIENPTkNBVChzdGF0ZWZwLCBjb3VudHlmcCkgYXMgZ2VvaWRfY28sIHBjdF9iYl8yNV8zLCBzdF9zaW1wbGlmeShzdF90cmFuc2Zvcm0oZ2VvbSwgNDMyNiksIDAuMCkgYXMgZ2VvbVxuICAgIEZST00gc2NoX2NlbnN1c190aWdlci5zb3VyY2VfdGlnZXJfMjAyMF90cmFjdHMsIHByb2pfY2xpbWF0ZS5jaF9hcHBfd2lkZV90cmFjdFxuICAgIFdIRVJFIHN0YXRlZnAgPSAnMzMnIEFORCBjb3VudHlmcCA9ICcwMDknIEFORCBnZW9pZCA9IGdlb2lkX3RyO1xuYCxcbiAgICAgIHsgdHlwZTogUXVlcnlUeXBlcy5TRUxFQ1QgfSk7XG5cbiAgICByZXR1cm4gdmFsdWVzLm1hcCh2ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2hfdGVzdCByZXNvbHZlciB3aWxsIHJldHVybiB2YWx1ZTogXCIsIHtcbiAgICAgICAgLy8gLi4udmFsdWUsXG4gICAgICAgIC4uLnZcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coXCJwY3RfYmJfMjVfM1wiLCB2W1wicGN0X2JiXzI1XzNcIl0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyAuLi52YWx1ZSxcbiAgICAgICAgLi4udixcbiAgICAgICAgXCJ2YWx1ZVwiOiB2W1wicGN0X2JiXzI1XzNcIl1cbiAgICAgIH07XG4gICAgfSkgICAgICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gICAgICBbMF07ICAvLyAuLi4gYnV0IGEgc2luZ2xlIHJldHVybiBvYmplY3QgY2FuIGJlIGd6aXBwZWQgbG9jYWxseVxuICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNoX3Rlc3Q7XG4iXX0=