// import { Logger } from "@aws-lambda-powertools/logger";
import { GraphQLObjectType, GraphQLString } from "graphql/type";
import { JSONObject } from "../../types";
import { S3 } from "@aws-sdk/client-s3";
import { exec } from "child_process";
import S3Test from "./S3Test";

const s3_test = {
    type: new GraphQLObjectType({
        name: 'S3Test',
        fields: () => ({
            message: { type: GraphQLString },
            test: { type: JSONObject }, // <-- object containing results of all tests
                                        // <-- run by the resolver stored as:
                                        // <-- { "test description": true | false }
            type: { type: GraphQLString }
        })
    }),
    args: null,
    resolve: async (
      _: any,
      __: any, // { ...args }: { arg: type, ... }
      {
          dataSources: {
              restApi,
              s3DataSource
          }
      }: any,
      info: any
    ) =>  {

        console.log("Resolve S3Test...", {
            restApi,
            s3DataSource
        });

        return (await S3Test());

    }
};

export default s3_test;
