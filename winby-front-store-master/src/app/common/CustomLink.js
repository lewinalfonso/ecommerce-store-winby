import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export default ({ children, path, bgColor, color, padding, width, radius, border, media, fontSize }) =>
  <CustomButton bgColor={bgColor} padding={padding} width={width} radius={radius} border={border} media={media}>
    <Link to={path} style={{ fontSize, color, textDecoration: 'none' }}>{children}</Link>
  </CustomButton>

const CustomButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ bgColor }) => bgColor && bgColor};
    padding: ${({ padding }) => padding && padding};
    margin: ${({ margin }) => margin && margin};
    font-family: Tahoma;
    font-weight: bold;
    border-radius: ${({ radius }) => radius || '15px'};
    width: ${({ width }) => width && width};
    border: ${({ border }) => border || 'none'};
    outline: 0;
    cursor: pointer;

    &:hover {
        opacity: .8;
    }

    ${({ media }) => media && css`
            @media only screen and (max-width: ${media}){
            display: none;`
    }
`
