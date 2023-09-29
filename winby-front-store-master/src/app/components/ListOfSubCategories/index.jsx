import React from 'react'
import { connect } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
import { ShadowCard } from '../../common/ShadowCard'
import { ListCategories } from '../../skeleton/ListCategories'
import { CategoryCard } from '../CategoryCard/SubCategorieCard'
import { SliderSwiper } from '../SliderSwiper'

const SubCategoríesList = ({ onClick, data, handleSubCategory }) => {

    const size = window.screen.width

    return (
        <ShadowCard title={data?.length && (data[0]?.scs_id || data[0]?.scp_id) ? 'Subcategorias' : 'CATEGORÍAS'} onClick={onClick} margin='12px auto 0'>
            <SliderSwiper
                spaceBetween={25}
                direction='horizontal'
                slidesPerGroup={size > 768 ? 4 : 3}
                slidesPerView={3}
                breakpoints={{
                    360: { slidesPerView: 3, slidesPerGroup: 2 },
                    800: { slidesPerView: 4 },
                    950: { slidesPerView: 5 }
                }}
                keySwiper={`categories-${data?.length || 0}`}
                loading={!data?.length}
                loadingComponent={<ListCategories width={size > 768 ? (size > 1400) ? 1140 : (size - 210) : (size - 50)} column={size > 768 ? 8 : 3} height={size > 768 ? 230 : 120} subTitle={false} />}
            >
                {data?.map(x => <SwiperSlide key={x.scs_id || x.scp_id}>
                    <CategoryCard state={x} onClick={() => handleSubCategory(x)} />
                </SwiperSlide>)}
            </SliderSwiper>
        </ShadowCard>
    )
}

export const ListOfSubCategories = connect()(SubCategoríesList)