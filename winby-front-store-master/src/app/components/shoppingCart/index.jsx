import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PVColor, PColor, PLColor, SFColor, BGVColor, EColor } from '../../../assets/colors'
import { Container, CartSection, ButtonMap, InputC, FlexBox, ImgCart, Text, Title, ContainerSearch, BoxSearch, InputSearch, ButtonIcon, ScrollOptions, BoxOptions, Option, Form } from './Styled'
import { IconSearch, IconCancel, IconBank, IconLogoType } from '../../../assets/icons'
import shopping from '../../../assets/shopping.svg'
import { CustomButton } from '../../common/Buttons'
import { Input, InputPhone } from '../../common/inputs'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Modals, { clModal, openModal } from '../../common/Modals'
import L from 'leaflet'
import Location from '../../../assets/img/location.png'
import { connect } from 'react-redux'
import { numberFormat/* , Cookies */ } from '../../utils'
import { url_base } from '../../redux/types'
import Loading from '../../common/Loading'
import NewSelect from '../../common/NewSelect'
import { Link } from 'react-router-dom'
import FranchiseContract from '../Politics/Franchise'
import { MyContext } from '../layout'
// import jwt from 'jsonwebtoken'

const suitcasePoint = new L.Icon({
    iconUrl: Location,
    iconAnchor: [20, 40],
    iconSize: [30, 30]
})

