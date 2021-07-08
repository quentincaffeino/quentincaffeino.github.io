import adapter from "@sveltejs/adapter-static";
import graphql from "@rollup/plugin-graphql";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: Object.assign(
    {
      target: "#svelte",

      hydrate: dev,
      router: dev,

      vite: () => ({
        plugins: [graphql()],
      }),
    },
    !dev
      ? {
          adapter: adapter(),
        }
      : {}
  ),
};

export default config;
