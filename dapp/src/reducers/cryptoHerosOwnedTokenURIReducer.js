import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchOwnedTokenURI = (state, action) => {
  let tokenURI = JSON.parse(action.result);
  console.log(tokenURI.name);
  return {
    name: tokenURI.name, 
    image: 'https://ipfs.infura.io/ipfs/' + tokenURI.image,
    HP: tokenURI.HP,
    ATK: tokenURI.ATK,
    DEF: tokenURI.DEF
  };
}

export default function (cryptoHerosOwnedTokenURI = initialState.cryptoHerosOwnedTokenURI, action) {
  switch (action.type) {
    case types.CRYPTOHEROS_TOKEN_TOKEN_URI_SUCCESS:
      return fetchOwnedTokenURI(cryptoHerosOwnedTokenURI, action);
    default:
      return cryptoHerosOwnedTokenURI;
  }
}
