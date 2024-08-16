"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Test = exports.S3ListData = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import GeoJSON from '../geojson';
const s3_test_1 = require("./s3_test");
const s3_list_data_1 = require("./s3_list_data");
// import s3_get_data from "./s3_get_data";
const s3Queries = {
    s3_test: s3_test_1.default,
    s3_list_data: s3_list_data_1.default,
    // s3_get_data
};
exports.default = s3Queries;
var S3ListData_1 = require("./S3ListData");
Object.defineProperty(exports, "S3ListData", { enumerable: true, get: function () { return S3ListData_1.default; } });
var S3Test_1 = require("./S3Test");
Object.defineProperty(exports, "S3Test", { enumerable: true, get: function () { return S3Test_1.default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQGNvcmktcmlzaS9zY2hlbWEvcXVlcmllcy9zMy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFBNkQ7QUFDN0Qsc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCxvQ0FBb0M7QUFDcEMsdUNBQWdDO0FBQ2hDLGlEQUEwQztBQUMxQywyQ0FBMkM7QUFFM0MsTUFBTSxTQUFTLEdBQVE7SUFDckIsT0FBTyxFQUFQLGlCQUFPO0lBQ1AsWUFBWSxFQUFaLHNCQUFZO0lBQ1osY0FBYztDQUNmLENBQUM7QUFFRixrQkFBZSxTQUFTLENBQUM7QUFFekIsMkNBQXFEO0FBQTVDLHdHQUFBLE9BQU8sT0FBYztBQUM5QixtQ0FBNkM7QUFBcEMsZ0dBQUEsT0FBTyxPQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vLyBpbXBvcnQgR2VvSlNPTiBmcm9tICcuLi9nZW9qc29uJztcbmltcG9ydCBzM190ZXN0IGZyb20gXCIuL3MzX3Rlc3RcIjtcbmltcG9ydCBzM19saXN0X2RhdGEgZnJvbSBcIi4vczNfbGlzdF9kYXRhXCI7XG4vLyBpbXBvcnQgczNfZ2V0X2RhdGEgZnJvbSBcIi4vczNfZ2V0X2RhdGFcIjtcblxuY29uc3QgczNRdWVyaWVzOiBhbnkgPSB7XG4gIHMzX3Rlc3QsXG4gIHMzX2xpc3RfZGF0YSxcbiAgLy8gczNfZ2V0X2RhdGFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHMzUXVlcmllcztcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBTM0xpc3REYXRhIH0gZnJvbSBcIi4vUzNMaXN0RGF0YVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTM1Rlc3QgfSBmcm9tIFwiLi9TM1Rlc3RcIjtcbiJdfQ==