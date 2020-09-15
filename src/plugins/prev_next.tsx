import { GagicPlugin } from "../Gagic.ts";
import { PagePropsSidebar } from "./sidebar.tsx";
import { pick, depthFirstTraversal } from "../utils/mod.ts";

const prev_next: GagicPlugin = {
  name: "prev_next",
  insert: "after:sidebar",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      let pageProps = gagic.pagePropsMap[pagePath];
      if (typeof pageProps.prev === "string") {
        pageProps.prev = {
          text: gagic.pagePropsMap[pageProps.prev].title,
          link: gagic.pagePropsMap[pageProps.prev].outputPath,
        };
      }
      if (typeof pageProps.next === "string") {
        pageProps.next = {
          text: gagic.pagePropsMap[pageProps.next].title,
          link: gagic.pagePropsMap[pageProps.next].outputPath,
        };
      }
      if (!pageProps.sidebar) continue;
      gagic.pagePropsMap[pagePath] = {
        ...getPrevAndNext(pageProps.sidebar, pagePath),
        ...pageProps,
      };
    }
  },
};

function getPrevAndNext(pagePropsSidebar: PagePropsSidebar, pagePath: string) {
  let last: any = null;
  let prev: any = null;
  let next: any = null;
  let found = false;
  let shouldBreak = false;
  // Deep clone
  depthFirstTraversal(pagePropsSidebar, (current) => {
    if (shouldBreak) return;
    if (found) {
      next = current;
      shouldBreak = true;
      return;
    }
    if (current.pagePath === pagePath) {
      found = true;
      prev = last;
    } else {
      last = current;
    }
  });
  return {
    prev: pick(prev, ["text", "link"]),
    next: pick(next, ["text", "link"]),
  };
}

export default prev_next;
