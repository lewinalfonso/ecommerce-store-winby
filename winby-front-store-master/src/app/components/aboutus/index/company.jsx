import React from 'react'
import styled, { css } from 'styled-components'
import bannerCompanyMovil from '../../../../assets/img/bannerCompanyMovil.jpg'
import bannerCompany from '../../../../assets/img/bannerCompany.jpg'
import { BGColor, BGVColor } from '../../../../assets/colors'
import { Animations } from '.'
import rightlogo from '../../../../assets/img/rightlogo.png'

export const Company = () => (<>
    <div />
    <Container id='sCompany' >
        <ContainerOverline>
            <Content>
                <ContainerChildren>
                    <Text>Compañia</Text>
                    <Animations count='0.1'>
                    </Animations>
                    <Animations count='0.1'>
                        <Paragraph>Somos una compañía multinacional de comercio electrónico nacida en Barranquilla - Colombia; cuyo objeto principal es el desarrollo de software para el comercio de productos y servicios a través de la internet. Nuestra multiplataforma digital nos permite comercializar gran variedad de productos y servicios en múltiples categorías.</Paragraph>
                    </Animations>
                    <Animations count='0.2'>
                        <Paragraph>Nuestro modelo de negocio es el resultado de la combinación del e-commerce, la intermediación comercial, la venta directa y las estrategias de marketing digital, marketing personal y marketing en red.</Paragraph>
                    </Animations>
                    <Animations count='0.3'>
                        <Paragraph>Hay una impresión de que estamos en términos históricos, en un punto de no retorno, en el que se nos impone un cambio inevitable hacia los medios tecnológicos como herramientas de trabajo en todas las áreas. Ahora, bien entendidas las crisis pueden traer consigo grandes oportunidades de cambio, crecimiento y desarrollo. Es indiscutible que habrá una aceleración en el teletrabajo y hacia los negocios fundamentados en las tecnologías de las comunicaciones y la informática.</Paragraph>
                    </Animations>
                    <Animations count='0.4'>
                        <Paragraph>Hemos creado un modelo de negocio que vincula varios modelos existentes, para que a través del teletrabajo y partiendo de una inversión mínima, las personas puedan generar ingresos causados directamente por las ventas de productos y servicios que, a través del software Winby,  colocamos a su disposición.</Paragraph>
                    </Animations>
                </ContainerChildren >
                <ContainerChildren minWidth='300px' width='30%'>
                    <ContainerImagen>
                        <Icon src={rightlogo} />
                    </ContainerImagen>
                </ContainerChildren>
            </Content>
        </ContainerOverline>
    </Container>

</>
)
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${bannerCompany});
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${bannerCompanyMovil});
    }
`
const ContainerImagen = styled.div`
    width: 90%;
    padding: 0 0 0 80px;
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100vh;
    background-color:rgb(0 0 0 / 55%);
    @media(max-width: 769px){
        background-color:rgb(0 0 0 / 10%);
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
    width: ${({ width }) => width ? width : '70%'};
    ${({ minWidth }) => minWidth && css`min-width: ${minWidth};`};
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
const Icon = styled.img`
    width:100%;
`
const Text = styled.h2`
    font-family: PFont-Regular;
    font-size: 26px;
    text-align: start;
    color: ${BGColor};
    @media(max-width: 768px){
        font-size: 30px;
    }
`
const Paragraph = styled.p`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: ${BGColor};
    line-height: 1.3em;
    text-shadow: 0px 0px 6px ${BGVColor}88;   
    @media(max-width:768px){
        font-size: 14px;
    }
`