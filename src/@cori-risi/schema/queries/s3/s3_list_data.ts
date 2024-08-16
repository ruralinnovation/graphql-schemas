import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql/type";
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
    args: {
        bucket: {
            type: GraphQLString //new GraphQLList(GraphQLString)!,
        },
        container_name: {
            type: GraphQLString
        }
    },
    resolve: async (
      _: any,
      { bucket, container_name }: {
          bucket: string | undefined,
          container_name: string | undefined
      },
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

        const Bucket =  (!!bucket && bucket.length > 0)?
          bucket :
          "cori-risi-apps";

        console.log("BUCKET:", Bucket);
        console.log("bucket:", bucket);
        console.log("container_name:", container_name);

        return (!!container_name && container_name.length > 0)?
          (await S3ListData(Bucket, container_name)) :
          (await S3ListData(Bucket));

    }
};

export default s3_list_data;
