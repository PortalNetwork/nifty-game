import * as types from '../constants/actionTypes';

export const cryptoHerosTokenNameAction = (networkId) => ({
  type: types.CRYPTOHEROS_TOKEN_NAME,
  networkId
});

export const cryptoHerosTokenSymbolAction = (networkId) => ({
  type: types.CRYPTOHEROS_TOKEN_SYMBOL,
  networkId
});

export const cryptoHerosTokenTokenURIAction = (networkId, tokenId) => ({
  type: types.CRYPTOHEROS_TOKEN_TOKEN_URI,
  networkId,
  tokenId
});

export const cryptoHerosTokenOwnerOfAction = (networkId, tokenId) => ({
  type: types.CRYPTOHEROS_TOKEN_OWNER_OF,
  networkId,
  tokenId
});

export const cryptoHerosTokenTransferOwnershipAction = (networkId, address) => ({
  type: types.CRYPTOHEROS_TOKEN_TRANSFER_OWNERSHIP,
  networkId,
  address
});

export const cryptoHerosTokenGetOwnedTokensAction = (networkId, address) => ({
  type: types.CRYPTOHEROS_TOKEN_GET_OWNED_TOKENS,
  networkId,
  address
});
