import React from 'react'
import { PColor, PLVColor, SFColor } from '../../../assets/colors'
import { IconSee, IconShoppingCart, IconStock, IconTruck } from '../../../assets/icons'
import { url_base } from '../../redux/types'
import { numberFormat } from '../../utils'
import { Anchor, Image, TitleCategory, SliderItem, DescriptionContainer, Price, Line, IconActions, ButtonIcon, SpanText, ContainerMovilInfo } from './styles'

export const Movil = ({ state, addToCart }) => (
    <SliderItem>
        <Anchor
            to={{
                state: { item: state },
                pathname: `/${ state.uss_id ? 'servicios' : 'productos' }/detalles/${ state.product?.p_id || state.service?.s_id }` }}
        >
            <Image
                title={ state.product?.p_name || state.service?.s_name }
                src={`${ url_base }static/${ state.product ? 'products' : 'services' }/${ state.product?.p_id || state.service?.s_id }/${ state.product?.productphotos[0]?.pp_name || state.service?.servicephotos[0]?.sp_name }`}
            />
            <IconActions>
                <ButtonIcon type='button' onClick={addToCart}><IconShoppingCart size='12px' color={PColor} /></ButtonIcon>
                <ButtonIcon
                    to={{
                        state: { item: state },
                        pathname: `/${ state.uss_id ? 'servicios' : 'productos' }/detalles/${ state.product?.p_id || state.service?.s_id }` }}
                >
                    <IconSee size='12px' color={SFColor} />
                </ButtonIcon>
            </IconActions>
            <DescriptionContainer>
                <Price>$ {numberFormat(state.product?.p_price) || numberFormat(state.service?.s_price)}</Price>
                <Line />
                <ContainerMovilInfo>
                    <SpanText><IconSee size={20} color={PLVColor} />&nbsp;&nbsp; {(state.product?.p_views || state.service?.s_views) || 0}</SpanText>
                    <SpanText><IconStock size={20} color={PLVColor} />&nbsp;&nbsp; {(state.product?.p_quantity || state.service?.s_quantity) || 0}</SpanText>
                    {(state.product?.p_delivery === 3 || state.service?.s_delivery === 3) && <IconTruck size='35px' color='#04AA04' />}
                </ContainerMovilInfo>
                <TitleCategory>{state.product?.p_name || state.service?.s_name}</TitleCategory>
            </DescriptionContainer>
        </Anchor>
    </SliderItem>
)