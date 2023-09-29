
import React from 'react'
import styled, { css } from 'styled-components'
import { PColor, SFColor } from '../../assets/colors'

export const Th = ({ width, colSpan, align, children, borderTop, borderBottom, borderLeft, borderRight, flexDir }) => <ThV colSpan={colSpan} width={width} borderTop={borderTop} borderBottom={borderBottom} borderLeft={borderLeft} borderRight={borderRight}>
    <BoxTh align={align} flexDir={flexDir}>
        {children}
    </BoxTh>
</ThV>

export const Td = ({ width, colSpan, color, align, alignContent, children, borderTop, borderBottom, borderLeft, borderRight, input = false, flexDir }) => <TdV colSpan={colSpan} width={width} borderTop={borderTop} borderBottom={borderBottom} borderLeft={borderLeft} borderRight={borderRight} flexDir={flexDir}>
    <BoxTd td={true} color={color} align={align} alignContent={alignContent} input={input}>
        {children}
    </BoxTd>
</TdV>

export const Tr = styled.tr`
    ${ ({ bgColor }) => bgColor && css`background-color: ${ bgColor };` };
`

const ThV = styled.th`
    width: ${ ({ width }) => width && width };
    min-width: 50px;
    ${ ({ borderTop }) => borderTop && css`border-top: ${ borderTop };` };
    ${ ({ borderBottom }) => borderBottom && css`border-bottom: ${ borderBottom };` };
    ${ ({ borderLeft }) => borderLeft && css`border-left: ${ borderLeft };` };
    ${ ({ borderRight }) => borderRight && css`border-right: ${ borderRight };` };
    /* padding: 0% 50px 0% 0%!important; */
    border: 1px solid #ccc!important;
`

const TdV = styled.td`
    width: ${ ({ width }) => width && width };
    min-width: 50px;
    ${ ({ borderTop }) => borderTop && css`border-top: ${ borderTop };` };
    ${ ({ borderBottom }) => borderBottom && css`border-bottom: ${ borderBottom };` };
    ${ ({ borderLeft }) => borderLeft && css`border-left: ${ borderLeft };` };
    ${ ({ borderRight }) => borderRight && css`border-right: ${ borderRight };` };
    /* padding: 0% 20px 0% 0%!important; */
    border: 1px solid #ccc!important;
`

const BoxTh = styled.div`
    width: 100%;
    min-width: 50px;
    color: ${ PColor };
    font-family: Roboto-Bold;
    text-align: ${ ({ align }) => align ? align : 'left' };
    ${ ({ flexDir }) => flexDir ? css`flex-direction: row; display: flex;` : css`flex-direction: column;` }
    font-size: 11px;
    padding: 5px 10px;
    /* resize: horizontal; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    :hover {
        cursor: pointer;
    }
`

const BoxTd = styled.div`
    width: 100%;
    ${ ({ alignContent }) => alignContent && css`display: flex;` }
    ${ ({ alignContent }) => alignContent && css`justify-content: center;` }
    ${ ({ alignContent }) => alignContent && css`align-items: center;` }
    ${ ({ flexDir }) => flexDir ? css`flex-direction: row; display: flex;` : css`flex-direction: column;` }
    min-width: 50px;
    font-family: Roboto-Regular;
    text-align: ${ ({ align }) => align ? align : 'left' };
    font-size: 11px;
    color: ${ ({ color }) => color ? color : SFColor };
    padding: ${ ({ input }) => input ? 0 : '5px 10px' };
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
export const BoxInside = styled.div`
    min-width: 50px;
    padding: 0px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${ SFColor };
`