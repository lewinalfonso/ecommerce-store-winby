import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PLColor } from '../../../assets/colors'

export const SliderItem = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 0 25px 0;
    justify-content: center;
    border-right: 1px solid ${ PLColor };
    @media(min-width: 768px) {
        border: none;
    }
`
export const Anchor = styled(Link)`
    text-decoration: none;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 10px 5px;
    @media(min-width: 768px){
        box-shadow: 0px 0px 6px #00000060;
    }
    @media(min-width: 768px){
        width: 110px;
        height: 110px;
    }
`
export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 5px;
`