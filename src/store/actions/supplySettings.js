import * as actionTypes from './actionTypes';

export const activeSupply = name => ({
  type: actionTypes.ACTIVE_SUPPLY,
  payload: name
});

export const addSupplyValue = name => ({
  type: actionTypes.ADD_SUPPLY_VALUE,
  payload: name
});
export const valueChangeSupply = (name, value) => ({
  type: actionTypes.VALUE_CHANGE_SUPPLY,
  payload: { name, value }
});
