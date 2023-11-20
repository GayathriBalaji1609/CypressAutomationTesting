const { defineConfig } = require("cypress");
module.exports = defineConfig({
  videoCompression: true,
  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
    specPattern: 'cypress/LoginTest/LoginTestCase/*.js'
  },
  
});
