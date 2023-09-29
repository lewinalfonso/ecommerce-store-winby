/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import { url_base } from '../../../redux/types'

import { useAddToCartProducts } from '../../../hooks/useAddToCartProducts'

import Loading, { LoadingCardItem } from '../../../common/Loading'
import { SubBanner } from '../../../common/Banners'
import { ShadowCard } from '../../../common/ShadowCard'
import { LoadingInfiniteScroller } from '../../../common/LoadingInfiniteScroller'

import { ListOfSubCategories } from '../../../components/ListOfSubCategories'
import { ProductCardStandard } from '../../../components/ProductsCard'
import { Aside, Span, BoxTitle, AsideListItem } from '../../../components/AlliesMenu'
import { MyContext } from '../../../components/layout'

import { parseJson } from '../../../utils'

import { GridMenu } from './styled'

const isProducts = (type, keyOnTruth, keyOnFail) => type === 'products' ? keyOnTruth : keyOnFail

export const CategoryItems = ({ type, history, location, ...props }) => {
    const [loading, setLoading] = useState(true)
    const [categoryData, setCategoryData] = useState(undefined)
    const [subCategoryData, setSubCategoryData] = useState(undefined)
    const [error, setError] = useState(false)
    const [items, setItems] = useState([])
    const [params, setParams] = useState({ isInit: false })
    const [isMount, setIsMount] = useState(false)
    const [apiPage, setApiPage] = useState(20)
    const [setCart] = useAddToCartProducts()
    const context = useContext(MyContext)

    // Acción de click sobre una subcategoría
    const handleSubCategory = x => {
        history.push(`${location.pathname}?${isProducts(type, 'scp_id', 'scs_id')}=${x[isProducts(type, 'scp_id', 'scs_id')]}`)
        setSubCategoryData(x)
    }

    // Carga los productos y servicios de la categoría
    const getItems = useCallback(max => {
        if (max) setApiPage(max)
        axios.post(`${url_base}${type}/search/all`, {
            ...(params.scp_id || params.scs_id
                ? { [isProducts(type, 'scp_id', 'scs_id')]: params[isProducts(type, 'scp_id', 'scs_id')] }
                : { [isProducts(type, 'cp_id', 'cs_id')]: props.match.params.id }),
                min: 0,
                max: max || apiPage,
                typeOrder: !params.scp_id && !params.scs_id ? 1 : 2,
                p_state: 1,
                s_state: 1,
                noWinber: true
            })
            .then(response => response.data)
            .then(res => setItems(res?.data || []))
            .catch(() => {})
    }, [params, props.match.params.id, type, apiPage])

    const updateParams = useCallback(() => {
        const query = new URLSearchParams(location.search)
        setParams({
            ...(type === 'products'
            ? { scp_id: query.get('scp_id') }
            : type === 'services'
                ? { scs_id: query.get('scs_id') }
                : {}),
            code: query.get('code'),
            isInit: true
        })
    }, [location.search, type])

    // Actualiza todo al presionar botones de atrás y adelante
    useEffect(() => {
        updateParams()
        setApiPage(20)
    }, [location.search, updateParams])

    // Actualiza el código e la tienda
    useEffect(() => {
        if (params.code) {
            localStorage.setItem('code', JSON.stringify(params.code))
            context.updateCode(params.code)
        }
    }, [params, categoryData, type, context])

    // Está pendiente si cambia el id de la categoría padre
    useEffect(() => {
        if (categoryData) {
            if ((categoryData.cp_id || categoryData.cs_id) !== props.match.params.id) {
                setIsMount(false)
                setLoading(true)
                updateParams()
                setCategoryData(undefined)
            }
        }
    }, [props.match.params.id, updateParams, categoryData])

    // Busca la información de la categoría padre
    useEffect(() => {
        if (props.match.params.id && !error && !isMount && params.isInit) {
            setIsMount(true)
            const { id } = props.match.params
            axios.post(`${url_base}category${type}/search/one`, { [isProducts(type, 'cp_id', 'cs_id')]: id, [isProducts(type, 'cp_state', 'sc_state')]: 1 })
                .then(response => response.data)
                .then(res => {
                    if (res.success) setCategoryData(res.data)
                    else setError(true)
                })
                .catch(() => setError(true))
                .finally(() => setLoading(false))
        }
    }, [params, type, error, props.match.params, params.isInit, isMount, history, location.pathname])


    // Busca los productos cuando se actualice la categoría
    useEffect(() => {
        if (params.isInit) {
            getItems()
            if (params.scp_id || params.scs_id) {
                if (categoryData) {
                    const findSubCat = categoryData[`subcategory${type}`]?.find(x => x[isProducts(type, 'scp_id', 'scs_id')] === params[isProducts(type, 'scp_id', 'scs_id')])
                    if (findSubCat) setSubCategoryData(findSubCat)
                    else history.push(location.pathname)
                }
            } else setSubCategoryData(undefined)
        }
    }, [params, params.scs_id, getItems, categoryData, history, location.pathname, type])

    if (!props.match.params.id || error) {
        history.goBack()
        return <div />
    }

    if (loading) return <Loading />
    return <>
        <SubBanner
            image={`${url_base}static/categories/${type}/${props.match.params.id}/${categoryData[isProducts(type, 'cp_horPho', 'cs_horPho')]}`}
        />
        <NavigationBar>
            <Breadcrumb>
                <To to="/">Inicio {'>'}</To>
                <To to="/categorias">Categorías {'>'}</To>
                {params?.scp_id || params?.scs_id
                    ? <>
                        <To to={location.pathname} onClick={() => setSubCategoryData(undefined)}>{categoryData[isProducts(type, 'cp_name', 'cs_name')].toLowerCase()} {!!subCategoryData && '>'}</To>
                        {!!subCategoryData && <span style={{ textTransform: 'capitalize' }}>{subCategoryData[isProducts(type, 'scp_name', 'scs_name')].toLowerCase()}</span>}
                    </>
                    : <span style={{ textTransform: 'capitalize' }}>{categoryData[isProducts(type, 'cp_name', 'cs_name')].toLowerCase()}</span>}
            </Breadcrumb>
        </NavigationBar>
        <ListOfSubCategories data={categoryData[`subcategory${type}`]} handleSubCategory={handleSubCategory} upCode={params.code || parseJson(localStorage.getItem('code'), 'Winby')} />
        <Container>
            <Aside>
                <BoxTitle><Span fontSize='24px' fontFamily='PFont-Bold'>{categoryData[isProducts(type, 'cp_name', 'cs_name')].toUpperCase()}</Span></BoxTitle>
                <AsideList>
                    {categoryData[`subcategory${type}`]?.map((x, i) => (
                        <AsideListItem
                            key={`sub_category_item_${i}`}
                            selected={subCategoryData && x[isProducts(type, 'scp_id', 'scs_id')] === subCategoryData[isProducts(type, 'scp_id', 'scs_id')]}>
                                <ItemLink onClick={e => {
                                    e.preventDefault()
                                    if (!subCategoryData || (subCategoryData && x[isProducts(type, 'scp_id', 'scs_id')] !== subCategoryData[isProducts(type, 'scp_id', 'scs_id')])) handleSubCategory(x)
                                }}>{x[isProducts(type, 'scp_name', 'scs_name')]}</ItemLink>
                        </AsideListItem>))}
                </AsideList>
            </Aside>
            <ShadowCard margin='0'>
                <WrapperItems>
                    {!!items.length
                        ? <GridMenu>
                            {items?.map((x, i) => (x.p_id ? (x.p_typeVen !== 2) : (x.s_typeVen !== 2)) && <>
                                <ProductCardStandard key={x.p_id ? `cat-pro-grid-item-${i}` : `cat-ser-grid-item${i}`}
                                    state={x}
                                    addToCart={e => {
                                        e.preventDefault()
                                        x.p_id && setCart(x)
                                        }
                                    }
                                />
                                {((params?.scp_id || params?.scs_id) && (i === items.length - 1)) &&  <LoadingInfiniteScroller callback={() => {
                                    if (apiPage === items.length) getItems(apiPage + 20)
                                }} fetchMore={apiPage === items.length} render={<LoadingCardItem />} />}
                            </>)}
                        </GridMenu>
                        : [1, 2, 3, 4].map(x => <LoadingCardItem key={`anim-load-${x}`} />)}
                </WrapperItems>
            </ShadowCard>
        </Container>
    </>
}

const NavigationBar = styled.div`
    width:100%;
    height: 30px;
    padding: 4px;
    color: #434242;
`

const Breadcrumb = styled.span`
    padding-left: 10px;
    font-size: 12px;
`

const To = styled(Link)`
  color: #434242;
  font-size: 12px;
  padding: 5px;
  text-decoration: none;
  text-transform: capitalize;
  &:hover {
    color: #DF2D2D;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`

const AsideList = styled.ul`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 10px;
    margin: 0;
    margin-left: 1.75rem;
    list-style: none;
`

const WrapperItems = styled.div`
    display: flex;
    margin: 10px auto;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 5px;
    border-radius: 10px;
    background-color: #FFFFFF;
`

export const ItemLink = styled.a`
    display: block;
    padding-top:10px;
    padding-bottom: 10px;
    text-decoration: none;
`