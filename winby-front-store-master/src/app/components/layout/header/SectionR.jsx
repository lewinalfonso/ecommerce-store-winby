import React, { useState } from 'react'
import Loading from '../../../common/Loading'
import { To, CustomButton } from '../../../common/Buttons'
import { IconShoppingCart, IconBell, IconWallet, IconDots, IconUser, IconSearchMovil, IconArrowBottom } from '../../../../assets/icons'
import { BGColor, PColor, BGVColor, SFColor, PLColor } from '../../../../assets/colors'
import { Flex, Row, ShoppingCount } from './Styled'
import styled, { css } from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { dateFormat } from '../../../utils'
import { Link } from 'react-router-dom'

export default ({ state, handleTooltip, handleTooltipOptions, handleTooltipStore, handleDelete, closeSession, handleMenuModal, handleNotifications }) => {
    const [isModal, setIsModal] = useState(false)

    const openingModal = e => {
        e.preventDefault()
        e.stopPropagation()

        setIsModal(!isModal)
    }

    return (<>
        <Row direction='column'>
            <Flex responsiveMovil maxWidth='inherit' justify='flex-end' direction='row'>
                <BoxCircle responsive>
                    <To to='/billetera' width='auto' height='25px'>
                        <IconWallet size='25px' color={PColor} />
                    </To>

                </BoxCircle>
                <Tooltip>

                    {!!state.totalNoti && <BoxCircle display={window.screen.width <= 768 ? 'none' : 'flex'} zIndex='11' background={state.visible ? BGColor : PColor} width='12px' height='12px' margin='0 0  0 15px' position='absolute'><Text margin='5px 15px' color={state.visible ? PColor : BGColor} weight='bold' size='10px'>{state.totalNoti}</Text> </BoxCircle>}
                    <BoxCircle responsive background={state.visible ? PLColor : ''}>
                        <CustomButton bgColor='transparent' padding='0px' onClick={handleTooltip}> <IconBell size='25px' color={PColor} /></CustomButton>
                        <Tooltiptext activeStart={state.visible} width='300px' rightR={window.screen.width > 800 ? '46%' : '22%'} pcolor='#ccc' left={window.screen.width > 800 ? '-135px' : '-220px'} borderColor='transparent transparent #DFDFDF transparent'>
                            <Scrollbars style={{ flex: 1 }} autoHeight autoHeightMax="100%" autoHeightMin="100%" autoHide>
                                <Text weight='bold' margin='0 7px'>Notificaciones</Text>
                                <NotificationOptions>
                                    <button onClick={e => handleNotifications(e, 1)}>Compras</button>
                                    <button onClick={e => handleNotifications(e, 2)}>Licencia</button>
                                    <button onClick={e => handleNotifications(e, 3)}>Otros</button>
                                </NotificationOptions>
                                <Flex maxWidth='300px'>
                                    <Flex maxWidth='275px' >
                                        <hr width='98%' />
                                        {!!state.loading && <Loading />}
                                        {state.notifications?.length ? state.notifications.map(x => (
                                            <Box key={`noti_${x.un_id}`} direction='row' maxWidth='275px' hover>
                                                <Text><Text weight='500'>{x.un_title}:</Text> {x.un_message} <Text display='block' weight='400'>{dateFormat(x.un_datCre)}</Text></Text>
                                                <Tooltip onClick={() => handleTooltipOptions(x.un_id)}>
                                                    <IconBox margin='0 0 10px 5px'><IconDots size='20px' /></IconBox>
                                                    <Tooltiptext activeStart={state.options.find(y => y === x.un_id)} pcolor='#999' width='110px' right='30px' top='0' bRadius='0'>
                                                        <Box>
                                                            <To hover='true' color={BGColor} weight='300' align='center' to={{ pathname: `/compra/detalles/${x.i_id}` }}>Ver</To>
                                                        </Box>
                                                        <Box>
                                                            <CustomButton onClick={() => handleDelete(x.un_id)} width='100%' bgColor='transparent'>
                                                                <Text hover color={BGColor} align='center'>Eliminar</Text>
                                                            </CustomButton>
                                                        </Box>
                                                    </Tooltiptext>
                                                </Tooltip>
                                            </Box>
                                        ))
                                            :
                                            <Box maxWidth='100%'>
                                                <Text align='center' margin='20px'>No tiene notificaciones pendientes </Text>
                                            </Box>
                                        }

                                        <hr width='100%' color={BGColor} />
                                    </Flex>
                                </Flex>
                            </Scrollbars>
                        </Tooltiptext>
                    </BoxCircle>
                </Tooltip>
                <BoxCircle onClick={() => handleMenuModal(3)} margin='0px 5px' responsiveMovil >
                    <IconSearchMovil size={window.screen.width <= 1024 ? '20px' : '25px'} color={PColor} />
                </BoxCircle>
                <BoxCircle margin='0px 5px' responsiveMovil display={window.screen.width <= 800 ? 'none' : 'flex'} >
                    <To to='/user/login' position='relative'>
                        <IconUser size={window.screen.width <= 1024 ? '20px' : '25px'} color={PColor} />
                    </To>
                </BoxCircle>

                <ContainerCarShop>
                    <BoxCircle style={{ float: 'left' }} float='right' position='relative' margin='0px 15px 0 5px'>
                        <To to='/carrito' position='relative'>
                            <ShoppingCount>{state.countShoppingCart}</ShoppingCount>
                            <IconShoppingCart size={window.screen.width <= 1024 ? '20px' : '25px'} color={PColor} />
                        </To>
                    </BoxCircle>
                    <Tooltip onClick={handleTooltipStore}>

                        <BoxCircle float='left' position='relative' background={PColor} margin={window.screen.width <= 800 ? '0 10px' : 'auto'}>
                            <TextW color={state.store ? '#fff' : BGColor} weight='bold' margin='auto 10px'>{(state.code || 'W').substr(0, 1)}</TextW>
                        </BoxCircle>

                        <Tooltiptext onClick={(e) => e.stopPropagation()} top='125%' right='10%' activeStart={state.store}>
                            <Text color='#0e0d0d' align='center' display='block'>{state.code || 'Winby'}</Text>
                            <To to={`/store/${state.code || 'Winby'}`}><Text color={PColor} align='center' weight='600'>Ir a la tienda</Text></To>
                        </Tooltiptext>
                    </Tooltip>
                </ContainerCarShop>

            </Flex>

            <Flex margin='0px 0px 15px 0px' responsive justify='space-around' maxWidth='auto' direction='row'>
                {!state.login
                    ? <>
                        <Enlace to='/user/registro' effect='true' color={BGVColor}>Registrate</Enlace>
                        <Enlace to='/user/login' effect='true' color={BGVColor}>Ingresa</Enlace>
                    </> : <>
                        <ContainerUser onClick={e => openingModal(e)} >
                            <IconUser size='20px' color={PColor} />
                            <Span> {state.dataProfile.up_name} {state.dataProfile.up_last} </Span>
                            <IconArrowBottom size='10px' color=' rgba(0,0,0,.3)' style={{ position: 'absolute', right: '-11px' }} />
                            <ContainerUserOption active={isModal ? 'block' : 'none'} >
                                <ContentUser flexDirection='row'>
                                    <LogoUser>
                                        <IconUser size='50px' />
                                    </LogoUser>
                                    <WelcomeUser>
                                        <Text size='16px' >Hola, {state.dataProfile.up_name} {state.dataProfile.up_last} </Text>
                                        <Text size='20px' weight='700'>Bienvenido</Text>
                                    </WelcomeUser>
                                </ContentUser>
                                {/*     <ContentUser>
                                    <Enlace animation='true' to='/billetera' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' weight='bold'>Billetera</Enlace>
                                    <Enlace animation='true' to='/notificaciones' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' weight='bold'>Notificaciones</Enlace>
                                    <Enlace animation='true' to='/billetera' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' weight='bold'>Mis compras</Enlace>
                                    </ContentUser>
                                    <ContentUser>
                                    <Enlace animation='true' to='/billetera' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' weight='bold'>Editar perfil</Enlace>
                                    <Enlace animation='true' to='/notificaciones' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' weight='bold'>Seguridad</Enlace>
                                </ContentUser> */}
                                <ContentUser>
                                    <Enlace animation='true' to='/#' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' onClick={closeSession} weight='bold'>Salir</Enlace>
                                </ContentUser>
                            </ContainerUserOption>
                        </ContainerUser >
                    </>
                }
                <Enlace to='/billetera' effect='true' color={BGVColor} width='auto' padding='5px' fontSize='20px' weight='bold'>Mis compras</Enlace>
            </Flex>
            <CloseUserContainer active={isModal ? 'block' : 'none'} onClick={e => openingModal(e)} />
        </Row></>
    )
}
export const CloseUserContainer = styled.div`
    position: absolute;
    ${({ active }) => active && css`display: ${active};`};
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -99999;
    background-color: transparent;
`
export const Enlace = styled(Link)`
    user-select: none;
    padding: ${({ padding }) => padding ? padding : '0'};
    display: inline-block;
    text-align: ${({ aling }) => aling ? aling : 'left'};
    font-size: 14px;
    text-decoration: none;
    font-family: PFont-Regular;
    width: auto;
    transition: .2s linear;
    color: ${BGVColor}cc;
    @media(min-width: 1024px){
        font-size: 13px;
    }
    &:hover{
        color: ${BGVColor};
    }
    &:active{
        color: ${BGVColor};
    }
    ${({ animation }) => animation && css`
        &:hover{
            padding-left: 20px; 
        }
    `};
`
const ContainerUserOption = styled.div`
    position: absolute;
    background-color: #eeeeee;
    color: ${BGVColor};
    height: auto;
    top: 36px;
    width: 237px;
    right: -33px;
    z-index: 9999999;
    ${({ active }) => active && css`display: ${active};`};
    z-index: -9999;
    padding: 0px 3px;
        &::after {
        content: "";
        position: absolute;
        top: -20px;
        left: 208px;
        margin-left: -7px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #eeeeee transparent;         
    }
  
`
export const ContainerCarShop = styled.div`
display: flex;

@media(max-width: 768px){
    flex-direction: row-reverse;
    }
`

