import { ApolloServer, gql, ServerInfo} from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { RESTDataSource } from "apollo-datasource-rest";
import { S3ClientConfig } from "@aws-sdk/client-s3";
import { schema } from "./index";

class BaseDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:8000/rest`; // <= Local flask rest api
    }

    public async getItem (path?: string) {
        return this.get(path ? path : '', undefined)
          .then(
            (res) => { // <= onfulfilled

                console.log("Response from dataSource: ",  (() => {
                    const properties = [];
                    for (let p in res) {
                        if (res.hasOwnProperty(p)) {
                            // @ts-ignore
                            properties.push(p + ": " + JSON.stringify(res[p], null, 2) + "\n");
                        }
                    }
                    return properties;
                })());

                return res;
            },
            (err) => { // <= onrejected

                console.error(err);

                throw(err);
            }
          );
    }
}

interface S3ClientConfigForCORIDataAPI extends S3ClientConfig {
    buckets: string[]
}

const restApi = new BaseDataSource();
const s3_config: S3ClientConfigForCORIDataAPI = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    region: process.env.AWS_REGION,
    buckets: []
};
const s3DataSource = new BaseDataSource();
(s3DataSource as any).config = s3_config;

const server = new ApolloServer({
    schema,
    // typeDefs,
    // resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    dataSources: () => ({
        restApi,
        s3DataSource
    }),
});

server.listen()
    .then((url: ServerInfo) => {
        console.log(`🚀  Server ready at ${url.url}`);
    });
