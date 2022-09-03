import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    inlineStyleThreshold: 1024 * 4,

    adapter: adapter({
      fallback: "200.html",
      // precompress: true,
    }),

    browser: {
      hydrate: false,
      router: false,
    },

    prerender: {
      default: true,
    },
  },
};

export default config;
