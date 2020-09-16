import { React } from "../../deps.ts";

import type { GagicPlugin } from "../Gagic.ts";
import Ga from "./ga_component.tsx";
import { compileGagicFile } from "../utils/mod.ts";

const ga: GagicPlugin = {
  name: "ga",
  insert: "before:script",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      const pageProps = gagic.pagePropsMap[pagePath];

      gagic.pagePropsMap[pagePath] = {
        head: (
          <>
            <Ga {...gagic.config.ga} />
            {pageProps.head}
          </>
        ),
        ...pageProps,
      };
    }

    if (gagic.rebuilding) {
      gagic.writeFiles["_ga.js"] = await compileGagicFile(
        "src/plugins/ga_component.tsx",
      );
    }
  },
};

export default ga;
