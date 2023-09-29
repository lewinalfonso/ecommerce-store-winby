/* eslint-disable camelcase */
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { url_base } from '../redux/types'

export const useGetCartItems = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getData = useCallback(() => {
        setLoading(true)
        axios.post(`${ url_base }cart`, null, { withCredentials: true })
            .then(response => {
                const res = response.data
                if (res.success) setData(res.data)
                else setError(res.message)
            })
            .catch(() => setError('Ha ocurrido un error.'))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return { data, loading, error }
}

export const useDeleteItemCart = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handler = useCallback(params => {
        setLoading(true)
        axios.post(`${ url_base }cart/delete/item`, params, { withCredentials: true })
            .then(response => {
                const res = response.data
                if (!res.success) setError(res.message)
            })
            .catch(() => setError('Se ha presentado un error.'))
            .finally(() => setLoading(false))
    }, [])

    return [handler, { loading, error }]
}

export const useUpdateTotalItem = () => {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handler = useCallback(params => {
        setLoading(true)
        axios.post(`${url_base}cart/update/totalitem`, params, { withCredentials: true })
            .then(response => response.data)
            .then(res => {
                if (res.success) setSuccess(true)
                else setError(res.message)
            })
            .catch(() => setError('Se ha presentado un error.'))
            .finally(() => setLoading(false))
    }, [])

    return [handler, { success, loading, error }]
}