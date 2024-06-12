import { GraphQLObjectType, GraphQLString } from "graphql/type";
import { Logger } from '@aws-lambda-powertools/logger';
import { S3, S3ClientConfig } from "@aws-sdk/client-s3";
import { stringify } from "flatted";
import { JSONObject } from "../../types";

const logger = new Logger();

const erc_test = {
  // An array (list) fails to transfer gzipped by local sam cli
  type: // new GraphQLList(
        // ... but a single return object can be gzipped locally
    new GraphQLObjectType({
      name: 'ERCS3TestObject',
      fields: () => ({
        erc_s3_test: { type: JSONObject },
        message: { type: GraphQLString },
      })
    }),
  args: null,
  resolve: async (
    _: any,
    __: any,
    { dataSources: { pythonApi } }: any,
    info: any
  ) =>  {

    logger.info('This is an INFO log!');
    logger.info(`erc_s3_test dataSources: ${stringify([
      pythonApi
    ])}`);

    // TODO: Add S3 fetch logic...
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
    logger.info(`AWS credentials: ${stringify(s3_config)}`);
    const s3 = new S3(s3_config);

    logger.info(`S3 buckets: ${stringify(s3.listBuckets())}`);

    // TODO: Try to fetch list of objects in bucket/prefix
    const erc_list = await (s3.listObjectsV2({
      Bucket: "erc-public",
      Prefix: `test/`,
    }));
    if (typeof erc_list.Contents !== "object" || erc_list.Contents?.length === 0) {
      logger.info(`No objects found under s3://erc-public/test/`);
    } else {
      erc_list.Contents.forEach(c => {
        logger.info(c.Key?.toString() || "");
      });
    }

    // TODO: Try to fetch S3 resource
    const erc_metadata_json = (await s3.getObject({
      Bucket: "erc-public",
      Key: "test/metadata.json"
    }));
    const erc_metadata_body = erc_metadata_json.Body;
    const erc_metadata_body_to_string = (typeof erc_metadata_body === "object") ?
      (await erc_metadata_body.transformToString()) :
      "S3 object Body is undefined";

    logger.info(`S3 object Body: ${erc_metadata_body_to_string}`);

    const value = {
      "erc_s3_test": {
        "Body": JSON.parse(erc_metadata_body_to_string)
      },
      "message": erc_metadata_body_to_string
    };

    return [{ // An array (list) fails to transfer gzipped by local sam cli...
        ...value
    }][0];    // ... but a single return object can be gzipped locally
  }
};


export default erc_test;
