// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src/",

  build: {
    transpile: ["vue-sonner"],
  },

  runtimeConfig: {
    githubClientId: "",
    githubClientSecret: "",
    githubCallbackUrl: "",
    sessionSecret: "",
    public: {
      apiUrl: "",
    },
  },

  modules: [
    "vue-sonner/nuxt",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/eslint",
  ],

  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },

  primevue: {
    options: {
      ripple: true,
      theme: "none",
    },
  },

  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "km", language: "km-KH", file: "km.json" },
    ],
    lazy: true,
    restructureDir: false,
    langDir: "locales/",
    defaultLocale: "km",
    strategy: "prefix_except_default",
  },

  icon: {
    size: "20px",
    customCollections: [
      {
        prefix: "icon",
        dir: "./src/assets/icons",
      },
    ],
  },

  imports: {
    dirs: ["~/stores"],
  },
});
