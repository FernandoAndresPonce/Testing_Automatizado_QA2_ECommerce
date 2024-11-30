const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 0,
  video: false,
  viewportWidth: 1366,
  viewportHeight: 641,
  // chromeWebSecurity: false, //ojo falla! en el caso de hacer test  en sut con seguridad web
  experimentalSessionAndOrigin: true, //lo necesito para el metodo cy.session
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js", // Archivo de soporte
    fixturesFolder: "cypress/fixtures", // Carpeta de fixtures
    screenshotsFolder: "cypress/screenshots", // Carpeta de capturas de pantalla
    videosFolder: "cypress/videos",

    baseUrl: "http://desarrollowebecommerce.somee.com/",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env:{
    adminUser: {
      username: "Admin",
      password: "1234"
    },

    endpoint: {
      initialPage: "http://desarrollowebecommerce.somee.com/",
    }
  }
});
