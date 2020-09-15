import { asserts } from "../../deps.ts";

import Gagic from "../Gagic.ts";
import md from "./md.tsx";

Deno.test("[md]", async () => {
  const gagic = new Gagic();
  gagic.config = { srcDir: "test/fixtures" } as any;
  gagic.pagePaths = ["README.md", "no_toc.md", "no_toc2.md", "foo.tsx"];
  gagic.pagePropsMap = {
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
    "no_toc.md": {
      config: gagic.config,
      pagePath: "no_toc.md",
      layoutPath: "_layout.tsx",
      outputPath: "no_toc.html",
      title: "",
      content: null,
      head: null,
      script: null,
      toc: null,
    },
    "no_toc2.md": {
      config: gagic.config,
      pagePath: "no_toc2.md",
      layoutPath: "_layout.tsx",
      outputPath: "no_toc2.html",
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
  };
  await md.fn(gagic);

  const pagePropsREADME = gagic.pagePropsMap["README.md"];
  asserts.assertEquals(pagePropsREADME.title, "Text Fixtures");
  asserts.assertEquals(pagePropsREADME.author, "xcatliu and yoshixmk");
  asserts.assertEquals(pagePropsREADME.publicPath, "foo/bar.html");
  asserts.assertEquals(
    pagePropsREADME.content!.props.dangerouslySetInnerHTML.__html,
    `<h1>Text Fixtures</h1>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> foo<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre>
<h2 id="header-2">Header 2<a class="anchor" href="#header-2">§</a></h2>
<h3 id="header-3">Header 3<a class="anchor" href="#header-3">§</a></h3>
<h4 id="header-4">Header 4<a class="anchor" href="#header-4">§</a></h4>`,
  );
  asserts.assertEquals(
    pagePropsREADME.toc!.props.dangerouslySetInnerHTML.__html,
    `<nav class="toc"><ol><li><a href="#header-2">Header 2</a><ol><li><a href="#header-3">Header 3</a><ol></ol></li></ol></li></ol></nav>`,
  );

  const pageProps_no_toc = gagic.pagePropsMap["no_toc.md"];
  asserts.assertEquals(pageProps_no_toc.title, undefined);
  asserts.assertEquals(
    pageProps_no_toc.content!.props.dangerouslySetInnerHTML.__html,
    `<p>foo</p>`,
  );
  asserts.assertEquals(pageProps_no_toc.toc, null);

  const pageProps_no_toc2 = gagic.pagePropsMap["no_toc2.md"];
  asserts.assertEquals(pageProps_no_toc2.title, "foo");
  asserts.assertEquals(
    pageProps_no_toc2.content!.props.dangerouslySetInnerHTML.__html,
    `<h1>foo</h1>`,
  );
  asserts.assertEquals(pageProps_no_toc2.toc, null);

  const pageProps_foo = gagic.pagePropsMap["foo.tsx"];
  asserts.assertEquals(pageProps_foo.content, null);
});
