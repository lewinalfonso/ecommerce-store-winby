import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { BGColor, APColor } from '../../../assets/colors';
import { CustomButton } from '../../common/Buttons'
import Modalles from '../../common/modal/Modal'
import { Context } from '../../common/modal/ContextModal'

export const StatePurchase = () => {

    const { isModal, setIsModal } = useContext(Context)

    return (
        <Container>
            <Content>
                <Title>Mis compras</Title>
                <Card className="CardPrincipal">
                    <ContainerInfo>
                        <ContainerCard width="80%" float='left'>
                            <Text width='auto' padding='0px 50px' paddingleft='15px' size='18px'>Compra realizada</Text>
                            <Text width='auto' padding='0px 50px' size='12px' paddingleft='15px'>Fecha de la compra</Text>
                            {/* {setIsProcess ?
                            <Text width='auto' padding='0px 50px' size='15px'>Fecha de la compra</Text>
                            :
                            <Text width='auto' padding='0px 50px' size='15px'>No terminó el proceso de compra</Text>
                        } */}
                            <Card paddingleft='15px' className='CardPrincipal'>
                                <Imgcard marginright='30px' src='https://http2.mlstatic.com/D_NQ_NP_2X_941952-MCO43932455180_102020-F.webp' title='' ></Imgcard>
                                <ContainerText>
                                    <TextName padding='5px 0px' size='16px'>Nombre del producto</TextName>
                                    <Flex>
                                        <Text padding='0px 5px' width='auto' size='10px' >Color: <strong color='#2a2a2a'>Negro</strong></Text>
                                        <Text padding='0px 5px' width='auto' size='10px'>Cantidad: 1</Text>
                                    </Flex>
                                    <Text padding='5px 0px' size='14px'>$900.000 c/u</Text>
                                </ContainerText>
                            </Card>
                        </ContainerCard>
                        <ContainerCard padding='15px' justify='flex-end' width="20%" float='right' height='80%'>
                            <CustomButton onClick={setIsModal} margin='2px auto' fontSize='12px' padding='6px' radius='0px' color={BGColor} bgColor='#068CF3' >Detalle de compra</CustomButton>
                            <CustomButton margin='2px auto' width='100%' fontSize='10px' padding='6px' radius='0px' color={APColor} bgColor='#FFFFFF' >Agregar al carrito</CustomButton>
                        </ContainerCard>
                    </ContainerInfo>
                </Card>
                <Card className="CardPrincipal">
                    <ContainerInfo>
                        <ContainerCard width="80%" float='left' height='100%'>
                            <Text width='auto' padding='0px 50px' paddingleft='15px' size='18px'>Compra realizada</Text>
                            <Text width='auto' padding='0px 50px' size='12px' paddingleft='15px'>No terminó el proceso de compra</Text>
                            <Card paddingleft='15px' className='CardPrincipal'>
                                <Imgcard marginright='30px' src='https://http2.mlstatic.com/D_NQ_NP_2X_941952-MCO43932455180_102020-F.webp' title='' ></Imgcard>
                                <ContainerText>
                                    <TextName padding='5px 0px' size='16px'>Nombre del producto</TextName>
                                    <Flex>
                                        <Text padding='0px 5px' width='auto' size='10px' >Color: <strong color='#2a2a2a'>Negro</strong></Text>
                                        <Text padding='0px 5px' width='auto' size='10px'>Cantidad: 1</Text>
                                    </Flex>
                                    <Text padding='5px 0px' size='14px'>$900.000 c/u</Text>
                                </ContainerText>
                            </Card>
                        </ContainerCard>
                        <ContainerCard padding='15px' justify='flex-end' width="20%" float='right' height='80%'>
                            <CustomButton onClick={setIsModal} margin='2px auto' fontSize='12px' padding='6px' radius='0px' color={BGColor} bgColor='#068CF3' >Detalle de compra</CustomButton>
                            <CustomButton margin='2px auto' width='100%' fontSize='10px' padding='6px' radius='0px' color={APColor} bgColor='#FFFFFF' >Agregar al carrito</CustomButton>
                        </ContainerCard>
                    </ContainerInfo>
                </Card>

                <Modalles direction='row' isModal={isModal} setIsModal={setIsModal}>
                    <ContainerModal>
                        <ContainerCardModal width="60%" float='left' paddingtop='20px' paddingleft='20px'>
                            <Text width="100%" size='14px' padding='0px 10px' paddingleft='0px'>Detalle de compra #4226932427</Text>
                            <Card height='70%' align='center' paddingleft='0px' paddingtop='40px'>
                                <Imgcard marginright='50px' height='60px' width='60px' src='https://http2.mlstatic.com/D_NQ_NP_2X_941952-MCO43932455180_102020-F.webp' ></Imgcard>
                                <ContainerText>
                                    <Text size='12px'>Nombre del producto o servicio</Text>
                                    <ContText>
                                        <Text size='12px'>Color: <strong>Negro</strong></Text>
                                        <Text size='12px'>Cantidad: 1</Text>
                                    </ContText>
                                </ContainerText>
                                <ContainerBoton><ViewButton>Ver Producto</ViewButton></ContainerBoton>
                            </Card>

                        </ContainerCardModal>
                        <ContainerCardModal width="40%" float='right' bgColor='#D9D9D9' padding='20px 20px' >
                            <Text width="100%" size='14px' padding='0px'>Resumen de tu compra</Text>
                            <Card height="100%" direction='column' align='start' paddingleft='0px' bgColor='#D9D9D9'>
                                <ContainerTextSummary>
                                    <Text size='11px' paddingleft='15px' >Producto</Text>
                                    <Text size='11px' >$910.000</Text>
                                </ContainerTextSummary>
                                <ContainerTextSummary paddingbottom='8px'>
                                    <Text size='11px' paddingleft='15px' >Envío</Text>
                                    <Text size='11px' >$10.000</Text>
                                </ContainerTextSummary>
                                <ContainerTextSummary paddingtop='8px'>
                                    <Text size='11px' >Total</Text>
                                    <Text size='11px' >$910.000</Text>
                                </ContainerTextSummary>
                            </Card>
                            <Card height="100%" direction='column' align='start' paddingleft='0px' paddingbottom='6px' bgColor='#D9D9D9'>
                                <Text size='14px' paddingbottom='5px'>Medio de pago</Text>
                                <Text size='12px' paddingbottom='5px'>Billetera Winby</Text>
                                <Text size='10px' paddingbottom='5px'>$910.000</Text>
                            </Card>
                        </ContainerCardModal>
                    </ContainerModal>


                </Modalles>
            </Content>
        </Container>
    )
}
const Imgcard = styled.img`
    width:${({ width }) => width ? width : '52px'} ;
    height:${({ height }) => height ? height : '52px'} ;
    margin-right: 10px;
    padding-bottom: 5px;

    @media (min-width: 768px){
        ${({ marginright }) => marginright && css`margin-right: ${marginright};`};
        }
`

