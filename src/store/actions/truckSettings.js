import * as actionTypes from './actionTypes';

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
