import React from 'react'
import styled from 'styled-components'

export const SubBanner = ({ image }) => <Container>
    <Image src={image} />
</Container>

/** Banner Header */
const Container = styled.div`
    width:100%;
    background-color:transparent;
    height:auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 2300px;
`
const Image = styled.img`
  height: auto;
  width: 100%;
`