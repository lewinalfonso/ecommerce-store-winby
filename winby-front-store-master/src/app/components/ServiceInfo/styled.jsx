import styled, { css } from 'styled-components'
import { SFColor, PLColor } from '../../../assets/colors'

export const Container = styled.div`
    border-top: none;
    /* grid-area: 1 / 2 / 3 / 3; */
    display: flex;
    padding: 10px;
    padding-left: 16px;
    margin: 0px;
    flex-direction: column;
    border: 1px solid rgb(238, 238, 238);
    line-height: 1;
`
export const Select = styled.select`
  border: none;
  outline: none;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  @media(min-width: 600px){
    text-decoration: none;
    font-size: 10px;
  }
`
export const Span = styled.span`
    color: ${({ color }) => color || SFColor};
    ${({ padding }) => padding && css`padding: ${padding};`}
    font-size: 12px;
    font-family: ${props => props.fontFamily ? props.fontFamily : 'PFont-Regular'};
    ${props => props.center && css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
    `}
    @media(min-width: 600px) {    
      font-size: ${({ fontSize }) => fontSize || '12px'};
    }
`
export const Title = styled.h1`
    font-size: 26px;
    font-family: PFont-Regular;
    padding: 0px;
`
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;

  @media (max-width: 600px) {
    ${this} button {
      width: 100%;
      padding: 10px;
    }
    ${this} span {font-size: 18px;}
  }
`
export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 8px;
  font-size: ${({ fontSize }) => fontSize || '12px'};
  color: ${({ color }) => color || SFColor};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  cursor: pointer;
`
export const Price = styled.h2`
    margin: 5px 0;
    display: flex;
    align-items: center;
    font-family: PFont-Regular;
`

export const Box = styled.div`
  display: ${({ display }) => display || 'flex'};
  /* visibility: ${({ activeStart }) => activeStart ? 'visible' : 'hidden'}; */
  padding: ${({ padding }) => padding || '5px'};
  margin: ${({ margin }) => margin || '0px'};
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  ${({ align }) => align &&
    css`
      align-items: ${align};`}  
      flex-wrap: wrap;
  ${({ justify }) => justify &&
    css`
      justify-content: ${justify};`}
    ${({ borderTop }) => borderTop &&
    css`
      border-top: 1px solid ${PLColor};`}
    /** Barra de precios */
    ${({ borderLeft }) => borderLeft &&
    css`
      border-left: 1px solid ${PLColor};
      border-top: 1px solid ${PLColor};
      @media (min-width: 850px) {
        border-top: none;
        grid-column: 2 / 3;
        grid-row-start: 1;
        grid-row-end: 3;
      }
    ` }
    ${({ bgColor }) => bgColor &&
    css`
      background-color: ${bgColor};
    ` }
    /* ${({ visibility }) => visibility &&
    css`
      visibility: ${visibility};
    ` } */
    ${({ width }) => width &&
    css`
      width: ${width};
    ` }
    ${({ position }) => position &&
    css`
      position: ${position};
    ` }
    line-height: 1;
`