import React from 'react'
import Loading, { LoadingCardItem } from '../../common/Loading'
import { GridMenu, Container, Subcontainer, SpanText, IconSVG } from './Styled'
import iconSearchNoFound from '../../../assets/searchNotFound.png'
import { ShadowCard } from '../../common/ShadowCard'
import { PLColor, SFColor, PLVColor } from '../../../assets/colors'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ProductCardStandard } from '../ProductsCard'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import { CategoryCard } from '../../components/CategoryCard'
import { LoadingInfiniteScroller } from '../../common/LoadingInfiniteScroller'

export const ListOfSearch = ({ state, onFetchMore }) => {

    const [setAddToCart] = useAddToCartProducts()

    const handleClick = (e, item) => {
        e.preventDefault()
        e.stopPropagation()

        item.p_id && setAddToCart(item)
    }

    // console.log(state.products)

    return (
        <ShadowCard>
            {!!state.loading && <Loading />}
            <SpanText pTop='15px'>Resultados de busqueda para <b>"{state.search}"</b></SpanText>
            {!!state.categories?.length && <SpanText pTop='15px'>Categorías</SpanText>}
            {!!state.categories?.length && <GridMenu>
                {state.categories?.map((x, i) => !!x &&
                    <CategoryCard key={`serach_item_cat_${i}`} state={x} />
                )}
            </GridMenu>}
            {!!state.products?.length && <SpanText pTop='15px'>Productos</SpanText>}
            {!!state.products?.length && <GridMenu>
                {state.products?.map((x, i) => !!x &&
                    <React.Fragment key={`search_item_pro_ser_${i}`}>
                        <ProductCardStandard state={x} addToCart={e => x.p_id && handleClick(e, x)} />
                        {i === state.products?.length -1 && <LoadingInfiniteScroller fetchMore={state.fetchMore} callback={onFetchMore} render={<LoadingCardItem />} />}
                    </React.Fragment>
                )}
            </GridMenu>}

            {!state.products?.length && !state.categories?.length && <Container>
                <Subcontainer smWidth='100%' lgWidth='80%'>
                    <SpanText>Lo sentimos, no podemos encontrar nada relacionado con tu búsqueda.</SpanText>
                    <Subcontainer smWidth='80%' lgWidth='25%'>
                        <IconSVG src={iconSearchNoFound} alt='No hay resultados' />
                    </Subcontainer>
                </Subcontainer>
            </Container>}
        </ShadowCard>
    )
}

export const SliderItem = styled.div`
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
`
export const Line = styled.div`
    display: none;
    background-color: ${PLVColor};
    width: 95%;
    height: 1px;
    margin: auto;
`
export const Anchor = styled(Link)`
    text-decoration: none;
    display: flex;
    position: relative;
    width: 100%;
    height: 140px;
    border-top: 1px solid ${PLVColor};
    padding: 10px 2px;
    margin: 4px auto;

    &:hover span, &:hover > div, &:hover ${Line} {
        display: block;
    }

    @media(min-width: 768px){
        display: inline-block;
        width: 185px;
        height: 230px;
        border: none;
        padding: 0;
        margin: auto;
    }
`
export const Image = styled.img`
    width: 130px;
    height: 115px;
    object-fit: contain;

    @media(min-width: 600px) {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }
`
export const DescriptionContainer = styled.div`
    position: static;
    text-align: center;
    overflow: hidden;
    width: 100%;
    color: ${SFColor};
    margin-left: 11px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media(min-width: 600px){
        padding: 0;
        position: absolute;
        top: 180px;
        left: 0px;
        margin-left: 0;
        background-color: ${PLColor};
    }
`
export const ContainerMovilInfo = styled.div`
   display: flex;
   flex-direction: row;

    @media(min-width: 768px){
        display: none;
    }
`
export const TitleCategory = styled.span`
    font-size: 16px;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-family: PFont-Light;
    width: 101%;
    display: block;

    @media(min-width: 600px){
        text-align: center;
        padding: 4px;
        display: none;
        font-size: 13px;
    }
`
export const FreeContainer = styled.div`
    display: inline-block;
    @media(min-width: 768px) {
        display: none;
    }
`
export const Price = styled.h4`
    font-family: PFont-Bold;
    margin: 0;
    width: 101%;
    font-size: 20px;
    text-align: left;

    @media(min-width: 768px){
        text-align: center;
        font-size: 14px;
    }
`

export const IconActions = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 5px;
    right: 5px;
    display: none;
`
export const ButtonIcon = styled.button`
    margin: 2px;
    width: 20px;
    height: 20px;
    padding: 2px;
    border: 1px solid ${SFColor};
    border-radius: 50%;
    background-color: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    & > svg { pointer-events: none; }
    &:active { opacity: .5; }
`