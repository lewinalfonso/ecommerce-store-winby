import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

/** POST */
/** busca todas las facturas */
export const apiGetAllInvoices = data => () => axios.post(`${ url_base }invoices/search/all`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** información completa de una factura de compra */
export const apiGetOneInvoices = data => () => axios.post(`${url_base}invoices/search/one`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** Registro de factura de solicitud */
export const apiRegInvoices = data => () => axios.post(`${ url_base }invoices/register`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** confirma la compra del medio de pago */
export const apiConEpaInvoices = data => () => axios.post(`${ url_base }invoices/epayco/confirm`, data).then(v => v.data).catch(() => ERROR_CATCH)