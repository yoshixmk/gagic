import { path } from "../../deps.ts";

import { gagicRootPath } from "./filepath.ts";
import type { GagicPlugin, GagicThemeConfig } from "../Gagic.ts";

const importCache: {
  [importPath: string]: any;
} = {};

interface ImportOptions {
  reload?: boolean;
}

/** Import gagic mod default */
export async function importGagicModDefault<T = any>(
  pathToGagicRoot: string,
  options: ImportOptions = {},
): Promise<T> {
  const mod = await importGagicMod<{ default: T }>(pathToGagicRoot, options);
  return mod.default;
}
/** Import gagic mod */
export async function importGagicMod<T = any>(
  pathToGagicRoot: string,
  options: ImportOptions = {},
): Promise<T> {
  const mod = await import_<T>(`${gagicRootPath}/${pathToGagicRoot}`, options);
  return mod;
}
/** Import plugin */
export async function importPlugin(pluginName: string) {
  if (/^https?:\/\//.test(pluginName)) {
    return await importDefault<GagicPlugin>(pluginName);
  } else {
    return await importGagicModDefault<GagicPlugin>(
      `src/plugins/${pluginName}.tsx`,
    );
  }
}
/** Import theme or themeFile */
export async function importTheme(theme: string, themeFile?: string) {
  if (/^https?:\/\//.test(theme)) {
    return await importDefault<GagicThemeConfig>(
      themeFile ? theme.replace(/\/[^\/]+$/, `/${themeFile}`) : theme,
    );
  } else {
    return await importGagicModDefault<GagicThemeConfig>(
      `src/themes/${theme}/${themeFile ?? "mod.ts"}`,
    );
  }
}
/** Replacement of dynamic import default */
export async function importDefault<T = any>(
  importPath: string,
  options: ImportOptions = {},
): Promise<T> {
  const mod = await import_<{ default: T }>(importPath, options);
  return mod.default;
}
/** Replacement of dynamic import, enable cache by default, support reload options */
export async function import_<T = any>(
  importPath: string,
  options: ImportOptions = {},
): Promise<T> {
  let finalImportPath = importPath;
  if (finalImportPath.startsWith("/") || finalImportPath.substr(1, 1) === ":") {
    finalImportPath = `file://${finalImportPath}`;
  }
  if (!options.reload) {
    if (importCache[finalImportPath]) {
      return importCache[finalImportPath];
    }
  }
  let versionQuery = "";
  if (options.reload) {
    versionQuery = `?version=${Math.random().toString().slice(2)}${
      path.extname(importPath)
    }`;
  }

  let mod = await import(`${finalImportPath}${versionQuery}`);

  importCache[finalImportPath] = mod;
  return mod;
}
