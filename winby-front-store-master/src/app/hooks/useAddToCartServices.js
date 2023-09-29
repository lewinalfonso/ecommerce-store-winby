
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import toastr from 'toastr'
import { MyContext } from '../components/layout'
import { getOneServices } from '../redux/actions/products'
import axios from 'axios'
import { url_base } from '../redux/types'

export const useAddToCartServices = () => {
    const [loading, setLoading] = useState(false)
    const [isMount, setIsMount] = useState(false)
    const history = useHistory()
    const [type, setType] = useState(false)
    const dispatch = useDispatch()
    const services = useSelector(store => store.services)
    const { countShoppingCart } = useContext(MyContext)

    const setAddToCart = async (item, typeP) => {
        setType(typeP)
        await dispatch(getOneServices({ s_id: item.s_id }))
        setIsMount(true)
    }

    /** Agrega al carrito */
    const addShoppingCart = useCallback(param => {
        setLoading(true)
        /** variables necesarias */
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceservices = shoppingCart.invoiceservices, invoicevendors = shoppingCart.invoicevendors

        const { s_id, v_id, s_available, s_description, s_franchise, s_groPer, s_name, s_price, s_quantity, s_total, servicelocals, productphotos, s_taxGat } = param

        if (Object.entries(param).length > 0) {

            axios.post(`${url_base}cart/add/newitem`, { s_id }, { withCredentials: true })
                .then(response => {
                    const res = response.data
                    if (res.success) {
                        const resFindIP = invoiceservices?.find(x => x.s_id === s_id),
                            resFindIV = invoicevendors?.find(x => servicelocals?.find(y => y.vendorlocal.v_id === x.v_id))
                        /** verifica si el producto no existe ya registrado */

                        if (!resFindIP) invoiceservices = [...invoiceservices, { s_id, v_id, is_name: s_name, is_description: s_description, is_price: s_price, is_quantity: s_quantity, is_total: s_total || 1, is_groPer: s_groPer, is_franchise: s_franchise, is_available: s_available, productphotos: [productphotos[0]], is_taxGat: s_taxGat }]
                        /** verifica si el vendewdor no existe registrado */
                        if (!resFindIV && !!servicelocals[0] && !s_franchise) invoicevendors = [...invoicevendors, { v_id, c_id: servicelocals[0]?.vendorlocal?.c_id, d_id: servicelocals[0]?.vendorlocal?.d_id, m_id: servicelocals[0]?.vendorlocal?.m_id, iv_location: servicelocals[0]?.vendorlocal?.vl_address, iv_lat: servicelocals[0]?.vendorlocal?.vl_lat, iv_lon: servicelocals[0]?.vendorlocal?.vl_lon, iv_domFre: servicelocals[0]?.vendorlocal?.vl_domFre, iv_cosKM: servicelocals[0]?.vendorlocal?.vl_cosKM, iv_domLoc: servicelocals[0]?.vendorlocal?.vl_domLoc, iv_domNat: servicelocals[0]?.vendorlocal?.vl_domNat, typedelivery: { ...servicelocals[0]?.vendorlocal?.typedeliverycost } }]

                        /** actualiza el local storage */
                        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, i_sub: shoppingCart.i_sub + ((s_price + s_taxGat) * (s_total || 1)), invoiceservices, invoicevendors }))
                        toastr.success('Agregado al carrito')
                        countShoppingCart(1)

                        if (type) history.push('/carrito')
                    } else toastr.warning(res.message)
                })
                .catch(() => toastr.error('Se ha presentado un error.'))


        }
        setLoading(false)
        setIsMount(false)

    }, [type, countShoppingCart, history])

    /** Elimina Del Carrito */
    const removeShoppingCart = useCallback(param => {
        setLoading(true)
        alert('entre')
        /** variables necesarias */
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceservices = shoppingCart.invoiceservices, invoicevendors = shoppingCart.invoicevendors

        const { s_id, v_id, s_price, s_total, s_taxGat } = param
        if (Object.entries(param).length > 0) {

            axios.post(`${url_base}cart/delete/item`, { s_id }, { withCredentials: true })
                .then(response => {
                    const res = response.data
                    if (res.success) {
                        /** elimina el producto */
                        invoiceservices = invoiceservices.filter(x => x.s_id !== s_id)
                        let vendor = true

                        /** verifica si existe otro producto con el mismo vendedor */
                        invoiceservices.forEach(x => x.v_id === v_id && (vendor = false))

                        /** elimina al vendedor  */
                        if (vendor) invoicevendors = invoicevendors.filter(x => x.v_id !== v_id)

                        /** actualiza el local storage */
                        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, i_sub: shoppingCart.i_sub - ((s_price + s_taxGat) * (s_total || 1)), invoiceservices, invoicevendors }))
                        toastr.success('Eliminado del carrito')
                        countShoppingCart(0)
                    } else toastr.warning(res.message)
                })
                .catch(() => toastr.error('Se ha presentado un error.'))
        }

        setLoading(false)
        setIsMount(false)
    }, [countShoppingCart])

    useEffect(() => {
        if (services?.one && isMount) {
            /** verifica si el producto se encuentra en el carrito */
            const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
            const resFind = shoppingCart?.invoiceservices?.find(x => x.s_id === services?.one?.s_id)

            if (Object.entries(services?.one).length > 0 && !resFind) addShoppingCart(services.one)
            if (Object.entries(services?.one).length > 0 && resFind) removeShoppingCart(services.one)

            setIsMount(false)
        }
    }, [services, isMount, addShoppingCart, removeShoppingCart])

    return [setAddToCart, { loading }]
}