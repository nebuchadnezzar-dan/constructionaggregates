import * as actionTypes from '../actions/actionTypes';

const initialState = {
  itemsToBuy: [],
  popup: false,
  quantityForm: 1,
  trucks: [],
  finalPopup: false,
  actionButton: '',
  address: '',
  truckSearchInput: '',
  discount: 0,
  customer: '',
  activeRow: '',
  displayCustomer: 'display',
  customerNo: 0,
  fetchLoading: false,
  fetchError: false,
  posLoading: false,
  posError: false,
  popupError: false
};

const reducer = (state = initialState, action) => {
  let itemsCopy;
  switch (action.type) {
    case actionTypes.ADD_ITEMS_TO_SALES:
      itemsCopy = [...state.itemsToBuy];
      const itemIndex = itemsCopy.findIndex(
        item => item.id === action.payload.id
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
      let truckCopy = [...state.trucks];
      const id = truckCopy.findIndex(el => action.payload.id === el.id);
      console.log(id);
      if (id !== -1) {
        truckCopy.splice(id, 1);
      } else {
        truckCopy = truckCopy.concat(action.payload);
      }
      return {
        ...state,
        trucks: truckCopy
      };
    case actionTypes.TOGGLE_FINAL_POP_UP:
      return {
        ...state,
        finalPopup: action.payload.toggle,
        actionButton: action.payload.name,
        popup: false
      };
    case actionTypes.POPUP_ERROR_TOGGLE:
      return {
        ...state,
        popupError: false,
        finalPopup: false
      }
    case actionTypes.VOID_ITEM:
      return {
        ...state,
        itemsToBuy: state.itemsToBuy.filter((_, i) => i !== state.activeRow),
        activeRow: '',
        finalPopup: false
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
        discount: 0,
        customer: '',
        activeRow: '',
        displayCustomer: 'display'
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
    case actionTypes.SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        displayCustomer: 'display'
      };
    case actionTypes.TOGGLE_CUSTOMER_DISPLAY:
      return {
        ...state,
        displayCustomer: action.payload
      };
    case actionTypes.SET_ACTIVE_ITEM_ROW:
      return {
        ...state,
        activeRow: action.payload
      };
    case actionTypes.EDIT_QUANTITY:
      itemsCopy = [...state.itemsToBuy];
      itemsCopy[state.activeRow].quantity = action.payload;
      return {
        ...state,
        itemsToBuy: itemsCopy,
        finalPopup: false
      };
    case actionTypes.FETCH_POS_START:
      return {
        ...state,
        fetchError: false,
        fetchLoading: true
      }
    case actionTypes.FETCH_POS_SUCCESS:
      return {
        ...state,
        fetchError: false,
        fetchLoading: false,
        customerNo: action.payload
      }
    case actionTypes.FETCH_POS_FAIL:
      return {
        ...state,
        fetchError: true,
        fetchLoading: false
      }
    case actionTypes.POST_POS_START:
      return {
        ...state,
        posLoading: true,
        posError: false,
      }
    case actionTypes.POST_POS_SUCCESS:
      return {
        ...state,
        posLoading: false,
        customerNo: action.payload,
        finalPopup: false,
        errorMessage: '',
        popupError: false,
        posError: false
      }
    case actionTypes.POST_POS_FAIL:
      return {
        ...state,
        posLoading: false,
        posError: true,
        errorMessage: action.payload,
        popupError: true
      }
    default:
      return state;
  }
};

export default reducer;
