import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServicesStore, getAllProductsStore } from '../redux/actions/store'
import { organizeArray } from '../utils'

export const useServicesProductsData = () => {
    const [productsS, setProductsStore] = useState([])
    const [servicesS, setServicesStore] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    /* Redux */
    const products = useSelector(store => store.productsStore)
    const services = useSelector(store => store.servicesStore)
    const dispath = useDispatch()

    const handleProductsData = useCallback(params => {
        dispath(getAllProductsStore(params))
        dispath(getAllServicesStore(params))
    }, [dispath])

    useEffect(() => {
        products.data?.length && setProductsStore(products.data || [])
        services.data?.length && setServicesStore(services.data || [])
    }, [products.data, services.data, items])

    useEffect(() => {
        const array = organizeArray(productsS, servicesS, 'usp_priority', 'uss_priority')
        setItems(array)
    }, [productsS, servicesS])

    useEffect(() => {
        if (productsS.length || servicesS.length) setLoading(false)
    }, [productsS.length, servicesS.length])

    return [items, handleProductsData, { loading }]
}