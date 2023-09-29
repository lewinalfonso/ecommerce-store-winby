import React, { useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { PColor, PLColor, BGColor, BGVColor, BGSColor } from '../../../assets/colors'
import Scrollbars from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'
import { IconBell, IconUser, IconWallet, IconLogout } from '../../../assets/icons'
import startMenuRed from '../../../assets/icons/startMenuRed.svg'
import category from '../../../assets/icons/category.svg'
import offers from '../../../assets/icons/offers.svg'
import allie from '../../../assets/icons/allie.svg'
import popular from '../../../assets/icons/popular.svg'
import help from '../../../assets/icons/help.svg'
import school from '../../../assets/icons/school.svg'
import virtualoffice from '../../../assets/icons/virtualOffice.svg'
import { ButtonHook } from '../../common/ButtonRipple'
export default ({ active, state, onCloseMenu, closeSession }) => {

    const [year, setYear] = useState(false)

    useEffect(() => {
        const fecha = new Date()
        setYear(fecha.getFullYear())
    }, [])
    return (
        <>
            <Menu active={active}>
                <Scrollbars autoHide style={{ flex: 2 }} autoHeight autoHeightMax='100%' autoHeightMin={0}>
                    <Options>
                        <ContainerUser>
                            <Row>
                                <ContainerIconUser>
                                    <IconUser size='45px' color='#777' />
                                </ContainerIconUser>
                                <Container>
                                    {state.login ? <>
                                        <Text size='12px'> Hola {state.dataProfile.up_name} {state.dataProfile.up_last} </Text>
                                        <Text size='16px' bold='bold'> Bienvenido </Text>
                                    </> :
                                        <>
                                            <Text size='16px' bold='bold'> Bienvenido</Text>
                                            <Text size='11px'> Ingresa en tu cuenta para ver tus compras, favoritos, etc.</Text>
                                        </>
                                    }
                                </Container>
                            </Row>
                            <Box justify='center' margin='5px 0'>
                                {!state.login ? <>
                                    <ButtonHook Ripple margin='0px 5px' lineheight='1' padding='12px 0px' textAlign='center' radius='4px' shadow='0 0 0 0 #fff' width='140px' color={BGColor} onClick={onCloseMenu}><Enlace aling='center' to='/user/login' color={BGColor}>&nbsp;&nbsp;&nbsp;Ingresa</Enlace></ButtonHook>
                                    <ButtonHook Reppli border={`1px solid ${PColor}`} bgColor='transparent' lineheight='1' padding='12px 0px' textAlign='center' radius='4px' shadow='0 0 0 0 #fff' width='140px' color={PColor} onClick={onCloseMenu}><Enlace aling='center' to='/user/registro' color={PColor}>Regístrate</Enlace></ButtonHook>
                                </> : <><Enlace aling='center' to='/billetera' color={BGColor}><ButtonHook margin='0px 5px' align='center' display='flex' Reppli border={`1px solid ${PColor}`} bgColor={PColor} lineheight='1' padding='10px 3px' textAlign='center' radius='4px' shadow='0 0 0 0 #fff' width='140px' color={PColor} onClick={onCloseMenu} ><IconWallet size='25px' color={BGColor} />&nbsp;&nbsp;&nbsp;Billetera</ButtonHook></Enlace>
                                    <ButtonHook display='flex' onClick={onCloseMenu} Reppli border={`1px solid ${PColor}`} bgColor='transparent' lineheight='1' padding='10px 3px' alignItems='center' radius='4px' shadow='0 0 0 0 #fff' width='140px' color={PColor} ><IconBell size='25px' color={PColor} /><Enlace aling='center' to='/'>Notificaciones</Enlace></ButtonHook>


                                </>}
                            </Box>
                        </ContainerUser>
                        <List>
                            <Enlace to='/'><Li onClick={onCloseMenu}> <Img src={startMenuRed} /> Inicio</Li></Enlace>
                            {/* <Li onClick={onCloseMenu}><Enlace to='/'><Img src={startMenuRed} />Inicio</Enlace></Li> */}
                            <Enlace to='/categorias'><Li onClick={onCloseMenu}> <Img src={category} /> Categorías</Li></Enlace>
                            {/* <Li onClick={onCloseMenu}><Enlace to='/categorias'><Img src={category} />Categorías</Enlace></Li> */}
                            <Enlace to='/ofertas'><Li onClick={onCloseMenu}> <Img src={offers} /> Ofertas</Li></Enlace>
                            {/* <Li onClick={onCloseMenu}><Enlace to='/ofertas'><Img src={offers} />Ofertas</Enlace></Li> */}
                            {/* <Li onClick={onCloseMenu}><Enlace to='/billetera'>Ver mi billetera</Enlace></Li> */}
                            {(!!localStorage.getItem('infProfile') &&
                                localStorage.getItem('infProfile') !== 'undefined') &&
                                (new Date(JSON.parse(localStorage.getItem('infProfile'))?.usermember?.um_datExp) >= new Date()) &&
                                // <Li>
                                //     <A href='https://app.winby.co/'>
                                //         <Img src={virtualoffice} />Oficina Virtual
                                // </A>
                                // </Li>
                                <A href='https://app.winby.co/'><Li display='contents' ad> <Img src={virtualoffice} /> Oficina Virtual</Li></A>}
                            {(!!localStorage.getItem('infProfile') && localStorage.getItem('infProfile') !== 'undefined') &&
                                JSON.parse(localStorage.getItem('infProfile') || '{}')?.vendor ?
                                // <Li display='contents' ad>
                                //     <A padding='2px 10px' href='https://app.winby.co/'>
                                //         <Img src={allie} /> Aliados
                                // </A>
                                // </Li> :
                                <A href='https://app.winby.co/'><Li display='contents' ad> <Img src={allie} /> Aliados</Li></A> :

                                <Enlace to={{ state: { urlCode: 1 }, pathname: '/usuario/cuenta' }} effect='true' width='auto' padding='10px 8px 0 0px'><Li onClick={onCloseMenu}> <Img src={allie} /> Aliados Comerciales</Li></Enlace>
                            }
                            <Enlace to='/populares'><Li onClick={onCloseMenu}> <Img src={popular} /> Populares</Li></Enlace>
                            {/* <Li onClick={onCloseMenu}><Enlace to='/populares'><Img src={popular} />Populares</Enlace></Li> */}
                            <A href='https://escuela.winby.co/login/index.php' target='_blank'><Li > <Img src={school} /> Escuela</Li></A>
                            {/* <Li><A href='https://escuela.winby.co/login/index.php' target='_blank'><Img src={school} />Escuela</A></Li> */}
                            {/* <Li onClick={onCloseMenu}><Enlace to='/editar/perfil'><Img src={editUser} />Editar perfil</Enlace></Li> */}
                            <Enlace to='/ayuda/pqr'><Li onClick={onCloseMenu}> <Img src={help} /> Ayuda / PQR</Li></Enlace>
                            {/* <Li onClick={onCloseMenu}><Enlace to='/ayuda/pqr'><Img src={help} />Ayuda / PQR</Enlace></Li> */}
                            {state.login && <Li onClick={onCloseMenu}><Enlace onClick={closeSession} to=''><IconBox><IconLogout size='20px' color='#2A2A2A' /></IconBox>Cerrar la Sesión</Enlace></Li>}
                        </List>
                    </Options>

                    <Box display='flex' a position='relative' align='flex-end' justify='center' margin='20px 0' >
                        <Text bgColor={BGColor} zIndex='9' size='9pt' >© {!!year && year} Todos los derechos reservados, Winby®</Text>
                    </Box>

                </Scrollbars>
            </Menu>
        </>
    )
}
/** Animaciones */
const SlideRight = keyframes`
    from {left: -100%;}
    to {left: 0;}
`
const SlideLeft = keyframes`
    from {left: 0%;}
    to {left: ineriht;}
`
const IconBox = styled.div`
    margin: 0 10px 0 10px;
    display: inline-block;
`
const A = styled.a`
    padding: ${({ padding }) => padding ? padding : '2px'};
    color:${BGVColor};
    display: inline-block;
    text-decoration: none;
    width: 100%;
    font-size: 12px;
    width: 100%;
    font-family: PFont-Regular;

    @media (min-width: 1024px){
        font-size: 13px;
    }
`
const Menu = styled.aside`
    position: fixed;
    left: -100%;
    width: 100%;
    height: calc(100vh - 50px);
    top: 50px;
    z-index: 9999;
    background-color:${BGColor};
    display: flex;
    flex-direction: column;
    animation: ${({ active }) => active ? SlideRight : (active === false && SlideLeft)} .2s linear;
    animation-fill-mode: forwards;
    ${({ active }) => {
        if (window.screen.width <= 768) {
            if (active) document.body.style.overflow = 'hidden'
            else document.body.style.overflow = 'auto'
        }
    }}
`
const Options = styled.div`
    overflow: hidden;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const List = styled.ul`
    list-style-type: none;

    @media(max-width: 1400px){
        padding: 0px;
        margin: 0;
    }
`
const Li = styled.li`
    padding: 10px;
    cursor: pointer;
    text-decoration:none;
    transition: .4s;
    width: 100%;
    height: 43px;
    border-bottom: 1px solid ${PLColor};
    ${({ display }) => display && css`display: ${display};`};

    background-color: ${({ bgColor }) => bgColor ? bgColor : BGColor};

       &:hover {
        padding-left: 30px;
    }
    @media(max-width: 1400px){
        font-size: 14px;
        display: flex;
        align-items: center;   
        padding: 25px 0px;
    };
    ${({ btnLogin }) => !!btnLogin && css`
    border: 1px solid ${PColor};`}
`
const Enlace = styled(Link)`
    padding: 2px;
    display: contents;
    font-family: ${({ Family }) => Family ? Family : 'PFont-Regular'};
    text-align: ${({ aling }) => aling ? aling : 'left'};
    text-decoration: none;
    color: ${({ color }) => color ? color : `${BGVColor}`};
    font-size: 14px;
    width: 100%;

`
const Box = styled.div`
    flex: ${({ flex }) => flex};
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: ${({ align }) => align || 'center'};
    justify-content: ${({ justify }) => justify || 'flex-start'};
    ${({ margin }) => margin && css`margin: ${margin};`};
    ${({ position }) => position && css`position: ${position};`};

    @media only screen and (max-width: 1700px){
        ${({ resp }) => !!resp && css`display: none;`}
    }
`
const ContainerIconUser = styled.div`
    min-width: 70px;
    background-color: #D4D4D4;
    border-radius: 50%;
    height: 70px;
    width: 70px;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const ContainerUser = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 2px solid ${PColor};
    padding: 10px;
    background-color: ${BGSColor};
`
const Text = styled.span`
    color: ${BGVColor};
    font-size: ${({ size }) => size ? size : '15px'};
    ${({ bold }) => !!bold && css`font-weight: ${bold};`};
    ${({ zIndex }) => !!zIndex && css`z-index: ${zIndex};`};
    ${({ bgColor }) => !!bgColor && css`background-color: ${bgColor};`};
    line-height: 15px;
    font-family: 'PFont-Regular';
`
export const Img = styled.img`
    width: ${({ width }) => width ? width : '20px'};
    height: ${({ height }) => height ? height : '20px'};
    margin-left: 10px ;
    margin-right: 10px ;
    /* margin-bottom: -5px; */
`