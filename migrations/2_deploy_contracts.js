const testContract = artifacts.require("testContract");
const testForm = artifacts.require("testForm")
const testIPFS = artifacts.require("testIPFS")

module.exports = function (deployer) {
  deployer.deploy(testContract);
  deployer.deploy(testForm);
  deployer.deploy(testIPFS);
};
