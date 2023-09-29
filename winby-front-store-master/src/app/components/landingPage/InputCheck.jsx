import React from 'react'
import styled, { css } from 'styled-components'

export default ({ label, inputId, name, fontSize, required = false, margin }) => (
    <InputCheckContainer margin={margin}>
        <InputCheckbox id={inputId} type='checkbox' name={name} required={required} />
        <InputCheckLabel fontSize={fontSize}>
            {label}
        </InputCheckLabel>
    </InputCheckContainer>
)

const InputCheckContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    ${({ margin }) => margin && css`margin: ${margin};`}
`
const InputCheckLabel = styled.span`
    font-size: ${({ fontSize }) => fontSize ? fontSize : '14px'};
    font-weight: bold;
`
const InputCheckbox = styled.input``