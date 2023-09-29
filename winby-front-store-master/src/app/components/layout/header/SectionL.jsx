import React, { useEffect, useState } from 'react'
import L from 'leaflet'
import { Link, useLocation } from 'react-router-dom'
import { Logo, Row, Location, Span, MenuContainer, Enlace } from './Styled'
import { IconEnterLocation, IconLogoFull, IconCancel, IconSearch, IconArrowLeft } from '../../../../assets/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BGColor, BGVColor, PColor, SFColor } from '../../../../assets/colors'
import styled, { css } from 'styled-components'
import NewSelect from '../../../common/NewSelect'
import { connect } from 'react-redux'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
// import IconLocation from '../../../../assets/location.svg'
import { BoxSearch, ButtonIcon, ContainerSearch, InputSearch/* , Image */ } from '../../shoppingCart/Styled'
import Scrollbars from 'react-custom-scrollbars'
import { Input } from '../../../common/inputs'
import LocationMap from '../../../../assets/img/location.png'
import toastr from 'toastr'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const suitcasePoint = new L.Icon({
    iconUrl: LocationMap,
    iconAnchor: [20, 40],
    iconSize: [30, 30]
})
const SectionL = ({ state, handleMenu, handleMenuModal, saveUserLocation, countries, handelDrag, departments, municipality, onChangeInput, onChangeSelect, handleMap, onChangeSearch, handleSearchInput, handleOption, handleLeafletMap, handleSubmit, handleDragMarket }) => {

    const [status, setStatus] = useState('close')
    const location = useLocation()

    useEffect(() => {
        setStatus('close')
    }, [location]);

    return (
        <>
            <Row display='flex'>
                <Link to={state.path ? `/store/${state.path}` : '/'} style={{ display: 'flex', alignItems: 'center', margin: '0px 15px' }}>
                    <Logo>
                        <IconLogoFull size='140px' />
                    </Logo>
                </Link>
                <MenuContainer>
                    <ContainerBurger onClick={handleMenu} >
                        <div
                            className="BurgerMenu__container"
                            role="button"
                            onClick={() => { setStatus(status === 'open' ? 'close' : 'open') }}
                        >
                            <span className={status}></span>
                            <span className={status}></span>
                            <span className={status}></span>
                        </div>
                    </ContainerBurger>
                </MenuContainer>
                {!state.login ?
                    <>
                        <Enlace to='/usuario/cuenta' onClick={(e) => (toastr.warning('Inicia sesion para guardar ubicación'))} >
                            <Location >
                                <IconEnterLocation size='25px' color={BGVColor} />
                                <div style={{ display: 'grid' }}>
                                    <Span>Ingresa tu</Span>
                                    <Span bold='600' size='15px' >Ubicación</Span>
                                </div>
                            </Location>
                        </Enlace>
                    </> :
                    <Location onClick={() => handleMenuModal(1)}>
                        <IconEnterLocation size='25px' style={{ minWidth: '25px' }} color={BGVColor} />
                        <div style={{ display: 'grid' }}>
                            <Span color='#a6a5a5' size='0.875rem'>Enviar a</Span>
                            <Span title={`${state.dataProfile?.m_name || state.dataProfile?.municipality?.m_name} ${state.dataProfile?.up_location}`} break bold='600' size='15px' >{state.dataProfile?.up_location}</Span>
                        </div>
                    </Location>
                }
                <ContainerModal active={(state.menuActive === 1 || state.menuActive === 5) ? 'flex' : 'none'}>
                    <Content >
                        {state.menuActive === 1 ?
                            <Form onSubmit={handleSubmit}>
                                {/* <Image src={IconLocation} /> */}
                                <ContUp>
                                    <ContTitles>
                                        <Title position='static' padding='0 auto'>Elige dónde recibir tus compras</Title>
                                        <Text>Podrás ver costos y tiempos de entrega precisos en todo lo que busques.</Text>
                                    </ContTitles>
                                    <ContClose>
                                        <BtnClose onClick={() => handleMenuModal(0)}><FontAwesomeIcon icon={faTimes} size='10x' color='#0d74fa' /></BtnClose>
                                    </ContClose>
                                </ContUp>

                                {state?.franchiseTerm && <>
                                    <FlexBox justify='space-between' responsive>
                                        <Input type='text' name='up_ideNum' title='Número de identificación' value={state.values.up_ideNum} onChange={e => onChangeInput(e, true, false, false, true, 2, 30)} widthD='48%' margin='0' />
                                    </FlexBox>
                                </>}

                                <Container>
                                    <ContainerInputs>
                                        <ContInputs>
                                            <NewSelect id='c_id' options={[(countries.data || []).find(x => x.c_name === 'Colombia')/*, ...(countries.data || []).filter(x => x.c_name !== 'Colombia')*/] || []} name='c_id' optionName='c_name' value={state.values.c_id} title='Seleccione Pais' onChange={onChangeSelect} margin='20px 10px' />
                                            <NewSelect id='d_id' options={departments.data || []} name='d_id' optionName='d_name' value={state.values.d_id} search title='Seleccione un Departamento' disabled={!state.values.c_id} onChange={onChangeSelect} margin='20px 0' />
                                        </ContInputs>

                                        <FlexBox justify='space-between' responsive flex={window.screen.width <= 768 && 'row'}>
                                            <ContInputs>
                                                <NewSelect width={window.screen.width <= 768 ? '95%' : '100%'} id='m_id' options={municipality.data || []} disabled={!state.values.d_id} search name='m_id' optionName='m_name' value={state.values.m_id} title='Seleccione un Municipio' onChange={onChangeSelect} margin='10px 10px' />
                                                <Input disabled={!state.values.d_id} minWidth={window.screen.width <= 768 && '100px'} width={window.screen.width <= 768 ? '98%' : '100%'} type='text' name='up_location' title='Dirección Ej: Carrera 60 #75' value={state.values.up_location} onClick={() => handleMap(true)} onChange={e => onChangeInput(e, true, false, false, true, 3, 50)} />

                                            </ContInputs>
                                        </FlexBox>
                                    </ContainerInputs>

                                    <ContainerBoton>
                                        <FlexBox width='100%' justify='space-between' responsive>
                                            <Row display='flex' justify='space-between'>
                                                <ContainerBtn disabled={!state.values.up_location} bgColor={` ${PColor}`} onClick={handleMap} >
                                                    <div > <IconSearch margin="15px" size='30px' color={BGColor} /> Buscar Direccíon </div>
                                                </ContainerBtn>

                                            </Row>
                                        </FlexBox>

                                    </ContainerBoton>

                                </Container>

                            </Form> : state.menuActive === 5 &&
                            <FlexBox width='100%' justify='space-between' responsive>
                                <ContainerSearch>
                                    <BoxSearch>
                                        <InputSearch type='text' value={state.searchLocation || ''} name='searchLocation' onChange={onChangeSearch} placeholder='Dirección' />
                                        <ButtonIcon type='button' onClick={handleSearchInput}>
                                            {state.searchIcon ? <IconSearch color={PColor} size={15} /> : <IconCancel color={SFColor} size={15} />}
                                        </ButtonIcon>
                                    </BoxSearch>
                                    {!!state.searchOptions.length && <ScrollOptions autoHeight autoHeightMax='250px' autoHeightMin='50px' autoHide>
                                        <BoxOptions>
                                            {state.searchOptions.map((x, i) => <Option key={i} title={x.label} onClick={() => handleOption(x)}>{x.label}</Option>)}
                                        </BoxOptions>
                                    </ScrollOptions>}
                                </ContainerSearch>
                                <ContainerBtn onClick={() => handleMenuModal(1)}>
                                    <IconArrowLeft width="20%" size='25px' color={BGVColor} />
                                </ContainerBtn>
                                <LeafletMap ondragstart={() => handelDrag(1)} ondragend={() => handelDrag(0)} id='leaflet' rou attributionControl minZoom={12} maxZoom={500} fadeAnimation center={[state.locationMap.lat, state.locationMap.lon]} zoom={14} style={{ width: '100%', height: '100%', padding: '10px' }} onClick={e => handleLeafletMap(e)}>
                                    <TileLayer attribution={'&copy; <a href=\'https://wowdesarrollos.com/\'>Wow Desarrollos Digitales</a>'} url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                                    {!!state.values.up_lat && <Marker position={[state.values.up_lat, state.values.up_lon]} icon={suitcasePoint} draggable ondragend={handleDragMarket} />}
                                </LeafletMap>
                                {state.buttonActive === 0 ?
                                    <ContainerBtn width='40%' bgColor={PColor} position='absolute' zIndex='9999' border='none' margin='auto' right='0' bottom='20px' left='0' onClick={() => saveUserLocation(1)}>
                                        <div>Confirmar ubicacíon</div>
                                    </ContainerBtn> : state.buttonActive === 1 &&
                                    <>
                                    </>
                                }
                            </FlexBox>
                        }
                    </Content>
                </ContainerModal>
            </Row>
        </>
    )
}
export default connect(({ countries, departments, municipality }) => ({ countries, departments, municipality }), null)(SectionL)

