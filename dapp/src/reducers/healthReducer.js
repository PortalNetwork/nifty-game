import initialState from './initialState';
import * as types from '../constants/actionTypes';

const healthStatus = (state, action) => {
  return action.result;
}

export default function (health = initialState.health, action) {
  switch (action.type) {
    case types.HEALTH_STATUS:
      return healthStatus(health, action);
    default:
      return health;
  }
}