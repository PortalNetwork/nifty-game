import * as types from '../constants/actionTypes';

export const warningOpenAction = (message) =>  ({
  type: types.WARNING_OPEN,
  message
});

export const warningCloseAction = () =>  ({
  type: types.WARNING_CLOSE
});