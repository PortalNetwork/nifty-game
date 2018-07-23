import * as types from '../constants/actionTypes';

export const fetching = () => ({
  type: types.FETCHING
});

export const fetchComplete = () => ({
  type: types.FETCH_COMPLETE
});