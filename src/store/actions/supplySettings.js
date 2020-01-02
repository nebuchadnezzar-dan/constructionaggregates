import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { getHeader } from '../../util/headers'

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
      const data = await axios.get(`/settings/supply?page=${page}`, getHeader());
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
      const supply = await axios.post('/settings/supply', data, getHeader());
      if (supply.data.error) {
        dispatch(postSupplyFail());
      } else {
        dispatch(postSupplySuccess(supply.data));
      }
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
      const data = await axios.put(`/settings/supply/${id}`, supply, getHeader());
      dispatch(putSupplySuccess(data.data));
    } catch (e) {
      dispatch(putSupplyFail());
    }
  }
};

export const deleteSupplyStart = () => ({
  type: actionTypes.DELETE_SUPPLY_START
});

export const deleteSupplySuccess = data => ({
  type: actionTypes.DELETE_SUPPLY_SUCCESS
});

export const deleteSupplyFail = () => ({
  type: actionTypes.DELETE_SUPPLY_FAIL
});

export const deleteSupply = id => {
  return async dispatch => {
    try {
      dispatch(deleteSupplyStart());
      const data = await axios.delete(`/settings/supply/${id}`, getHeader());
      console.log(data.data);
      dispatch(deleteSupplySuccess(data.data));
    } catch (e) {
      dispatch(deleteSupplyFail());
    }
  }
};

export const searchSupplyStart = () => ({
  type: actionTypes.SEARCH_SUPPLY_START
});

export const searchSupplySuccess = data => ({
  type: actionTypes.SEARCH_SUPPLY_SUCCESS,
  payload: data
});

export const searchSupplyFail = () => ({
  type: actionTypes.SEARCH_CUSTOMER_FAIL
});

export const searchSupply = search => {
  return async dispatch => {
    try {
      dispatch(searchSupplyStart());
      const data = await axios(`/settings/supply?search=${search}`, getHeader());
      dispatch(searchSupplySuccess(data.data));
    } catch (e) {
      dispatch(searchSupplyFail());
    }
  }
}
