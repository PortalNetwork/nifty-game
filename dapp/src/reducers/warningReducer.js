import initialState from './initialState';
import * as types from '../constants/actionTypes';

const warningOpen = (state, action) => {
  return {message: action.message, open: true};
}

const warningClose = (state, action) => {
  return {message: '', open: false};
}

export default function (warning = initialState.warning, action) {
  switch (action.type) {
    case types.WARNING_OPEN:
      return warningOpen(warning, action);
    case types.WARNING_CLOSE:
      return warningClose(warning, action);
    default:
      return warning;
  }
}