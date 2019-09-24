import * as actionTypes from '../actions/actionTypes';

const initialState = {
  trucks: [{ maxLoad: '', plateNo: '', status: 'maintenance' }],
  availableTrucks: [
    { maxLoad: '2', plateNo: 'abc', status: 'maintenance' },
    { maxLoad: '3', plateNo: 'def', status: 'maintenance' },
    { maxLoad: '1', plateNo: 'gfh', status: 'maintenance' },
    { maxLoad: '1', plateNo: 'higi', status: 'maintenance' },
    { maxLoad: '1', plateNo: 'yu7h', status: 'maintenance' }
  ],
  trucksToBeSaved: [],
  pages: '',
  loading: false,
  error: false,
  postLoading: false,
  postError: false,
  putLoading: false,
  putError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRUCK:
      return {
        ...state,
        // trucks: [
        //   ...state.trucks,
        //   { maxLoad: '', plateNo: '', status: 'maintenance' }
        // ],
        trucks: state.trucks.concat({
          maxLoad: '',
          plateNo: '',
          status: 'maintenance'
        })
      };
    case actionTypes.REMOVE_TRUCK:
      return {
        ...state,
        trucks: state.trucks.filter((_, i) => i !== action.payload)
      };
    case actionTypes.VALUE_CHANGE_TRUCK:
      const copiedTrucks = [...state.trucks];
      copiedTrucks[action.payload.index] = {
        ...copiedTrucks[action.payload.index],
        [action.payload.name]: action.payload.value
      };
      return {
        ...state,
        trucks: copiedTrucks
      };
    case actionTypes.SAVE_TRUCK:
      return {
        ...state,
        // availableTrucks: state.availableTrucks.concat(state.trucks),
        trucksToBeSaved: state.trucks,
        trucks: initialState.trucks
      };
    case actionTypes.EDIT_TRUCK_SETTINGS:
      const copyTrucksFromState = [...state.availableTrucks];
      copyTrucksFromState[action.payload.id] = action.payload;
      return {
        ...state,
        availableTrucks: copyTrucksFromState
      };
    case actionTypes.DELETE_TRUCK_SETTINGS:
      return {
        ...state,
        availableTrucks: state.availableTrucks.filter(
          (_, i) => i !== action.payload
        )
      };
    case actionTypes.TRUCK_REQUEST_RESET:
      return {
        ...state,
        postError: false
      }
    case actionTypes.FETCH_TRUCK_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_TRUCK_SUCCESS:
      return {
        ...state,
        error: false,
        availableTrucks: action.payload.data,
        pages: action.payload.pages,
        loading: false
      }
    case actionTypes.FETCH_TRUCK_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    case actionTypes.POST_TRUCK_START:
      return {
        ...state,
        postLoading: true,
        postError: false
      }
    case actionTypes.POST_TRUCK_SUCCESS:
      return {
        ...state,
        postLoading: false,
        trucksToBeSaved: [],
        availableTrucks: state.availableTrucks.concat(action.payload)
      }
    case actionTypes.POST_TRUCK_FAIL:
      return {
        ...state,
        postLoading: false,
        postError: true
      }
    case actionTypes.PUT_TRUCK_START:
      return {
        ...state,
        putLoading: false,
        putError: false
      }
    case actionTypes.PUT_TRUCK_SUCCESS:
      const copiedTruck = [...state.availableTrucks];
      const ind = copiedTruck.findIndex(el => el.id === action.payload.id);
      copiedTruck[ind] = action.payload.value;
      return {
        ...state,
        availableTrucks: copiedTruck,
        putLoading: false
      }
    case actionTypes.PUT_TRUCK_FAIL:
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
