// eslint.config.js  – flat-config with type-info enabled
import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const tsconfigRoot = dirname(fileURLToPath(import.meta.url)); // repo root

export default tseslint.config(
  /* ───────── Ignored paths ───────── */
  { ignores: ["dist", "node_modules", "**/*.local", ".DS_Store"] },

  /* ───────── Base JS rules ───────── */
  js.configs.recommended,

  /* ───────── TypeScript rules ─────── */
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  /* ───────── React + Hooks ───────── */
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },

        // ***  ADD THESE TWO LINES  ***
        project: ["./tsconfig.json"],          // ← tells ESLint where type-info lives
        tsconfigRootDir: tsconfigRoot,         // repo root for globs
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
    },

    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },

  /* ───────── Prettier (last) ───────── */
  prettierConfig
);
