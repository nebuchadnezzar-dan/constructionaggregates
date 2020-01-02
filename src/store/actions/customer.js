import * as actionTypes from './actionTypes';
import { getHeader } from '../../util/headers'

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

export const setCustomerSorting = (sort, order) => ({
  type: actionTypes.SET_CUSTOMER_SORTING,
  payload: { sort, order }
});



/************************************************************ */
/************************************************************ */
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

export const fetchCustomers = (page, sort, order) => {
  return async dispatch => {
    try {
      dispatch(fetchCustomersStart());
      const data = await axios.get(`/customers?page=${page}&sort=${sort}&order=${order}`, getHeader());
      dispatch(fetchCustomersSuccess(data.data.customer, data.data.pages));
    } catch (e) {
      dispatch(fetchCustomersFail());
    }
  }
};

/************************************************************ */
/************************************************************ */
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
      const data = await axios.get(`/customers/${id}`, getHeader());
      dispatch(fetchCustomerSuccess(data.data));
    } catch (e) {
      dispatch(fetchCustomerFail());
    }
  }
};

/************************************************************ */
/************************************************************ */
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
      const data = await axios.post('/customers', customer, getHeader());
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

/************************************************************ */
/************************************************************ */

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
      const data = await axios.put(`/customers/${id}`, customer, getHeader());
      dispatch(putCustomerSuccess(data.data));
    } catch (error) {
      dispatch(putCustomerFail());
    }
  }
};

/************************************************************ */
/************************************************************ */

export const deleteCustomerStart = () => ({
  type: actionTypes.DELETE_CUSTOMER_START
});

export const deleteCustomerSuccess = data => ({
  type: actionTypes.DELETE_CUSTOMER_SUCCESS,
  payload: data
});

export const deleteCustomerFail = () => ({
  type: actionTypes.DELETE_CUSTOMER_FAIL
});

export const deleteCustomer = id => {
  return async dispatch => {
    try {
      dispatch(deleteCustomerStart());
      const data = await axios.delete(`/customers/${id}`, getHeader());
      dispatch(deleteCustomerSuccess(data.data));
    } catch (e) {
      dispatch(deleteCustomerFail());
    }

  }
};

/************************************************************ */
/************************************************************ */

export const searchCustomerStart = () => ({
  type: actionTypes.SEARCH_CUSTOMER_START
});

export const searchCustomerSuccess = (data, pages) => ({
  type: actionTypes.SEARCH_CUSTOMER_SUCCESS,
  pages, data
});

export const searchCustomerFail = () => ({
  type: actionTypes.SEARCH_CUSTOMER_FAIL
});

export const searchCustomer = (page, customer) => {
  return async dispatch => {
    try {
      dispatch(searchCustomerStart());
      const data = await axios.get(`/customers?search=${customer}&page=${page}`, getHeader());
      dispatch(searchCustomerSuccess(data.data.customer, data.data.pages));
    } catch (e) {
      dispatch(searchCustomerFail());
    }
  }
};

/************************************************************ */
/************************************************************ */

export const fetchCustomerCreditSummaryStart = () => ({
  type: actionTypes.FETCH_CUSTOMER_CREDIT_SUMMARY_START
});

export const fetchCustomerCreditSummarySuccess = data => ({
  type: actionTypes.FETCH_CUSTOMER_CREDIT_SUMMARY_SUCCESS,
  payload: data
});

export const fetchCustomerCreditSummaryFail = () => ({
  type: actionTypes.FETCH_CUSTOMER_CREDIT_SUMMARY_FAIL
});

export const fetchCustomerCreditSummary = (id, page, filter, sort, summary) => {
  return async dispatch => {
    try {
      let request = `/customers/${id}/history?summary=${summary}`;
      if (page) {
        request = `/customers/${id}/history?page=${page}&filter=${filter}&sort=${sort}`;
      }
      dispatch(fetchCustomerCreditSummaryStart());
      const data = await axios.get(request, getHeader());
      dispatch(fetchCustomerCreditSummarySuccess(data.data));
    } catch (e) {
      dispatch(fetchCustomerCreditSummaryFail());
    }
  }
};

