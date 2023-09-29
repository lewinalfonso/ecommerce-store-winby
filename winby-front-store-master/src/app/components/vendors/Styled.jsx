import styled, { css } from 'styled-components'
import { BGColor, PColor, PLColor, SFColor, PVColor } from '../../../assets/colors'
import bgImage from '../../../assets/icons/textura.svg'
/** General */
export const BoxCard = styled.div`
    max-width: 400px;
    min-width: 200px;
    width: 25%;
    margin: 10px 20px;
    cursor: pointer;
    transition: .2s;
    margin: auto;
    z-index: 11;
    &:hover {
        transform: scale(1.1);
    }
`
export const GridMenu = styled.div`
    display: block;
    width: 100%;
    overflow: hidden;

    @media (min-width: 700px){
        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-rows: 1fr;
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 1100px){
        grid-template-columns: 1fr 1fr 1fr;
        width: 80%;
        margin: 20px auto 20px auto;
    }
    @media (min-width: 1500px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (min-width: 1920px){
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
`
export const Container = styled.div`
    width: ${({ width }) => width || '30%'};
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${bgImage});
    ${({ height }) => height && css`height: ${height};`}
`
export const Box = styled.div`
    width: ${({ width }) => width || '400px'};
    height: ${({ height }) => height || '250px'};
    background-color: ${BGColor};
	border-radius: 10px;
	box-shadow: 0 0 15px 1px #00000035;
	padding: 20px;
	margin: 10% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const BoxMessage = styled.div`
    /* height: 100%; */
    width: auto;
    background-color: ${BGColor};
	border-radius: 10px;
	box-shadow: 0 0 15px 1px #00000035;
	padding: 20px;
	/* margin: 43.8% 0; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${this} h1 {font-size: 24px; text-align: center;}
    ${this} span {
        font-size: 14px;
        margin: 15px 5px;
        text-decoration: none;
        text-align: center;
    }
    @media(min-width: 600px) {
        /* height: 250px; */
        width: 500px;
        ${this} h1 {font-size: 30px;}
        ${this} span {font-size: 16px; margin: 25px 10px;}
    }
`
export const Title = styled.h2`
    font-size: ${({ size }) => size ? size : '25px'};
    text-transform: uppercase;
    ${({ textAlign }) => textAlign && css`text-align: ${textAlign};`}
	color:${({ color }) => color};
    margin: ${({ margin }) => margin ? margin : '20px 0 5px'};
    font-weight: ${({ weight }) => weight};
    display: block;
    font-weight: 200;
    bottom: 15px;
    right: 0;
`
export const TitleConfirm = styled.h1`
    font-size: ${({ size }) => size ? size : '30px'};
    margin: ${({ margin }) => margin ? margin : '20px 0 5px'};
    font-weight: ${({ bold }) => bold};
    color: ${PColor};
    display: block;
    bottom: 15px;
    right: 0;
`
export const Span = styled.span`
    display: block;
    margin-bottom: 10px;
    font-size: ${({ fontSize }) => fontSize || '14px'};
    color: ${({ color }) => color || '#000000'};
    ${({ textAlign }) => textAlign && css`text-align: ${textAlign};`}
    ${({ margin }) => margin && css`margin: ${margin};`}
    ${({ cursor }) => cursor && css`cursor: ${cursor};`}
`
/** Register */
export const Form = styled.form`
    width: 90%;
`
export const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
`
export const BoxLogo = styled.div`
    background-color: ${PColor};
    ${({ bgImage }) => bgImage && css`background-image: url(${bgImage});`}
    border-radius: 100%;
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin: auto;
    position: relative;
    background-size: 100% 100%;
`
export const BoxIcon = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: ${BGColor};
    border-radius: 100%;
`
export const BoxRequire = styled.div`
    display: ${({ show }) => show === 'true' ? 'block' : 'none'};
    margin: 10px;
    &:first-child {
        border-right:1px solid  ${PLColor};
    }
`
export const BoxContainer = styled.div`
    border-radius: 7px;
    border: 1px solid ${PLColor};
    display: grid;
    grid-template-columns: repeat(${({ gridColumn }) => gridColumn ? gridColumn : '2'}, 1fr);
`
export const List = styled.li`
    font-weight: 300;
    font-size:13px;
    margin:0px 2px 0px 10px;
    color:${SFColor};
    list-style: circle;
`
export const ContentInput = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
`
export const CustomButton = styled.button`
    width: 120px;
    height: 25px;
    align-items: center;
    font-family: Tahoma;
    border: none;
    color: ${BGColor} ;
    border-radius: 15px;
    background-image: linear-gradient(to right, ${PVColor}, ${PColor}) ;
    font-size: 14px;
    margin: 50px;
    cursor: pointer;
    &:hover { opacity: .8; }
`