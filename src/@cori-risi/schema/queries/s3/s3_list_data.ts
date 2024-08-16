import { GraphQLObjectType, GraphQLString } from "graphql/type";
import { GraphQLList as List, GraphQLNonNull as NonNull } from "graphql/type/definition";
import { JSONObject } from "../../types";
import S3ListData from "./S3ListData";

const s3_list_data = {
    type: new GraphQLObjectType({
        name: 'S3ListData',
        fields: () => ({
            list: { type: new NonNull(new List(new NonNull(JSONObject))) },
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

        console.log("Resolve S3ListData...", {
            restApi,
            s3DataSource
        });

        // return ({
        //     "type": "s3_list_data",
        //     "list": [],
        //     "test": test
        // });

        return (await S3ListData("cori-risi-apps"));

    }
};

export default s3_list_data;
