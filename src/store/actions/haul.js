import * as actionTypes from './actionTypes'
import {getHeader} from '../../util/headers'

import axios from '../../axios-orders'

export const addSuppliesToHaul = supply => ({
  type: actionTypes.ADD_SUPPLIES_TO_HAUL,
  payload: supply
})

export const editInputSupplyHaul = (id, value, from) => ({
  type: actionTypes.EDIT_INPUT_SUPPLY_HAUL,
  id, value, from
})

export const setTruckForHaul = truck => ({
  type: actionTypes.SET_TRUCK_FOR_HAUL,
  truck
})

export const removeSupplyHaul = id => ({
  type: actionTypes.REMOVE_SUPPLY_HAUL,
  id
})

/*********************POST********** */

export const postHaulStart = () => ({
  type: actionTypes.POST_HAUL_START
})

export const postHaulSuccess = haul => ({
  type: actionTypes.POST_HAUL_SUCCESS,
  haul
})

export const postHaulFail = () => ({
  type: actionTypes.POST_INVOICE_FAIL
})

export const postHaul = haulSend => {
  return async dispatch => {
    try{
      dispatch(postHaulStart())
      const data = await axios.post('/haul', haulSend, getHeader())
      dispatch(postHaulSuccess(data.data))
    }catch(e){
      dispatch(postHaulFail())
    }
  }
}

/********************************** */

/************************GET ALL ******/

export const getHaulsStart = () => ({
  type: actionTypes.GET_HAULS_START
})

export const getHaulsSuccess = hauls => ({
  type: actionTypes.GET_HAULS_SUCCESS,
  hauls
})

export const getHaulsFail = () => ({
  type: actionTypes.GET_HAULS_FAIL
})

export const getHauls = () => {
  return async dispatch => {
    try {
      dispatch(getHaulsStart())
      const data = await axios.get('/haul', getHeader())
      dispatch(getHaulsSuccess(data.data))
    }catch(e) {
      dispatch(getHaulsFail())
    }
  }
}

/*********************************** */