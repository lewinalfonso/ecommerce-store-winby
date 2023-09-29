import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Lateral } from './lateralInf'
import { BGColor, BGVColor, PColor, PLColor, APColor } from '../../../assets/colors';
import { IconEnterLocation, IconTruck, IconLicense, AddPlusCircle } from '../../../assets/icons';
import   { Context }  from '../../common/modal/ContextModal'
import Modalles from '../../common/modal/Modal'

export const ConfirmCourData = () => {

    const { isModal, setIsModal } = useContext(Context)

    return (
        <Container>
            <Content>
                <Title>Confirma tus datos</Title>
                <Title>Ubicación y Envío</Title>
                <Card>
                    <ContainerCard width='50%'>
                        <IconEnterLocation size='40px' />
                        <Text>30 #2532-2564,</Text>
                        <Text size='11px'>Bayunca, Bolívar</Text>

                    </ContainerCard>
                    <ContainerCard width='50%'>
                        <IconTruck color={BGVColor} size='40px' />
                        <Text>Envío a domicilio</Text>
                        <Text size='11px'>Llega entre el miércoles y el lunes 25 de enero por $10.000</Text>
                    </ContainerCard>
                    <ContainerCard borderTop={` 1px solid ${BGVColor}3d`} width='50%'>
                        <Text onClick={setIsModal} padding='10px 0px 0px 0px' color={APColor} size='11px'>Cambiar ubicación</Text>
                    </ContainerCard>
                    <ContainerCard borderTop={` 1px solid ${BGVColor}3d`} width='50%' />
                </Card>
                <Card>
                    <ContainerCard width='50%'>
                        <IconLicense color={BGVColor} size='40px' />
                        <Text>Datos de tu factura</Text>
                        <Text size='11px'>Nombre y cédula de la persona que factura</Text>
                    </ContainerCard>
                    <ContainerCard width='50%'>
                        <IconEnterLocation size='40px' />
                        <Text>Efecty</Text>
                        <Text size='13px'>Total $150.000</Text>
                        <Text size='11px'>Mantenemos el producto en cuanto hagas el pago del mismo</Text>
                    </ContainerCard>
                    <ContainerCard borderTop={` 1px solid ${BGVColor}3d`} width='50%'>
                        <Text padding='10px 0px 0px 0px' color={APColor} size='11px'>Cambiar datos de tu factura</Text>
                    </ContainerCard>
                    <ContainerCard borderTop={` 1px solid ${BGVColor}3d`} width='50%' >
                        <Text padding='10px 0px 0px 0px' color={APColor} size='11px'>Cambiar método de pago</Text>
                    </ContainerCard>
                </Card>
                <ContenBtn>
                </ContenBtn>
                <Modalles  direction='row' isModal={isModal} setIsModal={setIsModal}>
                    <ContainerCard borderBottom={` 1px solid ${PLColor} `} border='none' width='90%'>
                        <IconEnterLocation size='40px' />
                        <Text>30 #2532-2564,</Text>
                        <Text size='11px'>Bayunca, Bolívar</Text>
                    </ContainerCard>
                    <ContainerCard direction='row' padding='20px 0px' border='none' width='90%'>
                        <ContainerPlus>
                            <AddPlusCircle size='40px' />
                        </ContainerPlus>
                        <Text width='40%' color={APColor} >Agregar ubicación</Text>
                    </ContainerCard>
                </Modalles>


            </Content>
            <Lateral />
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template: 1fr / 60% 40%;
    grid-gap: 5px;
    max-width: 1200px;
`
const ContainerPlus = styled.div`
   border-radius: 70%;
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
    padding: 10px 0px;
    margin: 20px 0px;
    background-color: ${BGColor};
    border-bottom: 1px solid ${BGVColor}3d;   
    &:hover ${Border}{
        height: 100%;
    }
`
const ContainerCard = styled.div` 
    display: flex;
    flex-direction: ${({ direction }) => direction ? direction : 'column'};
    ${({ width }) => width && css`width: ${width};`};
    ${({ borderTop }) => borderTop && css`border-top: ${borderTop};`};
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`};
    ${({ padding }) => padding && css`padding: ${padding};`};
    align-items: center;
    justify-content: ${({ justify }) => justify ? justify : 'center'};
    border-left: ${({ border }) => border ? border : ` 1px solid ${PLColor} `};
`
const Text = styled.span`
    font-family: PFont-Regular;
    ${({ color }) => color && css`color: ${color};`}
    ${({ width }) => width && css`width: ${width};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ size }) => size && css`font-size: ${size};`}
    text-align: center;
    width: ${({ width }) => width ? width : '70%'};
` 