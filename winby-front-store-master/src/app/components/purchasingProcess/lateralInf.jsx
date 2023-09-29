import React from 'react';
import styled, { css } from 'styled-components';
import { ASColor, PLVColor, BGVColor } from '../../../assets/colors';

export const Lateral = () => (
        <Container>
        <Content>
            <Card>
                <Imgcard src='https://http2.mlstatic.com/D_Q_NP_991018-MCO42264103673_062020-AB.webp' ></Imgcard>
                <ContainerText  width='50%'>
                    <Text>Nombre del producto</Text>
                    <Text>Cantidad: 1</Text>
                    <Text>Color:</Text>
                </ContainerText>
                <ContainerText width='20%' ><Text>$120.000</Text></ContainerText>
            </Card>
            <Card padding='30px'>
                    <Text width='50%'>Envío</Text>
                    <Text size='18px' align='right' width='50%' color={ ASColor }>Gratis</Text>
            </Card>
            <Card padding='30px'>
                    <Text width='50%'>Total</Text>
                    <Text size='25px' align='right' width='50%'>$120.000</Text>
            </Card>
        </Content>
    </Container>
)
const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${ PLVColor };
    border-left: 1px solid ${BGVColor}2b;

` 
const Content = styled.div` 
    display: flex;
    flex-direction: column;
    margin: 30px;
    & > :nth-child(3){
        border-bottom: none;
    }
` 
const Card = styled.div` 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 1px solid ${ BGVColor }3d;   
    ${({ padding }) => padding && css`padding: ${padding};`}
` 
const ContainerText = styled.div` 
    display: flex;
    flex-direction: column;
    width: 50%;
    ${({ width }) => width && css`width: ${width};`}
` 
const Imgcard = styled.img`
    height: 60px;
    width: 20%;
    margin-right: 10px;

`  
const Text = styled.span`
    font-family: PFont-Regular;
    ${({ color }) => color && css`color: ${color};`}
    ${({ width }) => width && css`width: ${width};`}
    ${({ align }) => align && css`text-align: ${align};`}
    ${({ size }) => size && css`font-size: ${size};`}

` 