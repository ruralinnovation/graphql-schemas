"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geojson_1 = require("../../geojson");
const type_1 = require("graphql/type");
// TODO: Remove after testing call to local Python REST API
const cross_fetch_1 = require("cross-fetch");
const auction_904_subsidy_awards_geojson = {
    type: geojson_1.default.FeatureCollectionObject,
    args: {
        geoid_co: {
            type: type_1.GraphQLString,
        },
        limit: {
            type: type_1.GraphQLInt
        },
        offset: {
            type: type_1.GraphQLInt
        },
        page: {
            type: type_1.GraphQLInt
        },
        skipCache: {
            type: type_1.GraphQLBoolean,
        },
    },
    resolve: async (_, { geoid_co, limit, offset, page, skipCache }, { dataSources: { pythonApi }, redisClient }, info) => {
        const page_size = (typeof limit !== 'undefined' && limit === limit) ?
            limit :
            10;
        const count_offset = (typeof offset !== 'undefined' && offset === offset) ?
            offset :
            0;
        const page_number = (typeof page !== 'undefined' && page === page) ?
            page :
            0;
        if (!!skipCache && typeof redisClient.disconnect === 'function') {
            // Disconnect from redis when ever skipCache == true
            console.log("Disconnect from redis when ever skipCache == true");
            redisClient.disconnect();
        }
        // TODO: Remove after testing call to local Python REST API
        console.log(`Query pythonApi: ${pythonApi.baseURL}bcat/auction_904_subsidy_awards/geojson`
            + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        const test_req = (0, cross_fetch_1.fetch)(`${pythonApi.baseURL}bcat/auction_904_subsidy_awards/geojson`
            + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
        test_req
            .catch((err) => console.log("Test Python REST error: ", err))
            .then((res) => console.log("Test Python REST response: ", res));
        const check_res = await test_req;
        console.log(test_req);
        return skipCache
            ? await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson`
                + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`)
            : await redisClient.checkCache(`auction_904_subsidy_awards-`
                + `${geoid_co}-${page_size}-${count_offset}-${page_number}`, async () => {
                return await pythonApi.getItem(`bcat/auction_904_subsidy_awards/geojson`
                    + `?geoid_co=${geoid_co}&limit=${page_size}&offset=${count_offset}&page=${page_number}`);
            });
    },
};
exports.default = auction_904_subsidy_awards_geojson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zY2hlbWEvcXVlcmllcy9iY2F0L2F1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzX2dlb2pzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBb0M7QUFDcEMsdUNBQXlFO0FBRXpFLDJEQUEyRDtBQUMzRCw2Q0FBb0M7QUFFcEMsTUFBTSxrQ0FBa0MsR0FBRztJQUN6QyxJQUFJLEVBQUUsaUJBQU8sQ0FBQyx1QkFBdUI7SUFDckMsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLG9CQUFjO1NBQ3JCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGlCQUFVO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLHFCQUFjO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsS0FBSyxFQUNaLENBQU0sRUFDTixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBTXpDLEVBQ0QsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQU8sRUFDaEQsSUFBUyxFQUNULEVBQUU7UUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRSxLQUFLLENBQUMsQ0FBQztZQUNQLEVBQUUsQ0FBQztRQUVMLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDO1FBRUosTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxXQUFXLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ2hFLG9EQUFvRDtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDaEUsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCwyREFBMkQ7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsU0FBUyxDQUFDLE9BQU8seUNBQXlDO2NBQ3RGLGFBQWEsUUFBUSxVQUFVLFNBQVMsV0FBVyxZQUFZLFNBQVMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMzRixNQUFNLFFBQVEsR0FBRyxJQUFBLG1CQUFLLEVBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyx5Q0FBeUM7Y0FDaEYsYUFBYSxRQUFRLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTNGLFFBQVE7YUFDTCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDNUQsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUM7UUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QixPQUFPLFNBQVM7WUFDZCxDQUFDLENBQUMsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLHlDQUF5QztrQkFDL0QsYUFBYSxRQUFRLFVBQVUsU0FBUyxXQUFXLFlBQVksU0FBUyxXQUFXLEVBQUUsQ0FBQztZQUMxRixDQUFDLENBQUMsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDLDZCQUE2QjtrQkFDeEQsR0FBRyxRQUFRLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxXQUFXLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDeEUsT0FBTyxNQUFNLFNBQVMsQ0FBQyxPQUFPLENBQUMseUNBQXlDO3NCQUNwRSxhQUFhLFFBQVEsVUFBVSxTQUFTLFdBQVcsWUFBWSxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDN0YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLGtDQUFrQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdlb0pTT04gZnJvbSBcIi4uLy4uL2dlb2pzb25cIjtcbmltcG9ydCB7IEdyYXBoUUxCb29sZWFuLCBHcmFwaFFMSW50LCBHcmFwaFFMU3RyaW5nIH0gZnJvbSBcImdyYXBocWwvdHlwZVwiO1xuXG4vLyBUT0RPOiBSZW1vdmUgYWZ0ZXIgdGVzdGluZyBjYWxsIHRvIGxvY2FsIFB5dGhvbiBSRVNUIEFQSVxuaW1wb3J0IHsgZmV0Y2ggfSBmcm9tIFwiY3Jvc3MtZmV0Y2hcIjtcblxuY29uc3QgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHNfZ2VvanNvbiA9IHtcbiAgdHlwZTogR2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbk9iamVjdCxcbiAgYXJnczoge1xuICAgIGdlb2lkX2NvOiB7XG4gICAgICB0eXBlOiBHcmFwaFFMU3RyaW5nISxcbiAgICB9LFxuICAgIGxpbWl0OiB7XG4gICAgICB0eXBlOiBHcmFwaFFMSW50XG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHBhZ2U6IHtcbiAgICAgIHR5cGU6IEdyYXBoUUxJbnRcbiAgICB9LFxuICAgIHNraXBDYWNoZToge1xuICAgICAgdHlwZTogR3JhcGhRTEJvb2xlYW4sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZTogYXN5bmMgKFxuICAgIF86IGFueSxcbiAgICB7IGdlb2lkX2NvLCBsaW1pdCwgb2Zmc2V0LCBwYWdlLCBza2lwQ2FjaGUgfToge1xuICAgICAgZ2VvaWRfY286IHN0cmluZztcbiAgICAgIGxpbWl0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICBvZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHBhZ2U6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAgIHNraXBDYWNoZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHsgZGF0YVNvdXJjZXM6IHsgcHl0aG9uQXBpIH0sIHJlZGlzQ2xpZW50IH06IGFueSxcbiAgICBpbmZvOiBhbnlcbiAgKSA9PiB7XG5cbiAgICBjb25zdCBwYWdlX3NpemUgPSAodHlwZW9mIGxpbWl0ICE9PSAndW5kZWZpbmVkJyAmJiBsaW1pdCA9PT0gbGltaXQpID9cbiAgICAgIGxpbWl0IDpcbiAgICAgIDEwO1xuXG4gICAgY29uc3QgY291bnRfb2Zmc2V0ID0gKHR5cGVvZiBvZmZzZXQgIT09ICd1bmRlZmluZWQnICYmIG9mZnNldCA9PT0gb2Zmc2V0KSA/XG4gICAgICBvZmZzZXQgOlxuICAgICAgMDtcblxuICAgIGNvbnN0IHBhZ2VfbnVtYmVyID0gKHR5cGVvZiBwYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYWdlID09PSBwYWdlKSA/XG4gICAgICBwYWdlIDpcbiAgICAgIDA7XG5cbiAgICBpZiAoISFza2lwQ2FjaGUgJiYgdHlwZW9mIHJlZGlzQ2xpZW50LmRpc2Nvbm5lY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIERpc2Nvbm5lY3QgZnJvbSByZWRpcyB3aGVuIGV2ZXIgc2tpcENhY2hlID09IHRydWVcbiAgICAgIGNvbnNvbGUubG9nKFwiRGlzY29ubmVjdCBmcm9tIHJlZGlzIHdoZW4gZXZlciBza2lwQ2FjaGUgPT0gdHJ1ZVwiKVxuICAgICAgcmVkaXNDbGllbnQuZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciB0ZXN0aW5nIGNhbGwgdG8gbG9jYWwgUHl0aG9uIFJFU1QgQVBJXG4gICAgY29uc29sZS5sb2coYFF1ZXJ5IHB5dGhvbkFwaTogJHtweXRob25BcGkuYmFzZVVSTH1iY2F0L2F1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzL2dlb2pzb25gXG4gICAgICArIGA/Z2VvaWRfY289JHtnZW9pZF9jb30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuICAgIGNvbnN0IHRlc3RfcmVxID0gZmV0Y2goYCR7cHl0aG9uQXBpLmJhc2VVUkx9YmNhdC9hdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkcy9nZW9qc29uYFxuICAgICAgKyBgP2dlb2lkX2NvPSR7Z2VvaWRfY299JmxpbWl0PSR7cGFnZV9zaXplfSZvZmZzZXQ9JHtjb3VudF9vZmZzZXR9JnBhZ2U9JHtwYWdlX251bWJlcn1gKTtcblxuICAgIHRlc3RfcmVxXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coXCJUZXN0IFB5dGhvbiBSRVNUIGVycm9yOiBcIiwgZXJyKSlcbiAgICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKFwiVGVzdCBQeXRob24gUkVTVCByZXNwb25zZTogXCIsIHJlcykpO1xuXG4gICAgY29uc3QgY2hlY2tfcmVzID0gYXdhaXQgdGVzdF9yZXE7XG5cbiAgICBjb25zb2xlLmxvZyh0ZXN0X3JlcSk7XG5cbiAgICByZXR1cm4gc2tpcENhY2hlXG4gICAgICA/IGF3YWl0IHB5dGhvbkFwaS5nZXRJdGVtKGBiY2F0L2F1Y3Rpb25fOTA0X3N1YnNpZHlfYXdhcmRzL2dlb2pzb25gXG4gICAgICAgICsgYD9nZW9pZF9jbz0ke2dlb2lkX2NvfSZsaW1pdD0ke3BhZ2Vfc2l6ZX0mb2Zmc2V0PSR7Y291bnRfb2Zmc2V0fSZwYWdlPSR7cGFnZV9udW1iZXJ9YClcbiAgICAgIDogYXdhaXQgcmVkaXNDbGllbnQuY2hlY2tDYWNoZShgYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMtYFxuICAgICAgICArIGAke2dlb2lkX2NvfS0ke3BhZ2Vfc2l6ZX0tJHtjb3VudF9vZmZzZXR9LSR7cGFnZV9udW1iZXJ9YCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgcHl0aG9uQXBpLmdldEl0ZW0oYGJjYXQvYXVjdGlvbl85MDRfc3Vic2lkeV9hd2FyZHMvZ2VvanNvbmBcbiAgICAgICAgICArIGA/Z2VvaWRfY289JHtnZW9pZF9jb30mbGltaXQ9JHtwYWdlX3NpemV9Jm9mZnNldD0ke2NvdW50X29mZnNldH0mcGFnZT0ke3BhZ2VfbnVtYmVyfWApO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhdWN0aW9uXzkwNF9zdWJzaWR5X2F3YXJkc19nZW9qc29uO1xuIl19