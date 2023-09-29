import { handleActions } from 'redux-actions'
import {
    GET_ALL_VENDORS, GET_ONE_VENDORS, GET_ONE_LEGAL_PROVIDER
} from '../types'

/** servicios */
export const vendors = handleActions({
    [GET_ALL_VENDORS]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = res.data.reduce((acc, item) => {
                    const resFind = state.data.find(x => x.v_id === item.v_id)
                    if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
                }, [])
            } else { data = res.data }
            return { ...state, ...res, data }
        }
        return { ...state, data: [], ...res }
    },
    [GET_ONE_VENDORS]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = state.data.reduce((acc, item) => {
                    if (res.data.v_id === item.v_id) { return [...acc, res.data] } else { return [...acc, item] }
                }, [])
            } else { data = [res.data] }
            return { ...state, data, successOne: 1, messageOne: res.message, one: res.data }
        }
        return { ...state, successOne: 0, messageOne: res.message, errorOne: res.error }
    }
}, [])

export const vendorsLegal = handleActions({
    [GET_ONE_LEGAL_PROVIDER]: (state, action) => action.payload
}, [])