import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PColor, SFColor } from '../../assets/colors'
import { IconCancel } from '../../assets/icons'

export default ({ children, id, onClick, padding, width, height, radius, marginTop }) => (
    <Modal id={id} >
        <Container padding={padding} width={width} height={height} radius={radius} marginTop={marginTop}>
            <Title />
            <ButtonCancel onClick={() => onClick || clModal(id)}>
                <IconCancel color={PColor} size={20} />
            </ButtonCancel>
            {children}
        </Container>
    </Modal>
)

export const clModal = id => {
    document.getElementById(id).style.zIndex = -1
    document.getElementById(id).style.opacity = 0
    document.getElementsByTagName('body')[0].style.overflow = 'auto'
}
export const openModal = id => {
    document.getElementById(id).style.zIndex = 9999
    document.getElementById(id).style.opacity = 1
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
}

const Modal = styled.div`
    opacity: 0;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000055;
    z-index: -1;
`
const Container = styled.div`
    position: relative;
    width: ${({ width }) => width || '80%'};
    height: ${({ height }) => height || '80%'};
    border-radius: ${({ radius }) => radius || '20px'};
    background-color: ${BGColor};
    padding: ${({ padding }) => padding || '30px'};
    box-shadow: 0 0 5px 2px #adadad55;
    ${({ marginTop }) => marginTop && css`margin-top: ${marginTop};`}
`
const Title = styled.h3`
    font-size: 14px;
    color: ${SFColor};
    margin: 0;
    position: absolute;
    top: -12px;
    left: 8px;
    padding: 0px 10px;
    background-color: ${BGColor};    
    box-shadow: 0px -6px 8px 1px #adadad55;
    border-radius: 8px 8px 0 0;
    @media(max-width: 480px) {
        font-size: 10px;
    }
`
const ButtonCancel = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 9999;
`