import styled from 'styled-components'
import { PLColor } from '../../../assets/colors'

export const Card = styled.div`
    display: grid;
    grid-template-columns: ${props => props.horizontal ? '1fr' : '1fr 1fr'};
    grid-template-rows: .5fr .5fr;
    width: 100%;
    grid-gap: 15px;
    height: 450px;
    padding: 10px 5px;

    @media(min-width: 768px){
        height: 850px;
    }
`
export const Img = styled.img`
    display: inline-block;
    height: 200px;
    width: 100%;
    object-fit: contain;
    background-color: ${ PLColor }45;

    @media(min-width: 768px){
        height: 350px;
    }
`