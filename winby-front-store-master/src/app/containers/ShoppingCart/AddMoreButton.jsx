/* eslint-disable camelcase */
import React, { useState } from 'react'

import { useUpdateTotalItem } from '../../hooks/useShoppingCart'

import { AddMoreButtonComponent } from '../../components/ShopingCart'

export const AddMoreButton = ({ p_id, total, available }) => {
    const [vTotal, setVTotal] = useState(total)

    const [changeTotal, { loading }] = useUpdateTotalItem()

    const handleChangeTotal = newTotal => {
        changeTotal({ p_id, p_total: newTotal })
        setVTotal(newTotal)
    }

    return <AddMoreButtonComponent loading={loading} changeTotal={handleChangeTotal} p_id={p_id} total={vTotal} available={available} />
}