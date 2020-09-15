import { React } from "../../deps.ts";

import { GagicPlugin } from "../Gagic.ts";
import Gitalk from "./gitalk_component.tsx";
import { compileGagicFile } from "../utils/mod.ts";

const gitalk: GagicPlugin = {
  name: "gitalk",
  insert: "before:script",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      const pageProps = gagic.pagePropsMap[pagePath];

      gagic.pagePropsMap[pagePath] = {
        gitalk: <Gitalk
          {...gagic.config.gitalk}
          id={pageProps.outputPath}
          title={pageProps.title}
        />,
        ...pageProps,
      };
    }

    if (gagic.rebuilding) {
      gagic.writeFiles["_gitalk.js"] = await compileGagicFile(
        "src/plugins/gitalk_component.tsx",
      );
    }
  },
};

export default gitalk;
