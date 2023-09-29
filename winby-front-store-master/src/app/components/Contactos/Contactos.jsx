import React from 'react';
import styled, { css } from 'styled-components';
import { IconWatsapp, IconFacebook, IconYoutube, IconInstagramGradient, IconMail } from '../../../assets/icons';
import { BGColor, PColor, BGVColor } from '../../../assets/colors'

export default () => (
    <Container>
        <Box>
            <ContentBox borderBottom='1px solid #929292' >
                <Text padding='10px' size='16px' >CONTACTA CON NOSOTROS</Text>
            </ContentBox>
            <Link target='_blank' width='26%' href="https://api.whatsapp.com/send?phone=+57 318 8270992">
                <Span color='#04AA04'>Llámanos o escríbenos</Span>
                <ContainerIcon>
                    <IconWatsapp size='42px' color='#04AA04' />
                </ContainerIcon>
            </Link>
            <Link target='_blank' width='26%' href="mailto:Servicioalcliente1@winby.co">
                <Span color='#C20202'>Envíanos un e-mail</Span>
                <ContainerIcon>
                    <IconMail size='50px' />
                </ContainerIcon>
            </Link>
            <ContentBox border='1px solid #929292'>
                <Text padding='20px 0 0'>No olvides seguirnos</Text>
            </ContentBox>
            <Link target='_blank' width='26%' href='https://www.facebook.com/Winbyoficial'>
                <Span>Winby oficial</Span>
                <ContainerIcon>
                    <IconFacebook size='50px' color='#2C2CD6' />
                </ContainerIcon>
            </Link>
            <Link target='_blank' width='26%' href="https://www.instagram.com/winby.oficial/">
                <Span>@Winby oficial</Span>
                <ContainerIcon>
                    <IconInstagramGradient size='50px' />
                </ContainerIcon>

            </Link>
            <Link target='_blank' width='26%' href='https://www.youtube.com/c/Comunicaci%C3%B3nCristiana/videos' >
                <Span>Winby oficial</Span>
                <ContainerIcon>
                    <IconYoutube size='50px' color={PColor} color2={BGColor} />
                </ContainerIcon>
            </Link>
        </Box>
    </Container>
)

// Contenedor principal
const Container = styled.div`
    height: 80vh;

    @media (max-width: 768px) {
        width: 100%;
    }
`
const Box = styled.div`
    width: 80%;
    display: flex;
    box-shadow: 0px 0px 6px #00000060;
    flex-wrap:  wrap;
    flex-direction: row;
    justify-content: center;
    font-size: 50px;
    margin: 10% auto;
    padding: 15px;
    border-radius: 5px;
    background-color: #FFFFFF;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;

    }
`
const Text = styled.h3`
    font-size: 20px; 
    padding: ${({ padding }) => padding ? padding : '0'}; 
    margin: 0;
    font-weight: 800;
    text-align: center;
    @media (max-width: 768px) {
        font-size: ${({ size }) => size ? size : '16px'}; 
    }
`
const Link = styled.a`
    ${({ width }) => width && css`width: ${width};`};
    display: flex;
    color: ${BGVColor};
    font-size: 17px;
    text-decoration: none;
    padding: 10px 0;
    margin: 30px 10px;
    align-items: center;
    justify-content: center;
    -webkit-transition: color 300ms;
  transition: color 300ms;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;



    @media(max-width: 768px) {
        margin: 0 auto;
        font-size: 12px; 
        justify-content: space-between;
        margin: auto;
        padding: 9px 0px;
        width: 80%;
    }

    &::before{
        content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #EEE;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition: 300ms ease-out;
  transition: 300ms ease-out;
    }

    &:hover::before {
       
        -webkit-transform: scaleX(1);
  transform: scaleX(1);
        }
`
const ContentBox = styled.div`
    width: 100%;
    display: flex;
    padding: 0px;
    margin: 0;
    flex-direction: column;
    align-self: center;
    ${({ border }) => border && css`border-top: ${border};`};
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`};
`
const Span = styled.span`
    font-size: 20px;
    color: ${({ color }) => color ? color : '#000'};
    font-family: PFont-Bold;
    margin: 0px 10px;
    @media(max-width: 768px){
        font-size: 15px;
    }
`
const ContainerIcon = styled.div`
  max-width: 50px;
  
`