const ShoppingCartV = ({ state, countries, departments, municipality, handleMenuModal, onChangeInput, onChangeSelect, handleMap, onChangeSearch, handleSearchInput, handleOption, handleLeafletMap, handleSubmit, refL, handleShop, handlePlus, handleBin,
    onChangeCheck, onChangeInputPhone, handleDragMarket, onChangeRadio }) => {

    const { dataProfile } = useContext(MyContext)

    return (
        <Container>
            {!!state.loading && <Loading />}
            <Modals id='contrato-licencia' marginTop='55px'>
                <FranchiseContract state={state} />
            </Modals>
            <Box marginActive={!state.values.invoiceproducts?.length || !state.values.invoiceservices?.length} heightActive={!state.values.invoiceproducts?.length || !state.values.invoiceservices?.length}>
                {(state.values.invoiceproducts?.length && state.values.invoiceproducts) || (state.values.invoiceservices?.length && state.values.invoiceservices) ?
                    <ContainerOptionWindow>
                        <BtnOptionWindow activeBg={state.menuActive === 0} onClick={() => handleMenuModal(0)}>Carrito ({(state.values?.invoiceproducts?.length || 0) + (state.values?.invoiceservices?.length || 0)})</BtnOptionWindow>
                        {/* <BtnOptionWindow activeBg={state.menuActive === 1} onClick={() => handleMenuModal(1)}>Guardados</BtnOptionWindow>
                        <BtnOptionWindow activeBg={state.menuActive === 2} onClick={() => handleMenuModal(2)}>Comprar nuevamente</BtnOptionWindow> */}
                    </ContainerOptionWindow>
                    : <>
                    </>
                }
                {state.menuActive === 0 ? <>
                    {!!state.values.invoiceproducts?.length && state.values.invoiceproducts.map(x => <InfoWrap key={x.p_id}>
                        {/* SEccion de productos */}
                        <FlexBox>
                            <ContainerProduct>
                                <ContainerImgProduct>
                                    <ImgCart src={`${url_base}static/products/${x.p_id}/${x.productphotos?.length && x.productphotos[0]?.pp_name}`} />
                                    <BtnAdd visible>
                                        <CustomButton bgColor='transparent' onClick={() => x.ip_total > 1 && handlePlus(1, 0, x.p_id, x.ip_total)}><Text fontSize='16px' margin='10px' color='#3483fa'>-</Text></CustomButton>
                                        {/* Input para seleccionar cantidad de producto (modo mobile) */}
                                        <Text /* onChange={onChangeProduct} */ >{x.ip_total}</Text>
                                        <CustomButton bgColor='transparent' onClick={() => x.ip_total < x.ip_available && handlePlus(1, 1, x.p_id, x.ip_total)}><Text fontSize='16px' margin='10px' color='#3483fa'>+</Text></CustomButton>
                                    </BtnAdd>
                                </ContainerImgProduct>
                                <Options>
                                    <Text fontSize='17px'>{x.ip_name}</Text>
                                    {/* <Text>Color: Negro|</Text> */}
                                    <Text fontSize='13px'>Cantidad: {x.ip_quantity}</Text>
                                    <Text fontSize='12px' cursor='pointer'>{x.ip_available} Disponibles</Text>
                                    <Text fontSize='15px'>$ {numberFormat(Math.round((x.ip_price + x.ip_taxGat) * x.ip_total))}</Text>
                                    <FlexBox>
                                        <Text bottom={window.screen.width <= 769 ? 'none' : '0'} position={window.screen.width <= 769 ? 'inherit' : 'absolute'} cursor='pointer' onClick={() => handleBin(1, x)} color='#3483fa' margin='10px'>Eliminar</Text>
                                        {/* <Text cursor='pointer' color='#3483fa' margin='10px'>Comprar ahora</Text>
                                        <Text cursor='pointer' color='#3483fa' margin='10px'>Guardar para despues</Text> */}
                                    </FlexBox>
                                </Options>
                            </ContainerProduct>

                        </FlexBox>
                        <FlexBox>
                            <BtnAdd>
                                <CustomButton bgColor='transparent' onClick={() => x.ip_total > 1 && handlePlus(1, 0, x.p_id, x.ip_total)}><Text fontSize='16px' margin='10px' color='#3483fa'>-</Text></CustomButton>
                                {/* Input para seleccionar cantidad de producto (modo escritorio) */}
                                <Text /* onChange={onChangeProduct} */ >{x.ip_total}</Text>
                                <CustomButton bgColor='transparent' onClick={() => x.ip_total < x.ip_available && handlePlus(1, 1, x.p_id, x.ip_total)}><Text fontSize='16px' margin='10px' color='#3483fa'>+</Text></CustomButton>
                            </BtnAdd>
                            <Text visible fontSize='12px' cursor='pointer'>{x.ip_available} Disponibles</Text>
                        </FlexBox>
                        <FlexBox width='15%'>
                            <Text visible fontSize='25px'>$ {numberFormat(Math.round((x.ip_price + x.ip_taxGat) * x.ip_total))}</Text>
                        </FlexBox>
                    </InfoWrap>)
                    }
                    {/* SEccion de servicios */}
                    {!!state.values.invoiceservices?.length && state.values.invoiceservices.map(x => <InfoWrap key={x.s_id}>
                        <FlexBox>
                            <ContainerProduct>
                                <ContainerImgProduct>
                                    <ImgCart src={`${url_base}static/services/${x.s_id}/${x.servicephotos?.length && x.servicephotos[0]?.sp_name}`} />
                                </ContainerImgProduct>
                                <Options>
                                    <Text fontSize={window.screen.width <= 769 ? '20px' : '17px'}>{x.is_name}</Text>
                                    <Text fontSize='13px'>Descripción: {x.is_description}</Text>
                                    <Text fontSize='15px'>$ {numberFormat(Math.round((x.is_price + x.is_taxGat) * x.is_total))}</Text>
                                    <FlexBox>
                                        <Text bottom={window.screen.width <= 769 ? 'none' : '0'} position={window.screen.width <= 769 ? 'inherit' : 'absolute'} cursor='pointer' onClick={() => handleBin(0, x)} color='#3483fa' margin='10px'>Eliminar</Text>
                                        {/*  <Text cursor='pointer' color='#3483fa' margin='10px'></Text>
                                        <Text cursor='pointer' color='#3483fa' margin='10px'>Guardar para despues</Text> */}
                                    </FlexBox>
                                </Options>
                            </ContainerProduct>
                        </FlexBox>
                        <FlexBox visible align='center' justify='flex-end' width='35%'>
                            <Text fontSize='25px'>$ {numberFormat(Math.round((x.is_price + x.is_taxGat) * x.is_total))}</Text>
                        </FlexBox>
                    </InfoWrap>)}
                </> : state.menuActive === 1 || <>
                    <h1>NO hay nada guardado aun</h1>
                </> || state.menuActive === 2 ||
                <>
                    <h1>NO hay nada para comprar nuevamente aun</h1>
                </>
                }
                {/* {(state.values.invoiceproducts?.length) || (state.values.invoiceservices?.length) ?
                    <FlexBox height='200px' width='100%' justify='flex-end' align='center'>
                        <Enlace to='/datos-de-facturacion' ><CustomButtonNetx >Comprar ahora</CustomButtonNetx></Enlace>
                    </FlexBox>
                    : <></>
                } */}
                {/* Proceso de compra */}
                {(state.values.invoiceproducts?.length) || (state.values.invoiceservices?.length) ?
                    <FlexBox res width='100%'>
                        <Box boxshadow='none'>
                            <Form onSubmit={handleSubmit} id='dataInvoiceForm'>
                                <Title position='static' padding='0 auto'>Datos de la compra</Title>
                                {/* {state?.franchiseTerm && <> */}
                                {/* <Text textAlign='start'>Ingresa los datos del contrato</Text> */}
                                {/* <FlexBox justify='space-between' responsive>
                                    <Input type='text' name='up_ideNum' title='Número de identificación' value={state.values?.up_ideNum} onChange={e => onChangeInput(e, true, false, true, true, 3, 15)} widthD='48%' margin='0' />
                                </FlexBox> */}
                                {/* </>} */}
                                <Text textAlign='start' >Ingresa los datos de envío</Text>
                                <FlexBox justify='space-between' responsive flex={window.screen.width <= 768 ? 'row' : ''}>
                                    <Input minWidth={window.screen.width <= 768 ? '100px' : '100%'} width={window.screen.width <= 768 ? '99%' : '100%'} type='text' name='up_name' title='Nombre Completo' value={state.values.up_name} onChange={e => onChangeInput(e, true, true, false, true, 2, 30)} margin='0' />
                                    <Input minWidth={window.screen.width <= 768 && '100px'} width={window.screen.width <= 768 ? '99%' : '100%'} type='text' name='up_last' title='Apellido Completo' value={state.values.up_last} onChange={e => onChangeInput(e, true, true, false, true, 2, 30)} margin='0px 3px' />
                                </FlexBox>
                                {(state.member === 'true' && state.code !== state.lastCode && state.lastCode) ? <NewSelect minWidth={window.screen.width <= 768 && '100px'} width={window.screen.width <= 768 ? '99%' : '100%'} id='sType' options={[{ sType: 1, value: 'Mi tienda' }, { sType: 2, value: `Tienda de ${state.lastCode}` }]} name='sType' optionName='value' value={state.values.sType} title='Seleccione la tienda' onChange={onChangeSelect} margin='10px 0' /> : ''}
                                <FlexBox align='center' justify='space-between' responsive>
                                    <InputPhone name='u_phoNum' value={state.values.u_phoNum} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} widthD='48%' marginD='10px 0' />
                                    <Input type='text' name='u_email' title='Correo Electrónico' value={state.values.u_email} onChange={e => onChangeInput(e, true, false, false, true, 2, 100, true)} widthD='48%' />
                                </FlexBox>
                                <FlexBox justify='space-between' responsive> {/*  onChangeInput(e, true, false, false, true, 3, 50, true)} */}
                                    <Input type='text' name='up_ideNum' title='Número de identificación' value={state.values?.up_ideNum} onChange={e => onChangeInput(e, true, false, true, true, 3, 15)} widthD='48%' margin='0' />
                                </FlexBox>
                                <NewSelect minWidth={window.screen.width <= 768 && '100px'} width={window.screen.width <= 768 ? '99%' : '100%'} id='c_id' options={[(countries.data || []).find(x => x.c_name === 'Colombia')/*, ...(countries.data || []).filter(x => x.c_name !== 'Colombia')*/]} name='c_id' optionName='c_name' value={dataProfile?.c_id || dataProfile?.country?.c_id || ''} title='Seleccione País' onChange={onChangeSelect} margin='10px 0' />
                                <NewSelect minWidth={window.screen.width <= 768 && '50px'} width={window.screen.width <= 768 ? '99%' : '100%'} id='d_id' options={departments.data || []} name='d_id' optionName='d_name' value={dataProfile?.d_id || dataProfile?.department?.d_id || ''} search title='Seleccione un Departamento' disabled={!dataProfile?.country?.c_id && !dataProfile?.c_id} onChange={onChangeSelect} margin='15px 0' />
                                <FlexBox justify='space-between' responsive flex={window.screen.width <= 768 && 'row'}>
                                    <NewSelect minWidth={window.screen.width <= 768 && '100px'} width={window.screen.width <= 768 ? '95%' : '100%'} id='m_id' options={municipality.data || []} disabled={!dataProfile?.department?.d_id && !dataProfile?.d_id} search name='m_id' optionName='m_name' value={dataProfile?.m_id || dataProfile?.municipality?.m_id || ''} title='Seleccione un Municipio' onChange={onChangeSelect} margin='10px 5px 0 0' />
                                    <Input minWidth={window.screen.width <= 768 && '100px'} width={window.screen.width <= 768 ? '98%' : '100%'} type='text' name='up_location' title='Dirección Ej: Carrera 60 #75' value={dataProfile?.up_location || ''} onBlur={() => handleMap(true)} onChange={e => onChangeInput(e, true, false, false, true, 3, 50)} />
                                </FlexBox>
                                {/* <FlexBox width='100%' justify='space-between' responsive>
                                    {((!!dataProfile?.c_id || dataProfile?.country?.c_id) && (!!dataProfile?.d_id || dataProfile?.department?.d_id) && (!!dataProfile?.m_id || dataProfile?.municipality?.m_id) && (!!dataProfile?.up_location))
                                        && <ButtonMap type='button' onClick={() => handleMap()} margin='15px'>
                                            <IconMap
                                                size={50}
                                                color={dataProfile?.up_lat ? '#44C868' : '#ccc'}
                                                color2={dataProfile?.up_lat ? '#4CE166' : '#ccc'}
                                                color3={dataProfile?.up_lat ? '#FFDB56' : '#ccc'}
                                                color4={dataProfile?.up_lat ? '#FFBB24' : '#ccc'}
                                                color5={dataProfile?.up_lat ? '#A8EEFC' : '#ccc'}
                                                color6='#FF4A4A'
                                                color7='#E7343F'
                                                color8={dataProfile?.up_lat ? '#1EA4E9' : '#ccc'}
                                            />
                                        </ButtonMap>}
                                    <CustomButton bgColor='transparent' border={`1px solid ${PVColor}`} padding='10px 40px' margin='10px auto' radius='5px' color={PVColor}>Continuar</CustomButton>
                                </FlexBox> */}
                            </Form>
                        </Box>
                        <Box boxshadow='none' width='100%'>
                            <Title position='static' bold>Total de la compra</Title>
                            <CartSection width='100%' padding='20px' display='flex' direction='column'>
                                <FlexBox justify='space-between' >
                                    <Text>Subtotal</Text>
                                    <Text margin='10px'>$ {numberFormat(Math.round(state.values.i_sub))}</Text>
                                </FlexBox>
                                <FlexBox justify='space-between' >
                                    <Text margin='10px'>Domicilio</Text>
                                    <Text margin='10px'>$ {numberFormat(Math.round(state.delivery ? state.values.i_delivery : 0))}</Text>
                                </FlexBox>
                                <FlexBox justify='space-between' >
                                    <Text margin='10px'>Total</Text>
                                    <Text margin='10px' bold fontSize='16px'>$ {numberFormat(Math.round(state.values.i_sub + (state.delivery ? state.values.i_delivery : 0)))}</Text>
                                </FlexBox>
                                {state?.franchiseTerm && <FlexBox align='center'>
                                    <ImputCheckBox type='checkbox' name='terConFra' checked={state.terConFra || ''} onChange={onChangeCheck} />
                                    <FlexBox justify='flex-end'><Text>Acepto el </Text><Text cursor='pointer' margin='10px 0 0' onClick={() => openModal('contrato-licencia')}><Licencia to='#'> contrato de licencia</Licencia></Text></FlexBox>
                                </FlexBox>}
                                <Text bold='400'>Selecciona los métodos de pago</Text>
                                <FlexBox align='center' justify='flex-start' borderTop={`1px solid ${PLColor}`}>
                                    <InputC onChange={onChangeRadio} value='1' type='radio' name='method' />
                                    <IconLogoType size='27px' color='#0075ff' style={{ margin: '15px 25px' }} />
                                    <Text>Saldo Winby</Text>
                                </FlexBox>
                                <FlexBox align='center' justify='flex-stdraggable ondragend={handleDragMarket}art'>
                                    <InputC onChange={onChangeRadio} value='2' type='radio' name='method' />
                                    <IconBank size='27px' color='#0075ff' style={{ margin: '15px 25px' }} />
                                    <Text>Otros medios de pago</Text>
                                </FlexBox>
                                <div id='script' />
                                {/* {state.errorCal && <div style={{ marginTop: '10px' }}><p><strong>{state.errorCalMsg}</strong></p></div>} */}
                                <CustomButton hover={state.delivery} margin='50px 20px 0 20px' gradient={(state.delivery && !state.calDelivery ? { colorStart: PVColor, colorEnd: PColor } : { colorStart: '#9f9d9d', colorEnd: '#9f9d9d' })} padding='10px 40px' radius='5px' color={BGColor} onClick={e => (state.delivery && !state.calDelivery) && handleShop(e)}>
                                    {(state.delivery && !state.calDelivery) ? 'Realizar compra' : ((!state.delivery && state.calDelivery) ? 'Calculando...' : state.errorCalMsg || 'Por favor complete la información de facturación.')}
                                </CustomButton>
                            </CartSection>
                        </Box>
                    </FlexBox>
                    : <>
                        <ContainerShoppingBox>
                            <Imgcero src={shopping} />
                            <FlexBox align='center' direction='column' >
                                <Span size='20px' bold='600'> Tu carrito Winby está vacío</Span>
                                <Enlace to='/ofertas' size='15px'> Compra las ofertas del día </Enlace>
                            </FlexBox>
                        </ContainerShoppingBox>
                    </>
                }

                {/* fin de Proceso de compra */}

            </Box>
            {/* seccion */}
            <Modals height='60%' padding='0' id='maps'>
                <ContainerSearch>
                    <BoxSearch>
                        <InputSearch type='text' value={state.search || ''} name='search' onChange={onChangeSearch} placeholder='Dirección' />
                        <ButtonIcon type='button' onClick={handleSearchInput}>
                            {state.searchIcon ? <IconSearch color={PColor} size={15} /> : <IconCancel color={SFColor} size={15} />}
                        </ButtonIcon>
                        {state.errorMap && <SpanError>Dirección no encontrada.</SpanError>}
                    </BoxSearch>
                    {!!state.searchOptions.length && <ScrollOptions autoHeight autoHeightMax='250px' autoHeightMin='50px' autoHide>
                        <BoxOptions>
                            {state.searchOptions.map((x, i) => <Option key={i} title={x.label} onClick={() => handleOption(x)}>{x.label}</Option>)}
                        </BoxOptions>
                    </ScrollOptions>}
                </ContainerSearch>
                <LeafletMap id='leaflet' rou attributionControl minZoom={12} maxZoom={500} fadeAnimation center={[state.locationMap.lat, state.locationMap.lon]} zoom={14} style={{ width: '100%', height: '100%', borderRadius: '20px' }} onClick={e => handleLeafletMap(e)}>
                    <TileLayer attribution={'&copy; <a href=\'https://wowdesarrollos.com/\'>Wow Desarrollos Digitales</a>'} url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {!!state.values.up_lat && <Marker position={[state.values.up_lat, state.values.up_lon]} icon={suitcasePoint} draggable ondragend={handleDragMarket} />}
                </LeafletMap>
                <ButtonMap type='button' position='absolute' zIndex='9999' border='none' right='10px' bottom='20px' bgColor={PColor} color={BGColor} onClick={() => clModal('maps')}>Confirmar</ButtonMap>
            </Modals>
            <Modals>
                <LeafletMap ref={refL} id='maprouter' rou attributionControl minZoom={12} maxZoom={500} fadeAnimation center={[state.locationMap.lat, state.locationMap.lon]} zoom={14} style={{ width: '100%', height: '100%', borderRadius: '20px' }} onClick={e => handleLeafletMap(e)}>
                    <TileLayer attribution={'&copy; <a href=\'https://wowdesarrollos.com/\'>Wow Desarrollos Digitales</a>'} url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                </LeafletMap>
            </Modals>
        </Container>
    )
}

