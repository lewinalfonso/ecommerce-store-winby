import React from 'react'
import styled from 'styled-components'
import rangeOne from '../../../../assets/img/rangeOne.png'
import rangeTwo from '../../../../assets/img/rangeTwo.png'
import rangeThree from '../../../../assets/img/rangeThree.png'
import winbyBronze from '../../../../assets/img/winbyBronze.png'
import winbyPlata from '../../../../assets/img/winbyPlata.png'
import winbyOro from '../../../../assets/img/winbyOro.png'
import rhinoJunior from '../../../../assets/img/rhinoJunior.png'
import rhinoSenior from '../../../../assets/img/rhinoSenior.png'
import rhinoMaster from '../../../../assets/img/rhinoMaster.png'
import rhinoBronce from '../../../../assets/img/rhinoBronce.png'
import rhinoPlata from '../../../../assets/img/rhinoPlata.png'
import rhinoBlanco from '../../../../assets/img/rhinoBlanco.png'
import rhinoJava from '../../../../assets/img/rhinoJava.png'
import rhinoRojo from '../../../../assets/img/rhinoRojo.png'
import rhinoNegro from '../../../../assets/img/rhinoNegro.png'
import rhinoSum from '../../../../assets/img/rhinoSum.png'
import rhinoIndy from '../../../../assets/img/rhinoIndy.png'
import rhinoOro from '../../../../assets/img/rhinoOro.png'   
import { BGVColor } from '../../../../assets/colors'

export const RangesWinby = () => (<>
    <div />
        <ContainerOverline>
            <Content id='sRank'>
                <ContainerChildren>
                    <Text >Rangos Winby</Text>
                    <ContenTitleRanges>
                        <Text align='center' >Aprendizaje</Text>
                    </ContenTitleRanges>
                    <ContentRanges>
                        <CardRanks>
                            <Img src={rangeOne} />
                            <Paragraph>Winber Junior</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <Img src={rangeTwo} />
                            <Paragraph>Winber Senior</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <Img src={rangeThree} />
                            <Paragraph>Winber Master</Paragraph>
                        </CardRanks>
                    </ContentRanges>
                    <ContenTitleRanges>
                        <Text >Emprendimiento</Text>
                    </ContenTitleRanges>


                    <ContentRanges>
                        <CardRanks>
                            <Img src={winbyBronze} />
                            <Paragraph>Winber Bronce</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <Img src={winbyPlata} />
                            <Paragraph>Winber Plata</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <Img src={winbyOro} />
                            <Paragraph>Winber Oro</Paragraph>
                        </CardRanks>
                    </ContentRanges>
                    <ContenTitleRanges>
                        <Text >Duplicación</Text>
                    </ContenTitleRanges>

                    <ContentRanges>
                        <CardRanks>
                            <Img src={rhinoJunior} />
                            <Paragraph>Rhino Junior</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <Img src={rhinoSenior} />
                            <Paragraph>Rhino Senior</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <Img src={rhinoMaster} />
                            <Paragraph>Rhino Master</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            {/* CAMBIAR POR NUEVO */}
                            <Img src={rhinoBronce} />
                            <Paragraph>Rhino Bronce</Paragraph>
                        </CardRanks>
                    </ContentRanges>
                    {/* Consolidacion */}
                    <ContenTitleRanges>
                        <Text >Consolidación</Text>
                    </ContenTitleRanges>

                    <ContentRanges>
                        <CardRanks>
                            <ImgRino src={rhinoPlata} />
                            <Paragraph>Rhino Plata</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <ImgRino src={rhinoOro} />
                            <Paragraph>Rhino Oro</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <ImgRino src={rhinoNegro} />
                            <Paragraph>Rhino Negro</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <ImgRino src={rhinoBlanco} />
                            <Paragraph>Rhino Blanco</Paragraph>
                        </CardRanks>
                    </ContentRanges>
                    {/* Libertad */}
                    <ContenTitleRanges>
                        <Text >Libertad</Text>
                    </ContenTitleRanges>

                    <ContentRanges>
                        <CardRanks>
                            <ImgRino src={rhinoRojo} />
                            <Paragraph>Rhino Rojo</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <ImgRino src={rhinoIndy} />
                            <Paragraph>Rhino Indy</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <ImgRino src={rhinoSum} />
                            <Paragraph>Rhino Sum</Paragraph>
                        </CardRanks>
                        <CardRanks>
                            <ImgRino src={rhinoJava} />
                            <Paragraph>Rhino Java</Paragraph>
                        </CardRanks>
                    </ContentRanges>

                </ContainerChildren >
            </Content>
        </ContainerOverline>
</>
)

const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    margin: auto;    
`
const ContainerChildren = styled.div`
    width: 100%;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-self: center; 
    @media(max-width: 769px){
        width: 90%;
    }
`
const Text = styled.h2`
    font-family: PFont-Regular;
    font-size: 20px;
    text-align: center;
    color: ${BGVColor};
`
const Paragraph = styled.p`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: ${BGVColor};
    line-height: 1.3em;
    @media(max-width:768px){
        font-size: 14px;
    }
`
const ImgRino = styled.img`
    padding: 5px;
    width: 270px;
    height: 225px;
    @media(max-width: 768px ){
        padding: 0px;
        height: 100px;
        width: 130px;
    }
`
const ContentRanges = styled.div`
    width: 100%;
    margin: auto;
    height: 100%;
    display: flex;    
    flex-wrap: wrap;
    justify-content: start;
    flex-direction: row;
`
const ContenTitleRanges = styled.div`
    width: 90%;
    margin: 45px 0px 0px auto;
    display: flex;    
    align-items: self-end;
    flex-direction: column;
`
const CardRanks = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-direction: column;
    font-family: PFont-Regular;
    @media(max-width: 768px) {
        padding: 0px;
    }
`
const Img = styled.img`
    padding: 5px;
    height: 225px;
    width: 270px;
    @media(max-width: 768px ){
        padding: 0px;
        height: 100px;
        width: 100px;
    }
`