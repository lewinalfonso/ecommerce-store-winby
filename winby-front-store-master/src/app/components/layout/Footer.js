import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { BGVColor } from '../../../assets/colors'
import { IconArrowTop } from '../../../assets/icons'
import { ShadowCard } from '../../common/ShadowCard/index'

export default () => {
    const [year, setYear] = useState(false)

    useEffect(() => {
        const fecha = new Date()
        setYear(fecha.getFullYear())
    }, [])

    const onClickTop = e => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Footer>
            <Container>
                <ShadowCard>
                    <ContainerBtnTop border={window.location.pathname === '/' ? true : false}>
                        {
                            window.location.pathname === '/'
                                ? <BtnTop onClick={onClickTop}>VOLVER A INICIO {window.screen.width > 768 ? <IconArrowTop size='10px' /> : ''}</BtnTop>
                                : <Enlace to='/'>VOLVER A INICIO {window.screen.width > 768 ? <IconArrowTop size='10px' /> : ''}</Enlace>
                        }
                    </ContainerBtnTop>
                    <Row>
                        <Enlace to='/pagina-informacion/' target='_blank' color={BGVColor} width='auto'>Trabaja con nosotros</Enlace>
                        <Enlace to='/terminos-condiciones' responsive='true' color={BGVColor} width='auto'>Términos y condiciones</Enlace>
                        <Enlace to='/politicas-de-proteccion-de-datos' responsive='true' color={BGVColor} width='auto' >Política de privacidad</Enlace>
                        <Enlace to='/contactos' responsive='true' color={BGVColor} width='auto'>Contáctanos</Enlace>
                        <Enlace to='/ayuda/pqr' responsive='true' color={BGVColor} width='auto' padding='5px 55px' >Ayuda PQR</Enlace>
                    </Row>
                </ShadowCard>
            </Container>
            <Terms>
                <Title>© {!!year && year} Todos los derechos reservados, Winby®</Title>
                <Iconlogo>© {!!year && year} Todos los derechos reservados, Winby®</Iconlogo>
                <Hr bgColor='#EEEEEE' margin='30px' />
            </Terms>
        </Footer>
    )
}
const BtnTop = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    background-color: transparent;
    font-family: PFont-Bold;
    @media(max-width: 768px){
        font-size: 12px;

    }
`
const Title = styled.span`
    position: absolute;
    background-color: #EEEEEE;
    font-size: 13px;
    color: ${BGVColor};
    font-family: Tahoma;
    top: -5px;
    padding: 0px 40px;
    font-weight: 400;
    @media(max-width: 768px){
       display: none;
    }
`

const Iconlogo = styled.span`
    display: none;

    @media(max-width: 768px){
    position: absolute;
    background-color: #EEEEEE;
    top: -8px;
    padding: 0px 10px;
    display: block;
    font-size: 10px;
    }
`
const Row = styled.div`
    display: flex;
    border-radius: 20px;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;

    @media(max-width: 768px){
        flex-direction: column;
        text-align: center;
        padding: 0 0 20px;


    }
`

const ContainerBtnTop = styled.div`
    border-bottom: ${({ border }) => border ? '1px solid #dcdcdc' : 'none'};
    padding: 5px 0 10px;
    display: flex;
   justify-content: center;


`
const Footer = styled.footer`
    background-color: #EEEEEE;
    border-bottom: 1px solid ${BGVColor}aa;
    
`
const Hr = styled.hr`
    height: 1px;
    ${({ margin }) => margin && css`margin: ${margin};`}
    color: ${BGVColor}aa;
    @media(max-width: 768px){
        height: 2px;
        margin: 15px;
    }

`
const Terms = styled.div`
    position: relative;
    margin-top: 30px;
    display: flex;
    border-top: 1px solid #dcdcdc;
    justify-content: center;

`
const Container = styled.div`
    @media(min-width: 768px){
        max-width: 1200px;
        margin: auto;
        display: flex;
    }

`
export const Enlace = styled(Link)`
    font-family: Pfont-bold;
    text-align: center;
    padding: ${({ padding }) => padding ? padding : '5px 30px 5px 55px'};

    font-size: 14px;
    text-decoration: none;
    width: auto;
    color: ${BGVColor};
    border-left: 1px solid ${BGVColor}aa;
    &:first-child {
        border-left: none;

    }
    @media(max-width: 768px){
        border-bottom: 1px solid #dcdcdc;
        border-left: none;
        width: 100%;
        padding: 18px; 
        font-size: 12px;
    }
`