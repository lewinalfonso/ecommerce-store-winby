import {
    GET_ONE_PRODUCTS, GET_ONE_SERVICES, GET_ALL_PRODUCTS, GET_ALL_SERVICES, GET_ALL_SIMILAR_PRODUCTS, GET_ALL_SIMILAR_SERVICES, GET_SCHEDULLE_SERVICES, GET_VIEWS_PRODUCTS, GET_VIEWS_SERVICES
} from '../types'
import { handleActions } from 'redux-actions'

export const products = handleActions({
    [GET_ALL_PRODUCTS]: (state, action) => {
        const res = action.payload
        if (res?.mode) return res
        if (res.success) {
            let dataOld = state.data || []
            const data = res.data.reduce((acc, item) => {
                const resFind = state.data?.find(x => x.p_id === item.p_id)
                dataOld = dataOld?.filter(x => x.p_id !== item.p_id)
                if (resFind) return [...acc, { ...item, ...resFind }]
                else return [...acc, item]
            }, [])
            return { ...state, ...res, data: [...data, ...dataOld] }
        }
        return { ...state, data: [], ...res }
    },
    [GET_ONE_PRODUCTS]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = state.data.reduce((acc, item) => {
                    if (res.data.p_id === item.p_id) return [...acc, res.data]
                    else return [...acc, item]
                }, [])
            } else { data = [res.data] }
            return { ...state, data, successOne: 1, messageOne: res.message, one: res.data }
        }
        return { ...state, successOne: 0, messageOne: res.message, errorOne: res.error }
    },
    [GET_ALL_SIMILAR_PRODUCTS]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let dataOld = state.data || []
            const data = res.data.reduce((acc, item) => {
                const resFind = state.data?.find(x => x.p_id === item.p_id)
                dataOld = dataOld?.filter(x => x.p_id !== item.p_id)
                if (resFind) return [...acc, { ...item, ...resFind }]
                else return [...acc, item]
            }, [])
            return { ...state, ...res, data: [...data, ...dataOld], similar: res.data }
        }
        return { ...state }
    }
}, [])

export const services = handleActions({
    [GET_ALL_SERVICES]: (state, action) => {
        const res = action.payload
        if (res?.mode) return res
        if (res.success) {
            let dataOld = state.data || []
            const data = res.data.reduce((acc, item) => {
                const resFind = state.data?.find(x => x.s_id === item.s_id)
                dataOld = dataOld?.filter(x => x.s_id !== item.s_id)
                if (resFind) return [...acc, { ...item, ...resFind }]
                else return [...acc, item]
            }, [])
            return { ...state, ...res, data: [...data, ...dataOld] }
        }
        return { ...state, data: [], ...res }
    },
    [GET_ONE_SERVICES]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = state.data.reduce((acc, item) => {
                    if (res.data.s_id === item.s_id) return [...acc, res.data]
                    else return [...acc, item]
                }, [])
            } else { data = [res.data] }
            return { ...state, data, successOne: 1, messageOne: res.message, one: res.data }
        }
        return { ...state, successOne: 0, messageOne: res.message, errorOne: res.error }
    },
    [GET_ALL_SIMILAR_SERVICES]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let dataOld = state.data || []
            const data = res.data.reduce((acc, item) => {
                const resFind = state.data?.find(x => x.s_id === item.s_id)
                dataOld = dataOld?.filter(x => x.s_id !== item.s_id)
                if (resFind) return [...acc, { ...item, ...resFind }]
                else { return [...acc, item] }
            }, [])
            return { ...state, ...res, data: [...data, ...dataOld], similar: res.data }
        }
        return { ...state }
    }
}, [])

// Calendarios o agenda
export const schedulleServices = handleActions({
    [GET_SCHEDULLE_SERVICES]: (state, action) => action.payload,
}, {})

//Vistas de productos y servicios
export const getViewsServices = handleActions({
    [GET_VIEWS_SERVICES]: (state, action) => action.payload,
}, {})

export const getViewsProducts = handleActions({
    [GET_VIEWS_PRODUCTS]: (state, action) => action.payload,
}, {})