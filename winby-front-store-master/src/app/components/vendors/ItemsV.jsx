import React from 'react'
import Loading from '../../common/Loading'
// import { url_base } from '../../redux/types'
import { GridMenu, CustomButton } from './Styled'
// import { SubBanner } from '../../common/Banners'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import { ProductCardStandard } from '../ProductsCard'
import { ShadowCard } from '../../common/ShadowCard'

export default ({ state, handleShowMore }) => {
  const [setAddToCart] = useAddToCartProducts()

  const handleClick = (e, item) => {
    e.stopPropagation()
    e.preventDefault()

    setAddToCart(item)
  }
  return (
    <>
      {state.loading && <Loading />}
      {/* {!!state.vendor?.v_banner && <SubBanner
        image={`${url_base}static/vendors/${state.vendor.v_id}/${state.vendor?.v_banner}`}
        link={`INICIs / VENDEDOR / ${((state.vendor?.tp_id === 1 ? `${state.vendor?.v_name} ${state.vendor?.v_last}` : state.vendor?.v_business) || '').toUpperCase()}`}
      />
      } */}
      <ShadowCard title={`ALIADO ${state.vendor?.v_alias}`} >
        <GridMenu>
          {state.items?.map(x =>
            <ProductCardStandard key={x.p_id ? `pro-${x.p_id}` : `ser-${x.s_id}`}
              state={x}
              addToCart={e => x.p_id && handleClick(e, x)}
            />)}
        </GridMenu>
      </ShadowCard>
      <CustomButton disabled={state.loading} onClick={handleShowMore}>Ver Más</CustomButton>
    </>)
}