import * as actionTypes from '../actions/actionTypes';
import { newDate } from '../../util/dateHelper';

const initialState = {
  viewedCustomer: '',
  customer: [],
  creditSummary: [],
  viewMode: 'table',
  deleted: false,
  fetchLoading: false,
  fetchError: false,
  postLoading: false,
  postError: false,
  putLoading: false,
  putError: false,
  searchError: false,
  searchLoading: false,
  fetchCreditLoading: false,
  fetchCreditError: false,
};

const reducer = (state = initialState, action) => {
  let customerCopy;
  switch (action.type) {
    case actionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customer: state.customer.concat({
          ...action.payload,
          credit: 0,
          partialPaid: 0,
          dateRegistered: newDate(),
          timesPurchased: 0
        })
      };
    case actionTypes.ADD_CREDIT:
      customerCopy = [...state.customer];
      const customId = customerCopy.findIndex(
        customer => customer.lastName === action.payload.customer
      );
      customerCopy[customId].credit =
        +customerCopy[customId].credit + action.credit;
      return {
        ...state,
        customer: customerCopy,
        credit: state.credit.concat({ ...action.payload, date: newDate() })
      };
    case actionTypes.TOGGLE_CUSTOMER_VIEW:
      return {
        ...state,
        viewMode: action.payload
      }
    case actionTypes.FETCH_CUSTOMERS_START:
      return {
        ...state,
        fetchError: false,
        fetchLoading: true,
        deleted: false
      }
    case actionTypes.FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customer: action.data,
        pages: action.pages,
        fetchError: false,
        fetchLoading: false
      }
    case actionTypes.FETCH_CUSTOMERS_FAIL:
      return {
        ...state,
        fetchError: true,
        fetchLoading: false
      }

    case actionTypes.FETCH_CUSTOMER_START:
      return {
        ...state,
        fetchError: false,
        fetchLoading: true,
        deleted: false
      }

    case actionTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchError: false,
        fetchLoading: false,
        viewedCustomer: action.payload
      }
    case actionTypes.FETCH_CUSTOMER_FAIL:
      return {
        ...state,
        fetchError: true,
        fetchLoading: false
      }
    case actionTypes.POST_CUSTOMER_START:
      return {
        ...state,
        postError: false,
        postLoading: true,
        deleted: false
      }
    case actionTypes.POST_CUSTOMER_SUCCESS:
      return {
        ...state,
        postError: false,
        postLoading: false,
        customer: state.customer.concat(action.payload)
      }
    case actionTypes.POST_CUSTOMER_FAIL:
      return {
        ...state,
        postError: true,
        postLoading: false
      }
    case actionTypes.PUT_CUSTOMER_START:
      return {
        ...state,
        putError: false,
        putLoading: true,
        deleted: false
      }
    case actionTypes.PUT_CUSTOMER_SUCCESS:
      customerCopy = [...state.customer];
      const index = customerCopy.findIndex(el => el.id === action.payload.id);
      customerCopy[index] = action.payload;
      return {
        ...state,
        putError: false,
        putLoading: false,
        customer: customerCopy,
        viewedCustomer: action.payload
      }
    case actionTypes.PUT_CUSTOMER_FAIL:
      return {
        ...state,
        putError: true,
        putLoading: false
      }
    case actionTypes.DELETE_CUSTOMER_START:
      return {
        ...state,
        putError: false,
        putLoading: true,
        deleted: false
      }
    case actionTypes.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        putError: false,
        putLoading: false,
        deleted: true
      }
    case actionTypes.DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        putError: true,
        putLoading: false,
        deleted: false
      }
    case actionTypes.SEARCH_CUSTOMER_START:
      return {
        ...state,
        searchError: false,
        searchLoading: true
      }
    case actionTypes.SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        customer: action.data,
        pages: action.pages
      }
    case actionTypes.SEARCH_CUSTOMER_FAIL:
      return {
        ...state,
        searchLoading: false,
        searchError: true
      }
    case actionTypes.FETCH_CUSTOMER_CREDIT_SUMMARY_START:
      return {
        ...state,
        fetchCreditLoading: true,
        fetchCreditError: false
      }
    case actionTypes.FETCH_CUSTOMER_CREDIT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchCreditLoading: false,
        fetchCreditError: false,
        creditSummary: action.payload.data,
        historyPages: action.payload.pages
      }
    case actionTypes.FETCH_CUSTOMER_CREDIT_SUMMARY_FAIL:
      return {
        ...state,
        fetchCreditLoading: false,
        fetchCreditError: true
      }
    default:
      return state;
  }
};

export default reducer;
