import React from 'react'
import styled from 'styled-components'
import SlideBar from './SlideBar'
import BannerVendors from './BannerVendors'
import Banner from './Banner'

export default ({ state, handleSlider, handleModal, handleSeeMore }) =>(
    <Main>
        <SlideBar handleSlider={handleSlider} state={state} handleModal={handleModal} />
        <Container>
            <Banner data={state.categories} handleClick={() => handleSeeMore(1)} />
            {state?.products?.map((x, i) => <Banner key={`banner_row_${i}`} itemType data={x} handleClick={() => handleSeeMore(3)} />)}
            {/* <Banner itemType data={state.products} handleClick={() => handleSeeMore(3)} /> */}
            <BannerVendors vendors={state.vendors} handleClick={() => handleSeeMore(2)} title='Aliados comerciales' />
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
