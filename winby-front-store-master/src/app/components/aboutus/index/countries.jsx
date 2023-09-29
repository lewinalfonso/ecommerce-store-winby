import React from 'react'
import styled from 'styled-components'
import bolivia from '../../../../assets/icons/bolivia.svg'
import chile from '../../../../assets/icons/chile.svg'
import argentina from '../../../../assets/icons/Argentina.svg'
import brazil from '../../../../assets/icons/brazil.svg'
import colombia from '../../../../assets/icons/colombia.svg'
import costarica from '../../../../assets/icons/costarica.svg'
import cuba from '../../../../assets/icons/cuba.svg'
import ecuador from '../../../../assets/icons/ecuador.svg'
import elsalvador from '../../../../assets/icons/elsalvador.svg'
import panama from '../../../../assets/icons/panama.svg'
import honduras from '../../../../assets/icons/honduras.svg'
import mexico from '../../../../assets/icons/mexico.svg'
import nicaragua from '../../../../assets/icons/nicaragua.svg'
import guatemala from '../../../../assets/icons/guatemala.svg'
import paraguay from '../../../../assets/icons/paraguay.svg'
import peru from '../../../../assets/icons/peru.svg'
import puertorico from '../../../../assets/icons/puertorico.svg'
import republidominicana from '../../../../assets/icons/republidominicana.svg'
import uruguay from '../../../../assets/icons/uruguay.svg'
import venezuela from '../../../../assets/icons/venezuela.svg'
import { BGColor, PColor, BGVColor } from '../../../../assets/colors'

export const Countries = () => {
    return (<>
        <Container>
            <Content> 
                <ContainerChildren >
                    <Box>
                        <Text>Bolivia</Text>
                        <ImgFlag src={ bolivia } />
                    </Box>
                    <Box>
                        <Text>Brazil</Text>
                        <ImgFlag src={ brazil } />
                    </Box>
                    <Box>
                        <Text>Chile</Text>
                        <ImgFlag src={ chile } />
                    </Box>
                    <Box>
                        <Text>Colombia</Text>
                        <ImgFlag src={ colombia } />
                    </Box>
                    <Box>
                        <Text>Argentina</Text>
                        <ImgFlag src={ argentina } />
                    </Box>
                    <Box>
                        <Text>Costa Rica</Text>
                        <ImgFlag src={ costarica } />
                    </Box>
                    <Box>
                        <Text>Cuba</Text>
                        <ImgFlag src={ cuba } />
                    </Box>
                    <Box>
                        <Text>Ecuador</Text>
                        <ImgFlag src={ ecuador } />
                    </Box>
                    <Box>
                        <Text>El Salvador</Text>
                        <ImgFlag src={ elsalvador } />
                    </Box>
                    <Box>
                        <Text>Honduras</Text>
                        <ImgFlag src={ honduras } />
                    </Box>
                    <Box>
                        <Text>Mexico</Text>
                        <ImgFlag src={ mexico } />
                    </Box>
                    <Box>
                        <Text>Nicaragua</Text>
                        <ImgFlag src={ nicaragua } />
                    </Box>
                    <Box>
                        <Text>Guatemala</Text>
                        <ImgFlag src={ guatemala } />
                    </Box>
                    <Box>
                        <Text>Panama</Text>
                        <ImgFlag src={ panama } />
                    </Box>
                    <Box>
                        <Text>Paraguay</Text>
                        <ImgFlag src={ paraguay } />
                    </Box>
                    <Box>
                        <Text>Peru</Text>
                        <ImgFlag src={ peru } />
                    </Box>
                    <Box>
                        <Text>Puerto Rico</Text>
                        <ImgFlag src={ puertorico } />
                    </Box>
                    <Box>
                        <Text>República Dominicana</Text>
                        <ImgFlag src={ republidominicana } />
                    </Box>
                    <Box>
                        <Text>Uruguay</Text>
                        <ImgFlag src={ uruguay } />
                    </Box>
                    <Box>
                        <Text>Venezuela</Text>
                        <ImgFlag src={ venezuela } />
                    </Box>
                </ContainerChildren >
            </Content>
        </Container>
    </>
    )
}
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-color: ${ BGColor };
`
const Content = styled.div`
    width: 100%;
    max-width: 900px;
    display: flex;
    margin: auto;   
`
const ContainerChildren = styled.div`
    width: 100%;
    display: grid;
    grid-template: 1fr / 20% 20% 20% 20% 20% ;
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid ${ PColor };
    @media(max-width: 768px){
        grid-template: 1fr / 25% 25% 25% 25% ;

    }
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    text-align: center;
    margin: 10px 0px;
    justify-content: center;
    display: flex;
    height: 170px;
    @media(max-width:768px){
        height: 100px;
    }

`
const ImgFlag = styled.img`
    border: 3px solid ${ BGColor };
    width: 75%;
    border-radius: 50%;
`
const Text = styled.h2`
    font-family: PFont-Regular;
    font-size: 15px;
    color: ${  BGVColor };
    @media(max-width:768px){
        font-size: 14px;
    }
`