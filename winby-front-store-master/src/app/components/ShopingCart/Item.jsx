/* eslint-disable camelcase */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

import { ItemWrapper, ItemImg, Flex, Img, ItemInfo, ItemCount, ItemViews, ItemTitle, ItemTotal, ItemInfoActions, ItemAction, Span, ItemAttrs, Attr, AttrText } from './styled'
import { AddMoreButtonContainer } from '../../containers/ShoppingCart'

import { IconTruck } from '../../../assets/icons'
import { numberFormat } from '../../utils'
import { url_base } from '../../redux/types'

const getNameAttr = (name, type) => `${ type === 1 ? 'p_' : 's_' }${ name }`

const getItemImage = (data, type) => {
    if ((type === 1 && !data?.productphotos?.length) || (type === 2 && !data?.servicephotos?.length)) return ''
    return `${ url_base }static/${ type === 1 ? 'products' : 'services' }/${ data[getNameAttr('id', type)] }/${ type === 1 ? data.productphotos[0].pp_name : data.servicephotos[0].sp_name }`
}

export const Item = ({ data, type, handleDelete = () => {} }) => {
    if (!data) return <></>
    return <ItemWrapper>
        <Flex>
            <ItemImg>
                <Img src={getItemImage(data, type)} />
            </ItemImg>
            <ItemInfo flexMd={1} flexLg={.5}>
                <Flex flexWrap='nowrap'>
                    <FontAwesomeIcon icon={faEye} size='sm' color='#2A2A2A' />
                    <ItemViews>{data[getNameAttr('views', type)]} Visitas de este { type === 1 ? 'producto' : 'servicio' }</ItemViews>
                </Flex>
                <ItemTitle>{data[getNameAttr('name', type)]}</ItemTitle>
                {type === 1 && <ItemAttrs>
                    {data[getNameAttr('attributes', type)].map((x, i) => <Attr key={`item_attr_${ i }`}>
                        <AttrText>{x.key}: </AttrText>
                        <AttrText bold>{x[x.key]}</AttrText>
                    </Attr>)}
                </ItemAttrs>}
                {type === 1 && <Flex flexWrap='nowrap'>
                    <IconTruck size='30px' color='#04aa04' />
                    <Span color='#04aa04' fontSize='12px'>&nbsp;&nbsp;&nbsp;Envío gratis</Span>
                </Flex>}
                <ItemInfoActions>
                    <ItemAction onClick={() => handleDelete(data, type)}>Eliminar</ItemAction>
                </ItemInfoActions>
            </ItemInfo>
            <ItemCount>
                {type === 1
                    ? <AddMoreButtonContainer p_id={data.p_id} total={data.p_total} available={data.p_available} />
                    : <div />
                }
                <ItemTotal>$ {numberFormat(data[getNameAttr('price', type)])}</ItemTotal>
            </ItemCount>
        </Flex>
    </ItemWrapper>
}