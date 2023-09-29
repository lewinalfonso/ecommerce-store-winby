import React from 'react'
import styled, { css } from 'styled-components'
import bannerOpportunitiesPGOpportunities from '../../../../assets/img/bannerOpportunitiesPGOpportunities.jpg'
import bannerOpportunitiesPGOpportunitiesMovil from '../../../../assets/img/FONDO-8.jpg'
import LogoWinby from '../../../../assets/icons/logoWinby.svg'
import { BGVColor } from '../../../../assets/colors'

export const Oportunities = () => {
    return (<>
        <Container >
            <ContainerOverline>
                <Content>
                    <ContainerChildren id='sOpportunity'>
                        <Text>Oportunidad</Text>
                        <ImgLogo src={LogoWinby} />
                        <Text>10 años de experiencia</Text>
                        <Paragraph>Somos una compañía multinacional de comercio electrónico nacida en Barranquilla - Colombia; cuyo objeto principal es el desarrollo de software para el comercio de productos y servicios a través de la internet. Nuestra multiplataforma digital nos permite comercializar gran variedad de productos y servicios en múltiples categorías.</Paragraph>
                        <Paragraph>Nuestro modelo de negocio es el resultado de la combinación del e-commerce, la intermediación comercial, la venta directa y las estrategias de marketing digital, marketing personal y marketing en red.</Paragraph>
                        <Paragraph>Hay una impresión de que estamos en términos históricos, en un punto de no retorno, en el que se nos impone un cambio inevitable hacia los medios tecnológicos como herramientas de trabajo en todas las áreas. Ahora, bien entendidas las crisis pueden traer consigo grandes oportunidades de cambio, crecimiento y desarrollo. Es indiscutible que habrá una aceleración en el teletrabajo y hacia los negocios fundamentados en las tecnologías de las comunicaciones y la informática.</Paragraph>
                        <Paragraph>Hemos creado un modelo de negocio que vincula varios modelos existentes, para que a través del teletrabajo y partiendo de una inversión mínima, las personas puedan generar ingresos causados directamente por las ventas de productos y servicios que, a través del software Winby,  colocamos a su disposición.</Paragraph>
                    </ContainerChildren >
                    <ContainerChildren width='20%' />
                </Content>
            </ContainerOverline>
        </Container>
    </>)
}
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${bannerOpportunitiesPGOpportunities});
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${bannerOpportunitiesPGOpportunitiesMovil});
    }
`
const ImgLogo = styled.img`
    height:300px;
    width: 300px;
    @media(max-width: 769px){
        height: 150px;
        width: 150px;
    }
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;
    @media(max-width: 769px){
        background-color: rgb(221 221 221 / 57%);
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
    width: ${({ width }) => width ? width : '80%'};
    ${({ minWidth }) => minWidth && css`min-width: ${minWidth};`};
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-self: center; 
    @media(max-width: 769px){
        width: 90%;
    }
`
const Text = styled.h2`
    font-family: PFont-Regular;
    font-size: 30px;
    text-align: start;
    color: ${BGVColor};
`
const Paragraph = styled.p`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: ${BGVColor};
    line-height: 1.3em;
    @media(max-width:768px){
        font-size: 14px;
        margin: 3px 0px;
    }
    `
    