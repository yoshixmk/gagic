import { fs, path, React } from "../../deps.ts";

import type { GagicPlugin } from "../Gagic.ts";
import { importDefault, importTheme } from "../utils/mod.ts";

const layout: GagicPlugin = {
  name: "layout",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      const pageProps = gagic.pagePropsMap[pagePath];
      let Layout = null;
      const fullLayoutPath = path.resolve(
        gagic.config.srcDir,
        pageProps.layoutPath,
      );
      if (await fs.exists(fullLayoutPath)) {
        Layout = await importDefault(fullLayoutPath, {
          reload: gagic.rebuilding,
        });
      } else {
        Layout = await importTheme(gagic.config.theme, pageProps.layoutPath);
      }
      gagic.pagePropsMap[pagePath] = {
        ...pageProps,
        content: <Layout {...pageProps} />,
      };
    }
  },
};

export default layout;
