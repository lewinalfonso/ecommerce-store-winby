import styled, { css } from 'styled-components'
import { BGColor, PVColor, PColor, SFColor, PLColor } from '../../../assets/colors'

/** Category Items */
export const BoxCard = styled.div`
    max-width: 400px;
    min-width: 200px;
    margin: 10px 20px;
    width: 80%;
    cursor: pointer;
    transition: .2s;
    &:hover {
        box-shadow: 0 5px 6px 2px #57575755;
    }
    @media(min-width: 768px){ width: 25%; }
`
export const IconBox = styled.div`
  margin: ${({ margin }) => margin};
`
export const Img = styled.img`
    display: none;
    width: ${({ width }) => width ? width : '20px'};
    height: ${({ height }) => height ? height : '20px'};
    margin: 0 5px 0 0;
    @media(min-width: 768px){
        display: block;
    }
`
export const Card = styled.div`
    background-color: ${BGColor};
    border-bottom: 1px solid ${PLColor};
    width: 100%;
    border-radius: ${({ borderR }) => borderR ? borderR : '0'};
    cursor: pointer;
    display: flex;
    transition: .14s linear;
    align-items: center;
    flex-direction: column;
    @media(min-width: 768px){ 
        width: 100%;    
        &:hover {
            box-shadow: 0 5px 6px 2px #57575755;
        }
     }
`

export const SpanText = styled.span`
    color: ${({ color }) => color || SFColor};
    ${({ padding }) => padding && css`padding: ${padding};`}
    font-size: ${({ fontSize }) => fontSize || '14px'};
    font-family: PFont-Regular;
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    text-transform: ${props => props.upperCase ? 'uppercase' : 'normal'};
    display: flex;
    align-self: center;
    text-transform: uppercase;
    @media(min-width: 768px) {
      font-size: ${({ fontSize }) => fontSize || '16px'};
    }
    &:hover {
        color: ${PColor} ;
    }
`
export const Column = styled.div`
    flex-direction: ${({ flexDir }) => flexDir ? flexDir : 'column'};
    display: ${({ display }) => display ? display : 'flex'};
    ${({ width }) => width && css`width: ${width};`}
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ zIndex }) => zIndex && css`z-index: ${zIndex};`}
`
export const GridMenu = styled.div`
    display: block;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 60px;
    justify-content: center;
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 1440px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    & > ${BoxCard} {
        align-self: center;
        justify-self: center;
    }
`
export const ListContain = styled.div`
    display: ${({ check }) => check ? 'block' : 'none'};
    width: 100%;
    transition: height .14s linear;
    padding: 7px;
    overflow: hidden;
    @media (min-width: 768px) {
        display: block;
    }
`
export const Hr = styled.hr`
    height: 1px;
    ${({ margin }) => margin && css`margin: ${margin};`}
    color: ${SFColor}aa;
    @media(max-width: 768px){
        display: none;
    }
`
export const Lists = styled.span`
    font-family: PFont-Medium;
    font-size:${({ fontsize }) => fontsize ? fontsize : '12px'};
    padding: 3px 5px;
    letter-spacing:0.1px;
    text-transform: uppercase;
    text-align: left;
    list-style: none;
    width: 30%;
    word-wrap: break-word;
    margin: 3px 0;
    @media (max-width: 768px){
        font-size: 10px;
        margin: 7px 0px;    
        width: 33%;
    }
    /* &:hover {
        color: ${PColor} ;
    } */
`
/** Banner Circle */
export const Banner = styled.div`
    position: relative;
    padding: 10px 0;
    padding-bottom: 30px;
    margin: 20px 0;
`
export const ContainerBox = styled.div`
    width: 100%;
    height: auto;
`
export const BannerContainer = styled.div`
    width: ${window.screen.width - 50}px;
    max-width: 1200px;
    height: 100%;
    padding: 10px;
`
export const Content = styled.button`
    border: none;
    background-color:transparent;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 30px 0px 0px 0px;
    position: relative;
    width: 120px;
    cursor: pointer;
    @media (min-width: 768px){
        width: 200px;
    }
`
export const Image = styled.img`
    height: 100px;
    width: 100px;
    ${({ radius }) => !!radius && css`border-radius: ${radius};`}

    @media (min-width: 768px){
        height: ${({ height }) => height || '130px'};
        width: ${({ width }) => width || '130px'};
    }
`
export const Title = styled.span`
    display: block;
    font-size: ${({ size }) => !!size && size}px;
    text-align: ${({ textAlign }) => !!textAlign && textAlign};
    color: ${({ color }) => !!color && color};
    font-family: Tahoma;
    font-weight: ${({ weight }) => !!weight && weight};
    text-transform: uppercase;
    ${({ padding }) => !!padding && css`padding: ${padding};`}
    @media(max-width: 1400px){
        font-size: ${({ size }) => !!size && (size - 4)}px;
    }
`

/** Banner Header */
export const Container = styled.div`
    width:100%;
    background-color:transparent;
    height:auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const NavigationBar = styled.div`
    position: absolute;
    bottom: -28px;
    background-color:#b10000;
    width:100%;
    height: 30px;
    background-image: linear-gradient(to left, ${PColor}, ${PVColor});
`
export const Span = styled.span`
    color: ${BGColor};
    padding-left: 50px;
`
export const CustomButton = styled.button`
    width: 120px;
    height: 25px;
    align-items: center;
    font-family: Tahoma;
    border: none;
    color: ${BGColor} ;
    border-radius: 15px;
    background-image: linear-gradient(to right, ${PVColor}, ${PColor}) ;
    font-size: 14px;
    margin: 50px;
    cursor: pointer;
    &:hover { opacity: .8; }
`