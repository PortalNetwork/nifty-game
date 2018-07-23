import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (count = initialState.count, action) {
  switch (action.type) {
    case types.ADD:
      return count+1;
    case types.SUB:
      return count-1;
    default:
      return count;
  }
}