export const LogoUser = styled.div`
    border-radius: 50%;
    height: 80px;
    width: 80px;
    min-width: 80px;
    display: flex;
    background-color:#9e9e9e;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`
export const ContentUser = styled.div`
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection ? flexDirection : 'column'}; 
    padding: 10px;
    border-bottom: 1px solid ${BGVColor}4d;
    &:last-child{
        border-bottom: none;
    }
`

export const ContainerUser = styled.div`
    position: relative;
    border: none;
    outline: 0;
    color: ${BGVColor};
    display: flex;
    background-color: transparent;
    text-align: center;
    align-items: center;
    cursor: pointer;
    &:hover ${ContainerUserOption}{
        z-index: -9999;

    }
`
export const WelcomeUser = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
`
const Span = styled.span`
    user-select: none;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100px;
    font-size: 13px;
    padding: 0px 3px;
    color: ${BGVColor}cc;
    font-family: PFont-Regular;
    @media only screen and (max-width: 800px){

        display:none;
    }
    &:hover{
        color: ${BGVColor};
    }
    &:active{
        color: ${BGVColor};
    }
`
const Tooltiptext = styled.div`
    visibility: ${({ activeStart }) => activeStart ? 'visible' : 'hidden'};
    width: ${({ width }) => width ? width : '120px'};
    background-color: ${({ pcolor }) => pcolor ? pcolor : '#ccc'};
    text-align: center;
    border-radius: ${({ bRadius }) => bRadius ? bRadius : '6px'};
    position: absolute;
    z-index: 100;
    top: ${({ top }) => top ? top : '100%'};
    right: ${({ right }) => right ? right : '5%'};
    left: ${({ left }) => left};
    padding: 3px;
    font-size: 13px;
    &:after {
        content: "";
        position: absolute;
        background: #999;
        width: 10px;
        height: 10px;
        top: 8px;
        right: -5px;
        transform: rotateZ(41deg);
    }
