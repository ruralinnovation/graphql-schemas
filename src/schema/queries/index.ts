export { default as acsQueries } from './acs';
export { default as bcatQueries } from './bcat';
// export { default as chQueries } from './ch'; // infrastructure fails to bundle with dependency
                                                // on npm modules 'sequelize' => 'pg-hstore':
                                                // Bundling asset cori-data-api-local/ApolloServer/handler/Code/Stage...
                                                // ✘ [ERROR] Could not resolve "pg-hstore"
                                                //
                                                //     node_modules/sequelize/lib/dialects/postgres/hstore.js:2:23:
                                                //       2 │ const hstore = require("pg-hstore")({ sanitize: true });
                                                //         ╵                        ~~~~~~~~~~~
                                                //
                                                //   You can mark the path "pg-hstore" as external to exclude it from the bundle, which will remove
                                                //   this error. You can also surround this "require" call with a try/catch block to handle this
                                                //   failure at run-time instead of bundle-time.

export { default as ercQueries } from './erc';
