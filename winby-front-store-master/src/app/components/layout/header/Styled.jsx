import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { PColor, BGColor, BGVColor } from '../../../../assets/colors'
import { animFirst } from '../../../common/Animations'

export const Header = styled.header`
    position: fixed;
    background-color: ${BGColor};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 4px solid ${PColor};
    z-index: 99999;
    height: 100px;
    @media(max-width: 1024px){
        height: 50px;
    }
`
export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: ${({ flex }) => flex ? flex : 'row'};
    align-items: center;
    width: 100%;
    max-width: 1200px;
    @media(min-width: 1024px){
        & > div:nth-child(1) {flex: .3; }
        & > div:nth-child(2) {flex: .7; }
        & > div:nth-child(3) {flex: .3; }
    }
    @media(max-width: 1024px){
        & > div:nth-child(1) {flex: .1; padding: 0px; width: 20%; justify-content: start }
        & > div:nth-child(2) {flex: .7; padding: 0px; width: 60%; }
        & > div:nth-child(3) {flex: .3; padding: 0px; }
    }
`
export const ResponsiveView = styled.div`
    @media(max-width: ${({ rv }) => rv}){
        display: none;
    }
`
export const Logo = styled.div`
    @media(max-width: 1024px ){
        display: none;
    }
`
export const Location = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    cursor: pointer;
    @media(max-width: 1024px ){
        display: none;
    }
`
export const Span = styled.span`
    user-select: none;
    font-size: ${({ size }) => size ? size : '11px'};
    ${({ bold }) => bold && css`font-weight: bold;`};
    ${props => props.break && css`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    `}; 
`
export const ShoppingContainer = styled.div`   
    right: 0;
    width: 30px;
    position: absolute;
`
export const ShoppingCount = styled.div`   
    position: absolute;
    left: 2px;
    user-select: none;
    top: 0px;
    margin: auto;
    width: 100%;
    color: ${BGVColor};
    @media(max-width: 1000px){
        left: 2.5px;
        font-size: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
    }
`
export const Flex = styled.div`
    position: relative;
    background-color: transparent ;   
    display: flex;
    width: 100%;
    align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    align-items: center;
    justify-content: ${({ justify }) => justify || 'center'};
    flex-direction: ${({ direction }) => direction || 'column'};
    max-width: ${({ maxWidth }) => maxWidth ? maxWidth : '130px'};
    @media (min-width: 600px){
        cursor: pointer;
        ${({ marginTop }) => !!marginTop && css`margin-top: ${marginTop};`}
    }
    ${({ hiddenBox }) => !!hiddenBox && css`
        display: none;
        @media(min-width: 1024px){
            display: flex;
        }
    ` }
    ${({ responsive }) => responsive && css`
        @media(max-width: 1024px ){
            display: none;
        }
    ;`}
    
    ${({ animation }) => !!animation && css`
        opacity: 0;
        animation: ${animFirst} 1s;
        animation-fill-mode: forwards;
        animation-delay: ${({ count }) => count}s;
        transform: translate3d(0, 3000px, 0) scaleY(5);
    ` }
`
/// sub header
export const Row = styled.div`
    ${({ display }) => display && css`display: ${display};`}
    flex: ${({ flex }) => flex};
    flex-direction: ${({ direction }) => direction || 'row'};
    align-items: center;
    justify-content: ${({ justify }) => justify || 'center'};
`
export const MenuContainer = styled.div`
    @media(min-width: 1024px){
        display: none;
    }
`
const bounceInDown = keyframes`
from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
}

to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}
`
const bounceOutUp = keyframes`
from {
opacity: 1;
}

to {
opacity: 0;
-webkit-transform: translate3d(0, -100%, 0);
transform: translate3d(0, -100%, 0);
}
`
export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin: auto;
    min-height: 28px;
    @media(max-width: 1024px){
        animation: ${({ active }) => active ? bounceInDown : bounceOutUp} forwards;
        animation-duration: ${({ active }) => active ? '0s' : ' 0s '};
        overflow: hidden;
        transition: 4s linear all;
    }
    @media(max-width: 1024px){
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        padding: 15px 5px;
        height: 45px;
        background: #FFFFFF;
        z-index: 3;
    }
