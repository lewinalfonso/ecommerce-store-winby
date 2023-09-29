import React from 'react'
import styled from 'styled-components'
import Header from './layout/index'
import { Animations } from './index'
import { BGColor, PColor, PVColor } from '../../../assets/colors'
import { IconLogoType } from '../../../assets/icons'
import bannerFooterProducts from '../../../assets/img/bannerFooterProducts.jpg'
import bannerFooterProductsMovil from '../../../assets/img/bannerFooterProductsMovil.jpg'
import Footer from './layout/footer'

export default ({ state, handleMenu }) => (<>
    <Header handleMenu={handleMenu} visible={state.visible} state={state} />
    <Bg>
        <Container>
            <Text >Productos</Text>
            <Paragraph>Gracias a nuestro modelo de negocio, mercadeamos una gran cantidad de productos y servicios en diferentes categorías para que nuestros WINBERS sientan la libertad de escoger los productos que más se ajusten a su perfil y puedan venderlos con mayor facilidad y también para que nuestro cliente final pueda conseguir todo lo que necesita en WINBY.</Paragraph>
            <Paragraph>Algunas de nuestras categorías son:</Paragraph>
            <ContainerIcon >
                <IconLogoType size='200px' color={BGColor} />
            </ContainerIcon>
            <Content>

                <ListContain >
                    <Li>Tecnología</Li>
                    <Li>Canasta Familiar</Li>
                    <Li>Hogar</Li>
                    <Li>Prendas de Vestir</Li>
                    <Li>Deporte</Li>
                    <Li>Arte y Manualidades</Li>
                    <Li>Automotores</Li>
                    <ListContain >
                        <ListContain >
                            <Li>Belleza</Li>
                            <Li>Electrodomésticos </Li>
                            <Li>Instrumentos musicales</Li>
                            <Li>Zapatos</Li>
                            <Li>Joyería</Li>
                            <Li>Accesorios para deporte</Li>
                        </ListContain>
                    </ListContain>
                </ListContain >

                <ListContainMovil>
                    <ListContain  >
                        <Li>Belleza</Li>
                        <Li>Electrodomésticos </Li>
                        <Li>Instrumentos musicales</Li>
                        <Li>Zapatos</Li>
                        <Li>Joyería</Li>
                        <Li>Accesorios para deporte</Li>
                    </ListContain>
                    <Animations count='0.1'>
                        <Img />
                    </Animations>
                </ListContainMovil>

                <ContainerImg>
                    <img  alt='Img' style={{ height: '70%' }} src={bannerFooterProductsMovil} />
                </ContainerImg>

            </Content>
        </Container>

    </Bg>
    <Animations count='0.1'>
        <Img src={bannerFooterProducts} />
    </Animations>
    <Footer />
</>
)

const Container = styled.div`
    padding-top: 100px;
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: 100vh;   
    display: flex;
    margin: auto;   
    flex-direction: column;
    @media(max-width: 768px){
        padding-top: 0px;
        width: 90%;
        margin: auto;
        height: auto; 
    }
`
const ContainerIcon = styled.div`
    position: absolute;
    left: 40%;
    right: 0;
    top: 20%;
    @media(max-width: 768px){
        display: none;   
    }
    & > svg{ 
        opacity: 50%;
    }
`
const Paragraph = styled.p`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: ${BGColor};
    line-height: 1.3em;
    @media(max-width:768px){
        font-size: 14px;
      
    }
`
const ListContain = styled.div`

  & >div{
      @media(min-width:768px){
          display: none;
      }
  }
`
const ListContainMovil = styled.div`
  @media (max-width: 768px){
    display: none;
  }
`
const Li = styled.li`
    margin: 9px 0px;
    font-family: PFont-regular;
    font-size: 16px;
    text-align: justify;
    color: ${BGColor};
    line-height: 1em;
    @media(max-width:768px){
        font-size: 13px;
        text-align: inherit;
    }
    list-style: none;
    padding: 10px;
    &::before{
        content: "-  ";
    }
`
const Content = styled.div`
    width: 90%;
    display: grid;
     grid-template-columns: repeat(2, 1fr);
`
const Img = styled.img`
    width: 100%;    
    @media (max-width: 768px) {
        display: none;
    }   
`
const ContainerImg = styled.div`
    @media (min-width: 768px) {
        display: none;
    @media (max-width: 768px) {
        display: none;
    }
    }
`
const Bg = styled.div`
    background-image: linear-gradient(300deg, ${BGColor},${PColor}, ${PVColor});
`
const Text = styled.h2`
    font-family: PFont-Bold;
    font-size: 17px;
    text-align: start;
    color: ${BGColor};
`