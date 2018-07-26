import { getProvider, getCryptoHerosGameAddress } from './web3Service';
import CryptoHerosGame from './cryptoHerosGame';

const Web3 = require('web3');

let web3 = new Web3();
let cryptoHerosGameAddress = '0x0';
let cryptoHerosGame = null;

const setWeb3Provider = (networkId) => {
  web3.setProvider(new web3.providers.HttpProvider(getProvider(networkId)));
  cryptoHerosGameAddress = getCryptoHerosGameAddress(networkId);
  cryptoHerosGame = new CryptoHerosGame(web3, cryptoHerosGameAddress);
}

export const doCreateSingleGame = (networkId, tokenId) => {
    setWeb3Provider(networkId);
    return cryptoHerosGame.createSingleGame(tokenId);
}

export const doGetUserSingleGames = (networkId, addres) => {
  try {
    setWeb3Provider(networkId);
    const result = cryptoHerosGame.getUserSingleGames(addres);
    return result;
  } catch (err) {
    console.log('doGetUserSingleGames: ', err);
    return 'getUserSingleGames not found';
  }
}

export const getSingleGame = (networkId, gameId, address) => {
  try {
    setWeb3Provider(networkId);
    const result = cryptoHerosGame.singleGames(gameId);
    return result;
  } catch (err) {
    console.log('getSingleGame: ', err);
    return 'singleGame not found';
  }
}
