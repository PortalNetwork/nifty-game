import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getName, 
  getSymbol
} from '../lib/cryptoHerosTokenService';

export function* getCryptoHerosTokenNameResultSaga({networkId}) {
  try {
    console.log(networkId);
    yield put({ type: types.FETCHING}); 
    const cryptoHerosTokenNameResult = yield call(getName, networkId);
    yield put({ type: types.FETCH_COMPLETE});

    yield put({ type: types.CRYPTOHEROS_TOKEN_NAME_SUCCESS, result: cryptoHerosTokenNameResult });
  } catch (err) {
    yield put({ type: types.SYSTEM_ERROR, error: err });
  }
};

export function* getCryptoHerosTokenSymbolResultSaga({networkId}) {
  try {
    yield put({ type: types.FETCHING}); 
    const cryptoHerosTokenSymbolResult = yield call(getSymbol, networkId);
    yield put({ type: types.FETCH_COMPLETE});
    
    yield put({ type: types.CRYPTOHEROS_TOKEN_SYMBOL_SUCCESS, result: cryptoHerosTokenSymbolResult });
  } catch (err) {
    yield put({ type: types.SYSTEM_ERROR, error: err });
  }
};
