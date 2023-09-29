import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCatPro, getAllCatSer } from '../redux/actions/categories'

export const useCategoriesData = () => {
    const [categoriesData, setCategoriesData] = useState([])
    const [loading, setLoading] = useState(false)
    const categoriesServices = useSelector(props => props.categoriesS)
    const categoriesProducts = useSelector(props => props.categoriesP)
    const dispatch = useDispatch()

    const setCategoriesAll = useCallback(params => {
        setLoading(true)
        dispatch(getAllCatSer(params))
        dispatch(getAllCatPro(params))

    }, [dispatch, setLoading])

    useEffect(() => {
        if (categoriesProducts?.success && categoriesServices?.success) setLoading(false)
    }, [categoriesProducts, categoriesServices])

    useEffect(() => {
        const cp = categoriesProducts.data?.length ? [...categoriesProducts.data] : []
        const cs = categoriesServices.data?.length ? [...categoriesServices.data] : []
        setCategoriesData(cp.concat(cs))
    }, [categoriesProducts, categoriesServices])

    return [categoriesData, setCategoriesAll, { loading }]
}