import React from 'react';
import styled from 'styled-components';
import { Lateral } from './lateralInf'
import InputHooks from '../../common/InputHooks'
import { BGColor, PColor } from '../../../assets/colors';
import { Input } from '../../common/inputs';
import { CustomButton } from '../../common/Buttons';
export const Purchase =  ({ state, onChangeInput }) => (
    <Container>
     <Content>
        <Title>Completa los datos de envío y facturación</Title>
        <ContainerFrom>
            <Input name='up_last' title='NOmbre y Apellidos' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Tipo de documento' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Numero de documento' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='País' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Departamento' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Cuidad' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Codigo postal' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Punto de referencia (Opcional)' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputHooks name='up_last'  title='Barrio (Opcional)' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
        </ContainerFrom>
        <ContenBtn>
            <CustomButton  padding='8px' fontFamily='PFont-Regular' width='150px' fontSize='20px' radius='6px' margin='50px 0px' bgColor={ PColor } color={ BGColor } >Continuar</CustomButton>
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
    margin: auto;
    margin-top: 70px;

` 
const ContainerFrom = styled.form`
    background-color: ${ BGColor };
    padding: 30px;
    display: grid;
    grid-template: 1fr / 50% 50%;
    grid-gap: 5px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: row;

` 
const Title = styled.h4`
    font-size: 17px;
    font-family: PFont-Regular;
    margin: 0px 0px 40px 10px;
` 
