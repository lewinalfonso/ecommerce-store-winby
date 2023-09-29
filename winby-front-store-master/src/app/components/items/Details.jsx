import React from 'react'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { ListOfOffers } from '../ListOfOffers'
import { Box, Container, ContainerProducts, WraperDescription, Main, Price, OffersText, ContainerOffers } from './Styled'
import Loading from '../../common/Loading'
import Similar from './Similar'
import { SliderProduct } from '../ProductSlider'
import { ProductInfo } from '../ProductInfo'

SwiperCore.use([Navigation, A11y])

export default ({ state, onClick, handleChangeSlide, refs, handleShop, handleQuantity, handlePayoptions, onChangeSelect }) => {

    return (
        <Main>
            <Container>
                <ContainerProducts>
                    <SliderProduct state={state} handleChangeSlide={handleChangeSlide} refs={refs} onClick={onClick} />

                    <ProductInfo onChangeSelect={onChangeSelect} state={state} onClick={onClick} handlePayoptions={handlePayoptions} handleQuantity={handleQuantity} handleShop={handleShop} />

                    {/* Descripcion del producto  */}
                    <Box position='relative' borderTop padding='20px'>
                        {state.loading
                            ? <Loading />
                            : <>
                                <Price>Descripción:</Price>
                                <WraperDescription dangerouslySetInnerHTML={{ __html: state.p_description }} />
                            </>}
                    </Box>

                    {/* Productos en oferta */}
                    <ContainerOffers>
                        <OffersText>Productos en Oferta</OffersText>
                        <ListOfOffers movilmode='true' modeLite={true}/>
                    </ContainerOffers>

                </ContainerProducts>
            </Container>
            {state.similar?.length && <>
                <br />
                <Price> &nbsp; &nbsp; Similares</Price>
                <Similar data={state.similar} />
            </>}
        </Main>
    )
}