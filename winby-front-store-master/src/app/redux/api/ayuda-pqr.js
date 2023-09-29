import { ERROR_CATCH } from '../../redux/types'
import axios from 'axios'

export const apiRegisterPqr = (url, data) => () => axios.post(`${url}info/pqr/register`, data).then(v => v.data).catch(e => ERROR_CATCH)
export const apiGetAllPqr = (url, data) => () => axios.post(`${url}info/pqr/search/all`, data).then(v => v.data).catch(e => ERROR_CATCH)
export const apiUpdatePqr = (url, data) => () => axios.post(`${url}info/pqr/update/state`, data).then(v => v.data).catch(e => ERROR_CATCH)
export const apiGetAllTypesPqr = (url, data) => () => axios.post(`${url}info/pqr/types/search/all`, data).then(v => v.data).catch(e => ERROR_CATCH)
