import styled, { css } from 'styled-components'
import { PColor, PVColor, BGColor, BGVColor } from '../../../assets/colors'
import Check from '../../../assets/Check.svg'
import CheckHexagon from '../../../assets/LisHexagono.svg'
import bgImage from '../../../assets/icons/textureLicense.svg'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Box = styled.div`
    width: 900px;
    height: ${ ({ height }) => height || '250px' };
    background-color: ${ BGColor };
	border-radius: 10px;
	box-shadow: 0 0 15px 1px #00000035;
	padding: 20px;
	margin: 5% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 900px){
        width: 98%;
        padding: 20px;
    }
`
export const Span = styled.span`
    font-size: ${({ size }) => size || '12px'};
    color: ${ ({ color }) => color || `${ BGVColor }` };
    text-align: ${({ align }) => align || 'justify'};
    font-weight: ${({ weight }) => weight || 'bold'};
    margin: 20px;
    ${ ({ display }) => display && css`display: ${ display };` }
    ${ ({ width }) => width && css`width: ${ width };` }
`
export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`
export const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
`
export const NavHeader = styled.div`
    width: ${({ width }) => width || '100%'};
    height: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;   
    background-image: linear-gradient(to left, ${ PColor }, ${ PVColor }) ;
`
export const Punt = styled.div`
    clip-path: polygon(0 0, 0 100%, 100% 0);
    background-color: ${PColor};
    height: 50px;
    width: 100px;
    margin-left: -1px;
    @media  (max-width: 1000px){
        display:none;
    }
`
export const H2 = styled.h2`
    color: ${({ color }) => color || BGColor};
    text-align: ${({ align }) => align || 'center'};
    @media (max-width: 768px) {
        font-size: 17px;
    }
`
export const Bodytitle = styled.div`
    width: 100%;
    display:flex;
`
export const Bbtn = styled.div`
    background-image: linear-gradient(to left, ${ PColor }, ${ PVColor }) ;
    height: 50px;
    width: 70%;
    @media  (max-width: 1000px){
        width: 100%;
    }
`
export const ContentBox = styled.div`
    width:100%;
    height:auto;
    border-right: ${ ({ borderRight }) => borderRight };
    border-left: ${ ({ borderLeft }) => borderLeft };
    height: ${ ({ height }) => height };
    ${ ({ res }) => !!res && css`
        @media (max-width: 700px){
            grid-template-columns: 1fr;
            grid-gap:5px;
            border-right:none;
        }
    ` };
    @media (max-width: 700px){
        border-left:none;
    }
`
export const TextContent = styled.div`
    border-bottom: ${ ({ borderBottom }) => borderBottom };
    border-top: ${ ({ borderTop }) => borderTop };
`
export const Paragraph = styled.p`
    margin: ${ ({ marginp }) => marginp ? marginp : '0px' }; 
    font-size:20px;
    ${ ({ maxWidth }) => maxWidth && css`max-width: ${ maxWidth };` }
    text-align:${ ({ align }) => align ? align : 'justify' };
    @media (max-width: 768px) {
        margin: 20px ;
        font-size: ${ ({ size }) => size ? '12px' : '15px' };
    }
`
export const TitleParagraph = styled.h3`
    color: ${ ({ color }) => color ? color : `${ BGColor }` };
    font-weight: ${ ({ weight }) => weight };
    font-size: ${ ({ size }) => size };
    margin-left: ${ ({ margin }) => margin };
    @media (max-width: 768px) {
        text-align: ${ ({ textalign }) => textalign ? 'initial' : 'center' };
    }
`
export const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-columns:${ ({ grid }) => grid };
    grid-template-rows: 1fr;
    border-bottom: ${ ({ borderBottom }) => borderBottom };
    position:${ ({ position }) => position };
   ${ ({ res }) => !!res && css`
        @media (max-width: 700px){
            grid-template-columns: 1fr;
            border-top:none;
            display: flow-root;
        }
    ` };   
   ${ ({ ress }) => !!ress && css`
        @media (max-width: 700px){
          grid-template-columns: 1fr 1fr;
          border-top:none;
        }
    ` };
`
export const BodyBtn = styled.div`
    justify-self: center;
    margin: 20px;
    grid-column-start: 1;
    grid-column-end: 3;
`
export const ContainerMain = styled.div`
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns:${ ({ grid }) => grid };
    grid-template-rows: 1fr;
    border-bottom: ${ ({ borderBottom }) => borderBottom };
    position:${ ({ position }) => position ? position : 'relative'};
   ${ ({ res }) => !!res && css`
        @media (max-width: 700px){
            grid-template-columns: 1fr;
            border-top:none;
            display: flow-root;
        }
    ` };   
   ${ ({ ress }) => !!ress && css`
        @media (max-width: 700px){
          grid-template-columns: 1fr 1fr;
          border-top:none;
        }
    ` };
`
export const Forms = styled.div`
    width: 100%;
    height: 50pc;
    background-image: url(${ bgImage });
    background-size: cover;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position-x: right;
`
export const Row = styled.div`
`
export const Logo = styled.img`
    bottom: 70px;
    display: block;
    margin: 80px auto 5px;
    position: relative;
`
export const Ctitle = styled.section`
    background-image: linear-gradient(to left, ${ PColor }, ${ PVColor }) ;
    width:100%;
 `
export const Card = styled.div`
    margin: 10px;
    width: 95%;
    height:auto;
    background-image: linear-gradient(to left ,#e6e6d65e,#c5c5c4d4 );
    border-radius:10px;
    padding: 10px;
 `
export const Btn = styled.button`
    background-image: linear-gradient(to left, ${ PColor }, ${ PVColor }) ;
    border: none;
    margin: ${ ({ margin }) => margin ? margin: '0 auto'};
    outline: none;
    height: 50px;
    width:250px;
    border-radius: 5px;
    color: ${ BGColor };
    justify-items: center;
    display: block;
    font-size:20px;
    position: ${ ({ positionF }) => positionF };
    cursor: pointer;
    @media (max-width: 768px) {
        margin-top:20px;
    }
`
export const Icon = styled.div`
`
export const ListContain = styled.div`
margin:20px;
${ ({ ress }) => !!ress && css`
        @media (max-width: 768px){
       display: grid;
       grid-template-columns: 1fr 1fr; 
        }
    ` };
`
export const Lists = styled.li`
    font-size:${ ({ fontsize }) => fontsize ? fontsize : '20px' };  
    padding:5px;
    letter-spacing:0.1px;  
    text-align: justify;
    list-style: none;
    @media (max-width: 768px){
        font-size: 14px; 
    }
    &::before {
        margin-right:10px;
        @media (max-width: 768px){
            margin-right:2px; 
        }
    }
    ${({ check }) => !!check && css`
        &::before{
            content: url(${ CheckHexagon });   
        }
    }
`};
    ${({ checkOne }) => !!checkOne && css` 
        &::before{
            content: url(${ Check });
        }
    }
` };
`
export const Img = styled.img`
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
`
export const ImgBg = styled.img`
    width: 100%;
    z-index: -1;
    position: absolute;
    top: -50%;
     @media  (max-width:700px){
        display: none
    }
`
export const ImgBgServices = styled.img`
    width: 100%;
    z-index: -1;
     background-size: cover;
    background-repeat: no-repeat; 
    position: absolute;
    top: -10%;
`
export const ImgBgDown = styled.img`
    width: 100%;
    z-index: 10;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 100%;
    @media  (max-width:700px){
        display: none
    }
`