import { getProvider, getSimpleTokenAddress } from './web3Service';
import SimpleToken from './simpleToken';

const Web3 = require('web3');

let web3 = new Web3();
let simpleTokenAddress = '0x0';

const setWeb3Provider = (networkId) => {
  web3.setProvider(new web3.providers.HttpProvider(getProvider(networkId)));
  simpleTokenAddress = getSimpleTokenAddress(networkId);
}

export const getName = (networkId) => {
  try {
    setWeb3Provider(networkId);
    const simpleToken = new SimpleToken(web3, simpleTokenAddress);
    const result = simpleToken.name();
    return result;
  } catch (err) {
    console.log('getName: ', err);
    return 'name not found';
  }
}

export const getSymbol = (networkId) => {
  try {
    setWeb3Provider(networkId);
    const simpleToken = new SimpleToken(web3, simpleTokenAddress);
    const result = simpleToken.symbol();
    return result;
  } catch (err) {
    console.log('getSymbol: ', err);
    return 'symbol not found';
  }
}

export const getDecimals = (networkId) => {
  try {
    setWeb3Provider(networkId);
    const simpleToken = new SimpleToken(web3, simpleTokenAddress);
    const result = simpleToken.decimals();
    return result;
  } catch (err) {
    console.log('getDecimals: ', err);
    return 'decimals not found';
  }
}
