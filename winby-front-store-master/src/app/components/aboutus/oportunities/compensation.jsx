import React from 'react'
import styled from 'styled-components'
import bannerplanMarketing from '../../../../assets/img/bannerplanMarketing.jpg'
import bannerCenterPGOpportunities from '../../../../assets/img/bannerCenterPGOpportunities.jpg'
import { BGVColor } from '../../../../assets/colors'

export const Compensation = () => (<>
    <div />
    <Container id='sCompany' >
        <ContainerOverline>
            <Content>
                <ContainerChildren width='20%' />
                <ContainerChildren>
                    <Text>Plan de utilidades marketing personal y marketing digital</Text>
                    <Paragraph>Las compensacion en el desarrollos de las estrategias de marketing personal y marketing personal se causan con la venta directa de los productos y servicios comercializados en nuestra plataforma; en razón de que los porcentajes de utilidad de los mismos son variables, la comisión de la utilidad que corresponde al Empresario Winby por su comercialización también lo es; de manera que en la back office de los EMPRESARIOS WINBY, al lado de cada producto, se encontrara consignada la comisión de la utilidad que les corresponde por su venta. <br /><br /> La utilidad de cada venta será causada inmediatamente se genere la venta y se liquidará los viernes de cada semana. La billetera virtual del Winber se cargará con el valor liquidado y el Winber podrá solicitar el traslado del dinero a su cuenta de banco. </Paragraph>
                </ContainerChildren >
            </Content>
        </ContainerOverline>
    </Container>
</>
)
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${bannerCenterPGOpportunities});
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${bannerplanMarketing});
    }
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;
`

const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100vh;   
    display: flex;
    margin: auto;   
    & > div:nth-child(1){
    @media(max-width: 769px){
        display: none;
}
    }
`
const ContainerChildren = styled.div`
    width: ${({ width }) => width ? width : '80%'};
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
    font-size: 16px;
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
    }
`