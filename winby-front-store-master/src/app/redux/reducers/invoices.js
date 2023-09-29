import {
    REGISTER_INVOICES,
    GET_ONE_INVOICES,
    GET_ALL_INVOICES,
    CONFIRM_EPAYCO_INVOICES
} from '../types'
import { handleActions } from 'redux-actions'

export const invoices = handleActions({
    [REGISTER_INVOICES]: (state, action) => ({ ...state, register: { ...action.payload } }),
    [CONFIRM_EPAYCO_INVOICES]: (state, action) => ({ ...state, payment: { ...action.payload } }),
    [GET_ALL_INVOICES]: (state, action) => action.payload,
    [GET_ONE_INVOICES]: (state, action) => {
        const res = action.payload
        if (res.success) {
            let data = []
            if (state.data) {
                data = state.data.reduce((acc, item) => {
                    if (res.data.i_id === item.i_id) { return [...acc, res.data] } else { return [...acc, item] }
                }, [])
            } else { data = [res.data] }
            return { ...state, data, successOne: 1, messageOne: res.message, one: res.data }
        }
        return { ...state, successOne: 0, messageOne: res.message, errorOne: res.error }
    }
}, [])