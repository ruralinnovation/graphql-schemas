"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
const definition_1 = require("graphql/type/definition");
const types_1 = require("../../types");
const S3ListData_1 = require("./S3ListData");
const s3_list_data = {
    type: new type_1.GraphQLObjectType({
        name: 'S3ListData',
        fields: () => ({
            list: { type: new definition_1.GraphQLNonNull(new definition_1.GraphQLList(new definition_1.GraphQLNonNull(types_1.JSONObject))) },
            test: { type: types_1.JSONObject }, // <-- object containing results of all tests
            // <-- run by the resolver stored as:
            // <-- { "test description": true | false }
            type: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, // { ...args }: { arg: type, ... }
    { dataSources: { restApi, s3DataSource } }, info) => {
        console.log("Resolve S3ListData...", {
            restApi,
            s3DataSource
        });
        // return ({
        //     "type": "s3_list_data",
        //     "list": [],
        //     "test": test
        // });
        return (await (0, S3ListData_1.default)("cori-risi-apps"));
    }
};
exports.default = s3_list_data;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczNfbGlzdF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMvczMvczNfbGlzdF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQWdFO0FBQ2hFLHdEQUF5RjtBQUN6Rix1Q0FBeUM7QUFDekMsNkNBQXNDO0FBRXRDLE1BQU0sWUFBWSxHQUFHO0lBQ2pCLElBQUksRUFBRSxJQUFJLHdCQUFpQixDQUFDO1FBQ3hCLElBQUksRUFBRSxZQUFZO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksMkJBQU8sQ0FBQyxJQUFJLHdCQUFJLENBQUMsSUFBSSwyQkFBTyxDQUFDLGtCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFVLEVBQUUsRUFBRSw2Q0FBNkM7WUFDN0MscUNBQXFDO1lBQ3JDLDJDQUEyQztZQUN2RSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUNoQyxDQUFDO0tBQ0wsQ0FBQztJQUNGLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUFFLGtDQUFrQztJQUMzQyxFQUNJLFdBQVcsRUFBRSxFQUNULE9BQU8sRUFDUCxZQUFZLEVBQ2YsRUFDQyxFQUNOLElBQVMsRUFDVCxFQUFFO1FBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxPQUFPO1lBQ1AsWUFBWTtTQUNmLENBQUMsQ0FBQztRQUVILFlBQVk7UUFDWiw4QkFBOEI7UUFDOUIsa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixNQUFNO1FBRU4sT0FBTyxDQUFDLE1BQU0sSUFBQSxvQkFBVSxFQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUVoRCxDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgR3JhcGhRTExpc3QgYXMgTGlzdCwgR3JhcGhRTE5vbk51bGwgYXMgTm9uTnVsbCB9IGZyb20gXCJncmFwaHFsL3R5cGUvZGVmaW5pdGlvblwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IFMzTGlzdERhdGEgZnJvbSBcIi4vUzNMaXN0RGF0YVwiO1xuXG5jb25zdCBzM19saXN0X2RhdGEgPSB7XG4gICAgdHlwZTogbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICAgICAgbmFtZTogJ1MzTGlzdERhdGEnLFxuICAgICAgICBmaWVsZHM6ICgpID0+ICh7XG4gICAgICAgICAgICBsaXN0OiB7IHR5cGU6IG5ldyBOb25OdWxsKG5ldyBMaXN0KG5ldyBOb25OdWxsKEpTT05PYmplY3QpKSkgfSxcbiAgICAgICAgICAgIHRlc3Q6IHsgdHlwZTogSlNPTk9iamVjdCB9LCAvLyA8LS0gb2JqZWN0IGNvbnRhaW5pbmcgcmVzdWx0cyBvZiBhbGwgdGVzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LS0gcnVuIGJ5IHRoZSByZXNvbHZlciBzdG9yZWQgYXM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0tIHsgXCJ0ZXN0IGRlc2NyaXB0aW9uXCI6IHRydWUgfCBmYWxzZSB9XG4gICAgICAgICAgICB0eXBlOiB7IHR5cGU6IEdyYXBoUUxTdHJpbmcgfVxuICAgICAgICB9KVxuICAgIH0pLFxuICAgIGFyZ3M6IG51bGwsXG4gICAgcmVzb2x2ZTogYXN5bmMgKFxuICAgICAgXzogYW55LFxuICAgICAgX186IGFueSwgLy8geyAuLi5hcmdzIH06IHsgYXJnOiB0eXBlLCAuLi4gfVxuICAgICAge1xuICAgICAgICAgIGRhdGFTb3VyY2VzOiB7XG4gICAgICAgICAgICAgIHJlc3RBcGksXG4gICAgICAgICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgICAgIH1cbiAgICAgIH06IGFueSxcbiAgICAgIGluZm86IGFueVxuICAgICkgPT4gIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc29sdmUgUzNMaXN0RGF0YS4uLlwiLCB7XG4gICAgICAgICAgICByZXN0QXBpLFxuICAgICAgICAgICAgczNEYXRhU291cmNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJldHVybiAoe1xuICAgICAgICAvLyAgICAgXCJ0eXBlXCI6IFwiczNfbGlzdF9kYXRhXCIsXG4gICAgICAgIC8vICAgICBcImxpc3RcIjogW10sXG4gICAgICAgIC8vICAgICBcInRlc3RcIjogdGVzdFxuICAgICAgICAvLyB9KTtcblxuICAgICAgICByZXR1cm4gKGF3YWl0IFMzTGlzdERhdGEoXCJjb3JpLXJpc2ktYXBwc1wiKSk7XG5cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzM19saXN0X2RhdGE7XG4iXX0=