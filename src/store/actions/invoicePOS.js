import * as actionTypes from './actionTypes';

export const addItemsToSales = item => ({
  type: actionTypes.ADD_ITEMS_TO_SALES,
  payload: item
});

export const togglePopup = popup => ({
  type: actionTypes.TOGGLE_POP_UP,
  payload: popup
});

export const onChangeQuantity = value => ({
  type: actionTypes.ON_CHANGE_QUANTITY,
  payload: value
});
