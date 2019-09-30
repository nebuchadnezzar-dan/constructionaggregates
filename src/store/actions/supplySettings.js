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

export const fetchSupplySuccess = (supplies, pages) => ({
  type: actionTypes.FETCH_SUPPLY_SUCCESS,
  payload: { supplies, pages }
});

export const fetchSupplyFail = () => ({
  type: actionTypes.FETCH_SUPPLY_FAIL
});

export const fetchSupply = page => {
  return async dispatch => {
    try {
      dispatch(fetchSupplyStart());
      const data = await axios.get(`/settings/supply?page=${page}`);
      dispatch(fetchSupplySuccess(data.data.supply, data.data.pages));
    } catch (e) {
      dispatch(fetchSupplyFail());
    }

  }
}

export const postSupplyStart = () => ({
  type: actionTypes.POST_SUPPLY_START
});

export const postSupplySuccess = supply => ({
  type: actionTypes.POST_SUPPLY_SUCCESS,
  payload: supply
});

export const postSupplyFail = () => ({
  type: actionTypes.POST_SUPPLY_FAIL
});

export const postSupply = data => {
  return async dispatch => {
    try {
      dispatch(postSupplyStart());
      const supply = await axios.post('/settings/supply', data);
      dispatch(postSupplySuccess(supply.data));
    } catch (e) {
      dispatch(postSupplyFail());
    }
  }
};

export const putSupplyStart = () => ({
  type: actionTypes.PUT_SUPPLY_START
});

export const putSupplySuccess = data => ({
  type: actionTypes.PUT_SUPPLY_SUCCESS,
  payload: data
});

export const putSupplyFail = () => ({
  type: actionTypes.PUT_SUPPLY_FAIL
});

export const putSupply = (id, supply) => {
  return async dispatch => {
    try {
      dispatch(putSupplyStart());
      const data = await axios.put(`/settings/supply/${id}`, supply);
      dispatch(putSupplySuccess(data.data));
    } catch (e) {
      dispatch(putSupplyFail());
    }
  }
};
