import { ERROR_CATCH } from '../types'
import axios from 'axios'

/** GET */

/** POST */
/** Registro del proveedor */
export const apiNotificationsSearchAll = (url, data) => () => axios.post(`${url}user/notifications/search/all`, data).then(v => v.data).catch(e => ERROR_CATCH)
/** Registro del proveedor de documentos */
export const apiNotificationsChangeState = (url, data) => () => axios.post(`${url}user/notifications/change/state`, data).then(v => v.data).catch(e => ERROR_CATCH)
