import React from 'react'
import { PColor, APColor, ASColor, SFColor } from '../../../assets/colors'
import { IconSee, IconShoppingCart, IconStock, IconTruck } from '../../../assets/icons'
import { url_base } from '../../redux/types'
// import { numberFormat } from '../../utils'
import { Anchor, Image, TitleCategory, SliderItem, DescriptionContainer, Price, Line, IconActions, ButtonIcon, SpanText, ContainerMovilInfo, FreeContainer } from './styles'

const RenderTypeDelivery = ({ local, national, movilmode }) => {
    let text = ''
    if ((local.tdc_type === 2 || local.tdc_type === 4) && (national.tdc_type !== 2 && national.tdc_type !== 4)) {
        text = 'Envío Gratis Local'
    } else if (((local.tdc_type !== 2 && local.tdc_type !== 4) && (national.tdc_type === 2 || national.tdc_type === 4)) || ((local.tdc_type === 2 || local.tdc_type === 4) && (national.tdc_type === 2 || national.tdc_type === 4))) {
        text = 'Envío Gratis'
    } else return ''
    return <FreeContainer fontSize='12px' movil movilmode={movilmode}>
        <SpanText movilmode={movilmode} fontSize='12px' movil><IconTruck size='35px' color={ASColor} style={{ marginRight: '8px' }} /> {text}</SpanText>
    </FreeContainer>
}

export const ProductCard = ({ state, addToCart, movilmode }) => {
    const nameProduct = (state.product?.p_name || state.service?.s_name) || ''
    return (
        <SliderItem>
            <Anchor
                movilmode={movilmode}
                to={{
                    state: { item: state },
                    pathname: `/${state.uss_id ? 'servicios' : 'productos'}/detalles/${state.product?.p_id || state.service?.s_id}`
                }}
            >
                <Image
                    movilmode={movilmode}
                    title={state.product?.p_name || state.service?.s_name}
                    src={`${url_base}static/${state.product ? 'products' : 'services'}/${state?.product?.p_id || state?.service?.s_id}/${(!!state?.product?.productphotos?.length && state?.product?.productphotos[0]?.pp_name) || (!!state?.service?.servicephotos?.length && state?.service?.servicephotos[0]?.sp_name)}`}
                />
                <IconActions>
                    {(state?.product?.p_id && !state?.product?.productattributes?.length) && <ButtonIcon type='button' onClick={addToCart}><IconShoppingCart size='12px' color={PColor} /></ButtonIcon>}
                    <ButtonIcon
                        to={{
                            state: { item: state },
                            pathname: `/${state.uss_id ? 'servicios' : 'productos'}/detalles/${state.product?.p_id || state.service?.s_id}`
                        }}
                    >
                        <IconSee size='12px' color={SFColor} />
                    </ButtonIcon>
                </IconActions>
                <DescriptionContainer movilmode={movilmode}>
                    <TitleCategory movilmode={movilmode}>{nameProduct.substring(0, 25)}{nameProduct.length > 25 && '...'}</TitleCategory>
                    <Price movilmode={movilmode}>$ {new Intl.NumberFormat('de-DE').format(parseInt((state.product?.p_price + (state.product?.p_taxGat || 0)) || (state.service?.s_price + (state.service?.s_taxGat || 0)) || 0))}</Price>
                    <Line />
                    <ContainerMovilInfo movilmode={movilmode}>
                        <SpanText movilmode={movilmode}><IconSee size={20} color={APColor} />&nbsp;&nbsp; {(state.product?.p_views || state.service?.s_views) || 0}</SpanText>
                        <SpanText movilmode={movilmode}><IconStock size={20} color={PColor} />&nbsp;&nbsp; {(state.product?.p_quantity || state.service?.s_quantity) || 0}</SpanText>
                    </ContainerMovilInfo>
                    {!state?.product?.p_franchise && state?.product?.productlocals?.length && <RenderTypeDelivery local={state?.product?.productlocals[0]?.vendorlocal?.localDelivery} national={state?.product?.productlocals[0]?.vendorlocal?.nationalDelivery} movilmode={movilmode} />}
                </DescriptionContainer>
            </Anchor>
        </SliderItem>
    )
}

export const ProductCardStandard = ({ state, addToCart }) => {
    const nameProduct = (state.p_name || state.s_name) || ''
    return (
        <SliderItem>
            <Anchor
                to={{
                    state: { item: state },
                    pathname: `/${state.s_id ? 'servicios' : 'productos'}/detalles/${state.p_id || state.s_id}`
                }}
            >
                <Image
                    title={state.p_name || state.s_name}
                    src={`${url_base}static/${state.p_id ? 'products' : 'services'}/${state.p_id || state.s_id}/${state.p_id ? state.productphotos[0]?.pp_name : state.servicephotos[0]?.sp_name}`}
                />
                <IconActions>
                    {state.p_id && <ButtonIcon type='button' onClick={addToCart}><IconShoppingCart size='12px' color={PColor} /></ButtonIcon>}
                    <ButtonIcon
                        to={{
                            state: { item: state },
                            pathname: `/${state.s_id ? 'servicios' : 'productos'}/detalles/${state.p_id || state.s_id}`
                        }}
                    >
                        <IconSee size='12px' color={SFColor} />
                    </ButtonIcon>
                </IconActions>
                <DescriptionContainer>
                    <TitleCategory>{nameProduct.substring(0, 25)}{nameProduct.length > 25 && '...'}</TitleCategory>
                    <Price>$ {new Intl.NumberFormat('de-DE').format(state.p_price !== undefined ? (state.p_price + state.p_taxGat) : (state.s_price + state.s_taxGat))}</Price>
                    <Line />
                    <ContainerMovilInfo>
                        <SpanText><IconSee size={20} color={APColor} />&nbsp;&nbsp; {(state.p_views || state.s_views) || 0}</SpanText>
                        <SpanText><IconStock size={20} color={PColor} />&nbsp;&nbsp; {(state.p_quantity || state.s_quantity) || 0}</SpanText>
                    </ContainerMovilInfo>
                    {(state?.p_delivery === 3 || state?.s_delivery === 3) &&
                        <FreeContainer fontSize='12px' movil>
                            <SpanText fontSize='12px' movil><IconTruck size='35px' color={ASColor} style={{ marginRight: '8px' }} /> Envío Gratis</SpanText>
                        </FreeContainer>
                    }
                </DescriptionContainer>
            </Anchor>
        </SliderItem>
    )
}