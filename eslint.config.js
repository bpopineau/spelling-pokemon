// eslint.config.js – local linting (no CI, no type-aware rules)

import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  /* Ignore build & vendor folders */
  { ignores: ["dist", "node_modules", "**/*.local", ".DS_Store"] },

  /* Base JS rules */
  js.configs.recommended,

  /* TypeScript (syntax only — no type-info) */
  ...tseslint.configs.recommended,

  /* React & Hooks */
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
        // ‼️  removed "project" & strict type-aware preset
      },
      globals: { ...globals.browser, ...globals.node }
    },

    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh
    },

    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,

      /* React Fast-Refresh boundary rule */
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],

      /* Helpful TS rules that don’t need type-info */
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      /* Style preference */
      "react/function-component-definition": [
        "warn",
        { namedComponents: "arrow-function", unnamedComponents: "arrow-function" }
      ]
    }
  },

  /* Prettier must be last */
  prettierConfig
);
