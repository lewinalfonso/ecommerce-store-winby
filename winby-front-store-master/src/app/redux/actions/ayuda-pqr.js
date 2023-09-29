import { createAction } from 'redux-actions'
import { apiRegisterPqr, apiGetAllPqr, apiGetAllTypesPqr, apiUpdatePqr } from '../api/ayuda-pqr'
import { GET_ALL_PQR, REGISTER_PQR, UPDATE_PQR, GET_ALL_TYPES_PQR, url_base } from '../types'

export const registerPqr = createAction(REGISTER_PQR, params => apiRegisterPqr(url_base, params)())
export const getAllPqr = createAction(GET_ALL_PQR, params => apiGetAllPqr(url_base, params)())
export const updatePqr = createAction(UPDATE_PQR, params => apiUpdatePqr(url_base, params)())
export const allTypesPqr = createAction(GET_ALL_TYPES_PQR, params => apiGetAllTypesPqr(url_base, params)())