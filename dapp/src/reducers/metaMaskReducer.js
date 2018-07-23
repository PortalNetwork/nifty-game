import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchAccount = (state, action) => {
  return {account: action.account, network: state.network};
}

const fetchNetwork = (state, action) => {
  return {account: state.account, network: action.network};
}

export default function (metaMask = initialState.metaMask, action) {
  switch (action.type) {
    case types.METAMASK_ACCOUNT:
      return fetchAccount(metaMask, action);
    case types.METAMASK_NETWORK:
      return fetchNetwork(metaMask, action);
    default:
      return metaMask;
  }
}