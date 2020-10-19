export * as fs from "https://deno.land/std@0.74.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.74.0/path/mod.ts";
export * as colors from "https://deno.land/std@0.74.0/fmt/colors.ts";
export * as asserts from "https://deno.land/std@0.74.0/testing/asserts.ts";

// @deno-types="./src/types/react/v16.14.0/react.d.ts"
import React from "https://dev.jspm.io/react@16.14.0";
import ReactDOM from "https://dev.jspm.io/react-dom@16.14.0";
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.14.0/server.js";

(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

export { React, ReactDOM, ReactDOMServer };
