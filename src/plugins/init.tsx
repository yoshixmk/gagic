import type { GagicPlugin } from "../Gagic.ts";
import { getOutputPath, findNearestLayoutPath } from "../utils/mod.ts";

/** Init gagic.pagePropsMap */
const init: GagicPlugin = {
  name: "init",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      const layoutPath = findNearestLayoutPath(pagePath, gagic.layoutPaths);
      const outputPath = getOutputPath(pagePath);
      gagic.pagePropsMap[pagePath] = {
        config: gagic.config,
        pagePath,
        layoutPath,
        outputPath,
        title: "",
        content: null,
        head: gagic.config.head,
        script: null,
        toc: null,
      };
    }
  },
};

export default init;
