import React from 'react'
import styled from 'styled-components'
import SlideBar from './SlideBar'
import { BannerPayMethods } from './BannerPayMethods'
import { ListOfCategories } from '../ListOfCategories'
import { ListOfFeatureCategories } from '../ListOfCategories/FeatureCategories'
import { ListOfProducts } from '../ListOfProducts'
import { ListOfVendors } from '../ListOfVendors'
import { ProcutsRelevants } from '../ProductsRelevant'
// import { PromoProducts } from '../grid'

export default ({ state, handleSlider, handleModal, handleSeeMore }) => (
    <Main>
        <SlideBar handleSlider={handleSlider} state={state} handleModal={handleModal} />
        <Container>
            <BannerPayMethods state={state} />
            <ListOfCategories onClick={() => handleSeeMore(1)} upCode='Winby' />
            <ListOfVendors onClick={() => handleSeeMore(2)} />
            <ListOfProducts onClick={() => handleSeeMore(3)} numRow={1} upCode='Winby' />
            <ProcutsRelevants />
            <ListOfProducts onClick={() => handleSeeMore(3)} numRow={2} upCode='Winby' />
            {/* <PromoProducts /> */}
            <ListOfFeatureCategories onClick={() => handleSeeMore(1)} />
        </Container>
    </Main>
)

const Main = styled.article`
    width: 100%;
    @media (min-width: 1800px){
        width: 90%;
        margin: auto;
    }
`
const Container = styled.div`
    margin: auto;
    max-width: 1200px;
    margin-bottom: 40px;
`