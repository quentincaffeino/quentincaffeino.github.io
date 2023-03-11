import { defineConfig } from "@playwright/experimental-ct-svelte";
import type { PlaywrightTestConfig } from "@playwright/experimental-ct-svelte";
import merge from "lodash.merge";
import baseConfig from "./playwright.config.ts";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = defineConfig(
  merge({}, baseConfig, {
    /**
     * Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute
     * file path. Strings are treated as glob patterns.
     *
     * By default, Playwright Test looks for files matching `.*(test|spec)\.(js|ts|mjs)`.
     *
     * Use [testConfig.testMatch](https://playwright.dev/docs/api/class-testconfig#test-config-test-match) to change this
     * option for all projects.
     */
    testMatch: ["**/*.ct.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    snapshotDir: "./__snapshots__",
    /* Maximum time one test can run for. */
    timeout: 10 * 1000,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: "on-first-retry",

      viewport: { width: 500, height: 500 },

      /* Port to use for Playwright component endpoint. */
      ctPort: 3100,
    },
  })
);

export default config;
