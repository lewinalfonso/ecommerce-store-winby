import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

/** GET */
/** Busca todo los aliados comerciales */
export const apiGetAllVendors = params => () => axios.post(`${ url_base }vendor/search/all`, params).then(v => v.data).catch(e => ERROR_CATCH)
/** Busca el aliado comercial */
export const apiGetOneVendors = params => () => axios.post(`${ url_base }vendor/search/one`, params).then(v => v.data).catch(e => ERROR_CATCH)

export const apiGetOneLegalVendors = data => () => axios.post(`${ url_base }vendor/search/one`, data).then(v => v.data).catch(() => ERROR_CATCH)