import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { ProductCard } from '../ProductsCard'
import { ShadowCard } from '../../common/ShadowCard'
import { useServicesProductsData } from '../../hooks/useServicesProductsData'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import { SliderSwiper } from '../SliderSwiper'
import { ListCategories } from '../../skeleton/ListCategories'
import { ListProductMobileS } from '../../skeleton/ListProductMobileS'

SwiperCore.use([Navigation, A11y])

export const ListOfProducts = ({ onClick, numRow, upCode }) => {
    const [itemsCount, setItemCount] = useState(0)
    const [firstRow, setFirstRow] = useState([])
    const [items, setItems, { loading }] = useServicesProductsData()
    const [setAddToCart] = useAddToCartProducts()
    const size = window.screen.width

    useEffect(() => {
        setItemCount(window.screen.width < 768 ? 5 : 20)
        setItems({ up_code: upCode, typeOrder: 1 })
    }, [setItems, setItemCount, upCode])

    useEffect(() => {
        const fRow = items?.filter(x => (x.usp_row === numRow || x.uss_row === numRow)) || []
        fRow.length && setFirstRow(fRow)
    }, [items, numRow])
    

    const handleClick = (e, item) => {
        e.preventDefault()
        e.stopPropagation()

        item.p_id && setAddToCart(item)
    }

    return (
        <ShadowCard title='PRODUCTOS' seeMore onClick={onClick}>
            {window.screen.width > 768 ?
                <SliderSwiper
                    spaceBetween={35}
                    direction='horizontal'
                    slidesPerGroup={4}
                    breakpoints={{
                        360: { slidesPerView: 3, slidesPerGroup : 2},
                        450: { slidesPerView: 4 },
                        640: { slidesPerView: 3 },
                        800: { slidesPerView: 4 },
                        950: { slidesPerView: 5 }
                    }}
                    keySwiper={`items-${firstRow?.length || 0}`}
                    loading={loading}
                    loadingComponent={<ListCategories width={(size > 1400) ? 1140 : (size - 210)} column={size > 768 ? 8 : 3} height={230} subTitle={false} />}
                >
                    {firstRow?.map((x, i) => (i < itemsCount) ? <SwiperSlide key={x.product?.p_id ? `pro-${i}` : `ser-${i}`}>
                        <ProductCard state={x} addToCart={e => x.product?.p_id && handleClick(e, x.product)} />
                    </SwiperSlide> : [])}
                </SliderSwiper>
                :
                (loading ? <ListProductMobileS width={315} row={6} height={700} /> :
                    firstRow?.map((x, i) => (i < itemsCount) ? <div key={x.product?.p_id ? `pro-${i}` : `ser-${i}`}>
                        <ProductCard state={x} addToCart={e => x.product?.p_id && handleClick(e, x.product)} />
                    </div> : [])
                )
            }
        </ShadowCard>
    )
}