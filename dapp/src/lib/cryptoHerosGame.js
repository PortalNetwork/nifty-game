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

CryptoHerosGame.prototype.symbol = function (callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.symbolAsync();
  });
}

CryptoHerosGame.prototype.ownerOf = function (tokenId, callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.ownerOfAsync(tokenId);
  });
}

CryptoHerosGame.prototype.tokenURI = function (tokenId, callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.tokenURIAsync(tokenId);
  });
}

CryptoHerosGame.prototype.transferOwnership = function (address, callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.transferOwnershipAsync(address);
  });
}

CryptoHerosGame.prototype.getOwnedTokens = function (address, callback) {
  return this.cryptoHerosGamePromise.then(function (cryptoHerosGame) {
    return cryptoHerosGame.getOwnedTokensAsync(address);
  });
}

module.exports = CryptoHerosGame;