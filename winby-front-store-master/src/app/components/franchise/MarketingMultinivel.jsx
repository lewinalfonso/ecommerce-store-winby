import React from 'react'
import { BGVColor } from '../../../assets/colors'
import { TitleParagraph, TextContent, Paragraph, BodyBtn, ContainerMain, Btn, Img } from './Styled'
import network from '../../../assets/icons/network.svg'

export default ({ handleClick }) => (
    <ContainerMain res >
        <TextContent>
            <TitleParagraph margin='20px' weight='500'color={BGVColor} >Marketing en red</TitleParagraph>
            <Paragraph marginp='0 0 0 20px'>El Marketing en red te dará la posibilidad de obtener ingresos residuales, recibirás una utilidad de la venta de miles de productos y servicios comercializados por los miembros de tu red.</Paragraph>
        </TextContent>
        <Img src={network}/>
        <BodyBtn>
            <Btn onClick={handleClick}>Comienza AHORA</Btn>
        </BodyBtn>
    </ContainerMain>
)