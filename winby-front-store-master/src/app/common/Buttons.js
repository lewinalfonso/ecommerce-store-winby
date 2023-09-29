import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { SFColor, SFVColor, PLColor, PColor, BGColor, BGVColor } from '../../assets/colors'
import { Link } from 'react-router-dom'

export const CustomButton = ({ children, disabled, type, textAlign, onClick, bgColor, gradient, color, padding, width, margin, height, radius, border, media, fontSize, self, hover = true }) => <Button
    type={type} onClick={onClick} disabled={disabled} textAlign={textAlign} bgColor={bgColor} gradient={gradient} height={height} color={color} padding={padding} margin={margin}
    width={width} radius={radius} border={border} media={media} fontSize={fontSize} self={self} hover={hover}
>
    {disabled ? 'Cargando...' : children}
    {disabled &&
        <Outline />}
</Button>

export const To = styled(Link)`
    color: #000;
    text-decoration: none;
    font-size: ${({ fontSize }) => fontSize || '12px'};
    width: ${({ width }) => width || '100%'};
    ${({ height }) => !!height && css`height: ${height};`}
    ${({ display }) => !!display && css`display: ${display};`}
    ${({ position }) => !!position && css`position: ${position};`}
    ${({ fontFamily }) => !!fontFamily && css`font-family: ${fontFamily};`}
    ${({ padding }) => !!padding && css`padding: ${padding};`}
    ${({ margin }) => !!margin && css`margin: ${margin};`}
    ${({ borderleft }) => !!borderleft && css`border-left: ${borderleft};`}
    ${({ weight }) => !!weight && css`font-weight: ${weight};`}
    ${({ color }) => !!color && css`color: ${color};`}
    ${({ display }) => !!display && css`display: ${display};`}
    ${({ radius }) => !!radius && css`border-radius: ${radius};`}
    ${({ border }) => !!border && css`border: ${border};`}
    ${({ direction }) => !!direction && css`flex-direction: ${direction};`}
    ${({ justify }) => !!justify && css`justify-content: ${justify};`}
    ${({ alignitems }) => !!alignitems && css`align-items: ${alignitems};`}
    ${({ textalign }) => !!textalign && css`text-align: ${textalign};`}
    ${({ effect }) => !!effect && css`
        &:hover {
            text-shadow: 0px 0px 2px #fff;
        }
    ` }
        ${({ hover }) => !!hover && css`
        &:hover {
            color: black;
            }
        ` };
    
    ${({ responsive }) => responsive && css`
        border-left: 1px solid ${BGVColor}aa;
        @media(max-width: 768px){
        border-bottom: 1px solid ${BGVColor}aa;
        border-left: none;
        width: 100%;
        padding: 5px 20px; 
        }

    ` }
    ${({ responsiveLeft }) => responsiveLeft && css`

        @media(max-width: 768px){
        border-bottom: 1px solid ${BGVColor}aa;
        border-left: none;
        width: 100%;
        padding: 5px 20px; 
        }
    ` }

        
`

/** Button submit */
const outlineEffect = keyframes`
    from { width: 0; }
    to { width: 90%; }
`
const Outline = styled.div`
    position: absolute;
    bottom: 0px;
    animation: ${outlineEffect} 1s linear infinite;
    padding: 1px;
    background-color: ${PColor};
`
const Button = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ gradient }) => !!gradient && css`background-image: linear-gradient(to left, ${gradient.colorStart}, ${gradient.colorEnd});`}
    ${({ bgColor }) => !!bgColor && css`background-color: ${bgColor};`}
    ${({ self }) => !!self && css`align-self: ${self};`}
    padding: ${({ padding }) => padding && padding};
    margin: ${({ margin }) => margin && margin};
    font-size: ${({ fontSize }) => fontSize || '14px'};
    font-family: PFont-Regular;
    color: ${({ color }) => color || SFColor};
    border-radius: ${({ radius }) => radius || '15px'};
    width: ${({ width }) => width && width};
    border: ${({ border }) => border || 'none'};
    text-align: ${({ textAlign }) => textAlign || 'left'};
    outline: 0;

    cursor: pointer;
    ${({ hover }) => hover && css`
        &:hover {
            opacity: .8;
        }
    `}
    &:disabled {
        background-color: ${PLColor};
        color: ${SFVColor};
    }
    ${({ media }) => media && css`@media only screen and (max-width: ${media}){ display: none;}`
    }
`
export const ButtonSubmit = styled.button`
    ${({ gradient, bgColor }) => gradient ? css`
        background-image: linear-gradient(45deg, ${gradient.firstColor}, ${gradient.secColor});`
        : css` background-color: ${bgColor};`}
    font-size: ${({ fontSize }) => fontSize ? fontSize : '14px'};
    ${({ weight }) => weight && css`font-weight: ${weight};`};
    color: ${({ fontColor }) => fontColor ? fontColor : BGColor};
    width: ${({ width }) => width ? width : '100%'};
    min-width: min-content;
    ${({ maxWidth }) => maxWidth && css`max-width: ${maxWidth};`}
    border: ${({ border }) => border ? border : 'none'};
    padding: ${({ padding }) => padding ? padding : '5px'};
    outline: 0;
    border-radius: ${({ radius }) => radius ? radius : '8px'};
    margin: ${({ margin }) => margin && margin};
    z-index: 1;
    ${({ align }) => align && css`align-self: ${align};`}
    ${({ float }) => float && css`float: ${float};`}
    &:hover {cursor: pointer;}

    
    ${({ responsive }) => responsive && css`
        @media (max-width: 700px){
            width: 100%;
            padding: 8px;
        }
        `
    }
`