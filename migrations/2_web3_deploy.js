const ConstrParamWeb3 = artifacts.require("ConstrParamWeb3");

module.exports = function (deployer) {
  deployer.deploy(ConstrParamWeb3, 8);
};