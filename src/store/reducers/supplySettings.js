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
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVE_SUPPLY:
      const newSuppInput = JSON.parse(JSON.stringify(state.supplies));
      for (let newSuppKey in newSuppInput) {
        newSuppInput[newSuppKey].active = false;
      }
      newSuppInput[action.payload].active = true;
      return {
        ...state,
        activeSupp: action.payload,
        supplies: newSuppInput
      };
    default:
      return state;
  }
};

export default reducer;
