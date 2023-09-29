
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import toastr from 'toastr'
import { MyContext } from '../components/layout'
import { getOneProducts } from '../redux/actions/products'
import axios from 'axios'
import { url_base } from '../redux/types'

export const useAddToCartProducts = () => {
    const [loading, setLoading] = useState(false)
    const [isMount, setIsMount] = useState(false)
    const [isCart, setIsCart] = useState({})
    const history = useHistory()
    const [type, setType] = useState(false)
    const [attributes, setAttributes] = useState([])
    const dispatch = useDispatch()
    const products = useSelector(store => store.products)
    const { countShoppingCart } = useContext(MyContext)

    const setAddToCart = async (item, attr, typeP) => {
        setType(typeP)
        setAttributes(attr)
        await dispatch(getOneProducts({ p_id: item.p_id }))
        setIsMount(true)
    }

    /** Agrega al carrito */
    const addShoppingCart = useCallback(param => {
        setLoading(true)
        /** variables necesarias */
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceproducts = shoppingCart.invoiceproducts, invoicevendors = shoppingCart.invoicevendors

        const { p_id, v_id, p_available, p_description, p_franchise, p_groPer, p_name, p_price, p_quantity, p_total, productlocals, productphotos, p_taxGat } = param

        if (Object.entries(param).length > 0) {

            axios.post(`${url_base}cart/add/newitem`, { p_id, p_attributes: attributes }, { withCredentials: true })
                .then(response => {
                    const res = response.data
                    if (res.success) {
                        const resFindIP = invoiceproducts?.find(x => x.p_id === p_id),
                            resFindIV = invoicevendors?.find(x => productlocals?.find(y => y.vendorlocal.v_id === x.v_id))
                        /** verifica si el producto no existe ya registrado */

                        if (!resFindIP) invoiceproducts = [...invoiceproducts, { p_id, v_id, ip_name: p_name, ip_description: p_description, ip_price: p_price, ip_quantity: p_quantity, ip_total: p_total || 1, ip_groPer: p_groPer, ip_franchise: p_franchise, ip_available: p_available, productphotos: [productphotos[0]], ip_taxGat: p_taxGat, attributes }]
                        /** verifica si el vendewdor no existe registrado */
                        if (!resFindIV && !!productlocals[0] && !p_franchise) invoicevendors = [...invoicevendors, { v_id, c_id: productlocals[0]?.vendorlocal?.c_id, d_id: productlocals[0]?.vendorlocal?.d_id, m_id: productlocals[0]?.vendorlocal?.m_id, iv_location: productlocals[0]?.vendorlocal?.vl_address, iv_lat: productlocals[0]?.vendorlocal?.vl_lat, iv_lon: productlocals[0]?.vendorlocal?.vl_lon, iv_domFre: productlocals[0]?.vendorlocal?.vl_domFre, iv_cosKM: productlocals[0]?.vendorlocal?.vl_cosKM, iv_domLoc: productlocals[0]?.vendorlocal?.vl_domLoc, iv_domNat: productlocals[0]?.vendorlocal?.vl_domNat, typedelivery: { ...productlocals[0]?.vendorlocal?.typedeliverycost } }]
                        /** actualiza el local storage */
                        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, i_sub: shoppingCart.i_sub + ((p_price + p_taxGat) * (p_total || 1)), invoiceproducts, invoicevendors }))
                        toastr.success('Agregado al carrito')
                        countShoppingCart(1)
                        if (type) history.push('/carrito')
                    } else toastr.warning(res.message)
                })
                .catch(() => toastr.error('Se ha prensentado un error.'))
        }
        setLoading(false)
        setIsMount(false)

    }, [type, countShoppingCart, history, attributes])

    /** Elimina Del Carrito */
    const removeShoppingCart = useCallback(param => {
        setLoading(true)
        /** variables necesarias */
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceproducts = shoppingCart.invoiceproducts, invoicevendors = shoppingCart.invoicevendors

        const { p_id, v_id, p_price, p_total, p_taxGat } = param
        if (Object.entries(param).length > 0) {

            axios.post(`${ url_base }cart/delete/item`, { p_id }, { withCredentials: true })
                .then(response => {
                    const res = response.data
                    if (res.success) {
                        /** elimina el producto */
                        invoiceproducts = invoiceproducts.filter(x => x.p_id !== p_id)
                        let vendor = true

                        /** verifica si existe otro producto con el mismo vendedor */
                        invoiceproducts.forEach(x => x.v_id === v_id && (vendor = false))

                        /** elimina al vendedor  */
                        if (vendor) invoicevendors = invoicevendors.filter(x => x.v_id !== v_id)

                        /** actualiza el local storage */
                        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, i_sub: shoppingCart.i_sub - ((p_price + p_taxGat) * (p_total || 1)), invoiceproducts, invoicevendors }))
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
        if (products?.one && isMount) {
            /** verifica si el producto se encuentra en el carrito */
            const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
            const resFind = shoppingCart?.invoiceproducts?.find(x => x.p_id === products?.one?.p_id)
            setIsCart(resFind)

            if (Object.entries(products?.one).length > 0 && !resFind) addShoppingCart(products.one)
            if (Object.entries(products?.one).length > 0 && resFind) removeShoppingCart(products.one)

            setIsMount(false)
        }
    }, [products, isMount, addShoppingCart, removeShoppingCart])

    return [setAddToCart, { loading, isCart }]
}