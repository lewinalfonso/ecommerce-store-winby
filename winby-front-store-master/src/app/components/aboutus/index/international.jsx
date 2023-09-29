import React from 'react'
import styled, { css } from 'styled-components'
import bannerInternational from '../../../../assets/img/bannerInternational.jpg'
import bannerInternationalMovil from '../../../../assets/img/bannerInternationalMovil.jpg'
import { BGColor, BGVColor } from '../../../../assets/colors'
import { Animations } from '..'

export const International = () => {
        
    return(<>
<div />
    <Container id='sInternational'>
        <ContainerOverline>
        <Content> 
            <ContainerChildren width='60%' >
                <Text>Internacional</Text>
                <Animations count='0.1'>
            </Animations>
            <Animations count='0.1'>
                <Paragraph>Nuestro modelo de negocio permite una expansión mundial, en tanto que:<br /> <br />  El software Winby hace posible la comercialización de servicios que se pueden prestar desde el lugar desde donde se encuentre el prestador y que se pueden mercadear a nivel mundial.</Paragraph>
            </Animations>
            <Animations count='0.2'>
                <Paragraph> El Software Winby hace posible abrir una TIENDA WINBY en cualquier lugar del mundo.</Paragraph>
            </Animations>
            <Animations count='0.3'>
                <Paragraph> A través del software Winby, los prestadores de servicios técnicos y profesionales en todas partes del mundo podrán promover sus servicios y los Winbers comercializarlos.</Paragraph>
            </Animations>
            <Animations count='0.4'>
                <Paragraph> Las alianzas comerciales con establecimientos de comercio nos permiten abrir operaciones en cualquier parte del mundo.</Paragraph>
            </Animations>
            <Animations count='0.5'>
                <Paragraph> La facilidad de que nuestros aliados suban los productos y servicios que mercadeamos, nos permiten abrir operaciones en cualquier parte del mundo.</Paragraph>
            </Animations>
            <Animations count='0.6'>
                <Paragraph lineheight='1.5' spacing='0' size='18px' weight='900' margin='25px 100px' color={BGVColor}> Los países en que nuestra plataforma estará trabajando:</Paragraph>
            </Animations>
            </ContainerChildren >
        
            <ContainerChildren width='40%' />
                
        </Content>       
        </ContainerOverline>
    </Container>    

</>
)}
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${ bannerInternational });
  background-attachment: fixed, scroll;
  background-repeat: no-repeat, repeat-y;
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${ bannerInternationalMovil });
    }
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100vh;
    background-color:rgb(0 0 0 / 55%);
    @media (max-width:768px){
        background-color: rgb(0 0 0 / 30%);
        height: 100%;
    }
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: auto;   
    display: flex;
    margin: auto;   
    & > div:nth-child(2){
    @media(max-width: 769px){
        display: none;
}
    }
`
const ContainerChildren = styled.div`
    ${({ width }) => width && css`width: ${width};`};
    display: flex;
    margin: auto;
    margin-top: 10%;
    flex-direction: column;
    justify-content: center;
    align-self: center;   
    @media(max-width: 769px){
        width: 90%;
    }
`
const Text = styled.h2`
    font-family: PFont-Regular;
    font-size: 26px;
    text-align: start !important;
    text-align: left;
    color: ${  BGColor };
    @media(max-width: 768px){
        font-size: 30px;
    }
`
const Paragraph = styled.p`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: ${  BGColor };
    line-height: 1.3em;
    text-shadow: 0px 0px 6px ${ BGVColor }88;     
    @media(max-width:768px){
        font-size: 14px;
    }
`