// ISO Language Code Table
// http://www.lingoes.net/en/translator/langcode.htm

import i18next from "https://deno.land/x/i18next@v19.6.3/index.js";
import { Trans as TransComponent } from "../vendors/react-i18next/Trans.js";

import { path, React } from "../../deps.ts";
import type { GagicConfig, GagicPlugin } from "../Gagic.ts";
import { copyGagicFile } from "../utils/mod.ts";

let gagicConfig: GagicConfig;

const i18n: GagicPlugin = {
  name: "i18n",
  insert: "after:init",
  fn: async (gagic) => {
    if (!gagic.config.i18n) {
      return;
    }
    for (const pagePath of gagic.pagePaths) {
      const pageProps = gagic.pagePropsMap[pagePath];

      const language = gagic.config.i18n.languages.find(({ code }: any) =>
        pagePath.startsWith(`${code}/`)
      )?.code ??
        gagic.config.i18n.languages[0].code;

      gagic.pagePropsMap[pagePath] = {
        ...pageProps,
        language,
        head: (
          <>
            {pageProps.head}
            <script type="module" src={`${gagic.config.root}i18n.js`} />
          </>
        ),
        config: {
          ...gagic.config,
          ...gagic.config.i18n.overrides?.[language],
        },
      };
    }

    if (gagic.rebuilding) {
      gagicConfig = gagic.config;

      await i18next.init(
        {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          ...gagic.config.i18n,
        },
        () => {},
      );

      const i18nScriptDest = path.resolve(gagic.config.outDir, "i18n.js");
      await copyGagicFile("src/plugins/i18n_script.js", i18nScriptDest);
    }
  },
};

export const t = (input: string) => {
  i18next.changeLanguage((window as any).pageProps.language, () => {});
  return i18next.t(input);
};

export const Trans = (props: any) => {
  i18next.changeLanguage((window as any).pageProps.language, () => {});
  return <TransComponent i18n={i18next} {...props} />;
};

export default i18n;
