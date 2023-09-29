import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, BGVColor, PColor } from '../../../assets/colors'
import bannerStartSales from '../../../assets/img/bannerStartSales.jpg'
import bannerStartSalesMovil from '../../../assets/img/bannerStartSalesMovil.jpg'
import bannerEndSales from '../../../assets/img/bannerEndSales.jpg'
import bannerEndSalesMovil from '../../../assets/img/bannerEndSalesMovil.jpg'
import bannerMediumSales from '../../../assets/img/bannerMediumSales.jpg'
import bannerMediumSalesMovil from '../../../assets/img/bannerMediumSalesMovil.jpg'
import beAllie from '../../../assets/img/beAllie.jpg'
import pay from '../../../assets/img/pay.jpg'
import platform from '../../../assets/img/platform.jpg'
import { ButtonSubmit } from '../../common/Buttons'
import { InputTextArea } from '../../common/InputText'
import { animFirst, animFadeInDown, fadeIn } from '../../common/Animations'
import { InputPhone } from '../../common/inputs'
import { IconLogoLetter } from '../../../assets/icons'

export default ({ state, handleInput, onChangeInputPhone, handleSubmit, handleClickUp }) => (
    <Section>
        <BgImg zIndex='1' background={window.screen.width <= 768 ? bannerStartSalesMovil : bannerStartSales} height={window.screen.width <= 768 ? '750px' : '980px'}>
            <FlexBox justify='flex-start'>
                <Content width='20%' />
                <Content height='55%'>
                    <Animation count='0.1' textAlign='center'>
                        <IconLogoLetter color={BGColor} height='155px' width='250px' style={{ margin: 'auto' }} />
                    </Animation>
                    <Animation count='0.3' display='true' margin='15px 0'>
                        <Text size={window.screen.width <= 768 ? '25px' : '60px'} family='PFont-Bold'>BIENVENIDOS</Text>
                    </Animation>
                    <Animation count='0.4' display='true'>
                        <Text size={window.screen.width <= 768 ? '12px' : '20px'} margin={window.screen.width <= 768 ? '0 20px' : '0 20px'}>Nosotros incrementaremos tus ventas.<br /> Tendrás un equipo de ventas externo especialista en comercio<br /> electrónico que trabaja a resultado.</Text>
                    </Animation>
                    <Card width={window.screen.width <= 768 ? '80%' : '60%'} radius='20px' height='440px' margin='5% auto'>
                        <Text size={window.screen.width <= 768 ? '12px' : '15px'} weight='bold'>COMUNÍCATE AHORA MISMO Y<br /> AUMENTA TUS VENTAS </Text>
                        <hr color={BGColor} width='96%' />
                        <Text size={window.screen.width <= 768 ? '12px' : '15px'} weight='bold'>LLÁMANOS <br /> + {state.u_phoNum} </Text>
                        <hr color={BGColor} width='96%' />
                        <Text align='start' margin='0 22px' size={window.screen.width <= 768 ? '12px' : '15px'} weight='bold'>ESCRÍBENOS </Text>
                        <InputTextArea minW='100%' minH='96px' maxH='96px' radius='12px' onChange={handleInput} name='uc_message' value={state.valuesForm?.uc_message} />
                        <hr color={BGColor} width='96%' />
                        <Text size={window.screen.width <= 768 ? '11px' : '13px'} weight='bold' margin='0px 0px 5px 0px'>DÉJANOS TU NÚMERO <br />Y CON GUSTO TE LLAMAREMOS </Text>
                        <InputPhone width='100%' radius='12px' title='' value={state.valuesForm.uc_phone} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='uc_phone' />
                        <FlexBox>
                            <ButtonSubmit type='button' padding='10px' bgColor={BGVColor} onClick={handleSubmit} width='200px'>ENVIAR</ButtonSubmit>
                        </FlexBox>
                    </Card>
                </Content>
            </FlexBox>
        </BgImg>
        <BgImg background={window.screen.width <= 768 ? bannerMediumSalesMovil : bannerMediumSales} height={window.screen.width <= 1100 ? '1790px' : '1080px'}>
            <Animation count='0.2'>
                <FlexBox direction='column'>
                    <Text size={window.screen.width <= 768 ? '15px' : '27px'} family='PFont-Bold' margin='50px 0 10px'>¿Qué es la Licencia WINBY?</Text>
                    <Text size={window.screen.width <= 768 ? '12px' : '20px'} margin=' 0 20px 20px'>Es la licencia de uso del software Winby, la única multiplataforma de comercio <br />electrónico que te entrega tu propia tienda virtual para que vendas los productos y<br /> servicios que desees; y de esta manera generes ingresos adicionales desde cualquier<br /> lugar en el que te encuentres.</Text>
                </FlexBox>
            </Animation>
            <AnimButton count='1'>
                <hr color={BGColor} width='60%' />
            </AnimButton>
            <FlexBox>
                <Card count='0.2' width={window.screen.width <= 768 ? '95%' : ''}>
                    <H2 color={BGColor} margin='10px 0 2px'>¿Qué hago para convertirme en un Aliado WINBY?</H2>
                    <Img width='90%' src={beAllie} height='250px' />
                    <hr color={BGColor} width='70%' />
                    <SpanInf>Solo debes dirigirte a www.winby.co/aliados-winby e inscribirte como aliado o llamar a nuestro departamento de alianzas, donde un asesor con gusto te atenderá.</SpanInf>
                </Card>
                <Card count='0.3' width={window.screen.width <= 768 ? '95%' : ''}>
                    <H2 color={BGColor} margin='10px 0 2px'>¿Cuánto debo pagar para ser Aliado Comercial WINBY?</H2>
                    <Img width='90%' src={pay} height='250px' />
                    <hr color={BGColor} width='70%' />
                    <SpanInf>Afiliarte a WINBY como aliado no tiene ningún costo, trabajaremos a resultado, solo pagarás cuando un producto/servicio se venda a través de nuestra plataforma. Para esto se pacta un porcentaje de comisión.</SpanInf>
                </Card>
                <Card count='0.4' width={window.screen.width <= 768 ? '95%' : ''}>
                    <H2 color={BGColor} margin='10px 0 2px'>¿Cómo subo mis Productos o Servicios a la Plataforma?</H2>
                    <Img width='90%' src={platform} height='250px' />
                    <hr color={BGColor} width='70%' />
                    <SpanInf>Al registrarte como Aliado Comercial WINBY, tienes derecho a una Oficina Virtual, desde donde puedes subir los productos/servicios que ofreces en tu empresa o negocio. Si tienes algún inconveniente con esto, cuentas con nuestro Soporte Técnico.</SpanInf>
                </Card>
            </FlexBox>
            <AnimButton count='1'>
                <FlexBox>
                    <ButtonSubmit type='button' margin='20px 0' padding='10px' bgColor={PColor} width='200px' onClick={handleClickUp}>ADQUIERE TU LICENCIA</ButtonSubmit>
                </FlexBox>
            </AnimButton>
        </BgImg>
        <BgImg background={window.screen.width <= 768 ? bannerEndSalesMovil : bannerEndSales} height={window.screen.width <= 768 ? '500px' : '600px'}>
            <Animation count='0.3'>
                <FlexBox direction='column'>
                    <H2 color={BGColor} margin={window.screen.width <= 768 ? '100px 0 0' : '100px 0 0 0'}>¿Producto / Servicio?</H2>
                    <Text color={BGColor} size={window.screen.width <= 768 ? '13px' : '19px'} margin='10px 20px'>Cuando un usuario compra en una de las tiendas virtuales, de nuestros Winbers y realiza su pago a WINBY, ésta se<br /> encarga de trasladarte a ti, como Aliado Comercial  el valor del producto/servicio  menos la comisión pactada.</Text>
                </FlexBox>
            </Animation>
            <AnimButton count='1'>
                <hr color={BGColor} width='40%' />
            </AnimButton>
            <Animation count='0.3'>
                <H2 color={BGColor} margin={window.screen.width <= 768 ? '30px 0 0' : '80px 0 0 0'}>WINBY SOLO SE GANA UNA COMISIÓN CUANDO LA VENTA SE HA REALIZADO.</H2>
            </Animation>
            <AnimButton count='1'>
                <FlexBox  direction='column'>
                <H2 size='20px' color={BGColor} sizwe>¡REALMENTE SENCILLO!</H2>
                    <ButtonSubmit type='button' margin='10px 0px' padding='10px' bgColor='black' width='200px' onClick={handleClickUp}>ADQUIERE TU LICENCIA</ButtonSubmit>
                </FlexBox>
            </AnimButton>
        </BgImg>
    </Section>
)

