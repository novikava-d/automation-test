import allureWriter from "@shelex/cypress-allure-plugin/writer"
import { defineConfig } from "cypress"

module.exports = defineConfig({
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
    retries: {
      runMode: 0,
      openMode: 0
    },
    e2e: {
      baseUrl: 'https://develop-app.aertemp.com/app',
      video: false,
      defaultCommandTimeout: 10000,
      chromeWebSecurity: false,
      testIsolation: false,
      watchForFileChanges: false,
      viewportWidth: 2560,
      viewportHeight: 1440,
      experimentalOriginDependencies: true,
      setupNodeEvents(on, config) {
        allureWriter(on, config);

        return config;
      },
      env: {
        allureReuseAfterSpec: true,
      }
    },
  });