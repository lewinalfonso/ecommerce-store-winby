/* eslint-disable valid-jsdoc */
import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

/** Busquedas */
/** Todas las categorias */
export const apiGetAllSearchCategories = data => () => axios.post(`${ url_base }search/categories/all`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** Todaos los productos y servicios */
export const apiGetAllSearchProducts = data => () => axios.post(`${ url_base }search/products/all`, data).then(v => v.data).catch(() => ERROR_CATCH)