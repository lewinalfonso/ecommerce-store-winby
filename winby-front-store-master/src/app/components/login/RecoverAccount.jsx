import React from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { Title, Container, Box, Form, FormText } from './Styled'
import { Input } from '../../common/inputs'
import { CustomButton, To } from '../../common/Buttons'
import Loading from '../../common/Loading'

export default ({ state, onChangeInput, handleSubmit }) => <Container>
    {!!state.loading && <Loading />}
    <Box height='auto'>
        <Form method='POST' onSubmit={e => handleSubmit(e, state.form)} padding='40px 30px'>
            <Title textAlign='center' fontSize='18px' margin='0 auto 20px' fontFamily='PFont-Regular' noUppercase={true}>{ state.form === 1 ? 'Recuperación de Contraseña' : state.form === 2 ? 'Ingresa el código' : 'Cambio de contraseña' }</Title>
            { state.form === 1 && <Input type='email' name='u_email' title='e-mail' value={state.values.u_email} onChange={e => onChangeInput(e, true, false, false, false, 0, 0, true)} />}
            { state.form === 2 && <>
                <FormText>Hemos enviado un codigo de verificación a tu correo. Por favor revisa e ingresa el código aquí.</FormText>
                <Input type='text' name='u_token' title='Código de verificación' value={state.values.u_token} onChange={e => onChangeInput(e, true, false, true, true, 1, 6)} />
            </>}
            { state.form === 3 && <>
                <Input type='password' name='u_pass' title='Nueva contraseña' value={state.values.u_pass} onChange={e => onChangeInput(e, true, false, false, true, 6, 16)} />
                <Input type='password' name='u_passConf' title='Confirmar contrseña' value={state.values.u_passConf} onChange={e => onChangeInput(e, true, false, false, true, 6, 16)} />
            </>}
            <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding='10px 50px' margin='30px 0 5px'>{state.form === 1 ? 'Enviar' : state.form === 2 ? 'Confirmar' : 'Guardar'}</CustomButton>
            <To to='/user/login'><CustomButton width='100%' bgColor='transparent' padding='20px 0 0' color={PColor} margin='0 0 10px'>Inicia sesión</CustomButton></To>
        </Form>
    </Box>
</Container>