import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { Lateral } from './lateralInf'
import { BGColor, APColor, PColor, PLColor } from '../../../assets/colors';
import { IconEnterLocation, IconDocument, AddPlusCircle } from '../../../assets/icons';
import Modalles from '../../common/modal/Modal';
import { Context } from '../../common/modal/ContextModal'
import InputHooks from '../../common/InputHooks';
import { CustomButton } from '../../common/Buttons';
import { numberFormat } from '../../utils'
export const DatesFactures = ({ state }) => {

    const [modalActive, setModalActive] = useState(0)
    const { isModal, setIsModal } = useContext(Context)
    const handleModal = (e, index) => {
        setModalActive(index)
        setIsModal()
    }

    return (
        <Container>
            <Content>
                <Title>Datos de facturación y dirección</Title>
                <ContainerCard>
                    <Card>
                        <ContentCard width='50%'>
                            <Icons bgColor={BGColor}>
                                <IconEnterLocation size='40px' />
                            </Icons>
                            <Flex>
                                <Text size='18px'>   {state.dataProfile?.municipality?.m_name} </Text>
                                <Text size='11px'>{state.dataProfile?.up_location}</Text>
                            </Flex>
                        </ContentCard>
                        <ContentCard justify='flex-end' width='50%'>
                            <Text onClick={e => handleModal(e, 1)} size='11px' color={APColor} >Agregar ubicación</Text>
                        </ContentCard>
                    </Card>
                    <Card>
                        <ContentCard width='50%'>
                            <Icons>
                                <IconDocument size='40px' />
                            </Icons>
                            <Flex>
                                <Text size='12px'>Datos de tu factura</Text>
                                <Text size='11px'>Pedro Perez CC 145.1231235</Text>
                            </Flex>
                        </ContentCard>
                        <ContentCard justify='flex-end' width='50%'>
                            <Text onClick={e => handleModal(e, 2)} size='11px' color={APColor} >Cambiar datos de tu factura</Text>
                        </ContentCard>
                    </Card>
                </ContainerCard>
                <Text margin='15px 0px' width='auto' size='14px'>Paquete 1</Text>
                <CardProducts bgColor='transparent'>
                    <div style={{ width: '80%' }} >
                        <ContainerCard padding='0px 20px' radius='0' >
                            <CardProducts direction='column'>
                                <Text width='auto' size='14px'>Entrega de pedido</Text>
                                <Text width='auto' size='10px'>Llega entre el 26 y 29 de enero</Text>
                            </CardProducts>
                            <CardProducts>
                                <Imgcard src='' title='' ></Imgcard>
                                <Flex>
                                    <Text width='auto' size='14px'>Nombre del producto o sevicio</Text>
                                    <TextContainer>
                                        <Text width='auto' size='11px'>Color: <strong>Negro</strong></Text>
                                        <Text width='auto' size='11px'>Cantidad: <span>1</span></Text>
                                    </TextContainer>

                                    <Text width='auto' size='10px'>Cantidad</Text>
                                    <Text width='auto' size='10px'>$100.000 c/u</Text>
                                </Flex>
                            </CardProducts>
                        </ContainerCard>
                    </div>
                    <div style={{ width: '20%' }} >
                        <BoxPrice>
                            <Text size='15px'>${numberFormat(Math.round(state.values.i_delivery))}</Text>
                            <Text size='11px'>Costo de envío</Text>
                        </BoxPrice>
                    </div>
                </CardProducts>
                {/* aqui empieza */}
                <Box boxshadow='none' width='100%'>
                    <Title position='static' bold>Total de la compra</Title>
                    <CartSection width='100%' padding='20px' display='flex' direction='column'>
                        <FlexBox justify='space-between' >
                            <Text>Subtotal</Text>
                            <Text margin='10px'>$ {numberFormat(Math.round(state.values.i_sub))}</Text>
                        </FlexBox>
                        <FlexBox justify='space-between' >
                            <Text margin='10px'>Domicilio</Text>
                            <Text margin='10px'>$ {numberFormat(Math.round(state.values.i_delivery))}</Text>
                        </FlexBox>
                        <FlexBox justify='space-between' >
                            <Text margin='10px'>Total</Text>
                            <Text margin='10px' bold fontSize='16px'>$ {numberFormat(Math.round(state.values.i_sub + (state.delivery ? state.values.i_delivery : 0)))}</Text>
                        </FlexBox>

                        <div id='script' />
                    </CartSection>
                </Box>
                {/* aqui termina */}

            </Content>
            <Lateral />
            <Modalles direction='row' isModal={isModal} setIsModal={setIsModal}>
                {
                    modalActive === 1 ? <MyContext state={state} /> : <MyContextChangerFacture />
                }
            </Modalles>
        </Container>
    )
}

