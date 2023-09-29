import {
    GET_ALL_SEARCH_PRODUCTS,
    GET_ALL_SEARCH_CATEGORIES
} from '../types'
import { handleActions } from 'redux-actions'

export const searchCategories = handleActions({
    [GET_ALL_SEARCH_CATEGORIES]: (state, action) => action.payload
}, [])

export const searchProducts = handleActions({
    [GET_ALL_SEARCH_PRODUCTS]: (state, action) => action.payload
}, [])