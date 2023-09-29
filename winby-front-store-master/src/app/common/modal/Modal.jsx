import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { BGColor, PLColor, } from '../../../assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconCloseMenu } from '../../../assets/icons';

const Modalles = ({ children, setIsModal, isModal, direction, title, Icon }) => {
    const [mount, setMount] = useState(false)
    const location = useLocation();

    useEffect(() => {
        !isModal && setMount(true)
    }, [isModal])

    useEffect(() => {
        setMount(false);
    }, [location]);

    return (
        mount ? <ContainerModal onClick={setIsModal} active={!isModal}>
            <Modal active={isModal} onClick={(e) => e.stopPropagation()} >
                <ContainerCard direction={direction} borderBottom={` 1px solid ${PLColor} `} border='none' width='auto'>
                    {Icon ? <BtnClose onClick={setIsModal} ><IconCloseMenu size='10px' /></BtnClose> : <BtnCloseCondition onClick={setIsModal} ><FontAwesomeIcon icon={faTimes} size='1x' color='#2a2a2a' /></BtnCloseCondition>}
                    <h3>{title}</h3>
                    {children}
                </ContainerCard>
            </Modal>
        </ContainerModal> : <></>
    )
}

export default Modalles

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
const BtnClose = styled.button`
    position: absolute;
    outline: none;
    border: none;
    cursor: pointer;
    right: 20px;
    top: 10px;
    height: 30px;
    width: 30px;
    z-index: 9999;
    &:hover{
        background-color: rgb(76 76 76 / 48%);
    }
`
const ContainerModal = styled.div`
     background-color: rgb(0 0 0 / 39%);
    height: 100vh;
    display: flex;
    width: 100%;
    position: fixed;
    transition: background-color .4s ease-in;
    z-index: 9999;
    right: 0;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;
    animation: ${({ active }) => active ? bounceInDown : bounceOutUp} forwards;
    animation-duration: ${({ active }) => active ? '0s' : ' 0s '};
    height: min-content;
    height: calc(100% - 100px);
    bottom: 0; 
    @media(max-width: 1024px){
        width: 100%;
        height: calc(100% - 50px);
    }
`
const Modal = styled.div`
    position: relative;
    overflow: hidden;
    z-index: 99;
    box-shadow: 0px 0px 6px #00000060;
    height: auto;
    border-radius: 9px;
    justify-content: center;
    align-items: center;
    display: flex;
    width: auto;
    margin: auto;
    background-color: ${BGColor};
    animation: ${({ active }) => !active ? bounceInDown : bounceOutUp} forwards;
    animation-duration: ${({ active }) => !active ? '.5s' : '0.2s'};
    ${({ direction }) => direction && css`flex-direction: ${direction};`}
    @media(max-width: 768px){
        width: 100%;
    }
`
const ContainerCard = styled.div` 
    display: flex;
    flex-direction: ${({ direction }) => direction ? direction : 'column'};
    ${({ width }) => width && css`width: ${width};`};
    ${({ borderTop }) => borderTop && css`border-top: ${borderTop};`};
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`};
    ${({ padding }) => padding && css`padding: ${padding};`};
    align-items: center;
    justify-content: ${({ justify }) => justify ? justify : 'center'};
`
const BtnCloseCondition = styled.button`
    position: absolute;
    outline: none;
    z-index: 99;
    border: none;
    cursor: pointer;
    right: 0px;
    top: 0px;
    height: 30px;
    width: 30px;
    z-index: 9999;
    background-color: transparent;
`