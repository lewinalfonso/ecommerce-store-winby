import React from 'react'
import styled from 'styled-components'
import bannerCompanyMovil from '../../../../assets/img/bannerCompanyMovil.jpg'
import { BGColor, BGVColor } from '../../../../assets/colors'
import bannerUbicationPGOpportunities from '../../../../assets/img/bannerUbicationPGOpportunities.jpg'
import { IconLogoType } from '../../../../assets/icons'
import { Oportunities } from './oportunities'
import { EarnMoneyV } from './earnMoneyV'
import { Compensation } from './compensation'
import { CompensationSales } from './CompensationSales'
import { Bonds } from './Bonds'
import { RangesWinby } from './rangesWinby'
import { Award } from './leadershipaward'

export default () => {

    return (<>

        <Container id='sCompany' >
            <ContainerOverline>
                <Content>
                    <ContainerChildren>
                        <Text>Winby es experiencia</Text>
                        <Paragraph>Contamos con un equipo de profesionales en marketing digital, marketing multinivel, venta directa y coaching, con más de 10 años de experiencia.</Paragraph>
                        <IconLogoType color={BGColor} size={window.screen.width <= 768 ? '160px' : '300px'} />
                        <Paragraph size='40px' PFont='PFont-Bold'>Localízanos</Paragraph>
                        <Paragraph size='25px' PFont='PFont-Bold'>Localízanos</Paragraph>
                        <Paragraph size='18px' PFont='PFont-Regular' >Barranquilla Colombia</Paragraph>
                        <Paragraph size='25px' PFont='PFont-Bold' >Escribenos o llámanos</Paragraph>
                        <Paragraph size='18px' PFont='PFont-Regular'>+57 318 8270992 - +57 318 7345172</Paragraph>
                        <Paragraph size='25px' PFont='PFont-Bold' >Envianos un correo</Paragraph>
                        <Paragraph size='18px' PFont='PFont-Regular'  >Serviciosalcliete1@winby.com - Serviciosalcliete2@winby.com</Paragraph>
                    </ContainerChildren >
                </Content>
            </ContainerOverline>
        </Container>
        <Oportunities />
        <EarnMoneyV />
        <Compensation/>
        <CompensationSales />
        <Bonds />
        <RangesWinby />
        <Award />

    </>
    )
}

const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${bannerUbicationPGOpportunities});
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${bannerCompanyMovil});
    }
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;
    background-color:rgb(0 0 0 / 55%);
    @media(max-width: 769px){
        background-color:rgb(0 0 0 / 10%);
    }
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100vh;   
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

    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-self: center; 
    align-items: center;
    @media(max-width: 769px){
        width: 90%;
    }
`
const Text = styled.h2`
    font-family: PFont-Regular;
    font-size: 30px;
    text-align: start;
    color: ${BGColor};
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
        text-align: center;
    }
`