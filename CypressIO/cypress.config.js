const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
    experimentalSessionAndOrigin : true,//lo necesito para el metodo cy.session
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
});
