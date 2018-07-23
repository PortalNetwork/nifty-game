import { fork, all } from 'redux-saga/effects';
import { 
  watchHealth,
  watchSimpleTokenName,
  watchSimpleTokenSymbol,
  watchSimpleTokenDecimals,
  watchCryptoHerosTokenName,
  watchCryptoHerosTokenSymbol,
  watchCryptoHerosTokenGetOwnedTokens,
  watchCryptoHerosTokenOwnedTokenURI
} from './watcher';

export default function* startForman() {
  yield all([
    fork(watchHealth),
    fork(watchSimpleTokenName),
    fork(watchSimpleTokenSymbol),
    fork(watchSimpleTokenDecimals),
    fork(watchCryptoHerosTokenName),
    fork(watchCryptoHerosTokenSymbol),
    fork(watchCryptoHerosTokenGetOwnedTokens),
    fork(watchCryptoHerosTokenOwnedTokenURI)
  ]);
};