`
export const ButtonSearch = styled.button`
    display: none;
    position: absolute;
    right: 0px;
    padding: 3px;
    outline: none;
    border: none;
    margin: 0;
    cursor: pointer;
    z-index: 2;
    @media (min-width: 1024px){ 
        background-color: ${PColor}; 
        display: block;
     }
    ${({ responsive }) => responsive && css`
        @media (max-width: 1024px){
            display: block; 
            right: 30px;
        }
        @media (min-width: 1024px){ display: none; }
    `}
`
export const InputText = styled.input`
    border: none;
    outline: none;
    padding: 7px 8px;
    padding-right: 30px;
    width: 100%;
    position: absolute;
    transition: .5s;
    background: #CACACA;
    @media (max-width: 1024px){    
        height: 30px;
        background: ${BGColor};
    }
`
export const IconContent = styled.div`
    margin-bottom: 9px;
    @media(min-width: 1024px){
        overflow: hidden;
    }
    @media(min-width: 1024px){
        display: none;
    }
`
export const A = styled.a`
    text-decoration: none;
    ${({ borderRight }) => !!borderRight && css`border-right: ${borderRight};`}
    ${({ justify }) => !!justify && css`justify-content: ${justify};`}
    ${({ display }) => !!display && css`display: ${display};`}
    ${({ padding }) => !!padding && css`padding: ${padding};`}
    ${({ aling }) => !!aling && css`align-items: ${aling};`}
    font-size: ${({ fontSize }) => fontSize ? fontSize : '12px'};
    margin: ${({ margin }) => margin ? margin : ''};
    color: ${({ color }) => color ? color : ` ${BGColor}`};
    font-weight: bold;
    &:hover {
        text-shadow: 0 0 2px #fff;
    }
`
export const Options = styled.div`
    display: none;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
    @media (min-width: 1024px){
        display: flex;
        margin-bottom: 0px;
        align-items: center;
        justify-content: space-between;
    }
    @media (max-width: 1024px){
        display: none;
    }
`
export const SubMenuOne = styled.div`
    display: none;
    width: 50%;
    height: auto;
    overflow: hidden;
    background-color: #D5D5D5;
    z-index: -5;
`
export const SubMenu = styled.div`
    width: 50%;
    height: 80%;
    background-color: #2A2A2A;
    overflow: hidden;
    transition: 0.5s ease-in-out;
    &::after {
        content: "";
        position: absolute;
        top: -20px;
        left: 134px;
        margin-left: -7px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent #2A2A2A transparent;
    }
    &:hover ${SubMenuOne}{
        opacity: 0;
        z-index: 8;
    }
`
export const FadeInAnimation = keyframes`
    from { opacity: 0; z-index: -1;}
    to { opacity: 1; z-index: 999; }
`
export const FadeOutAnimation = keyframes`
    from { opacity: 1; z-index: 999;}
    to { opacity: 0; z-index: -1; }
`

export const Enlace = styled(Link)`
    user-select: none;
    padding: ${({ padding }) => padding ? padding : '0'};
    display: inline-block;
    text-align: ${({ aling }) => aling ? aling : 'left'};
    font-size: 14px;
    text-decoration: none;
    width: auto;
    color: ${BGVColor}cc;
    font-family: PFont-Regular;
    @media(min-width: 1024px){
        font-size: 13px;
    }
    &:active{
        color: ${BGVColor};
    }
    &:hover{
        color: ${BGVColor};
    }
`
export const BtnCategories = styled.div`
    padding: 2px;
    position: relative;
    user-select: none;
    align-items: center;
    display: inline-flex;
    font-family: PFont-Regular;
    text-align: ${({ aling }) => aling ? aling : 'left'};
    font-size: 13px;
    text-decoration: none;
    color: ${BGVColor}cc;
    cursor: pointer;
    &:hover ${SubMenu}{
        color: ${BGVColor};
        display: block;
    }
    &:active{
        color: ${BGVColor};
    }
  
`
export const ContentLogo = styled.img`
    height: 20px ;
    position: relative;
    display: inline-block;
    text-align: ${({ aling }) => aling ? aling : 'left'};
    font-size: 14px;
    text-decoration: none;
    margin-left: 60px;
    color: ${BGVColor};
  
`
export const Img = styled.img`
    height: 30px;
    @media(min-width: 768px){
        height: 35px;
    }

`
export const ContainerImg = styled(Link)`
    display: flex;
    justify-content: center;
`