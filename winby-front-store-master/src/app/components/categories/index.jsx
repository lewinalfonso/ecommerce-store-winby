import React, { useEffect, useState } from 'react'
import { To } from '../../common/Buttons'
import Loading from '../../common/Loading'
import { useCategoriesData } from '../../hooks/useCategoriesData'
import { Card, SpanText, Column, ListContain, Img } from './Styled'
import { url_base } from '../../redux/types'
import styled from 'styled-components'
import { BGVColor } from '../../../assets/colors'
import { IconArrowRight } from '../../../assets/icons'

export default ({ noTitle }) => {
    const [categoriesData, setCategoriesData, { loading }] = useCategoriesData()
    const [categories, setCategories] = useState()

    // Hace la peticion
    useEffect(() => {
        setCategoriesData({ cs_state: 1, cp_state: 1 })
    }, [setCategoriesData])

    // Actualiza el estado
    useEffect(() => {
        if (categoriesData.length) setCategories(categoriesData)
    }, [categoriesData])

    // muestra las subcategorias cuando es mobile
    const handleCategory = ({ cp_id, cs_id }) => {
        setCategories(state => state.map((x, i) => {
            if ((cp_id ? x.cp_id : x.cs_id) === (cp_id ? cp_id : cs_id)) {
                return { ...x, check: x.check ? false : true }
            } else return x
        }))
    }
    return (
        <>
            {loading && <Loading />}
            <Column>
                {noTitle && <SpanText fontSize='20px' weight='600' padding='20px 0 10px'>CATEGORÍAS</SpanText>}
            </Column>
            <Grid>
                {categories?.map(x => (
                    <Card key={x.cs_id ? `catSer-item-${x.cs_id}` : `catPro-item-${x.cp_id}`} borderR={window.screen.width <= 668 ? '7px' : '0'} >
                        <Flex>
                            <To to={{ state: { item: x, mode: true }, pathname: `/${x.cs_id ? 'servicios' : 'productos'}/categorias/${x.cs_id || x.cp_id}` }}>
                                <SpanText upperCase color='#068CF3' weight='bold' padding='0 0 0 5px'>
                                    <Img src={`${url_base}static/categories/${x.cp_id ? 'products' : 'services'}/${x.cp_id || x.cs_id}/${x.cp_icon || x.cs_icon}`} />
                                    {x.cs_name || x.cp_name}
                                </SpanText>
                            </To>
                           <BtnToggleCat onClick={() => handleCategory(x.cp_id ? { cp_id: x.cp_id } : { cs_id: x.cs_id })}><IconArrowRight size='16px' color='#068CF3' /></BtnToggleCat>
                        </Flex>
                        <Img style={{ margin: '0' }} width='100%' height='80px' src={`${url_base}static/categories/${x.cp_id ? 'products' : 'services'}/${x.cp_id || x.cs_id}/${x.cp_horPho || x.cs_horPho}`} />
                        <ListContain check={x.check} >
                           <Ul>
                                {(x.subcategoryproducts || x.subcategoryservices)?.map((y) => (
                                    <Li key={y.scs_id ? `subCatSer-item-${y.scs_id}` : `subCatPro-item-${y.scp_id}`}>
                                        <To
                                            color={BGVColor}
                                            to={{
                                                pathname: `/${x.cs_id ? 'servicios' : 'productos'}/categorias/${x.cs_id || x.cp_id}`,
                                                search: `?${x?.cs_id ? 'scs_id' : 'scp_id'}=${y?.scs_id || y?.scp_id}`
                                            }}>
                                                {y.scs_name || y.scp_name}
                                        </To>
                                    </Li>
                                ))}
                           </Ul>
                        </ListContain>
                    </Card>
                ))}
            </Grid>
        </>)
}


const BtnToggleCat = styled.button`
    outline: none;
    background: transparent;
    padding: 0;
    border: 0;
    @media (min-width: 768px) {
        display: none;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 7px 10px;
`

const Grid = styled.div`
    display: block;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 60px;
    justify-content: center;
    @media (min-width: 768px) {
        display: grid;
        max-width: 90%;
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;
    }
    @media (min-width: 1024px) {
        max-width: 80%;
    }
    @media (min-width: 1440px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

const Ul = styled.ul`
    display: block;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`

const Li = styled.li`
    position: relative;
    text-transform: uppercase;
    & > a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0px;
        border-bottom: 2px solid #068CF3;
        transition: .14s linear;
    }

    &:hover > a::after {
        width: 100%;
    }
`