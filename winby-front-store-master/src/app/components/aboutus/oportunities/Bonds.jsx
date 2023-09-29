import React from 'react'
import styled from 'styled-components'
import redLegOne from '../../../../assets/icons/redLegOne.svg'
import redLegTwo from '../../../../assets/icons/redLegTwo.svg'
// import bannerCompensationsPGOpportunities from '../../../../assets/img/bannerCompensationsPGOpportunities.jpg'
import { BGVColor } from '../../../../assets/colors'
import Pigs from '../../../../assets/icons/Pigs.svg'

export const Bonds = () => (<>
    <div />
    {/* <Container id='sCompany' >
        <ContainerOverline>
            <Content>
                <ContainerChildren>
                    <Text>Compensacione                                                                                                                                                                                 s</Text>
                    <Paragraph>Las compensacion en el desarrollos de las estrategias de marketing personal y marketing personal se causan con la venta directa de los productos y servicios comercializados en nuestra plataforma; en razón de que los porcentajes de utilidad de los mismos son variables, la comisión de la utilidad que corresponde al Empresario Winby por su comercialización también lo es; de manera que en la back office de los EMPRESARIOS WINBY, al lado de cada producto, se encontrara consignada la comisión de la utilidad que les corresponde por su venta. <br /><br /> La utilidad de cada venta será causada inmediatamente se genere la venta y se liquidará los viernes de cada semana. La billetera virtual del Winber se cargará con el valor liquidado y el Winber podrá solicitar el traslado del dinero a su cuenta de banco. </Paragraph>
                </ContainerChildren >
                <ContainerChildren width='20%' />
            </Content>
        </ContainerOverline>
    </Container> */}
    <Content>
        <ContentBonus>
            <ContentGridBonus >
                <Card>
                    <Img src={redLegOne} />
                    <Text align>Bono construcción de Torre A.</Text>
                    <Paragraph>Es la parte de la utilidad que le corresponde a los Winbers por las ventas realizadas por su red de tiendas virtuales en la Torre A de centro comercial.</Paragraph>
                </Card>
                <Card>
                    <Img src={redLegTwo} />
                    <Text align>Bono construcción de Torre B.</Text>
                    <Paragraph>Es la parte de la utilidad que le corresponde a los Winbers por las ventas realizadas por su red de tiendas virtuales en la Torre B de centro comercial.</Paragraph>
                </Card>
            </ContentGridBonus>
        </ContentBonus>
    </Content>
    <div>
        <ImgBanner src={Pigs} />
    </div>
    <Content>
        <ContentBonus>
            <ContentGridBonus >
                <Card>
                    <Text align>Bono Rinho Junior</Text>
                    <Paragraph>Este es un bono de liderazgo en el cual ganaras el 5% de las utilidades mundiales de la empresa.</Paragraph>
                </Card>
                <Card>
                    <Text align>Bono Rinho Plata</Text>
                    <Paragraph>Este es un bono de liderazgo en el cual ganaras el 2,5% de las utilidades mundiales de la empresa.</Paragraph>
                </Card>
                <Card>
                    <Text align>Bono Rinho Rojo</Text>
                    <Paragraph>Este es un bono de liderazgo en el cual ganaras el 2,5% de las utilidades mundiales de la empresa más el bono Rinho Junior y Rinho Plata.</Paragraph>
                </Card>
            </ContentGridBonus>
        </ContentBonus>
    </Content>
</>
)
// const Container = styled.div`
//     width:100%;
//     display: flex;
//     flex-direction: column;
//     background-image: url(${bannerCompensationsPGOpportunities});
//     width: 100%;
//     background-repeat: no-repeat;
//     background-size: 100% 100%;
// `
// const ContainerOverline = styled.div`
//     width:100%;
//     height: 100%;
//     @media(max-width: 769px){
//         background-color:rgb(0 0 0 / 15%);
//     }
// `
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 80vh;   
    display: flex;
    margin: auto;   
    & > div:nth-child(2){
    @media(max-width: 769px){
        display: none;
}
    }
`
// const ContainerChildren = styled.div`
//     width: ${({ width }) => width ? width : '80%'};
//     display: flex;
//     margin: auto;
//     flex-direction: column;
//     justify-content: center;
//     align-self: center; 
//     @media(max-width: 769px){
//         width: 90%;
//     }
// `
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
const ContentBonus = styled.div`
width: 80%;
margin: auto;
height: 100%;
flex-wrap: wrap;
justify-content: center;
flex-direction: column;
@media(max-width:768px){
    align-items: center;
    width: 90%;
    padding-top: 0px;

}
`
const Card = styled.div`
    font-size: 15px;
    display: flex;
    align-items: center;
    width: 90%;
    justify-content: center;
    flex-direction: column;
    font-family: PFont-Regular;
    @media(max-width: 768px) {
        width: 100%;
    }

`
const ContentGridBonus = styled.div`
    width: 100%;
    height: 100%;
    grid-gap: 33px;
    display: grid;
    grid-template: 1fr/ 50% 50%;
    @media(max-width:768px){
    grid-template: 1fr/ 100%;
        grid-gap: 10px;
    }
`

const Img = styled.img`
    padding: 5px;
    height: 225px;
    width: 270px;
    @media(max-width: 768px ){
        padding: 0px;
        height: 100px;
        width: 100px;
    }
`
const ImgBanner = styled.img`
    padding: 5px;
    width: 100%;
    height: 280px;
    @media(max-width:768px){
    height: 100px;
    }
`