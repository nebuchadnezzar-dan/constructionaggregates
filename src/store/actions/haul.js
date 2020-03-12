import * as actionTypes from './actionTypes'

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