import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, BGVColor } from '../../../assets/colors'
import bgseccionfour from '../../../assets/img/backgroundAliados.png'
import backExcAliados from '../../../assets/img/backExcAliados.png'
import bannerStartPGAllies from '../../../assets/img/bannerStartPGAllies.jpg'
import alliesend from '../../../assets/alliesend.jpg'
import bannerMediumPGAllies from '../../../assets/img/bannerMediumPGAllies.jpg'
import { animFadeInDown } from '../../common/Animations'
import Header from './layout/index'
import Footer from './layout/footer'

export default ({ state, handleMenu }) => (<>
    <Section>
        <Header handleMenu={handleMenu} visible={state.visible} state={state}/>
        <BgImg zIndex='1' background={window.screen.width <= 1024 ? '' : bgseccionfour} height={window.screen.width <= 1024 ? '144px' : '2340px'}>
            <Flex display='flex' id='sAliad'>
                <Content width='16%'/>
                <Content width='70%' margin='10% 0% 1% 0%'>
                    <Text Bold count='0.2' color={BGVColor} size={window.screen.width <= 1024 ? '20px' : '50px'} align='start' weight='bold'>Aliados<br /></Text>
                    <Text Bold count='0.4' color={BGVColor} align='start' size={window.screen.width <= 1024 ? '14px' : '20px'} weight='bold'>PROPUESTA DE VALOR WINBY<br /></Text>
                    <Text count='0.5' color={BGVColor} size={window.screen.width <= 1024 ? '14px' : '20px'} align='start'>
                        <Text Bold color={BGVColor} align='start' size={window.screen.width <= 1024 ? '14px' : '20px'} weight='bold'>¡Nuestro trabajo será incrementar tus ventas y vaya que sabemos hacerlo! </Text>Seremos tu fuerza de ventas externa, un canal por medio del cual mercadear tus productos y servicios; uno que no tiene costo fijo, sino que pagas a resultado y que, aunque no lo tenías previsto, sin duda alguna se convertirá en tu mayor generador de ventas e ingresos, es un ganar, ganar. <br /><br /></Text>
                </Content>
                <Img src={bannerStartPGAllies} display={window.screen.width > 1024 ? 'none' : 'block'}/>
                <Content width='16%'/>
                <Content width='34%' margin='2% 0% 0% 0%'>
                    <Text Bold count='0.4' color={BGVColor} align='start' size={window.screen.width <= 1024 ? '15px' : '20px'} weight='bold'>NUESTRO SISTEMA<br /></Text>
                    <Text count='0.5' color={BGVColor} size={window.screen.width <= 1024 ? '14px' : '20px'} width='49%' align='start'> Nuestra operación está soportada en un robusto sistema de información que analiza las preferencias de compras de millones de personas, paso seguido nuestro departamento de compras busca los proveedores para esos productos y servicios lo más cerca posible de los lugares donde se encuentran quienes los están buscando.<br /><br /></Text>
                </Content>
            </Flex>
            <Flex display='flex'>
                <Content width='58%'/>
                <Content width='35%' margin={window.screen.width <= 1024 ? '5px 0% 0% 0%' : '30% 0% 5% 0%'} >
                    <Text Bold color={BGVColor} align='start' size={window.screen.width <= 1024 ? '15px' : '20px'} weight='bold'>OFICINA VIRTUAL<br /></Text>
                    <Text color={BGVColor} size={window.screen.width <= 1024 ? '14px' : '20px'} align='start' width='49%' >Nuestros aliados contarán con una oficina virtual dentro de nuestra plataforma donde podrán:<br /> -Subir sus productos o servicios<br /> -Manejar su inventario<br />-Ver los pedidos de sus productos<br /> -Ver los reportes de sus ventas<br /> -Manejar sus transacciones de forma segura con nuestra billetera virtual.<br /><br /></Text>
                </Content>
                <Content width='58%'/>
                <Content width='35%' margin={window.screen.width <= 1024 ? '2% 0% 10% 0%' : '11% 0% 2% 0%'}>
                    <Text Bold color={BGVColor} align='start' size={window.screen.width <= 1024 ? '15px' : '20px'} weight='bold'>NUESTRAS FUERZAS DE VENTAS<br /></Text>
                    <Text color={BGVColor} size={window.screen.width <= 1024 ? '14px' : '20px'} width='49%' align='start' >Winby cuenta con una red de miles de Winbers que estarán promocionando los productos que se encuentren dentro de nuestra plataforma, así conectamos a nuestros clientes contigo.<br /><br /> </Text>
                    <Text Bold color={BGVColor} align='start' size={window.screen.width <= 1024 ? '14px' : '20px'} weight='bold'>Nuestra estructura comercial trabaja en función de aumentar tus ventas. </Text>
                </Content>
                <Img src={bannerMediumPGAllies} display={window.screen.width > 1024 ? 'none' : 'block'} />
            </Flex>
        </BgImg>
        <BgImg id='sExclusiveness' background={window.screen.width <= 1024 ? alliesend : backExcAliados} height={window.screen.width <= 1024 ? '885px' : '885px'}>
            <Flex display='flex'>
                <Content width='50%'/>
                <Content width='44%' height='425px' margin={window.screen.width <= 1024 ? '10px' : '150px 0'}>
                    <SpanInf Bold color={BGColor} size={window.screen.width <= 1024 ? '10px' : '18px'} align='start' weight='bold'>EXCLUSIVIDAD<br /></SpanInf>
                    <SpanInf color={BGColor} size={window.screen.width <= 1024 ? '10px' : '20px'} align='start'>Como política de empresa, solo negociamos con un proveedor en cada sector de la ciudad. Nuestro sistema de información geolocalizará tu establecimiento de comercio y no permitirá otra alianza con un establecimiento que venda tú mismo producto o servicio en un radio de 1000 metros a la redonda.<br /><br /></SpanInf>
                    <SpanInf Bold weight='bold'>AMPLIACI0N DE MERCADO<br /></SpanInf>
                    <SpanInf>Si las características de tu producto o servicio lo permiten, promoveremos su venta a nivel nacional. De tal manera que ampliaremos tu cobertura de mercado fuera de tu alcance actual. Ten en cuenta los costos de envío nacional a la hora de liquidar las utilidades de tu producto. <br /><br /></SpanInf>
                    <SpanInf Bold weight='bold'>RESULTAD0S<br /></SpanInf>
                    <SpanInf>Trabajamos a resultado, lo cual quiere decir que solo nos pagarás cuando la venta se haya realizado. Del valor de la venta descontaremos el porcentaje que nos corresponde por la intermediación realizada en el proceso de venta. <br /><br /></SpanInf>
                    <SpanInf Bold weight='bold'>SIN RIESGO<br /></SpanInf>
                    <SpanInf>Nuestra plataforma de pagos es 100% segura. Cuando tus productos sean pedidos, nuestro sistema verificara su pago, tu despacharas el producto y podrás descargar tu dinero de nuestra plataforma los días que acordemos.</SpanInf>
                </Content>
            </Flex>
        </BgImg>
        <Footer/>
    </Section>
</>
)
const Section = styled.section`
    font-family: PFont-Regular;
    width: 100%;
`
const BgImg = styled.div`
    width: 100%;
    ${({ position }) => position && css`position: ${position};`};
    ${({ zIndex }) => zIndex && css`z-index: ${zIndex};`};
    ${({ height }) => height && css`height: ${height};`};
    background-image: ${({ background }) => `url(${background})`};
    background-size: cover;
    background-repeat: no-repeat;
    @media(max-width: 1500px){
        height: auto;
    }
`
const Flex = styled.div`
    ${({ display }) => display && css`display: ${display};`};
    ${({ gridTemplate }) => gridTemplate && css`grid-template-columns: ${gridTemplate};`};
    ${({ gridgap }) => gridgap && css`grid-gap: ${gridgap};`};
    flex-direction: row;
    flex-wrap: wrap;
    width:100%;
    @media(max-width: 1000px){
    }
`
const Img = styled.img`
    display: ${({ display }) => display ? display : 'block'};
    width: 100%;
`
const Content = styled.div`
    ${({ BGColor }) => BGColor && css`background-color: ${BGColor};`};
    ${({ width }) => width && css`width: ${width};`};
    background-image: ${({ Background }) => Background ? Background : ''};
    height: ${({ height }) => height ? height : '250px'};
    background-repeat: no-repeat;
    background-position: center;
    ${({ border }) => border && css`border-bottom: ${border};`};
    margin: ${({ margin }) => margin ? margin : ''};
    @media(max-width: 1100px){
        width: 100%;
        height: auto;
        margin-left: 7%;
        margin-right: 6%;
    }
`
const Text = styled.span`
    color: ${({ color }) => color ? color : `${BGColor}`};
    text-align: ${({ align }) => align ? align : 'center'};
    font-size: ${({ size }) => size ? size : '14px'};
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    opacity: 0;
    animation: ${animFadeInDown} 1s;
    animation-fill-mode: forwards;
    animation-delay: ${({ count }) => count}s;
    ${({ Bold }) => !!Bold && css`
        font-family: PFont-Bold;
    `}
`
const SpanInf = styled.span`
    font-size: 20px;
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color ? color : `${BGColor}`};
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    @media(max-width: 1600px) {
        font-size: 17px;
    }
    @media(max-width: 1200px) {
        font-size: 15px;
    }
    @media(max-width: 1000px) {
        font-size: 13px;
    }
    @media(max-width: 700px) {
        font-size: 13px;
    }
`