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

export const setTruck = truck => ({
  type: actionTypes.SET_TRUCK,
  payload: truck
});

export const toggleFinalPopup = action => ({
  type: actionTypes.TOGGLE_FINAL_POP_UP,
  payload: action
});

export const voidItem = index => ({
  type: actionTypes.VOID_ITEM,
  payload: index
});

export const editAddress = value => ({
  type: actionTypes.EDIT_ADDRESS,
  payload: value
});

export const resetPos = () => ({
  type: actionTypes.RESET_POS
});

export const editTruckSearchForm = value => ({
  type: actionTypes.EDIT_TRUCK_SEARCH_FORM,
  payload: value
});

export const addDiscount = value => ({
  type: actionTypes.ADD_DISCOUNT,
  payload: value
});

export const setCustomer = customer => ({
  type: actionTypes.SET_CUSTOMER,
  payload: customer
});

export const toggleCustomerDisplay = display => ({
  type: actionTypes.TOGGLE_CUSTOMER_DISPLAY,
  payload: display
});

export const setActiveItemRow = index => ({
  type: actionTypes.SET_ACTIVE_ITEM_ROW,
  payload: index
});

export const editQuantity = value => ({
  type: actionTypes.EDIT_QUANTITY,
  payload: value
});
