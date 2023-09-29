import { createAction } from 'redux-actions'
import {
    url_base,
    GET_ALL_ACCOUNTS_TYPE,
    GET_ONE_ACCOUNTS_TYPE,
    GET_ALL_CATEGORIES,
    GET_ONE_CATEGORIES,
    GET_ALL_COLORS,
    GET_ONE_COLORS,
    GET_ALL_COUNTRIES,
    GET_ONE_COUNTRIES,
    GET_ALL_DEPARTMENTS,
    GET_ONE_DEPARTMENTS,
    GET_ALL_MUNICIPALITY,
    GET_ONE_MUNICIPALITY,
    GET_ALL_TYPE_ADDRESS,
    GET_ONE_TYPE_ADDRESS,
    GET_ALL_TYPE_BANKS,
    GET_ONE_TYPE_BANKS,
    GET_ALL_TYPE_IDENTITYS,
    GET_ONE_TYPE_IDENTITYS,
    GET_ALL_TYPE_CRYPTOCURRENCIES
} from '../types'
import {
    apiGetAllAccTyp,
    apiGetOneAccTyp,
    apiGetAllCategories,
    apiGetOneCategories,
    apiGetAllColors,
    apiGetOneColors,
    apiGetAllMunicipality,
    apiGetOneMunicipality,
    apiGetAllDepartments,
    apiGetOneDepartments,
    apiGetAllCountries,
    apiGetOneCountries,
    apiGetAllTypAdd,
    apiGetOneTypAdd,
    apiGetAllTypBan,
    apiGetOneTypBan,
    apiGetAllTypIde,
    apiGetOneTypIde,
    apiGetAllTypCryp
} from '../api/utilities'

/** Tipo de Cuentas */
/** Todos */
export const getAllAccTyp = createAction(GET_ALL_ACCOUNTS_TYPE, params => apiGetAllAccTyp(url_base, params)())
/** Uno */
export const getOneAccTyp = createAction(GET_ONE_ACCOUNTS_TYPE, params => apiGetOneAccTyp(url_base, params)())

/** Categorias */
/** Todos */
export const getAllCategories = createAction(GET_ALL_CATEGORIES, params => apiGetAllCategories(url_base, params)())
/** Uno */
export const getOneCategories = createAction(GET_ONE_CATEGORIES, params => apiGetOneCategories(url_base, params)())
/** Todos */
export const getAllTypCryp = createAction(GET_ALL_TYPE_CRYPTOCURRENCIES, params => apiGetAllTypCryp(url_base, params)())
/** Uno */
/** Colores */
/** Todos */
export const getAllColors = createAction(GET_ALL_COLORS, params => apiGetAllColors(url_base, params)())
/** Uno */
export const getOneColors = createAction(GET_ONE_COLORS, params => apiGetOneColors(url_base, params)())

/** Paises */
/** Todos */
export const getAllCountries = createAction(GET_ALL_COUNTRIES, params => apiGetAllCountries(url_base, params)())
/** Uno */
export const getOneCountries = createAction(GET_ONE_COUNTRIES, params => apiGetOneCountries(url_base, params)())

/** Departamentos */
/** Todos */
export const getAllDepartments = createAction(GET_ALL_DEPARTMENTS, params => apiGetAllDepartments(url_base, params)())
/** Uno */
export const getOneDepartments = createAction(GET_ONE_DEPARTMENTS, params => apiGetOneDepartments(url_base, params)())

/** Departamentos */
/** Todos */
export const getAllMunicipality = createAction(GET_ALL_MUNICIPALITY, params => apiGetAllMunicipality(url_base, params)())
/** Uno */
export const getOneMunicipality = createAction(GET_ONE_MUNICIPALITY, params => apiGetOneMunicipality(url_base, params)())

/** Tipo de Direcciónes */
/** Todos */
export const getAllTypAdd = createAction(GET_ALL_TYPE_ADDRESS, params => apiGetAllTypAdd(url_base, params)())
/** Uno */
export const getOneTypAdd = createAction(GET_ONE_TYPE_ADDRESS, params => apiGetOneTypAdd(url_base, params)())

/** Tipo de Bancos */
/** Todos */
export const getAllTypBan = createAction(GET_ALL_TYPE_BANKS, params => apiGetAllTypBan(url_base, params)())
/** Uno */
export const getOneTypBan = createAction(GET_ONE_TYPE_BANKS, params => apiGetOneTypBan(url_base, params)())

/** Tipo de Identificación */
/** Todos */
export const getAllTypIde = createAction(GET_ALL_TYPE_IDENTITYS, params => apiGetAllTypIde(url_base, params)())
/** Uno */
export const getOneTypIde = createAction(GET_ONE_TYPE_IDENTITYS, params => apiGetOneTypIde(url_base, params)())