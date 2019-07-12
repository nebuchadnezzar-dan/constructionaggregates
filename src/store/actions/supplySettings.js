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

export const editSupplySettings = (index, value) => ({
  type: actionTypes.EDIT_SUPPLY_SETTINGS,
  payload: { index, value }
});

export const deleteSupplySettings = index => ({
  type: actionTypes.DELETE_SUPPLY_SETTINGS,
  payload: index
});
