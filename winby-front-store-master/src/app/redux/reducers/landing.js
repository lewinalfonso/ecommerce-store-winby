import { handleActions } from 'redux-actions'
import { POST_FORMLANDING, POST_LANDING_FORM_CONTACT, POST_LANDING_PHONE_CONTACT } from '../types'

export const fornlanding = handleActions({
    [POST_FORMLANDING]: (state, action) => ({ ...state, ...action.payload }),
}, {})

export const formContact = handleActions({
    [POST_LANDING_FORM_CONTACT]: (state, action) => action.payload
}, {})

export const phoneContact = handleActions({
    [POST_LANDING_PHONE_CONTACT]: (state, action) => action.payload
}, {})