import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchName = (state, action) => {
  return {name: action.result, symbol: state.symbol};
}

const fetchSymbol = (state, action) => {
  return {name: state.name, symbol: action.result};
}

export default function (cryptoHerosToken = initialState.cryptoHerosToken, action) {
  switch (action.type) {
    case types.CRYPTOHEROS_TOKEN_NAME_SUCCESS:
      return fetchName(cryptoHerosToken, action);
    case types.CRYPTOHEROS_TOKEN_SYMBOL_SUCCESS:
      return fetchSymbol(cryptoHerosToken, action);
    default:
      return cryptoHerosToken;
  }
}
