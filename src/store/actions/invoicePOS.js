import * as actionTypes from './actionTypes';

export const addItemsToSales = item => ({
  type: actionTypes.ADD_ITEMS_TO_SALES,
  payload: item
});
