import * as actionTypes from './actionTypes'

export const addSuppliesToHaul = supply => ({
  type: actionTypes.ADD_SUPPLIES_TO_HAUL,
  payload: supply
})