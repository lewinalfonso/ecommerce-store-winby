import React from 'react'
import { BGVColor } from '../../../assets/colors'
import Marketing from '../../../assets/icons/marketingDigital.svg'
import { Img, TitleParagraph, TextContent, Paragraph, ContainerMain } from './Styled'

export default () => (
    <ContainerMain res grid='1fr 1.3fr' borderBottom='1px solid red'>
        <Img height={window.screen.width <= 768 ? '200':'300px'} src={Marketing}/>
        <TextContent>
            <TitleParagraph color={BGVColor} weight='500'>Marketing digital</TitleParagraph>
            <Paragraph marginp='0 20px 0 0'>Te apoyaras de estrategias de marketing que te enseñaremos para que lasventas de tu tienda sean sorprendentes, también te enseñaremos autilizar tus redes sociales para generar ventas en automático, esto quiere decir que cuando te vayas a dormir tu licencia winby podría generar ganancias para ti.</Paragraph>
        </TextContent>
    </ContainerMain>
)