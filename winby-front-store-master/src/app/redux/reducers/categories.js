import {
  GET_ALL_SUB_CATEGORIES_SERVICES,
  GET_ALL_SUB_CATEGORIES_PRODUCTS,
  GET_ALL_CATEGORIES_PRODUCTS,
  GET_ALL_CATEGORIES_SERVICES
} from '../types'
import { handleActions } from 'redux-actions'

export const categoriesS = handleActions({
  [GET_ALL_CATEGORIES_SERVICES]: (state, action) => {
    const res = action.payload
    if (res.success) {
      let dataOld = state.data || []
      const data = res.data.reduce((acc, item) => {
        dataOld = dataOld?.filter(x => x.cs_id !== item.cs_id)
        const resFind = state.data?.find(x => x.cs_id === item.cs_id)
        if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
      }, [])
      return { ...state, ...res, data: [...data, ...dataOld] }
    }
    return { ...state, data: [], ...res }
  }
}, [])

export const categoriesP = handleActions({
  [GET_ALL_CATEGORIES_PRODUCTS]: (state, action) => {
    const res = action.payload
    if (res.success) {
      let dataOld = state.data || []
      const data = res.data.reduce((acc, item) => {
        dataOld = dataOld?.filter(x => x.cp_id !== item.cp_id)
        const resFind = state.data?.find(x => x.cp_id === item.cp_id)
        if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
      }, [])
      return { ...state, ...res, data: [...data, ...dataOld] }
    }
    return { ...state, data: [], ...res }
  }
}, [])

export const subCategoriesS = handleActions({
  [GET_ALL_SUB_CATEGORIES_SERVICES]: (state, action) => {
    const res = action.payload
    if (res.success) {
      let dataOld = state.data || []
      const data = res.data.reduce((acc, item) => {
        dataOld = dataOld?.filter(x => x.cs_id !== res.data[0]?.cs_id)
        const resFind = state.data?.find(x => x.scs_id === item.scs_id)
        if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
      }, [])
      return { ...state, ...res, data: [...data, ...dataOld] }
    }
    return { ...state, data: [], ...res }
  }
}, [])

export const subCategoriesP = handleActions({
  [GET_ALL_SUB_CATEGORIES_PRODUCTS]: (state, action) => {
    const res = action.payload
    if (res.success) {
      let dataOld = state.data || []
      const data = res.data.reduce((acc, item) => {
        dataOld = dataOld?.filter(x => x.cp_id !== res.data[0]?.cp_id)
        const resFind = state.data?.find(x => x.scp_id === item.scp_id)
        if (resFind) { return [...acc, { ...item, ...resFind }] } else { return [...acc, item] }
      }, [])
      return { ...state, ...res, data: [...data, ...dataOld] }
    }
    return { ...state, data: [], ...res }
  }
}, [])
