import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, BGVColor, PColor, SFColor } from '../../../assets/colors'
import logo from '../../../assets/icons/logoWinby.svg'
import bannerStartWhatIs from '../../../assets/img/bannerStartWhatIs.jpg'
import bannerStartWhatIsMovil from '../../../assets/img/bannerStartWhatIsMovil.jpg'
import bannerMediumWhatIs from '../../../assets/img/bannerMediumWhatIs.jpg'
import bannerMediumWhatIsMovil from '../../../assets/img/bannerMediumWhatIsMovil.jpg'
import bannerEndWhatIs from '../../../assets/img/bannerEndWhatIs.jpg'
import bannerEndWhatIsMovil from '../../../assets/img/bannerEndWhatIsMovil.jpg'
import sellWhatIs from '../../../assets/img/sellWhatIs.jpg'
import socialWhatIs from '../../../assets/img/socialWhatIs.jpg'
import twentyPorcent from '../../../assets/img/twentyPorcent.jpg'
import redMlvWhatIs from '../../../assets/img/redMlvWhatIs.jpg'
import twentyPorcentWhite from '../../../assets/img/twentyPorcentWhite.jpg'
import premiteWhatIs from '../../../assets/icons/premiteWhatIs.svg'
import productsWhatIs from '../../../assets/icons/productsWhatIs.svg'
import storeWhatIs from '../../../assets/icons/storeWhatIs.svg'
import servicesWhatIs from '../../../assets/icons/servicesWhatIs.svg'
import incomeWhatIs from '../../../assets/icons/incomeWhatIs.svg'
import configWhatIs from '../../../assets/icons/configWhatIs.svg'
import backOfficeWhatIs from '../../../assets/icons/backOfficeWhatIs.svg'
import trainingWhatIs from '../../../assets/icons/trainingWhatIs.svg'
import { ButtonSubmit } from '../../common/Buttons'
import { InputTextArea } from '../../common/InputText'
import { animFirst, animFadeInDown, fadeIn } from '../../common/Animations'
import { InputPhone } from '../../common/inputs'

