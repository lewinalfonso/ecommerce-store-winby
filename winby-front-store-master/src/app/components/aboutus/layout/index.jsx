import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PColor, PVColor } from '../../../../assets/colors'
import { To } from '../../../common/Buttons'
import { A, Logo } from '../../layout/header/Styled'
import { IconFacebook, IconInstagram, IconYoutube, IconShoppingCart, IconMenu, IconLogoLetter, IconLogoType } from '../../../../assets/icons'
import { FadeInAnimation } from '../../../components/items/Styled'

export default ({ state, handleMenu, visible, children }) => {
    return <>
        <Nav position='fixed' display='flex'>
            <Ul border={window.screen.width > 600 ? 'none' : '1px solid red'} width='20%'>
                <To display='flex' to={`/store/${state.code}`}>
                    <IconLogoType size='35px' color={BGColor} />
                    <Logo letter={window.screen.width < 800}><IconLogoLetter height='40px' width='110px' color={BGColor} /></Logo>
                </To>
            </Ul>
            <Ul display={window.screen.width > 600 ? 'flex' : 'none'} width='45%'>
                <Li>
                    <To borderleft ={`1px solid ${PColor}`} display='inline-block' margin='10px 0' padding='15px' to={`/pagina-informacion/${state.code}`} effect='true' color={BGColor} fontSize='13px' weight='bold'>Compañia</To>
                    <HiddenMenu>
                        <Trasnlate href={`/pagina-informacion/${state.code}#sCompany`}>Nuestra Compañia</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/${state.code}#sVision`}>Visíon - Misión</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/${state.code}#sInternational`}>Internacional</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/${state.code}#sGestiónSocial`}>Gestión Social</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/${state.code}#sLegalidad`}>Legalidad</Trasnlate>
                    </HiddenMenu>
                </Li>
                <Li>
                    <To borderleft ={`1px solid ${PColor}`} display='inline-block' margin='10px 0' padding='15px' to={`/pagina-informacion/oportunidad/${state.code}`} effect='true' color={BGColor} fontSize='13px' weight='bold'>Oportunidad</To>
                    <HiddenMenu>
                        <Trasnlate href={`/pagina-informacion/oportunidad/${state.code}#sOpportunity`}>Oportunidad</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/oportunidad/${state.code}#sCompensation`}>Compensaciones</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/oportunidad/${state.code}#sRank`}>Rangos Winby</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/oportunidad/${state.code}#sAwardsWinby`}>Premios Winby</Trasnlate>
                    </HiddenMenu>
                </Li>
                <Li>
                    <To borderleft ={`1px solid ${PColor}`} to={`/pagina-informacion/productos/${state.code}`} padding='15px' display='inline-block' margin='10px 0' effect='true' color={BGColor} fontSize='13px' weight='bold'>Productos</To>
                </Li>
                <Li>
                    <To borderleft ={`1px solid ${PColor}`} to={`/pagina-informacion/aliados/${state.code}`} padding='15px' display='inline-block' margin='10px 0' effect='true' color={BGColor} fontSize='13px' weight='bold'>Aliados</To>
                    <HiddenMenu>
                        <Trasnlate href={`/pagina-informacion/aliados/${state.code}#sAliad`}>Aliados</Trasnlate>
                        <Trasnlate href={`/pagina-informacion/aliados/${state.code}#sExclusiveness`}>Exclusividad</Trasnlate>
                    </HiddenMenu>
                </Li>
                <Li>
                    <To borderleft ={`1px solid ${PColor}`} display='inline-block' margin='10px 0' to={`/store/${state.code}`} padding='15px' effect='true' color={BGColor} fontSize='13px' weight='bold'>Tienda</To>
                </Li>
            </Ul>
            <Ul border={window.screen.width > 600 ? 'none' : '1px solid red'} display={window.screen.width > 600 ? 'none' : 'flex'} width='20%'>
                <ContainerIcon onClick={() => handleMenu(1)}>
                    <IconMenu color={BGColor} size='25px' />
                </ContainerIcon>
            </Ul>
            <Ul border={window.screen.width > 600 ? 'none' : '1px solid red'} display={window.screen.width > 600 ? 'none' : 'flex'} width='20%'>
                <ContainerIcon>
                    <IconShoppingCart color={BGColor} size='25px' />
                </ContainerIcon>
            </Ul>
            <Ul width={window.screen.width > 600 ? '20%' : '40%'}>
                <A margin='13px' href='https://www.youtube.com/channel/UC8ZRFKBxzPXxuEKfgNJYLng' target='_blank'><IconYoutube color2={PColor} color={BGColor} size='20px' /></A>
                <A margin='13px' href='https://www.instagram.com/winby.oficial/' target='_blank'><IconInstagram color={BGColor} size='20px' /></A>
                <A margin='13px' href='https://www.facebook.com/Winbyoficial' target='_blank'><IconFacebook color={BGColor} size='20px' /></A>
            </Ul>
        </Nav>
        <Nav position='absolute' visible={visible === 1 ? 'flex' : 'none'} gradient={`linear-gradient(0deg, ${PVColor}, ${PVColor})`}>
            <Ul responsive >
                <Li><To to={`/pagina-informacion/${state.code}`} effect='true' color={BGColor} width='auto' padding={window.screen.width <= 600 ? '0px 2px' : '10px 8px 0 8px'} fontSize='14px' weight='bold'>Compañia</To></Li>
                <Li><To borderleft ={`1px solid ${PColor}`} to={`/pagina-informacion/oportunidad/${state.code}`} effect='true' color={BGColor} width='auto' padding={window.screen.width <= 600 ? '0px 2px' : '10px 8px 0 8px'} fontSize='14px' weight='bold'>Oportunidad</To></Li>
                <Li><To borderleft ={`1px solid ${PColor}`} to={`/pagina-informacion/productos/${state.code}`} effect='true' color={BGColor} width='auto' padding={window.screen.width <= 600 ? '0px 2px' : '10px 8px 0 8px'} fontSize='14px' weight='bold'>Productos</To></Li>
                <Li><To borderleft ={`1px solid ${PColor}`} to={`/pagina-informacion/aliados/${state.code}`} effect='true' color={BGColor} width='auto' padding={window.screen.width <= 600 ? '0px 2px' : '10px 8px 0 8px'} fontSize='14px' weight='bold'>Aliados</To></Li>
                <Li><To borderleft ={`1px solid ${PColor}`} to={`/store/${state.code}`} effect='true' color={BGColor} width='auto' padding={window.screen.width <= 600 ? '0px 2px' : '10px 8px 0 8px'} fontSize='14px' weight='bold'>Tienda</To></Li>
            </Ul>
            {children}
        </Nav>
    </>
}

