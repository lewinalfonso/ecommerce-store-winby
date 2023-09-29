import React from 'react'
import { OptionsInput, Form } from './Styled'
import { CustomButton } from '../../common/Buttons'
import { Input } from '../../common/InputText'
import NewSelect from '../../common/NewSelect'
import { PColor, BGColor } from '../../../assets/colors'
import { connect } from 'react-redux'
import { numberFormat } from '../../utils'
const type = [
    { mr_type: 1, mr_name: 'Retiro' },
    { mr_type: 2, mr_name: 'Transferencia a terceros Winby' }
]

// Transacción financiera
const MoneyReport = ({ state, userbanks, onChangeSelect, onChangeInput, onSubmit }) => (
    <Form onSubmit={onSubmit}>
        <OptionsInput>
            <NewSelect options={(type || [])} optionName='mr_name' name='mr_type' id='mr_type' value={state.valuesForm.mr_type} title='Tipo de Operación' onChange={onChangeSelect} margin='10px 0' />
            {state.valuesForm.mr_type === 2 ?
                <Input type='email' title='Correo Electrónico' name='u_email' value={state.valuesForm.u_email} onChange={e => onChangeInput(e, true, false, false, true, 3, 50, true)} />
                :
                <NewSelect options={(userbanks?.data || [])} optionName='ube_alias' name='ube_id' id='ube_id' value={state.valuesForm.ube_id} title='Mi cuenta' onChange={onChangeSelect} margin='10px 0' />
            }
            <Input type='text' title='Monto a Transferir' name='um_money' value={numberFormat(state.valuesForm.um_money)} onChange={e => onChangeInput(e, true, false, true, true, 3, 20, false, true)} />
            <CustomButton type='submit' bgColor={PColor} color={BGColor} width='100px' self='flex-end' padding='5px 10px' justify='center'>Enviar</CustomButton>
        </OptionsInput>
    </Form>
)

export default connect(({ userbanks }) => ({ userbanks }), null)(MoneyReport)