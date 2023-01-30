/* eslint-disable import/no-extraneous-dependencies */
const { TestEnvironment } = require("jest-environment-node");

class CustomEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
