import React from 'react'
import { PColor } from '../../../assets/colors'
import LogoWinby from '../../../assets/icons/logoWinby.svg'
import { H2, Paragraph, Forms, Row, Logo } from './Styled'
export default () => <Forms>
    <Row>
        <Logo height='400px' src={LogoWinby} />
        <H2 color={PColor}>BIENVENIDO A NUESTRA FAMILIA</H2>
        <Paragraph weight='500' align='center' maxWidth='850px' >Donde podrás aprender e iniciar tu primer Negocio Rentable vendiendo productos por internet de forma fácil, rápida y sin salir de casa.</Paragraph>
    </Row>
</Forms>