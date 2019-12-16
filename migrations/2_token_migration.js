const Token = artifacts.require("Token");

module.exports = function(deployer) {
  // when testing, following address should be put
  //in test/addresses.js
  deployer.deploy(Token,
                  //contract owner
                  '0x5028962E797ae4e401aF4E252849D3A3E75cdD2E',
                  //reserve holder
                  '0x72F45a1E0DA87Fe826b3A6535ad014bd01F56Ef5');
};
