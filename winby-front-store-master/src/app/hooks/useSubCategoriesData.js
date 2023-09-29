
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSubCatPro, getAllSubCatSer } from '../redux/actions/categories'

/**
 * @deprecated función vieja
 * @description hook para obtener las subcategorías
 * @return {array} devuelve la función y el array con la información de las subcategorías
 */
export const useSubCategoriesData = () => {
    const [subCategoriesData, setCategoriesData] = useState([])
    const [loading, setLoading] = useState(false)
    const subCategoriesServices = useSelector(props => props.subCategoriesS)
    const subCategoriesProducts = useSelector(props => props.subCategoriesP)
    const dispatch = useDispatch()

    const setSubCategoriesAll = useCallback(params => {
        setLoading(true)
        dispatch(getAllSubCatSer(params))
        dispatch(getAllSubCatPro(params))

    }, [dispatch, setLoading])

    useEffect(() => {
        if (subCategoriesProducts?.success && subCategoriesServices?.success) setLoading(false)
    }, [subCategoriesProducts, subCategoriesServices])

    useEffect(() => {
        const scp = subCategoriesProducts.data?.length ? [...subCategoriesProducts.data] : []
        const scs = subCategoriesServices.data?.length ? [...subCategoriesServices.data] : []
        setCategoriesData(scp, scs)
    }, [subCategoriesProducts, subCategoriesServices])

    return [subCategoriesData, setSubCategoriesAll, { loading }]
}