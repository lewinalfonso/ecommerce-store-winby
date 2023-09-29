import { handleActions } from 'redux-actions'
import { getAll } from '../helpers'
import { GET_ALL_CATEGORIES_PRODUCTS_STORE, GET_ALL_CATEGORIES_SERVICE_STORE, GET_ALL_PRODUCTS_STORE, GET_ALL_SERVICES_STORE, GET_ONE_CATEGORIES_SERVICE_STORE, GET_ONE_CATEGORIES_PRODUCTS_STORE, ORDER_ITEMS_STORE, SEARCH_ALL_OFFERS, SEARCH_ALL_BANNERS, GET_ALL_STORE_KITS } from '../types'

/** servicios - categorias */
export const categoriesSerStore = handleActions({
    [GET_ALL_CATEGORIES_SERVICE_STORE]: (state, action) => {
        const res = action.payload

        if (res.success) {
            let data = []
            if (state.data) {
                data = res.data.reduce((acc, item) => {
                    const resFind = state.data.find(x => x.uscs_id === item.uscs_id)
                    if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
                }, [])
            } else { data = res.data }
            return action.meta.up_code !== 'Winby' ? { ...state, successUser: res.success, messageUser: res.message, dataUser: data } : { ...state, ...res, data }
        }
        return action.meta.up_code !== 'Winby' ? { ...state, successUser: res.success, messageUser: res.message, dataUser: [] } : { ...state, data: [], ...res }
    },
    [GET_ONE_CATEGORIES_SERVICE_STORE]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = state.data.reduce((acc, item) => {
                    if (res.data.uscs_id === item.uscs_id) { return [...acc, res.data] } else { return [...acc, item] }
                }, [])
            } else { data = [res.data] }
            return { ...state, data, successOne: 1, messageOne: res.message, one: res.data }
        }
        return { ...state, successOne: 0, messageOne: res.message, errorOne: res.error }
    }
}, [])

/** servicios */
export const servicesStore = handleActions({
    [GET_ALL_SERVICES_STORE]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = res.data.reduce((acc, item) => {
                    const resFind = state.data.find(x => x.uss_id === item.uss_id)
                    if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
                }, [])
            } else { data = res.data }
            return { ...state, ...res, data }
        }
        return { ...state, data: [], ...res }
    }
}, [])

/** Productos - categorias */
export const categoriesProStore = handleActions({
    [GET_ALL_CATEGORIES_PRODUCTS_STORE]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = res.data.reduce((acc, item) => {
                    const resFind = state.data.find(x => x.uscp_id === item.uscp_id)
                    if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
                }, [])
            } else { data = res.data }
            return action.meta?.up_code !== 'Winby' ? { ...state, successUser: res.success, messageUser: res.message, dataUser: data } : { ...state, ...res, data }

        }
        return action.meta?.up_code !== 'Winby' ? { ...state, successUser: res.success, messageUser: res.message, dataUser: [] } : { ...state, data: [], ...res }
    },
    [GET_ONE_CATEGORIES_PRODUCTS_STORE]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = state.data.reduce((acc, item) => {
                    if (res.data.uscp_id === item.uscp_id) { return [...acc, res.data] } else { return [...acc, item] }
                }, [])
            } else { data = [res.data] }
            return { ...state, data, successOne: 1, messageOne: res.message, one: res.data }
        }
        return { ...state, successOne: 0, messageOne: res.message, errorOne: res.error }
    }
}, [])
/** subcategorías - productos */
export const productsStore = handleActions({
    [GET_ALL_PRODUCTS_STORE]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = res.data.reduce((acc, item) => {
                    const resFind = state.data.find(x => x.usp_id === item.usp_id)
                    if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
                }, [])
            } else { data = res.data }
            return { ...state, ...res, data }
        }
        return { ...state, data: [], ...res }
    }
}, [])

/** subcategorías items - servicios */
export const orderItemsStore = handleActions({
    /** Consultar */
    [ORDER_ITEMS_STORE]: (state, action) => action.payload,
}, [])
/** subcategorías items - servicios */
export const searchAlloffers = handleActions({
    /** Consultar */
    [SEARCH_ALL_OFFERS]: (state, action) => action.payload,
}, [])
export const searchAllBanners = handleActions({
    /** Consultar */
    [SEARCH_ALL_BANNERS]: (state, action) => action.payload,
}, [])

export const storeKits = handleActions({
    /// Consultar
    [GET_ALL_STORE_KITS]: (state, action) => getAll(action.payload, state),
}, [])