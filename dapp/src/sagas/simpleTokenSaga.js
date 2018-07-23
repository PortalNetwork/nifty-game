import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getName, 
  getSymbol,
  getDecimals 
} from '../lib/tokenService';

export function* getSimpleTokenNameResultSaga({networkId}) {
  try {
    yield put({ type: types.FETCHING}); 
    const simpleTokenNameResult = yield call(getName, networkId);
    yield put({ type: types.FETCH_COMPLETE});
    
    yield put({ type: types.SIMPLE_TOKEN_NAME_SUCCESS, result: simpleTokenNameResult });
  } catch (err) {
    yield put({ type: types.SYSTEM_ERROR, error: err });
  }
};

export function* getSimpleTokenSymbolResultSaga({networkId}) {
  try {
    yield put({ type: types.FETCHING}); 
    const simpleTokenSymbolResult = yield call(getSymbol, networkId);
    yield put({ type: types.FETCH_COMPLETE});
    
    yield put({ type: types.SIMPLE_TOKEN_SYMBOL_SUCCESS, result: simpleTokenSymbolResult });
  } catch (err) {
    yield put({ type: types.SYSTEM_ERROR, error: err });
  }
};

export function* getSimpleTokenDecimalsResultSaga({networkId}) {
  try {
    yield put({ type: types.FETCHING}); 
    const simpleTokenDecimalsResult = yield call(getDecimals, networkId);
    yield put({ type: types.FETCH_COMPLETE});
    const decimal = simpleTokenDecimalsResult.toNumber();

    yield put({ type: types.SIMPLE_TOKEN_DECIMALS_SUCCESS, result: decimal });
  } catch (err) {
    yield put({ type: types.SYSTEM_ERROR, error: err });
  }
};
