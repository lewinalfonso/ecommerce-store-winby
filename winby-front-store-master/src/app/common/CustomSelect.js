import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { PLColor, SFColor, PColor, BGColor, ESFColor, SFVColor } from '../../assets/colors'
import { IconArrowBottom } from '../../assets/icons'
import { InputText } from './inputs'
import Scrollbars from 'react-custom-scrollbars'

export default ({ options, disabled, id, name, onChange, optionName, value, title, errorColor, styleSelect = {}, width, search, placelholder, padding, margin }) => {
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
    <BoxSelect width={width} padding={padding} margin={margin}>
      <BoxP>
        <Label>{title}</Label>
        <CustomSelectS id={id} s={styleSelect} ref={v => !!v && changeRef(v)}>
          <CustomButtonS type='button' disabled={disabled} color={val ? SFColor : '#757575'} onClick={handleClick}>
            {value ? (val ? val[optionName] : '') : (placelholder || '') /*: title */}
            <IconSel>
              <IconArrowBottom size='10px' color={SFVColor} />
            </IconSel>
          </CustomButtonS>
          <input type='hidden' name={name} value={value || false} />
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
        </CustomSelectS>
        <SpanText color={errorColor || ESFColor} fontSize='10px' margin='0 5px' />
      </BoxP>
    </BoxSelect>
  )
}

const BoxP = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const CustomSelectS = styled.div`
    position: relative;
    height: 34px;
    min-height: 34px;
    border-radius: ${({ s }) => s.radius ? s.radius : '2px'};
    border: 1px solid #ccc;
    padding: ${({ s }) => s.padding ? s.padding : '4px'};
    outline: 0;
    width: ${({ s }) => s.width ? s.width : '100%'};
    background-color: ${({ s }) => s.bgColor ? s.bgColor : '#fff'};
`

const CustomButtonS = styled.button`
    position: relative;
    display: block;
    width: 100%;
    color: ${({ color }) => color || SFColor};
    background-color: #fff;
    font-size: 14px;
    height: 100%;
    outline: 0;
    border: none;
    padding: 5px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
        cursor: pointer;
        ${({ hover }) => hover && css`background-color: ${PColor};`}
        ${({ hover }) => hover && css`color: ${BGColor};`}
    }
    &:disabled {
        cursor: no-drop;
    }
`
const IconSel = styled.div`
    position: absolute;
    right: 5px;
    top: 25%;
`
const BoxSelect = styled.div`
    flex-direction: column;
    width: ${({ width }) => width || '100%'};
    margin: ${({ margin }) => margin || '10px 5px'};
    padding: ${({ padding }) => padding || '5px'};
    position: relative;
`
// const Description = styled.span`
//     display: block;
//     padding: 5px 2px;
//     font-size: 12px;
//     color: ${SFColor};
//     font-family: Tahoma, 'Segoe UI', Geneva, Verdana, sans-serif;
// `

const BoxOptions = styled.div`
    position: absolute; 
    direction: column; 
    left: -1px;
    bottom: ${({ bottom }) => bottom ? '100%' : 'none'};
    top: ${({ top }) => top ? '100%' : 'none'};
    width: 100.5%;
    min-width: min-content;
    background-color: ${BGColor};
    border: 1px solid ${PLColor}; 
    /* border-radius: 0 0 10px 10px; */
    z-index: 100;
`

/** Text info or span */
const SpanText = styled.span`
    color: ${({ color }) => color || SFColor};
    display: inline;
    font-size: ${({ fontSize }) => fontSize || '12px'};
    margin: ${({ margin }) => margin && margin};
`
const Label = styled.label`
    flex: fit-content;
    font-size: 16px;
    font-family: Tahoma, 'Segoe UI', Geneva, Verdana, sans-serif;
    padding-right: 15px;
    color: ${SFColor};
    padding-bottom: 1.5px;
`
