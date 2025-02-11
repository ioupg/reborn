import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.js", "src/**/*.mjs"],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    }
  },
  pluginJs.configs.recommended
];