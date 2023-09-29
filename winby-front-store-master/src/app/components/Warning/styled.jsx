import styled, { css, keyframes } from 'styled-components'
import { BGColor, PColor, PLColor, SFColor } from '../../../assets/colors'

const FadeInAnimation = keyframes`
    from { opacity: 0; z-index: -1;}
    to { opacity: 1; z-index: 999; }
`
const FadeOutAnimation = keyframes`
    from { opacity: 1; z-index: 999;}
    to { opacity: 0; z-index: -1; }
`
export const ContainerModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${ SFColor }aa;
    opacity: 0;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    animation-name: ${ ({ visible }) => visible ? FadeInAnimation : (visible !== 0 && FadeOutAnimation) };
    animation-duration: .10s;
    animation-fill-mode: forwards;
`
export const Content = styled.div`
    width: 400px;
    height: 250px;
    background-color: ${BGColor};
    border-radius: 18px;
    position: relative;
    top: 0px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    font-family: PFont-Bold;
    justify-content: space-between;
`
export const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    border-bottom: 1px solid ${PLColor};
`
export const Body = styled.div`
    padding: 10px 25px;
    text-align: ${({ messageCenter }) => messageCenter ? 'center' : 'justify'};
`
export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    height: 80px;
    bottom: 0;
`
export const Span = styled.span`
    ${({ family }) => family && css`font-family: ${family};`}
    font-size: ${({ size }) => size || '14px'};
`
export const Button = styled.button`
    padding: 7px 25px;
    border-radius: 5px;
    color: ${BGColor};
    font-size: 13px;
    outline: none;
    cursor: pointer;
    background-color: ${({ bgColor }) => bgColor || PColor};
    border: 1px solid ${({ bgColor }) => bgColor || PColor};
    &:hover {
        border: 1px solid ${PLColor};
    }
`
export const IconButton = styled.button`
    border-radius: 100%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${BGColor};
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    &:hover {
        background-color: ${PLColor};
    }
    &:hover  * {
        fill: white;
    }
`