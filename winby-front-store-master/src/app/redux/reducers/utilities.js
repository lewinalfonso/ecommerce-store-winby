import {
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
  GET_ONE_TYPE_IDENTITYS
} from '../types'
import { handleActions } from 'redux-actions'

/** Tipo de cuentas */
export const accounts = handleActions({
  [GET_ALL_ACCOUNTS_TYPE]: (state, action) => action.payload,
  [GET_ONE_ACCOUNTS_TYPE]: (state, action) => action.payload
}, [])

/** Categorias */
export const categories = handleActions({
  [GET_ALL_CATEGORIES]: (state, action) => action.payload,
  [GET_ONE_CATEGORIES]: (state, action) => action.payload
}, [])

/** Colores */
export const colors = handleActions({
  [GET_ALL_COLORS]: (state, action) => action.payload,
  [GET_ONE_COLORS]: (state, action) => action.payload
}, [])

/** Paises */
export const countries = handleActions({
  [GET_ALL_COUNTRIES]: (state, action) => action.payload,
  [GET_ONE_COUNTRIES]: (state, action) => action.payload
}, [])

/** Departamentos */
export const departments = handleActions({
  [GET_ALL_DEPARTMENTS]: (state, action) => action.payload,
  [GET_ONE_DEPARTMENTS]: (state, action) => action.payload
}, [])

/** municipios */
export const municipality = handleActions({
  [GET_ALL_MUNICIPALITY]: (state, action) => action.payload,
  [GET_ONE_MUNICIPALITY]: (state, action) => action.payload
}, [])

/** tipo de dirección */
export const address = handleActions({
  [GET_ALL_TYPE_ADDRESS]: (state, action) => action.payload,
  [GET_ONE_TYPE_ADDRESS]: (state, action) => action.payload
}, [])

/** tipo de banco */
export const banks = handleActions({
  [GET_ALL_TYPE_BANKS]: (state, action) => action.payload,
  [GET_ONE_TYPE_BANKS]: (state, action) => action.payload
}, [])

/** tipo de banco */
export const identitys = handleActions({
  [GET_ALL_TYPE_IDENTITYS]: (state, action) => action.payload,
  [GET_ONE_TYPE_IDENTITYS]: (state, action) => action.payload
}, [])
