import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'graphiql/graphiql.css';
import { coerceObject, parseObject } from "./@cori-risi/schema/types/json";

(window as any).test_json_functions = {
    coerceObject,
    parseObject
};

const fetcher = createGraphiQLFetcher({ url: 'http://localhost:2000/graphql' });


const react_app_id: string = 'react-app';
const react_app_container: HTMLElement = document.getElementById(react_app_id) || document.createElement("div");
react_app_container.id = 'graphiql-react-app';
const root = createRoot(react_app_container!);
root.render(<React.StrictMode>
        <GraphiQL fetcher={fetcher} />
    </React.StrictMode>);
