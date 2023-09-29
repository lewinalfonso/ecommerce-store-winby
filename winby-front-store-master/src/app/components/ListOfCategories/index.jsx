import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
import { ShadowCard } from '../../common/ShadowCard'
import { getAllCategoriesProStore, getAllCategoriesSerStore } from '../../redux/actions/store'
import { ListCategories } from '../../skeleton/ListCategories'
import { organizeArray } from '../../utils'
import { CategoryCard } from '../CategoryCard'
import { SliderSwiper } from '../SliderSwiper'

const CategoríesList = ({ onClick, categoriesSerStore, categoriesProStore, getCatSer, getCatPro, upCode }) => {

    const [categoriesP, setCategoriesP] = useState([])
    const [categoriesC, setCategoriesC] = useState([])
    const [categories, setCategories] = useState([])
    const size = window.screen.width

    useEffect(() => {
        getCatSer({ up_code: upCode, min: 0, max: 20 })
        getCatPro({ up_code: upCode, min: 0, max: 20 })
    }, [getCatSer, getCatPro, upCode])

    useEffect(() => {
        if (upCode !== 'Winby'){
            categoriesProStore?.dataUser?.length && setCategoriesP(categoriesProStore.dataUser)
            categoriesSerStore?.dataUser?.length && setCategoriesC(categoriesSerStore.dataUser)
        } else {
            categoriesProStore?.data?.length && setCategoriesP(categoriesProStore.data)
            categoriesSerStore?.data?.length && setCategoriesC(categoriesSerStore.data)
        }
    }, [categoriesSerStore.data, categoriesProStore.data, categoriesProStore.dataUser, categoriesSerStore.dataUser, upCode, categories])

    useEffect(() => {
        const array = organizeArray(categoriesP, categoriesC, 'uscp_priority', 'uscs_priority')
        setCategories(array)
    }, [categoriesC, categoriesP])
    return (
        <ShadowCard title='CATEGORÍAS' seeMore onClick={onClick}>
            <SliderSwiper
                spaceBetween={25}
                direction='horizontal'
                slidesPerGroup={size > 768 ? 4 : 3}
                slidesPerView={3}
                breakpoints={{
                    360: { slidesPerView: 3, slidesPerGroup : 2},
                    800: { slidesPerView: 4 },
                    950: { slidesPerView: 5 }
                }}
                keySwiper={`categories-${categories.length || 0}`}
                loading={!categories.length}
                loadingComponent={<ListCategories width={size > 768 ? (size > 1400) ? 1140 : (size - 210) : (size - 50)} column={size > 768 ? 8 : 3} height={size > 768 ? 230 : 120} subTitle={false} />}
            >
                {categories?.map(x => <SwiperSlide key={x.uscs_id || x.uscp_id || x.usp_id || x.uss_id}>
                    <CategoryCard state={x} />
                </SwiperSlide>)}
            </SliderSwiper>
        </ShadowCard>
    )
}

export const ListOfCategories = connect(
    ({ categoriesSerStore, categoriesProStore }) => ({ categoriesSerStore, categoriesProStore }),
    { getCatPro: getAllCategoriesProStore, getCatSer: getAllCategoriesSerStore }
)(CategoríesList)