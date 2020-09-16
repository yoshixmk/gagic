import { fs, path, ReactDOMServer } from "../../deps.ts";
import ReactHelmet from "https://dev.jspm.io/react-helmet@6.1.0";
const { Helmet } = ReactHelmet;

import type { GagicPlugin } from "../Gagic.ts";
import {
  ensureDirAndWriteFileStr,
  ensureDirAndCopy,
  copyGagicFile,
  download,
} from "../utils/mod.ts";

const out: GagicPlugin = {
  name: "out",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      const pageProps = gagic.pagePropsMap[pagePath];
      const { outputPath, content } = pageProps;
      if (content === null) {
        throw new Error("content is null");
      }
      const fullFilePath = path.resolve(gagic.config.outDir, outputPath);
      (window as any).pageProps = pageProps;
      let htmlString = ReactDOMServer.renderToString(content);
      const helmet = Helmet.renderStatic();
      const helmetString = [
        "meta",
        "title",
        "base",
        "style",
        "link",
        "noscript",
        "script",
      ]
        .map((key) => helmet[key].toString())
        .filter((str) => str !== "")
        .join("\n");

      htmlString = `<!doctype html>${htmlString}`;
      // helmet not empty
      if (helmetString !== '<title data-react-helmet="true"></title>') {
        htmlString = htmlString.replace(
          "</head>",
          `\n${helmetString}\n</head>`,
        );
      }
      await ensureDirAndWriteFileStr(fullFilePath, htmlString);
    }

    for (const staticPath of gagic.staticPaths) {
      const src = path.resolve(gagic.config.srcDir, staticPath);
      const dest = path.resolve(gagic.config.outDir, staticPath);
      if (await fs.exists(src)) {
        await ensureDirAndCopy(src, dest, { overwrite: true });
      } else {
        if (/^https?:\/\//.test(gagic.config.theme)) {
          await download(
            gagic.config.theme.replace(/\/[^\/]+$/, `/${staticPath}`),
            dest,
          );
        } else {
          await copyGagicFile(
            `src/themes/${gagic.config.theme}/${staticPath}`,
            dest,
          );
        }
      }
    }

    for (const [filePath, content] of Object.entries(gagic.writeFiles)) {
      const fullFilePath = path.resolve(gagic.config.outDir, filePath);
      await ensureDirAndWriteFileStr(fullFilePath, content);
    }
  },
};

export default out;
