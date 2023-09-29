import React from 'react'
// import { CustomButton } from '../../common/Buttons'
import Loading from '../../common/Loading'
import { url_base } from '../../redux/types'
import { Link } from 'react-router-dom'
// import BannerSubCircle from './BannerSubCircle'
import { GridMenu } from './Styled'
import styled from 'styled-components'
import { SubBanner } from '../../common/Banners'
import { ShadowCard } from '../../common/ShadowCard'
import { ProductCardStandard } from '../ProductsCard'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import { ListOfSubCategories } from '../ListOfSubCategories'
import { BoxLeft, Span, AsideItemsText, BoxTitle } from '../AlliesMenu/index'

export const ListCategories = ({ state, handleSubCategory }) => {

  const [setAddToCart] = useAddToCartProducts()

  const handleClick = (e, item) => {
    e.preventDefault()
    e.stopPropagation()

    item.p_id && setAddToCart(item)
  }
  return (
    <>
      {state.loading && <Loading />}
      <SubBanner
        image={`${url_base}static/categories/${state.category?.cs_id ? 'services' : 'products'}/${state.category?.cs_id || state.category?.cp_id}/${state.category?.cs_horPho || state.category?.cp_horPho}`}
      />
      <NavigationBar>
        <Breadcrumb><To to="/">Inicio {'>'}</To><To to="/categorias">Categorías</To>{`> ${(state.category?.cs_name || state.category?.cp_name || state.cp_name || state.cs_name || '').replace(/^\w/, (c) => c.toUpperCase())}`}</Breadcrumb>
      </NavigationBar>
      <ListOfSubCategories data={state.subCategories} handleSubCategory={handleSubCategory} upCode='Winby' />

      <Container>
        <BoxLeft>
          <BoxTitle><Span fontSize='25px' fontFamily='PFont-Bold'>{(state.category?.cs_name || state.category?.cp_name || state.cp_name || state.cs_name || '').toUpperCase()}</Span></BoxTitle>
          <BoxSpan>
            {state.subCategories?.map((x, i) =>
              <AsideItemsText key={`sub-cat-item-${i}`} onClick={() => handleSubCategory(x)}>{x.scs_name || x.scp_name}</AsideItemsText>
            )}
          </BoxSpan>
        </BoxLeft>
        <ShadowCard margin='0'>

          <BoxRigth className="BoxRight">
            <GridMenu className="GridMenu">

              {state.products?.map(x => (x.p_id ? (x.p_typeVen !== 2) : (x.s_typeVen !== 2)) && <ProductCardStandard key={x.p_id ? `cat-pro-grid-item-${x.p_id}` : `cat-ser-grid-item${x.s_id}`}
                state={x}
                addToCart={e => x.p_id && handleClick(e, x)}
              />)}

            </GridMenu>
          </BoxRigth>
        </ShadowCard>
      </Container>
    </>

  )
}

const NavigationBar = styled.div`
    width:100%;
    height: 30px;
    padding: 4px;
    color: #434242;
`
const Breadcrumb = styled.span`
    padding-left: 10px;
    font-size: 12px;
`

const To = styled(Link)`
  color: #434242;
  font-size: 12px;
  padding: 5px;
  text-decoration: none;
  &:hover {
    color: #DF2D2D;
  }
`

const BoxRigth = styled.div`
  display: flex;
  margin: 10px auto;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px;
  border-radius: 10px;
  background-color: #FFFFFF;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`
const BoxSpan = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px 20%;
`