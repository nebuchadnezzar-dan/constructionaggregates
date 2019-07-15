import * as actionTypes from './actionTypes';

export const activeRoute = route => ({
  type: actionTypes.ACTIVE_ROUTE,
  payload: route
});
