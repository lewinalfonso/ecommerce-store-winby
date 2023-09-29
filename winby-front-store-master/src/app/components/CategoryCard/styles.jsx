import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BGVColor, PLColor, SFColor } from '../../../assets/colors'

export const SliderItem = styled.div`
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
`

export const Anchor = styled(Link)`
    font-family: PFont-Regular;
    font-size: 13px;
    text-decoration: none;
    display: inline-block;
    position: relative;
    width: 100px;
    height: 110px;
    @media(min-width: 768px){
        width: 100%;
        height: ${props => props.height ? props.height : '30px'};
    }
    &:hover{
        color: ${BGVColor};
    }
`
export const AnchorCategory = styled(Link)`
    text-decoration: none;
    display: inline-block;
    position: relative;
    width: 100px;
    height: 110px;
    @media(min-width: 768px){
        width: 185px;
        height: 185px;
    }
`

export const WrapperCategory = styled.div`
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 100px;
    height: 110px;
    @media(min-width: 768px){
        width: 185px;
        height: 185px;
    }
`
export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
export const TitleCategory = styled.h4`
    font-size: 11px;
    font-family: PFont-Regular;
    background-color: ${PLColor};
    padding: 4px;
    margin: 0;
    position: absolute;
    bottom: -1px;
    left: -1px;
    width: 101%;
    color: ${SFColor};
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media(min-width: 768px){
        font-size: 14px;
    }
`