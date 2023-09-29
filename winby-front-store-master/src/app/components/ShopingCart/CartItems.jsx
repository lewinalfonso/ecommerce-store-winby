import React from 'react'

import { Item } from './Item'
import Loading from '../../common/Loading'
import { Flex, ItemAction, ItemTitle, ItemTotal, ItemWrapper, TotalWrapper } from './styled'

export const CartItems = ({ data, loading, handleDelete }) => {
    return <div>
        {loading && <Loading />}
        {/* productos */}
        {data?.products?.map((x, i) => <Item key={`product_cart_${i}`} data={x} type={1} handleDelete={handleDelete} />)}
        {/* servicios */}
        {data?.services?.map((x, i) => <Item key={`service_cart_${i}`} data={x} type={2} handleDelete={handleDelete} />)}
        <ItemWrapper>
            <Flex justify='flex-end'>
                <TotalWrapper>
                    <ItemAction>Cambiar dirección de envío</ItemAction>
                    <p><strong>Enviar a:</strong> Carrera 2 #3-133 Pitalito</p>
                </TotalWrapper>
                <TotalWrapper>
                    <small><strong>Envío: $ 10.000</strong></small>
                    <div>
                        <ItemTitle>Total con envío:</ItemTitle>
                        <ItemTotal>$ 30.000</ItemTotal>
                    </div>
                </TotalWrapper>
            </Flex>
        </ItemWrapper>
    </div>
}