const MyContext = ({ state }) => <ContentCard justify='center' flexDirection='column' width='400px'>
    <ContainerCard justify='center' direction='row' borderBottom={` 1px solid ${PLColor} `}>
        <IconEnterLocation size='40px' />
        <Flex>
            <Text>  {state.dataProfile?.municipality?.m_name}</Text>
            <Text size='11px'>{state.dataProfile?.up_location}</Text>
        </Flex>
    </ContainerCard>
    <ContainerCard width='72%' margin='auto' justify='space-between' direction='row' >
        <AddPlusCircle size='40px' />
        <Text color={APColor} >Agregar ubicación</Text>
    </ContainerCard>
</ContentCard>
const MyContextChangerFacture = (state, onChangeInput) => <>
    <ContentForm>
        <Textdate margin='0px' size='18px'>Cambiar los datos para tu factura</Textdate>
        <Textdate margin='10px 0px 30px 0px;' size='13px' >Estos son los datos aparecerán en tu recibo de compra. El vendedor te hará llegar el recibo en físico.</Textdate>
        <ContainerForm>
            <ContainerPersonalInformation>
                <Textdate width='20%' >Datos personales</Textdate>
                <Textdate size='12px' color={APColor} width='20%' >Soy empresa</Textdate>
            </ContainerPersonalInformation>
            <ContainerInput>
                <InputHooks name='up_last' title='Nombre' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
                <InputHooks name='up_last' title='Apellido' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
                <InputHooks name='up_last' title='Tipo de documento' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
                <InputHooks name='up_last' title='Número  de documento' value={state} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
            </ContainerInput>
        </ContainerForm>
        <ContenBtn>
            <CustomButton padding='8px' fontFamily='PFont-Regular' width='150px' fontSize='20px' radius='6px' margin='50px 0px' bgColor={PColor} color={BGColor} >Continuar</CustomButton>
        </ContenBtn>
    </ContentForm>
</>
/* aqui empieza */
export const InputC = styled.input`
    cursor: pointer;
    margin: 0px 10px;
`
export const CartSection = styled.div`
    ${ ({ width }) => !!width && css`width: ${ width };` }
    ${ ({ display }) => !!display && css`display: ${ display };` }
    ${ ({ alignItems }) => !!alignItems && css`align-items: ${ alignItems };` }
    ${ ({ bgColor }) => !!bgColor && css`background-color: ${ bgColor };` }
    ${ ({ padding }) => !!padding && css`padding: ${ padding };` }
    ${ ({ direction }) => !!direction && css`flex-direction: ${ direction };` }
    margin-left: ${ ({ marginleft }) => marginleft };
`
export const FlexBox = styled.div`
    ${ ({ width }) => !!width && css`width: ${ width };` }
    align-items:${ ({ align })=> align ? align : 'flex-start' };
    display: ${ ({ display }) => display ? display : 'flex' };
    justify-content: ${ ({ justify }) => justify || 'space-between' };
    ${ ({ bgColor }) => !!bgColor && css`background-color: ${ bgColor };` }
    ${ ({ radius }) => !!radius && css`border-radius: ${ radius };` }
    flex-direction: ${ ({ flex }) => flex };
    ${ ({ direction }) => direction && css`flex-direction: ${ direction };` };
    ${ ({ height }) => height && css`height: ${ height };` };
    margin: ${ ({ margin }) => margin };
    ${ ({ borderTop }) => !!borderTop && css`border-top: ${ borderTop };` }
    ${ ({ hidden }) => hidden && css`
        display: none;
        @media (min-width: 1280px){
            display: flex;
        }
    ` }
    ${ ({ visible }) => visible && css`
        display: flex;
        @media (max-width: 1280px){
            display: none;
        }
    ` }
    ${ ({ responsive }) => responsive && css `
        flex-direction:${ ({ flex })=> flex ? flex : 'column' };
        align-items: flex-start;
        & > div { width: 100%; }
        @media (min-width: 1024px){
            flex-direction: row;
            justify-content: space-between;
            & > div { width: 48%;}
        })
    ` }

    ${ ({ res }) => !!res && css`
        @media (max-width: 1024px){
            display:grid;
            grid-template-columns: 1fr;
            grid-gap:5px;
            border-right:none;
        }
    ` }
    ${ ({ resp }) => resp && css` flex-direction: column;` }
`
export const Box = styled.div`
position: relative;
width: ${({ width }) => width || '100%'};
background-color: ${BGColor};
box-shadow: ${({ boxshadow }) => boxshadow ? boxshadow : '0 0 15px 1px #00000035'};
margin: ${({ margin }) => margin};
display: flex;
margin-top: 200px;
justify-content: center;
align-items: center;
flex-direction: column;

margin-top: 70px;
@media (mix-width: 900px){
    width: 50%;
}
`

