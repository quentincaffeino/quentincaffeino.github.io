import adapter from "@sveltejs/adapter-static";
import graphql from "@rollup/plugin-graphql";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    inlineStyleThreshold: 1024 * 4,

    adapter: adapter({
      // precompress: true,
    }),

    browser: {
      hydrate: dev,
      router: dev,
    },

    vite: () => ({
      plugins: [graphql()],
    }),
  },
};

export default config;
