import React from 'react'
import styled from 'styled-components'
import { ShadowCard } from '../../common/ShadowCard'

export const PromoProducts = () => {

    return (
        <Container>
            <ShadowCard>
                <Card>
                </Card>
                <ContainerGrid>
                    <Card>
                    </Card>
                    <Card>
                    </Card>
                    <Card>
                    </Card>
                    <Card>
                    </Card>
                </ContainerGrid>
            </ShadowCard>
        </Container>
    )
}

const Container = styled.div`
    @media(max-width: 600px) {
        width: 100%;
        padding: 5px;
    }
`
const Card = styled.div`
    text-align: center;
    background-color: #FFFFFF;
    background-color: gray;
    width: 100%;
    height: 130px;
    margin: 6px 0;
    @media(min-width: 600px) {
        height: 220px;
        width: 100%;
    }
`
const ContainerGrid = styled.div`
    display: grid;
    grid-gap: 15px 16px;
    grid-template: 1fr/ 1fr 1fr 1fr 1fr;
    @media(max-width: 600px) {
        flex-wrap: wrap;
        grid-template: 1fr/ 1fr 1fr;
    }
`