"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("graphql/type");
const acs_test = {
    type: new type_1.GraphQLObjectType({
        name: 'ACSTestObject',
        fields: () => ({
            message: { type: type_1.GraphQLString }
        })
    }),
    args: null,
    resolve: async (_, __, { dataSources: { pythonApi } }, info) => await pythonApi.getItem(`acs/testing`)
};
exports.default = acs_test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9hY3MvYWNzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0U7QUFFaEUsTUFBTSxRQUFRLEdBQUc7SUFDZixJQUFJLEVBQUUsSUFBSSx3QkFBaUIsQ0FBQztRQUMxQixJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxvQkFBYSxFQUFFO1NBQ2pDLENBQUM7S0FDSCxDQUFDO0lBQ0YsSUFBSSxFQUFFLElBQUk7SUFDVixPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFPLEVBQ1AsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBTyxFQUNuQyxJQUFTLEVBQ1QsRUFBRSxDQUFFLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Q0FDN0MsQ0FBQztBQUVGLGtCQUFlLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoUUxPYmplY3RUeXBlLCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuXG5jb25zdCBhY3NfdGVzdCA9IHtcbiAgdHlwZTogbmV3IEdyYXBoUUxPYmplY3RUeXBlKHtcbiAgICBuYW1lOiAnQUNTVGVzdE9iamVjdCcsXG4gICAgZmllbGRzOiAoKSA9PiAoe1xuICAgICAgbWVzc2FnZTogeyB0eXBlOiBHcmFwaFFMU3RyaW5nIH1cbiAgICB9KVxuICB9KSxcbiAgYXJnczogbnVsbCxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICBfXzogYW55LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0gfTogYW55LFxuICAgIGluZm86IGFueVxuICApID0+ICBhd2FpdCBweXRob25BcGkuZ2V0SXRlbShgYWNzL3Rlc3RpbmdgKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWNzX3Rlc3Q7XG4iXX0=