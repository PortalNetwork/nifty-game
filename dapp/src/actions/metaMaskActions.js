import * as types from '../constants/actionTypes';

export const metaMaskAccountAction = (account) =>  ({
  type: types.METAMASK_ACCOUNT,
  account
});

export const metaMaskNetworkAction = (network) =>  ({
  type: types.METAMASK_NETWORK,
  network
});