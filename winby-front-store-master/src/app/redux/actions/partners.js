import { createAction } from 'redux-actions'
import {
  url_base,
  REGISTER_PARTNER,
  REGISTER_PARTNER_DOCUMENTS
} from '../types'
import {
  apiRegisterPartner,
  apiRegisterPartnerDocuments
} from '../api/partners'

/** Proveedor */
/** Registro */
export const getRegisterPartner = createAction(REGISTER_PARTNER, params => apiRegisterPartner(url_base, params)())
/** Registro de Documentos */
export const getRegisterPartnerDocuments = createAction(REGISTER_PARTNER_DOCUMENTS, params => apiRegisterPartnerDocuments(url_base, params)())
