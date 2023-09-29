import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { Banner, BannerContainer, TitleCategory, Button } from './Styled'
import { To } from '../../../common/Buttons'
import { IconArrowRight } from '../../../../assets/icons'
import { PColor, PLColor, SFVColor } from '../../../../assets/colors'
import Loading from '../../../common/Loading'
import { CardVendors } from '../../../common/Cards'
import { url_base } from '../../../redux/types'
SwiperCore.use([Navigation, A11y])

export default ({ vendors, title, handleClick }) => (
    <Banner>
        <BannerContainer>
            <TitleCategory>{title}</TitleCategory>
            {vendors?.length ? <Swiper
                spaceBetween={35}
                direction='horizontal'
                navigation
                breakpoints={{
                    360: { slidesPerView: 3, slidesPerGroup : 2},
                    450: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    800: { slidesPerView: 4 },
                    950: { slidesPerView: 5 }
                }}
            >
                {vendors.map(x => (
                    <SwiperSlide key={x.v_id}>
                        <To to={{ state: { item: x }, pathname: `/aliados/detalle/${ x.v_id }` }} color={SFVColor}>
                            <CardVendors src={`${ url_base }static/vendors/${ x.v_id }/${ x.v_logo }`} name={x.v_alias} />
                        </To>
                    </SwiperSlide>
                ))}
            </Swiper> : <Loading bgColor={`${ PLColor }85`} height='260px' zIndex='1' />}
            <Button onClick={handleClick}>Ver Mas <IconArrowRight size='10px' color={PColor} style={{ marginLeft: 5 }} /></Button>
        </BannerContainer>
    </Banner>
)