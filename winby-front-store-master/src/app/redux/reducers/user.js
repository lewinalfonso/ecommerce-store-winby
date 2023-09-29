import {
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_FRANCHISE,
    PROFILE_USER,
    GET_ONE_ID_USER,
    WALLET_USER,
    REGISTER_IDENTITIES_USER,
    USER_RECOVER_ACCOUNT,
    USER_RECOVER_VALIDATE_TOKEN,
    USER_RECOVER_CHANGE_PASS,
    POST_LOCATION_USER
} from '../types'
import { handleActions } from 'redux-actions'

export const users = handleActions({
    [LOGIN_USER]: (state, action) => action.payload,
    [WALLET_USER]: (state, action) => action.payload,
    [GET_ONE_ID_USER]: (state, action) => ({ ...state, dataID: action.payload }),
    [REGISTER_USER]: (state, action) => action.payload,
    [REGISTER_FRANCHISE]: (state, action) => action.payload,
    [PROFILE_USER]: (state, action) => action.payload,
    [POST_LOCATION_USER]: (state, action) => action.payload,
    [REGISTER_IDENTITIES_USER]: (state, action) => ({ ...state, successPost: action.payload.success, messagePost: action.payload.message, errorPost: action.payload.error }),
}, [])
export const delivery = handleActions({
    [POST_LOCATION_USER]: (state, action) => action.payload,
}, [])

export const userRecoverAccount = handleActions({
    [USER_RECOVER_ACCOUNT]: (state, action) => action.payload,
    [USER_RECOVER_VALIDATE_TOKEN]: (state, action) => action.payload,
    [USER_RECOVER_CHANGE_PASS]: (state, action) => action.payload
}, {})