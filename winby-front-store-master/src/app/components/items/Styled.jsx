import styled, { css, keyframes } from 'styled-components';

import {
    BGColor,
    PColor,
    PLColor,
    PVColor,
    SFColor,
    SFVColor,
} from '../../../assets/colors';

export const BoxCard = styled.div`
    max-width: 400px;
    min-width: 200px;
    width: 80%;
    margin: 10px 20px;
    cursor: pointer;
    position: relative;
    transition: .2s;
    &:hover {
        box-shadow: 0 5px 6px 2px #57575740;
    }
    @media(min-width: 600px){
        width: 25%;
    }
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
export const FadeInAnimation = keyframes`  
    from { opacity: 0; z-index: -1;}
    to { opacity: 1; z-index: 999; }
`
export const FadeOutAnimation = keyframes`  
    from { opacity: 1; z-index: 999;}
    to { opacity: 0; z-index: -1; }
`
export const GridMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 60px;
    max-width: 1200px;

    @media (min-width: 600px){
      display: grid;
      grid-auto-columns: 1fr;
      grid-auto-rows: 1fr;
      grid-gap: 2em;
      overflow: hidden;
      justify-content: center;
      grid-template-columns: 200px 200px;
    }
    @media (min-width: 768px){ grid-template-columns: 200px 200px 200px; }
    @media (min-width: 1040px){ grid-template-columns: 200px 200px 200px 200px; }
    @media (min-width: 1280px){ grid-template-columns: 200px 200px 200px 200px 200px; }
    & > ${BoxCard} {
        align-self: center;
        justify-self: center;
    } 
`

/** Estilos para los detalles de un producto */
export const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1300px;
    @media (min-width: 1300px){
        margin: auto;
    }
`
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const ContainerProducts = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    /* grid-template-rows: 380px 1fr 1fr; */
    background-color: ${BGColor};
    box-shadow: 0 0 5px 2px #77777755;
    grid-gap: 10px;

    @media (min-width: 850px) {
        padding: 20px;
        border-radius: 20px;
        grid-template-columns: 3fr 1.5fr;
        grid-template-rows: 610px 1fr;
    }
`
export const ContainerOffers = styled.div`
    border: 1px solid rgb(238,238,238);
    overflow: hidden;
    padding-right: 2px;
`
/**
 * @deprecated
 */
export const SwiperContainer = styled.div`
  width: ${window.screen.width - 20}px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    width: 500px;
    height: 600px;
  }
`
export const Description = styled.p`
    text-align: justify;
    color: ${SFVColor};
    margin-top: 5px;
    font-family: PFont-Regular;
`
export const WraperDescription = styled.div`
    color: ${SFColor};
    margin-top: 5px;
    font-family: PFont-Medium;
    word-break: break-word;
    line-height: 1.2;
`
/**
 * @deprecated
 */
export const ImageSlider = styled.img`
  height: ${window.screen.width + 50}px;
  width: ${window.screen.width - 20}px;
  max-height: 490px;
  max-width: 500px;
  @media (min-width: 850px) {
    width: 500px;
    height: 510px;
  }
`
/** @deprecate */
export const Price = styled.h2`
    margin: 5px 0;
    display: flex;
    align-items: center;
    font-family: PFont-Bold;
`
export const OffersText = styled.span`
    display: inline-block;
    width: 100%;
    font-size: 16px;
    text-align: center;
    font-family: PFont-Regular;
    padding: 15px;
    @media(max-width: 768px){
      font-family: PFont-Bold;
      font-size: 15px;

    }
`

/** @deprecated */
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
/** @deprecated */
export const Span = styled.span`
    font-family: PFont-Regular;
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

/** Vista izquierda, detalles del producto, visualización de productos... */
/** @deprecated */
export const Title = styled.h1`
    font-size: 26px;
    font-family: PFont-Regular;
    padding: 0px;
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
/** @deprecated */
export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  font-size: ${({ fontSize }) => fontSize || '12px'};
  color: ${({ color }) => color || SFColor};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  cursor: pointer;
`
/** @depreacted */
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

/** Thumbs */
/**
 * @deprecated
 */
export const ThumbsContainer = styled.ul`
    display: none;
    padding: 0;    
    margin-right: 12px;
    list-style-type: none;
    overflow: hidden;
    height: 550px;
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
/**
 * @deprecated
 */
export const ThumbsImage = styled.img`
  width: 100px;
  height: 100px;
`

/** Modal Estilos */
export const Modal = styled.div`
  position: fixed;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #55555599;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
`
export const ContainerModal = styled.div`
    position: ${({ position }) => position ? position : 'absolute'};
    margin: auto;
    left: 0px;
    width: 100%;
    height: 93%;
    background-color: ${SFColor}aa;
    z-index: -1;
    opacity: 1;
    display: flex;
    align-items: center;    
    justify-content: center;
    animation-name: ${({ visible }) => visible ? FadeInAnimation : (visible === false ? FadeOutAnimation : 'none')};
    animation-duration: .5s;  
    animation-fill-mode: forwards;
`
export const Content = styled.div`
    width: ${({ width }) => width ? width : '80%'};
    height: auto;
    background-color: ${BGColor};
    border-radius: 18px;
    position: relative;
    top: 0px;
    z-index: 9999;
    max-height: calc(100% - 70px);
    margin-bottom: ${({ marginBottom }) => marginBottom};
    display: flex;
    flex-direction: column;
    ${({ responsive })=> responsive && css`
      @media (max-width: 768px) {  
        border-radius: 0;
        width: 100%;
        margin-bottom: 0;
        max-height: 100%;
      }
    ` }
`
export const H3 = styled.h3`
    font-family: PFont-Bold;
`
export const Header = styled.div`
    width: 100%;
    background: ${({ headerColored }) => headerColored ? `linear-gradient(45deg, ${PVColor}, ${PColor})` : 'transparent'};
    height: ${({ height }) => height};
    padding: 6px;
    text-align: center;
    border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : '18px 18px 0 0'};
    border-top: ${({ borderTop }) => borderTop};
    border-bottom: ${({ borderBottom }) => borderBottom};
    color: ${({ headerColored }) => headerColored ? '#fff' : '#333'};
`
export const ModalContainer = styled.div`
  width: 80%;
  height: 80%;
  position: relative;
  background-color: ${BGColor};
  border-radius: 8px;
  padding: 0 20px;
  overflow: auto;
`
export const Card = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${PLColor};
  & div {
    line-height: 1.3;
  }
`
export const ImageCard = styled.img`
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: row;
  border-right: 1px solid ${PLColor};
`
export const Text = styled.span`
    display: block;
    font-size: 11px;
    font-family: PFont-Regular;
`
export const ButtonClose = styled.button`
  border: none;
  position: absolute;
  outline: 0;
  top: 5px;
  right: 5px;
  background-color: transparent;
  cursor: pointer;
`
/** Banner */
export const Banner = styled.div`
  background: #fff;
  position: relative;
  padding: 10px 0;
  padding-bottom: 30px;
  margin: 20px 0;
  border-radius: 11px;
  box-shadow: 0 0 5px 2px #77777755;
`
export const BannerContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: auto;
`
export const Body = styled.div`
    width: 100%;
    padding: 10px 10px;
    height: ${({ height }) => height};
    overflow: auto;
`