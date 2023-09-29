import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { Banner, BannerContainer, Content, Image, Title } from './Styled'
import { PLColor } from '../../../assets/colors'
import Loading from '../../common/Loading'
import { url_base } from '../../redux/types'

SwiperCore.use([Navigation, A11y])

export default ({ data, handleSubCategory }) => (
    <Banner>
        <BannerContainer>
            {data?.length ?
                <Swiper
                    spaceBetween={35}
                    direction='horizontal'
                    navigation
                    slidesPerView={window.screen.width < 768 ? 2 : 5}>
                    {data.map(x => <SwiperSlide key={x.scs_id || x.scp_id}>
                        <ContentImage onClick={() => handleSubCategory(x)} src={`${url_base}static/categories/${x.scs_id ? 'services' : 'products'}/${x.cs_id || x.cp_id}/${x.scs_id || x.scp_id}/${x.scs_photo || x.scp_photo}`} name={x.scs_name || x.scp_name} />
                    </SwiperSlide>)}
                </Swiper>
                : <Loading bgColor={`${PLColor}85`} height='260px' zIndex='1' />}
        </BannerContainer>
    </Banner>
)

const ContentImage = ({ name, src, onClick }) => (
    <Content onClick={onClick}>
        <Image src={src} radius='100%' />
        <Title size='16' padding='10px 0'>{name}</Title>
    </Content>)