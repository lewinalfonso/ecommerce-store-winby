import Scrollbars from 'react-custom-scrollbars'
import styled, { css } from 'styled-components'
import { BGColor, PLColor, SFColor } from '../../../assets/colors'

/** General */
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background-size: 100% 100%;
    max-width: 1200px;
`
export const Cart = styled.div`
    height:40px;
    width:96%;
    border-bottom: 1px solid ${ PLColor };
    color: #333;
`
export const Image = styled.img`
    height:100px;
    width:96%;

`
export const TitleShopp = styled.h2`
    width: 96%;
    text-align: center;
    padding: 1em 0 1.5em;
    letter-spacing: 3px;
    border-bottom: 1px solid #ccc;
`
export const InfoWrap = styled.div`
    border-bottom: 1px solid ${ PLColor };
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px 0;
    justify-content: justify;
    &:first-child{ border-top: 1px solid ${ PLColor }; }
    @media (min-width: 1040px) {
        flex-direction: row;
    }
`
export const CartSection = styled.div`
    ${ ({ width }) => !!width && css`width: ${ width };` }
    ${ ({ display }) => !!display && css`display: ${ display };` }
    ${ ({ alignItems }) => !!alignItems && css`align-items: ${ alignItems };` }
    ${ ({ bgColor }) => !!bgColor && css`background-color: ${ bgColor };` }
    ${ ({ padding }) => !!padding && css`padding: ${ padding };` }
    ${ ({ direction }) => !!direction && css`flex-direction: ${ direction };` }
    margin-left: ${ ({ marginleft }) => marginleft };
`
export const ImgCart = styled.img`
    height: 160px;
    width: 180px;
    margin: 0px 30px;
    @media (max-width: 1024px) {
        margin: 10px;
        width: 150px;
        height: 150px;
    }
`
export const Text = styled.p`
    ${ ({ bold }) => bold && css`font-weight: bold;` }
    ${ ({ cursor }) => cursor && css`cursor: ${cursor};` }
    ${ ({ position }) => position && css`position: ${position};` }
    ${ ({ bottom }) => bottom && css`bottom: ${bottom};` }
    ${ ({ width }) => width && css`width: ${ width };` }
    font-size: ${ ({ fontSize }) => fontSize || '14px' };
    margin: ${ ({ margin }) => margin || '7px 0px' };
    color: ${ ({ color }) => color || 'black' };
    align-items: center;
    text-align: ${ ({ textAlign }) => textAlign || 'left' };
    font-family: PFont-Regular;
    overflow: hidden;
    max-width: 350px;
    display: flex;
    margin: 6px 0px;
    white-space: nowrap;
    text-overflow: clip;
    @media (max-width: 768px){
        white-space: ${ ({ whiteSpace }) => whiteSpace || 'none' };
        margin: 6px 0px;
        font-size: 13px;
        white-space: wrap;
    }
    ${({ visible }) => visible && css`
        @media (min-width: 1024px){
            display: flex;
        }
        @media (max-width: 1024px){
            display: none;
        }
    ` }
`

export const InputTotalItem = styled.input`
    font-size: 14px;
    text-align: center;
    font-family: PFont-Regular;
    overflow: hidden;
    max-width: 350px;
    display: flex;
    white-space: nowrap;
    text-overflow: clip;
    outline: none;
    border: none;
    background: transparent;
`

export const Form = styled.form`
    width: 90%;
    margin-left: 2px;
    @media (min-width: 1024px){
        border-right: 1px solid ${ PLColor };
        margin-right: 1px;
        padding-right: 16px;
        padding-left: 16px;
    }
