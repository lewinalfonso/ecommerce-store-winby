/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useGetCartItems, useDeleteItemCart } from '../../hooks/useShoppingCart'

import { CartItems as CartItemsComponent, EmptyCartComponent } from '../../components/ShopingCart'
import Loading from '../../common/Loading'

export const CartItems = ({ updateTabName = () => {} }) => {
    const [items, setItems] = useState({})
    const { data, loading, error } = useGetCartItems()
    const [deleteItem, { loading: loadingDel, error: errorDel }] = useDeleteItemCart()

    const handleDelete = (item, type) => {
        deleteItem(type === 1 ? ({ p_id: item.p_id }) : ({ s_id: item.s_id }))
        setItems(state => {
            if (type === 1) return { ...state, products: state.products.filter(x => x.p_id !== item.p_id) }
            else if (type === 2) return { ...state, services: state.services.filter(x => x.s_id !== item.s_id) }
            return state
        })
        updateTabName(0, `Carrito (${ (items?.products?.length || 0 + items?.services?.length || 0) - 1})`)
    }

    useEffect(() => {
        if (!loading && !error && (data?.products?.length || data?.services?.length)) {
            setItems(data)
            updateTabName(0, `Carrito (${ data?.products?.length || 0 + data?.services?.length || 0 })`)
        }
    }, [loading, error, data, updateTabName])

    if (loading || error) {
        return <div style={{ minHeight: '70vh' }}>
            {loading && <Loading />}
            {error && <div>{error}</div>}
        </div>
    }

    if (!items?.products?.length && !items?.services?.length && !loading && !error) return <EmptyCartComponent />
    return <CartItemsComponent
        data={items}
        loading={loadingDel}
        error={errorDel}
        handleDelete={handleDelete}/>
}