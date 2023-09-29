import React from 'react'
import { BGVColor } from '../../../assets/colors'
import minimumInvestment from '../../../assets/icons/minimumInvestment.svg'
import business from '../../../assets/icons/business.svg'
import accessibility from '../../../assets/icons/accessibility.svg'
import { TitleParagraph, ContentBox, Paragraph, Content, Img } from './Styled'

export default () => (
    <>
        <Paragraph marginp='30px' >Si buscas un ingreso adicional que en el mediano plazo se convierta en tu ingreso principal; lo mejor es que inviertas en una licencia, porque de esa manera evitarás muchos de los riesgos que tendrías al iniciar un nuevo negocio.</Paragraph>
        <Paragraph marginp='30px'>LA LICENCIA WINBY es la mejor oportunidad para ti; A continuación, enumeramos algunas ventajas que tenemos sobre otras licencias del mercado:</Paragraph>
        <Content res grid='1fr 1fr 1fr'>
            <ContentBox>
                <Img height='250px' src={minimumInvestment}/>
                <TitleParagraph margin={window.screen.width > 768 && '13%'} color={BGVColor}>Inversión mínima</TitleParagraph>
                <Paragraph marginp='10px 50px' align='justify'>La LICENCIA WINBY requiere una inversión de tan solo COP $100.000 mensuales.</Paragraph>
            </ContentBox>
            <ContentBox res borderLeft='1px solid red' borderRight='1px solid red'>
                <Img height='250px' src={business}/>
                <TitleParagraph margin={window.screen.width > 768 && '13%'} color={BGVColor}>Tu negocio virtual</TitleParagraph>
                <Paragraph marginp='10px 50px' align='justify'>No es un secreto que, a causa de los últimos eventos de salud mundial, los negocios soportados en la internet se han acelerado. Es el momento para invertir en una licencia cuyo medio principal de intercambio de productos y servicios, es la internet.</Paragraph>
            </ContentBox>
            <ContentBox>
                <Img height='250px' src={accessibility}/>
                <TitleParagraph margin={window.screen.width > 768 && '13%'} color={BGVColor}>Accesibilidad</TitleParagraph>
                <Paragraph marginp='10px 50px' align='justify'>Ingresa al web site o aplicativo móvil en cualquier momento y desde cualquier dispositivo para comenzar a aprender y vender de la mano de nuestros líderes.</Paragraph>
            </ContentBox>
        </Content>
    </>
)