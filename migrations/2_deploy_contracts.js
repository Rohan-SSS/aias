const testContract = artifacts.require("testContract");
const testForm = artifacts.require("testForm")

module.exports = function (deployer) {
  deployer.deploy(testContract);
  deployer.deploy(testForm);
};
