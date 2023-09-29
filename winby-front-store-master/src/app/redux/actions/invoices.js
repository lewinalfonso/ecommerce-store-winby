import { createAction } from 'redux-actions'
import {
    apiRegInvoices,
    apiGetOneInvoices,
    apiGetAllInvoices,
    apiConEpaInvoices
} from '../api/invoices'
import {
    REGISTER_INVOICES,
    GET_ONE_INVOICES,
    GET_ALL_INVOICES,
    CONFIRM_EPAYCO_INVOICES
} from '../types'

/** Facturas */
/** Registro de Facturas */
export const getRegInvoices = createAction(REGISTER_INVOICES, params => apiRegInvoices(params)())
/** información completa de una factura de compra */
export const getOneInvoices = createAction(GET_ONE_INVOICES, params => apiGetOneInvoices(params)())
/** información de todas las facturas */
export const getConEpaInvoices = createAction(CONFIRM_EPAYCO_INVOICES, params => apiConEpaInvoices(params)())
/** información de todas las facturas */
export const getAllInvoices = createAction(GET_ALL_INVOICES, params => apiGetAllInvoices(params)())