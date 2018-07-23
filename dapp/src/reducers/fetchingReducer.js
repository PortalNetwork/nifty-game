import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function (state = initialState.isFecthing, action) {
  switch (action.type) {
  case types.FETCHING:
    return true;
  case types.FETCH_COMPLETE:
    return false;
  default:
    return state;
  }
}