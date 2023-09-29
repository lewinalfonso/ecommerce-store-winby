import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStoreKits } from '../redux/actions/store'

export const useStoreKits = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    /* Redux */
    const storeKits = useSelector(store => store.storeKits)
    const dispath = useDispatch()

    const handleAction = useCallback(params => {
        dispath(getAllStoreKits(params))
    }, [dispath])

    useEffect(() => {
        setData(storeKits.data || [])
    }, [storeKits.data])

    useEffect(() => {
        if (data.length) setLoading(false)
    }, [data.length])

    return [data, handleAction, { loading }]
}