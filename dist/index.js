"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
// import { writeFileSync, existsSync, mkdirSync } from 'fs';
const node_fs_1 = require("node:fs");
const graphql_1 = require("graphql");
const merge_schemas_1 = require("./src/merge-schemas");
const queries = require("./src/@cori-risi/schema/queries");
const schemas = (0, merge_schemas_1.default)(queries);
exports.schema = schemas;
try {
    if (!(0, node_fs_1.existsSync)('dist')) {
        (0, node_fs_1.mkdirSync)('dist');
    }
    (0, node_fs_1.writeFileSync)('dist/schema.graphql', (0, graphql_1.printSchema)(schemas));
}
catch (e) { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFBNkQ7QUFDN0QscUNBQStEO0FBQy9ELHFDQUFzQztBQUN0Qyx1REFBK0M7QUFDL0MsMkRBQTJEO0FBRTNELE1BQU0sT0FBTyxHQUFHLElBQUEsdUJBQVksRUFBQyxPQUEyQixDQUFDLENBQUM7QUFVN0MseUJBQU07QUFSbkIsSUFBSSxDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3hCLElBQUEsbUJBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBQSx1QkFBYSxFQUFDLHFCQUFxQixFQUFFLElBQUEscUJBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHdyaXRlRmlsZVN5bmMsIGV4aXN0c1N5bmMsIG1rZGlyU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgcHJpbnRTY2hlbWEgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBtZXJnZVNjaGVtYXMgZnJvbSAnLi9zcmMvbWVyZ2Utc2NoZW1hcyc7XG5pbXBvcnQgKiBhcyBxdWVyaWVzIGZyb20gJy4vc3JjL0Bjb3JpLXJpc2kvc2NoZW1hL3F1ZXJpZXMnO1xuXG5jb25zdCBzY2hlbWFzID0gbWVyZ2VTY2hlbWFzKHF1ZXJpZXMgYXMgdW5rbm93biBhcyBbYW55XSk7XG5cbnRyeSB7XG4gIGlmICghZXhpc3RzU3luYygnZGlzdCcpKSB7XG4gICAgbWtkaXJTeW5jKCdkaXN0Jyk7XG4gIH1cbiAgd3JpdGVGaWxlU3luYygnZGlzdC9zY2hlbWEuZ3JhcGhxbCcsIHByaW50U2NoZW1hKHNjaGVtYXMpKTtcbn0gY2F0Y2ggKGUpIHt9XG5cbmV4cG9ydCB7XG4gIHNjaGVtYXMgYXMgc2NoZW1hXG59O1xuIl19