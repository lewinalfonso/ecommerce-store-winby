import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { PLColor, SFColor, PColor, BGColor, SFVColor } from '../../assets/colors'
import { IconArrowBottom, IconWarning } from '../../assets/icons'
import { InputText } from './inputs'
import Scrollbars from 'react-custom-scrollbars'

export default ({ options, disabled, id, idD, name, onChange, optionName, value, width, search, title, padding, margin, minWidth }) => {
    /** Hooks */
    const [select, setSelect] = useState(false)
    const [selectRef, setSelectRef] = useState(0)
    const [valueInput, setValueInput] = useState()
    const [selectBody, setSelectBody] = useState(0)
    const [newOption, setNewOption] = useState(false)
    const bodyHeight = window.screen.height
    const inputSearch = useRef(null)
    const [refSelect, setRefSelect] = useState(false)

    /** Use Effect */
    useEffect(() => {
        setNewOption(options)
    }, [options])

    /** Use Effect */
    useEffect(() => {
        if (search) { select && inputSearch.current.focus() }
    }, [select, search])

    /** guarda la referencia de la caja */
    const changeRef = v => {
        setSelectRef(v.offsetTop + selectBody)
        setRefSelect(v)
    }

    /** Valor selecionado */
    const changeValue = v => {
        setSelect(false)
        onChange(v, name, refSelect)
    }

    /** Busqueda */
    const changeSearch = v => {
        setValueInput(v.target.value)
        const fil = options.filter(x => x[optionName].toUpperCase().indexOf(v.target.value.toUpperCase()) > -1)
        setNewOption(fil)
    }

    /** Función al hacer click sobre el select */
    const handleClick = e => {
        e.preventDefault()
        setSelect(!select)
        setTimeout(() => setNewOption(options), 500)
    }

    const handleBlur = () => {
        setTimeout(() => setSelect(false), 400)
        setTimeout(() => setNewOption(options), 300)
    }

    const val = options.find(x => x[name] === value)
    return (
        <BoxSelect width={width} padding={padding} margin={margin} ref={v => !!v && changeRef(v)} id={idD}>
            <FixedBox onClick={() => setSelect(false)} active={select} />
            <CustomButtonS type='button' disabled={disabled} height={!val ? '37px' : ''} color={val ? SFColor : '#757575'} onClick={handleClick} minWidth={minWidth}>
                <span>{val ? val[optionName] : ''}</span>
                <IconSel>
                    <IconArrowBottom size='10px' color={SFVColor} />
                </IconSel>
            </CustomButtonS>
            <LabelInput value={value}>{title}</LabelInput>
            <Tooltip />
            {/** Caja de items */}
            {select &&
        <BoxOptions
            onBlur={handleBlur}
            bottom={selectRef > bodyHeight}
            ref={v => setSelectBody(!!v && v.offsetHeight)}
            top={selectRef < bodyHeight}
        >
            {search && <InputText radius='5px' placeholder='Buscar aquí...' width='96%' padding='1px 8px' border={`1px solid ${PColor}`} value={valueInput} reference={inputSearch} onChange={changeSearch} />}
            <Scrollbars style={{ width: '100%' }} autoHide autoHideTimeout={1500} autoHideDuration={400} autoHeight autoHeightMin={0} autoHeightMax='200px'>
                {newOption.map(x => <CustomButtonS key={x[id]} title={x[optionName]} type='button' onClick={() => changeValue(x)}>{x[optionName]}</CustomButtonS>)}
            </Scrollbars>
        </BoxOptions>}
            <input type='hidden' name={name} value={value || false} id={id} />
            <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0, pointerEvents: 'none' }} />
        </BoxSelect>
    )
}

const BoxSelect = styled.div`
    flex-direction: column;
    width: ${({ width }) => width || '100%'};
    margin: ${({ margin }) => margin || '20px 0'};
    border-radius: ${({ radius }) => radius || '8px'};
    background-color: ${({ bgColor }) => bgColor || '#fff'};
    ${({ padding }) => !!padding && css`padding: ${padding};`}
    position: relative;
    border: 1px solid ${SFVColor};
`
// Caja para ocultar al hacer click fuera del foco del select
const FixedBox = styled.div`
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    z-index: ${ ({ active }) => active ? '9' : '-1' };
    background-color: transparent;
`
/** mensaje de alerta */
const Tooltip = styled.div`
    position: absolute;
    right: 5px;
    bottom: 120%;
    display: none;
    opacity: 0;
    border: 1px solid ${PColor};
    background-color: #FBCACA;
    padding: 0 10px;
    border-radius: 2px;
    z-index: 10;
    font-size: 11px;
    color: ${PColor};
    &::after, &::before {
        top: 100%;
        left: 90%;
        border: solid transparent;
        content: "";
        position: absolute;
        pointer-events: none;
    }
    &::after {
        border-top-color: #FBCACA;
        border-width: 4px;
    }
    &::before {
        border-top-color: ${PColor};
        border-width: 5px;
        margin-left: -1px;
    }
`
const LabelInput = styled.label`
    position: absolute;
    font-size: ${({ value }) => value ? '11px' : '13px'};
    top: ${({ value }) => value ? '-17px' : '10px'};
    left: 10px;
    color: ${({ value }) => value ? SFColor : SFVColor};
    transition: .3s;
    pointer-events: none;
    font-weight: ${({ value }) => value ? 600 : 400};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
/** Select */
const CustomButtonS = styled.button`
    position: relative;
    display: block;
    background-color: transparent;
    outline: 0;
    border: none;
    padding: 9px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100%;
    font-size: ${({ size }) => size || '13px'};
    color: ${({ color }) => color || SFColor};
    width: ${({ width }) => width || '100%'};
    min-width: ${({ minWidth }) => minWidth || '200px'};
    ${({ height }) => !!height && css`height: ${height};`}
    &:hover {
        cursor: pointer;
        ${({ hover }) => hover && css`background-color: ${PColor};`}
        ${({ hover }) => hover && css`color: ${BGColor};`}
    }
    &:disabled { cursor: no-drop; }
    &:hover ~ ${Tooltip} { display: block; }
`
const IconSel = styled.div`
    position: absolute;
    right: 5px;
    top: 25%;
    pointer-events: none;
`
const BoxOptions = styled.div`
    position: absolute; 
    direction: column; 
    left: -10px;
    bottom: ${({ bottom }) => bottom ? '100%' : 'none'};
    top: ${({ top }) => top ? '100%' : 'none'};
    width: 90%;
    min-width: min-content;
    background-color: ${BGColor};
    border: 1px solid ${PLColor}; 
    /* border-radius: 0 0 10px 10px; */
    z-index: 100;
`