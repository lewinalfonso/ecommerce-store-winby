import React from 'react'
import styled, { css } from 'styled-components'
import { SFColor, BGColor, PColor, ESFColor, EASFColor, PLVColor, SFVColor, PVColor } from '../../assets/colors'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import es from 'react-phone-input-2/lang/es.json'
import { IconWarning } from '../../assets/icons'

export default ({ width, label, dataIgnore = false, onChange, padding, value, type, name, reference, errorColor, placeholder, margin, border }) => (
    <Container width={width}>
        <Box direction="column" width="100%">
            <Label>{label}</Label>
            <InputTextS padding={padding} border={border} type={type || 'text'} ref={reference} onChange={onChange} value={value || ''} name={name} data-ignore={dataIgnore} placeholder={placeholder} />
            <SpanText color={errorColor ? EASFColor : ESFColor} fontSize='10px' margin={margin ? margin : '0 5px'}></SpanText>
        </Box>
    </Container>

)
export const TextArea = ({ width,minH, bottom, maxH, minW, maxW, label, dataIgnore = false, onChange, padding, value, name, reference, errorColor, placeholder, margin, border }) => (
    <Container width={width}>
        <Box direction="column" width="100%">
            <Label>{label}</Label>
            <InputTextArea minH={minH} maxH={maxH} minW={minW} maxW={maxW} bottom={bottom} padding={padding} border={border} ref={reference} onChange={onChange} value={value || ''} name={name} data-ignore={dataIgnore} placeholder={placeholder} />
            <SpanText color={errorColor ? EASFColor : ESFColor} fontSize='10px' margin={margin ? margin : '0 5px'}></SpanText>
        </Box>
    </Container>

)
/** Input Login */
export const VInputText = ({ value, type, border, dataIgnore = false, placeholder, margin, name, onChange, onBlur, width, radius, bgColor, disabled, padding, reference, errorColor, label }) => (
    <Box width='100%' direction='column'>
        <InputTextS value={value || ''} ref={reference} margin={margin} padding={padding} border={border} name={name} type={type} disabled={disabled}
            width={width} onChange={onChange} onBlur={onBlur} bgColor={bgColor} radius={radius} data-ignore={dataIgnore} placeholder={placeholder} />
        <SpanText color={errorColor ? errorColor : ESFColor} fontSize='10px' margin='0 5px'></SpanText>
        {label &&
                <LabelInput value={!!value}>{label}</LabelInput>
        }
    </Box>
)

/** Input Login Telefono */
export const InputTextPhone = ({ name, dataIgnore = false, autoFocus = false, value, country, containerStyle, inputStyle, disabled = false, disableDropdown = false, onBlur, onChange, errorColor, label = 'Número de teléfono' }) => (
    <BoxPhone>
        <PhoneInput
            inputProps={{ name, autoFocus }}
            containerStyle={containerStyle ? containerStyle : { margin: '0' }}
            inputStyle={inputStyle ? inputStyle : { borderRadius: '8px', width: '100%' }}
            country={country}
            onClick={e => e}
            value={value || ''}
            placeholder="+57 3XX XXX XX XX"
            preferredCountries={['co', 've']}
            disabled={disabled}
            label={label}
            disableDropdown={disableDropdown}
            enableLongNumbers={true}
            localization={es}
            regions={'america'}
            masks={{ co: '(...) ...-....', ve: '(...) ...-....' }}
            onBlur={onBlur}
            onChange={onChange}
            data-ignore={dataIgnore}
            data-phone={true}
        />
        <SpanText color={errorColor ? errorColor : ESFColor} fontSize='10px' margin='5px'></SpanText>
        {value && <LabelInput value={!!value}>{label}</LabelInput> }
    </BoxPhone>
)

export const Input = ({ type, reference, title, value, onChange, name, disabled, onBlur, dataIgnore = false, size, width, minWidth, margin, radius, widthD, marginD }) => (
    <BoxInput width={widthD} margin={marginD}>
        <InputV type={type} ref={reference} value={value || ''} onChange={onChange} name={name} disabled={disabled} onBlur={onBlur} data-ignore={dataIgnore} size={size} margin={margin} width={width} minWidth={minWidth} radius={radius} />
        <LabelInput value={value}>{title}</LabelInput>
        <Tooltip />
        <IconWarning size={20} color={PColor} style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0 }} />
    </BoxInput>
)

export const InputFile = ({ accept, value, active, label, multiple, dataIgnore = false, name, onChange, onBlur, width, height, margin, border, radius, fontSize, padding, justify, image, src }) => (
    <BoxFile width={width} height={height} margin={margin} border={border} radius={radius} padding={padding} justify={justify}>
        {image && <Image src={src} />}
        <File color={active}>{label}</File>
        <FileInput type='file' accept={accept} multiple={multiple} name={name} value={value} onChange={onChange} onBlur={onBlur} data-ignore={dataIgnore} fontSize={fontSize} />
    </BoxFile>
)

