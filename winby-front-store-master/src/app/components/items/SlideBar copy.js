import React from 'react'
import styled from 'styled-components'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/components/pagination/pagination.scss';
import { Link } from 'react-router-dom'
import { url_base } from '../../redux/types'
import './styles.css'

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default ({ state }) => (
    <SlideBar>
        {!!state.covers?.length && <Swiper
            spaceBetween={0}
            slidesPerView={1}
            direction='horizontal'
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
        >
            {state.covers?.map(x => (
                <SwiperSlide key={x.p_id}>
                    <Link style={{ width: '100%' }} to={{ state: { item: x }, pathname: x.p_franchise ? '/info-licencia' : `/productos/detalles/${x.p_id}` }}>
                        <Image src={`${url_base}static/products/${x.p_id}/${x.p_cover}`} />
                    </Link>
                    <div className="swiper-button-next btn-swiper-right"></div>
                    <div className="swiper-button-prev btn-swiper-left"></div>
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