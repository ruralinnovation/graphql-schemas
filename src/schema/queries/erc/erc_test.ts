import { GraphQLObjectType, GraphQLString } from "graphql/type";
import * as AWS from 'aws-sdk';

import { S3, S3ClientConfig } from "@aws-sdk/client-s3";

const erc_s3_test = {
  // An array (list) fails to transfer gzipped by local sam cli
  type: // new GraphQLList(
        // ... but a single return object can be gzipped locally
    new GraphQLObjectType({
      name: 'ERCS3TestObject',
      fields: () => ({
        message: { type: GraphQLString }
      })
    }),
  args: null,
  resolve: async (
    _: any,
    __: any,
    { dataSources: { pythonApi } }: any,
    info: any
  ) =>  {
    console.log("dataSources:", [
      pythonApi
    ]);

    // TODO: Add S3 fetch logic...
    console.log("AWS credentials:", {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    // // TODO: Find a new way to set credentials for S3
    // // This method of setting creds is deprecated...
    // // JS SDK v3 does not support global configuration.
    // // Codemod has attempted to pass values to each service client in this file.
    // // You may need to update clients outside of this file, if they use global config.
    // AWS.config.update({
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   region: process.env.AWS_REGION,
    // });

    const s3_config: S3ClientConfig = {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },

      region: process.env.AWS_REGION,
    };
    const s3 = new S3(s3_config);

    // TODO: Try to fetch S3 resource
    console.log("S3 buckets:", s3.listBuckets);

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

    return [{ // An array (list) fails to transfer gzipped by local sam cli...
        ...value
    }][0];    // ... but a single return object can be gzipped locally
  }
};


export default erc_s3_test;
