module.exports = {
    overrides: [
      {
        extends: [
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ],
        files: ["*.ts"],
        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: __dirname,
        },
      },
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-non-null-assertion": "off"
    },
  };
  