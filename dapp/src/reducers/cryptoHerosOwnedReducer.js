import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchOwned = (state, action) => {
  // console.log("fetchOwned:", action.result);
  if(action.callBack) action.callBack(action.result);
  return action.result;
}

export default function (cryptoHerosOwned = initialState.cryptoHerosOwned, action) {
  switch (action.type) {
    case types.CRYPTOHEROS_TOKEN_GET_OWNED_TOKENS_SUCCESS:
      return fetchOwned(cryptoHerosOwned, action);
    default:
      return cryptoHerosOwned;
  }
}
