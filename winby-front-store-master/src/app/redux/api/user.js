import { ERROR_CATCH, url_base } from '../types'
import axios from 'axios'

/** GET */
/** Usuario */

/** POST */
/** Perfil */
export const apiProfileUser = params => () => axios.post(`${ url_base }user/profile`, params).then(v => v.data).catch(e => ERROR_CATCH)
/** id del usuario por codigo */
export const apiGetOneIDUser = params => () => axios.post(`${ url_base }user/search/one/id`, params).then(v => v.data).catch(e => ERROR_CATCH)
/** Login */
export const apiLogin = (url, data) => () => axios.post(`${ url }user/shop/web/login`, data).then(v => v.data).catch(e => ERROR_CATCH)
/** Registro de usuario */
export const apiRegisterUser = (url, data) => () => axios.post(`${ url }user/shop/user/web/register`, data).then(v => v.data).catch(e => ERROR_CATCH)
/** Registro de franquisia */
export const apiRegisterFranchise = (url, data) => () => axios.post(`${ url }user/shop/franchise/web/register`, data).then(v => v.data).catch(e => ERROR_CATCH)
/** busca la informacion de la billetera */
export const apiInfoWallet = (url, params) => () => axios.get(`${ url }user/search/wallet/${ params }`).then(v => v.data).catch(e => ERROR_CATCH)
/** registra la identificación de un usuario */
export const apiRegIdentities = (url, data) => () => axios.post(`${ url }user/register/identities`, data).then(v => v.data).catch(e => ERROR_CATCH)
// Bancos
// Busca los Bancos del usuario
export const apiGetAllBanUser = (url, data) => () => axios.post(`${ url }user/bank/search/all`, data).then(v => v.data).catch(() => ERROR_CATCH)
// Elimina el Banco del usuario
export const apiDelBanUser = (url, data) => () => axios.post(`${ url }user/bank/delete`, data).then(v => ({ ...v.data, param: data })).catch(() => ERROR_CATCH)
// Registrar el Banco del usuario
export const apiRegBanUser = (url, data) => () => axios.post(`${ url }user/bank/register`, data).then(v => v.data).catch(() => ERROR_CATCH)
/** DINERO DEL USUARIO */
// Retiro de Dierno y Actualización
export const apiWitMonUser = (url, data) => () => axios.post(`${ url }user/money/withdrawals`, data).then(v => v.data).catch(() => ERROR_CATCH)

/** Recuperacion de cuenta */
export const apiRecoverAccount = (url, data) => () => axios.post(`${ url }user/recover-account`, data).then(v => v.data).catch(() => ERROR_CATCH)
export const apiRecoverValidateToken = (url, data) => () => axios.post(`${ url }user/recover-account/validate-token`, data).then(v => v.data).catch(() => ERROR_CATCH)
export const apiRecoverChangePass = (url, data) => () => axios.post(`${ url }user/recover-account/change-pass`, data).then(v => v.data).catch(() => ERROR_CATCH)

/* Guardat ubicación de envio */
export const apiSaveLocation = (url, data) => () => axios.post(`${ url }user/update/delivery`, data).then(v => v.data).catch(() => ERROR_CATCH)
