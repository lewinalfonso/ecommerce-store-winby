import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LogoWinby from '../../assets/icons/logoWinby.svg'
import bgImage from '../../assets/img/bannerLicenseStart.jpg'

const CounterV = ({ countDown }) => <Container>
    <Subcontainer>
        <ImageLogo src={LogoWinby} />
        <CounterContainer>
            <CounterItem>
                <CounterItemVal days>{countDown.days}</CounterItemVal>
                <CounterItemText>días</CounterItemText>
            </CounterItem>
            <CounterItem>
                <CounterItemVal>{countDown.hours}</CounterItemVal>
                <CounterItemText>horas</CounterItemText>
            </CounterItem>
            <CounterItem>
                <CounterItemVal>{countDown.minutes}</CounterItemVal>
                <CounterItemText>minutos</CounterItemText>
            </CounterItem>
            <CounterItem>
                <CounterItemVal>{countDown.seconds}</CounterItemVal>
                <CounterItemText>segundos</CounterItemText>
            </CounterItem>
        </CounterContainer>
    </Subcontainer>
</Container>

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 102px);
    display: flex;
    padding: 40px;
    align-items: center;
    justify-content: center;
    background: url(${bgImage}) no-repeat;
    background-size: cover;

    @media (max-width: 768px) { padding: 10px;  justify-content: center; }
`
const Subcontainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) { width: 100%; justify-content: center;}
    & > div {
        width: 50%;
    }
`
const CounterContainer = styled.div`
    /* margin-right: 30px; */
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CounterItem = styled.div`
    margin: 0 5px;
    text-align: center;
`

const CounterItemVal = styled.div`
    background: #fff;
    border-radius: 6px;
    width: 60px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 0px 3px 6px #00000096;

    @media(min-width: 768px){
        width: 100px;
        height: 80px;
        font-size: 24px;
        margin: 0 10px;
    }
`

const CounterItemText = styled.div`
    font-weight: 500;
    font-size: 14px;
    @media(min-width: 768px){
        font-size: 20px;
    }
`
const ImageLogo = styled.img`
    width: 350px;
    height: 300px;
    @media (min-width: 768px){
        width: 450px;
        height: 400px;
    }
    @media (min-width: 1740px){
        width: 550px;
        height: 500px;
        margin-bottom: 40px;
    }
`

export default connect(({ api }) => ({ api }), null)(CounterV)