export default ({ state, handleInput, onChangeInputPhone, handleSubmit, handleClickUp }) => (
    <Section>
        <BgImg zIndex='1' background={window.screen.width <= 768 ? bannerStartWhatIsMovil : bannerStartWhatIs} height={window.screen.width <= 768 ? '760px' : '1180px'}>
            <FlexBox justify='center'>
                <Content>
                    <Animation count='0.1'>
                        <Img width='100%' src={logo} height={window.screen.width <= 768 ? '225px' : '425px'} margin={window.screen.width <= 768 ? '30px 0 0' : '30px 0 0'} />
                    </Animation>
                    <Animation count='0.3' display='true' margin='15px 0'>
                        <Text size={window.screen.width <= 768 ? '23px' : '85px'} family='PFont-Bold'>BIENVENIDOS</Text>
                    </Animation>
                    <Animation count='0.4' display='true'>
                        <Text size={window.screen.width <= 768 ? '12px' : '23px'}>Tenemos una oportunidad de negocios diseñada para ti, con la que puedes obtener{window.screen.width > 768 && <br />} ingresos financieros desde cualquier lugar donde te encuentres.</Text>
                    </Animation>
                    <Card width={window.screen.width <= 768 ? '95%' : '47%'} radius='20px' height={window.screen.width <= 768 ? '340px' : '330px'} margin='5% auto'>
                        <Text size={window.screen.width <= 768 ? '12px' : '12px'} align='left' family='PFont-Bold' margin='0 0 0 10px'>Llámanos + {state.u_phoNum}(Número del Miembro Oficial)</Text>
                        <br />
                        <Text size={window.screen.width <= 768 ? '11px' : '12px'} align='left' family='PFont-Bold' margin='0 0 0 10px'>Déjanos tu número y con gusto te llamamos</Text>
                        <FlexBox>
                            <InputPhone width='100%' radius='12px' title='' value={state.valuesForm.uc_phone} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='uc_phone' />
                        </FlexBox>
                        <Text align='left' size={window.screen.width <= 768 ? '12px' : '12px'} family='PFont-Bold' margin='0 0 5px 10px'>Escríbenos</Text>
                        <FlexBox>
                            <InputTextArea minW='100%' minH='96px' maxH='96px' bottom='2%' radius='12px' onChange={handleInput} name='uc_message' value={state.valuesForm?.uc_message} />
                        </FlexBox>
                        <FlexBox margin='10% 0 0'>
                            <ButtonSubmit type='button' fontSize='13px' margin='0' padding='8px' weight='bold' bgColor={BGColor} fontColor={BGVColor} onClick={handleSubmit} width='100px'>ENVIAR</ButtonSubmit>
                        </FlexBox>
                    </Card>
                </Content>
            </FlexBox>
        </BgImg>
        <BgImg background={window.screen.width <= 768 ? bannerMediumWhatIsMovil : bannerMediumWhatIs} height={window.screen.width <= 768 ? '2840px' : '2050px'}>
            <Animation count='0.2' margin={window.screen.width <= 768 && '0'}>
                <FlexBox>
                    <Card center width='100%' height='110px' background='#faf0f0ba' margin='0'>
                        <Text size={window.screen.width <= 768 ? '18px' : '25px'} family='PFont-Bold'>¿Qué es WINBY?</Text>
                    </Card>
                </FlexBox>
            </Animation>
            <Animation count='0.4'>
                <Card width={window.screen.width <= 768 ? '100%' : '30%'} height='auto' margin={window.screen.width <= 768 ? '2px auto 0' : '20px auto 0'} background='#faf0f0ba'>
                    <Text size={window.screen.width <= 768 ? '16px' : '23px'}>ES EL CENTRO COMERCIAL VIRTUAL MÁS  GRANDE DE LATINOAMERICA</Text>
                </Card>
            </Animation>
            <FlexBox wrap='wrap'>
                <Card count='0.2' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '390px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '169px'} height={window.screen.width <= 768 ? '40%' : '169px'} src={premiteWhatIs} />
                    <SpanInf>WINBY te da la oportunidad de tener TU PROPIA TIENDA VIRTUAL, con la que comenzarás a generar grandes ingresos para ti y tu familia.</SpanInf>
                </Card>
                <Card count='0.4' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '390px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '215px'} height={window.screen.width <= 768 ? '40%' : '169px'} src={productsWhatIs} />
                    <SpanInf>Productos: Canasta familiar, prendas de vestir, calzado, útiles escolares, muebles, tecnología, etc.</SpanInf>
                </Card>
                <Card count='0.6' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '470px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '169px'} height={window.screen.width <= 768 ? '40%' : '169px'} src={storeWhatIs} />
                    <SpanInf>Winby pone a tu disposición todos sus productos y servicios, para que en Tu Tienda Virtual los ofrezcas a tus familiares y amigos, a través de las redes sociales y otros medios digitales existentes.</SpanInf>
                </Card>
                <Card count='0.8' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '470px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '169px'} height={window.screen.width <= 768 ? '40%' : '169px'} src={servicesWhatIs} />
                    <SpanInf>Servicios: Médicos, profesores, tutores, educación Winby, Coach, etc.</SpanInf>
                </Card>
                <Card count='0.8' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '470px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '169px'} height={window.screen.width <= 768 ? '40%' : '169px'} src={premiteWhatIs} />
                    <SpanInf>En WINBY puedes formar tu propio  centro comercial virtual,<br/> a partir de la comercialización de licencias del software Winby.</SpanInf>
                </Card>

                <Card count='0.8' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '470px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '169px'} height={window.screen.width <= 768 ? '40%' : '169px'} src={productsWhatIs} />
                    <SpanInf>Los ingresos por ventas de todas la tiendas, dentro de tu centro comercial virtual, te generan muchos puntos que se convierten en ingresos adicionales para ti.</SpanInf>
                </Card>

            </FlexBox>
            <Animation count='0.4'>
                <Card width={window.screen.width <= 768 ? '100%' : '30%'} height='auto' margin='35px auto 0' background='#faf0f0ba'>
                    <Text align='center' size={window.screen.width <= 768 ? '16px' : '23px'}>ES UN SISTEMA DE LICENCIAS</Text>
                </Card>
            </Animation>
            <FlexBox wrap='wrap'>
                <Card count='0.3' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '430px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '215px'} height={window.screen.width <= 768 ? '40%' : '215px'} src={incomeWhatIs} />
                    <SpanInf>1. Para comenzar a generar ingresos con WINBY, solo debes adquirir una licencia del software, que te permitirá abrir tu propia tienda virtual.</SpanInf>
                </Card>
                <Card count='0.5' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '430px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '215px'} height={window.screen.width <= 768 ? '40%' : '215px'} src={configWhatIs} />
                    <SpanInf>2. Tu licencia te permite configurar y administrar Tu Tienda Virtual como tú quieras desde tu Back Office.</SpanInf>
                </Card>
                <Card count='0.7' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '430px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '215px'} height={window.screen.width <= 768 ? '40%' : '215px'} src={backOfficeWhatIs} />
                    <SpanInf>3. En tu Back Office contarás con Herramientas Digitales que te ayudarán a expandir tu negocio y hacer seguimiento a las ganancias que ha generado tu tienda.</SpanInf>
                </Card>
                <Card count='0.9' width={window.screen.width <= 768 ? '150px' : '310px'} height={window.screen.width <= 768 ? '430px' : '480px'}>
                    <Img width={window.screen.width <= 768 ? '100%' : '215px'} height={window.screen.width <= 768 ? '40%' : '215px'} src={trainingWhatIs} />
                    <SpanInf>4. También puedes acceder a las capacitaciones que WINBY ha preparado para promover tu crecimiento personal y financiero.</SpanInf>
                </Card>
            </FlexBox>
            <Animation count='0.4'>
            </Animation>
            <AnimButton count='1'>
                <FlexBox>
                    <ButtonSubmit type='button' padding='8px' bgColor={PColor} width='200px' onClick={handleClickUp}>COMIENZA AHORA</ButtonSubmit>
                </FlexBox>
            </AnimButton>
        </BgImg>
        <BgImg background={window.screen.width <= 768 ? bannerEndWhatIsMovil : bannerEndWhatIs} height={window.screen.width <= 768 ? '1900px' : '2000px'}>
            <Animation count='0.3' margin={window.screen.width <= 768 && '0'}>
                <FlexBox direction='column'>
                    <Text size={window.screen.width <= 768 ? '19px' : '23px'} margin={window.screen.width <= 768 ? '20px 0 0' : '100px 0 0'} family='PFont-Bold'>¿COMO GENERAR INGRESOS?</Text>
                    <Text size={window.screen.width <= 768 ? '19px' : '23px'} margin='10px 0 20px'>MARKETING DIGITAL<br />VENTAS DIRECTAS</Text>
                </FlexBox>
            </Animation>
            <FlexBox direction={window.screen.width <= 1024 ? 'column' : 'row'} margin={window.screen.width <= 768 ? '' : '10px 0 0 78px'}>
                <FlexBox direction='column'>
                    <Card count='0.3' width={window.screen.width <= 768 ? '100%' : '690px'} height={window.screen.width <= 768 ? '180px' : '220px'} margin={window.screen.width <= 768 ? '0 auto' : '0 100px 10px 0'}>
                        <Img width={window.screen.width <= 768 ? '100%' : '660px'} src={sellWhatIs} height={window.screen.width <= 768 ? '150px' : '190px'} />
                    </Card>
                    <SpanInf margin={window.screen.width <= 768 ? '0 50px 20px' : '0 100px 0 0'}>1. Ganando comisiones de Venta Directa, con las personas<br /> interesadas en los productos y servicios que ofrecerás en las redes<br /> sociales y otros medios digitales.</SpanInf>
                </FlexBox>
                <FlexBox direction='column'>
                    <Card count='0.5' width={window.screen.width <= 768 ? '100%' : '690px'} height={window.screen.width <= 768 ? '180px' : '220px'} margin={window.screen.width <= 768 ? '0 auto' : '0 100px 10px 0'}>
                        <Img width={window.screen.width <= 768 ? '100%' : '660px'} src={socialWhatIs} height={window.screen.width <= 768 ? '150px' : '190px'} />
                    </Card>
                    <SpanInf margin={window.screen.width <= 768 ? '0 50px' : '0 100px 0 0'}>2. Compartiendo los productos y servicios de tu tienda en las redes<br /> sociales, aumentas las posibilidades de ventas.<br /><br /></SpanInf>
                </FlexBox>
            </FlexBox>
            <Animation count='0.3'>
                <Text size={window.screen.width <= 768 ? '20px' : '23px'} margin='10px 0 0'>VENTA DE LICENCIAS</Text>
            </Animation>
            <FlexBox direction={window.screen.width <= 1024 ? 'column' : 'row'} margin={window.screen.width <= 768 ? '' : '10px 0 0 80px'}>
                <FlexBox direction='column'>
                    <Card count='0.3' width={window.screen.width <= 768 ? '100%' : '690px'} height={window.screen.width <= 768 ? '150px' : '220px'} margin={window.screen.width <= 768 ? '0 auto' : '0 100px 10px 0'}>
                        <Img width={window.screen.width <= 768 ? '100%' : '660px'} src={twentyPorcent} height={window.screen.width <= 768 ? '120px' : '190px'} />
                    </Card>
                    <SpanInf margin={window.screen.width <= 768 ? '0 50px 20px' : '0 100px 0 0'}>1. Te ganas el 20% de cada licencia del <br />software Winby que vendas.</SpanInf>
                </FlexBox>
                <FlexBox direction='column'>
                    <Card count='0.5' width={window.screen.width <= 768 ? '100%' : '690px'} height={window.screen.width <= 768 ? '150px' : '220px'} margin={window.screen.width <= 768 ? '0 auto' : '0 100px 10px 0'}>
                        <Img width={window.screen.width <= 768 ? '100%' : '660px'} src={twentyPorcentWhite} height={window.screen.width <= 768 ? '120px' : '190px'} />
                    </Card>
                    <SpanInf margin={window.screen.width <= 768 ? '0 50px' : '0 100px 0 0'}>2. Te sigues ganando el 20% de las licencias que vendiste, siempre y<br /> cuando el franquiciado mantenga su tienda abierta al público.</SpanInf>
                </FlexBox>
            </FlexBox>
            <FlexBox>
                <Card count='0.5' width='100%' height={window.screen.width <= 768 ? 'auto' : '510px'}>
                    <Img width='100%' src={redMlvWhatIs} height={window.screen.width <= 768 ? 'auto' : '480px'} margin='0 auto' />
                </Card>
            </FlexBox>
            <AnimButton count='1'>
                <FlexBox>
                    <ButtonSubmit type='button' margin='20px' padding='10px' bgColor={PColor} width='200px' onClick={handleClickUp}>COMIENZA AHORA</ButtonSubmit>
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
    ${({ margin }) => margin && css`margin: ${margin};`}
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
    ${({ zIndex }) => zIndex && css`z-index: ${zIndex};`};
    ${({ height }) => height && css`height: ${height};`};
    background-image: ${({ background }) => `url(${background})`};
    background-size: cover;
    background-repeat: no-repeat;
    @media(max-width: 1500px){
    height: auto;
    }
    
`
const Content = styled.div`
    @media(max-width: 1000px){
        width: 100%;
        height: auto;
        margin: 0 7% 0 6%;
    }
`
const Img = styled.img`
    display: flex;
    height: ${({ height }) => height ? height : '0'};
    margin: ${({ margin }) => margin || 'auto'};
    ${({ width }) => width && css`width: ${width};`};
`
const Text = styled.span`
    color: ${({ color }) => color ? color : `${BGVColor}`};
    text-align: ${({ align }) => align ? align : 'center'};
    font-size: ${({ size }) => size ? size : '12px'};
    display: block;
    ${({ margin }) => margin && css`margin: ${margin};`}
    font-family: ${({ family }) => family || 'PFont-Regular'};
`
const SpanInf = styled.span`
    font-family: PFont-Regular;
    font-size: ${({ size }) => size || '17px'};
    text-align: ${({ align }) => align || 'center'};
    color: ${({ color }) => color ? color : `${SFColor}`};
    ${({ margin }) => margin && css`margin: ${margin};`}
    @media(max-width: 768px) {
        font-size: 13px;
    }
`
const Card = styled.section`
    padding: 15px;
    box-shadow: ${({ shadow }) => shadow ? shadow : `0 3px 10px 3px ${BGVColor}35`};
    background-color: ${({ background }) => background ? background : ' #ffffff75'};
    width: ${({ width }) => width ? width : '310px'};
    height: ${({ height }) => height ? height : '480px'};
    margin: ${({ margin }) => margin ? margin : '5% 2% 1% 2%'};
    ${({ center }) => center && css`
        display: flex;
        justify-content: center;
        align-self: center;
        align-items: center;
    `}
    @media(max-width: 1100px) {
        height: auto; 
        margin-bottom: 20px;
        width: ${({ width }) => width ? width : '70%'};
        height: ${({ height }) => height ? height : '390px'};
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
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ wrap }) => wrap && css`flex-wrap: ${wrap};`}
    justify-content: ${({ justify }) => justify || 'center'};
    flex-direction: ${({ direction }) => direction || 'row'};
    @media(max-width: 1500px){
        ${({ display }) => display && css`display: ${display};`};
    }  
`