import React from 'react';
import styled, { css } from 'styled-components';
import InputHooks from '../../common/InputHooks'
import { APColor, BGColor, PColor, PLColor } from '../../../assets/colors';
import { CustomButton } from '../../common/Buttons';
export const ChangeBillDataperson =  ({ state, onChangeInput }) => (
     <Content>
        <Text margin='0px' size='18px'>Cambiar los datos para tu factura</Text>
        <Text margin='10px 0px 30px 0px;' size='13px' >Estos son los datos aparecerán en tu recibo de compra. El vendedor te hará llegar el recibo en físico.</Text>
        <Container>
        <ContainerPersonalInformation>
            <Text width='20%' >Datos de la empresa</Text>
            <Text size='12px'color={APColor} width='20%' >Soy persona</Text>
        </ContainerPersonalInformation>
        <ContainerFrom>
            <InputHooks name='up_last'  title='Nombre de la empresa' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Nit' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
        </ContainerFrom>
        </Container>
        <ContenBtn>
            <CustomButton  padding='8px' fontFamily='PFont-Regular' width='150px' fontSize='20px' radius='6px' margin='50px 0px' bgColor={ PColor } color={ BGColor } >Continuar</CustomButton>
        </ContenBtn>
    </Content> 
)
 
const Container = styled.div`
    background-color: ${ BGColor };
    padding: 30px;
` 
const ContenBtn = styled.div`
    display: block;
    justify-content: flex-end;
    align-self: flex-end;
` 
const Content = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    margin-top: 70px;
    margin: auto;
` 
const ContainerFrom = styled.form`
    display: grid;
    grid-template: 1fr / 50% 50%;
    grid-gap: 5px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: row;
    &:first-child {
        display: flex;
     }

` 
const Text = styled.span`
    font-family: PFont-Regular;
    ${({ color }) => color && css`color: ${color};`}
    ${({ margin }) => margin && css`margin: ${margin};`}
     padding:0px 5px;
    ${({ size }) => size && css`font-size: ${size};`}
    border-right: 1px solid ${ PLColor };
    &:last-child {
        border-right: none;
    }
`
const ContainerPersonalInformation = styled.div`
    display: flex;
    height: 35px;
    justify-content: stretch;
    align-items: flex-end;
    margin: 15px 0px;
` 