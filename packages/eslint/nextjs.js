module.exports = {
  extends: [
    "plugin:@next/next/core-web-vitals",
    require.resolve("./react"),
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
  },
};
