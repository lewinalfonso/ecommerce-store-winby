import React  from 'react'
import styled, { css } from 'styled-components'
import Header from './layout/index'
import Footer from './layout/footer'
import { animFadeInDown, animFirst } from '../../common/Animations'
import { SOCIALMANAGEMENT } from './index/social'
import { Politics } from './index/politics'
import { G25 } from './index/G25'
import { OurTeam } from './index/ourTeam'
import { Countries } from './index/countries'
import { International } from './index/international'
import { MisionVision } from './index/misionVision'
import Logo from '../../../assets/img/Logowinby.png'
import { Company } from './index/company'
import bannerWelcomeFamilyMovil from '../../../assets/img/bannerWelcomeFamilyMovil.jpg'
import bannerWelcomeFamily from '../../../assets/img/bannerWelcomeFamily.jpg'
import { BGColor } from '../../../assets/colors'

export default ({ state, handleMenu }) => {
    return (<>

        <Header handleMenu={handleMenu} visible={state.visible} state={state} />
        <Container>
            <ContainerOverline>
                <Content>
                    <ContainerChildren>
                        <ContainerImagen>
                            <Icon src={Logo} />
                        </ContainerImagen>
                    </ContainerChildren>
                    <ContainerChildren>
                        <Text> BIENVENIDOS A LA <b>FAMILIA</b></Text>
                    </ContainerChildren>
                </Content>
            </ContainerOverline>
        </Container>
        <Company />
        <MisionVision />
        <International />
        <Countries />
        <OurTeam />
        <G25 />
        <SOCIALMANAGEMENT />
        <Politics />
        <Footer />

    </>
    )
}

export const BgImg = styled.div`
    width: 100%;
    height: ${({ height }) => height ? height : '700px'};
    ${({ bgImg }) => bgImg && css`
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-image: url(${bgImg});
    `}
    @media (max-width: 768px) {
        height: 1300px;
    }
    @media (max-width: 768px) {
        height: auto;
    }
`
export const Animations = styled.div`
    opacity: 0;
    animation: ${animFadeInDown} 1s;
    animation-fill-mode: forwards;
    animation-delay: ${({ count }) => count}s;
`
export const RightAnimation = styled.div`
    opacity: 0;
    animation: ${animFirst} 1s;
    animation-fill-mode: forwards;
    animation-delay: ${({ count }) => count}s;
`

const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${bannerWelcomeFamily});
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${bannerWelcomeFamilyMovil});
    }
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;
    background-color:rgb(0 0 0 / 62%);
    @media(max-width: 769px){
        background-color:rgb(0 0 0 / 15%);
    }
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100vh;   
    display: flex;
    margin: auto;   
    @media(max-width: 769px){
        display: grid;
    }

`
const ContainerChildren = styled.div`
    position: relative;
    width: 50%;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-self: center;    
`
const ContainerImagen = styled.div`
    width: 50%;
    padding: 0 60px;
    @media (max-width: 769px){
        width: 90%;
        padding-left: 33%;
        padding-right: 18%;
    }
`
const Icon = styled.img`
    width:100%;
    @media (max-width: 769px){
        width:  90%;
    }
`
const Text = styled.h2`
    position: absolute;
    top: -300px;
    font-family: PFont-Regular;
    font-size: 50px;
    text-align: end;
    color: ${  BGColor };
    & > strong{
        font-family: PFont-Bold;
        font-size: 60px;
    @media(max-width: 769px){
        font-size: 30px;
    }
    }
    @media(max-width: 769px){
        font-size: 18px;
        width: 100%;
        margin-top: 22%;
    }
`
