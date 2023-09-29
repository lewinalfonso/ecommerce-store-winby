import React from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { Title, Container, Box, Form } from './Styled'
import { InputPhone, Input } from '../../common/inputs'
import { CustomButton, To } from '../../common/Buttons'
import Loading from '../../common/Loading'
// import MetaTags from 'react-meta-tags'

export default ({ state, onChangeInput, onChangeInputPhone, handleSubmit, handleSee }) => <Container>
    {!!state.loading && <Loading />}
    {/* <MetaTags>
        <title>Inicio de Sesión - Winby</title>
        <meta name="description" content="Inicio de sesión para la compra en la tienda winby." />
        <meta property="og:title" content="Inicio Sesión Winby" />
        <meta property="og:image" content="https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        <meta property="og:url" content="https://a2fab5a9728d.ngrok.io/user/login" />
    </MetaTags> */}
    <Box height='auto'>
        <Form method='POST' onSubmit={handleSubmit}>
            <Title textAlign='center'>Iniciar Sesión</Title>
            <InputPhone value={state.values.u_phoNum} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='u_phoNum' />
            <Input type='password' name='u_pass' title='Contraseña' value={state.values.u_pass} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            <CustomButton fontFamily='PFont-Bold' height='48px' width={window.screen.width <= 768 ? '100%' : 'auto'} disabled={state.loading} fontSize='16px' type='submit' bgColor={PColor}  color={BGColor}  radius='6px' padding='10px 50px' margin='10px 0 5px'>Iniciar</CustomButton>
        </Form>
        <To to='/user/recuperar-cuenta'><CustomButton width='100%' bgColor='transparent' padding='20px 0 0' color={PColor} margin='0 0 10px'>Olvidé mi contraseña</CustomButton></To>
        <To to='/user/registro'><CustomButton width='100%' bgColor='transparent' padding='20px 0 0' color={PColor} margin='0 0 10px'>No tengo cuenta</CustomButton></To>
    </Box>
</Container>