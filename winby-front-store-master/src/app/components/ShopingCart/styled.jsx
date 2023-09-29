import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const ItemWrapper = styled.div`
    padding: 5px;
    border-bottom: 1px solid #E4E4E4;
    @media (min-width: 768px) {
        padding: 16px 35px;
    }
`

export const Flex = styled.div`
    display: flex;
    flex-wrap: ${ ({ flexWrap }) => flexWrap ? flexWrap : 'wrap' };
    ${({ justify }) => justify && css`justify-content: ${justify};`}
`

export const ItemImg = styled.div`
    width: 130px;
    height: 130px;
    min-height: 130px;
    min-width: 130px;
    margin-right: 10px;
    @media (min-width: 768px) {
        margin-right: 21px;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const ItemInfo = styled.div`
    position: relative;
    flex: 1;
    max-width: 100%;
    @media (min-width: 768px) {
        flex: .5;
    }
`

export const ItemCount = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0 0 0;
    @media (min-width: 768px) {
        flex: .5;
        width: initial;
        padding: 20px;
    }
`

export const ItemViews = styled.span`
    color: #2A2A2A;
    font-size: 10px;
    margin-left: 5px;
`

export const ItemTitle = styled.h4`
    font-size: 14px;
    color: #2A2A2A;
    margin: 9px 0;
    overflow: hidden;
    max-width: 170px;
    max-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media(max-width: 280px) { max-width: 120px; }
    @media(min-width: 375px) { max-width: 210px; }
    @media(min-width: 425px) { max-width: 250px; }
    @media(min-width: 768px) {
        max-width: 320px;
        font-size: initial;
    }
    @media(min-width: 1024px) { max-width: 380px; }
    @media(min-width: 1440px) { max-width: 475px; }
`

export const ItemInfoActions = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
`

export const ItemAction = styled.button`
    font-size: 11px;
    color: #068CF3;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
`

export const ItemAttrs = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 9px;
`

export const Attr = styled.div`
    margin-left: 10px;

    &:first-child {
        margin-left: 0;
    }
`

export const AttrText = styled.span`
    font-size: 13px;
    color: #2A2A2A;
    ${ ({ bold }) => bold && css`font-weight: bold;` }
`

export const Span = styled.span`
    color: ${ ({ color }) => color ? color : '#ccc' };
    font-size: ${ ({ fontSize }) => fontSize ? fontSize : '14px' };
    align-self: center;
`

export const ItemTotal = styled.span`
    font-size: 32px;
    margin-right: 20px;
`

export const EmptyCartWrapper = styled.div`
    align-items: center;
    padding: 15px;
    justify-content: center;
    width: 100%;
    display: flex;
    @media(max-width: 1024px){
        height: 100%
    }
`

export const EmptyImg = styled.img`
    height: 130px;
    width: 130px;
    margin: 20px;
`

export const EmptyLink = styled(Link)`
    text-decoration: none;
    line-height: 30px;
    color:#3483fa;
    @media(max-width: 769px){
        display: block;
        margin: 0 auto;
    }
`

export const Strong = styled.strong`
    display: block;
    font-size: 20px;
    color: #000;
    font-weight: 600;
`

export const TotalWrapper = styled.div`
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;

    @media (min-width: 576px) {
        margin-left: 10px;
        width: 240px;
        margin-bottom: 0;
    }
    @media (min-width: 768px) {
        width: 220px;
    }
    @media (min-width: 992px) {
        width: 260px;
    }
`