const ContainerText = styled.div` 
    display: flex;
    align-self: start;
    flex-direction: column;
`
const ContainerBoton = styled.div` 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ViewButton = styled.button` 
    margin: auto;
    border: 0;
    background-color: #068CF3;
    color: #fff;
    padding: 5px 20px;
    cursor: pointer;
`
const ContainerInfo = styled.div`
    width : 100%;
    display: flex;
    border-bottom: 1px solid #ccc;

    @media (max-width: 800px){
        display: contents;
        }
`


const ContainerTextSummary = styled.div` 
    display: flex;
    flex-direction: ${({ direction }) => direction ? direction : 'row'};
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #2a2a2a;
    padding: 0px 0px;
    ${({ paddingbottom }) => paddingbottom && css`padding-bottom: ${paddingbottom};`}
    ${({ paddingtop }) => paddingtop && css`padding-top: ${paddingtop};`}
    &:nth-child(1){
        border-bottom: none;
    }
    &:nth-child(3){
        border-bottom: none;
    }
`
const Flex = styled.div` 
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
`
const Container = styled.div`
    width: 100%;
    max-width: 1200px;

`
const Content = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 70px;
    margin: auto;
    & > :nth-child(5){
        border-bottom: none;
    }
`
const Title = styled.h4`
    font-size: 20px;
    font-family: PFont-Regular;
    margin: 0px 0px 30px 10px;
`
const Card = styled.div` 
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: ${BGColor};
    flex-direction: ${({ direction }) => direction ? direction : 'row'};
    padding: ${({ padding }) => padding ? padding : '15px 0'};
    ${({ paddingleft }) => paddingleft && css`padding-left: ${paddingleft};`}
    padding-top: 18px;
    padding-right: 0px;
    height: ${({ height }) => height ? height : '100%'};
    ${({ align }) => align && css`align-content: ${align};`}
    ${({ paddingbottom }) => paddingbottom && css`padding-bottom: ${paddingbottom};`}
    ${({ bgColor }) => bgColor && css`background-color: ${bgColor};`};
    ${({ paddingtop }) => paddingtop && css`padding-top: ${paddingtop};`}
    overflow: hidden;
    
    @media (max-width: 800px){
        padding-top: 20px;
        padding-bottom: 5px;
        }

`
const ContainerModal = styled.div`
    width: 600px;
    padding: 0px 0px;
`
const ContText = styled.div`
    width: 100%;
    display: flex;
`