const ContainerBurger = styled.div`
    .BurgerMenu__container {
    display: flex;
    flex-direction: column;    
    span {
      background-color: ${PColor};
      width: 25px;
      height: 1px;
      margin: 4px;
      border-radius: 1px;
      transition: all .1s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(45deg) translateY(4px) translateX(6px);

    }
    .open:nth-child(2) {
      opacity: 0;
    }
    .open:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px) translateX(9px);
    }
    .close:nth-child(1) {
      transform: rotate(0) translateY(0);
    }
    .close:nth-child(2) {
      opacity: 1;
    }
    .close:nth-child(3) {
      transform: rotate(0) translateY(0);
    }
}
`
export const ContainerModal = styled.div`
    position: fixed;
    top: 0;
    z-index: 99;
    left: 0;
    ${({ active }) => active && css`display: ${active};`};
    width: 100%;
    height: 100%;
    background-color:rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    animation-duration: .5s;  
    animation-fill-mode: forwards;
`
export const Content = styled.div`
    width: 50%;
    background-color: ${({ bgColor }) => bgColor ? bgColor : 'white'};
    position: relative;
    border-radius: 3px;
    top: 0px;
    z-index: 9999;
    height: 300px;
    width: 694px;
    @media(max-width: 768px){
        width: 100%;
        height: 100vh;
        padding: 0px;
    }
`
export const ImgLocation = styled.img`
    display: flex; 
    justify-content: center;
    margin: auto;
   
`
export const ButtonClose = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    outline: none;
    background-color: transparent;
    border: 1px;
    cursor: pointer;
