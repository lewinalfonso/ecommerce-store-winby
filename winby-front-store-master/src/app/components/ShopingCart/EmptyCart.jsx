import React from 'react'

import EmptyCartImg from '../../../assets/shopping.svg'

import { EmptyCartWrapper, EmptyImg, EmptyLink, Strong } from './styled'

export const EmptyCart = () => <EmptyCartWrapper>
    <EmptyImg src={EmptyCartImg} alt='Carrito vacío'/>
    <div>
        <Strong size='20px' bold='600'> Tu carrito Winby está vacío</Strong>
        <EmptyLink to='/ofertas' size='15px'> Compra las ofertas del día </EmptyLink>
    </div>
</EmptyCartWrapper>