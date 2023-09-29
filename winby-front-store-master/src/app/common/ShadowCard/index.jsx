import React from 'react'
import { IconArrowRight } from '../../../assets/icons'
import { HeadCard, ItemText, ShadowCardContainer } from './styles'

export const ShadowCard = ({ children, title, seeMore, onClick, fontSize, maxWidth, margin, movilmode }) => {
    return (
        <ShadowCardContainer sizeH maxWidth={maxWidth} margin={margin} movilmode={movilmode}>
            <HeadCard fontSize={fontSize}>{title}</HeadCard>
            <div>
                {children}
            </div>
            {!!seeMore && <ItemText onClick={onClick} flex color='#068CF3'>Ver más {<IconArrowRight size='10px' style={{ marginLeft: '8px' }} color='#068CF3' />}</ItemText>}
        </ShadowCardContainer>
    )
}