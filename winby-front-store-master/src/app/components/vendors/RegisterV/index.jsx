import React from 'react'
import { BGColor, PColor, PVColor, SFColor } from '../../../../assets/colors'
import { CustomButton } from '../../../common/Buttons'
import Loading from '../../../common/Loading'
import { Box, Container, Span, Title, Form } from '../Styled'
import AccountInfo from './AccountInfo'
import Legal from './Legal'

export default ({ state, onChangeInput, onChangeSelect, onBlurInput, onChangeInputPhone, handleClickNew, handleSubmit, onChangeFile, onChangeFiletwo }) => <Container width={window.screen.width <= 768 ? '90%' : 'auto'}>
    {!!state.loading && <Loading/>}
    <Box height={state.form ? 'auto' : '250px'} width={state.form ? (window.screen.width <= 768 ? '95%' : '100%') : '330px'}>
        {!state.form ? <>
            <Title>Bienvenidos!</Title>
            <Span>Para iniciar, ingresa tu cuenta</Span>
            <CustomButton type='button' gradient={{ colorStart: PColor, colorEnd: PVColor }} padding='5px 10px' color={BGColor} width='80%' radius='5px' onClick={handleClickNew}>Soy nuevo</CustomButton>
            <a style={{ color: SFColor, margin: '10px', textDecoration: 'none' }} href='https://app.winby.co'>Tengo una cuenta</a>
        </>
            : <Form onSubmit={handleSubmit}>
                {(state.form === 1) ? <AccountInfo state={state} onChangeInput={onChangeInput} onChangeSelect={onChangeSelect} onBlurInput={onBlurInput} onChangeInputPhone={onChangeInputPhone} onChangeFile={onChangeFile}/> : <Legal state={state} onChangeInput={onChangeInput} onChangeSelect={onChangeSelect} onChangeInputPhone={onChangeInputPhone} onChangeFile={onChangeFile} onChangeFiletwo={onChangeFiletwo} handleClickNew={handleClickNew}/>}
            </Form>}
    </Box>
</Container>