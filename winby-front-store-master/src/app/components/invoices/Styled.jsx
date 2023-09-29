import styled, { css } from 'styled-components'
import { BGColor } from '../../../assets/colors'
import bgImage from '../../../assets/icons/textura.svg'

/** General */
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(${bgImage});
    width: 100%;
    max-width: 1200px;
`
export const Box = styled.div`
    width: ${({ width }) => width || '95%'};
    background-color: ${BGColor};
	border-radius: 10px;
	box-shadow: 0 0 15px 1px #00000035;
	padding: 20px;
	margin: 1% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 600px){
        width: 98%;
        padding: 20px;
    }
    @media (min-width: 600px){
        ${({ responsive }) => responsive && css`width: 48%;`}
    }
`
export const TitleShopp = styled.h2`
    width: 100%;
    text-align: center;
    padding: 1em 0 1.5em;
    letter-spacing: 3px;
    border-bottom: 1px solid #ccc;
`
export const InfoWrap = styled.div`
    display: table;
    width: 90%;
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
    display: flex;
    justify-content: center;
    &:last-child {
        border-bottom: none;
    }
`
export const CartSection = styled.div`
    ${({ width }) => !!width && css`width: ${width};`}
    ${({ display }) => !!display && css`display: ${display};`}
    ${({ alignItems }) => !!alignItems && css`align-items: ${alignItems};`}
    ${({ bgColor }) => !!bgColor && css`background-color: ${bgColor};`}
    ${({ padding }) => !!padding && css`padding: ${padding};`}
    ${({ direction }) => !!direction && css`flex-direction: ${direction};`}
`
export const ImgCart = styled.img`
    height: 40px;
    width: 40px;
    @media(min-width: 600px) {
        height: 170px;
        width: 120px;
    }
`
export const Text = styled.p`
    ${({ bold }) => bold && css`font-weight: bold;`}
    ${({ width }) => width && css`width: ${width};`}
    font-size: ${({ fontSize }) => fontSize || '14px'};
    margin: ${({ margin }) => margin || '20px'};
    color: ${({ color }) => color || 'black'};
    white-space: ${({ whiteSpace }) => whiteSpace ? whiteSpace : 'nowrap'};
    text-overflow: ellipsis;
    overflow: hidden;
`

export const DescriptionContainer = styled.div`
    max-height: 74px;
    overflow: hidden;
    padding-left: 10px;
    font-size: 11px;
`

export const FlexBox = styled.div`
    ${({ width }) => !!width && css`width: ${width};`}
    align-items: center;
    display: flex;
    ${({ bgColor }) => !!bgColor && css`background-color: ${bgColor};`}
    ${({ justify }) => !!justify && css`justify-content: ${justify};`}
    ${({ radius }) => !!radius && css`border-radius: ${radius};`}
    ${ ({ responsive }) => responsive && css`flex-direction: column;` }
    @media (min-width: 600px){
        ${ ({ responsive }) => responsive && css`flex-direction: row;` }
        justify-content: space-between;
    }
`
export const Title = styled.h4`
    width: 100%;
    text-align: left;
    margin-top: ${({ marginTop }) => marginTop || 0};
    margin-bottom: 0px;
`