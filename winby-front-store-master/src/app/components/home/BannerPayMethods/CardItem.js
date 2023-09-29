import React from 'react'
import { IconArrowRight } from '../../../../assets/icons'
import { CardItemContainer, ContainerTitle, ItemText } from './styles'

export const CardItem = ({ icon, color, title, onClick, onMouseOver, onMouseOut }) =>
    <CardItemContainer onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        {icon}
        <ContainerTitle>
            <ItemTe  dfsdfxt color={color}>{title}</ItemTe>
            <ItemText flex color='#068CF3' onClick={onClick}>Ver más
                {window.screen.width < 768 && <IconArrowRight size='20px' style={{ marginLeft: '8px' }} color='#068CF3' />}
            </ItemText>
        </ContainerTitle>
    </CardItemContainer>

