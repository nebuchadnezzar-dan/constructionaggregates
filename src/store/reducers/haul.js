import * as actionTypes from '../actions/actionTypes'

const initialState = {
  supplies: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_SUPPLIES_TO_HAUL:
      return {...state, supplies: state.supplies.concat(action.payload)}
    default: return state
  }
}

export default reducer