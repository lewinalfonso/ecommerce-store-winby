import styled, { css } from 'styled-components'
import { SFColor, PLColor } from '../../../../assets/colors'

// tarjetas
export const CardItemContainer = styled.div`
    display: none;
    align-items: center;
    width: 100%;
    color: #CCC;

    &:hover{
        color: red;
    }

    &:first-child { 
        display: flex;
    }
    &:last-child { border-right: none; }
    
    @media(min-width: 768px){
        width: 25%;
        display: flex;
        border-right: 2px solid #a6a6a6;
        padding: 2px 10px;
    }
    & > svg{
        fill: red;
    }
`
export const ContainerTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media(min-width: 768px) {
        flex-direction: column;
    }
`
// Texto de items
export const ItemText = styled.span`
    display: block;
    color: ${props => props.color || SFColor};
    padding: 0 0 0 8px;
    ${props => props.flex && css`
        display: inline-flex;
        align-items: center;
    `};
    ${props => props.isTitle ? css`
        font-size: 14px;
        font-family: PFont-Regular;
        @media(min-width: 768px) {
            font-family: PFont-Bold;
        }
    ` : css`
        font-size: 14px;
        font-family: PFont-Regular;
        @media(min-width: 768px) {
            font-size: 12px;
        }
    `};
`
export const ListCard = styled.div`
    display: flex;
    cursor: pointer;
`
export const Box = styled.div`
    ${({ display }) => display && css`display: ${display};`}
    ${({ color }) => color && css`color: ${color};`}
    width: 100%;
    border-bottom: 1px solid ${PLColor};
    text-align: ${({ align }) => align ? align : 'center'};
    padding: 10px;
`
export const Column = styled.div`
    padding: ${({ padding }) => padding ? padding : '0 10px'};
    ${({ width }) => width && css`width: ${width};`}
    ${({ display }) => display && css`display: ${display};`}
    ${({ justify }) => justify && css`justify-content: ${justify};`}
`
export const SpanText = styled.span`
    width: 60%;
    font-weight: bold;
    text-align: justify;
    padding: ${({ padding }) => padding ? padding : '20px'};
`