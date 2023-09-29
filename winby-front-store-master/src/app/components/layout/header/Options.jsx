import React, { useState, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { BGColor, BGVColor, PLColor, PVColor, SFColor, PColor } from '../../../../assets/colors'
import { Options, SubMenu, Enlace, BtnCategories, SubMenuOne } from './Styled'
import { IconArrowBottom } from '../../../../assets/icons'
import { useCategoriesData } from '../../../hooks/useCategoriesData'
import { url_base } from '../../../redux/types'
import Scrollbars from 'react-custom-scrollbars'
import { Anchor } from '../../CategoryCard/styles'
import { Link } from 'react-router-dom'

const OptionsMenu = ({ state, handleTooltip }) => {
    const [categoriesData] = useCategoriesData()
    const [subCategories, setSubcategories] = useState([])
    const [catSel, setCatSel] = useState('')
    const [isModal, setIsModal] = useState(false)

    const handleOver = (subCat, catName) => {
        setSubcategories(subCat)
        setCatSel(catName)
    }

    const openingModal = (e, animation) => {
        e.preventDefault()
        e.stopPropagation()
        if (animation === 2) {
            setIsModal(!isModal)
        } else if (animation === 1) {
            setTimeout(() => { setIsModal(!isModal); }, 300);
        }
    }

    const openAndstop = (e) => {
        e.stopPropagation()
        setIsModal(!isModal)
    }

    useEffect(() => {
        if (isModal) window.addEventListener('click', () => setIsModal(false))
        return () => window.removeEventListener('click', () => undefined)
    }, [isModal])

    return (
        <Options>
            <ContainerCloseMenu active={isModal ? 'flex' : 'none'} /* onMouseOver={e => openingModal(e, 1)} */ onClick={e => openingModal(e, 2)} />
            <Enlace to='/' effect='true' color={BGVColor} fontSize='12px' weight='bold'>Inicio</Enlace>
            <BtnCategories onClick={e => openingModal(e, 1)} effect='true' color={BGVColor}>
                Categorías&nbsp;<IconArrowBottom size='9px' />
                <ContainerSubMenu /* onMouseOver={(e) => e.stopPropagation()} */ active={isModal ? 'flex' : 'none'}>
                    <SubMenu>
                        <Scrollbars height={530} autoHeight autoHeightMax={530} autoHeightMin={0} autoHide width='100%'>
                            <List color={BGColor}>
                                {categoriesData?.slice(0, 11).map(x => <Li key={x.cs_id ? `catSer-${x.cs_id}` : `catPro-${x.cp_id}`}>
                                    <LinkCategories onClick={(e) => openAndstop(e)} to={{ state: { item: x, mode: true }, pathname: `/${x.cs_id ? 'servicios' : 'productos'}/categorias/${x.cs_id || x.cp_id}` }} text='true' onMouseOver={() => handleOver(x.subcategoryproducts || x.subcategoryservices, x)}  >{x.cs_name || x.cp_name} </LinkCategories>
                                </Li>)}
                                <Li>
                                    <LinkCategories to={{ pathname: `/categorias` }}>Ver todas</LinkCategories>
                                </Li>
                            </List>
                        </Scrollbars>
                    </SubMenu>
                    <SubMenuOne>
                        <Scrollbars height={600} autoHeight autoHeightMax={600} autoHeightMin={0} autoHide width='100%'>
                            <List>
                                <Anchor height='auto' to={{ state: { item: catSel }, pathname: `/${catSel.cs_id ? 'servicios' : 'productos'}/categorias/${catSel.cs_id || catSel.cp_id}` }}>
                                    <ImgCategories src={`${url_base}static/categories/${catSel.cs_id ? 'services' : 'products'}/${catSel.cp_id || catSel.cs_id}/${catSel.cp_horPho || catSel.cs_horPho}`} />
                                    <TitleCategoria text='text' size='23px' borderBottom={` 1px solid ${PVColor} `} color={PColor}> {catSel.cp_name || catSel.cs_name}</TitleCategoria>
                                </Anchor>
                                {subCategories?.map((x, i) =>
                                    <Anchor
                                        onClick={(e) => openAndstop(e)}
                                        key={`sub-cat-menu-${i}`}
                                        to={{ 
                                            search: x?.scp_id ? `scp_id=${x?.scp_id}` : `scs_id=${x?.scs_id}`,
                                            pathname: `/${catSel.cs_id ? 'servicios' : 'productos'}/categorias/${catSel.cs_id || catSel.cp_id}`
                                        }} >
                                        <Title >{x.scp_name || x.scs_name}</Title>
                                    </Anchor>
                                )}
                            </List>
                        </Scrollbars>
                    </SubMenuOne>
                </ContainerSubMenu>
            </BtnCategories>
            <Enlace to='/ofertas' effect='true' color={BGVColor} fontSize='12px' weight='bold'>Ofertas</Enlace>
            { (!!localStorage.getItem('infProfile') && localStorage.getItem('infProfile') !== 'undefined') && (new Date(JSON.parse(localStorage.getItem('infProfile'))?.usermember?.um_datExp) >= new Date()) && <A href='https://app.winby.co/'>Oficina Virtual</A>}
            { (!!localStorage.getItem('infProfile') && localStorage.getItem('infProfile') !== 'undefined') && JSON.parse(localStorage.getItem('infProfile'))?.vendor ? <A target='_blank' href='https://app.winby.co/' color={BGVColor} > Aliados</A> : <Enlace to={{ state: { urlCode: 1 }, pathname: '/usuario/cuenta' }} effect='true' color={BGVColor} fontSize='12px' weight='bold'>Aliados</Enlace>}
            <Enlace to='/populares' effect='true' color={BGVColor} fontSize='12px' weight='bold'>Populares</Enlace>
            <A href='https://escuela.winby.co/' target='_blank' color={BGVColor} fontSize='12px' weight='bold'>Escuela</A>
            <Enlace to='/ayuda/pqr' effect='true' color={BGVColor} fontSize='12px' weight='bold'>Ayudas / PQR</Enlace>
            <ContainerBell onClick={handleTooltip} activeStart={state.visible} />
        </Options>
    )
}
export default OptionsMenu

export const FadeInAnimation = keyframes`
    from { opacity: 0; z-index: -1;}
    to { opacity: 1; z-index: 999; }
`
export const FadeOutAnimation = keyframes`
    from { opacity: 1; z-index: 999;}
    to { opacity: 0; z-index: -1; }
`
export const ContainerSubMenu = styled.div`
    position: absolute;
    display: flex;
    width: 700px;
    top: 35px;
    left: -60px;
    right: 0;
    z-index: 99;
    transition: all 1s ease linear;
    ${({ active }) => active && css`display: ${active};`};
    &:hover ${SubMenuOne}{
        display: block
    }
`
export const ContainerCloseMenu = styled.div`
    position: absolute;
    top: 100px;
    ${({ active }) => active && css`display: ${active};`};
    left: 0;
    margin: auto;
    background-color: #2b2b2b29;
    width: 100%;
    height: 100vh;
`
export const ContainerBell = styled.div`
    position: absolute;
    top: 0;
    visibility: ${({ activeStart }) => activeStart ? 'visible' : 'hidden'};
    left: 0;
    margin: auto;
    background-color: transparent;
    width: 100%;
    height: 100vh;
`
const List = styled.ul`
    list-style-type: none;
    padding: 0px;
    color: ${({ color }) => color ? color : 'black'};
    margin: 0;

`
export const A = styled.a`
    user-select: none;
    padding: 2px;
    display: inline-block;
    font-size: 13px;
    text-decoration: none;
    width: auto;
    font-family: PFont-Regular;
    color: ${BGVColor}cc;
    &:active{
        color: ${BGVColor};
    }
    &:hover{
        color: ${BGVColor};
    }
`
export const ImgCategories = styled.img`
    width: 100%;
    height: 100px;
    object-fit: cover;
    opacity:0.5;
    
`
export const TitleCategoria = styled.div`
    position: absolute;
    top: 70px;
    left: 10px;
    color: red;
    opacity:1;
    width:100%;
    font-weight:bold;
    text-transform: uppercase;
    font-size: 20px;

`

export const Title = styled.div`
    width: 100%;

    ${({ text }) => text && css`
        text-transform: uppercase;   
    `};
    color: ${props => props.color ? props.color : SFColor};
    padding: 15px 40px;
    ${({ borderBottom }) => !!borderBottom && css`border-bottom: ${borderBottom};`};
    ${({ size }) => !!size && css`font-size: ${size};`};

    &:hover {
        background-color: ${SFColor}55;
    }
`
const Li = styled.li`
    position: relative;
    cursor: pointer;
    transition: .4s;
    height: 43px;
        &:hover {
        background-color: ${PLColor};
    }
    @media(max-width: 1400px){
        font-size: 12px;
    };
    ${({ text }) => text && css`
        text-transform: uppercase;
    `}
`
const LinkCategories = styled(Link)`
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    width: 100%;
    height: 100%;
    color: ${BGColor};
    @media(max-width: 1400px){
        font-size: 12px;
    };
    ${({ text }) => text && css`
        text-transform: uppercase;
    `}
    &:hover{
        color: ${BGVColor};
    }
`