import styled from 'styled-components'
import { PLColor, SFColor, BGColor, PVColor } from '../../../../assets/colors'

export const TitleCategory = styled.label`
    font-size: 15px;
    color: ${ SFColor };
    font-weight: bold;
    padding-bottom: 10px;
    margin-left: 20px;
`

export const BoxCard = styled.div`
    position: relative;
    border-radius: 6px 6px 0px 0px;
    height: 230px;
    width: 80%;
    margin: 0px 20px;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0px 0px 3px 1px #15151536;
    overflow: hidden;
    &:hover {
        box-shadow: 0px 0px 5px 2px #15151536;
    }
    @media(min-width: 600px){
        width: 25%;
        max-width: 400px;
        min-width: 200px;
    }
`

/** Main - Index */
export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 10px;
    height: 100%;
    overflow: auto;
`

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2.5fr 1.2fr;
    grid-template-rows: 1fr 1fr;
    /* height: 55vh; */
    width: 100%;
    grid-gap: 15px;
    margin-bottom: 20px;
    max-height: 350px;
    
    @media(min-width: 1400px){
        height: 600px;
        max-height: 500px;
    }
    @media(max-width: 950px){
        grid-template-columns: 2.5fr 1.2fr;
        grid-template-rows: 1fr 1fr;
    }
    @media(max-width: 800px){
        grid-template-columns: 1fr;
        grid-template-rows: 1fr ;
    }
    @media(max-width: 600px){
        max-height: 350px;
        height: auto;
        min-height: 250px;
    }
`
export const ButtonSave = styled.button`
    position: absolute;
    bottom: 20px;
    right: 10px;
    padding: 10px 8px;
    font-size: 14px;
    z-index: 99;
    background-color: ${ PVColor };
    color: ${ BGColor };
    border-radius: 8px;
    cursor: pointer;
`
export const ButtonAddCategory = styled.div`
    background-color: ${ BGColor };
    text-align: center;
    width: 120px;
    margin: auto;
    border: none;
    box-shadow: 1px 0px 5px 2px #55555599;
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
`

/** Banner */
export const Banner = styled.div`
    position: relative;
    padding: 10px 0;
    padding-bottom: 30px;
    margin: 20px 0;
`
export const BannerContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`
export const Button = styled.button`
    display: flex;
    align-items: center;
    background-color: ${ PLColor };
    padding: 2px 25px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;
    margin: 15px;
    margin-right: 50px;
    float: right;
    border: none;
    cursor: pointer;
`

export const InfoContainer = styled.div`
    position: absolute;
    width: 100%;
    background-color: rgba(0,0,0,.7);
    bottom: -65px;
    transition: .4s;
    padding: 10px;
`
export const BannerItem = styled.div`
    min-width: 300px;
    position: relative;
    width: 90%;
    height: 340px;
    border-radius: 5px;
    box-shadow: 0px 0px 8px 1px rgba(90,90,90,.4);
    overflow: hidden;
    margin-left: 30px;
    border-radius: 15px;
    background-color: ${ BGColor };
    margin: 8px; 
    cursor: pointer;

    &:hover ${ InfoContainer } {
        bottom: 0px;
    }
    @media(max-width: 1400px){
        min-width: 200px;
        position: relative;
        width: 200px;
        height: 240px;
        margin-top: 15px;
    }
`

export const Buy = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
`
export const Row = styled.div`
    display: flex;
    justify-content: space-between;
`
export const Description = styled.div`
    padding: 10px 0;
    min-height: 50px;
`
export const Parr = styled.div`
    color: ${ BGColor };
    font-size: 12px;
    text-shadow: 1px 1px 5px rgba(0,0,0,1);
    @media(max-width: 1400px){
        font-size: 10px;
    }
`
export const ButtonDel = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 30px;
    height: 30px;
    border: none;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

/** Panel Derecho Grid Right */
export const BoxGrid = styled.div`
    position: relative;
    grid-column: 3 / 4;
    grid-row: ${ ({ pbox }) => pbox ? '1 / 2' : '2 / 3' };
    background-color: ${ PLColor };
    padding: 1px;
    height: 100%;
    max-height: 165px;
   
    @media(max-width: 950px){
        grid-column: 2 / 3;
    }
    @media(max-width: 800px){
        display: none;
    }
    @media(min-width: 1400px){
        max-height: 250px;
    }
    
`

export const Image = styled.img`
    width: 100%;
    height: 100%;
`