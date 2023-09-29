import React from 'react'
import styled from 'styled-components'
import laptop from '../../../../assets/img/laptop.jpg'
import cruisePGOpportunities from '../../../../assets/img/cruisePGOpportunities.jpg'
import carPGOpportunities from '../../../../assets/img/carPGOpportunities.jpg'
import vanPGOpportunities from '../../../../assets/img/vanPGOpportunities.jpg'
import condominiumPGOpportunities from '../../../../assets/img/condominiumPGOpportunities.jpg'
import { BGVColor, PColor } from '../../../../assets/colors'
import bloque from '../../../../assets/img/BLOQUE-PREMIOS.jpg'

export const Award = () => (<>
    <div />
    <Container id='sCompany' >
        <ContainerOverline>
            <Content id='sAwardsWinby'>
                <ContainerChildren>
                    <Text>PREMIOS DE LIDERAZGO</Text>
                    <Paragraph>En Winby nos encanta recompensar a nuestros líderes con una experiencia <br></br>inolvidable cada vez que alcanza una meta</Paragraph>
                    <ContentBonusLeader>
                        <CardBonus>
                            <ImgBonus src={cruisePGOpportunities} />
                            <FigureB> Aprendizaje</FigureB>
                            <Reward>Winber Junior</Reward>
                            <Reward>Winber Senior</Reward>
                            <Reward>Winber Master</Reward>
                        </CardBonus>
                        <CardBonus>
                            <ImgBonus src={laptop} />
                            <FigureB> Emprendimiento</FigureB>
                            <Reward>Winber Bronce</Reward>
                            <Reward>Winber PLata</Reward>
                            <Reward>Winber Oro</Reward>
                        </CardBonus>
                        <CardBonus>
                            <ImgBonus src={carPGOpportunities} />
                            <FigureB> Duplicación</FigureB>
                            <Reward>Rhino Junior</Reward>
                            <Reward>Rhino Senior</Reward>
                            <Reward>Rhino Master</Reward>
                            <Reward>Rhino Bronce</Reward>
                        </CardBonus>
                        <CardBonus>
                            <ImgBonus src={vanPGOpportunities} />
                            <FigureB> Consolidación</FigureB>
                            <Reward>Rhino Plata</Reward>
                            <Reward>Rhino Oro</Reward>
                            <Reward>Rhino Negro</Reward>
                            <Reward>Rhino Blanco</Reward>
                            <SpanReward>X2 meses viaje Nacional o recarga WInby por 10.000.000 </SpanReward>
                            <Reward>Rino Bronce</Reward>
                            <SpanReward>X2 meses viaje Internacional o recarga WInby por 20.000.000 </SpanReward>
                        </CardBonus>
                        <CardBonus>
                            <ImgBonus src={condominiumPGOpportunities} />
                            <FigureB> Libertad</FigureB>
                            <Reward> Rhino Rojo</Reward>
                            <SpanReward>X2 meses equipamiento del Hogar o recarga Winby por 38.500.000  </SpanReward>
                            <Reward> Rhino Indy</Reward>
                            <SpanReward>X2 meses Automovin Sedam o recarga Winby por 70.000.000  </SpanReward>
                            <Reward> Rhino Sum</Reward>
                            <SpanReward>X2 meses Cabaña Campestre o recarga Winby por 390.000.000  </SpanReward>
                            <Reward> Rhino Java</Reward>
                        </CardBonus>
                    </ContentBonusLeader>
                </ContainerChildren >
            </Content>
        </ContainerOverline>

        <Text>ESTOS SON AlGUNOS DE LOS PREMIOS</Text>
        <ImgBlock src={bloque} />
        
    </Container>
</>
)
const Container = styled.div`
    width: 100%;    
    width:100%;
    display: flex;
    flex-direction: column;
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100%;`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 120vh;   
    display: flex;
    margin: auto;
    margin-bottom: 5%;
    @media(max-width: 768px){
        height: auto;
    }
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
    text-align: start;
    color: ${PColor};
    padding-left: 4%;
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
const Reward = styled.div`
    border-bottom: 1px dashed ${BGVColor};
    padding: 36px 0px 5px;
    color: ${PColor};
    font-family: PFont-Bold;
`
const CardBonus = styled.div`
    align-self: baseline;
    font-size: 15px;
    display: flex;
    align-items: center;
    width: 90%;
    justify-content: center;
    flex-direction: column;
    font-family: PFont-Regular;
    @media(max-width: 768px) {
        width: 100%;
    }
`
const FigureB = styled.span`
    background: transparent linear-gradient(270deg, #FF0000 0%, #800000 100%) 0% 0% no-repeat padding-box;
    border-radius: 12px;
    color: white;
    padding: 8px 10px;
    font-size: 20px;
    height: 40px;
    width: 198px;
    text-align-last: center;
    font-family: PFont-Bold;
    @media(max-width: 768px){
        align-items: center;
        font-size: 12px;
        padding: 0px;
        align-self: center;
        width: 120px;
        justify-content: center;
        display: flex;
    }
`

const ImgBonus = styled.img`
    padding: 5px;
    height: 225px;
    width: 210px;
    @media(max-width: 768px ){
        padding: 0px;
        height: 100px;
        width: 130px;
        margin: 10px 3px;
        border-radius: 10%;
        
    }
`
const SpanReward = styled.span`
    font-size: 12px;
    color: ${BGVColor};
    font-family: PFont-Regular;
    @media(max-width: 768px) {
        text-align: center;
    }
`
const ContentBonusLeader = styled.div`
    width: 100%;
    height: 100%;
    grid-gap: 13px;
    display: grid;
    grid-template: 1fr/ 20% 20% 20% 20% 20% ;
    @media(max-width:768px){
        display: grid;
        grid-template: 1fr/ 50% 50%;
        margin: auto;
        grid-gap: 0px;
    }
`
export const ImgBlock = styled.img`
    height: auto;
    width: 100%;
    padding: 1.3% 1%;
`