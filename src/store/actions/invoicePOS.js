import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

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

export const setTruck = truck => {
  console.log(truck);
  return ({
    type: actionTypes.SET_TRUCK,
    payload: truck
  })
};

export const toggleFinalPopup = action => ({
  type: actionTypes.TOGGLE_FINAL_POP_UP,
  payload: action
});

export const voidItem = () => ({
  type: actionTypes.VOID_ITEM
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

export const fetchPOSStart = () => ({
  type: actionTypes.FETCH_POS_START
})

export const fetchPOSSuccess = data => ({
  type: actionTypes.FETCH_POS_SUCCESS,
  payload: data
});

export const fetchPOSFail = () => ({
  type: actionTypes.FETCH_POS_FAIL
});

export const fetchPOS = () => {
  return async dispatch => {
    try {
      dispatch(fetchPOSStart());
      const data = await axios.get('/pos');
      dispatch(fetchPOSSuccess(data.data.count));
    } catch (e) {
      dispatch(fetchPOSFail());
    }
  }
};

export const postPosStart = () => ({
  type: actionTypes.POST_POS_START
});

export const postPosSuccess = data => ({
  type: actionTypes.POST_POS_SUCCESS,
  payload: data
});

export const postPosFail = (message) => ({
  type: actionTypes.POST_POS_FAIL,
  payload: message
});

export const postPos = (id, body) => {
  return async dispatch => {
    try {
      dispatch(postPosStart());
      const data = await axios.post(`/pos/${id}`, body);
      if (data.data.error) {
        dispatch(postPosFail(data.data.error));
      } else {
        dispatch(postPosSuccess(data.data.count));
      }
    } catch (e) {
      dispatch(postPosFail());
    }
  }
};

export const popupErrorToggle = () => ({
  type: actionTypes.POPUP_ERROR_TOGGLE
})
