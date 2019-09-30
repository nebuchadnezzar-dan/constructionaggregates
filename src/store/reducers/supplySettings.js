import * as actionTypes from '../actions/actionTypes';

import { supplySet } from '../../util/inputHelper';

const initialState = {
  activeSupp: '',
  supplies: {
    gravel: supplySet(),
    'river Mixed': supplySet(),
    'crushed Sand': supplySet(),
    'river Sand': supplySet(),
    boulder: supplySet(),
    'hollow Blocks': supplySet(),
    cement: supplySet()
  },
  activeSupplies: [
    { materials: 'gravel', amount: '50', price: '2100' },
    { materials: 'river Mixed', amount: '60', price: '2100' },
    { materials: 'cement', amount: '150', price: '150' }
  ],
  pages: '',
  loading: false,
  error: false,
  postLoading: false,
  postError: false,
  putLoading: false,
  putError: false,
};

const copyState = state => JSON.parse(JSON.stringify(state));
const resetStateAmount = (name, state) => {
  const newSuppInput1 = copyState(state);
  newSuppInput1[name].value = '';
  return newSuppInput1;
};

const reducer = (state = initialState, action) => {
  let newSuppInput;
  switch (action.type) {
    case actionTypes.ACTIVE_SUPPLY:
      newSuppInput = copyState(state.supplies);
      return {
        ...state,
        activeSupp: action.payload
      };
    case actionTypes.ADD_SUPPLY_VALUE:
      const newMat = {
        materials: action.payload,
        amount: state.supplies[action.payload].amount,
        price: state.supplies[action.payload].price
      };
      newSuppInput = {
        ...copyState(state.activeSupplies),
        [state.activeSupp]: state.supplies[state.activeSupp].value
      };
      // const newSuppInput1 = copyState(state.supplies);
      // newSuppInput1[state.activeSupp].value = '';
      return {
        ...state,
        activeSupplies: state.activeSupplies.concat(newMat),
        supplies: resetStateAmount(state.activeSupp, state.supplies),
        activeSupp: ''
      };
    case actionTypes.VALUE_CHANGE_SUPPLY:
      newSuppInput = copyState(state.supplies);
      newSuppInput[action.payload.name][action.payload.inputMod] =
        action.payload.value;
      return {
        ...state,
        supplies: newSuppInput
      };
    case actionTypes.EDIT_SUPPLY_SETTINGS:
      newSuppInput = [...state.activeSupplies];
      newSuppInput[action.payload.index] = action.payload.value;
      return {
        ...state,
        activeSupplies: newSuppInput
      };
    case actionTypes.DELETE_SUPPLY_SETTINGS:
      return {
        ...state,
        activeSupplies: state.activeSupplies.filter(
          (_, i) => i !== action.payload
        )
      };
    case actionTypes.ADD_MATERIAL_TO_SUPPLY:
      return {
        ...state,
        supplies: { ...state.supplies, [action.payload]: supplySet() }
      };
    case actionTypes.FETCH_SUPPLY_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_SUPPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        activeSupplies: action.payload.supplies,
        pages: action.payload.pages
      };
    case actionTypes.FETCH_SUPPLY_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    case actionTypes.POST_SUPPLY_START:
      return {
        ...state,
        postLoading: true,
      }
    case actionTypes.POST_SUPPLY_SUCCESS:
      return {
        ...state,
        activeSupplies: state.activeSupplies.concat(action.payload),
        postError: false,
        postLoading: false
      }
    case actionTypes.POST_SUPPLY_FAIL:
      return {
        ...state,
        postError: true,
        postLoading: false
      }
    case actionTypes.PUT_SUPPLY_START:
      return {
        ...state,
        putError: false,
        putLoading: true
      }
    case actionTypes.PUT_SUPPLY_SUCCESS:
      newSuppInput = copyState(state.activeSupplies);
      const newInd = newSuppInput.findIndex(el => el.id === action.payload.id);
      newSuppInput[newInd] = action.payload;
      return {
        ...state,
        putLoading: false,
        putError: false,
        activeSupplies: newSuppInput
      }
    case actionTypes.PUT_SUPPLY_FAIL:
      return {
        ...state,
        putLoading: false,
        putError: true
      }
    default:
      return state;
  }
};

export default reducer;
