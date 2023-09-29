import React from 'react'
import styled from 'styled-components'
import { PColor, PLColor } from '../../../assets/colors'
import { url_base } from '../../redux/types'
import Schedule from './Schedule'

const RequestVendorsModalBody = ({ state, handleSubmit, handleClickSchedulle }) => (
    <ContainerForm onSubmit={handleSubmit}>
        <ContainerModules left>
            <div>
                <Center >
                    {/* <CustomInputImageC rounded height='100px' width='100px' source={'https://i.blogs.es/594843/chrome/450_1000.jpg'} /> */}

                    <CustomInputImageC rounded height='100px' width='100px' source={state.vendorsLegalInfo ? `${url_base}static/vendors/${state.vendorsLegalInfo.v_id}/${state.vendorsLegalInfo.v_logo}` : 'https://i.blogs.es/594843/chrome/450_1000.jpg'} />
                    <TitleInputImage>LOGO</TitleInputImage>
                </Center>
                <h3 style={{ textAlign: 'center' }}>{state.vendorsLegalInfo?.v_alias || ''}</h3>
            </div>

        </ContainerModules>
        <ContainerModuleHorario>
            <Schedule defaultValue={state.schedulle} onClick={handleClickSchedulle} dayTypeName='sc_type' hoursArrayName='servicecalendarhours' hoursValues='sch_value' selectedValues={state.selectedSchedulle} />
        </ContainerModuleHorario>
    </ContainerForm>
)

const CustomInputImageC = ({ source, rounded, BGColor, height, width, margin }) => (
    <CustomInputImage rounded={rounded} height={height} width={width} BGColor={BGColor} margin={margin} >
        <Image src={source} borderRadius='100%' alt='Logo' />
    </CustomInputImage>)

const ContainerForm = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: 768px){
        display: block;
        /* width: 80%; */
    }   
`

const ContainerModules = styled.div`
    width: 30%;
    background: transparent;
    border-right: ${({ left }) => left ? `1px solid ${PLColor}` : 'none'};
    margin-top: 10px;
    padding: 10px;
    @media (max-width: 768px){
        width: 50%;
        margin-top: 0px;
        padding: 0px;
        border-right: none;
        margin: auto;
    }   
`
const ContainerModuleHorario = styled.div`
    width: 70%;
    background: transparent;
    border-right: ${({ left }) => left ? `1px solid ${PLColor}` : 'none'};
    margin-top: 10px;
    padding: 10px;
    @media (max-width: 768px){
        width: 100%;
        margin-top: 0px;
        padding: 0px;
    }   
`
const TitleInputImage = styled.p`
    color: ${PColor}96;
    position: absolute;
    bottom: 0px;
    font-family: PFont-Regular;
`
const Center = styled.div`
    position: relative;
    width: ${({ width }) => width ? width : '100%'};
    height: ${({ height }) => height};
    display: flex;
    justify-content: center;
    align-items: center;
`
const CustomInputImage = styled.div`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background: ${({ BGColor }) => BGColor ? BGColor : `${PColor}99`};
    border-radius: ${({ rounded }) => rounded ? '100%' : '10px'};
    margin: ${({ margin }) => margin};
    border: ${({ rounded }) => rounded ? `1px solid ${PColor}96` : '1px solid #333'};
    position: relative;
    overflow: hidden;
    z-index: 2;
`
const Image = styled.img`
    width: 100%;
    height: 100%
    position: absolute;
    top: 0;
    border-radius: ${({ borderRadius }) => borderRadius};
    z-index: 1;
    opacity: ${({ src }) => src ? '1' : '0'};

`

export default RequestVendorsModalBody