// eslint.config.js – flat-config ESLint v9
// --------------------------------------------------------------
// • Enforces TypeScript-strict + React best practices
// • Integrates Prettier formatting (must be last in extends array)
// • Works out-of-the-box with Vite + React 18

import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // 1) Ignore patterns
  {
    ignores: [
      "dist",
      "node_modules",
      "**/*.local",
      ".DS_Store",
    ],
  },

  // 2) Base JavaScript rules (ESLint recommended)
  js.configs.recommended,

  // 3) TypeScript rules (strict)
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // 4) React & hooks
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
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
      // React
      ...eslintPluginReact.configs.recommended.rules,
      // Hooks
      ...eslintPluginReactHooks.configs.recommended.rules,

      // Ensure React Refresh boundaries are safe
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // TypeScript strictness
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Prefer arrow-functions for components
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },

  // 5) Prettier has to be last to disable conflicting stylistic rules
  prettierConfig
);
