import styled from 'styled-components'

export const Container = styled.div`
     width: 110px;
`

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #e4e4e4;
    border-radius: 11px;
    width: 100%;
    height: 40px;
`

export const Button = styled.button`
    height: 100%;
    padding: 7px 12px;
    font-size: 1.3rem;
    color: #068CF3;
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    cursor: pointer;
`

export const TextCount = styled.span`
    align-self: center;
    font-size: 18px;
    font-weight: 400;
`

export const TextAvailable = styled.span`
    display: block;
    width: 100%;
    text-align: center;
    font-size: 11px;
`