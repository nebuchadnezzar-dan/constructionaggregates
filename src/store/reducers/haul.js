import * as actionTypes from '../actions/actionTypes'

const initialState = {
  supplies: [],
  suppliesInput: {}
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
    default: return state
  }
}

export default reducer