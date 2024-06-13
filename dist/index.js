"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
// import { writeFileSync, existsSync, mkdirSync } from 'fs';
const node_fs_1 = require("node:fs");
const graphql_1 = require("graphql");
const merge_schemas_1 = require("./src/merge-schemas");
const queries = require("./src/schema/queries");
const schemas = (0, merge_schemas_1.default)(queries);
exports.schema = schemas;
try {
    if (!(0, node_fs_1.existsSync)('dist')) {
        (0, node_fs_1.mkdirSync)('dist');
    }
    (0, node_fs_1.writeFileSync)('dist/schema.graphql', (0, graphql_1.printSchema)(schemas));
}
catch (e) { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFBNkQ7QUFDN0QscUNBQStEO0FBQy9ELHFDQUFzQztBQUN0Qyx1REFBK0M7QUFDL0MsZ0RBQWdEO0FBRWhELE1BQU0sT0FBTyxHQUFHLElBQUEsdUJBQVksRUFBQyxPQUEyQixDQUFDLENBQUM7QUFVN0MseUJBQU07QUFSbkIsSUFBSSxDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQUEsbUJBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBQSx1QkFBYSxFQUFDLHFCQUFxQixFQUFFLElBQUEscUJBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgcHJpbnRTY2hlbWEgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBtZXJnZVNjaGVtYXMgZnJvbSAnLi9zcmMvbWVyZ2Utc2NoZW1hcyc7XG5pbXBvcnQgKiBhcyBxdWVyaWVzIGZyb20gJy4vc3JjL3NjaGVtYS9xdWVyaWVzJztcblxuY29uc3Qgc2NoZW1hcyA9IG1lcmdlU2NoZW1hcyhxdWVyaWVzIGFzIHVua25vd24gYXMgW2FueV0pO1xuXG50cnkge1xuICBpZiAoIWV4aXN0c1N5bmMoJ2Rpc3QnKSkge1xuICAgIG1rZGlyU3luYygnZGlzdCcpO1xuICB9XG4gIHdyaXRlRmlsZVN5bmMoJ2Rpc3Qvc2NoZW1hLmdyYXBocWwnLCBwcmludFNjaGVtYShzY2hlbWFzKSk7XG59IGNhdGNoIChlKSB7fVxuXG5leHBvcnQge1xuICBzY2hlbWFzIGFzIHNjaGVtYVxufTtcbiJdfQ==