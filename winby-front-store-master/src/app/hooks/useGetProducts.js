import { useCallback, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllOffers } from '../redux/actions/store'
import { organizeArray } from '../utils'

export const useOffersData = () => {
    const [productsS, setProductsStore] = useState([])
    const [servicesS] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    //  Redux
    const products = useSelector(store => store.getProducts)
    const dispath = useDispatch()

    const handleOffers = useCallback(params => {
        dispath(getAllOffers(params))
    }, [dispath])

    useEffect(() => {
        setProductsStore(products.data || [])
    }, [products.data])

    useEffect(() => {
        const array = organizeArray(productsS, servicesS)
        setItems(array)
    }, [productsS, servicesS])

    useEffect(() => {
        if (productsS.length) setLoading(false)
    }, [productsS.length, servicesS.length])

    return [items, handleOffers, { loading }]
}