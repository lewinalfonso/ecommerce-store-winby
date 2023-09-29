import React from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { FlexBox, H2, Container, Box, Form, Span } from './Styled'
import { Input, InputPhone } from '../../common/inputs'
import { CustomButton } from '../../common/Buttons'
import Loading from '../../common/Loading'
import NewSelect from '../../common/NewSelect'

export default ({ state, onChangeSelect, onChangeInput, onChangeInputPhone, handleSubmit }) => <Container>
    {!!state.loading && <Loading />}
    <Box height='auto'>
        <Form method='POST' onSubmit={handleSubmit}>
            <H2>Registro de licencia</H2>
            <FlexBox>
                <Input type='text' name='up_name' title='Nombre Completo' value={state.values.up_name} onChange={e => onChangeInput(e, true, true, false, true, 2, 30)} disabled={!!state.disabled?.up_name} widthD='48%' />
                <Input type='text' name='up_last' title='Apellido Completo' value={state.values.up_last} onChange={e => onChangeInput(e, true, true, false, true, 2, 30)} disabled={!!state.disabled?.up_last} widthD='48%' />
            </FlexBox>
            <FlexBox>
                <InputPhone name='u_phoNum' value={state.values.u_phoNum} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} disabled={!!state.disabled?.u_phoNum} marginD='20px 0' widthD='48%' />
                <Input type='text' name='u_email' title='Correo electrónico' value={state.values.u_email} onChange={e => onChangeInput(e, true, false, false, true, 3, 50, true)} disabled={!!state.disabled?.u_email} widthD='48%' />
            </FlexBox>
            <FlexBox>
                <NewSelect id='c_id' options={state.countries || []} name='c_id' optionName='c_name' value={state.values.c_id} search title='Seleccione Pais' onChange={onChangeSelect} disabled={!!state.disabled?.c_id} width='48%' margin='0' />
                <NewSelect id='d_id' options={state.departments || []} name='d_id' optionName='d_name' value={state.values.d_id} search title='Seleccione un Departamento' onChange={onChangeSelect} disabled={!(!!state.disabled?.d_id || !!state.values.c_id)} width='48%' margin='0' />
            </FlexBox>
            <FlexBox>
                <NewSelect id='m_id' options={state.municipalities || []} name='m_id' optionName='m_name' value={state.values.m_id} search title='Seleccione un Municipio' onChange={onChangeSelect} disabled={!(!!state.disabled?.m_id || !!state.values.d_id)} width='48%' />
                <Input type='text' name='up_code' title='Código' value={state.values.up_code} onChange={e => onChangeInput(e, true, false, false, false, 3, 50)} widthD='48%' />
            </FlexBox>
            <FlexBox>
                <Span width='60%'>Referido por: <Span color={PColor}>{state.code}</Span>.<br /><br />Al hacer click en 'Registrar'. Usted está aceptando las condiciones y confirma que ha leído nuestas políticas.</Span>
                <CustomButton type='submit' disabled={state.loading} responsive bgColor={PColor} color={BGColor} padding='4px 50px' margin='10px 0 5px'>Confirmar</CustomButton>
            </FlexBox>
        </Form>
    </Box>
</Container>