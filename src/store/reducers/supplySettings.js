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
  activeSupplies: [{ materials: 'gravel', amount: '2' }]
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
        amount: state.supplies[action.payload].value
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
      newSuppInput[action.payload.name].value = action.payload.value;
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
    default:
      return state;
  }
};

export default reducer;
