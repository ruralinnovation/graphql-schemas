"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
const erc_s3_test = {
    // An array (list) fails to transfer gzipped by local sam cli
    type: // new GraphQLList(
    // ... but a single return object can be gzipped locally
    new type_1.GraphQLObjectType({
        name: 'ERCS3TestObject',
        fields: () => ({
            message: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi } }, info) => {
        const value = {
            "erc_s3_test": {
                "message": "value of a an \"erc_s3_test\" encapsulated property"
            },
            "message": ("value of a top level property"),
            "geoid_co": "33009",
            "name": "pct_bb_25_3",
            "value": 0.8366,
            "category": "bb",
            "variable": "25_3",
            "category_pl": "Broadband",
            "description": "Percent of broadband serviceable locations with access to 25/3",
        };
        return [{
                ...value
            }] // An array (list) fails to transfer gzipped by local sam cli
        [0]; // ... but a single return object can be gzipped locally
    }
};
exports.default = erc_s3_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zY2hlbWEvcXVlcmllcy9lcmMvZXJjX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0U7QUFFaEUsTUFBTSxXQUFXLEdBQUc7SUFDbEIsNkRBQTZEO0lBQzdELElBQUksRUFBRSxtQkFBbUI7SUFDekIsd0RBQXdEO0lBQ3RELElBQUksd0JBQWlCLENBQUM7UUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ2pDLENBQUM7S0FDSCxDQUFDO0lBQ0osSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBTyxFQUNuQyxJQUFTLEVBQ1QsRUFBRTtRQUVGLE1BQU0sS0FBSyxHQUFHO1lBQ1osYUFBYSxFQUFFO2dCQUNiLFNBQVMsRUFBRSxxREFBcUQ7YUFDakU7WUFDRCxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztZQUM1QyxVQUFVLEVBQUUsT0FBTztZQUNuQixNQUFNLEVBQUUsYUFBYTtZQUNyQixPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLGFBQWEsRUFBRSxXQUFXO1lBQzFCLGFBQWEsRUFBRSxnRUFBZ0U7U0FDaEYsQ0FBQztRQUVGLE9BQU8sQ0FBQztnQkFDSixHQUFHLEtBQUs7YUFDWCxDQUFDLENBQU0sNkRBQTZEO1NBQ2xFLENBQUMsQ0FBQyxDQUFDLENBQUUsd0RBQXdEO0lBQ2xFLENBQUM7Q0FDRixDQUFDO0FBR0Ysa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhRTE9iamVjdFR5cGUsIEdyYXBoUUxTdHJpbmcgfSBmcm9tIFwiZ3JhcGhxbC90eXBlXCI7XG5cbmNvbnN0IGVyY19zM190ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0VSQ1MzVGVzdE9iamVjdCcsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9XG4gICAgICB9KVxuICAgIH0pLFxuICBhcmdzOiBudWxsLFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIF9fOiBhbnksXG4gICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcblxuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgXCJlcmNfczNfdGVzdFwiOiB7XG4gICAgICAgIFwibWVzc2FnZVwiOiBcInZhbHVlIG9mIGEgYW4gXFxcImVyY19zM190ZXN0XFxcIiBlbmNhcHN1bGF0ZWQgcHJvcGVydHlcIlxuICAgICAgfSxcbiAgICAgIFwibWVzc2FnZVwiOiAoXCJ2YWx1ZSBvZiBhIHRvcCBsZXZlbCBwcm9wZXJ0eVwiKSxcbiAgICAgIFwiZ2VvaWRfY29cIjogXCIzMzAwOVwiLFxuICAgICAgXCJuYW1lXCI6IFwicGN0X2JiXzI1XzNcIixcbiAgICAgIFwidmFsdWVcIjogMC44MzY2LFxuICAgICAgXCJjYXRlZ29yeVwiOiBcImJiXCIsXG4gICAgICBcInZhcmlhYmxlXCI6IFwiMjVfM1wiLFxuICAgICAgXCJjYXRlZ29yeV9wbFwiOiBcIkJyb2FkYmFuZFwiLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlBlcmNlbnQgb2YgYnJvYWRiYW5kIHNlcnZpY2VhYmxlIGxvY2F0aW9ucyB3aXRoIGFjY2VzcyB0byAyNS8zXCIsXG4gICAgfTtcblxuICAgIHJldHVybiBbe1xuICAgICAgICAuLi52YWx1ZVxuICAgIH1dICAgICAgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaVxuICAgICAgWzBdOyAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBlcmNfczNfdGVzdDtcbiJdfQ==