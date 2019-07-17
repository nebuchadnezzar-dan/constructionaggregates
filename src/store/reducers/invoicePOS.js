import * as actionTypes from '../actions/actionTypes';

const initialState = {
  itemsToBuy: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS_TO_SALES:
      return {
        ...state,
        itemsToBuy: state.itemsToBuy.concat(action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
