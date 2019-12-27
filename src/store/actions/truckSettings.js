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

export const truckRequestReset = () => ({
  type: actionTypes.TRUCK_REQUEST_RESET
})

export const fetchTruckStart = () => ({
  type: actionTypes.FETCH_TRUCK_START
});

export const fetchTruckSucces = (data, pages) => ({
  type: actionTypes.FETCH_TRUCK_SUCCESS,
  payload: { data, pages }
});

export const fetchTruckFail = () => ({
  type: actionTypes.FETCH_TRUCK_FAIL
});

export const fetchTruck = (page) => {
  return async dispatch => {
    try {
      dispatch(fetchTruckStart());
      const data = await axios.get(`/settings/truck?page=${page}`, {
        headers: {
          Authorization: sessionStorage.getItem('token')
        }
      });
      dispatch(fetchTruckSucces(data.data.truck, data.data.pages));
    } catch (e) {
      dispatch(fetchTruckFail());
    }
  };
};

export const postTruckStart = () => ({
  type: actionTypes.POST_TRUCK_START
});

export const postTruckSuccess = (data) => ({
  type: actionTypes.POST_TRUCK_SUCCESS,
  payload: data
});

export const postTruckFail = () => ({
  type: actionTypes.POST_TRUCK_FAIL
});

export const postTruck = (truckData) => {
  return async dispatch => {
    try {
      dispatch(postTruckStart());
      const data = await axios.post('/settings/truck', truckData);
      if (data.data.error) {
        dispatch(postTruckFail());
      } else {
        dispatch(postTruckSuccess(data.data));
      }
      // console.log(data.data);
    } catch (e) {
      dispatch(postTruckFail());
    }
  }
};

export const putTruckStart = () => ({
  type: actionTypes.PUT_TRUCK_START
});

export const putTruckSuccess = data => ({
  type: actionTypes.PUT_TRUCK_SUCCESS,
  payload: data
});

export const putTruckFail = () => ({
  type: actionTypes.PUT_TRUCK_FAIL
});

export const putTruck = (id, value) => {
  return async dispatch => {
    try {
      const valueMapped = { maxLoad: value.maxLoad, plateNo: value.plateNo, status: value.status }
      dispatch(putTruckStart());
      const data = await axios.put(`/settings/truck/${id}`, valueMapped);
      dispatch(putTruckSuccess(data.data));
    } catch (e) {
      dispatch(putTruckFail());
    }
  }
}

export const deleteStart = () => ({
  type: actionTypes.DELTE_TRUCK_START
});

export const deleteTruckSuccess = (data) => ({
  type: actionTypes.DELETE_TRUCK_SUCCESS
});

export const deleteTruckFail = () => ({
  type: actionTypes.DELTE_TRUCK_FAIL
});

export const deleteTruck = id => {
  return async dispatch => {
    try {
      dispatch(deleteStart());
      const data = await axios.delete(`/settings/truck/${id}`);
      dispatch(deleteTruckSuccess(data.data));
    } catch (e) {
      dispatch(deleteTruckFail());
    }
  }
}