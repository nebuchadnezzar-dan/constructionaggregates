import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

const initialState = {
  supplies: [],
  suppliesInput: {},
  trucks: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_SUPPLIES_TO_HAUL:
      const suppliesMap = {...state.suppliesInput, [action.payload.id]: { qty: 0, amount: 0, id: action.payload.id, name: action.payload.name }}
      return {...state, 
              supplies: state.supplies.concat(action.payload),
              suppliesInput: suppliesMap }
    case actionTypes.EDIT_INPUT_SUPPLY_HAUL:
      return {...state, suppliesInput: {...state.suppliesInput, [action.id]: {...state.suppliesInput[action.id], [action.from]: action.value} }}
    case actionTypes.SET_TRUCK_FOR_HAUL:
      const id = Object.keys(state.trucks).findIndex(el => +el === action.truck.id)
      let mappedTruck = {...state.trucks}
      if(id !== -1) {
        mappedTruck = _.omitBy(mappedTruck, truck => truck.id === action.truck.id )
      } else {
        mappedTruck[action.truck.id] = action.truck
      }
      // const mappedTruck = _.mapKeys(action.truck, truck=>truck.id )
      return {...state, trucks: mappedTruck}
    default: return state
  }
}

export default reducer