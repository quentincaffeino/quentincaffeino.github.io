import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    define: {
      "import.meta.vitest": "undefined",
    },
    test: {
      environment: "happy-dom",
      include: ['src/**\/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      includeSource: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      coverage: {
        provider: "istanbul",
      },
    },
  })
);
