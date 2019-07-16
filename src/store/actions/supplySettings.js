import * as actionTypes from './actionTypes';

export const activeSupply = name => ({
  type: actionTypes.ACTIVE_SUPPLY,
  payload: name
});

export const addSupplyValue = name => ({
  type: actionTypes.ADD_SUPPLY_VALUE,
  payload: name
});
export const valueChangeSupply = (name, inputMod, value) => ({
  type: actionTypes.VALUE_CHANGE_SUPPLY,
  payload: { name, inputMod, value }
});

export const editSupplySettings = (index, value) => ({
  type: actionTypes.EDIT_SUPPLY_SETTINGS,
  payload: { index, value }
});

export const deleteSupplySettings = index => ({
  type: actionTypes.DELETE_SUPPLY_SETTINGS,
  payload: index
});

export const addMaterialToSupply = supplyName => ({
  type: actionTypes.ADD_MATERIAL_TO_SUPPLY,
  payload: supplyName
});