const Licencia = styled.a`
    font-size: 14px;
    margin-left: 3px;
    font-style: italic;
    color:#241957;
    text-decoration: underline;

`

const ImputCheckBox = styled.input`
    margin-top: 6px;
    cursor: pointer;
`
// const CustomButtonNetx = styled.button`
//   width: 300px;
//   padding: 15px;
//   font-size: 19px;
//   background-color: ${PColor};
//   margin: 0 40px;
//   border-radius: 3px;
//   color: ${BGColor};
//   outline: 0;
//   border: none;
//   @media(max-width: 769px){
//       width: 250px;

//     }
// `
const ContainerOptionWindow = styled.div`
    width: 100%;
    display: flex;
    position: absolute;
    top: -38px;
    justify-content: space-between;
    & > button:nth-child(2) {
        margin: 0px 7px;
    }
`
const ContainerImgProduct = styled.div`
    @media(max-width: 769px){
        display: flex;
        flex-direction: column;
        align-items: center;
    }
 
`
const BtnOptionWindow = styled.button`
    border: none;
    height:40px;
    outline: none;
    width: 33.3%;
    font-size: 19px;
    font-family: PFont-Regular;
    cursor: pointer;
    color: ${BGVColor};
    background-color: ${props => props.activeBg ? 'white ' : '#e4e4e4'};
    @media(max-width: 769px){
        font-size: 14px;
    }
 `
