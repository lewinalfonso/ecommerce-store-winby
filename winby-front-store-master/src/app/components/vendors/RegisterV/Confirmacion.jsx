import React from 'react'
import { PColor, PVColor, SFColor } from '../../../../assets/colors'
import Loading from '../../../common/Loading'
import { Container, BoxMessage, TitleConfirm } from '../Styled'

export default ({ state }) => <Container height='80vh'>
    {!!state.loading && <Loading />}
    <BoxMessage>
        <TitleConfirm color={PVColor} margin='20px 0' >¡Gracias por inscribirte!</TitleConfirm>
        <hr color={PColor} width='90% '/>
        <span style={{ color: SFColor }}>Confirmaremos la información y te contactaremos en 24 horas</span>
        <span style={{ color: PColor }}>Te llevaremos de vuelta a la tienda en <span>{state.timer}</span> segundos</span>
    </BoxMessage>
</Container>