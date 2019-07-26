import * as actionTypes from './actionTypes';

export const addCustomer = customer => ({
  type: actionTypes.ADD_CUSTOMER,
  payload: customer
});
