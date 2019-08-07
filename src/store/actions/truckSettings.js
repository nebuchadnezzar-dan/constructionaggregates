import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const addTruck = () => ({
  type: actionTypes.ADD_TRUCK
});

export const removeTruck = index => ({
  type: actionTypes.REMOVE_TRUCK,
  payload: index
});

export const valueChangeTruck = (index, name, value) => ({
  type: actionTypes.VALUE_CHANGE_TRUCK,
  payload: { index, name, value }
});

export const saveTruck = () => ({
  type: actionTypes.SAVE_TRUCK
});

export const editTruckSettings = (index, value) => ({
  type: actionTypes.EDIT_TRUCK_SETTINGS,
  payload: { index, value }
});

export const deleteTruckSettings = index => ({
  type: actionTypes.DELETE_TRUCK_SETTINGS,
  payload: index
});

export const fetchTruckStart = () => ({
  type: actionTypes.FETCH_TRUCK_START
});

export const fetchTruckSucces = data => ({
  type: actionTypes.FETCH_TRUCK_SUCCESS,
  payload: data
});

export const fetchTruckFail = () => ({
  type: actionTypes.FETCH_TRUCK_FAIL
});

export const fetchTruck = () => {
  return async dispatch => {
    try {
      dispatch(fetchTruckStart());
      const data = await axios.get('/settings/truck');
      dispatch(fetchTruckSucces(data.data));
    } catch (e) {
      dispatch(fetchTruckFail());
    }
  };
};
