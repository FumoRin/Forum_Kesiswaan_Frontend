import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      import: pluginImport,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
    rules: {
      // JavaScript recommended rules
      ...js.configs.recommended.rules,

      // React recommended rules
      ...pluginReact.configs.recommended.rules,

      // Strict variable and import checking
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-use-before-define": "error",

      // Import validation
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
      "import/no-unused-modules": "error",

      // React specific
      "react/prop-types": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",

      // Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Additional best practices
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
];
