import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export const fetchSupplyStart = () => ({
  type: actionTypes.FETCH_SUPPLY_START
});

export const fetchSupplySuccess = supplies => ({
  type: actionTypes.FETCH_SUPPLY_SUCCESS,
  payload: supplies
});

export const fetchSupplyFail = () => ({
  type: actionTypes.FETCH_SUPPLY_FAIL
});

export const fetchSupply = () => {
  return async dispatch => {
    try {
      dispatch(fetchSupplyStart());
      const data = await axios.get('/settings/supply');
      dispatch(fetchSupplySuccess(data.data));
    } catch (e) {
      dispatch(fetchSupplyFail());
    }

  }
}
