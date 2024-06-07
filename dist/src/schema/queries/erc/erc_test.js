"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
// TODO: Add S3 fetch logic...
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJjX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2NoZW1hL3F1ZXJpZXMvZXJjL2VyY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWdFO0FBRWhFLDhCQUE4QjtBQUU5QixNQUFNLFdBQVcsR0FBRztJQUNsQiw2REFBNkQ7SUFDN0QsSUFBSSxFQUFFLG1CQUFtQjtJQUN6Qix3REFBd0Q7SUFDdEQsSUFBSSx3QkFBaUIsQ0FBQztRQUNwQixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7U0FDakMsQ0FBQztLQUNILENBQUM7SUFDSixJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRSxLQUFLLEVBQ1osQ0FBTSxFQUNOLEVBQU8sRUFDUCxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFPLEVBQ25DLElBQVMsRUFDVCxFQUFFO1FBRUYsTUFBTSxLQUFLLEdBQUc7WUFDWixhQUFhLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLHFEQUFxRDthQUNqRTtZQUNELFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1lBQzVDLFVBQVUsRUFBRSxPQUFPO1lBQ25CLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLE1BQU07WUFDbEIsYUFBYSxFQUFFLFdBQVc7WUFDMUIsYUFBYSxFQUFFLGdFQUFnRTtTQUNoRixDQUFDO1FBRUYsT0FBTyxDQUFDO2dCQUNKLEdBQUcsS0FBSzthQUNYLENBQUMsQ0FBTSw2REFBNkQ7U0FDbEUsQ0FBQyxDQUFDLENBQUMsQ0FBRSx3REFBd0Q7SUFDbEUsQ0FBQztDQUNGLENBQUM7QUFHRixrQkFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaFFMT2JqZWN0VHlwZSwgR3JhcGhRTFN0cmluZyB9IGZyb20gXCJncmFwaHFsL3R5cGVcIjtcblxuLy8gVE9ETzogQWRkIFMzIGZldGNoIGxvZ2ljLi4uXG5cbmNvbnN0IGVyY19zM190ZXN0ID0ge1xuICAvLyBBbiBhcnJheSAobGlzdCkgZmFpbHMgdG8gdHJhbnNmZXIgZ3ppcHBlZCBieSBsb2NhbCBzYW0gY2xpXG4gIHR5cGU6IC8vIG5ldyBHcmFwaFFMTGlzdChcbiAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgICBuZXcgR3JhcGhRTE9iamVjdFR5cGUoe1xuICAgICAgbmFtZTogJ0VSQ1MzVGVzdE9iamVjdCcsXG4gICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9XG4gICAgICB9KVxuICAgIH0pLFxuICBhcmdzOiBudWxsLFxuICByZXNvbHZlOiBhc3luYyAoXG4gICAgXzogYW55LFxuICAgIF9fOiBhbnksXG4gICAgeyBkYXRhU291cmNlczogeyBweXRob25BcGkgfSB9OiBhbnksXG4gICAgaW5mbzogYW55XG4gICkgPT4gIHtcblxuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgXCJlcmNfczNfdGVzdFwiOiB7XG4gICAgICAgIFwibWVzc2FnZVwiOiBcInZhbHVlIG9mIGEgYW4gXFxcImVyY19zM190ZXN0XFxcIiBlbmNhcHN1bGF0ZWQgcHJvcGVydHlcIlxuICAgICAgfSxcbiAgICAgIFwibWVzc2FnZVwiOiAoXCJ2YWx1ZSBvZiBhIHRvcCBsZXZlbCBwcm9wZXJ0eVwiKSxcbiAgICAgIFwiZ2VvaWRfY29cIjogXCIzMzAwOVwiLFxuICAgICAgXCJuYW1lXCI6IFwicGN0X2JiXzI1XzNcIixcbiAgICAgIFwidmFsdWVcIjogMC44MzY2LFxuICAgICAgXCJjYXRlZ29yeVwiOiBcImJiXCIsXG4gICAgICBcInZhcmlhYmxlXCI6IFwiMjVfM1wiLFxuICAgICAgXCJjYXRlZ29yeV9wbFwiOiBcIkJyb2FkYmFuZFwiLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlBlcmNlbnQgb2YgYnJvYWRiYW5kIHNlcnZpY2VhYmxlIGxvY2F0aW9ucyB3aXRoIGFjY2VzcyB0byAyNS8zXCIsXG4gICAgfTtcblxuICAgIHJldHVybiBbe1xuICAgICAgICAuLi52YWx1ZVxuICAgIH1dICAgICAgLy8gQW4gYXJyYXkgKGxpc3QpIGZhaWxzIHRvIHRyYW5zZmVyIGd6aXBwZWQgYnkgbG9jYWwgc2FtIGNsaVxuICAgICAgWzBdOyAgLy8gLi4uIGJ1dCBhIHNpbmdsZSByZXR1cm4gb2JqZWN0IGNhbiBiZSBnemlwcGVkIGxvY2FsbHlcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBlcmNfczNfdGVzdDtcbiJdfQ==