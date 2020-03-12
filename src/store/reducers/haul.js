import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

const initialState = {
  supplies: [],
  suppliesInput: {},
  trucks: {},
  message:'',
  loading: false,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_SUPPLIES_TO_HAUL:
      const suppliesMap = {...state.suppliesInput, [action.payload.id]: { qty: '', amount: '', id: action.payload.id, name: action.payload.name }}
      return {...state, 
              supplies: state.supplies.concat(action.payload),
              suppliesInput: suppliesMap }
    case actionTypes.REMOVE_SUPPLY_HAUL:
      const mappedSupplies = _.omitBy(state.suppliesInput, supply => supply.id === +action.id)
      return {...state, suppliesInput: mappedSupplies}
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
      return {...state, trucks: mappedTruck}
    case actionTypes.POST_HAUL_START:
        return {...state, loading: true}
    case actionTypes.POST_HAUL_SUCCESS:
        return {...state, loading: false, message: action.haul}
    case actionTypes.POST_INVOICE_FAIL:
        return {...state, loading:false, error: true}
    default: return state
  }
}

export default reducer