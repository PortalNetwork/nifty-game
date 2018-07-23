import initialState from './initialState';
import * as types from '../constants/actionTypes';

const systemError = (state, action) => {
  return {message: action.error};
}

export default function (system = initialState.system, action) {
  switch (action.type) {
    case types.SYSTEM_ERROR:
      return systemError(system, action);
    default:
      return system;
  }
}