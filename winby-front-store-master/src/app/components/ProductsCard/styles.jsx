import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { PLColor, SFColor, PLVColor } from '../../../assets/colors'

export const SliderItem = styled.div`
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
`
export const Line = styled.div`
    display: none;
    background-color: ${PLVColor};
    width: 95%;
    height: 1px;
    margin: auto;
`
export const Anchor = styled(Link)`
    text-decoration: none;
    display: flex;
    position: relative;
    width: 100%;
    height: 140px;
    border-top: 1px solid ${PLVColor};
    padding: 10px 2px;
    margin: 4px auto;

    
    @media(min-width: 768px){
        ${props => !props.movilmode && css`
            &:hover span, &:hover > div, &:hover ${Line} {
                display: block;
            }
            display: inline-block;
            width: 185px;
            height: 230px;
            border: none;
            padding: 0;
            margin: auto;
        `}
    }
`
export const Image = styled.img`
    width: 130px;
    min-width: 130px;
    height: 115px;
    object-fit: cover;

    @media(min-width: 600px) {
        ${props => !props.movilmode && css`
            width: 100%;
            height: 180px;
        `}
    }
`
export const DescriptionContainer = styled.div`
    position: static;
    text-align: center;
    overflow: hidden;
    width: 100%;
    color: ${SFColor};
    margin-left: 8px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media(min-width: 600px){
        ${props => !props.movilmode && css`
            padding: 0;
            position: absolute;
            top: 180px;
            left: 0px;
            margin-left: 0;
            background-color: ${PLColor};
        `}
    }
`
export const ContainerMovilInfo = styled.div`
   display: flex;
   flex-direction: row;

    @media(min-width: 768px){
        ${props => !props.movilmode && css`
            display: none;
        `}
    }
`
export const TitleCategory = styled.span`
    font-size: 14px;
    text-transform: uppercase;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    text-align: left;
    font-family: PFont-Regular;
    width: 100%;
    display: block;

    @media(min-width: 600px){
        ${props => !props.movilmode && css`
            text-align: center;
            padding: 4px;
            display: none;
            font-size: 13px;
        `}
    }
`
export const FreeContainer = styled.div`
    display: inline-block;
    @media(min-width: 768px) {
        ${props => !props.movilmode && css`
            display: none;
        `}
    }
`
export const Price = styled.h4`
    font-family: PFont-Regular;
    margin: 0;
    width: 101%;
    font-size: 16px;
    text-align: left;

    @media(min-width: 768px){
        ${props => !props.movilmode && css`
            text-align: center;
            font-size: 14px;
        `}
    }
`
export const SpanText = styled.span`
    display: flex;
    align-items: center;
    font-family: PFont-Regular;
    margin: 0;
    width: 100%;
    font-size: ${props => props.fontSize || '14px'};
    text-align: left;

    @media(min-width: 768px){
        text-align: center;
        font-size: 14px;
    }
`
export const IconActions = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 5px;
    right: 5px;
    display: none;
`
export const ButtonIcon = styled.button`
    margin: 2px;
    width: 20px;
    height: 20px;
    padding: 2px;
    border: 1px solid ${SFColor};
    border-radius: 50%;
    background-color: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    & > svg { pointer-events: none; }
    &:active { opacity: .5; }
`