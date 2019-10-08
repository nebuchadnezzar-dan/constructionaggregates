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

export const toggleCustomerView = (view) => ({
  type: actionTypes.TOGGLE_CUSTOMER_VIEW,
  payload: view
});

export const fetchCustomersStart = () => ({
  type: actionTypes.FETCH_CUSTOMERS_START
});

export const fetchCustomersSuccess = (data, pages) => ({
  type: actionTypes.FETCH_CUSTOMERS_SUCCESS,
  data, pages
});

export const fetchCustomersFail = () => ({
  type: actionTypes.FETCH_CUSTOMERS_FAIL
});

export const fetchCustomers = page => {
  return async dispatch => {
    try {
      dispatch(fetchCustomersStart());
      const data = await axios.get(`/customers?page=${page}`);
      dispatch(fetchCustomersSuccess(data.data.customer, data.data.pages));
    } catch (e) {
      dispatch(fetchCustomersFail());
    }
  }
};


export const fetchCustomerStart = () => ({
  type: actionTypes.FETCH_CUSTOMER_START
});

export const fetchCustomerSuccess = customer => ({
  type: actionTypes.FETCH_CUSTOMER_SUCCESS,
  payload: customer
});

export const fetchCustomerFail = () => ({
  type: actionTypes.FETCH_CUSTOMER_FAIL
});

export const fetchCustomer = id => {
  return async dispatch => {
    try {
      dispatch(fetchCustomerStart());
      const data = await axios.get(`/customers/${id}`);
      dispatch(fetchCustomerSuccess(data.data));
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
      const data = await axios.post('/customers', customer);
      if (data.data.error) {
        dispatch(postCustomerFail());
      } else {
        dispatch(postCustomerSuccess(data.data));
      }
    } catch (e) {
      dispatch(postCustomerFail());
    }
  }
};

export const putCustomerStart = () => ({
  type: actionTypes.PUT_CUSTOMER_START
});

export const putCustomerSuccess = data => ({
  type: actionTypes.PUT_CUSTOMER_SUCCESS,
  payload: data
});


export const putCustomerFail = () => ({
  type: actionTypes.PUT_CUSTOMER_FAIL
});

export const putCustomer = (id, customer) => {
  return async dispatch => {
    try {
      dispatch(putCustomerStart());
      const data = await axios.put(`/customers/${id}`, customer);
      dispatch(putCustomerSuccess(data.data));
    } catch (error) {
      // console.error(error)
      // console.log(error);
      dispatch(putCustomerFail());
    }
  }
};