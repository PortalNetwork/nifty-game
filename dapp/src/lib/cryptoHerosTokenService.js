import { getProvider, getCryptoHerosTokenAddress } from './web3Service';
import CryptoHerosToken from './cryptoHerosToken';

const Web3 = require('web3');

let web3 = new Web3();
let cryptoHerosTokenAddress = '0x0';

const setWeb3Provider = (networkId) => {
  web3.setProvider(new web3.providers.HttpProvider(getProvider(networkId)));
  cryptoHerosTokenAddress = getCryptoHerosTokenAddress(networkId);
}

export const getName = (networkId) => {
  try {
    setWeb3Provider(networkId);
    const cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
    const result = cryptoHerosToken.name();
    return result;
  } catch (err) {
    console.log('getName: ', err);
    return 'name not found';
  }
}

export const getSymbol = (networkId) => {
  try {
    setWeb3Provider(networkId);
    const cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
    const result = cryptoHerosToken.symbol();
    return result;
  } catch (err) {
    console.log('getSymbol: ', err);
    return 'symbol not found';
  }
}

export const getOwnerOf = (networkId, tokenId) => {
  try {
    setWeb3Provider(networkId);
    const cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
    const result = cryptoHerosToken.ownerOf(tokenId);
    return result;
  } catch (err) {
    console.log('getOwnerOf: ', err);
    return 'ownerOf not found';
  }
}

export const getTokenURI = (networkId, tokenId) => {
  try {
    setWeb3Provider(networkId);
    const cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
    const result = cryptoHerosToken.tokenURI(tokenId);
    return result;
  } catch (err) {
    console.log('getTokenURI: ', err);
    return 'tokenURI not found';
  }
}

export const doTransferOwnership = (networkId, address) => {
  try {
    setWeb3Provider(networkId);
    const cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
    const result = cryptoHerosToken.transferOwnership(address);
    return result;
  } catch (err) {
    console.log('doTransferOwnership: ', err);
    return 'transferOwnership not found';
  }
}

export const doGetOwnedTokens = (networkId, address) => {
  try {
    setWeb3Provider(networkId);
    const cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
    const result = cryptoHerosToken.getOwnedTokens(address);
    return result;
  } catch (err) {
    console.log('doGetOwnedTokens: ', err);
    return 'doGetOwnedTokens not found';
  }
}
