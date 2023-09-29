import React from 'react'
import { OptionsInput, Form, BoxFlex } from './Styled'
import { CustomButton } from '../../common/Buttons'
import { Input, InputFile } from '../../common/InputText'
import NewSelect from '../../common/NewSelect'
import { PColor, BGColor } from '../../../assets/colors'
import { connect } from 'react-redux'

const type = [
    { ube_type: 1, name: 'Cuenta Bancaria' },
    { ube_type: 2, name: 'CritoMoneda' }
]

const RegisterAccount = ({ state, banks, accounts, cryptocurrencies, onChangeSelect, onChangeInput, onChangeFile, onSubmit, handleChange }) => (
    <OptionsInput>
        <Form onSubmit={onSubmit}>
            <NewSelect options={(type || [])} optionName='name' name='ube_type' id='ube_type' value={state.valuesForm.ube_type} title='Tipo' onChange={onChangeSelect} margin='20px 0' />
            <Input type='text' title='Nombre Identificador' name='ube_alias' value={state.valuesForm.ube_alias} onChange={e => onChangeInput(e, true, false, false, true, 3, 50)} />
            {state.valuesForm.ube_type === 1 && <>
                <NewSelect options={banks?.data || []} optionName='tb_name' name='tb_id' id='tb_id' value={state.valuesForm.tb_id} title='Tipo de Banco' onChange={onChangeSelect} margin='20px 0' />
                <NewSelect options={accounts?.data || []} optionName='at_name' name='at_id' id='at_id' value={state.valuesForm.at_id} title='Tipo de cuenta' onChange={onChangeSelect} margin='10px 0' />
                <Input type='text' title='Numero de Cuenta' name='ube_accNum' value={state.valuesForm.ube_accNum} onChange={e => onChangeInput(e, true, false, true, true, 3, 20)} marginD='20px 0' />
                <InputFile type='file' label='Certificado Bancario' name='ube_cerBank' active={state.valuesForm.ube_cerBank && PColor} onChange={onChangeFile} />
            </>}
            {state.valuesForm.ube_type === 2 && <>
                <NewSelect options={cryptocurrencies?.data || []} optionName='tc_name' name='tc_id' id='tc_id' value={state.valuesForm.tc_id} title='Tipo de cryptomoneda' onChange={onChangeSelect} margin='20px 0'/>
                <Input type='text' title='Ingrese su Hash' name='ube_hash' value={state.valuesForm.ube_hash} onChange={e => onChangeInput(e, true, false, false, true, 3, 200)}/>
            </>}
            <BoxFlex>
                <CustomButton type='button' onClick={() => handleChange()} bgColor='transparent' color={PColor} width='100px' margin='20px 10px' self='flex-end' padding='5px 10px' justify='center'>{'<'} Atrás</CustomButton>
                <CustomButton type='submit' disabled={state.loading} bgColor={PColor} color={BGColor} width='100px' margin='20px 10px' self='flex-end' padding='5px 10px' justify='center'>Enviar</CustomButton>
            </BoxFlex>
        </Form>
    </OptionsInput>
)

export default connect(({ banks, accounts, cryptocurrencies }) => ({ banks, accounts, cryptocurrencies }), null)(RegisterAccount)