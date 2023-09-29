import { ERROR_CATCH } from '../types'
import axios from 'axios'

/** GET */
/** Paises */
/** Todos */
/** Todos */
export const apiGetAllTypCryp = (url, param) => () => axios.get(`${ url }info/cryptocurrencies/search/all/${ param }`).then(v => v.data).catch(() => ERROR_CATCH)
// Uno
export const apiGetAllCountries = (url, param) => () => axios.get(`${ url }info/country/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneCountries = (url, param) => () => axios.get(`${ url }info/country/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Departamentos */
/** Todos */
export const apiGetAllDepartments = (url, param) => () => axios.get(`${ url }info/department/search/all/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneDepartments = (url, param) => () => axios.get(`${ url }info/department/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Municipios */
/** Todos */
export const apiGetAllMunicipality = (url, param) => () => axios.get(`${ url }info/municipality/search/all/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneMunicipality = (url, param) => () => axios.get(`${ url }info/municipality/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Tipo de Bancos */
/** Todos */
export const apiGetAllTypBan = (url, param) => () => axios.get(`${ url }info/banks/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneTypBan = (url, param) => () => axios.get(`${ url }info/banks/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Tipo de Direccion */
/** Todos */
export const apiGetAllAccTyp = (url, param) => () => axios.get(`${ url }info/accounts/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneAccTyp = (url, param) => () => axios.get(`${ url }info/accounts/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Tipo de identificación */
/** Todos */
export const apiGetAllTypIde = (url, param) => () => axios.get(`${ url }info/identitys/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneTypIde = (url, param) => () => axios.get(`${ url }info/identitys/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Tipo de Direccion */
/** Todos */
export const apiGetAllTypAdd = (url, param) => () => axios.get(`${ url }info/addres/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneTypAdd = (url, param) => () => axios.get(`${ url }info/addres/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Categorias */
/** Todos */
export const apiGetAllCategories = (url, param) => () => axios.get(`${ url }info/categories/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneCategories = (url, param) => () => axios.get(`${ url }info/categories/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Colores */
/** Todos */
export const apiGetAllColors = (url, param) => () => axios.get(`${ url }info/colors/search/all/${ param }`).then(v => v.data).catch(e => ERROR_CATCH)
/** Uno */
export const apiGetOneColors = (url, param) => () => axios.get(`${ url }info/colors/search/one/${ param.id }/${ param.state }`).then(v => v.data).catch(e => ERROR_CATCH)