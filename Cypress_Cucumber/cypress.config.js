const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default

module.exports = defineConfig({
  retries: 0,
  video: false,
  viewportWidth: 1366,
  viewportHeight: 641,
  experimentalSessionAndOrigin: true,

  e2e: {
    specPattern: "**/*.feature",
    
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    baseUrl: "http://desarrollowebecommerce.somee.com/",

    
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    
  },

  env: {
    adminUser: {
      username: "Admin",
      password: "1234",
    },

    endpoint: {
      initialPage: "http://desarrollowebecommerce.somee.com/",
    },
  },
});