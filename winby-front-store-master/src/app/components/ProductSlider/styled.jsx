import styled, { css } from 'styled-components'
import { PColor, PLColor } from '../../../assets/colors'

export const Container = styled.div`
    display: flex;
    padding: 5px;
    margin: 0px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    line-height: 1;
    width: 100%;
    max-height: 500px;
    overflow: hidden;
    border: 1px solid rgb(238,238,238);

    @media(min-width: 768px) {
        border: none;
    }
`
export const ContainerSlider = styled.div`
    width: 80%;
`

/** Thumbs */
export const ThumbsContainer = styled.ul`
    display: none;
    padding: 0;    
    margin-right: 12px;
    list-style-type: none;
    overflow: hidden;
    height: 500px;
    @media (min-width: 850px){display: block;}
`
export const ThumbsItem = styled.li`
    border: 1px solid ${PLColor};
    padding: 5px 0px;
    ${({ active }) => active && css`border-left: 3px solid ${PColor};`}
    cursor: pointer;
    margin-bottom: 5px;
    &:hover {
        opacity: .5;
    }
`
export const ThumbsImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
`
export const ImageSlider = styled.img`
    height: 100%;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
`