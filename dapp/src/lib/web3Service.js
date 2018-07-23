export const getProvider = (networkId) => {
  switch (networkId) {
    case '1':
      return 'https://mainnet.infura.io/';
    case '3':
      return 'https://ropsten.infura.io/';
    case '4':
      return 'https://rinkeby.infura.io/';
    case '42':
      return 'https://kovan.infura.io/';
    default:
      return 'http://localhost:3000/';
  }
}

export const getSimpleTokenAddress = (networkId) => {
  switch (networkId) {
    case '1':
      return '0x0';
    case '3':
      return '0x131855dda0aaff096f6854854c55a4debf61077a';
    case '4':
      return '0x0';
    case '42':
      return '0x0';
    default:
      return '0x0';
  }
}

export const getCryptoHerosTokenAddress = (networkId) => {
  switch (networkId) {
    case '1':
      return '0x0';
    case '3':
      return '0x5dff6cabf3bfcf331617f110d377b332134e1782';
    case '4':
      return '0x0';
    case '42':
      return '0x0';
    default:
      return '0x0';
  }
}

export const getCurrentAddress = (web3) => {
  if (web3 === null) return;
  return web3.eth.accounts[0];
}

export const getCurrentNetwork = (web3) => {
  if (web3 === null) return;
  return web3.version.network;
}
