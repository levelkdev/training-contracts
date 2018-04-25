var TokenMaster = artifacts.require("./TokenMaster.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenMaster);
};
