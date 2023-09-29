import styled, { css } from 'styled-components'
import { SFColor, PVColor, PColor, BGColor, BGVColor } from '../../../assets/colors'

/**
 * Titulos, Parrafos Span
 * @returns {object} Componentes
 */

export const H2 = styled.h2`
    font-weight: ${({ weight }) => weight || ''};
    font-family: ${({ family }) => family || 'PFont-Medium'};
    text-align: justify;
    display: flex;
    color: ${({ color }) => color ? color : BGVColor};
    ${({ margin }) => margin && css`margin: ${margin};`}
    font-size: ${({ size }) => size ? size : '18px'};
 `
export const Text = styled.span`
    display: block;
    text-align: ${({ align }) => align ? align : 'center'};
    padding: ${({ padding }) => padding ? padding : '0'};
    font-size: ${({ size }) => size ? size : '18px'};
    font-weight: ${({ weight }) => weight || ''};
    font-family: ${({ family }) => family || 'PFont-Medium'};
    color: ${({ color }) => color ? color : BGVColor};
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ self }) => self && css`align-self: ${self};`}
`
export const Header = styled.div`
    width: 100%;
    height: 50px;
    background-image: linear-gradient(to right, ${PVColor}, ${PColor}) ;    
    display: flex;
    justify-content: center;
    align-items: center;   
`
export const Container = styled.div`
    position: relative;
    justify-items: center;
    background-repeat: no-repeat;
    display: grid;
    grid-template-columns: 1fr;
    box-shadow: ${({ shadow }) => shadow ? shadow : null};
    height: ${({ height }) => height ? height : '100%'};
    background-size: ${({ bgSize }) => bgSize ? bgSize : 'cover'};
    background-color: ${({ bgColor }) => bgColor ? bgColor : 'transparent'};
    background-position: ${({ bgPosition }) => bgPosition ? bgPosition : '100%'};
    padding: ${({ padding }) => padding ? padding : '10px'};
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ bgImg }) => bgImg && css`background-image: url(${bgImg});`}
    @media (min-width: 769px) {
        grid-template-columns: repeat(${({ columns }) => columns ? columns : '1'}, 1fr) ;
    }
`
export const Column = styled.div`
    padding: ${({ padding }) => padding ? padding : '10px'};
    text-align: center;
    margin: 10px 0;
    ${({ width }) => width && css`width: ${width};`}
    height: ${({ height }) => height ? height : 'auto'};
    z-index: 1;
`
export const ContainerLogo = styled.div`
    margin: 0 auto;
    width: 400px;
    height: 400px;
    @media (max-width: 1024px) {
        width: 300px;
        height: 300px;
    }
    @media (max-width: 768px) {
        width: 200px;
        height: 200px;
    }
`
export const Image = styled.img`
    display: ${({ display }) => display ? display : 'block'};
    ${({ width }) => width && css`width: ${width}; `}
    ${({ height }) => height && css`height: ${height}; `}
`
export const Box = styled.div`
    width: ${({ width }) => width ? width : '400px'};
    ${({ height }) => height && css`height: ${height}; `}
    ${({ margin }) => margin && css`margin: ${margin}; `}
    background-color: ${BGColor};
    padding: 10px;
    border-radius: 15px;
    box-shadow: 1px 1px 2px 2px #00000030;
`
export const Flex = styled.div`
    display: flex;
    justify-content: ${({ justify }) => justify || 'center'};
    align-items: ${({ alignItems }) => alignItems || 'center'};
    ${({ height }) => height && css`height: ${height}; `}
    ${({ margin }) => margin && css`margin: ${margin}; `}
    ${({ direction }) => direction && css`flex-direction: ${direction}; `}
    ${({ wrap }) => wrap && css`flex-wrap: ${wrap}; `}
    ${({ marginMedia }) => marginMedia &&
        css`
            @media (max-width: 1024px) {
                margin: 50px;
            }
            @media (max-width: 600px) {
                margin: 20px;
            }
        ` }
`
export const Logo = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 100%;
    margin: 20px;
    transition: 1s;
    @media (max-width: 1024px) {
        width: 100px;
        height: 100px;
        margin: 15px;
    }
    @media (max-width: 600px) {
        width: 70px;
        height: 70px;
        margin: 10px;
    }
`
export const CustomButton = styled.button`
    align-items: center;
    font-family: Tahoma;
    font-weight: bold;
    border: none;
    font-weight:${({ weight }) => weight ? weight : 'bold'};
    color: ${({ color }) => color ? color : SFColor};
    border-radius: ${({ radius }) => radius ? radius : '10px'};
    background-image: linear-gradient(to right, ${PVColor}, ${PColor}) ;
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ width }) => width && css`width: ${width};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}
    ${({ self }) => self && css`align-self: ${self};`}
    font-size: ${({ fontSize }) => fontSize ? fontSize : '22px'};
    
    outline: 0;
    cursor: pointer;
    &:hover { opacity: .8; }
    @media (max-width: 1024px){
        font-size: 15px;
     
    }
    @media (max-width: 600px){
        font-size: 15px;
       
    }
`
export const BoxContainer = styled.div`
     height: 80%;
     font-size: 12pt;
     text-align: center;
     border-radius: 10px;
     margin:${({ margin }) => margin ? margin : '0'};
     box-shadow: ${({ Shadow }) => Shadow ? Shadow : ' 0 0 20px 2px #00000080'};
     width:${({ width }) => width ? width : '100%'};
     @media (max-width: 800px) {
         width:500px;
         justify-content:center;
         margin:auto;
     }
 `
export const FlexBox = styled.div`
       display: flex;
       justify-content:${({ justify }) => justify ? justify : 'center'};
       @media (max-width: 800px) {
            grid-row: 2 / 4;
       }
`
export const BtnContainer = styled.div`
    display: flex;
    align-items:flex-end;
    margin-top: ${({ MarginTop }) => MarginTop ? MarginTop : 0}; 
    justify-content:center;
  @media (max-width: 800px) {
    margin:30px;
  }
`
export const Circle = styled.div`
    width: 12px;
    height: 12px;
    background-color: ${PVColor};
    border-radius: 100%
`