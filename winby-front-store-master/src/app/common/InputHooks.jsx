import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { PColor, PVColor, SFColor, SFVColor } from '../../assets/colors'
import { IconWarning } from '../../assets/icons'
import { isEmail, isNull, onlyLetters, rangeLength } from '../utils'

const InputHooks = ({ type, reference, title, value, onChange, name, disabled, onBlur, dataIgnore = false,
    fontSize, width, minWidth, margin, radius, required, numeric, letters, range, email, error }) => {

    // Declarando el estado
    const [errors, setError] = useState(error)
    const [message, setMessage] = useState('El campo no debe estar vacío')

    // Función para activar el error
    const errorFunc = (v, m) => {
        setError(v)
        v && setMessage(m)
    }
    useEffect(() => {
        setError(error)
    }, [error])
    /**
     * @description Función que para validar los campos de texto por el método onChange
     * @version 0.0.1
     * @param {object} e evento del metodo change
     * @return {boolean} devuleve true o false si la validación es correcta o incorrecta
     *
    */
    const validations = e => {
        onChange(e, errors)

        // Valida que el campo no sea nulo
        if (required) {
            if (isNull(e.target.value)) return errorFunc(true, 'El campo no debe estar vacío')
            else errorFunc(false, '')
        }
        // Valida que el campo sea tipo numérico
        if (numeric) {
            if (isNaN(e.target.value)) return errorFunc(true, 'El campo debe ser numérico')
            else errorFunc(false, '')
        }
        // Valida que el campo sea solo letras
        if (letters) {
            if (onlyLetters(e.target.value)) return errorFunc(true, 'El campo debe contener solo letras')
            else errorFunc(false, '')
        }
        // Valida que el campo esté en el rango correcto
        if (range) {
            if (rangeLength(e.target.value, range?.min, range?.max)) return errorFunc(true, `El rango de carácteres es de ${ range.min } a ${ range.max }`)
            else errorFunc(false, '')
        }
        // Valida si el campo tiene un formato de email correcto
        if (email) {
            if (isEmail(e.target.value)) return errorFunc(true, 'El formato de email no es válido')
            else errorFunc(false, '')
        }


    }


    return (
        <BoxInput width={width} margin={margin} minWidth={minWidth}>
            <InputV type={type} ref={reference} value={value || ''} onChange={validations} name={name} disabled={disabled} onBlur={onBlur}
                data-ignore={dataIgnore} size={fontSize} radius={radius} error={errors} />
            <LabelInput value={value}>{title}</LabelInput>
            {errors && <Tooltip>{message}</Tooltip>}
            <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0 }} />
        </BoxInput>
    )
}

// Estilos
const BoxInput = styled.div`
    position: relative;
    margin: ${ ({ margin }) => margin ? margin : '10px 0' };
    width: ${ ({ width }) => width ? width : '100%' };
`
const Tooltip = styled.div`
    position: absolute;
    display: block;
    right: 5px;
    bottom: 120%;
    border: 1px solid ${ PColor };
    background-color: #FBCACA;
    padding: 0 10px;
    border-radius: 2px;
    z-index: 10;
    font-size: 11px;
    color: ${ PColor };
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
        border-top-color: ${ PColor };
        border-width: 5px;
        margin-left: -1px;
    }
`
const LabelInput = styled.span`
    position: absolute;
    font-size: ${ ({ value }) => value ? '11px' : '13px' };
    top: ${ ({ value }) => value ? '-17px' : '10px' };
    left: ${ ({ left }) => left ? left : '10px' };
    color: ${ ({ value }) => value ? SFColor : SFVColor };
    transition: .3s;
    pointer-events: none;
    font-weight: ${ ({ value }) => value ? 600 : 400 };
`

const InputV = styled.input`
    padding: 10px;
    color: ${ SFColor };
    outline: 0;
    border: 1px solid ${ SFVColor };
    font-weight: 600;
    font-size: ${ ({ size }) => size ? size : '13px' };
    width: ${ ({ width }) => width ? width : '100%' };
    border-radius: ${ ({ radius }) => radius ? radius : '8px' };
    ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
    ${ ({ minWidth }) => minWidth && css`min-width: ${ minWidth };` }
    &:focus ~ ${ LabelInput } {
        top: -17px;
        font-size: 11px;
    }
    &:focus { border: 1px solid ${ PVColor }; }
    &:hover ~ ${ Tooltip } { display: block; }
    ${ ({ error }) => error && css`background-color: #FBCACA;` }
`

InputHooks.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    minLenght: PropTypes.number,
    maxLenght: PropTypes.number,
    email: PropTypes.bool,
    numeric: PropTypes.bool,
    letters: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    dataIgnore: PropTypes.bool,
    type: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.string,
    margin: PropTypes.string,
    radius: PropTypes.string,
    widthD: PropTypes.string,
    range: PropTypes.object,
    fontSize: PropTypes.string,
    reference: PropTypes.object
}

export default InputHooks