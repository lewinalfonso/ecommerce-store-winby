import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { url_base } from '../../../redux/types'

export default ({ state }) => (
    <SlideBar>
        {state.covers?.length && <Swiper
            spaceBetween={0}
            slidesPerView={1}
            direction='horizontal'
            navigation
        >
            {state.covers.map(x => (
                <SwiperSlide key={x.p_id}>
                    <Link style={{ width: '100%' }} to={{ state: { item: x }, pathname: x.p_franchise ? '/info-licencia' : `/productos/detalles/${x.p_id}`}}>
                        <Image src={`${ url_base }static/products/${x.p_id}/${x.p_cover}`} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>}
    </SlideBar>
)

const SlideBar = styled.div`
    overflow: hidden;
    width: 100%;
`
const Image = styled.img`
    width: 100%;
    transition: .4s linear;

`