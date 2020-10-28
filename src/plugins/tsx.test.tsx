import { asserts, ReactDOMServer } from "../../deps.ts";

import Gagic from "../Gagic.ts";
import tsx from "./tsx.tsx";

Deno.test("[tsx]", async () => {
  const gagic = new Gagic();
  gagic.config = { srcDir: "test/fixtures" } as any;
  gagic.pagePaths = ["hello.tsx", "README.md"];
  gagic.pagePropsMap = {
    "hello.tsx": {
      config: gagic.config,
      pagePath: "hello.tsx",
      layoutPath: "_layout.tsx",
      outputPath: "hello.html",
      title: "",
      content: null,
      head: null,
      script: null,
      toc: null,
    },
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
  };
  await tsx.fn(gagic);

  const pageProps_hello = gagic.pagePropsMap["hello.tsx"];
  asserts.assertEquals(
    (ReactDOMServer as any).renderToString(pageProps_hello.content!),
    '<h1 data-reactroot="">Hello world</h1>',
  );
  asserts.assertEquals(pageProps_hello.outputPath, "foo/bar.html");
});
