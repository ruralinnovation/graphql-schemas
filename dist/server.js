"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const index_1 = require("./index");
class BaseDataSource extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:8000/rest`; // <= Local flask rest api
    }
    async getItem(path) {
        return this.get(path ? path : '', undefined)
            .then((res) => {
            console.log("Response from dataSource: ", (() => {
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
        }, (err) => {
            console.error(err);
            throw (err);
        });
    }
}
const restApi = new BaseDataSource();
const s3_config = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    region: process.env.AWS_REGION,
    buckets: []
};
const s3DataSource = new BaseDataSource();
s3DataSource.config = s3_config;
const server = new apollo_server_1.ApolloServer({
    schema: index_1.schema,
    // typeDefs,
    // resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
    ],
    dataSources: () => ({
        restApi,
        s3DataSource
    }),
});
server.listen()
    .then((url) => {
    console.log(`🚀  Server ready at ${url.url}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTZEO0FBQzdELDJEQUErRTtBQUMvRSxtRUFBd0Q7QUFFeEQsbUNBQWlDO0FBRWpDLE1BQU0sY0FBZSxTQUFRLHVDQUFjO0lBQ3ZDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDLENBQUMsMEJBQTBCO0lBQzNFLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFFLElBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO2FBQ3pDLElBQUksQ0FDSCxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRyxDQUFDLEdBQUcsRUFBRTtnQkFDN0MsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNoQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDeEIsYUFBYTt3QkFDYixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN2RSxDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsT0FBTyxVQUFVLENBQUM7WUFDdEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRU4sT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLEVBQ0QsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUVKLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkIsTUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUNGLENBQUM7SUFDUixDQUFDO0NBQ0o7QUFNRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sU0FBUyxHQUFpQztJQUM1QyxXQUFXLEVBQUU7UUFDVCxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFO1FBQ2hELGVBQWUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLEVBQUU7S0FDM0Q7SUFDRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO0lBQzlCLE9BQU8sRUFBRSxFQUFFO0NBQ2QsQ0FBQztBQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFDekMsWUFBb0IsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBRXpDLE1BQU0sTUFBTSxHQUFHLElBQUksNEJBQVksQ0FBQztJQUM1QixNQUFNLEVBQU4sY0FBTTtJQUNOLFlBQVk7SUFDWixhQUFhO0lBQ2IsY0FBYyxFQUFFLElBQUk7SUFDcEIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsT0FBTyxFQUFFO1FBQ0wsSUFBQSw4REFBeUMsRUFBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUM3RDtJQUNELFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLE9BQU87UUFDUCxZQUFZO0tBQ2YsQ0FBQztDQUNMLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLEVBQUU7S0FDVixJQUFJLENBQUMsQ0FBQyxHQUFlLEVBQUUsRUFBRTtJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwb2xsb1NlcnZlciwgZ3FsLCBTZXJ2ZXJJbmZvfSBmcm9tICdhcG9sbG8tc2VydmVyJztcbmltcG9ydCB7IEFwb2xsb1NlcnZlclBsdWdpbkxhbmRpbmdQYWdlTG9jYWxEZWZhdWx0IH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItY29yZVwiO1xuaW1wb3J0IHsgUkVTVERhdGFTb3VyY2UgfSBmcm9tIFwiYXBvbGxvLWRhdGFzb3VyY2UtcmVzdFwiO1xuaW1wb3J0IHsgUzNDbGllbnRDb25maWcgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5pbXBvcnQgeyBzY2hlbWEgfSBmcm9tIFwiLi9pbmRleFwiO1xuXG5jbGFzcyBCYXNlRGF0YVNvdXJjZSBleHRlbmRzIFJFU1REYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iYXNlVVJMID0gYGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9yZXN0YDsgLy8gPD0gTG9jYWwgZmxhc2sgcmVzdCBhcGlcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZ2V0SXRlbSAocGF0aD86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQocGF0aCA/IHBhdGggOiAnJywgdW5kZWZpbmVkKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKHJlcykgPT4geyAvLyA8PSBvbmZ1bGZpbGxlZFxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNwb25zZSBmcm9tIGRhdGFTb3VyY2U6IFwiLCAgKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2gocCArIFwiOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlc1twXSwgbnVsbCwgMikgKyBcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICAgICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4geyAvLyA8PSBvbnJlamVjdGVkXG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgUzNDbGllbnRDb25maWdGb3JDT1JJRGF0YUFQSSBleHRlbmRzIFMzQ2xpZW50Q29uZmlnIHtcbiAgICBidWNrZXRzOiBzdHJpbmdbXVxufVxuXG5jb25zdCByZXN0QXBpID0gbmV3IEJhc2VEYXRhU291cmNlKCk7XG5jb25zdCBzM19jb25maWc6IFMzQ2xpZW50Q29uZmlnRm9yQ09SSURhdGFBUEkgPSB7XG4gICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEIHx8IFwiXCIsXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZIHx8IFwiXCIsXG4gICAgfSxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04sXG4gICAgYnVja2V0czogW11cbn07XG5jb25zdCBzM0RhdGFTb3VyY2UgPSBuZXcgQmFzZURhdGFTb3VyY2UoKTtcbihzM0RhdGFTb3VyY2UgYXMgYW55KS5jb25maWcgPSBzM19jb25maWc7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xuICAgIHNjaGVtYSxcbiAgICAvLyB0eXBlRGVmcyxcbiAgICAvLyByZXNvbHZlcnMsXG4gICAgY3NyZlByZXZlbnRpb246IHRydWUsXG4gICAgY2FjaGU6IFwiYm91bmRlZFwiLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgQXBvbGxvU2VydmVyUGx1Z2luTGFuZGluZ1BhZ2VMb2NhbERlZmF1bHQoeyBlbWJlZDogdHJ1ZSB9KSxcbiAgICBdLFxuICAgIGRhdGFTb3VyY2VzOiAoKSA9PiAoe1xuICAgICAgICByZXN0QXBpLFxuICAgICAgICBzM0RhdGFTb3VyY2VcbiAgICB9KSxcbn0pO1xuXG5zZXJ2ZXIubGlzdGVuKClcbiAgICAudGhlbigodXJsOiBTZXJ2ZXJJbmZvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGDwn5qAICBTZXJ2ZXIgcmVhZHkgYXQgJHt1cmwudXJsfWApO1xuICAgIH0pO1xuIl19