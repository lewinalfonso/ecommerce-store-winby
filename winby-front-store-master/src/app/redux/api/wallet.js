import { ERROR_CATCH } from '../types'
import axios from 'axios'

/** GET */
// Saldo actual de un Usuario
export const apiGetOneUserMoney = (url, data) => () => axios.post(`${ url }user/money/search/one`, data).then(v => v.data).catch(() => ERROR_CATCH)
// Estado de Cuenta de un Usuario
export const apiGetAllMoneyReport = (url, data) => () => axios.post(`${ url }user/money/report/search/all`, data).then(v => v.data).catch(() => ERROR_CATCH)

/** POST */