import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getTokenURI
} from '../lib/cryptoHerosTokenService';

export function* getCryptoHerosTokenOwnedTokenURIResultSaga({networkId, tokenId, callBack}) {
  try {
    yield put({ type: types.FETCHING}); 
    const cryptoHerosTokenOwnedTokenURIResult = yield call(getTokenURI, networkId, tokenId);
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.CRYPTOHEROS_TOKEN_TOKEN_URI_SUCCESS, result: cryptoHerosTokenOwnedTokenURIResult, callBack });
  } catch (err) {
    yield put({ type: types.SYSTEM_ERROR, error: err });
  }
};