`
const Tooltip = styled.div`
    position: relative;
    margin: ${({ margin }) => margin};
     &:hover  {
        visibility: visible;
    } 
`
const BoxCircle = styled.div`
    width: ${({ width }) => width ? width : '28px'};
    height: ${({ height }) => height ? height : '28px'};
	border-radius: 50%;
    margin: ${({ margin }) => margin ? margin : '12px'};
    background:${({ background }) => background ? background : 'transparent'};
    display: ${({ display }) => display ? display : 'flex'};
	justify-content: center;
	align-items: center;
	text-align: center;
    ${({ zIndex }) => !!zIndex && css`z-index: ${zIndex};`};
    ${({ position }) => !!position && css`position: ${position};`}
    @media(max-width: 768px){
        width: 28px;
    }
    ${({ responsive }) => !!responsive && css`
    @media(max-width: 768px){
        display: none;
    }
    @media(min-width: 768px){
        margin-left: 10px;
        
    }
    `};
    ${({ responsiveMovil }) => !!responsiveMovil && css`
    @media(min-width: 768px){
        display: none;
    }
    `};
    /* padding:3%; */
`
const Text = styled.span`
    width: 100%;
    color: ${({ color }) => color ? color : SFColor};
    font-weight: ${({ weight }) => weight ? weight : '300'};
    ${({ display }) => !!display && css`display: ${display};`};
    text-align:  ${({ align }) => align ? align : 'left'};
    ${({ margin }) => !!margin && css`margin: ${margin};`};
    font-size:  ${({ size }) => size ? size : '13px'};
    ${({ hover }) => !!hover && css`
    &:hover {
        color: black;
        }
    ` };
`
const IconBox = styled.div`
  margin: ${({ margin }) => margin};
`
export const Box = styled.div`
    background-color: transparent ;   
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${({ direction }) => direction || 'column'};
    max-width: ${({ maxWidth }) => maxWidth ? maxWidth : '130px'};
    margin: auto;
    @media (min-width: 768px){
        cursor: pointer;
        ${({ marginTop }) => !!marginTop && css`margin-top: ${marginTop};`}
    }
    ${({ hiddenBox }) => !!hiddenBox && css`
        display: none;
        @media(min-width: 768px){
            display: flex;
        }
    ` }
    &:hover{
        background-color: #DFDFDF;
    }
`
const TextW = styled.span`
    width: 100%;
    color: ${({ color }) => color ? color : PColor};
    font-weight: bold;
    display: block;
    margin: ' 0 auto';
    padding: 5px;
    font-size: 13px;
`
const NotificationOptions = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-top: 1px solid ${PLColor};
    
    & > button {
        background: none;
        border: none;
        cursor: pointer;
        flex: .3;
        padding: 5px;
        border-right: 1px solid ${PLColor};
        color: ${SFColor};
        font-family: PFont-Bold;
    }
    & > button:hover {
        background-color: ${BGColor}55;
    }
    & > button:last-child {
        border-right: none;
    }
`