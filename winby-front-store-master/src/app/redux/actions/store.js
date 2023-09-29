import { createAction } from 'redux-actions'
import { apiGetAllCategoriesProStore, apiGetAllCategoriesSerStore, apiGetAllProductsStore, apiGetAllServicesStore, apiGetAllStoreKits, apiGetOneCategoriesProStore, apiGetOneCategoriesSerStore, apiOrderItemsStore, apiSearchAllBanners, apiSearchAllOffers } from '../api/store'
import { GET_ALL_CATEGORIES_SERVICE_STORE, GET_ALL_CATEGORIES_PRODUCTS_STORE, GET_ONE_CATEGORIES_SERVICE_STORE, GET_ONE_CATEGORIES_PRODUCTS_STORE, GET_ALL_SERVICES_STORE, GET_ALL_PRODUCTS_STORE, ORDER_ITEMS_STORE, SEARCH_ALL_OFFERS, SEARCH_ALL_BANNERS, GET_ALL_STORE_KITS } from '../types'

/** CATEGORIA SERVICIOS */
/** todos */
export const getAllCategoriesSerStore = createAction(GET_ALL_CATEGORIES_SERVICE_STORE, params => apiGetAllCategoriesSerStore(params)(), params => ({ up_code: params.up_code }))
/** uno */
export const getOneCategoriesSerStore = createAction(GET_ONE_CATEGORIES_SERVICE_STORE, params => apiGetOneCategoriesSerStore(params)())
/** CATEGORIA PRODUCTOS */
/** todos */
export const getAllCategoriesProStore = createAction(GET_ALL_CATEGORIES_PRODUCTS_STORE, params => apiGetAllCategoriesProStore(params)(), params => ({ up_code: params.up_code }))
/** uno */
export const getOneCategoriesProStore = createAction(GET_ONE_CATEGORIES_PRODUCTS_STORE, params => apiGetOneCategoriesProStore(params)())

/** SERVICIOS */
/** todos */
export const getAllServicesStore = createAction(GET_ALL_SERVICES_STORE, params => apiGetAllServicesStore(params)())
/** PRODUCTOS */
/** todos */
export const getAllProductsStore = createAction(GET_ALL_PRODUCTS_STORE, params => apiGetAllProductsStore(params)())

export const OrderItemsStore = createAction(ORDER_ITEMS_STORE, params => apiOrderItemsStore(params)())
/** Busca las ofertaS */
export const getAllOffers = createAction(SEARCH_ALL_OFFERS, params => apiSearchAllOffers(params)())
/** Busca los todos los Banners */
export const getAllBanners = createAction(SEARCH_ALL_BANNERS, params => apiSearchAllBanners(params)())
/** Busca las  de los kits */
export const getAllStoreKits = createAction(GET_ALL_STORE_KITS, params => apiGetAllStoreKits(params)())