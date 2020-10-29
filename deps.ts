export * as fs from "https://deno.land/std@0.75.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.75.0/path/mod.ts";
export * as colors from "https://deno.land/std@0.75.0/fmt/colors.ts";
export * as asserts from "https://deno.land/std@0.75.0/testing/asserts.ts";

// @deno-types="./src/types/react/v16.14.0/react.d.ts"
import React from "https://dev.jspm.io/react@16.14.0";
// @deno-types="./src/types/react-dom/v16.14.0/react-dom.d.ts"
import ReactDOM from "https://dev.jspm.io/react-dom@16.14.0";
// @deno-types="./src/types/react-dom/v16.14.0/server.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.14.0/server.js";
// @deno-types="./src/types/react-helmet/v6.1.0/react-helmet.d.ts"
import ReactHelmet from "https://esm.sh/react-helmet@6.1.0";

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export { React, ReactDOM, ReactDOMServer, ReactHelmet };
