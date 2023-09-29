import React from 'react'
import styled from 'styled-components'
import socialManagementOne from '../../../../assets/img/socialManagementOne.jpg'
import socialManagementTow from '../../../../assets/img/socialManagementTow.jpg'
import socialManagementThree from '../../../../assets/img/socialManagementThree.jpg'
import socialManagementFour from '../../../../assets/img/socialManagementFour.jpg'
import socialManagementSix from '../../../../assets/img/socialManagementSix.jpg'
import socialManagementSeven from '../../../../assets/img/socialManagementSeven.jpg'
import socialManagenteight from '../../../../assets/img/socialManagenteight.jpg'
import socialManagementNine from '../../../../assets/img/socialManagementNine.jpg'
import socialManagementTen from '../../../../assets/img/socialManagementTen.jpg'
import socialManagenteleven from '../../../../assets/img/socialManagenteleven.jpg'
import socialManagentTwelve from '../../../../assets/img/socialManagentTwelve.jpg'
import socialManagentThirteen from '../../../../assets/img/socialManagentThirteen.jpg'
import SocialManagementfifteen from '../../../../assets/img/SocialManagementfifteen.jpg'
import socialManagementFive from '../../../../assets/img/socialManagementFive.jpg'
import { BGColor, PColor, BGVColor } from '../../../../assets/colors'

export const SOCIALMANAGEMENT = () => (<>
    <div />
    <Container id='sGestiónSocial'>
        <Content>
            <Text>Gestión Social <br/>Fundación Winby</Text>
            <ContainerChildren >
                <Box>
                    <ImgFlag src={socialManagementOne} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementTow} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementThree} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementFour} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementFive} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementSix} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementSeven} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagenteight} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementNine} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagementTen} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagenteleven} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagentTwelve} />
                </Box>
                <Box>
                    <ImgFlag src={socialManagentThirteen} />
                </Box>
                <Box>
                    <ImgFlag src={SocialManagementfifteen} />
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
    background-color: ${ BGColor };
`
const Content = styled.div`
    width: 100%;
    max-width: 900px;
    flex-direction: column;
    display: flex;
    margin: auto;
    margin-top: 5%;
    & > h2{
        justify-content: center;
        display: flex;
        width: 50%;
        width: 60%;
        font-size: 21px;
        margin-bottom: 6%;
    }
`
const ContainerChildren = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template: 1fr / 33.3% 33.3% 33.3% ;
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid ${PColor};
    @media(max-width: 768px){
      grid-template: 1fr / 33% 33% 33%;
      grid-gap: 0px;
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
`
const ImgFlag = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    @media(max-width: 768px){
        width: 100px;
        height: 100px;
    }
`
const Text = styled.h2`
    font-family:  PFont-Bold;
    font-size: 100px;
    color: ${ BGVColor };
    margin: auto;
    text-align: center;
    @media(max-width: 768px){
        font-size: 34px;
    }
`