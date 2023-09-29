import styled, { css } from 'styled-components'
import { BGColor } from '../../../assets/colors'
import bgImage from '../../../assets/icons/textura.svg'

/** General */
export const Container = styled.div`
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${bgImage});
`
export const Box = styled.div`
    width: 90%;
    height: ${({ height }) => height || '250px'};
    background-color: ${BGColor};
	border-radius: 10px;
	box-shadow: 0 0 15px 1px #00000035;
	padding: 20px;
	margin: 5% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px){
        width: 400px;
    }
    
    @media (max-width: 768px){
        width: 100vh;
        height: auto;
        margin: 0;
        border-radius: 0;
        display: flex;
    	box-shadow: none;
        justify-content: end;
    }
`
export const Title = styled.h2`
    font-family: PFont-Regular;
    ${ ({ fontFamily }) => fontFamily && css`
        font-family: ${ fontFamily };
    ` }
    font-size: ${ ({ fontSize }) => fontSize ? fontSize : '25px' };
    ${ ({ noUppercase }) => !noUppercase && css`
        text-transform: uppercase;
    ` }
    ${({ textAlign }) => textAlign && css`text-align: ${textAlign};`}
	color: #000000;
    margin: ${ ({ margin }) => margin ? margin : '20px 0 5px' };
    @media(max-width: 768px){
        font-size: 1.25rem;

    }
`
/** Register */
export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    ${ ({ padding }) => padding && css`
        padding: ${ padding };
    ` }
`
export const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 75%;
    @media (max-width: 768px){
        width: 100%;
    }
`
export const FormText = styled.p`
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    color: #655e5e;
`