const BoxInput = styled.div`
    position: relative;
    margin: ${ ({ margin }) => margin ? margin : '10px 0' };
    width: ${ ({ width }) => width ? width : '100%' };
`
const Tooltip = styled.div`
    position: absolute;
    display: none;
    right: 5px;
    bottom: 120%;
    opacity: 0;
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
const LabelInput = styled.label`
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
    font-size: ${ ({ size }) => size ? size : '13px' };
    width: ${ ({ width }) => width ? width : '100%' };
    min-width: ${ ({ minWidth }) => minWidth ? minWidth : '200px' };
    border-radius: ${ ({ radius }) => radius ? radius : '8px' };
    font-weight: 600;
    ${ ({ margin }) => !!margin && css`margin: ${ margin };` }
    &:focus ~ ${ LabelInput } {
        top: -17px;
        font-size: 11px;
    }
    &:focus { border: 1px solid ${ PVColor }; }
    &:hover ~ ${ Tooltip } { display: block; }
`
const Container = styled.div`
    margin: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: ${ ({ width }) => width ? width : '120px' };
    min-width: min-content;
`
const Box = styled.div`
    display: flex;
    ${ ({ width }) => width && css`width: ${ width };` }
    flex-direction: ${ ({ direction }) => direction ? direction : 'row' };
    position: relative;
    /* align-items: center; */
`
const Label = styled.label`
    flex: fit-content;
    font-size: 12px;
    font-family: Tahoma, 'Segoe UI', Geneva, Verdana, sans-serif;
    padding-right: 15px;
    color: ${ SFColor };
`
// const Description = styled.span`
//     display: block;
//     padding: 5px 2px;
//     font-size: 12px;
//     color: ${SFColor};
//     font-family: Tahoma, 'Segoe UI', Geneva, Verdana, sans-serif;
// `
/** Text info or span */
const SpanText = styled.span`
    font-family: PFont-Bold;
    color: ${ ({ color }) => color ? color : SFColor };
    display: inline;
    font-size: ${ ({ fontSize }) => fontSize ? fontSize : '12px' };
    margin: ${ ({ margin }) => margin && margin };
`
export const InputTextS = styled.input`
    border-radius: ${ ({ radius }) => radius ? radius : '4px' };
    border: ${ ({ border }) => border ? border : `1px solid ${ PLVColor }` };
    color: ${ SFColor };
    padding:  ${ ({ padding }) => padding ? padding : '8px' };
    outline: 0;
    width: ${ ({ width }) => width ? width : '100%' };
    ${ ({ bgColor }) => bgColor && css`background-color: ${ bgColor };` }
    font-size: 14px;
    top: ${ ({ top }) => top };
    left: ${ ({ left })=> left };
    right: ${ ({ right })=> right };
    bottom: ${ ({ bottom })=> bottom };
    opacity: ${ ({ opacity })=> opacity };
    height: ${ ({ height })=> height };
    &:disabled {background-color: ${ BGColor }F0;}
    &:focus {border: 1px solid ${ PColor };}
    &:focus ~ ${ Label } {
        top: -15px;
        font-size: 12px;
        left: 1px;
        border-radius: 0 8px 0 0;
        color: ${ BGColor };
    }


`
export const InputTextArea = styled.textarea`
    min-width: ${({minW})=> minW ? minW: '100%'};
    max-width: ${({maxW})=> maxW ? maxW: '100%'};
    min-height: ${({minH})=> minH ? minH: '30px'};
    max-height: ${({maxH})=> maxH ? maxH: '30px'};
    border-radius: ${ ({ radius }) => radius ? radius : '4px' };
    border: ${ ({ border }) => border ? border : `1px solid ${ PLVColor }` };
    color: ${ SFColor };
    padding:  ${ ({ padding }) => padding ? padding : '8px' };
    outline: 0;
    width: ${ ({ width }) => width ? width : '100%' };
    ${ ({ bgColor }) => bgColor && css`background-color: ${ bgColor };` }
    font-size: 14px;
    top: ${ ({ top }) => top };
    left: ${ ({ left })=> left };
    right: ${ ({ right })=> right };
    bottom: ${ ({ bottom })=> bottom };
    opacity: ${ ({ opacity })=> opacity };
    height: ${ ({ height })=> height };
    &:disabled {background-color: ${ BGColor }F0;}
    &:focus {border: 1px solid ${ PColor };}
    &:focus ~ ${ Label } {
        top: -15px;
        font-size: 12px;
        left: 1px;
        border-radius: 0 8px 0 0;
        color: ${ BGColor };
    }


`
const BoxPhone = styled.div`
    margin: 10px 5px 0px 5px;
    direction: column; 
    width: 100%;
    position: relative;
`

const BoxFile = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    padding: ${ ({ padding }) => padding || '6px' };
    margin: ${ ({ margin }) => margin || '7px 0' };
    border: ${ ({ border }) => border || `1px solid ${ SFVColor }` };
    border-radius: ${ ({ radius }) => radius || '8px' };
    width: ${ ({ width }) => width || '100%' };
    ${ ({ justify }) => justify && css`justify-content: ${ justify };` }
    ${ ({ height }) => height && css`height: ${ height };` }
`
const File = styled.span`
	text-align: center;
    color: ${ ({ color }) => color || SFColor };
    padding: 2px 10px;
    font-size: 14px;
`
const FileInput = styled.input`
    position:absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 100%;
	height: 100%;
	opacity: 0;
    cursor: pointer;
    background-color: transparent;
`
const Image = styled.img`
    height: 100%;
    width: 100%;
    position: absolute;
    border-radius: ${ ({ radius }) => radius || '8px' };
`