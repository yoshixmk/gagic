import { path, React } from "../../deps.ts";

import type { GagicPlugin } from "../Gagic.ts";
import { import_ } from "../utils/mod.ts";

const tsx: GagicPlugin = {
  name: "tsx",
  fn: async (gagic) => {
    for (
      const pagePath of gagic.pagePaths.filter((pagePath) =>
        pagePath.endsWith(".tsx")
      )
    ) {
      const pageProps = gagic.pagePropsMap[pagePath];
      const fullPagePath = path.resolve(gagic.config.srcDir, pagePath);
      const { default: ContentComponent, frontMatter } = await import_(
        fullPagePath,
        {
          reload: true,
        },
      );

      gagic.pagePropsMap[pagePath] = {
        ...pageProps,
        content: <ContentComponent />,
        ...frontMatter,
      };
    }
  },
};

export default tsx;
