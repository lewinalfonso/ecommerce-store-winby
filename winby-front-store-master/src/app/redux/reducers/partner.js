import {
  REGISTER_PARTNER,
  REGISTER_PARTNER_DOCUMENTS
} from '../types'
import { handleActions } from 'redux-actions'

export const partners = handleActions({
  [REGISTER_PARTNER]: (state, action) => action.payload,
  [REGISTER_PARTNER_DOCUMENTS]: (state, action) => ({ ...state })
}, [])
