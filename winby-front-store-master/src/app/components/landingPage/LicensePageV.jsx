import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, BGVColor, PColor, SFColor } from '../../../assets/colors'
import bannerEndAllies from '../../../assets/img/bannerEndAllies.jpg'
import bannerEndAlliesMovil from '../../../assets/img/bannerEndAlliesMovil.jpg'
import bannerMediumAllies from '../../../assets/img/bannerMediumAllies.jpg'
import bannerMediumAlliesMovil from '../../../assets/img/bannerMediumAlliesMovil.jpg'
import storeAllies from '../../../assets/img/storeAllies.jpg'
import infoLicenseAllies from '../../../assets/img/infoLicenseAllies.jpg'
import alliesPeople from '../../../assets/img/alliesPeople.jpg'
import optionMarketingAllies from '../../../assets/img/optionMarketingAllies.jpg'
import bannerStartAllies from '../../../assets/img/bannerStartAllies.jpg'
import bannerStartAlliesMovil from '../../../assets/img/bannerStartAlliesMovil.jpg'
import { ButtonSubmit } from '../../common/Buttons'
import { InputTextArea } from '../../common/InputText'
import { animFirst, animFadeInDown, fadeIn } from '../../common/Animations'
import { InputPhone } from '../../common/inputs'
import { IconLogoLetter, IconLogoType } from '../../../assets/icons'

