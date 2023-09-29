import { createAction } from 'redux-actions'
import {
    url_base,
    NOTIFICATIONS_SEARCH_ALL,
    NOTIFICATIONS_CHANGE_STATE
} from '../types'
import {
    apiNotificationsSearchAll,
    apiNotificationsChangeState
} from '../api/notifications'

/** Proveedor */
/** Registro */
export const getNotificationsSearchAll = createAction(NOTIFICATIONS_SEARCH_ALL, params => apiNotificationsSearchAll(url_base, params)())
/** Registro de Documentos */
export const getNotificationsChangeState = createAction(NOTIFICATIONS_CHANGE_STATE, params => apiNotificationsChangeState(url_base, params)(), params => ({ id: params.un_id, state: params.un_state }))