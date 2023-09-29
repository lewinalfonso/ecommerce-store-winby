import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

export const apiPostFornlanding = data => () => axios.post(`${ url_base }invoices/register`, data).then(v => v.data).catch(e => ERROR_CATCH)

export const apiPostFormContact = data => () => axios.post(`${ url_base }user/contacts/register`, data).then(v => v.data).catch(e => ERROR_CATCH)

export const apiPostPhoneContact = data => () => axios.post(`${ url_base }user/profile/with-code`, data).then(v => v.data).catch(e => ERROR_CATCH)