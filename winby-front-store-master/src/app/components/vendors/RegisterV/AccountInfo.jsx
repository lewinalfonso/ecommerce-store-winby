import React from 'react'
import { PColor } from '../../../../assets/colors'
import { IconPlus } from '../../../../assets/icons'
import { CustomButton } from '../../../common/Buttons'
import NewSelect from '../../../common/NewSelect'
import { InputPhone, FileInput, Input } from '../../../common/inputs'
import { numberFormat } from '../../../utils'
import { Span, FlexBox, Title, BoxLogo, BoxIcon } from '../Styled'

export default ({ state, onChangeInput, onChangeSelect, onBlurInput, onChangeInputPhone, onChangeFile }) => <>
    <Title textAlign='center'>Crea tu cuenta</Title>
    <Span textAlign='center'>Registra tu empresa</Span>
    <BoxLogo bgImage={state.v_logoUri}>
        {!state.v_logoUri && <BoxIcon><IconPlus color={PColor} size={15} /></BoxIcon>}
        <FileInput type='file' accept='image/x-png, image/gif, image/jpeg, image/jpg' onChange={e => onChangeFile(e, 1)} />
    </BoxLogo>
    <Span textAlign='center' color={PColor} margin='10px 0 20px'>LOGO o PERFIL</Span>
    <Input type='text' name='v_alias' title='Nombre de tu comercio' value={state.values.v_alias} onChange={e => onChangeInput(e, true, false, false, true, 3, 30)} marginD='20px 0' />
    <Input type='email' name='u_email' disabled={state.disabled.u_email} title='Correo electrónico' value={state.values.u_email} onChange={e => onChangeInput(e, true, false, false, true, 3, 50, true)} marginD='20px 0' />
    <InputPhone disabled={state.disabled.u_phoNum} value={state.values.u_phoNum} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='u_phoNum' marginD='20px 0' />
    {!state.values.u_id && <>
        <Input type='password' name='u_pass' title='Contraseña' onBlur={() => onBlurInput(1)} value={state.values.u_pass} onChange={e => onChangeInput(e, true, false, false, true, 3, 30)} marginD='20px 0' />
        <Input type='password' name='u_conPass' title='Confirmar contraseña' onBlur={() => onBlurInput(1)} value={state.values.u_conPass} onChange={e => onChangeInput(e, true, false, false, true, 3, 30)} marginD='20px 0' />
    </>}
    <NewSelect id='tp_id' options={state.typePersons || []} name='tp_id' optionName='tp_name' value={state.values.tp_id} title='Seleccione tipo de persona' onChange={onChangeSelect} />
    {state.values.tp_id === 1 ? <Input type='text' name='v_ideNum' title='Número de Identificación' value={numberFormat(state.values.v_ideNum)} onChange={e => onChangeInput(e, true, false, true, true, 3, 30, false, true)} /> : <FlexBox>
        <Input type='text' name='v_nit' marginD='0 0 10px' widthD='70%' minWidth='auto' title='NIT' value={numberFormat(state.values.v_nit)} onChange={e => onChangeInput(e, true, false, true, true, 3, 30, false, true)} onBlur={() => !!state.values.v_nit && onBlurInput(2)} />
        <Input type='text' name='v_dv' marginD='0 0 10px' widthD='20%' minWidth='auto' title='DV' value={state.values.v_dv} onChange={e => e} disabled dataIgnore='true' />
    </FlexBox>}
    {state.values.tp_id === 1 ? <FlexBox>
        <Input type='text' widthD='45%' name='v_name' minWidth='auto' title='Nombre Completo' value={state.values.v_name} onChange={e => onChangeInput(e, true, true, false, true, 3, 30)} />
        <Input type='text' widthD='45%' name='v_last' minWidth='auto' title='Apellido Completo' value={state.values.v_last} onChange={e => onChangeInput(e, true, true, false, true, 3, 30)} />
    </FlexBox> : <Input type='text' name='v_business' title='Razón Social' value={state.values.v_business} onChange={e => onChangeInput(e, true, false, false, true, 3, 50)} />}

    <CustomButton width='100%' bgColor='transparent' padding='20px 0 0' color={PColor}>Siguiente  {'>'}</CustomButton>
</>