const ContainerProduct = styled.div`
    width: 100%;
    display: flex;
    max-width: 450px;
    flex-direction: row;
`
export const TitleShopp = styled.h2`
    width: 96%;
    text-align: center;
    padding: 1em 0 1.5em;
    letter-spacing: 3px;
    border-bottom: 1px solid #ccc;
`
export const Span = styled.span`
    color: ${({ color }) => color || BGVColor};
    display: flex;
    align-self: center;
    ${({ size }) => size && css`font-size: ${size};`}
    ${({ bold }) => bold && css`font-weight: ${bold};`}
`
export const Enlace = styled(Link)`
   text-decoration: none;
   line-height: 30px;
   color:#3483fa;
   @media(max-width: 769px){
    display: block;
   margin: 0 auto;
    }
`
export const BtnAdd = styled.div`
    background-color: #e4e4e4;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    width: 90px;
    justify-content: space-around;
    @media (max-width: 1024px){
            display: none;
        }
    ${({ visible }) => visible && css`
        @media (min-width: 1024px){
            display: none;
        }
        @media (max-width: 1024px){
            display: flex;
            width: 120px;
            justify-content: space-around;
        }
    ` }
`
export const InfoWrap = styled.div`
    position: relative;
    display: flex;
    padding: 10px 35px;
    flex-direction: ${({ flex }) => flex ? flex : 'row'};
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${PLColor};
    @media(min-width: 1024px){
        & > div:nth-child(1) {flex: .4; max-width: 700px;}
        & > div:nth-child(2) {flex: .3; justify-content: flex-end; flex-direction: column; align-items: flex-end; }
        & > div:nth-child(3) {flex: .3; justify-content: center; margin-bottom: 20px; }
    }
    @media(max-width: 1024px){
        & > div:nth-child(1) {flex: .1; padding: 0px; }
        & > div:nth-child(2) {flex: .1; padding: 0px; justify-content: center; }
        & > div:nth-child(3) {flex: .1; padding: 0px; }
        padding: 5px 0px;

    }
`
export const Options = styled.div`
    display: flex;
    flex-direction: column;
    align-self: baseline;
    @media(max-width: 768px){
        max-width: 200px;

    }
`
export const ContainerShoppingBox = styled.div`
   align-items: center;
    padding: 15px;
    justify-content: center;
    width: 100%;
    display: flex;
    @media(max-width: 1024px){
        height: 100%
    }
`
export const Imgcero = styled.img`
    height: 130px;
    width: 130px;
    margin: 20px;
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
const SpanError = styled.span`
    position: absolute;
    top: 100%;
    left: 0;
    color: ${EColor};
    font-size: 12px;
`
export default connect(({ countries, departments, municipality }) => ({ countries, departments, municipality }), null)(ShoppingCartV)