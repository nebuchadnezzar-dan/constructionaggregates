import * as actionTypes from './actionTypes';

export const activeRoute = route => ({
  type: actionTypes.ACTIVE_ROUTE,
  payload: route
});

export const toggleSideBar = (val) => ({
  type: actionTypes.TOGGLE_SIDE_BAR,
  payload: val
});
