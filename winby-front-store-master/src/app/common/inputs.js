import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { PLColor, SFColor, PColor, BGColor, EColor, SFVColor, PVColor } from '../../assets/colors'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import es from 'react-phone-input-2/lang/es.json'
import { IconWarning } from '../../assets/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

// Inputs

export const InputText = ({ value, type, border, dataIgnore = false, placeholder, margin, name, onChange, onBlur, width, radius, bgColor, disabled, padding, reference, errorColor, label }) => <Container>
    {label &&
        <Label value={!!value}>{label}</Label>}
    <InputTextS
        value={value || ''} ref={reference} margin={margin} padding={padding} border={border} name={name} type={type} disabled={disabled}
        width={width} onChange={onChange} onBlur={onBlur} bgColor={bgColor} radius={radius} data-ignore={dataIgnore} placeholder={placeholder}
    />
    <SpanText color={errorColor || EColor} fontSize='10px' margin='0 5px' />
</Container>

export const InputTextPhone = ({ name, padding, margin, width, dataIgnore = false, autoFocus = false, value, country, containerStyle, inputStyle, disabled = false, disableDropdown = false, onBlur, onChange, errorColor, label = 'Número de teléfono' }) => <BoxPhone padding={padding} margin={margin} width={width}>
    <Label value={!!value}>{label}</Label>
    <PhoneInput
        inputProps={{ name, autoFocus }}
        containerStyle={containerStyle || { margin: '0' }}
        inputStyle={inputStyle || { borderRadius: '5px', width: '100%' }}
        country={country}
        onClick={e => e}
        value={value || ''}
        placeholder='+57 3XX XXX XX XX'
        preferredCountries={['co', 've']}
        disabled={disabled}
        label={label}
        disableDropdown={disableDropdown}
        enableLongNumbers
        localization={es}
        regions='america'
        masks={{ co: '(...) ...-....', ve: '(...) ...-....' }}
        onBlur={onBlur}
        onChange={onChange}
        data-ignore={dataIgnore}
        data-phone
    />
    <SpanText color={errorColor || EColor} fontSize='10px' margin='5px' />
</BoxPhone>

export const InputIcon = ({ value, type, dataIgnore = false, placeholder, name, onChange, onBlur, width, disabled, reference, icon, margin, border, radius, fontSize, padding }) => <Box width={width} margin={margin} border={border} radius={radius} padding={padding}>
    <InputView type={type} ref={reference} placeholder={placeholder} value={value || ''} onChange={onChange} name={name} disabled={disabled} onBlur={onBlur} data-ignore={dataIgnore} fontSize={fontSize} />
    {!!icon && <BoxIcon>{icon}</BoxIcon>}
</Box>

export const InputFile = ({ accept, value, active, label, multiple, dataIgnore = false, name, onChange, onBlur, width, margin, border, radius, fontSize, padding, justify }) => (
    <Box width={width} margin={margin} border={border} radius={radius} padding={padding} justify={justify}>
        <File color={active}>{label}</File>
        <FileInput type='file' accept={accept} multiple={multiple} name={name} value={value} onChange={onChange} onBlur={onBlur} data-ignore={dataIgnore} fontSize={fontSize} />
    </Box>
)

export const Input = ({ type, reference, title, value, onChange, name, disabled, onBlur, dataIgnore = false, size, width, minWidth, margin, radius, widthD, marginD }) => {
    const [visiblePass, setVisiblePass] = useState(false)
    return <BoxInput width={widthD} margin={marginD}>
        <InputV type={type !== 'password' ? type : (type === 'password' && visiblePass ? 'text' : 'password')} ref={reference} value={value || ''} onChange={onChange} name={name} disabled={disabled} onBlur={onBlur} data-ignore={dataIgnore} size={size} margin={margin} width={width} minWidth={minWidth} radius={radius} />
        <LabelInput value={value}>{title}</LabelInput>
        <Tooltip className="Tooltip" />
        <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0 }} />
        {type === 'password' && <ContainerIconEye><ButtonEye type='button' onClick={() => setVisiblePass(!visiblePass)}><FontAwesomeIcon icon={visiblePass ? faEyeSlash : faEye} color={SFColor} /></ButtonEye></ContainerIconEye>}
    </BoxInput>
}

