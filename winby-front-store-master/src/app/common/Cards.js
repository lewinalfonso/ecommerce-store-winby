import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PLColor, SFColor } from '../../assets/colors'
import { numberFormat } from '../utils'

export const CardVendors = ({ /*name*/ src }) => (
    <Content>
        <HexagonContainer>
            <LogoVendors src={src} />
        </HexagonContainer>
        {/* <Span size='13'>{name}</Span> */}
    </Content>
)

export const CardItems = ({ image, title, price }) => (
    <Card>
        <InfoHidden>
            <Title bold>{price ? `$ ${numberFormat(price)}` : title} </Title>
            <Title price>{title}</Title>
        </InfoHidden>
        <Image alt={title} src={image} />
    </Card>
)

const InfoHidden = styled.div`
  position: absolute;
  bottom: -29px;
  transition: .5s;
  z-index: 99;
  background-color: ${BGColor};
  color: #fff;
  width: ${({ width }) => width ? width: '100%'};
  height: ${({ height }) => height ? height: '40px'};
  padding: 0 10px;
`
const Title = styled.h3`
  width: 100%;
  padding: 0 8px;
  text-align: center;
  color: ${({ color }) => color ? color : SFColor };
  margin: 0;
  font-weight: ${({ bold }) => bold ? 'bold' : '400'};
  font-size: 14px;
  opacity: ${({ price }) => price ? '0' : '1'};
  text-transform: uppercase;
  @media(min-width: 600px) {
    font-size: ${({ price }) => price ? '11px' : '14px'};
  }
  transition: .5s;
`
const Card = styled.div`
  border-radius: 6px 6px 0px 0px;
  height: 238px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ hiddenInfo }) => !!hiddenInfo && css`
      &:hover ${InfoHidden} {
        bottom: 0;
        opacity: 1;
      }
      &:hover ${Title} {
        opacity: 1;
      }
  ` }
  
  @media(min-width: 600px){
      width: 25%;
      max-width: 400px;
      min-width: 200px;
  }
`
const Image = styled.img`
  position: absolute;
  height: 200px;
  width: 100%;
  z-index: 1;
  
  @media(min-width: 600px){
      width: 25%;
      max-width: 400px;
      min-width: 180px;
  }
`

/** Vendors */
const Content = styled.div`
  background-color:transparent;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 30px 5px;
  padding: 5px;
  position: relative;
  box-shadow: 0px 0px 3px 1px #15151536;
  overflow: hidden;
  width: 25%;
  max-width: 400px;
  min-width: 200px;
  height: 200px;
  @media(max-width: 480px) {
    margin: 30px auto;
  }
  &:hover {
    box-shadow: 0px 0px 5px #15151536;
  }
`
// const Span = styled.span`
//   display: block;
//   font-size: ${({ size }) => !!size && size}px;
//   text-align: ${({ textAlign }) => textAlign ? textAlign : 'center'};
//   color: ${({ color }) => !!color && color};
//   font-family: Tahoma;
//   font-weight: bold;

//     @media(max-width: 1400px){
//         font-size: ${ ({ size }) => !!size && (size - 4) }px;
//     }
// `
const HexagonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  width: 180px;
  border-radius: 50%;
`
const LogoVendors = styled.img`
  height: 120px;
  width: 120px;
  position: absolute;
  z-index: 10;
  border-radius: 50%;
  background-color: ${PLColor};
`