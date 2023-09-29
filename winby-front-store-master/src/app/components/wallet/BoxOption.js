import React from 'react'
import styled from 'styled-components'
import { PColor } from '../../../assets/colors'
import BoxOptionW from './BoxOW'

export default () => <BoxOption>
    <BoxOptionW title="Mi Banco" left={false} />
    <BoxOptionW title="Estadisticas" />
    <BoxOptionW title="Retirar" />
    <BoxOptionW title="Soporte" />
    <BoxOptionW title="Perfil" right={true} />
</BoxOption>

const BoxOption = styled.div`
    background-color: ${ PColor };
    height: 80px;
    width: 80%;
    position: absolute;
    display: flex;
    flex-direction: row;
    bottom: 40px;
    border-radius: 20px;
    padding: 10px 30px;

    @media (max-width: 600px){
        display: none;
    }
`