export const InputPhone = ({ name, marginD, widthD, dataIgnore = false, autoFocus = false, value, country, disabled = false, disableDropdown = false, onBlur, onChange, title = 'Número de teléfono' }) => <BoxInput width={widthD} margin={marginD}>
    <PhoneInput
        inputProps={{ name, autoFocus }}
        containerStyle={{ margin: '0' }}
        buttonStyle={{ borderColor: SFVColor, backgroundColor: PLColor }}
        inputStyle={{ borderRadius: '8px', borderColor: SFVColor, width: '100%', fontSize: '13px', fontWeight: 'bold', color: SFColor }}
        country={country}
        value={value || ''}
        placeholder=''
        preferredCountries={['co', 've']}
        disabled={disabled}
        label={title}
        disableDropdown={disableDropdown}
        enableLongNumbers
        localization={es}
        regions='america'
        masks={{ co: '(...) ...-....', ve: '(...) ...-....' }}
        data-ignore={dataIgnore}
        data-phone
        onClick={e => e}
        onChange={onChange}
        onBlur={e => onBlur ? onBlur(e) : e.target.parentNode.nextSibling.nextSibling.style.display = 'none'}
        onFocus={e => e.target.parentNode.nextSibling.nextSibling.style.display = 'block'}
    />
    <LabelInput left={value ? '10px' : '50px'} value={value}>{title}</LabelInput>
    <Tooltip />
    <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0 }} />
</BoxInput>

const ContainerIconEye = styled.div`
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 20px;
    height: 20px;
    opacity: 1 !important;
`

const ButtonEye = styled.button`
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
`

const BoxInput = styled.div`
    position: relative;
    margin: ${({ margin }) => margin || '10px 0'};
    width: ${({ width }) => width || '100%'};
`
const Tooltip = styled.div`
    position: absolute;
    display: none;
    right: 5px;
    bottom: 120%;
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
    left: ${({ left }) => left || '10px'};
    color: ${({ value }) => value ? SFColor : SFVColor};
    transition: .3s;
    pointer-events: none;
    font-weight: ${({ value }) => value ? 600 : 400};
`
const InputV = styled.input`
    padding: 10px;
    color: ${SFColor};
    outline: 0;
    border: 1px solid ${SFVColor};
    font-size: ${({ size }) => size || '13px'};
    width: ${({ width }) => width || '100%'};
    min-width: ${({ minWidth }) => minWidth || '200px'};
    border-radius: ${({ radius }) => radius || '8px'};
    font-weight: 600;
    ${({ margin }) => !!margin && css`margin: ${margin};`}
    &:focus ~ ${LabelInput} {
        top: -17px;
        font-size: 11px;
    }
    &:focus { border: 1px solid ${PVColor}; }
    &:hover ~ ${Tooltip} { display: block; }
`

const Container = styled.div`
    margin: 10px 5px;
    padding: 5px;
    direction: column;
    width: 100%;
    position: relative;
`
const Label = styled.label`

`

const InputTextS = styled.input`
    border-radius: ${({ radius }) => radius || '8px'};
    border: ${({ border }) => border || `1px solid ${PLColor}`};
    color: ${SFColor};
    padding:  ${({ padding }) => padding || '8px'};
    outline: 0;
    width: ${({ width }) => width || '100%'};
    ${({ bgColor }) => bgColor && css`background-color: ${bgColor};`}
    /* &::placeholder {color: ;} */
    font-size: 14px;
    &:disabled {background-color: ${BGColor}F0;}
    &:focus {border: 1px solid ${PColor};}
    &:focus ~ ${Label} {
        top: -15px;
        font-size: 12px;
        left: 1px;
        border-radius: 0 8px 0 0;
        color: ${BGColor};
    }
    /* @media (max-width: 550px){
        padding: 10px;
    } */
`
const BoxPhone = styled.div`
    padding: ${({ padding }) => padding || '5px'};
    margin: ${({ margin }) => margin || '10px 5px 0px 5px'};
    width: ${({ width }) => width || '100%'};
    flex-direction: column; 
    position: relative;
`

const SpanText = styled.span`

`

const Box = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    padding: ${({ padding }) => padding || '6px'};
    margin: ${({ margin }) => margin || '7px 0'};
    border: ${({ border }) => border || '1px solid #ccc'};
    border-radius: ${({ radius }) => radius || '5px'};
    width: ${({ width }) => width || '100%'};
    ${({ justify }) => justify && css`justify-content: ${justify};`}
`
const InputView = styled.input`
    width: 100%;
    color: ${SFColor};
    ${({ fontSize }) => !!fontSize && css`font-size: ${fontSize};`}
    border: none;
    outline:none;
    &:disabled {
        background-color: transparent;
        cursor: no-drop;
    }
`
const BoxIcon = styled.div`
    align-items: center;
`
const File = styled.span`
	text-align: center;
    color: ${({ color }) => color || SFColor};
    padding: 2px 10px;
    font-size: 14px;
`
export const FileInput = styled.input`
    position:absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 100%;
	height: 100%;
	opacity: 0;
  cursor: pointer;
  border-radius: ${({ radius }) => radius};
  background-color: ${({ bgColor }) => bgColor};
`