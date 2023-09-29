import {
    NOTIFICATIONS_SEARCH_ALL,
    NOTIFICATIONS_CHANGE_STATE
} from '../types'
import { handleActions } from 'redux-actions'

export const notifications = handleActions({
    [NOTIFICATIONS_SEARCH_ALL]: (state, action) => action.payload,
    [NOTIFICATIONS_CHANGE_STATE]: (state, action) => ({ ...state, ...action.payload })
}, [])