export default ({ state, handleInput, onChangeInputPhone, handleSubmit, handleClickUp }) => (
    <Section>
        <BgImg zIndex='1' background={window.screen.width <= 768 ? bannerStartAlliesMovil : bannerStartAllies}>
            <FlexBox justify='flex-start'>
                <Content width='20%' />
                <Content height='55%'>
                    <Animation count='0.1'>
                        <IconLogoType size='155px' color={BGColor} style={{ margin: window.screen.width <= 768 ? '0 100px' : '30px 0 0 0' }} />
                        <IconLogoLetter width='300px' height='155px' color={BGColor} style={{ margin: window.screen.width <= 768 ? '0 30px' : '30px 0 0 0' }} />
                    </Animation>
                    <Animation count='0.3' display='true' margin='1px 0'>
                        <Text color={BGColor} size='50px' weight='bold'>BIENVENIDOS</Text>
                    </Animation>
                    <Animation count='0.4' display='true'>
                        <Text color={BGColor} size={window.screen.width <= 768 ? '15px' : '20px'}>Adquirir una licencia del software WINBY es algo muy <br /> sencillo de hacer y definitivamente, al alcance de tu bolsillo</Text>
                    </Animation>
                    <Card width={window.screen.width <= 768 ? '90%' : '73%'} radius='20px' height='440px' margin='5% auto'>
                        <FlexBox>
                            <Text size={window.screen.width <= 768 ? '12px' : '15px'} weight='bold'>COMUNÍCATE AHORA MISMO Y <br />OBTÉN TU PROPIA TIENDA VIRTUAL </Text>
                        </FlexBox>
                        <hr color='#EB0000' width='96%' />
                        <FlexBox>
                            <Text size={window.screen.width <= 768 ? '12px' : '15px'} weight='bold'>LLÁMANOS <br />+ {state.u_phoNum} </Text>
                        </FlexBox>
                        <hr color='#EB0000' width='96%' />
                        <FlexBox>
                            <Text align='start' margin='0 22px' size={window.screen.width <= 768 ? '12px' : '15px'} weight='bold'>ESCRÍBENOS </Text>
                        </FlexBox>
                        <FlexBox>
                            <InputTextArea minW='100%' minH='96px' maxH='96px' radius='12px' onChange={handleInput} name='uc_message' value={state.valuesForm?.uc_message} />
                        </FlexBox>
                        <hr color='#EB0000' width='96%' />
                        <FlexBox>
                            <Text size={window.screen.width <= 768 ? '11px' : '13px'} weight='bold' margin='0px 0px 5px 0px'>DÉJANOS TU NÚMERO <br />Y CON GUSTO TE LLAMAREMOS </Text>
                        </FlexBox>
                        <FlexBox>
                            <InputPhone width='100%' radius='12px' value={state.valuesForm.uc_phone} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='uc_phone' />
                        </FlexBox>
                        <FlexBox>
                            <ButtonSubmit type='button' margintop='20px' padding='10px' bgColor={PColor} onClick={handleSubmit} width='200px'>ENVIAR</ButtonSubmit>
                        </FlexBox>
                    </Card>
                </Content>
            </FlexBox>
        </BgImg>
        <BgImg background={window.screen.width <= 768 ? bannerMediumAlliesMovil : bannerMediumAllies} height='auto'>
            <Animation count='0.2'>
                <FlexBox direction='column'>
                    <H2 margin='10px 0 2px'>¿Qué es la Licencia WINBY?</H2>
                    <Text size={window.screen.width <= 768 ? '14px' : '20px'} margin=' 0 0 20px 0px'>Es la licencia de uso del software Winby, la única multiplataforma de comercio <br />electrónico que te entrega tu propia tienda virtual para que vendas los productos y<br /> servicios que desees; y de esta manera generes ingresos adicionales desde cualquier<br /> lugar en el que te encuentres.</Text>
                </FlexBox>
            </Animation>
            <AnimButton count='1'>
                <hr color='#EB0000' width='70%' />
            </AnimButton>
            <Animation count='0.4'>
                <FlexBox direction='column'>
                    <H2 margin='10px 0 2px'>¿Qué obtengo cuando compro una LICENCIA WINBY?</H2>
                </FlexBox>
            </Animation>
            <FlexBox>
                <Card count='0.2'>
                    <Img width={window.screen.width <= 768 ? '200px' : '215px'} height={window.screen.width <= 768 ? '180px' : '215px'} src={storeAllies} />
                    <hr color='#EB0000' width='70%' />
                    <SpanInf>1. Obtienes la licencia de uso del software Winby, tu propia tienda WINBY, desde donde podrás comercializar tus propios productos o cualquiera de los productos o servicios que la empresa está ofertando y ganar excelentes comisiones de venta directa y espectaculares comisiones por venta en red. Así se verá tu tienda WINBY: www.winby.co/eduardo-real</SpanInf>
                </Card>
                <Card count='0.3'>
                    <Img width={window.screen.width <= 768 ? '200px' : '215px'} height={window.screen.width <= 768 ? '180px' : '215px'} src={infoLicenseAllies} />
                    <hr color='#EB0000' width='70%' />
                    <SpanInf>2. Tienes el Derecho a Vender Licencias WINBY, generando ingresos de venta directa. TE GANAS EL 20% del valor de venta de cada Licencia.</SpanInf>
                </Card>
                <Card count='0.4'>
                    <Img width={window.screen.width <= 768 ? '200px' : '215px'} height={window.screen.width <= 768 ? '180px' : '215px'} src={alliesPeople} />
                    <hr color='#EB0000' width='70%' />
                    <SpanInf>3. Puedes gestionar aliados comerciales que sirvan de proveedores de la Gran Bodega Winby. AQUÍ TE GANAS EL 7% de las utilidades que obtiene la empresa a través del proveedor que afilies.</SpanInf>
                </Card>
                <Card count='0.5'>
                    <Img width={window.screen.width <= 768 ? '200px' : '215px'} height={window.screen.width <= 768 ? '180px' : '215px'} src={optionMarketingAllies} />
                    <hr color='#EB0000' width='70%' />
                    <SpanInf>4. Adquieres el derecho para desarrollar la estrategia de marketing en red, con la que puedes obtener grandes ingresos residuales, a través de la acumulación de puntos en tu red.</SpanInf>
                </Card>
            </FlexBox>
            <AnimButton count='1'>
                <FlexBox>
                    <ButtonSubmit type='button' margin='20px 0' padding='10px' bgColor={PColor} width='200px' onClick={handleClickUp}>ADQUIERE TU LICENCIA</ButtonSubmit>
                </FlexBox>
            </AnimButton>
        </BgImg>
        <BgImg background={window.screen.width <= 768 ? bannerEndAlliesMovil : bannerEndAllies} height='450px'>
            <Animation count='0.3'>
                <FlexBox direction='column'>
                    <H2 color={BGColor} margin={window.screen.width <= 768 ? '120px 0 0' : '100px 0 0 0'}>¿Cuándo puedo cobrar mis utilidades?</H2>
                    <Text color={BGColor} size={window.screen.width <= 768 ? '13px' : '19px'} margin='10px 0px 20px'>Todas tus ganancias las podrás cobrar todos los viernes, siempre y cuando hayas <br /> acumulado 100 puntos de ventas como mínimo.</Text>
                </FlexBox>
            </Animation>
            <AnimButton count='1'>
                <FlexBox>
                    <ButtonSubmit type='button' margin='20px' padding='10px' bgColor='black' width='200px' onClick={handleClickUp}>ADQUIERE TU LICENCIA</ButtonSubmit>
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
    }
`
const Img = styled.img`
    display: flex;
    border-radius: 20px;
    height: ${({ height }) => height ? height : '0'};
    margin: ${({ margin }) => margin || 'auto'};
    ${({ width }) => width && css`width: ${width};`};
`
const H2 = styled.h2`
    color: ${({ color }) => color ? color : `${BGVColor}`};
    ${({ margin }) => margin && css`margin: ${margin};`}
    text-align: ${({ align }) => align ? align : 'center'};
`
const Text = styled.span`
    color: ${({ color }) => color ? color : `${BGVColor}`};
    text-align: ${({ align }) => align ? align : 'center'};
    font-size: ${({ size }) => size ? size : '12px'};
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ weight }) => weight && css`font-weight: ${weight};`}
`
const SpanInf = styled.span`
    font-size: 20px;
    text-align: ${({ align }) => align || 'left'};
    color: ${({ color }) => color ? color : `${SFColor}`};
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
    background-color: #ffffff75;
    box-shadow: 0 3px 10px 3px ${BGVColor}35;
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    width: ${({ width }) => width ? width : '310px'};
    height: ${({ height }) => height ? height : '600px'};
    margin: ${({ margin }) => margin ? margin : '5% 2% 1% 2%'};
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