import { fs, path, React } from "../../deps.ts";

import {
  copyGagicFile,
  compile,
  compileFile,
  compileGagicFile,
  reactElementToJSXString,
  replaceExt,
  underlineToPascal,
  pick,
} from "../utils/mod.ts";
import Gagic, { GagicPlugin } from "../Gagic.ts";

const script: GagicPlugin = {
  name: "script",
  fn: async (gagic) => {
    for (const pagePath of gagic.pagePaths) {
      let pageProps = gagic.pagePropsMap[pagePath];

      pageProps.script = (
        <>
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react@16.14.0/umd/react.production.min.js"
          />
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-dom@16.14.0/umd/react-dom.production.min.js"
          />
          <script type="module" src={`${gagic.config.root}index.js`} />
        </>
      );

      if (pagePath.endsWith(".tsx")) {
        const contentDest = replaceExt(pageProps.outputPath, "_content.js");
        const compileSrc = path.resolve(gagic.config.srcDir, pagePath);
        gagic.writeFiles[contentDest] = await compileFile(compileSrc);
      }

      /** First is module name, second is module path */
      let importComponentList: [string, string][] = [];
      let propsCompileResult = compile(`
        export default {
          ${
        Object.keys(pageProps)
          .map((key) => {
            const value: any = pageProps[key];
            if (key === "config") {
              importComponentList.push(
                ["projectConfig", `${gagic.config.root}gagic.config.js`],
              );
              return `config: { ${
                JSON.stringify(pick(Gagic.defaultConfig, ["root"])).slice(
                  1,
                  -1,
                )
              }, ...projectConfig, ...projectConfig.i18n?.overrides?.['${pageProps.language}'] }`;
            } else if (React.isValidElement(value)) {
              if (
                typeof value.type !== "string" &&
                typeof value.type.name !== "undefined"
              ) {
                const componentName = value.type.name;
                let modulePath: string;
                if (underlineToPascal(`_${key}`) === componentName) {
                  modulePath = `${gagic.config.root}_${key}.js`;
                } else {
                  modulePath = `./${
                    replaceExt(
                      path.basename(pageProps.outputPath),
                      `_${key}.js`,
                    )
                  }`;
                }
                importComponentList.push([componentName, modulePath]);
              }
              return `'${key}': ${reactElementToJSXString(value)}`;
            } else {
              return `'${key}': ${JSON.stringify(value, null, 2)}`;
            }
          })
          .join(",\n")
      }
        }
      `);

      propsCompileResult = `${
        importComponentList
          .map(([componentName, modulePath]) =>
            `import ${componentName} from '${modulePath}';`
          )
          .join("\n")
      }\n${propsCompileResult}`;

      const propsDest = replaceExt(pageProps.outputPath, "_props.js");
      gagic.writeFiles[propsDest] = propsCompileResult;
    }

    if (gagic.rebuilding) {
      for (const layoutPath of gagic.layoutPaths) {
        const layoutDest = replaceExt(layoutPath, ".js");
        const compileSrc = path.resolve(gagic.config.srcDir, layoutPath);
        if (await fs.exists(compileSrc)) {
          gagic.writeFiles[layoutDest] = await compileFile(compileSrc);
        } else {
          gagic.writeFiles[layoutDest] = await compileGagicFile(
            `src/themes/${gagic.config.theme}/${layoutPath}`,
          );
        }
      }

      gagic.writeFiles["gagic.config.js"] = await compileFile(
        gagic.gagicConfigPath,
      );

      const scriptIndexDest = path.resolve(gagic.config.outDir, "index.js");
      await copyGagicFile("src/plugins/script_index.js", scriptIndexDest);
    }
  },
};

export default script;
