import { ERROR_CATCH } from '../types'
import axios from 'axios'

/** GET */

/** POST */
/** Registro del proveedor */
export const apiRegisterPartner = (url, data) => () => axios.post(`${url}user/shop/partner/web/register`, data).then(v => v.data).catch(e => ERROR_CATCH)
/** Registro del proveedor de documentos */
export const apiRegisterPartnerDocuments = (url, data) => () => axios.post(`${url}user/shop/partner/web/register/documents`, data).then(v => v.data).catch(e => ERROR_CATCH)
