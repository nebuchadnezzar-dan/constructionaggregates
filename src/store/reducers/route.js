import * as actionTypes from '../actions/actionTypes';

const initialState = {
  // get back here
  activeRoute: ['Dashboard'],
  sideBar: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: action.payload
      };
    case actionTypes.TOGGLE_SIDE_BAR:
      return {
        ...state,
        sideBar: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
