import { combineReducers } from 'redux';
import count from './counterReducer';
import system from './systemReducer';
import isFetching from './fetchingReducer';
import health from './healthReducer';
import simpleToken from './simpleTokenReducer';
import warning from './warningReducer';
import metaMask from './metaMaskReducer';
import cryptoHerosToken from './cryptoHerosTokenReducer';
import cryptoHerosOwned from './cryptoHerosOwnedReducer';
import cryptoHerosOwnedTokenURI from './cryptoHerosOwnedTokenURIReducer';

const appReducer = combineReducers({
  count,
  system,
  isFetching,
  health,
  simpleToken,
  warning,
  metaMask,
  cryptoHerosToken,
  cryptoHerosOwned,
  cryptoHerosOwnedTokenURI
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
