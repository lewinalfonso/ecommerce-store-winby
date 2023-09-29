import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y } from 'swiper'

import { ShadowCard } from '../../common/ShadowCard'
import { getAllVendors } from '../../redux/actions/vendors'
import { VendorsCard } from '../VendorsCard'
import { SliderSwiper } from '../SliderSwiper'
import { ListCategories } from '../../skeleton/ListCategories'

SwiperCore.use([Navigation, A11y])

const VendorsList = ({ onClick, getVendors, vendors }) => {

    // Declarando estados
    const [vendorsList, setVendorsList] = useState([])
    const size = window.screen.width

    useEffect(() => {
        getVendors({ v_state: 1, min: 0, max: 20 })
    }, [getVendors]);

    useEffect(() => {
        vendors?.data?.length && setVendorsList(vendors.data)
    }, [vendors.data, setVendorsList])

    return (
        <ShadowCard title='ALIADOS COMERCIALES' seeMore onClick={onClick}>
            <SliderSwiper
                spaceBetween={25}
                direction='horizontal'
                slidesPerGroup={size > 768 ? 4 : 3}
                slidesPerView={3}
                breakpoints={{
                    800: { slidesPerView: 4 },
                    950: { slidesPerView: 5 }
                }}
                loadingComponent={<ListCategories width={size > 768 ? ((size > 1400) ? 1140 : (size - 210)) : (size - 50)} column={size > 768 ? 8 : 4} height={size > 768 ? 230 : 80} borderRadius={20} title={false} subTitle={false} />}
                keySwiper={`vendors-${vendorsList.length || 0}`}
                loading={!vendorsList.length}
            >
                {vendorsList.map(x => <SwiperSlide key={x.v_id}>
                    <VendorsCard state={x} />
                </SwiperSlide>
                )}
            </SliderSwiper>
        </ShadowCard>
    )
}

export const ListOfVendors = connect(
    ({ vendors }) => ({ vendors }),
    { getVendors: getAllVendors }
)(VendorsList)