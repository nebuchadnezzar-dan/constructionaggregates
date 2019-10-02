import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const addCustomer = customer => ({
  type: actionTypes.ADD_CUSTOMER,
  payload: customer
});

export const addCredit = (payload, credit) => ({
  type: actionTypes.ADD_CREDIT,
  payload, credit
});

export const fetchCustomerStart = () => ({
  type: actionTypes.FETCH_CUSTOMER_START
});

export const fetchCustomerSuccess = (data, pages) => ({
  type: actionTypes.FETCH_CUSTOMER_SUCCESS,
  data, pages
});

export const fetchCustomerFail = () => ({
  type: actionTypes.FETCH_CUSTOMER_FAIL
});

export const fetchCustomer = page => {
  return async dispatch => {
    try {
      dispatch(fetchCustomerStart());
      const data = await axios.get(`/customer?page=${page}`);
      dispatch(fetchCustomerSuccess(data.data.customer, data.data.pages));
    } catch (e) {
      dispatch(fetchCustomerFail());
    }
  }
};

export const postCustomerStart = () => ({
  type: actionTypes.POST_CUSTOMER_START
});

export const postCustomerSuccess = data => ({
  type: actionTypes.POST_CUSTOMER_SUCCESS,
  payload: data
});

export const postCustomerFail = () => ({
  type: actionTypes.POST_CUSTOMER_FAIL
});

export const postCustomer = customer => {
  return async dispatch => {
    try {
      dispatch(postCustomerStart());
      const data = await axios.post('/customer', customer);
      if (data.data.error) {
        dispatch(postCustomerFail());
      } else {
        dispatch(postCustomerSuccess(data.data));
      }
    } catch (e) {
      dispatch(postCustomerFail());
    }
  }
}