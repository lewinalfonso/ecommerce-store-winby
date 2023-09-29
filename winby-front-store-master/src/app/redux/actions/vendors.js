import { createAction } from 'redux-actions'
import { apiGetAllVendors, apiGetOneLegalVendors, apiGetOneVendors } from '../api/vendors'
import { GET_ALL_VENDORS, GET_ONE_LEGAL_PROVIDER, GET_ONE_VENDORS } from '../types'

/** Busca todo los aliados comerciales */
export const getAllVendors = createAction(GET_ALL_VENDORS, params => apiGetAllVendors(params)())
/** Busca el aliado comercial */
export const getOneVendors = createAction(GET_ONE_VENDORS, params => apiGetOneVendors(params)())

export const getOneLegalVendors = createAction(GET_ONE_LEGAL_PROVIDER, params => apiGetOneLegalVendors(params)())