/* aqui termina  */
const BoxPrice = styled.div` 
    display: flex;
    align-items: center;
    height: 100%;
    background-color: gray;
    flex-direction: column;
    align-content: center;
    display: flex;
    justify-content: center;
    text-align: center;
`
const TextContainer = styled.div` 
    display: flex;
    flex-direction: row;
    width: 70%;
    align-items: center;
    justify-content: space-between;
`
const CardProducts = styled.div` 
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: ${({ bgColor }) => bgColor ? bgColor : BGColor};
    flex-direction: ${({ direction }) => direction ? direction : 'row'};
    height: ${({ height }) => height ? height : '100%'};
    ${({ align }) => align && css`align-content: ${align};`}
    margin: 10px 0px;
`
const Flex = styled.div` 
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: flex-start;
    align-self: flex-end;
`
const Imgcard = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 30px;
`
const ContentForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
`
const ContenBtn = styled.div`
    display: block;
    justify-content: flex-end;
    align-self: flex-end;
`
const Textdate = styled.span`
    font-family: PFont-Regular;
    ${({ color }) => color && css`color: ${color};`}
    ${({ margin }) => margin && css`margin: ${margin};`}
     padding:0px 5px;
    ${({ size }) => size && css`font-size: ${size};`}
`
const ContainerPersonalInformation = styled.div`
    display: flex;
    height: 35px;
    justify-content: stretch;
    align-items: flex-end;
    margin: 15px 0px;
`
const ContentCard = styled.div`
    ${({ width }) => width && css`width: ${width};`}
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ flexDirection }) => flexDirection && css`flex-direction: ${flexDirection};`}
    display: flex;
`

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template: 1fr / 60% 40%;
    grid-gap: 5px;
    max-width: 1200px;
`
const ContainerInput = styled.div`
    width: 100%;
    display: grid;
    grid-template: 1fr / 50% 50%;
    grid-gap: 5px;
`

const ContainerForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Content = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 70px;
    margin: auto;
    & > :nth-child(5){
        border-bottom: none;
    }
`
const Icons = styled.div`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ bgColor }) => bgColor ? bgColor : 'transparent'};
`
const Title = styled.h4`
    font-size: 17px;
    font-family: PFont-Regular;
    margin: 0px 0px 40px 10px;
`
const Border = styled.div`
    height:10px;
    width: 10px;  
    background-color: ${PColor};
    overflow: hidden;
    transition: .3s ease;
    align-self: baseline;
`

const Card = styled.div` 
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #E4E4E4;
    width: 100%;
    margin: 1px;
    padding: 10px;
    &:hover ${Border}{
        height: 100%;
    }
`
const ContainerCard = styled.div` 
    display: flex;
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ margin }) => margin && css`margin: ${margin};`}
    background-color: ${BGColor};
    align-items: center;
    
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}
    flex-direction: ${({ direction }) => direction ? direction : 'column'} ;
    width: ${({ width }) => width ? width : '100%'} ;
    ${({ borderBottom }) => borderBottom && css`border-bottom: ${borderBottom};`}
    border-radius: ${({ radius }) => radius ? radius : '10px'};
    padding: ${({ padding }) => padding ? padding : '20px'};
`
const Text = styled.span`
    font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'PFont-Regular'};
    ${({ color }) => color && css`color: ${color};`}
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ width }) => width && css`width: ${width};`}
    text-decoration: none;
    ${({ align }) => align && css`text-align: ${align};`}
    ${({ size }) => size && css`font-size: ${size};`}
`