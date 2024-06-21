import { Logger } from '@aws-lambda-powertools/logger';
import { S3, S3ClientConfig } from "@aws-sdk/client-s3";
import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from "graphql/type";
import { JSONObject } from "../../types";

const logger = new Logger();

const erc_value = {
  // An array (list) fails to transfer gzipped by local sam cli
  type: // new GraphQLList(
        // ... but a single return object can be gzipped locally
    new GraphQLObjectType({
      name: 'ERCValue',
      fields: () => ({
        // metric: { type: GraphQLString },
        // variable: { type: GraphQLString },
        // geoid: { type: GraphQLString },
        // year: { type: GraphQLInt },
        value: { type: GraphQLFloat }
      })
    }),
  args: null,
  resolve: async (
    _: any,
    __: any,
    {
      dataSources: {
        pythonApi,
        s3DataSource
      }
    }: any,
    info: any
  ) =>  {

    // logger.info('This is an INFO log!');
    // logger.info(`dataSources: ${stringify([
    //   pythonApi,
    //   s3DataSource
    // ])}`);

    // const s3 = new S3((s3DataSource as any).config);
    const s3 = new S3();
    const Bucket = "erc-public";

    // TODO: Try to fetch S3 resource (object by key)
    const erc_metadata_json = (await s3.getObject({
      Bucket,
      Key: "test/metadata.json"
    }));
    const erc_metadata_body_to_string = (typeof erc_metadata_json.Body === "object") ?
      (await erc_metadata_json.Body?.transformToString()) :
      `{ "Error": "S3 object Body is undefined" }`;

    logger.info(`S3 object Body: ${erc_metadata_body_to_string}`);

    const value = {
      "message": erc_metadata_body_to_string,
      "value": 1.0
    };

    return [{ // An array (list) fails to transfer gzipped by local sam cli...
        ...value
    }][0];    // ... but a single return object can be gzipped locally
  }
};

export default erc_value;
