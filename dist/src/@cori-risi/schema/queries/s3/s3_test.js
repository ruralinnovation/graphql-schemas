"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Logger } from "@aws-lambda-powertools/logger";
const type_1 = require("graphql/type");
const types_1 = require("../../types");
const S3Test_1 = require("./S3Test");
const s3_test = {
    type: new type_1.GraphQLObjectType({
        name: 'S3Test',
        fields: () => ({
            message: { type: type_1.GraphQLString },
            test: { type: types_1.JSONObject }, // <-- object containing results of all tests
            // <-- run by the resolver stored as:
            // <-- { "test description": true | false }
            type: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, // { ...args }: { arg: type, ... }
    { dataSources: { restApi, s3DataSource } }, info) => {
        console.log("Resolve S3Test...", {
            restApi,
            s3DataSource
        });
        return (await (0, S3Test_1.default)());
    }
};
exports.default = s3_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczNfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9AY29yaS1yaXNpL3NjaGVtYS9xdWVyaWVzL3MzL3MzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBMEQ7QUFDMUQsdUNBQWdFO0FBQ2hFLHVDQUF5QztBQUd6QyxxQ0FBOEI7QUFFOUIsTUFBTSxPQUFPLEdBQUc7SUFDWixJQUFJLEVBQUUsSUFBSSx3QkFBaUIsQ0FBQztRQUN4QixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFhLEVBQUU7WUFDaEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFVLEVBQUUsRUFBRSw2Q0FBNkM7WUFDN0MscUNBQXFDO1lBQ3JDLDJDQUEyQztZQUN2RSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0JBQWEsRUFBRTtTQUNoQyxDQUFDO0tBQ0wsQ0FBQztJQUNGLElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLEtBQUssRUFDWixDQUFNLEVBQ04sRUFBTyxFQUFFLGtDQUFrQztJQUMzQyxFQUNJLFdBQVcsRUFBRSxFQUNULE9BQU8sRUFDUCxZQUFZLEVBQ2YsRUFDQyxFQUNOLElBQVMsRUFDVCxFQUFFO1FBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTtZQUM3QixPQUFPO1lBQ1AsWUFBWTtTQUNmLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxNQUFNLElBQUEsZ0JBQU0sR0FBRSxDQUFDLENBQUM7SUFFNUIsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQGF3cy1sYW1iZGEtcG93ZXJ0b29scy9sb2dnZXJcIjtcbmltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuaW1wb3J0IHsgSlNPTk9iamVjdCB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgUzMgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCBTM1Rlc3QgZnJvbSBcIi4vUzNUZXN0XCI7XG5cbmNvbnN0IHMzX3Rlc3QgPSB7XG4gICAgdHlwZTogbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICAgICAgbmFtZTogJ1MzVGVzdCcsXG4gICAgICAgIGZpZWxkczogKCkgPT4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9LFxuICAgICAgICAgICAgdGVzdDogeyB0eXBlOiBKU09OT2JqZWN0IH0sIC8vIDwtLSBvYmplY3QgY29udGFpbmluZyByZXN1bHRzIG9mIGFsbCB0ZXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtLSBydW4gYnkgdGhlIHJlc29sdmVyIHN0b3JlZCBhczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LS0geyBcInRlc3QgZGVzY3JpcHRpb25cIjogdHJ1ZSB8IGZhbHNlIH1cbiAgICAgICAgICAgIHR5cGU6IHsgdHlwZTogR3JhcGhRTFN0cmluZyB9XG4gICAgICAgIH0pXG4gICAgfSksXG4gICAgYXJnczogbnVsbCxcbiAgICByZXNvbHZlOiBhc3luYyAoXG4gICAgICBfOiBhbnksXG4gICAgICBfXzogYW55LCAvLyB7IC4uLmFyZ3MgfTogeyBhcmc6IHR5cGUsIC4uLiB9XG4gICAgICB7XG4gICAgICAgICAgZGF0YVNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgcmVzdEFwaSxcbiAgICAgICAgICAgICAgczNEYXRhU291cmNlXG4gICAgICAgICAgfVxuICAgICAgfTogYW55LFxuICAgICAgaW5mbzogYW55XG4gICAgKSA9PiAge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzb2x2ZSBTM1Rlc3QuLi5cIiwge1xuICAgICAgICAgICAgcmVzdEFwaSxcbiAgICAgICAgICAgIHMzRGF0YVNvdXJjZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKGF3YWl0IFMzVGVzdCgpKTtcblxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHMzX3Rlc3Q7XG4iXX0=