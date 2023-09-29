import React from 'react'
import styled, { css } from 'styled-components'
import { InputText, InputTextPhone } from '../../common/inputs'
import { BGColor, PColor, EColor, SFColor } from '../../../assets/colors'
import { CustomButton } from '../../common/Buttons'
import CustomSelect from '../../common/CustomSelect'

export default ({ state, onChangeInput, onChangeInputPhone, onChangeSelect, onSubmit, onBlurConf }) =>
  <FormContainer onSubmit={onSubmit}>
    <H1>Regístrate</H1>
    <br />
    <Box style={{ flex: 1, direction: 'column', justify: 'space-between' }}>
      <InputContainer>
        <CustomSelect
          id='tp_id'
          styleSelect={{ radius: '0' }}
          options={state.typePersons}
          name='tp_id'
          optionName='tp_name'
          value={state.values.tp_id}
          title='Seleccione tipo de persona'
          onChange={onChangeSelect}
          errorColor={EColor}
        />
        {state.values.tp_id === 1
          ? <InputText label='Documento de Identidad' name='v_ideNum' radius='0' onChange={e => onChangeInput(e, true, false, true, true, 2, 15)} value={state.values.v_ideNum} errorColor={EColor} />
          : <>
            <InputText label='NIT' name='v_nit' radius='0' onChange={e => onChangeInput(e, true, false, true, true, 2, 30)} value={state.values.v_nit} errorColor={EColor} />
            <InputText label='NIT' name='v_dv' radius='0' disabled onChange={e => onChangeInput(e, true, false, true, true, 2, 30)} value={state.values.v_dv} errorColor={EColor} />
            </>}
      </InputContainer>
      <InputContainer>
        {state.values.tp_id === 1
          ? <>
            <InputText label='Nombre' name='v_name' radius='0' onChange={e => onChangeInput(e, true, true, false, true, 2, 30)} value={state.values.v_name} errorColor={EColor} />
            <InputText label='Apellido' name='v_last' radius='0' onChange={e => onChangeInput(e, true, true, false, true, 2, 30)} value={state.values.v_last} errorColor={EColor} />
            </>
          : <InputText label='Razón Social' name='v_business' radius='0' onChange={e => onChangeInput(e, true, false, false, true, 2, 50)} value={state.values.v_business} errorColor={EColor} />}

      </InputContainer>
      <InputContainer>
        <InputTextPhone inputStyle={{ borderRadius: 0, width: '100%' }} value={state.values.u_phoNum} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='u_phoNum' errorColor={EColor} />
        <InputText label='Email' name='u_email' radius='0' onChange={e => onChangeInput(e, true, false, false, true, 5, 50, true)} value={state.values.u_email} errorColor={EColor} />
      </InputContainer>
      <InputContainer>
        <InputText type='password' label='Contraseña' name='u_pass' radius='0' onChange={e => onChangeInput(e, true, false, false, true, 4, 30)} value={state.values.u_pass} errorColor={EColor} />
        <InputText type='password' label='Confirmar Contraseña' name='u_passConf' onBlur={onBlurConf} radius='0' onChange={e => onChangeInput(e, true, false, false, true, 4, 30)} value={state.values.u_passConf} errorColor={EColor} />
      </InputContainer>
    </Box>

    <Row>
      <FooterForm>
        <SpanText color={BGColor} weight='300'>Al hacer click en 'Registrar'. Usted está aceptando las condiciones y confirma que ha leído nuestas políticas.</SpanText>
      </FooterForm>
      <FooterForm justify='flex-end' align='flex-end'>
        <CustomButton type='submit' disabled={state.loading} responsive bgColor={PColor} color={BGColor} padding='10px' width='40%' radius='15px' border={`1px solid ${BGColor}`}>
          Registrar
        </CustomButton>
      </FooterForm>
    </Row>
  </FormContainer>

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-shadow: 0 0 5px 1px #55555555;
    width: 80%;
    border-radius: 15px;
    margin: 20px 0;
    background-color: ${BGColor};
    
    @media (max-width: 900px){
        width: 100%;
        padding: 20px;
    }
`

const InputContainer = styled.div`
    width: 100%;
    flex: 1;
    display: flex;

    @media (max-width: 550px){
        flex-wrap: wrap;
    }
`

const FooterForm = styled.div`
    display: flex;
    flex: .48;
    padding: 40px 10px 10px 5px;
    ${({ justify }) => css`justify-content: ${justify};`}
    ${({ align }) => css`align-items: ${align};`}

    @media (max-width: 550px){
        flex: 1;
    }
`
const Row = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 550px){
        flex-direction: column;
    }
`
const SpanText = styled.div``

const Box = styled.div``

const H1 = styled.h1`
    font-size: 24px;
    color: ${SFColor};
    font-weight: bold;
`
