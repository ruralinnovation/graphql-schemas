import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';

import 'graphiql/graphiql.min.css';

const fetcher = createGraphiQLFetcher({ url: 'http://localhost:4000/graphql' });


const react_app_id: string = 'react-app';
const react_app_container: HTMLElement = document.getElementById(react_app_id) || document.createElement("div");
react_app_container.id = 'graphiql-react-app';
const root = createRoot(react_app_container!);
root.render(<React.StrictMode>
        <GraphiQL fetcher={fetcher} />
    </React.StrictMode>);
