import { asserts } from "../../deps.ts";

import Gagic from "../Gagic.ts";
import init from "./init.tsx";

Deno.test("[init]", async () => {
  const gagic = new Gagic();
  // @ts-ignore
  gagic.config = { head: null };
  gagic.pagePaths = ["README.md", "foo.tsx", "bar/baz.md"];
  gagic.layoutPaths = ["bar/_layout.tsx", "_layout.tsx"];
  await init.fn(gagic);
  asserts.assertEquals(gagic.pagePropsMap, {
    "README.md": {
      config: gagic.config,
      pagePath: "README.md",
      layoutPath: "_layout.tsx",
      outputPath: "index.html",
      title: "",
      content: null,
      head: null,
      script: null,
      toc: null,
    },
    "foo.tsx": {
      config: gagic.config,
      pagePath: "foo.tsx",
      layoutPath: "_layout.tsx",
      outputPath: "foo.html",
      title: "",
      content: null,
      head: null,
      script: null,
      toc: null,
    },
    "bar/baz.md": {
      config: gagic.config,
      pagePath: "bar/baz.md",
      layoutPath: "bar/_layout.tsx",
      outputPath: "bar/baz.html",
      title: "",
      content: null,
      head: null,
      script: null,
      toc: null,
    },
  });
});
