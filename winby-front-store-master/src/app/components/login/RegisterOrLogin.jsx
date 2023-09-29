import React from 'react'
import styled from 'styled-components'
import { PLColor } from '../../../assets/colors'
import { IconUser } from '../../../assets/icons'
import { To } from '../../common/Buttons'
import { ShadowCard } from '../../common/ShadowCard'
export default ({ state }) => <Container>
    <ShadowCard maxWidth='1200px'>
        <Card>
            <IconBox><IconUser color='#555151' size={window.screen.width <= 600 ? '40px' : '70px' } /></IconBox>
            <H1>Bienvenido</H1>
            <Span>Para ofrecer tus productos en Winby regístrate y comienza a disfrutar de nuestros beneficios.</Span> <br />
            <ContentButton>
                <To to={state.code === 1 ? '/aliados/registro' : '/user/registro'}><Button color='#FFFFFF' backgroundColor='#C20202'>Soy nuevo</Button></To>
                {state.code === 1 ?
                    <Achor href='https://app.winby.co/'><Button color='#C20202' >Tengo cuenta</Button></Achor>
                    :
                    <To to={{ state: { cart: state.cartBack }, pathname: '/user/login' }}><Button color='#C20202' >Tengo cuenta</Button></To>
                }
            </ContentButton>
        </Card>
    </ShadowCard>
</Container>
const Container = styled.div`
    width: 90%;
    background-color: #EEEEEE;
    @media(max-width: 600px) {
        width: 100%;
        padding: 5px;
    }
`
const ContentButton = styled.div`
    display: flex;
    margin: 30px auto;
    width: 390px;
    @media(max-width: 600px) {
        width: auto;
        height: auto;
        flex-direction: row;
    }
`
const Card = styled.div`
    text-align: center;
    background-color: #FFFFFF;
    padding: 100px 10px;
    border-radius: 10px;
`
const IconBox = styled.div`
    width: 112px;
    height: 112px;
    display: flex;
    margin: 20px auto;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: ${ PLColor };
    @media(max-width: 600px) {
        width: 80px;
        display: flex;
        height: 80px;
        justify-content: center;
        align-items: center;
    }
`
const H1 = styled.h1`
    color: #2A2A2A;
    font-size: 30px;
    font-family: PFont-Bold;
    @media(max-width: 600px) {
        font-size: 16pt;
    }
    `
const Span = styled.span`
    font-size: 20px;
    font-family: PFont-Regular;
    color: #2A2A2A;
    @media(max-width: 600px) {
        font-size: 12pt;
        text-align: left;
        display: flex;
    }
`
const Button = styled.button`
    width: 90%;
    height: 52px;
    border: 1px solid #C20202;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    font-family: PFont-Bold;
    border-radius: 3px;
    color: ${({ color }) => color ? color : '#FFFFFF'};
    background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#FFFFFF'};
    @media(max-width: 768px){
        width: 80%;
        height: 30px;
        font-size: 12px;
    }
`
const Achor = styled.a`
    width: 100%;
    text-decoration: none;
`