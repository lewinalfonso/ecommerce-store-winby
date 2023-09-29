import React from 'react'
import styled from 'styled-components'
import { SFVColor, SFColor, PColor } from '../../assets/colors'
import { IconArrowTop, IconArrowBottom, IconArrowRight, IconArrowLeft, IconCheck, IconCancel, IconMap, IconSearch, IconLogoType, IconLike, IconMenu, IconShoppingCart, IconProtected, IconUser, IconWarning, IconPolygonSearch, IconBell, IconPlus, IconStore, IconSee, IconExt,
    IconWallet, IconBank, IconInstagram, IconFacebook, IconTwitter, IconYoutube, IconLocation } from '../../assets/icons'

const Icons = [
    { icon: IconArrowBottom, name: 'IconArrowBottom' },
    { icon: IconArrowLeft, name: 'IconArrowLeft' },
    { icon: IconArrowRight, name: 'IconArrowRight' },
    { icon: IconArrowTop, name: 'IconArrowTop' },
    { icon: IconBank, name: 'IconBank' },
    { icon: IconBell, name: 'IconBell' },
    { icon: IconCheck, name: 'IconCheck' },
    { icon: IconCancel, name: 'IconCancel' },
    { icon: IconExt, name: 'IconExt' },
    { icon: IconFacebook, name: 'IconFacebook' },
    { icon: IconInstagram, name: 'IconInstagram' },
    { icon: IconLike, name: 'IconLike' },
    { icon: IconLocation, name: 'IconLocation' },
    { icon: IconLogoType, name: 'IconLogoType' },
    { icon: IconMap, name: 'IconMap' },
    { icon: IconMenu, name: 'IconMenu' },
    { icon: IconPlus, name: 'IconPlus' },
    { icon: IconPolygonSearch, name: 'IconPolygonSearch' },
    { icon: IconProtected, name: 'IconProtected' },
    { icon: IconSearch, name: 'IconSearch' },
    { icon: IconSee, name: 'IconSee' },
    { icon: IconShoppingCart, name: 'IconShoppingCart' },
    { icon: IconStore, name: 'IconStore' },
    { icon: IconTwitter, name: 'IconTwitter' },
    { icon: IconUser, name: 'IconUser' },
    { icon: IconWallet, name: 'IconWallet' },
    { icon: IconWarning, name: 'IconWarning' },
    { icon: IconYoutube, name: 'IconYoutube' }
]

export default () => (
    <Main>
        <H4>Iconos en orden alfabético</H4>
        <Container>
            {Icons.map((X, i) => (
                <BoxIcon key={i}>
                    <X.icon size={X.size || '30px'} />
                    <Span>{X.name}</Span>
                </BoxIcon>
            ))}
        </Container>
    </Main>
)
const Main = styled.div`
    padding: 20px;
`
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
`
const H4 = styled.h4`
    color: ${SFColor};
`
const BoxIcon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: .5s;
    padding: 10px;
    &:hover {
        fill: ${PColor};
        cursor: pointer;
        transform: scale(1.2);
    }
`
const Span = styled.span`
    padding: 10px;
    color: ${SFVColor};
    font-size: 12px;
    font-weight: 600;
`