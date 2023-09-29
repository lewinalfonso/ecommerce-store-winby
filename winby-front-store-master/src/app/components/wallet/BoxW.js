import React from 'react'
import styled from 'styled-components'
import { SFColor, BGColor } from '../../../assets/colors'

export default ({ color, children, icon, title, amount, dolar = true }) => <BoxW>
    {children ? 0 :
        <>
            <BoxC>
                {icon}
                <H4 color={color}>{title}</H4>
            </BoxC>
            <H1>{dolar && '$'} {amount}</H1>
        </>
    }
</BoxW>

const BoxW = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 33%;
    min-width: 200px;
    max-width: 250px;
    height: 150px;
    margin: 20px;
    border-radius: 10px;
    background-color: ${ BGColor };
    box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.6);
    transition: .2s;
    @media (max-width: 600px){
        width: 100%;
    }
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.2);
    }
`
const BoxC = styled.div`
    display: flex;
    align-items: flex-end;
`
const H1 = styled.span`
    font-size: 30px;
    color: ${ SFColor };
    padding-top: 10px;
`
const H4 = styled.span`
    font-size: 20px;
    padding-left: 5px;
    font-weight: bold;
    color: ${ ({ color }) => color ? color : SFColor };
`