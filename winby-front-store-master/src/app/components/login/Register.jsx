import React from 'react'
import { APColor, BGColor, PColor } from '../../../assets/colors'
import { Title, Container, Box, Form } from './Styled'
import { Input, InputPhone } from '../../common/inputs'
import { CustomButton, To } from '../../common/Buttons'
import Loading from '../../common/Loading'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { Text } from '../shoppingCart/Styled'
import { Link } from 'react-router-dom'

const TEST_SITE_KEY = '6LdwBTgaAAAAAGS5R79USpNQVE2RQiNqgbfbnzPR';
export default ({ state, onChangeInput, onChangeCheck, onChangeInputPhone, handleSubmit, onBlurInput, handleRecaptcha, handleTerms }) => <Container>
    {!!state.loading && <Loading />}
    <Box height='auto'>
        <Form method='POST' onSubmit={handleSubmit}>
            <Title textAlign='center'>Registrarse</Title>
            <Input /* name='u_conPas' */ name='up_name' title='Nombres' onBlur={onBlurInput} value={state.values.up_name} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <Input name='up_last' title='Apellidos' onBlur={onBlurInput} value={state.values.up_last} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <InputPhone value={state.values.u_phoNum} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='u_phoNum' />
            <Input type='text' name='u_email' title='Correo electrónico' value={state.values.u_email} onChange={e => onChangeInput(e, true, false, false, true, 3, 50, true)} />
            <Input type='password' name='u_pass' title='Contraseña' onBlur={onBlurInput} value={state.values.u_pass} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <BoxFlx onChange={handleTerms}>
                <ImputCheckBox data-ignore='true' type='checkbox' name='terCon' checked={state.terCon || ''} onChange={onChangeCheck} />
                <Text fontSize='11px' whiteSpace='none'>Acepto los &nbsp;<Terms target='_blank' to='/terminos-condiciones' >términos y condiciones</Terms></Text>
            </BoxFlx>
            <ContainerCP><ReCAPTCHA id='g-recaptcha-response' name='recaptcha' autoComplete='recaptcha' sitekey={TEST_SITE_KEY} onChange={handleRecaptcha} /></ContainerCP>
            <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding='4px 50px' margin='10px 0 5px'>Registrarse</CustomButton>
        </Form>
        <To to={{ state: { cart: state.cartBack }, pathname: '/user/login' }}><CustomButton width='100%' bgColor='transparent' padding='20px 0 0' color={PColor} margin='0 0 10px'>Ya tengo cuenta</CustomButton></To>
    </Box>
</Container>

const ContainerCP = styled.div`
    width: 95%;
    margin: 10px auto;
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    text-align: center;
`
const ImputCheckBox = styled.input`
    width: 15px;
    height: 15px;
    margin-top: 6px;
    margin-right: 10px;
    padding: 30px;
    background-color: #eee;
    cursor: pointer;
`
const BoxFlx = styled.div`
    display: flex;
    cursor: pointer;
`
const Terms = styled(Link)`
    text-decoration: none;
    font-size: 11px;
    color: ${ APColor };
`