// Animacion
const Animation = styled.div`
    opacity: 0;
    transform: translate3d(0, 3000px, 0) scaleY(5);
    animation: ${animFadeInDown} 1s;
    animation-fill-mode: forwards;
    animation-delay: ${({ count }) => count}s;
    ${({ display }) => display && css`
        display: flex;
        justify-content: center;
        align-items: center;
    `}
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ textAlign }) => textAlign && css`text-align: ${textAlign};`}
`
const AnimButton = styled.div`
    opacity: 0;
    animation: ${fadeIn} 1s;
    animation-fill-mode: forwards;
    animation-delay: ${({ count }) => count}s;
`
// Fin de animación
const Section = styled.section`
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
`
const Content = styled.div`
    height: ${({ height }) => height ? height : 'auto'};
    ${({ width }) => width && css`width: ${width};`};
    @media(max-width: 1000px){
        width: 100%;
        height: auto;
        margin: 0 7% 0 6%;
    }
`
const Img = styled.img`
    display: flex;
    border-radius: 20px;
    height: ${({ height }) => height ? height : '0'};
    margin: ${({ margin }) => margin || 'auto'};
    ${({ width }) => width && css`width: ${width};`};
    `
const H2 = styled.h4`
    color: ${({ color }) => color ? color : `${BGVColor}`}; 
    ${({ size }) => size && css`font-size: ${size};`};
    ${({ margin }) => margin && css`margin: ${margin};`}
    text-align: ${({ align }) => align ? align : 'center'};
    font-family: ${({ family }) => family || 'PFont-Regular'};
`
const Text = styled.span`
    display: block;
    color: ${({ color }) => color ? color : `${BGColor}`};
    text-align: ${({ align }) => align ? align : 'center'};
    font-size: ${({ size }) => size ? size : '12px'};
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    font-family: ${({ family }) => family || 'PFont-Regular'};
`
const SpanInf = styled.span`
    font-family: PFont-Regular;
    font-size: 20px;
    display: flex;
    text-align:${({ align }) => align ? align : 'justify'};
    color: ${({ color }) => color ? color : `${BGColor}`};
    ${({ margin }) => margin && css`margin: ${margin};`}
    @media(max-width: 1600px) {
        font-size: 18px;
    }
    @media(max-width: 1200px) {
        font-size: 16px;
    }
    @media(max-width: 1000px) {
        font-size: 14px;
    }
    @media(max-width: 700px) {
        font-size: 12px;
    }
`
const Card = styled.section`
    padding: 15px;
    background-color: #ffffff33;
    box-shadow: 0 3px 10px 3px ${BGVColor}35;
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    width: ${({ width }) => width ? width : '410px'};
    height: ${({ height }) => height ? height : '600px'};
    margin: ${({ margin }) => margin ? margin : '5% 0% 1% 1%'};
    @media(max-width: 1100px) {
        height: auto; 
        margin-bottom: 20px;
        width: ${({ width }) => width ? width : '65%'};
    }
    opacity: 0;
    animation: ${animFirst} 1s;
    animation-fill-mode: forwards;
    animation-delay: ${({ count }) => count}s;
    transform: translate3d(0, 3000px, 0) scaleY(5);
`
const FlexBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ justify }) => justify || 'center'};
    flex-direction: ${({ direction }) => direction || 'row'};
    @media(max-width: 1100px){
        flex-direction: column;
    }
`