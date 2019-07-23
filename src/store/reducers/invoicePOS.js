import * as actionTypes from '../actions/actionTypes';

const initialState = {
  itemsToBuy: [],
  popup: false,
  quantityForm: 1,
  truck: '',
  finalPopup: false,
  actionButton: '',
  address: '',
  truckSearchInput: '',
  discount: 0
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
          quantity: +itemsCopy[itemIndex].quantity + +state.quantityForm
        };
        // itemsCopy[itemIndex] = action.payload;
      } else {
        itemsCopy = itemsCopy.concat({
          ...action.payload,
          quantity: state.quantityForm
        });
      }
      return {
        ...state,
        itemsToBuy: itemsCopy,
        quantityForm: 1
      };
    case actionTypes.TOGGLE_POP_UP:
      return {
        ...state,
        popup: action.payload
      };
    case actionTypes.ON_CHANGE_QUANTITY:
      return {
        ...state,
        quantityForm: action.payload
      };
    case actionTypes.SET_TRUCK:
      return {
        ...state,
        truck: action.payload
      };
    case actionTypes.TOGGLE_FINAL_POP_UP:
      return {
        ...state,
        finalPopup: action.payload.toggle,
        actionButton: action.payload.name
      };
    case actionTypes.VOID_ITEM:
      return {
        ...state,
        itemsToBuy: state.itemsToBuy.filter((_, i) => i !== action.payload)
      };
    case actionTypes.EDIT_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case actionTypes.RESET_POS:
      return {
        ...state,
        itemsToBuy: [],
        popup: false,
        quantityForm: 1,
        truck: '',
        finalPopup: false,
        address: '',
        truckSearchInput: '',
        discount: 0
      };
    case actionTypes.EDIT_TRUCK_SEARCH_FORM:
      return {
        ...state,
        truckSearchInput: action.payload
      };
    case actionTypes.ADD_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
        finalPopup: false
      };
    default:
      return state;
  }
};

export default reducer;
