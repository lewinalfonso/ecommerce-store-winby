import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BGColor, PColor } from '../../../assets/colors'

export const SideBarLeft = styled.div`
    width: 100%;
    margin-bottom: 2em;
    background-color: ${ BGColor };
    justify-self: flex-start;
`
export const BoxSideBar = styled.aside`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
export const IMG = styled.img`
    width: 100%;
`
export const MenuLeft = styled.div`
    width: 100%;
    height: ${({ height }) => height ? height : 'auto'}px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    padding: 0;
    position: relative;
    background-color: ${({ active }) => active ? '#EEEEEE;' : `${BGColor}`};
    align-self: ${({ alignSelf }) => alignSelf || 'auto'};
    & > div:first-child { pointer-events: none; }
    transition: .4s;
    overflow: hidden;
    border-bottom: 1px solid #E3E1E1;
`
export const Row = styled.div`
    display: flex;
    background-color: ${({ active }) => active ? `${BGColor}` : `${BGColor}`};
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 20px 15px;
    position: relative;
    z-index: 10;
    &:hover{
        background-color: #f0f0f0;
    }
`
export const LinkOption = styled(Link)`
    display: block;
    color: ${PColor};
    text-decoration: none;
    font-size: 14px;
    padding: 5px 10px;
    text-align: left;
`
export const Span = styled.span`
    display: inline-block;
    margin-left: 1em;
`
export const OptionMenu = styled.div`
    width: 100%;
    display: block;
    overflow: auto;
    width: 100%;
    overflow: hidden;
    padding: 0 10px 10px;
`
export const Box = styled.div`

`