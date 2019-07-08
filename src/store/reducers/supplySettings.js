import * as actionTypes from '../actions/actionTypes';

import { supplySet } from '../../util/inputHelper';

const initialState = {
  activeSupp: '',
  supplies: {
    gravel: supplySet(),
    riverMixed: supplySet(),
    crushedSand: supplySet(),
    riverSand: supplySet(),
    boulder: supplySet(),
    hollowBlocks: supplySet(),
    cement: supplySet()
  },
  activeSupplies: {}
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
      const active = state.activeSupp === '' ? 'gravel' : state.activeSupp;
      newSuppInput[active].active = false;
      newSuppInput[active].value = '';
      newSuppInput[action.payload].active = true;
      return {
        ...state,
        activeSupp: action.payload,
        supplies: newSuppInput
      };
    case actionTypes.ADD_SUPPLY_VALUE:
      newSuppInput = {
        ...copyState(state.activeSupplies),
        [state.activeSupp]: state.supplies[state.activeSupp].value
      };
      // const newSuppInput1 = copyState(state.supplies);
      // newSuppInput1[state.activeSupp].value = '';
      return {
        ...state,
        activeSupplies: newSuppInput,
        supplies: resetStateAmount(state.activeSupp, state.supplies)
      };
    case actionTypes.VALUE_CHANGE_SUPPLY:
      newSuppInput = copyState(state.supplies);
      newSuppInput[action.payload.name].value = action.payload.value;
      return {
        ...state,
        supplies: newSuppInput
      };
    default:
      return state;
  }
};

export default reducer;
