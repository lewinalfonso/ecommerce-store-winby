import React from 'react'
import styled from 'styled-components'
import Angelo from '../../../../assets/img/Angelo.jpg'
import Alberto from '../../../../assets/img/Alberto.jpg'
import Gio from '../../../../assets/img/Gio.jpg'
import Estefany from '../../../../assets/img/Estefany.jpg'
import Jay from '../../../../assets/img/Jay.jpg'
import Giovanni from '../../../../assets/img/Giovanni.jpg'
import Jader from '../../../../assets/img/Jader.jpg'
import Ariza from '../../../../assets/img/Ariza.jpg'
import Jesus from '../../../../assets/img/Jesus.jpg'
import Niulwin from '../../../../assets/img/Niulwin.jpg'
import Henry from '../../../../assets/img/Henry.jpg'
import Cuevas from '../../../../assets/img/Cuevas.jpg'
import Hugo from '../../../../assets/img/Hugo.jpg'
import Juvinao from '../../../../assets/img/Juvinao.jpg'
import Solon from '../../../../assets/img/Solon.jpg'
import Jorge from '../../../../assets/img/Jorge.jpg'
import { BGColor, BGVColor, PColor } from '../../../../assets/colors'

export const OurTeam = () => (<>
<div />
    <Container>
        <Content>
            <ContainerChildren >
                <Box>
                    <ImgFlag src={ Angelo } />
                    <Text>Angelo Del Castillo</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Chief Executive Officer</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Gio } />
                    <Text >Giohan Del Castillo</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Presidente</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Estefany } />
                    <Text >Estefanía Manrique</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Servicio al Cliente</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Jay } />
                    <Text>Jaydelinn Peralta</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Servicio al Cliente</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Giovanni } />
                    <Text>Giovanni Del Castillo</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Director de Compras</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Jader } />
                    <Text >Jader Ferraro</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Director de Compras</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Alberto } />
                    <Text >Alberto Gómez</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Diseñador Gráfico</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Ariza } />
                    <Text >David Ariza</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Director de Logística</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Jesus } />
                    <Text >Jesús Eguis</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Chief Technology Officer</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Niulwin } />
                    <Text >Niulwin Ríos</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Henry } />
                    <Text >Henry Añez</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Cuevas } />
                    <Text >Luis Cuevas</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Hugo } />
                    <Text >Hugo Gutiérrez</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Juvinao } />
                    <Text >Jesus Juvinao</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Solon } />
                    <Text >Jose Solon</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
                </Box>
                <Box>
                    <ImgFlag src={ Jorge } />
                    <Text >Jorge Correa</Text>
                    <Text size=' 11px' Family=' PFont-Regular'>Desarrollador</Text>
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
    display: flex;
    margin: auto;   
`
const ContainerChildren = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 50px;
    grid-template: 1fr / 20% 20% 20% 20% ;
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: 1px solid ${ PColor };
    @media(max-width: 768px){
      grid-template: 1fr / 50% 50%;
      grid-gap: 5px;

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
    border-bottom: 1px solid ${ PColor };
`
const ImgFlag = styled.img`
    width: 100%;
    height: 200px;
    /* object-fit: cover; */
`
const Text = styled.h2`
    font-family: ${({ Family })=> Family ? Family : 'PFont-Bold'};
    font-size: ${({ size }) => size ? size : '13px'};
    color: ${BGVColor};
    margin: 7px;
    height: 35px;
`