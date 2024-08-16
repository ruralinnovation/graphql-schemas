/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import GeoJSON from '../geojson';
import s3_test from "./s3_test";
import s3_list_data from "./s3_list_data";
// import s3_get_data from "./s3_get_data";

const s3Queries: any = {
  s3_test,
  s3_list_data,
  // s3_get_data
};

export default s3Queries;

export { default as S3ListData } from "./S3ListData";
export { default as S3Test } from "./S3Test";
