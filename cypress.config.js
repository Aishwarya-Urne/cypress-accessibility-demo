const { defineConfig } = require("cypress");

const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
        return launchOptions;
      });

      on('task', {
        lighthouse: lighthouse(),
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config;
    },
  },
};