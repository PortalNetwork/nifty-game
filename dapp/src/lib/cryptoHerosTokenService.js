import { getProvider, getCryptoHerosTokenAddress } from './web3Service';
import CryptoHerosToken from './cryptoHerosToken';

const Web3 = require('web3');

let web3 = new Web3();
let cryptoHerosTokenAddress = '0x0';
let cryptoHerosToken = null;

const setWeb3Provider = (networkId) => {
  web3.setProvider(new web3.providers.HttpProvider(getProvider(networkId)));
  cryptoHerosTokenAddress = getCryptoHerosTokenAddress(networkId);
  cryptoHerosToken = new CryptoHerosToken(web3, cryptoHerosTokenAddress);
}

export const getName = (networkId) => {
  try {
    setWeb3Provider(networkId);
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
    const result = cryptoHerosToken.ownerOf(tokenId);
    return result;
  } catch (err) {
    console.log('getOwnerOf: ', err);
    return 'ownerOf not found';
  }
}

//卡片細節
export const doGetTokenProperty = async (networkId, tokenId) => {
  try {
    setWeb3Provider(networkId);
    const result = await cryptoHerosToken.getTokenProperty(tokenId);
    return result;
  } catch (err) {
    console.log('doGetTokenProperty: ', err);
    return 'getTokenProperty not found';
  }
}

export const doTransferOwnership = (networkId, address) => {
  try {
    setWeb3Provider(networkId);
    const result = cryptoHerosToken.transferOwnership(address);
    return result;
  } catch (err) {
    console.log('doTransferOwnership: ', err);
    return 'transferOwnership not found';
  }
}

//我有多少卡片編號
export const doGetOwnedTokens = (networkId, address) => {
  try {
    setWeb3Provider(networkId);
    const result = cryptoHerosToken.getOwnedTokens(address);
    return result;
  } catch (err) {
    console.log('doGetOwnedTokens: ', err);
    return 'getOwnedTokens not found';
  }
}

export const doGetHerosLength = (networkId) => {
  try {
    setWeb3Provider(networkId);
    const result = cryptoHerosToken.getHerosLength();
    return result;
  } catch (err) {
    console.log('doGetHerosLength: ', err);
    return 'getHerosLength not found';
  }
}

//創造卡片
export const doMint = () => {
  return cryptoHerosToken.mint();
}
