// import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { printSchema } from 'graphql';
import mergeSchemas from './src/merge-schemas';
import * as queries from './src/@cori-risi/schema/queries';

const schemas = mergeSchemas(queries as unknown as [any]);

try {
  if (!existsSync('dist')) {
    mkdirSync('dist');
  }
  writeFileSync('dist/schema.graphql', printSchema(schemas));
} catch (e) {}

export {
  schemas as schema
};
