import { createAction } from 'redux-actions'
import {
    apiGetAllSubCatPro,
    apiGetAllSubCatSer,
    apiGetAllCatSer,
    apiGetAllCatPro
} from '../api/categories'
import {
    GET_ALL_SUB_CATEGORIES_SERVICES,
    GET_ALL_SUB_CATEGORIES_PRODUCTS,
    GET_ALL_CATEGORIES_PRODUCTS,
    GET_ALL_CATEGORIES_SERVICES
} from '../types'

/** SERVICIOS */
/** buscar todas las categorias */
export const getAllCatSer = createAction(GET_ALL_CATEGORIES_SERVICES, params => apiGetAllCatSer(params)())
/** buscar todas las sub categorias */
export const getAllSubCatSer = createAction(GET_ALL_SUB_CATEGORIES_SERVICES, params => apiGetAllSubCatSer(params)())

/** PRODUCTOS */
/** buscar todas las categorias */
export const getAllCatPro = createAction(GET_ALL_CATEGORIES_PRODUCTS, params => apiGetAllCatPro(params)())
/** buscar todas las sub categorias */
export const getAllSubCatPro = createAction(GET_ALL_SUB_CATEGORIES_PRODUCTS, params => apiGetAllSubCatPro(params)())