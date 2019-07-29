import * as actionTypes from './actionTypes';

export const addCustomer = customer => ({
  type: actionTypes.ADD_CUSTOMER,
  payload: customer
});

export const addCredit = (payload,credit) => ({
  type: actionTypes.ADD_CREDIT,
  payload, credit
})