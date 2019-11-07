import * as actionTypes from '../actions/actionTypes';
import { newDate } from '../../util/dateHelper';

const initialState = {
  viewedCustomer: '',
  customer: [
    // {
    //   lastName: 'Collins',
    //   firstName: 'Phil',
    //   contactNo: 9473827382,
    //   partialPaid: 0,
    //   dateRegistered: '2019-06-26',
    //   timesPurchased: 15
    // },
    // {
    //   lastName: 'Banasen',
    //   firstName: 'Daniel',
    //   partialPaid: 0,
    //   contactNo: 9273917382,
    //   dateRegistered: '2019-06-26',
    //   timesPurchased: 5
    // },
    // {
    //   lastName: 'Loaf',
    //   firstName: 'Meat',
    //   contactNo: 9612374817,
    //   partialPaid: 0,
    //   dateRegistered: '2019-06-26',
    //   timesPurchased: 3
    // },
    // {
    //   lastName: 'Orange',
    //   firstName: 'Lemons',
    //   contactNo: 9351728367,
    //   partialPaid: 0,
    //   dateRegistered: '2019-06-26',
    //   timesPurchased: 3
    // },
    // {
    //   lastName: 'Turner',
    //   firstName: 'Tina',
    //   contactNo: 9928616273,
    //   partialPaid: 0,
    //   dateRegistered: '2019-06-26',
    //   timesPurchased: 8
    // },
    // {
    //   lastName: 'Higson',
    //   firstName: 'Charlie',
    //   contactNo: 9162838492,
    //   partialPaid: 0,
    //   dateRegistered: '2017-04-01',
    //   timesPurchased: 10
    // }
  ],
  creditSummary: [],
  credit: [
    {
      customer: 'Loaf',
      truck: {
        maxLoad: '3',
        plateNo: 'def',
        status: 'maintenance',
        color: '#437cb6',
        index: 1
      },
      items: [
        {
          materials: 'gravel',
          amount: '50',
          price: '2100',
          quantity: 1
        },
        {
          materials: 'river Mixed',
          amount: '60',
          price: '2100',
          quantity: 1
        }
      ],
      address: 'Baguio',
      date: '2019-06-30'
    },
    {
      customer: 'Banasen',
      truck: {
        maxLoad: '2',
        plateNo: 'abc',
        status: 'maintenance',
        color: '#47799f',
        index: 0
      },
      items: [
        {
          materials: 'cement',
          amount: '150',
          price: '150',
          quantity: '50'
        },
        {
          materials: 'gravel',
          amount: '50',
          price: '2100',
          quantity: 1
        }
      ],
      address: 'Baguio City',
      date: '2019-06-30'
    },
    {
      customer: 'Loaf',
      truck: {
        maxLoad: '3',
        plateNo: 'def',
        status: 'maintenance',
        color: '#437cb6',
        index: 1
      },
      items: [
        {
          materials: 'gravel',
          amount: '50',
          price: '2100',
          quantity: 2
        },
        {
          materials: 'river Mixed',
          amount: '60',
          price: '2100',
          quantity: 3
        }
      ],
      address: 'Baguio',
      date: '2019-06-29'
    }
  ],
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
        creditSummary: action.payload
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
