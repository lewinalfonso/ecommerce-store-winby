import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

/** GET */
/** SERVICIOS */
/** Buscar todos las categorias */
export const apiGetAllCatSer = param => () => axios.post(`${url_base}categoryservices/search/all`, param).then(v => v.data).catch(e => ERROR_CATCH)
/** Buscar todos las sub categorias */
export const apiGetAllSubCatSer = param => () => axios.post(`${url_base}categoryservices/sub/search/all`, param).then(v => v.data).catch(e => ERROR_CATCH)

/** PRODUCTOS */
/** Buscar todos las categorias */
export const apiGetAllCatPro = param => () => axios.post(`${url_base}categoryproducts/search/all`, param).then(v => v.data).catch(e => ERROR_CATCH)
/** buscar todas las sub categorias */
export const apiGetAllSubCatPro = param => () => axios.post(`${url_base}categoryproducts/sub/search/all`, param).then(v => v.data).catch(e => ERROR_CATCH)
/** Fin GET */
