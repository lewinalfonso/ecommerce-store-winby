import React from 'react'
import { PColor, SFColor } from '../../../assets/colors'
import { IconSee, IconShoppingCart } from '../../../assets/icons'
import { url_base } from '../../redux/types'
import { Anchor, Image, TitleCategory, SliderItem, DescriptionContainer, Price, Line, IconActions, ButtonIcon } from './styles'

export const Desktop = ({ state, addToCart }) => (
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
                <Price>{state.product?.p_price || state.service?.s_price}</Price>
                <Line />
                <TitleCategory>{state.product?.p_name || state.service?.s_name}</TitleCategory>
            </DescriptionContainer>
        </Anchor>
    </SliderItem>
)