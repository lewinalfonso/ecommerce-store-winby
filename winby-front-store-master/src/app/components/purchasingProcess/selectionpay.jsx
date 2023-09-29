import React from 'react';
import styled, { css } from 'styled-components';
import { Lateral } from './lateralInf'
import { BGColor, BGVColor, PColor } from '../../../assets/colors';
import billeteraWinby from '../../../assets/icons/billeteraWinby.svg'
import CodedPromo from '../../../assets/icons/codigoPromocional.svg'
import BitCoin from '../../../assets/icons/BitCoin.svg'
import dolar from '../../../assets/icons/dolar.svg'
import visaCard from '../../../assets/icons/visaCard.svg'
import mastercard from '../../../assets/icons/mastercard.svg'
import baloto from '../../../assets/icons/baloto.png'
import efecty from '../../../assets/icons/efecty.svg'

export const PaymentMethod =  () => (
    <Container>
     <Content>
        <Title>Completa los datos de envío y facturación</Title>
            <Card>
                <ContainerCard  width='10%'>
                <Border />
                </ContainerCard>
                <ContainerCard  width='10%'>
                <Icons src={ billeteraWinby }/>
                </ContainerCard>
                <ContainerCard  padding='20px 0px' width='80%'>
                <Text size='13px'>Paga con la Billetera Winby</Text>
                <Text fontFamily='PFont-Regular' size='11px'>Es rápido, seguro y no tiene costo adicional.</Text>
                </ContainerCard>
            </Card>
            <Card>
                <ContainerCard  width='10%'>
                <Border />
                </ContainerCard>
                <ContainerCard  width='10%'>
                <Icons src={ CodedPromo }/>
                </ContainerCard>
                <ContainerCard padding='20px 0px' width='80%'>
                <Text size='13px'>Código promocional</Text>
                </ContainerCard>
            </Card>
            <Card>
                <ContainerCard  width='10%'>
                <Border />
                </ContainerCard>
                <ContainerCard  width='10%'>
                <Icons src={ BitCoin }/>
                </ContainerCard>
                <ContainerCard  padding='20px 0px'width='80%'>
                <Text size='13px'>Criptomoneda</Text>
                </ContainerCard>
            </Card>
            <Card>
                <ContainerCard  width='10%'>
                <Border />
                </ContainerCard>
                <ContainerCard  width='10%'>
                <Icons src={ dolar }/>
                </ContainerCard>
                <ContainerCard  width='25%'>
                <Text size='13px'>Otro medio de pago</Text>
                </ContainerCard>
                <ContainerCard padding='20px 0px'justify='space-between' direction='row' width='40%'>
                <Icons height='25px' width='80px' padding='0px 10px' src={ visaCard }/>
                <Icons height='32px' width='80px' padding='0px 10px' src={ mastercard }/>
                <Icons height='25px' width='80px' padding='0px 10px' src={ baloto }/>
                <Icons height='25px' width='80px' padding='0px 10px' src={ efecty }/>
                </ContainerCard>
            </Card>
        <ContenBtn>
        </ContenBtn>
    </Content> 
     <Lateral />
    </Container>
)

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template: 1fr / 60% 40%;
    grid-gap: 5px;
    max-width: 1200px;
` 
const ContenBtn = styled.div`
    display: block;
    justify-content: flex-end;
    align-self: flex-end;
` 
const Content = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 70px;
    margin: auto;
    & > :nth-child(5){
        border-bottom: none;
    }
` 
const Icons = styled.img`
    ${({ padding }) => padding && css`padding: ${padding};`};
    width: ${({ width })=> width ? width : '35px'};
    height: ${({ height })=> height ? height : '40px'};

` 
const Title = styled.h4`
    font-size: 17px;
    font-family: PFont-Regular;
    margin: 0px 0px 40px 10px;
` 
const Border = styled.div`
  height:10px;
  width: 10px;  
  background-color: ${PColor};
  overflow: hidden;
  transition: .3s ease;
  align-self: baseline;
` 

const Card = styled.div` 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding: 0px;
    background-color: ${ BGColor };
    border-bottom: 1px solid ${ BGVColor }3d;   
    &:hover ${ Border }{
        height: 100%;
    }
` 
const ContainerCard = styled.div` 
    display: flex;
    flex-direction: ${({ direction })=> direction ? direction : 'column'};
    justify-content: ${({ justify })=> justify ? justify : 'center'};
    ${({ width }) => width && css`width: ${width};`};
    ${({ padding }) => padding && css`padding: ${padding};`};
    align-items: self-end;
` 
const Text = styled.span`
    font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'PFont-Bold'};
    ${({ color }) => color && css`color: ${color};`}
    ${({ width }) => width && css`width: ${width};`}
    ${({ align }) => align && css`text-align: ${align};`}
    ${({ size }) => size && css`font-size: ${size};`}

` 