`
export const FlexBox = styled.div`
    ${ ({ width }) => !!width && css`width: ${ width };` }
    align-items:${ ({ align })=> align ? align : 'flex-start' };
    display: ${ ({ display }) => display ? display : 'flex' };
    justify-content: ${ ({ justify }) => justify || 'space-between' };
    ${ ({ bgColor }) => !!bgColor && css`background-color: ${ bgColor };` }
    ${ ({ radius }) => !!radius && css`border-radius: ${ radius };` }
    flex-direction: ${ ({ flex }) => flex };
    ${ ({ direction }) => direction && css`flex-direction: ${ direction };` };
    ${ ({ height }) => height && css`height: ${ height };` };
    margin: ${ ({ margin }) => margin };
    ${ ({ borderTop }) => !!borderTop && css`border-top: ${ borderTop };`   }
    ${ ({ hidden }) => hidden && css`
        display: none;
        @media (min-width: 1280px){
            display: flex;
        }
    ` }
    ${ ({ visible }) => visible && css`
        display: flex;
        @media (max-width: 1280px){
            display: none;
        }
    ` }
    ${ ({ responsive }) => responsive && css `
        flex-direction:${ ({ flex })=> flex ? flex : 'column' };
        align-items: flex-start;
        & > div { width: 100%; }
        @media (min-width: 1024px){
            flex-direction: row;
            justify-content: space-between;
            & > div { width: 48%;}
        })
    ` }

    ${ ({ res }) => !!res && css`
        @media (max-width: 1024px){
            display:grid;
            grid-template-columns: 1fr;
            grid-gap:5px;
            border-right:none;
        }
    ` }
    ${ ({ resp }) => resp && css` flex-direction: column;` }
`
export const Title = styled.h4`
    width: auto;
    padding: ${ ({ padding }) => padding ? padding: '0 64px 15px' };
    text-align:center;
    justify-content:center;
    font-weight: 600;
    position: ${ ({ position }) => position ? position: 'relative' };
    bottom:${ ({ botton }) => botton };
    top: ${ ({ top }) => top };
    font-size: ${ ({ fontSize }) => fontSize };
    ${ ({ bold }) => bold && css`font-weight: bold;` }
`
export const ButtonMap = styled.button`
    background-color: ${ ({ bgColor }) => bgColor || 'transparent' };
    outline: 0;
    border:1px solid #ccc;
    ${ ({ margin }) => margin && css`margin: ${ margin };` }
    ${ ({ position }) => position && css`position: ${ position };` }
    ${ ({ bottom }) => bottom && css`bottom: ${ bottom };` }
    ${ ({ right }) => right && css`right: ${ right };` }
    ${ ({ zIndex }) => zIndex && css`z-index: ${ zIndex };` }
    ${ ({ color }) => color && css`color: ${ color };` }
    border-radius: 10px;
    padding: 5px 30px;
    cursor: pointer;
`
export const ContainerSearch = styled.div`
    top: 10px;
    left: 30%;
    width: 40%;
    position: absolute;
    z-index: 9999;
    background-color: ${ BGColor };
    border: 1px solid #ccc;
    box-shadow: 0px 1px 7px 2px #00000035;
    border-radius: 5px;
`
export const BoxSearch = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
export const InputSearch = styled.input`
    border: none;
    width: 100%;
    padding: 10px 30px 10px 10px;
    outline: 0;
    background-color: transparent;
    font-size: 13px;
`
export const ButtonIcon = styled.div`
    position: absolute;
    right: 0;
    cursor: pointer;
    padding: 0 10px;
    display: flex;
    align-items: center;
`
export const ScrollOptions = styled(Scrollbars)`
    transition: 1s;
`
export const BoxOptions = styled.div`
    width: 94%;
    padding: 10px 0;
    margin: 0 3%;
    border-top: 1px solid #ccc;
`
export const Option = styled.button`
    outline: 0;
    background-color: transparent;
    border: none;
    display: block;
    padding: 3px;
    margin: 4px;
    font-size: 12px;
    width: 98%;
    color: ${ SFColor };
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
        background-color: #DFDFDF;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
`
export const InputC = styled.input`
    cursor: pointer;
    margin: 0px 10px;
`
export const Iconepay = styled.img`
    width: 60px;
    height: 46px;
    margin:0px 10px;
`
export const IconContent = styled.div`
    background-color:#ccc;
    border-radius:50px;
    position:relative;
    height:40px;
    width:40px;
`