`
export const ButtonMap = styled.button`
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    outline: 0;
    border:1px solid #ccc;
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ position }) => position && css`position: ${position};`}
    ${({ bottom }) => bottom && css`bottom: ${bottom};`}
    ${({ right }) => right && css`right: ${right};`}
    ${({ left }) => left && css`left: ${left};`}
    ${({ zIndex }) => zIndex && css`z-index: ${zIndex};`}
    ${({ color }) => color && css`color: ${color};`}
    border-radius: 10px;
    padding: 5px 30px;
    cursor: pointer;
`
export const FlexBox = styled.div`
    height: 100%;
`
export const Form = styled.form`
    padding: 30px;
    @media (max-width: 800px){
         width: 100%;

    }
`
export const ScrollOptions = styled(Scrollbars)`
    transition: 1s;
`
export const BoxOptions = styled.div`
    width: 94%;
    padding: 10px 0;
    margin: 0 3%;
    border-top: 1px solid #ccc;
`
export const Option = styled.button`
    outline: 0;
    background-color: transparent;
    border: none;
    display: block;
    padding: 3px;
    margin: 4px;
    font-size: 12px;
    width: 98%;
    color: ${SFColor};
    white-space: nowrap;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
        background-color: #DFDFDF;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    @media (max-width:786px){
        top: -23px;
    }
`
export const ContainerBtn = styled.button`
    outline: 0;
    width: ${({ width }) => width ? width : '100%'};
    height: 40px;
    align-items: center;
    display: flex;
    border-radius: 10px;
    color: ${PColor}; 
    padding: 15px;
    cursor: pointer;
    font-size: 12px;
    color: ${BGColor};
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    border: none;
    text-align: center;
    ${({ position }) => position && css`position: ${position};`}
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ bottom }) => bottom && css`bottom: ${bottom};`}
    ${({ right }) => right && css`right: ${right};`}
    ${({ left }) => left && css`left: ${left};`}
    ${({ zIndex }) => zIndex && css`z-index: ${zIndex};`}
     background-color: ${({ bgColor }) => bgColor ? bgColor : 'transparent'}; 
    /* background-color:rgba(28, 152, 235, 0.741);; */
    margin: ${({ margin }) => margin ? margin : '4px'};
    @media (max-width:786px){
        bottom: 70px;
    }

    & > div{
        display: flex;
        flex: auto;
        justify-content: center;
        font-family: PFont-Regular;
        font-size: 14px;
    }
    &:disabled {
        background-color: rgba(120, 121, 121, 0.474);
        cursor: not-allowed; 
        
    }
`
const Title = styled.h3`
    margin: auto;
    margin-bottom:10px;
    display: flex;
    justify-content: left;
    font-size: 1.2rem;
    font-family: PFont-Regular;
`
const Text = styled.h3`
    margin: auto;
    display: flex;
    justify-content: left;
    font-size: 0.8rem;
    font-family: PFont-Regular;
    color: #a79d9d;
`
const ContInputs = styled.div`
    display: flex;
`
const BtnClose = styled.button`
    cursor: pointer;
    border: 0;
    background-color: #fff;
    border-radius: 60%;
    font-size: 3px;

`
const Container = styled.div`
width: 100%;
display: flex;

`
const ContainerInputs = styled.div`
    float: left;
    width: 75%;
`
const ContainerBoton = styled.div`
    padding: 50px;
`

const ContTitles = styled.div`
    float: left;
    width: 95%;
`
const ContClose = styled.div`
    justify-content: right;
    float: right;
    width: 5%;
`

const ContUp = styled.div`
    width: 100%;
    display: flex;
`
