import * as actionTypes from '../actions/actionTypes';

const initialState = {
  itemsToBuy: [],
  popup: false
};

const reducer = (state = initialState, action) => {
  let itemsCopy;
  switch (action.type) {
    case actionTypes.ADD_ITEMS_TO_SALES:
      itemsCopy = [...state.itemsToBuy];
      const itemIndex = itemsCopy.findIndex(
        item => item.materials === action.payload.materials
      );
      if (itemIndex !== -1) {
        itemsCopy[itemIndex] = {
          ...itemsCopy[itemIndex],
          quantity: itemsCopy[itemIndex].quantity + 1
        };
      } else {
        itemsCopy = itemsCopy.concat({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        itemsToBuy: itemsCopy
      };
    case actionTypes.TOGGLE_POP_UP:
      return {
        ...state,
        popup: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
