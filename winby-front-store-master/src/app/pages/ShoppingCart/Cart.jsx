import React, { useState, useCallback } from 'react'

import { Container } from './styled'

import { ReactTabsWindow } from '../../common/ReactTabsWindow'
import { CartItems } from '../../containers/ShoppingCart'

export const Cart = () => {
    const [tabNames, setTabNames] = useState(['Carrito (0)', 'Mis favoritos (0)', 'Comprar nuevamente'])

    const updateTabName = useCallback((index, name) => {
        setTabNames(state => state.map((x, i) => i === index ? name : x))
    }, [setTabNames])

    return <Container>
        <ReactTabsWindow
            tabs={[
                {
                    name: tabNames[0],
                    content: <CartItems updateTabName={updateTabName} />
                },
                {
                    name: tabNames[1],
                    visible: false,
                    content: <div>Contenido 2</div>
                },
                {
                    name: tabNames[2],
                    visible: false,
                    content: <div>Contenido 3</div>
                }
            ]}
        />
    </Container>
}