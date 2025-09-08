module.exports = {
  extends: ["turbo", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project: ["tsconfig.json"],
      },
    },
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "import/no-cycle": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
  },
};
