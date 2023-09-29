import styled, { css } from 'styled-components'
import { BGColor } from '../../../assets/colors'

export const Section = styled.section`
    width: 100%;
`
export const BgImg = styled.div`
    background-color: ${BGColor};
    background-size:  ${ ({ BGsize })=> BGsize ? BGsize : 'cover' };
    ${({ padding }) => padding && css`padding-top: ${padding};`};
    background-repeat: no-repeat;
    height: ${({ height }) => height || 'auto'};
    ${({ bgImage }) => bgImage && css`background-image: url(${bgImage});`}
    ${({ movil }) => movil && css`
        @media(max-width: 768px) {
            background-size: 100%;
            padding-top: 300px;
        }
    `}
`
export const Content = styled.div`
    ${({ width }) => width && css`width: ${width};`};
    height: ${({ height }) => height ? height : 'auto'};
    margin: ${({ margin }) => margin || '0'};
    padding: ${({ padding }) => padding || '0'};
    text-align: ${({ textAlign }) => textAlign || 'justify'};  
    ${({ bloque }) => !!bloque && css`
        @media(max-width: 480px) {
            display: contents;
            height: auto;
            margin: 0;
            padding: 0 30px;
            text-align: justify;
        }
    `}  
    ${({ experience }) => !!experience && css`
        @media(max-width: 480px) {
            width: 100%;
            height: auto;
            margin: auto;
            padding: 0 30px;
        }
    `}
    ${({ experienceTwo }) => !!experienceTwo && css`
        @media(max-width: 480px) {
            width: 100%;
            height: auto;
            margin: auto;
            padding: 0 30px;
        }
    `}
    ${({ experienceThree }) => !!experienceThree && css`
        @media(max-width: 480px) {
            width: 100%;
            height: 474;
            margin: auto;
            padding: 0 10px;
        }
    `}
    ${({ experienceFour }) => !!experienceFour && css`
        @media(max-width: 480px) {
            width: 100%;
            height: 375px;
            margin: auto;
            padding: 0 30px;
        }
    `}
    ${({ experienceFour }) => !!experienceFour && css`
        @media(min-width: 600px) {
            width: 60%;
            margin: auto;
            padding: 100px 30px;
        }
    `}
    ${({ newClass }) => !!newClass && css`
        @media( min-width: 600px ) {
            width: 100%;
            margin: 0;
        }
    `}
    ${({ experienceFive }) => !!experienceFive && css`
        @media(max-width: 480px) {
            width: 100%;
            height: 846px;
            margin: 0;
            padding: 0 30px;
        }
    `}
    ${({ experienceSix }) => !!experienceSix && css`
        @media(min-width: 600px) {
            padding: 100px 600px;
            width:  100%; 

        }
    `}
    ${({ oportunities }) => !!oportunities && css`
        @media(max-width: 480px) {
            width: 100%;
            height: auto;
            margin: auto;
            padding: 30px 30px;
        }
    `}
    ${({ propText }) => !!propText && css`
        @media(max-width: 480px) {
            width: 100%;
            height: auto;
            margin: auto;
            padding: 30px;
        }
    `}
    ${({ bBottom }) => !!bBottom && css` {
        @media(max-width: 480px) { 
            border-bottom: 1px solid red;
            margin-bottom: 10px;
            padding-bottom: 10px;
            width: 100%;
    }
    `}     
`
export const Grid = styled.div`
    width: 100%;
    display: ${({ display }) => display ? display : 'grid'};
    margin-bottom: 20px;
`