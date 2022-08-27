import { sveltekit } from "@sveltejs/kit/vite";
import graphql from "@rollup/plugin-graphql";
import dot from "rollup-plugin-dot";

/** @type {import(vite).UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    graphql(),
    dot({
      include: ["src/**/*.tpl"],
      templateSettings: { strip: false },
    }),
  ],
};

export default config;
