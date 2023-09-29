import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBanners } from '../redux/actions/store'

export const useGeneralBanners = () => {
    const [generalBanners, setGeneralBanners] = useState([])
    const [loading, setLoading] = useState(false)

    // Redux
    const storeBanners = useSelector(store => store.searchAllBanners)
    const dispatch = useDispatch()

    const setStoreBannersAll = useCallback(params => {
        setLoading(true)
        dispatch(getAllBanners(params))
    }, [dispatch, setLoading])

    useEffect(() => {
        setGeneralBanners(storeBanners?.data || [])
    }, [storeBanners])

    useEffect(() => {
        if (generalBanners.length) setLoading(false)
    }, [generalBanners])

    return [generalBanners, setStoreBannersAll, { loading }]
}