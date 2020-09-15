import { colors, fs } from "../../deps.ts";

import { GagicPlugin } from "../Gagic.ts";
import { logger } from "../utils/mod.ts";

/** Clean outDir */
const clean: GagicPlugin = {
  name: "clean",
  fn: async (gagic) => {
    if (gagic.rebuilding) {
      logger.success("Clean", colors.underline(gagic.config.outDir));
      await fs.emptyDir(gagic.config.outDir);
    } else {
      logger.success("Clean", "skipped");
    }
  },
};

export default clean;
