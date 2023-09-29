import { createAction } from 'redux-actions'
import { apiGetOneProducts, apiGetOneServices, apiGetAllProducts, apiGetAllServices, apiGetAllSimProducts, apiGetAllSimServices, apiGetSchedulleService, apiGetViewsServices, apiGetViewsProducts } from '../api/products'
import { GET_ONE_PRODUCTS, GET_ONE_SERVICES, GET_ALL_PRODUCTS, GET_ALL_SERVICES, GET_ALL_SIMILAR_PRODUCTS, GET_ALL_SIMILAR_SERVICES, GET_SCHEDULLE_SERVICES, GET_VIEWS_PRODUCTS, GET_VIEWS_SERVICES } from '../types'

/** Producto */
/** Obtener todo los productos */
export const getAllProducts = createAction(GET_ALL_PRODUCTS, (data, params) => apiGetAllProducts(data, params)())
/** todos los productos similares */
export const getAllSimProducts = createAction(GET_ALL_SIMILAR_PRODUCTS, params => apiGetAllSimProducts(params)())
/** Obtener detalles */
export const getOneProducts = createAction(GET_ONE_PRODUCTS, params => apiGetOneProducts(params)())
/** Obtener las vistas de un producto */
export const getViewsProducts = createAction(GET_VIEWS_PRODUCTS, params =>apiGetViewsProducts(params)())

/** Servicio */
/** Obtener todo los servicios */
export const getAllServices = createAction(GET_ALL_SERVICES, (data, params) => apiGetAllServices(data, params)())
/** todos los productos similares */
export const getAllSimServices = createAction(GET_ALL_SIMILAR_SERVICES, params => apiGetAllSimServices(params)())
/** Obtener detalles de un Servicio */
export const getOneServices = createAction(GET_ONE_SERVICES, params => apiGetOneServices(params)())
/** Obtener la agenda del servicio */
export const getSchedulle = createAction(GET_SCHEDULLE_SERVICES, params => apiGetSchedulleService(params)())
/** Obtener las vistas de un servicio */
export const getViewsServices = createAction(GET_VIEWS_SERVICES, params => apiGetViewsServices(params)())