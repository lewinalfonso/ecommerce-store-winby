import React from 'react'
import styled, { css } from 'styled-components'
import bannerMissionvision from '../../../../assets/img/bannerMissionvision.jpg'
import misionVisionMovil from '../../../../assets/img/misionVisionMovil.jpg'
import { BGColor } from '../../../../assets/colors'
export const MisionVision = ({ reference }) => (<>
    <div />
    <Container id='sVision' ref={reference}>
        <ContainerOverline>
            <Content>
                <ContainerChildren width='50%' />
                <ContainerChildren width='50%'>
                    <Text>Misión</Text>
                    <Paragraph>
                        Buscamos la satisfacción de las necesidades de nuestros clientes, ofreciéndoles gran variedad de productos de la mejor calidad y servicios prestados con excelencia e integridad, y el mejoramiento de la calidad de vida de nuestra comunidad empresarial, nuestros grupos de interés y la comunidad en general, brindándoles a todos la oportunidad de adquirir una licencia del Software Winby y ser empresarios exitosos con un modelo de negocio de baja inversión, de gran rentabilidad y que se puede manejar desde la comodidad del hogar.
                    </Paragraph>
                    <Text>Visión</Text>
                    <Paragraph>
                        En el 2030 seremos reconocidos como la empresa latinoamericana de mayor impacto social en la década; recibiremos los abrazos fraternos de aquellos a quienes ayudamos a encontrar la libertad financiera, la sonrisa de los niños que para ese entonces pensarán en grande porque sus padres son grandes empresarios y sobre todo, tendremos la satisfacción de haber contribuido a la sociedad y dejado nuestra huella impregnada en la vida de millones de nuevos empresarios en toda Latinoamérica.
                    </Paragraph>
                </ContainerChildren>
            </Content>
        </ContainerOverline>
    </Container>

</>
)
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    background-image: url(${bannerMissionvision});
    width: 100%;    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media(max-width: 769px){
        background-image: url(${misionVisionMovil});
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
`
const ContainerOverline = styled.div`
    width:100%;   
    height: 100vh;
    background-color:rgb(0 0 0 / 11%);
    @media(max-width: 768px){
        height: 100%;
    }
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    height: auto;   
    display: flex;
    margin: auto;   
    @media(max-width: 769px){
        flex-direction: column;
    }
    & > div:nth-child(1){
    @media(max-width: 769px){
        display: none;
    }
    }
`
const ContainerChildren = styled.div`
    ${({ width }) => width && css`width: ${width};`};
    display: flex;
    margin: auto;
    margin-top: 15%;
    flex-direction: column;
    justify-content: center;
    align-self: center; 
    @media(max-width: 769px){
        width: 90%;
    }   
`
const Text = styled.h2`
    font-family: PFont-Bold;
    font-size: 26px;
    text-align: start;
    color: #606060;
    @media(max-width: 768px){
        color: ${BGColor};
        font-size: 25px;
        margin-bottom: 0%;
    }
`
const Paragraph = styled.p`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: #606060;
    line-height: 1.3em;
    @media(max-width:768px){
        font-size: 14px;
        color: ${BGColor};
    }
`