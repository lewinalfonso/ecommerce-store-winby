import React from 'react'
import Loading from '../../common/Loading'
import { GridMenu, CustomButton } from './Styled'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import { ShadowCard } from '../../common/ShadowCard'
import { ProductCard } from '../ProductsCard'

export const ListProductsAll = ({ state, handleShowMore }) =>{

    const [setAddToCart] = useAddToCartProducts()

    const handleClick = (e, item) => {
        e.preventDefault()
        e.stopPropagation()

        item.p_id && setAddToCart(item)
    }
    return (
        <ShadowCard>
            {state.loading && <Loading />}
            <GridMenu>
                {state.items?.map(x => <ProductCard key={x.product?.p_id ? `pro-${x.product?.p_id}` : `ser-${x.service?.s_id}`} state={x} addToCart={e => x.product?.p_id && handleClick(e, x.product)} />)}
            </GridMenu>
            {!state.finalResult && <CustomButton disabled={state.loading} onClick={handleShowMore}>Ver Más</CustomButton>}
        </ShadowCard>
    )
}
