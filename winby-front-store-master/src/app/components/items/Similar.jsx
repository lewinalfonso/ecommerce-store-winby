import React from 'react'
import { Banner } from './Styled'
import { ProductCard } from '../ProductsCard'
import { SliderSwiper } from '../SliderSwiper'
import LoaderProducts from '../../skeleton/LoaderProducts'
import { SwiperSlide } from 'swiper/react'

export default ({ data }) => <Banner>
        {window.screen.width <= 768
            ? data.map(x => <div key={x?.p_id ? `pro-similar-${x.p_id}` : `ser-similar-${x.s_id}`}>
                 <ProductCard state={{ ...(x.p_id ? { product: x } : { service: x }) }} movilmode={window.screen.width <= 768} /* addToCart={e => y.product?.p_id && handleClick(e, y)} */ />
            </div>)
            : <SliderSwiper
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
                keySwiper='items-similar'
                loadingComponent={<LoaderProducts width='185px' height='230px' column={5} />}
                >
                    {data?.map(y => <SwiperSlide key={`pro-similar-${y.p_id || y.s_id}`}>
                        <ProductCard state={{ ...(y.p_id ? { product: y } : { service: y }) }} movilmode={window.screen.width <= 768 ? 'true' : undefined} /* addToCart={e => y.product?.p_id && handleClick(e, y)} */ />
                    </SwiperSlide>)}
                </SliderSwiper>
            }
    </Banner>
