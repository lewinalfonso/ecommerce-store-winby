import styled, { css } from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: auto;
    background-color: #F8F8F8;
    margin: 10px auto;
    padding: 0px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px #00000099;

    @media (max-width: 768px) {
        background-color: transparent;
        margin: 0;
        box-shadow: none;
    }
`
export const ContainerTitle = styled.div`
    width: 90%;
    margin: ${({ margin }) => margin ? margin : '0'};
    display: grid;
    grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns ? gridTemplateColumns : '0'};
    grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows ? gridTemplateRows : '0'};
    @media(max-width: 1320px) {
        display: none;
    }
        ${({ VendorsR }) => VendorsR && css`
        @media(max-width: 1320px) {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            display: grid;
        }
    `}
`
export const Section = styled.div`
    width: 100%;
    text-align: ${({ textAlign }) => textAlign ? textAlign : 'center'};
    justify-content: ${({ justify }) => justify ? justify : 'center'};
    align-items: ${({ align }) => align ? align : 'center'};
    justify-items: ${({ justifyItems }) => justifyItems ? justifyItems : 'center'};
    margin: 10px auto;
    padding: 5px 2px;
    ${props => props.bottom && css`
        grid-column-start: 1;
        grid-column-end: 4;
        border: none;
    `}
    @media(max-width: 1320px) {
    ${({ visible }) => visible && css`
            display: none;
        `}
    }
    ${({ minWidth }) => !!minWidth && css`
        @media(min-width: 1320px) {
        display: none;
    }
    `}
    ${({ cursorP }) => cursorP && css`
        cursor: pointer;
    `}
    @media(max-width: 480px) {
        ${({ borderL }) => borderL && css`
        `}
    }
`
export const Card = styled.div`
    width: 90%;
    background-color: #FFFFFF;
    margin: ${({ margin }) => margin ? margin : '0'};
    align-items: center;
    display: grid;
    grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns ? gridTemplateColumns : '0'};
    grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows ? gridTemplateRows : '0'};
    box-shadow: 1px 1px 5px 0px #00000030;
    border-radius: 10px;
    @media(max-width: 1320px) {
        & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #707070;
    }
    & > div:nth-child(2n + 1) {
        border-right: 1px solid #707070;
    }
    &:hover {
        background-color: #F8F8F8;
    }
    padding: 40px 0;
    }
    @media(max-width: 1320px) {
        grid-template-columns: 125px 1fr;
        grid-row: repeat(5, 1fr);
        padding: 1px 10px;
        margin-top: 10px;
    }
    @media(max-width: 480px) {
        width: 95%;
    }
    ${({ VendorsR }) => VendorsR && css`
        @media(max-width: 1320px) {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
            border: none;
        }
    `}
  /*   @media(max-width: 480px) {
        height: 125px;
        overflow: hidden;
        :hover{
            height: 50%;
        }
    } */
`
export const Span = styled.span`
    display: inline-block;
    margin: ${({ margin }) => margin ? margin : '1px auto'};
    align-items: center;
    ${({ cursorP }) => cursorP && css`
        cursor: pointer;
        :hover{
            color: red;
        }
    `}
    ${({ td }) => td && css`
        text-decoration: underline;
    `}
    @media(min-width: 1320px) {
    ${({ borderL }) => borderL && css`
        display: flex;
        width: 100%;
        height: 100%;
        border-left: 1px solid #707070;
        text-align: ${({ textAlign }) => textAlign ? textAlign : 'center'};
        justify-content: ${({ Justify }) => Justify ? Justify : 'center'};
        align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    `}
    ${({ borderR }) => borderR && css`
        display: flex;
        width: 100%;
        height: 100%;
        border-right: 1px solid #707070;
        text-align: ${({ textAlign }) => textAlign ? textAlign : 'center'};
        justify-content: ${({ Justify }) => Justify ? Justify : 'center'};
        align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    `}
    }
    ${({ edit }) => !!edit && css`
        color: #01C2FF;
        font-family: PFont-Bold;
        font-size: 14px;
        font-weight: bolder;
    `}
    ${({ del }) => !!del && css`
        color: #EE0404FA;
        font-family: PFont-Bold;
        font-size: 14px;
        font-weight: bolder;
    `}
    ${({ regular }) => !!regular && css`
        color: #505050;
        font-family: PFont-Regular;
        font-size: 14px;
    `}
        ${({ regularBold }) => !!regularBold && css`
        @media(max-width: 1320) {
        color: #505050;
        font-family: PFont-Medium;
        font-size: 14px;
        font-weight: bolder;
        }
    `}
    ${({ number }) => !!number && css`
        font-size: 10px;
        font-weight: bolder;
    `}
    ${({ bold }) => !!bold && css`
        color: #1D1D1D;
        font-family: PFont-Bold;
        font-size: 14px;
        font-weight: bolder;
    `}
    ${({ textover }) => textover && css`
        @media(max-width: 480px) {
            font-size: 10px;
        }
    `}
`
export const Img = styled.img`
    width: 50px;
    height: 40px;
    border-radius: 10px;
    background-color: gray;
`
export const Modal = styled.div`
    position: absolute;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px 2px #00000030;
    border-radius: 10px;
    z-index: 99;
    width: 100%;
    top: 0;
    padding: 20px 10px;
    margin: 50px 0;
    height: ${({ height }) => height};
    ${({ visible }) => visible && css`display: ${visible};`}
`
export const Search = styled.input`
    width: 50%;
    height: 5%;
    display: block;
    margin: 10px auto 20px;;
    padding: 0 20px;
    border: none;
    color: #505050;
    outline: none;
    background-color: #DCDCDC;
`
export const Hr = styled.hr`
    display: block;
    width: 90%;
    border: 1px solid red;
`