import * as actionTypes from '../actions/actionTypes';

const initialState = {
    searchInvoiceLoading: false,
    searchInvoiceError: false,
    invoicedSearch: [],
    invoiceDetails: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_INVOICE_START:
            return {
                ...state,
                searchInvoiceLoading: true
            }
        case actionTypes.SEARCH_INVOICE_SUCCESS:
            return {
                ...state,
                searchInvoiceError: false,
                searchInvoiceLoading: false,
                invoicedSearch: action.payload
            }
        case actionTypes.SEARCH_INVOICE_FAIL:
            return {
                ...state,
                searchInvoiceError: true,
                searchInvoiceLoading: false
            }
        case actionTypes.CLEAR_INVOICE_SEARCH:
            return {
                ...state,
                invoicedSearch: []
            }
        case actionTypes.FETCH_INVOICE_START:
            return {
                ...state,
                searchInvoiceLoading: true
            }
        case actionTypes.FETCH_INVOICE_SUCCESS:
            return {
                ...state,
                searchInvoiceError: false,
                searchInvoiceLoading: false,
                invoiceDetails: action.payload
            }
        case actionTypes.FETCH_INVOICE_FAIL:
            return {
                ...state,
                searchInvoiceError: true,
                searchInvoiceLoading: false
            }
        default:
            return state;
    }
};

export default reducer;