import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { SwiperSlide } from 'swiper/react'
import Loading from '../../common/Loading'
import { url_base } from '../../redux/types'
import { BannerProduct } from '../../skeleton/BannerProduct'
import { SliderSwiper } from '../SliderSwiper'
import { Container, ThumbsContainer, ThumbsItem, ThumbsImage, ImageSlider, ContainerSlider } from './styled'

export const SliderProduct = ({ state, handleChangeSlide, refs, onClick }) => {
    return (
        <Container>
            {!!state.loading && <Loading />}

            {/* Thumbs de imagenes */}
            <ThumbsContainer>
                <Scrollbars autoHeight autoHeightMax={500} autoHeightMin={0} autoHide ref={refs.scrollRef}>
                    {state.productphotos?.map((x, i) =>
                        <ThumbsItem key={x.pp_id} onMouseOver={e => onClick(e, i)} active={state.activeThumbs === i} ref={state.activeThumbs === i ? refs.thumbsRefs : null}>
                            <ThumbsImage src={`${url_base}static/products/${state.p_id}/${x.pp_name}`} alt='imagen' />
                        </ThumbsItem>
                    )}
                </Scrollbars>
            </ThumbsContainer>
            {/* Swiper  */}
            <ContainerSlider>
                <SliderSwiper
                    height='100%'
                    spaceBetween={35}
                    direction='horizontal'
                    slidesPerGroup={1}
                    slidesPerView={1}
                    keySwiper={`products-${state.productphotos?.length || 0}`}
                    loading={state.loading}
                    loadingComponent={<BannerProduct width={(window.screen.size > 1400) ? 500 : (window.screen.size - 210)} height={500} />}
                    onChangeIndex={e => onClick(e, e.activeIndex)}
                >
                    {state?.productphotos?.map(x =>
                        <SwiperSlide key={x.pp_id}>
                            <ImageSlider src={`${url_base}static/products/${state.p_id}/${x.pp_name}`} alt='imagen' />
                        </SwiperSlide>
                    )}
                </SliderSwiper>
            </ContainerSlider>
        </Container>
    )
}