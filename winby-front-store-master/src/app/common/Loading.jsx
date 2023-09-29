import React from 'react'
import styled, { keyframes } from 'styled-components'
import { PColor } from '../../assets/colors'

const LogoRino = ({ color }) => <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 674 739" fill={color || PColor} >
    <path d="M609.8,346.2c0-69.3-28.7-132.1-74.9-176.8c10.6,23.3,16.4,49.1,16.4,76.3c0,85.3-57.5,157.2-135.9,179
        c-0.2,0.1-0.4,0.3-0.7,0.4c0.1-0.1,0.3-0.2,0.4-0.3c0.2-0.1,0.4-0.3,0.5-0.5c8.9-7.2,16.1-16.3,21.1-26.7
        c4.9-10.3,7.7-21.8,7.7-33.9c0-19.9-7.5-38.1-19.7-51.9c0.3,2.6,0.5,5.2,0.5,7.8c0,38.7-31.4,70-70,70c-29.8,0-57.6-14.2-67.3-18.6
        c-32.1-20.4-58-49.8-74.1-84.6c-5.6-12-7.4-25.2-8.9-38.8c-0.1-0.4,0-1.3,0-1.6c0.2-24.1,10-42.1,29.2-56.6
        c-1.2-20.4-12.9-36.7-29.8-46c-0.1-0.1-0.2-0.1-0.3-0.1c-8.2-4.5-17.7-7-27.7-7c-10.5,0-20.4,2.8-28.9,7.7c0.2,2.3,0.4,4.6,0.4,7
        c0,26.3-15,49.1-37,60.3c-21.8-38.7-50.4-73.1-84-101.6C18.1,102.4,9.2,95.5,0,89v594h23c39.6-32.7,72.3-73.4,95.7-119.7
        c0.8,0.2,2.1-1.6,4.2-5.6c46.9,48.8,112.9,79.2,185.9,79.2c9.3,0,18.5-0.5,27.5-1.5c17.7,16.1,41.1,25.8,66.9,25.8
        c24.1,0,46.1-8.5,63.4-22.8c-1.3,0-2.5,0.1-3.8,0.1c-21.4,0-41-7.9-55.8-21.1c-0.3-0.3-0.7-0.6-1-0.9c0.5,0.2,1,0.5,1.5,0.7
        c10.9,5.1,23.1,8,35.9,8c16.9,0,32.8-5,46-13.6c8.6-14.7,13.5-31.8,13.5-50.1c0-4-0.3-8-0.7-11.9
        C567.1,505.4,609.8,430.8,609.8,346.2z M333.5,468.4c-5.8,8.6-15.6,14.3-26.8,14.3c-17.8,0-32.3-14.4-32.3-32.3
        c0-3.5,0.6-6.9,1.6-10c-1.4-3.4-2.4-7-3.1-10.8c1.3,2.6,2.7,5.2,4.3,7.6c10.8,16.3,29.4,27,50.5,27c2.9,0,5.6-0.2,8.4-0.6
        c4.9-0.7,9.8-2,14.3-3.8C345.4,463.7,339.7,466.7,333.5,468.4z M459.8,571l-17.4-11.7l30.9,5.6L459.8,571z"/>
</svg>

export default ({ bgColor, color, zIndex, position }) => <Container bgColor={bgColor} zIndex={zIndex} position={position}>
    <Loading color={color}><div /><div /><div /><div /></Loading>
</Container>

export const LoadingLogo = ({ bgColor, color, zIndex, position }) => <Container bgColor={bgColor} zIndex={zIndex} position={position}>
    <Loading>
        <LogoRino color={color}/>
    </Loading>
</Container>

export const LoadingCardItem = () => <Card>
    <CardImage />
    <CardContent>
        <CardTitle />
        <CardText />
    </CardContent>
</Card>

/** Animaciones */
const ellipsis1 = keyframes`
    0% {transform: scale(0);}
    100% {transform: scale(1);}
`
const ellipsis2 = keyframes`
    0% { transform: translate(0, 0);}
    100% {transform: translate(24px, 0);}
`
const ellipsis3 = keyframes`
    0% {transform: scale(1);}
    100% {transform: scale(0);}
`

const pulse = keyframes`
    0% {
        transform: scaleX(1);
    }
    50% {
        transform: scale3d(1.05,1.05,1.05);
    }
    
    to {
        transform: scaleX(1);
    }
`

const shine = keyframes`
    to {
        background-position-x: -200%;
    }
`

const Card = styled.div`
    margin-top: 10px;
    display: flex;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

    @media (min-width: 768px) {
        display: block;
        width: 185px;
        margin: 10px auto;
        height: 200px;
    }
`

const CardImage = styled.div`
    width: 130px;
    height: 130px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s ${shine} linear infinite;
    @media (min-width: 768px) {
        width: 100%;
        height: 163px;
    }
`

const CardContent = styled.div`
    padding: 5px;
    margin-left: 8px;
    width: calc(100% - 130px);
    @media (min-width: 768px) {
        width: 100%;
        margin-left: 0;
    }
`

const CardTitle = styled.h2`
    height: 25px;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s ${shine} linear infinite;
    margin: 6px 0;
    @media (min-width: 768px) {
        width: 100%;
        margin: 0;
    }
`

const CardText = styled.p`
    margin: 7px 0 0;
    height: calc(100% - 38px);;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s ${shine} linear infinite;
    @media (min-width: 768px) {
        display: none;
    }
`

/** Estilos loading */
const Container = styled.div`
    position: ${ ({ position }) => position || 'fixed' };
    top: 0;
    left: 0;
    z-index: ${({ zIndex }) => zIndex || '99999'};

    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    height: 100%;
    background-color: ${({ bgColor }) => bgColor || '#77777755'};
`
const Loading = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    ${this} div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: ${({ color }) => color || '#fff'};
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    ${this} svg {
        animation: ${pulse} .8s infinite;
    }
    ${this} div:nth-child(1) {
        left: 8px;
        animation: ${ellipsis1} 0.6s infinite;
    }
    ${this} div:nth-child(2) {
        left: 8px;
        animation: ${ellipsis2} 0.6s infinite;
    }
    ${this} div:nth-child(3) {
        left: 32px;
        animation: ${ellipsis2} 0.6s infinite;
    }
    ${this} div:nth-child(4) {
        left: 56px;
        animation: ${ellipsis3} 0.6s infinite;
    }
`
