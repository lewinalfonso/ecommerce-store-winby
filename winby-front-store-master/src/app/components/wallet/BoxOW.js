import React from 'react'
import styled from 'styled-components'
import { BGColor } from '../../../assets/colors'
import { IconArrowRight } from '../../../assets/icons'

export default ({ title, right, left = true }) => <BoxW right={right}>
    {left && <IconArrowRight size={20} color={BGColor} /> }
    <Span>{title}</Span>
</BoxW>

const BoxW = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    border-right: ${ ({ right }) => right ? right : `1px solid ${ BGColor }` };
    height: 50px;
    width: 20%;
    padding: 0 10px 0 5px;
    justify-content: center;
    align-items: center;
    display: flex;
`
const Span = styled.span`
    display: flex;
    align-items: flex-end;
    font-size: 18px;
    font-weight: 600;
    padding-left: 20px;
    color: ${ BGColor };
    text-align: center;
`