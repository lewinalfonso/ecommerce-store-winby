import React from 'react'
import styled from 'styled-components'
import { BGVColor} from '../../../../assets/colors'

export const EarnMoneyV = () => (<>
    <div />
    <Container id='sCompany' >
        <ContainerOverline>
            <Content>
                <ContainerChildren>
                <ContentIncome >
                <ContenEarnMoney>
                    <EarnMoney>
                        <Text> Gana dinero mientras ayudas a otros</Text>
                        <Paragraph>La licencia Winby es una oportunidad de ayudar a los demás a que generen ingresos extras y le den un rumbo distinto a esta crisis financiera.</Paragraph>
                    </EarnMoney>
                    <EarnMoney>
                        <Text>Premios de liderazgo</Text>
                        <Paragraph>En Winby valoramos el esfuerzo y el liderazgo por eso tenemos grandes premios como: viajes, productos tecnológicos, electrodomésticos, y mucho más.</Paragraph>
                    </EarnMoney>
                </ContenEarnMoney>
                <ContenEarnMoney>
                    <Text>8 bonos Winby para que generes ingresos</Text>
                    <ListBOnus>
                        <Li>Bono de venta directa</Li>
                        <Li>Bono de Venta de licencia del Software Winby</Li>
                        <Li>Bono Reto Rhino</Li>
                        <Li>Bono Volumen de ventas en torre A</Li>
                        <Li>Bono Volumen de ventas en torre B</Li>
                        <Li>Rhino Junior </Li>
                        <Li>Rhino Plata</Li>
                        <Li>Rhino Rojo</Li>
                    </ListBOnus>
                </ContenEarnMoney>
                <EarnMoney>
                    <Text>Red de tiendas virtuales</Text>
                    <Paragraph>
                        Construimos una red de tiendas virtuales con el fin de masificar las ventas de productos y servicios. La licencia de uso del software Winby está acompañado de un sistema educativo que hace duplicar no solo el desarrollo de la red de mercadeo sino la transferencia de conocimientos de las estrategias
                        de marketing, el sistema de capacitación personal y la retención de clientes.
                        </Paragraph>
                </EarnMoney>
                <EarnMoney>
                    <Text>Billetera Winby</Text>
                    <Paragraph>
                        Simplifica tu vida pagando por medio de nuestra billetera, aquí recibirás tus pagos, también puedes enviar saldo a otras billeteras, realizar pagos presenciales a establecimientos aliados Winby y transferir tus ganancias a tus cuentas bancarias.
                    </Paragraph>
                </EarnMoney>
            </ContentIncome>
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
    width: 100%;    
    background-size: 100% 100%;
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 80vh;   
    display: flex;
    margin: auto;   
    @media(max-width: 769px){
        height: auto;   
    }
`
const ContainerChildren = styled.div`
    width: 100%;
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
const EarnMoney = styled.div`
    padding-bottom: 20%;
    @media(max-width:768px){
        border-right: none;
     

        padding-bottom: 10px;
}
`
const Li = styled.li`
    list-style: none;
    padding: 10px;
  &::before{
      content: "-     ";
  }
`
const ContenEarnMoney = styled.div`
    padding-bottom: 20px;
    @media(max-width: 768px){
        border-bottom: 1px solid red;
    }
`
const ListBOnus = styled.span`
    display: flex;
    font-size: 16px;
    flex-direction: column;
`
const ContentIncome = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-gap: 15px;
    grid-template: 1fr/ 50% 50%;
    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
    }
`