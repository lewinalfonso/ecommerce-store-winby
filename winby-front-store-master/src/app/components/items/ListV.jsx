import React/* , { useEffect, useRef, useState } */ from 'react'
import styled from 'styled-components'
import SlideBar from './SlideBar.js'
import { ListOfOffers } from '../ListOfOffers'
import { ProductCardStandard } from '../ProductsCard'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts.js'
import { GridMenu } from './Styled.jsx'
import { ShadowCard } from '../../common/ShadowCard/index.jsx'

export default ({ state, handleShowMore, handleSlider }) => {
    const [setAddToCart] = useAddToCartProducts()
    // const el = useRef()

    const handleClick = (e, item) => {
        e.stopPropagation()
        e.preventDefault()

        setAddToCart(item)
    }

//    const useOnScreen = ref => {
//        const [isIntersecting, setIsIntersecting] = useState(false)

//        const observer = new IntersectionObserver(
//            ([entry]) => setIsIntersecting(entry.isIntersecting)
//        )

//        useEffect(() => {
//            if (ref.current) observer.observe(ref.current)
//            // Remove the observer as soon as the component is unmounted
//            return () => { observer.disconnect() }
//        }, [ref, observer])

//        return isIntersecting
//    }

//    const isVisible = useOnScreen(el)

//    useEffect(() => {
//        console.log('isVisible', isVisible)
//        if (isVisible) {
//            console.log('loading...')
//             handleShowMore()
//        }
//    }, [isVisible, handleShowMore])

    return (<Container>
        <SlideBar handleSlider={handleSlider} state={state} />
        {state.type === 2 ? <>
            <ShadowCard seeMore={!state.finalResult} onClick={handleShowMore}>
                <Title>POPULARES</Title>
                <GridMenu>
                    {!!state.items?.length && state.items.map(x => (x.p_typeVen !== 2 && x.s_typeVen !== 2) && <ProductCardStandard key={x.p_id ? `pro-${x.p_id}` : `ser-${x.s_id}`}
                        state={x}
                        addToCart={e => x.p_id && handleClick(e, x)}
                    />)}
                    {/*  {!!state.items?.length && <div ref={el} id='loadMoreEl' style={{ background: '#777', padding: '10px' }}>
                        Cargando...
                    </div>} */}
                </GridMenu>
            </ShadowCard>
        </> : <ListOfOffers />}
    </Container>)
}
const Container = styled.div`
    margin: auto;
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.span`
    display: block;
    width: 100%;
    padding: 5px 15px;
    font-size: 20px;
    color: #2A2A2A;
    font-weight: bold;
`