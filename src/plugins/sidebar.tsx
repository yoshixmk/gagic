import type Gagic from "../Gagic.ts";
import type { GagicPlugin } from "../Gagic.ts";

export interface GagicConfigSidebar {
  [prefix: string]: OneGagicConfigSidebar;
}

export type OneGagicConfigSidebar = (
  | {
    text?: string;
    link?: string;
    children?: OneGagicConfigSidebar;
  }
  | string
)[];

export type PagePropsSidebar = {
  text: string;
  link?: string;
  children?: PagePropsSidebar;
  pagePath?: string;
}[];

const sidebar: GagicPlugin = {
  name: "sidebar",
  insert: "after:tsx",
  fn: async (gagic) => {
    if (!gagic.config.sidebar) {
      return;
    }

    for (const pagePath of gagic.pagePaths) {
      const pageProps = gagic.pagePropsMap[pagePath];

      let parsedSidebar: {
        [prefix: string]: PagePropsSidebar;
      } = {};
      for (
        const [prefix, oneConfig] of Object.entries({
          ...gagic.config.sidebar,
          ...(gagic.config.i18n?.overrides?.[pageProps.language!]
            ?.sidebar as GagicConfigSidebar),
        })
      ) {
        parsedSidebar[prefix] = parseSidebarConfig(oneConfig, gagic);
      }

      for (const [prefix, pagePropsSidebar] of Object.entries(parsedSidebar)) {
        if (`/${pageProps.outputPath}`.startsWith(prefix)) {
          gagic.pagePropsMap[pagePath] = {
            sidebar: pagePropsSidebar,
            ...pageProps,
          };
          break;
        }
      }
    }
  },
};

function parseSidebarConfig(
  sidebarConfig: OneGagicConfigSidebar,
  gagic: Gagic,
): PagePropsSidebar {
  return sidebarConfig.map((sidebarConfigItem) => {
    if (typeof sidebarConfigItem === "string") {
      return {
        text: gagic.pagePropsMap[sidebarConfigItem].title,
        link: gagic.pagePropsMap[sidebarConfigItem].outputPath,
        pagePath: gagic.pagePropsMap[sidebarConfigItem].pagePath,
      };
    }
    // Deep clone
    let item = JSON.parse(
      JSON.stringify(sidebarConfigItem),
    ) as PagePropsSidebar[0];
    if (typeof item.text === "undefined" && typeof item.link !== "undefined") {
      item.text = gagic.pagePropsMap[item.link].title;
    }
    if (typeof item.link !== "undefined") {
      item.pagePath = item.link;
      item.link = gagic.pagePropsMap[item.link].outputPath;
    }
    if (Array.isArray(item.children)) {
      item.children = parseSidebarConfig(item.children, gagic);
    }
    return item;
  });
}

export default sidebar;
