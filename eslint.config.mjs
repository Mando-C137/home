import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import nextRouteParams from "eslint-plugin-next-route-params";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "next-route-params": nextRouteParams,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: true,
        },
    },

    rules: {
        "next-route-params/enforce-route-params": "error",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",

        "@typescript-eslint/consistent-type-imports": ["warn", {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
        }],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/require-await": "off",

        "@typescript-eslint/no-misused-promises": ["error", {
            checksVoidReturn: {
                attributes: false,
            },
        }],
    },
}]);