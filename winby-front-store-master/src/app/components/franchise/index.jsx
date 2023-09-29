import React from 'react'
import styled from 'styled-components'
import SlideBar from '../home/SlideBar'
import { BannerPayMethods } from '../home/BannerPayMethods'
import { ListOfCategories } from '../ListOfCategories'
import { ListOfFeatureCategories } from '../ListOfCategories/FeatureCategories'
import { ListOfProducts } from '../ListOfProducts'
import { ListOfVendors } from '../ListOfVendors'
import { ProcutsRelevants } from '../ProductsRelevant'
import { useRouteMatch } from 'react-router-dom'

export default ({ state, handleSlider, handleModal, handleSeeMore }) => {

    const match = useRouteMatch()

    return (
        <Main>
            <SlideBar handleSlider={handleSlider} state={state} handleModal={handleModal} />
            <Container>
                <BannerPayMethods state={state} />
                <ListOfCategories onClick={() => handleSeeMore(1)} upCode={match.params?.code || 'Winby'} />
                <ListOfVendors onClick={() => handleSeeMore(2)} />
                <ListOfProducts onClick={() => handleSeeMore(3)} numRow={1} upCode={match.params?.code || 'Winby'} />
                <ProcutsRelevants store />
                <ListOfProducts onClick={() => handleSeeMore(3)} numRow={2} upCode={match.params?.code || 'Winby'} />
                <ListOfFeatureCategories onClick={() => handleSeeMore(1)} />
            </Container>
        </Main>
)}

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