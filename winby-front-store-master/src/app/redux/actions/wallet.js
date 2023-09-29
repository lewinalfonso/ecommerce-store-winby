import { createAction } from 'redux-actions'
import {
    apiGetOneUserMoney, apiGetAllMoneyReport
} from '../api/wallet'
import {
    url_base, GET_ONE_USER_MONEY, GET_ALL_MONEY_REPORT,
} from '../types'

/** Saldo actual de un Usuario */
export const getOneUserMoney = createAction(GET_ONE_USER_MONEY, params => apiGetOneUserMoney(url_base, params)())
// Estado de Cuenta de un Usuario
export const getAllMoneyReport = createAction(GET_ALL_MONEY_REPORT, params => apiGetAllMoneyReport(url_base, params)())