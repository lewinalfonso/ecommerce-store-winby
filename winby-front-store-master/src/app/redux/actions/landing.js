import { createAction } from 'redux-actions'
import { apiPostFornlanding, apiPostFormContact, apiPostPhoneContact } from '../api/landing'
import { POST_FORMLANDING, POST_LANDING_FORM_CONTACT, POST_LANDING_PHONE_CONTACT } from '../types'

/**  postFormlanding*/
export const postfornlanding = createAction(POST_FORMLANDING,
    data => apiPostFornlanding(data)())

/** Landing form contact */
export const postLandingFormContact = createAction(POST_LANDING_FORM_CONTACT, data => apiPostFormContact(data)())

export const postLandingPhoneContact = createAction(POST_LANDING_PHONE_CONTACT, data => apiPostPhoneContact(data)())
