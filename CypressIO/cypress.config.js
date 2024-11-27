const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',    // Archivo de soporte
    fixturesFolder: 'cypress/fixtures',        // Carpeta de fixtures
    screenshotsFolder: 'cypress/screenshots',  // Carpeta de capturas de pantalla
    videosFolder: 'cypress/videos',   
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
