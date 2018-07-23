import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { getHealthResultSaga } from './healthSaga';
import {
  getSimpleTokenNameResultSaga,
  getSimpleTokenSymbolResultSaga,
  getSimpleTokenDecimalsResultSaga,
} from './simpleTokenSaga';
import {
  getCryptoHerosTokenNameResultSaga,
  getCryptoHerosTokenSymbolResultSaga
} from './cryptoHerosTokenSaga';
import {
  getCryptoHerosTokenGetOwnedTokensResultSaga
} from './cryptoHerosOwnedSaga';
import { 
  getCryptoHerosTokenOwnedTokenURIResultSaga 
} from './cryptoHerosOwnedTokenURISaga';

export function* watchHealth() {
  yield takeLatest(types.HEALTH, getHealthResultSaga);
}

export function* watchSimpleTokenName() {
  yield takeLatest(types.SIMPLE_TOKEN_NAME, getSimpleTokenNameResultSaga);
}

export function* watchSimpleTokenSymbol() {
  yield takeLatest(types.SIMPLE_TOKEN_SYMBOL, getSimpleTokenSymbolResultSaga);
}

export function* watchSimpleTokenDecimals() {
  yield takeLatest(types.SIMPLE_TOKEN_DECIMALS, getSimpleTokenDecimalsResultSaga);
}

export function* watchCryptoHerosTokenName() {
  yield takeLatest(types.CRYPTOHEROS_TOKEN_NAME, getCryptoHerosTokenNameResultSaga);
}

export function* watchCryptoHerosTokenSymbol() {
  yield takeLatest(types.CRYPTOHEROS_TOKEN_SYMBOL, getCryptoHerosTokenSymbolResultSaga);
}

export function* watchCryptoHerosTokenGetOwnedTokens() {
  yield takeLatest(types.CRYPTOHEROS_TOKEN_GET_OWNED_TOKENS, getCryptoHerosTokenGetOwnedTokensResultSaga);
}

export function* watchCryptoHerosTokenOwnedTokenURI() {
  yield takeLatest(types.CRYPTOHEROS_TOKEN_TOKEN_URI, getCryptoHerosTokenOwnedTokenURIResultSaga);
}
