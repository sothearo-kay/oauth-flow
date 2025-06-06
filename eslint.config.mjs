// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.vue"],
  rules: {
    "@typescript-eslint/no-empty-object-type": "off",
  },
});
