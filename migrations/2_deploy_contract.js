const CryptoHerosToken = artifacts.require("CryptoHerosToken");
const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  const cryptoHerosToken = await deployer.deploy(CryptoHerosToken, "CryptoHerosToken", "HERO");
  // const addresses = {
  //   tokenAddress: CryptoHerosToken.address
  // };

  // await writeFile(
  //   path.join(__dirname, "..", "dapp", "src", "addresses.json"),
  //   JSON.stringify(addresses)
  // );
};

// https://github.com/ensdomains/ens/blob/master/migrations/2_deploy_contracts.js
