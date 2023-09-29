import React from 'react'
import styled, { css } from 'styled-components'
import { PLColor, SFColor, PColor } from '../../../../assets/colors'

export default ({ stateSim }) =>(
    <Container>
        <Header>
            <Title size='18' color={SFColor} bold>Populares WINBY</Title>
        </Header>
        <Row container>
            {stateSim.map(x => (
                <Row key={x.id} marginR='10%'>
                    <Image src={x.img} />
                    <InfoContainer>
                        <Title size='14' color={SFColor} bold>{x.nombre}</Title>
                        <Title size='14' color={SFColor}>Disponible: {x.disponible}</Title>
                        <Title size='14' color={SFColor}>Color: {x.color}</Title>
                        <Title size='14' color={PColor}>Precio: ${x.precio}</Title>
                    </InfoContainer>
                </Row>
            ))}
        </Row>
    </Container>
)

/** list footer */
const Container = styled.div`
    padding: 20px;
    box-shadow: 0px 0px 8px 1px rgba(90,90,90,.4);
    margin: 15px 20px;
    border-radius: 15px;
    overflow: hidden;
`
const Row = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
    margin-right: ${ ({ marginR }) => marginR || '0' };

    @media(max-width: 1400px){
        margin-top: 10px;
        min-width: 200px;
        margin-right: ${ ({ marginR }) => marginR ? '30px' : '0' };
    }
    @media(max-width: 550px){
        width: 100%;
    }
    
    @media(max-width: 650px){
        ${ ({ container }) => container && css`
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            width: auto;
        ` }
    }
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    padding: 10px;
    border-bottom: 1px solid ${ PLColor };
    width: 100%;
    
    @media(max-width: 800px){
        text-align: center;
    }
`
const Title = styled.span`
    display: block;
    font-size: ${ ({ size }) => !!size && size };
    text-align: ${ ({ textAlign }) => !!textAlign && textAlign };
    color: ${ ({ color }) => !!color && color };
    font-family: Tahoma;
    font-weight: ${ ({ bold }) => bold ? 'bold' : 'normal' };

    @media(max-width: 1400px){
        font-size: ${ ({ size }) => !!size && (size - 2) }px;
    }
    @media(max-width: 550px){
        font-size: ${ ({ size }) => !!size && (parseInt(size) + 2) }px;
    }
`
const Image = styled.img`
    width: 100px;
    height: 100px;
    margin-right: 15px;

    @media(max-width: 1400px){
        width: 80px;
        height: 80px;
    }
    @media(max-width: 550px){
        min-width: 100px;
        max-width: 130px;
        width: 40%;
        height: auto;
    }
`