const ContainerCard = styled.div` 
    display: flex;
    flex-direction: ${({ direction }) => direction ? direction : 'column'};
    justify-content: ${({ justify }) => justify ? justify : 'center'};
    ${({ width }) => width && css`width: ${width};`};
    ${({ float }) => float && css`float: ${float};`};
    ${({ bgColor }) => bgColor && css`background-color: ${bgColor};`};
    ${({ padding }) => padding && css`padding: ${padding};`};
    ${({ paddingtop }) => paddingtop && css`padding-top: ${paddingtop};`};
    ${({ paddingleft }) => paddingleft && css`padding-left: ${paddingleft};`};
    align-items: flex-end;
    position: relative;
    ${({ height }) => height && css`height: ${height};`};

    @media (max-width: 800px){
            width: 100%;
            padding: 5px 15px;
            padding-bottom: 15px;
        }
`
const ContainerCardModal = styled.div` 
    display: flex;
    flex-direction: ${({ direction }) => direction ? direction : 'column'};
    justify-content: ${({ justify }) => justify ? justify : 'center'};
    ${({ width }) => width && css`width: ${width};`};
    ${({ float }) => float && css`float: ${float};`};
    ${({ bgColor }) => bgColor && css`background-color: ${bgColor};`};
    ${({ padding }) => padding && css`padding: ${padding};`};
    ${({ paddingtop }) => paddingtop && css`padding-top: ${paddingtop};`};
    ${({ paddingleft }) => paddingleft && css`padding-left: ${paddingleft};`};
    align-items: flex-end;
    position: relative;
    height: 100%;

    @media (max-width: 800px){
            width: 100%;
            padding: 5px 130px;
            padding-bottom: 15px;
        }
`


const Text = styled.span`
    font-family: PFont-Regular;
    ${({ color }) => color && css`color: ${color};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ size }) => size && css`font-size: ${size};`}
    align-self: start;
    ${({ paddingleft }) => paddingleft && css`padding-left: ${paddingleft};`}
    padding-right: 15px;
    ${({ paddingbottom }) => paddingbottom && css`padding-bottom: ${paddingbottom};`}
`
const TextName = styled.span`
    font-family: PFont-Regular;
    ${({ color }) => color && css`color: ${color};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    ${({ size }) => size && css`font-size: ${size};`}
    align-self: start;
    ${({ paddingleft }) => paddingleft && css`padding-left: ${paddingleft};`}
    padding-right: 15px;
    ${({ paddingbottom }) => paddingbottom && css`padding-bottom: ${paddingbottom};`}
    overflow: hidden;
    overflow-wrap: anyhere;

    @media (max-width: 800px){
            font-size: 10px;
        }
`

