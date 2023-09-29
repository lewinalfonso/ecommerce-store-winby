/* eslint-disable valid-jsdoc */
import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

/** Servicio */
/** Todos */
export const apiGetAllServices = (data, params) => () => axios.post(`${ url_base }services/search/all`, data).then(v => ({ ...v.data, param: data, ...params })).catch(() => ERROR_CATCH)
/** Detalles de un servicio */
export const apiGetOneServices = data => () => axios.post(`${ url_base }services/search/one`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** Todo los productos similares */
export const apiGetAllSimServices = data => () => axios.post(`${ url_base }services/search/all/similar`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** Obteniendo calendario o agenda del servicio */
export const apiGetSchedulleService = data => () => axios.post(`${ url_base }services/calendar`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** Obteniendo las Views de un servicio */
export const apiGetViewsServices = data => () => axios.post(`${ url_base }services/views/:p_id`, data).then(v => v.data).catch(() => ERROR_CATCH)

/** Producto */
/** Todos */
export const apiGetAllProducts = (data, params) => () => axios.post(`${ url_base }products/search/all`, data).then(v => ({ ...v.data, param: data, ...params })).catch(() => ERROR_CATCH)
/** Detalles de un producto */
export const apiGetOneProducts = data => () => axios.post(`${ url_base }products/search/one`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** Todo los productos similares */
export const apiGetAllSimProducts = data => () => axios.post(`${ url_base }products/search/all/similar`, data).then(v => v.data).catch(() => ERROR_CATCH)
/**Obteniendo las Views de un producto */
export const apiGetViewsProducts = data => () => axios.post(`${ url_base }products/views/:p_id`, data).then(v => v.data).catch(() => ERROR_CATCH)