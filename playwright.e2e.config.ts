import type { PlaywrightTestConfig } from "@playwright/test";
import merge from "lodash.merge";
import baseConfig from "./playwright.config.ts";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = merge({}, baseConfig, {
  /**
   * Only the files matching one of these patterns are executed as test files. Matching is performed against the absolute
   * file path. Strings are treated as glob patterns.
   *
   * By default, Playwright Test looks for files matching `.*(test|spec)\.(js|ts|mjs)`.
   *
   * Use [testConfig.testMatch](https://playwright.dev/docs/api/class-testconfig#test-config-test-match) to change this
   * option for all projects.
   */
  testMatch: ['**\/*.e2e.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
});

export default config;
