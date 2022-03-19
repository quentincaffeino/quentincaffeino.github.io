import adapter from "@sveltejs/adapter-static";
import graphql from "@rollup/plugin-graphql";
import dot from "rollup-plugin-dot";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    inlineStyleThreshold: 1024 * 4,

    adapter: adapter({
      // precompress: true,
    }),

    browser: {
      hydrate: false,
      router: false,
    },

    vite: () => ({
      plugins: [
        graphql(),
        dot({
          include: ["src/**/*.tpl"],
          templateSettings: { strip: false },
        }),
      ],
    }),
  },
};

export default config;
