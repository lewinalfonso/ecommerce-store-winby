import { useCallback, useState } from 'react'

export const useSearchItemCart = () => {
    const [item, setItem] = useState()

    const searchItem = useCallback(id => {
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
        const resFind = shoppingCart?.invoiceproducts?.find(x => x.p_id === id)

        setItem(resFind)
    }, [])

    return [item, searchItem]
}