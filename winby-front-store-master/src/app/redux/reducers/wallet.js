import {
    GET_ONE_USER_MONEY,
    GET_ALL_MONEY_REPORT,
} from '../types'
import { handleActions } from 'redux-actions'

export const wallet = handleActions({
    [GET_ONE_USER_MONEY]: (state, action) => action.payload
}, [])

export const usermoney = handleActions({
    [GET_ONE_USER_MONEY]: (state, action) => action.payload
}, [])

export const moneyreport = handleActions({
    [GET_ALL_MONEY_REPORT]: (state, action) => action.payload
}, [])