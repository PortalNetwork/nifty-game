var Promise = require('bluebird');

const cryptoHerosGameInterface = []

function CryptoHerosGame(web3, address) {
  this.web3 = web3;
  const cryptoHerosGameContract = web3.eth.contract(cryptoHerosGameInterface);
  this.cryptoHerosGamePromise = Promise.resolve(Promise.promisifyAll(cryptoHerosGameContract.at(address)));
}

CryptoHerosGame.prototype.name = function (callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.nameAsync();
  });
}

module.exports = CryptoHerosGame;