import React from 'react'
import styled from 'styled-components'
import { BGColor, BGVColor, PColor } from '../../../../assets/colors'
import banner25G from '../../../../assets/img/banner25G.jpg'
import banner25GMovile from '../../../../assets/img/banner25GMovile.jpg'
import Consuegra from '../../../../assets/img/Consuegra.jpg'
import EstefaniVergara from '../../../../assets/img/EstefaniVergara.jpg'
import Corcho from '../../../../assets/img/Corcho.jpg'
import EdgarCure from '../../../../assets/img/EdgarCure.jpg'
import DarlinsonRestrepo from '../../../../assets/img/DarlinsonRestrepo.jpg'
import Jhoanvillalva from '../../../../assets/img/Jhoanvillalva.jpg'
import JurliethRestrepo from '../../../../assets/img/JurliethRestrepo.jpg'
import DayanaRodriguez from '../../../../assets/img/DayanaRodriguez.jpg'
import JorgePerez from '../../../../assets/img/JorgePerez.jpg'
import { Animations } from '..'
export const G25 = () => (<>
    <div />
    <Container>
        <Content>
            <Text>El G25</Text>
            <Animations count='0.1'>
            </Animations>
            <Animations count='0.1'>
                <Paragraph>Son consultores externos, asociados a Winby que a través de sus experiencias, habilidades y destrezas fortalecen las áreas y procesos que Winby desarrolla.</Paragraph>
            </Animations>
        </Content>
        <Img src={banner25G} /> <ImgBannerMOvil src={banner25GMovile} />
        <Content>
            <ContainerChildren >
                <Box>
                    <ImgFlag src={EstefaniVergara} />
                    <Text size='16px'>STEFANI VARGAS</Text>
                    <Text size=' 11px' Family='PFont-Regular'>ABOGADA</Text>
                </Box>
                <Box>
                    <ImgFlag src={Corcho} />
                    <Text size='16px'>RICARDO CORCHO</Text>
                    <Text size=' 11px' Family='PFont-Regular'>NETWORKER</Text>
                </Box>
                <Box>
                    <ImgFlag src={EdgarCure} />
                    <Text size='16px'>EDGAR CURE</Text>
                    <Text size=' 11px' Family='PFont-Regular'>NETWORKER</Text>
                </Box>
                <Box>
                    <ImgFlag src={Consuegra} />
                    <Text size='16px'>ALEJANDRO CONSUEGRA</Text>
                    <Text size=' 11px' Family='PFont-Regular'>ASESOR MARKETING DIGITAL</Text>
                </Box>
                <Box>
                    <ImgFlag src={DarlinsonRestrepo} />
                    <Text size='16px'>DARLINSON RESTREPO</Text>
                    <Text size=' 11px' Family='PFont-Regular'>NETWORKER</Text>
                </Box>
                <Box>
                    <ImgFlag src={Jhoanvillalva} />
                    <Text size='16px'>JHOAN VILLALBA</Text>
                    <Text size=' 11px' Family='PFont-Regular'>CONFERENCISTA</Text>
                </Box>
                <Box>
                    <ImgFlag src={JurliethRestrepo} />
                    <Text size='16px'>JURLIETH RESTREPO</Text>
                    <Text size=' 11px' Family='PFont-Regular'>NETWORKER</Text>
                </Box>
                <Box>
                    <ImgFlag src={DayanaRodriguez} />
                    <Text size='16px'>DAYANA RODRÍGUEZ</Text>
                    <Text size=' 11px' Family='PFont-Regular'>PRESENTADORA Y COACH MOTIVACIONAL</Text>
                </Box>
                <Box>
                    <ImgFlag src={JorgePerez} />
                    <Text size='16px'>JORGE PÉREZ</Text>
                    <Text size=' 11px' Family='PFont-Regular'>MARKETING TRADICIONAL</Text>
                </Box>
            </ContainerChildren >
        </Content>
    </Container>

</>
)

const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-color: ${BGColor};
`
const Content = styled.div`
    width: 100%;
    max-width: 900px;
    flex-direction: column;
    display: flex;
    margin: 10px auto;
`
const ContainerChildren = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 50px;
    grid-template: 1fr / 20% 20% 20% 20% ;
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid ${PColor};
    @media(max-width: 768px){
      grid-template: 1fr / 33% 33% 33%;
      grid-gap: 0px;
    }
`
const Img = styled.img` 
    height: 200px;
    width: 100%;
    @media (max-width: 768px){ 
        display: none;
    } 
`
const ImgBannerMOvil = styled.img`
    display: none;
    @media (max-width: 768px){ 
        display: block; 
        height: 200px;
        width: 96%;
        margin: 2%;
    } 
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    text-align: center;
    margin: 0px 5px;
    justify-content: center;
    display: flex;
    height: auto;
    margin: auto;
    border-bottom: 1px solid ${PColor};
   
`
const ImgFlag = styled.img`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    @media(max-width: 768px){
        width: 100px;
        height: 100px;
    }
`
const Text = styled.h2`
    font-family: ${({ Family }) => Family ? Family : 'PFont-Bold'};
    font-size: ${({ size }) => size ? size : '20px'};
    color: ${BGVColor};
    margin: 7px 12px;
    height: 40px;
`

const Paragraph = styled.p`
    margin: 9px 12px;
    font-family: 'PFont-regular';
    font-size: 17px;
    text-align: justify;
    color: ${BGVColor};
    line-height: 1.3em;
    @media(max-width: 768px){
        font-size: 14px;
    }
`