import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

// GET
// Obtener categorías de los servicios del usuario
export const apiGetAllCategoriesSerStore = params => () => axios.post(`${url_base}user/store/services/categories/search/all`, params).then(v => v.data).catch(() => ERROR_CATCH)
// Obtener categoria del servicio del usuario
export const apiGetOneCategoriesSerStore = params => () => axios.post(`${url_base}user/store/services/categories/search/one`, params).then(v => v.data).catch(() => ERROR_CATCH)
// Obtener categorías de los productos del usuario
export const apiGetAllCategoriesProStore = params => () => axios.post(`${url_base}user/store/products/categories/search/all`, params).then(v => v.data).catch(() => ERROR_CATCH)
// Obtener categoria del producto del usuario
export const apiGetOneCategoriesProStore = params => () => axios.post(`${url_base}user/store/products/categories/search/one`, params).then(v => v.data).catch(() => ERROR_CATCH)

// Obtener servicios del usuario
export const apiGetAllServicesStore = params => () => axios.post(`${url_base}user/store/services/search/all`, params).then(v => v.data).catch(() => ERROR_CATCH)
// Obtener productos del usuario
export const apiGetAllProductsStore = params => () => axios.post(`${url_base}user/store/products/search/all`, params).then(v => v.data).catch(() => ERROR_CATCH)

// Organizar Productos y servicios de la tienda de usuario
export const apiOrderItemsStore = params => () => axios.post(`${url_base}user/store/items/organized`, params).then(v => v.data).catch(() => ERROR_CATCH)
// Obtener Productos en oferta
export const apiSearchAllOffers = data => () => axios.post(`${ url_base }products/offers/search/all`, data).then(v => ({ ...v.data, param: data })).catch(() => ERROR_CATCH)
// Obtener Banners
export const apiSearchAllBanners = data => () => axios.post(`${ url_base }info/banners/search/all/`, data).then(v => ({ ...v.data, param: data })).catch(() => ERROR_CATCH)
//  de kits
export const apiGetAllStoreKits = data => () => axios.post(`${ url_base }store/kits/search/all/`, data).then(v => v.data).catch(() => ERROR_CATCH)