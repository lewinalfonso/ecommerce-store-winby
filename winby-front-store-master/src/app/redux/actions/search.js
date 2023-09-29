import { createAction } from 'redux-actions'
import { apiGetAllSearchCategories, apiGetAllSearchProducts } from '../api/search'
import { GET_ALL_SEARCH_CATEGORIES, GET_ALL_SEARCH_PRODUCTS } from '../types'

/** Busqueda */
/** Todas las categorias */
export const getAllSearchCategories = createAction(GET_ALL_SEARCH_CATEGORIES, params => apiGetAllSearchCategories(params)())
/** Todaos los productos y servicios */
export const getAllSearchProducts = createAction(GET_ALL_SEARCH_PRODUCTS, params => apiGetAllSearchProducts(params)())