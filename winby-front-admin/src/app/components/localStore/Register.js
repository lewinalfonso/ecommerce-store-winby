import React from 'react'
import { connect } from 'react-redux'
import Scrollbars from 'react-custom-scrollbars'
import Loading from '../../common/Loading'
import InputText from '../../common/InputText'
import CustomSelect from '../../common/CustomSelect'
import { PColor, BGColor, SFColor } from '../../../assets/colors'
import { Container, Form, Title, Article, ContainerRow, ButtonMap, BoxSearch, InputSearch, ButtonIcon, BoxOptions, ContainerSearch, Option, ScrollOptions } from './Styles'
import { IconCancel, IconMap, IconSearch } from '../../../assets/icons'
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Modals from '../../common/Modals'
import L from 'leaflet'
import Textures from '../../../assets/fondoTextura.svg'
import Location from '../../../assets/Imagenes/location.png'
import styled from 'styled-components'
import { AlertTitle } from '../../common/Alerts'
import { ButtonRipple } from '../../common/ButtonRipple'
import { TypeDeliveryCostSelect } from '../../containers/TypeDeliveryCost'

const suitcasePoint = new L.Icon({
    iconUrl: Location,
    iconAnchor: [20, 40],
    iconSize: [30, 30],
})

const Register = ({ handleChangeDeliveryCost, onChangeInput, onSubmit, onChangeSelect, state, typeDeliveryCosts, countries, departments, municipality, handleSearchInput, onChangeSearch, handleOption, handleMap, handleLeafletMap, openModal }) => <RedV>
    <Scrollbars style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
            {state.loading && <Loading />}
            {state.lsNoReg && <AlertTitle title='Un momento!' message='Antes de registrar un producto o servicio debes registrar minímo una sucursal.' />}
            <Form onSubmit={onSubmit}>
                <Article>
                    <Title> Registro de Sucursal</Title>
                    {/* 1ra sección */}
                    <ContainerRow dis={state.toggleElement === 1}>
                        <InputText placeholder="Nombre Sucursal" class="sinborde"
                            width='100%'
                            name='vl_name'
                            onChange={e => onChangeInput(e, true, true, false, true, 4, 70)}
                            value={state.values.vl_name}
                        />
                        <InputText placeholder="Nombre Persona contacto"
                            width='100%'
                            name='vl_contact'
                            onChange={e => onChangeInput(e, true, true, false, true, 4, 70)}
                            value={state.values.vl_contact}
                        />
                    </ContainerRow >
                    {/* 2da sección */}
                    <ContainerRow dis={state.toggleElement === 2}>
                        <InputText placeholder="Número de Celular"
                            width='100%'
                            name='vl_phoMob'
                            dataIgnore
                            onChange={e => onChangeInput(e, true, false, true, true, 4, 20)}
                            value={state.values.vl_phoMob}
                        />
                        <InputText placeholder="Número de Teléfono"
                            width='100%'
                            name='vl_landline'
                            dataIgnore
                            onChange={e => onChangeInput(e, true, false, true, true, 4, 20)}
                            value={state.values.vl_landline}
                        />
                        <InputText placeholder="Correo Electrónico"
                            width='100%'
                            name='vl_email'
                            dataIgnore
                            onChange={e => onChangeInput(e, true, false, false, true, 4, 70, true)}
                            value={state.values.vl_email}
                        />
                    </ContainerRow >


                    {/*3era sección */}
                    <ContainerRow dis={state.toggleElement === 3}>
                        <CustomSelect
                            options={countries.data || []}
                            width='100%'
                            id='c_id'
                            name='c_id'
                            optionName='c_name'
                            title='País'
                            onChange={(v, id, e, value) => onChangeSelect(v, id, e, value, 1)}
                            value={state.values.c_id}
                        />
                        <CustomSelect
                            options={departments.data || []}
                            search
                            width='100%'
                            id='d_id'
                            name='d_id'
                            optionName='d_name'
                            title='Estado / Departamento'
                            onChange={(v, id, e, value) => onChangeSelect(v, id, e, value, 2)}
                            value={state.values.d_id}
                        />
                        <CustomSelect
                            options={municipality.data || []}
                            search
                            width='100%'
                            id='m_id'
                            name='m_id'
                            optionName='m_name'
                            title='Municipio'
                            onChange={(v, id, e, value) => onChangeSelect(v, id, e, value, 3)}
                            value={state.values.m_id}
                        />
                        <InputText
                            width='100%'
                            label='Dirección exacta'
                            name='vl_address'
                            onChange={e => onChangeInput(e, true, false, false, true, 4, 70)}
                            value={state.values.vl_address}
                        />
                    </ContainerRow >
                    <ContainerRow align='center' noBlock>
                        {(!!state.values.c_id && !!state.values.d_id && !!state.values.m_id && !!state.values.vl_address) && <ButtonMap type='button' onClick={handleMap}>
                            <IconMap size={50}
                                color={state.values.vl_lat ? '#44C868' : '#ccc'}
                                color2={state.values.vl_lat ? '#4CE166' : '#ccc'}
                                color3={state.values.vl_lat ? '#FFDB56' : '#ccc'}
                                color4={state.values.vl_lat ? '#FFBB24' : '#ccc'}
                                color5={state.values.vl_lat ? '#A8EEFC' : '#ccc'}
                                color6='#FF4A4A'
                                color7='#E7343F'
                                color8={state.values.vl_lat ? '#1EA4E9' : '#ccc'}
                            />
                        </ButtonMap>}
                    </ContainerRow >
                    {!!state.values.vl_lat && <ContainerRow align="flex-end">
                        <TypeDeliveryCostSelect
                            name='tdc_idLoc'
                            title='Tipo de costo de domicilio local'
                            width={window.screen.width <= 768 ? '100%' : '50%'}
                            value={state.values.tdc_idLoc}
                            onChange={(name, value, item) => handleChangeDeliveryCost(name, value, item, 1)}
                        />
                        <TypeDeliveryCostSelect
                            name='tdc_idNat'
                            title='Tipo de costo de domicilio nacional'
                            width={window.screen.width <= 768 ? '100%' : '50%'}
                            value={state.values.tdc_idNat}
                            onChange={(name, value, item) => handleChangeDeliveryCost(name, value, item, 2)}
                        />
                    </ContainerRow >}
                    <ContainerRow >
                        {/* {state.tdc_typeLoc === 4 && <>
                            <InputText
                                width='60%'
                                type='number'
                                label='Radio de covertura para entrega de domicilio sin costo'
                                name='vl_domFre'
                                placeholder='Metros'
                                onChange={e => onChangeInput(e, true, false, false, true, 2, 70)}
                                value={state.values.vl_domFre}
                            />
                            <InputText
                                width='40%'
                                type='number'
                                label='Costo de domicilio por Km'
                                placeholder='Kilometros'
                                name='vl_cosKM'
                                onChange={e => onChangeInput(e, true, false, false, true, 4, 70)}
                                value={state.values.vl_cosKM}
                            />
                        </>} */}
                        {state.tdc_typeLoc === 3 &&
                            <InputText
                                width={window.screen.width <= 768 ? '100%' : '50%'}
                                type='number'
                                label='Costo fijo para envios locales'
                                name='vl_domLoc'
                                placeholder='Pesos'
                                onChange={e => onChangeInput(e, true, false, false, true, 2, 70)}
                                value={state.values.vl_domLoc}
                            />

                        }
                        {state.tdc_typeNat === 3 && <InputText
                            width={window.screen.width <= 768 ? '100%' : '50%'}
                            type='number'
                            label='Costo fijo para envios nacionales'
                            placeholder='Pesos'
                            name='vl_domNat'
                            onChange={e => onChangeInput(e, true, false, false, true, 4, 70)}
                            value={state.values.vl_domNat}
                        />}
                    </ContainerRow >
                    <ButtonRipple type='submit' color={BGColor} width='200px' display='flex' padding='5px 10px' justify='center' left='0' right='0' margin='auto' >{state.edit ? 'Guardar' : 'Crear'}</ButtonRipple>
                </Article>
                {/** Enviar el formulario */}
            </Form>
        </Container>
        <Modals padding='0' height='80%' visible={state.visible} disableHeader onClick={openModal}>
            <ContainerSearch>
                <BoxSearch>
                    <InputSearch type='text' value={state.search || ''} name='search' onChange={onChangeSearch} placeholder='Dirección' />
                    <ButtonIcon type='button' onClick={handleSearchInput}>
                        {state.searchIcon ? <IconSearch color={PColor} size={15} /> : <IconCancel color={SFColor} size={15} />}
                    </ButtonIcon>
                </BoxSearch>
                {!!state.searchOptions.length && <ScrollOptions opacity={true} autoHeight autoHeightMax='250px' autoHeightMin='50px' autoHide>
                    <BoxOptions>
                        {state.searchOptions.map((x, i) => 
                        <Option key={i} title={x.label} onClick={() => handleOption(x)}>{x.label}</Option>)}
                    </BoxOptions>
                </ScrollOptions>}
            </ContainerSearch>
            <LeafletMap id='leaflet' attributionControl minZoom={12} maxZoom={18} fadeAnimation center={[state.locationMap.lat, state.locationMap.lon]} zoom={14} style={{ width: '100%', height: '100%', borderRadius: '20px' }} onClick={e => handleLeafletMap(e)} >
                <TileLayer attribution={'&copy; <a href=\'https://wowdesarrollos.com/\'>Wow Desarrollos Digitales</a>'} url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {!!state.values.vl_lat && <Marker position={[state.values.vl_lat, state.values.vl_lon]} icon={suitcasePoint} draggable />}
            </LeafletMap>
            <ButtonMap type='button' position='absolute' zIndex='999' border='none' right='10px' bgColor={PColor} color={BGColor} onClick={openModal}>Confirmar</ButtonMap>
        </Modals>
    </Scrollbars>
</RedV>

const RedV = styled.div`
    background-image: url(${Textures});
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
`

/** Redux */
export default connect(({ countries, departments, municipality, typeDeliveryCosts }) => ({ countries, departments, municipality, typeDeliveryCosts }), null)(Register)