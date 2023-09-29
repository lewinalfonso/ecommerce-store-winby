import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { SliderSwiper } from '../SliderSwiper'

import { ProductCard } from '../ProductsCard'
import { ShadowCard } from '../../common/ShadowCard'
import { useOffersData } from '../../hooks/useOffersData'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import LoaderProducts from '../../skeleton/LoaderProducts'


export const ListOfOffers = ({ onClick, movilmode, modeLite }) => {

    const [itemsCount, setItemCount] = useState(0)
    const [items, setItems, { loading }] = useOffersData()
    const [setAddToCart] = useAddToCartProducts()

    useEffect(() => {
        setItemCount(window.screen.width < 768 ? 5 : 20)
        setItems({ up_code: 'Winby', min: 0, max: 5, typeOrder: 1 })
    }, [setItems, setItemCount])

    const handleClick = (e, item) => {
        e.stopPropagation()
        e.preventDefault()

        setAddToCart(item)
    }

    return <>{[...(modeLite && items?.length ? [items[0]] : items)]?.map(x => <ShadowCard movilmode={movilmode} title={x.porName} key={`rowBaner${x.porId}`} onClick={onClick}>
        {(window.screen.width > 768 && !movilmode)
            ? <SliderSwiper
                spaceBetween={10}
                direction='horizontal'
                slidesPerGroup={5}
                breakpoints={{
                    360: { slidesPerView: 3, slidesPerGroup : 2},
                    450: { slidesPerView: 4 },
                    640: { slidesPerView: 3 },
                    800: { slidesPerView: 4 },
                    950: { slidesPerView: 5 }
                }}
                keySwiper={`items-${x.porId}`}
                loading={loading}
                loadingComponent={<LoaderProducts width='185px' height='230px' column={5} />}
            >
                {x.productOffers.map(y => <SwiperSlide key={`pro-${y.poId}`}>
                    <ProductCard state={y} addToCart={e => y.product?.p_id && handleClick(e, y.product)} />
                </SwiperSlide>)}
            </SliderSwiper>
            : x.productOffers.map((x, i) => (i < itemsCount) ? <div key={x.product?.p_id ? `pro-${x.poId}` : `ser-${x.poId}`}>
                <ProductCard movilmode={movilmode} state={x} addToCart={e => x.product?.p_id && handleClick(e, x.product)} />
            </div> : [])
        }
    </ShadowCard>
    )}</>
}