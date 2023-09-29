import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ShadowCard } from '../../../common/ShadowCard'
import { getAllCategoriesProStore, getAllCategoriesSerStore } from '../../../redux/actions/store'
import { useCategoriesData } from '../../../hooks/useCategoriesData'
import styled from 'styled-components'
import { url_base } from '../../../redux/types'
import { Link } from 'react-router-dom'
import { CardItems } from '../../../common/Cards'
import { PLColor, SFColor } from '../../../../assets/colors'
import Categorías from '../../../components/categories'

const CategoríesList = ({ onClick, categoriesSerStore, categoriesProStore, getCatSer, getCatPro }) => {

    const [categoriesP, setCategoriesP] = useState([])
    const [categoriesC, setCategoriesC] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCatSer({ up_code: 'Winby', min: 0, max: 20 })
        getCatPro({ up_code: 'Winby', min: 0, max: 20 })
    }, [getCatSer, getCatPro]);

    useEffect(() => {
        categoriesProStore?.data?.length && setCategoriesP(categoriesProStore.data)
        categoriesSerStore?.data?.length && setCategoriesC(categoriesSerStore.data)
    }, [categoriesSerStore.data, categoriesProStore.data, categories])

    useEffect(() => {
        const array = [...categoriesP, ...categoriesC]
        setCategories(array)
    }, [categoriesC, categoriesP])

    const [categoriesData, setCategoriesData] = useCategoriesData()

    useEffect(() => {
        setCategoriesData({ cp_state: 1, cs_state: 1 })
    }, [setCategoriesData])

    return (
        <ShadowCard title='CATEGORÍAS DESTACADAS' fontSize='18px' seeMore onClick={onClick} noTitle>
            {window.screen.width <= 768 ? <Categorías /> :
                <CardContainer className="CardContainer">
                    {categoriesData.slice(4).map(x => <Card className="Card" key={x.cs_id ? `catSer-${x.cs_id}` : `catPro-${x.cp_id}`} >
                        <Link to={{ state: { item: x, mode: true }, pathname: `/${x.cs_id ? 'servicios' : 'productos'}/categorias/${x.cs_id || x.cp_id}` }}>
                            <CardItems className="CardItems" title={x.cs_name || x.cp_name} image={`${url_base}static/categories/${x.cp_id ? 'products' : 'services'}/${x.cp_id || x.cs_id}/${x.cp_icon || x.cs_icon}`} />
                        </Link>
                    </Card>
                    )}
                </CardContainer>
            }
        </ShadowCard>
    )
}
export const TitleCategory = styled.h4`
    font-size: 11px;
    font-family: PFont-Regular;
    background-color: ${PLColor};
    padding: 4px;
    margin: 0;
    position: absolute;
    bottom: -1px;
    left: -1px;
    width: 101%;
    color: ${SFColor};
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media(min-width: 768px){
        font-size: 14px;
    }
`
const CardContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    margin: 1% auto;
    padding: 10px;
    flex-wrap: wrap;
    flex-direction: row;
    background-color: #FFFFFF;


    @media(max-width: 480px) {
        width: 100%;
        padding: 10% 0;
    }
`
const Card = styled.div`
    width: 210px;
    height: 270px;
    margin: 10px auto;
    box-shadow: 0px 0px 3px #15151536;
    transition: transform .1s;

    &:hover{
        
        transform: scale(1.1);
    }

    @media(max-width: 480px) {
        width: 150px;
        height: 200px;
        margin: 35px auto;
    }
`
export const ListOfFeatureCategories = connect(
    ({ categoriesSerStore, categoriesProStore }) => ({ categoriesSerStore, categoriesProStore }),
    { getCatPro: getAllCategoriesProStore, getCatSer: getAllCategoriesSerStore }
)(CategoríesList)