const Trasnlate = styled.a`
    display: block;
    padding-bottom: 10px;
    color: #FFF;
    font-size: 14px;
    text-decoration: none;
    width: 100%;
    overflow: hidden;
`

// fin de animación
const Nav = styled.nav`  
    ${({ position }) => position && css`position: ${position};`};
    display: flex;  
    flex-direction: row;
    flex-wrap: wrap;
    z-index: 1;
    justify-content: center;
    width:100%;
    background-image: ${({ gradient }) => gradient ? gradient : `linear-gradient(45deg, ${PVColor}, ${PColor})`};
    ${({ visible }) => visible && css`display: ${visible};`}
    animation-name: ${({ visible }) => visible && FadeInAnimation };
    animation-duration: .5s;  
    animation-fill-mode: forwards;
    @media (max-width: 640px){
        position: relative;
    }
`
const Ul = styled.ul`    
    ${({ width }) => width && css`width: ${width};`}; 
    ${({ border }) => border && css`border-right: ${border};`}; 
    display: ${({ display }) => display ? display : 'flex'};
    padding: 0 10px;
    margin: auto;
    list-style: none;
    justify-content: center;
    @media (max-width: 700px) {
        font-size: 18px;
        padding: 0;    padding: 0;
        height: 35px;
        align-items: center;
     

    }
    ${({ responsive })=> responsive && css`
    @media (max-width: 700px) {
        justify-content: space-between;
        padding: 0;
        margin: 0;
        width: 100%;

    }
    
    
    `}
`
const HiddenMenu = styled.div`
    display: none;
    position: absolute;
    background-color: ${PColor}aa;
    width: 100%;
    top: 64px;
    right: 0px;
    padding: 5px 5px;
`
const Li = styled.li`    
    width: 50%;
    z-index: 1;
    text-align: center;
    &:hover ${HiddenMenu} {
        display: block;
    }
    position: relative;
    @media (max-width: 700px) {
      padding: 0;
    }
`
const ContainerIcon = styled.div`
    margin: auto;
    display: flex;
`