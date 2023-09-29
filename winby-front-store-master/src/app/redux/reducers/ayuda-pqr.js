import {
    GET_ALL_PQR,  GET_ALL_TYPES_PQR
} from '../types'
import { handleActions } from 'redux-actions'

export const pqr = handleActions({
    [GET_ALL_PQR]: (state, action) => ({ ...state, all: { ...action.payload } }),
    [GET_ALL_TYPES_PQR]: (state, action) => ({
        ...state, allTypes: { ...action.payload }
    })
}, {})