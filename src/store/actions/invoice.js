import * as actionTypes from './actionTypes';
import { getHeader } from '../../util/headers'
import axios from '../../axios-orders';

export const clearInvoiceSearch = () => ({
    type: actionTypes.CLEAR_INVOICE_SEARCH
});

/************************************************************ */
/************************************************************ */

export const searchInvoiceStart = () => ({
    type: actionTypes.SEARCH_INVOICE_START
});

export const searchInvoiceSuccess = (invoice) => ({
    type: actionTypes.SEARCH_INVOICE_SUCCESS,
    payload: invoice
});

export const searchInvoiceFail = () => ({
    type: actionTypes.SEARCH_INVOICE_FAIL
});

export const searchInvoice = (id) => {
    return async dispatch => {
        try {
            dispatch(searchInvoiceStart());
            const data = await axios.get(`/invoices/${id}`, getHeader());
            dispatch(searchInvoiceSuccess(data.data));
        } catch (e) {
            dispatch(searchInvoiceFail());
        }
    }
}

/************************************************************ */
/************************************************************ */

export const fetchInvoiceStart = () => ({
    type: actionTypes.FETCH_INVOICE_START
});

export const fetchInvoiceSuccess = invoice => ({
    type: actionTypes.FETCH_INVOICE_SUCCESS,
    payload: invoice
});

export const fetchInvoiceFail = () => ({
    type: actionTypes.FETCH_INVOICE_FAIL
});

export const fetchinvoice = id => {
    return async dispatch => {
        try {
            dispatch(fetchInvoiceStart());
            const data = await axios.get(`/pos/invoice/${id}`, getHeader());
            dispatch(fetchInvoiceSuccess(data.data));
        } catch (e) {
            dispatch(fetchInvoiceFail());
        }
    }
}

/************************************************************ */
/************************************************************ */

export const postInvoiceStart = () => ({
    type: actionTypes.POST_INVOICE_START
});

export const postInvoiceSuccess = () => ({
    type: actionTypes.POST_INVOICE_SUCCESS
});

export const postInvoiceFail = () => ({
    type: actionTypes.POST_INVOICE_FAIL
});

export const postInvoice = (id, body) => {
    return async dispatch => {
        try {
            dispatch(postInvoiceStart());
            await axios.post(`/pos/invoice/${id}`, body, getHeader());
            dispatch(postInvoiceSuccess());
        } catch (e) {
            dispatch(postInvoiceFail());
        }
    }
}

/************************************************************ */
/************************************************************ */

