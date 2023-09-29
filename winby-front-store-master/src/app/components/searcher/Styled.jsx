import styled, { css } from 'styled-components'

export const BoxCard = styled.div`
    max-width: 400px;
    min-width: 200px;
    width: 25%;
    margin: 10px 20px;
    cursor: pointer;
    transition: .2s;
    margin: auto;
    &:hover {
        transform: scale(1.1);
    }
`
export const GridMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 2em;
    width: 100%;
    overflow: auto;
    margin-bottom: 60px;
    overflow: hidden;
    margin-top: 20px;
    padding-top: 30px;
    padding-bottom: 30px;

    @media (min-width: 700px){
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 1100px){
        grid-template-columns: 1fr 1fr 1fr;
        width: 80%;
        margin: auto;
    }
    @media (min-width: 1500px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (min-width: 1920px){
        grid-template-columns: 1fr 1fr 1fr 1fr ;
    }
`

export const Container = styled.div`
    width: 100%;
    height: 80vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Subcontainer = styled.div`
    width: ${({ smWidth }) => smWidth ? smWidth : '100%'};
    margin: auto;
    @media( min-width: 700px ) { width: ${({ lgWidth }) => lgWidth ? lgWidth : '100%'}; }
`

export const SpanText = styled.span`
    display: block;
    font-size: 20px;
    font-weight: 500;
    color: #A4A2A4;
    text-align: center;
    margin-bottom: 20px;
    ${({ pTop }) => pTop && css`
        padding-top: ${pTop};
    ` }
`

export const IconSVG = styled.img`
    width: 100%;
`