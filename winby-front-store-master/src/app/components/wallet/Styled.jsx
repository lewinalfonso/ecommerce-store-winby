import styled, { keyframes } from 'styled-components'
import { BGColor, PColor, PVColor, PLColor, SFColor } from '../../../assets/colors'

export const FadeInAnimation = keyframes`
    from { opacity: 0; z-index: -1;}
    to { opacity: 1; z-index: 999; }
`
export const FadeOutAnimation = keyframes`
    from { opacity: 1; z-index: 999;}
    to { opacity: 0; z-index: -1; }
`
export const Form = styled.form``
export const BoxFlex = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`
export const ContainerModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:${ SFColor }aa;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation-name: ${ ({ visible }) => visible ? FadeInAnimation : FadeOutAnimation };
    animation-duration: .5s;
    animation-fill-mode: forwards;
`
export const Content = styled.div`
    width: ${ ({ width }) => width ? width : '50%' };;
    height: auto;
    background-color: ${ BGColor };
    border-radius: 18px;
    position: relative;
    top: -20px;
`
export const Body = styled.div`
    width: 100%;
    padding: 10px 10px;
    height: ${ ({ height }) => height };
`
export const Header = styled.div`
    width: 100%;
    padding: 15px;
    text-align: center;
    border-radius: 18px 18px 0 0;
    height: ${ ({ height }) => height };
    background-color: ${ PVColor };
    color: ${ BGColor };
`
export const ButtonClose = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    outline: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
`
export const ButtonConfirm = styled.button`
    position: absolute;
    z-index: 1;
    bottom: 10px;
    right: 20px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: ${ PColor };
    border: none;
    cursor: pointer;
`
/**  Cuerpo del Modal */
export const InputIcon = styled.input`
    border: none;
    outline: none;
    padding: 5px 10px;
`
export const OptionsInput = styled.div`
    display:flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    width: 96%;
`
export const ContainerSelect = styled.div`
    border-bottom: ${ ({ borderBottom }) => borderBottom ? `1px solid ${ PLColor }` : 'none' };
`