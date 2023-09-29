import { createAction } from 'redux-actions'
import {
    url_base,
    LOGIN_USER,
    REGISTER_USER,
    PROFILE_USER,
    GET_ONE_ID_USER,
    REGISTER_FRANCHISE,
    WALLET_USER,
    GET_ALL_BANK_USER,
    DELETE_BANK_USER,
    REGISTER_BANK_USER,
    WITHDRAWALS_MONEY_USER,
    REGISTER_IDENTITIES_USER,
    USER_RECOVER_ACCOUNT,
    USER_RECOVER_VALIDATE_TOKEN,
    USER_RECOVER_CHANGE_PASS,
    POST_LOCATION_USER
} from '../types'
import {
    apiLogin,
    apiRegisterUser,
    apiProfileUser,
    apiRegisterFranchise,
    apiGetOneIDUser,
    apiInfoWallet,
    apiGetAllBanUser,
    apiDelBanUser,
    apiRegBanUser,
    apiWitMonUser,
    apiRegIdentities,
    apiRecoverAccount,
    apiRecoverValidateToken,
    apiRecoverChangePass,
    apiSaveLocation
} from '../api/user'

/** Usuario */
/** Login */
export const getLogin = createAction(LOGIN_USER, params => apiLogin(url_base, params)())
/** id del usuario por codigo */
export const getOneIDUser = createAction(GET_ONE_ID_USER, params => apiGetOneIDUser(params)())
/** Registro */
export const getRegisterUser = createAction(REGISTER_USER, params => apiRegisterUser(url_base, params)())
/** Registro Franquisia */
export const getRegisterFranchise = createAction(REGISTER_FRANCHISE, params => apiRegisterFranchise(url_base, params)())
/** Perfil */
export const getProfileUser = createAction(PROFILE_USER, params => apiProfileUser(params)())
/** Busca la información del a billetera */
export const getInfoWallet = createAction(WALLET_USER, params => apiInfoWallet(url_base, params)())
// Busca los Bancos del usuario
export const getAllBanUser = createAction(GET_ALL_BANK_USER, params => apiGetAllBanUser(url_base, params)())
// Elimina el Banco del usuario
export const getDelBanUser = createAction(DELETE_BANK_USER, params => apiDelBanUser(url_base, params)())
// Registrar el Banco del usuario
export const getRegBanUser = createAction(REGISTER_BANK_USER, params => apiRegBanUser(url_base, params)())
// Registrar la identificación del usuario usuario
export const getRegIdentities = createAction(REGISTER_IDENTITIES_USER, params => apiRegIdentities(url_base, params)())

/** DINERO */
// Retiro de Dierno y Actualización
export const getWitMonUser = createAction(WITHDRAWALS_MONEY_USER, params => apiWitMonUser(url_base, params)())

// Recuperación de contraseña
export const getRecoverAccount = createAction(USER_RECOVER_ACCOUNT, params => apiRecoverAccount(url_base, params)())
export const getRecoverValidateToken = createAction(USER_RECOVER_VALIDATE_TOKEN, params => apiRecoverValidateToken(url_base, params)())
export const getRecoverChangePass = createAction(USER_RECOVER_CHANGE_PASS, params => apiRecoverChangePass(url_base, params)())

//Guardar ubicación
export const postLocationDelivery = createAction(POST_LOCATION_USER, data => apiSaveLocation(url_base, data)())