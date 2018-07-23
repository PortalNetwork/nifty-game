import * as types from '../constants/actionTypes';

export const simpleTokenNameAction = (networkId) => ({
  type: types.SIMPLE_TOKEN_NAME,
  networkId
});

export const simpleTokenSymbolAction = (networkId) => ({
  type: types.SIMPLE_TOKEN_SYMBOL,
  networkId
});

export const simpleTokenDecimalsAction = (networkId) => ({
  type: types.SIMPLE_TOKEN_DECIMALS,
  networkId
});
