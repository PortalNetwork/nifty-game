import * as types from '../constants/actionTypes';

export const addAction = (num) =>  ({
  type: types.ADD,
  num
});

export const subAction = (num) =>  ({
  type: types.SUB,
  num
});