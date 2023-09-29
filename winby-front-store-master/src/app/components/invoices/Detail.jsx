import React from 'react'
import { Container, Box, TitleShopp, InfoWrap, CartSection, FlexBox, ImgCart, Text, Title, DescriptionContainer } from './Styled'
import { InputIcon, InputTextPhone } from '../../common/inputs'
import 'leaflet/dist/leaflet.css'
import { numberFormat, dateFormat } from '../../utils'
import { CustomButton } from '../../common/Buttons'
import { url_base } from '../../redux/types'
import { PColor } from '../../../assets/colors'
import { IconBank, IconLogoType } from '../../../assets/icons'
import { Warning } from '../Warning'

const buyState = (value) => {
    let stateValue
    if(value === 1) {
        stateValue = 'Entregado'
    }
    if(value === 2) {
        stateValue = 'Despachado'
    }
    if(value === 3) {
        stateValue = 'Espera de Despacho'
    }
    if(value === 4) {
        stateValue = 'En Preparacion'
    }
    if(value === 5) {
        stateValue = 'Compra Aprobada'
    }
    if(value === 6) {
        stateValue = 'En espera de Pago'
    }
    if(value === 7) {
        stateValue = 'Rechazado'
    }
    return stateValue
}

export default ({ state, handlePay, handleModal }) =>
    <Container>
        <div id='script' />
        <Warning
            visible={state.alertDialogShow}
            title='¿Está seguro?'
            message='¿Seguro que desea realizar este pago?'
            handleConfirm={handlePay}
            handleCancel={() => handleModal('')}
            messageCenter
            loading={state.loadingPay}
        />
        <FlexBox width='95%' justify='space-between' responsive>
            <Box width='50%'>
                <Title>Información del Cliente</Title>
                <FlexBox width='100%' justify='space-between'>
                    <InputIcon width='48%' value={state.invoiceclient?.ic_name} disabled onChange={e => e} />
                    <InputIcon width='48%' value={state.invoiceclient?.ic_last} disabled onChange={e => e} />
                </FlexBox>
                <FlexBox width='100%' justify='space-between'>
                    <InputTextPhone label='' width='48%' padding='0' margin='8px 0' value={state.invoiceclient?.ic_phone} disabled onChange={e => e} />
                    <InputIcon width='48%' value={state.invoiceclient?.ic_email} disabled onChange={e => e} />
                </FlexBox>
                <FlexBox width='100%' justify='space-between'>
                    <InputIcon width='48%' value={state.invoiceclient?.country?.c_name} disabled onChange={e => e} />
                    <InputIcon width='48%' value={state.invoiceclient?.department?.d_name} disabled onChange={e => e} />
                </FlexBox>
                <FlexBox width='100%' justify='space-between'>
                    <InputIcon width='48%' value={state.invoiceclient?.municipality?.m_name} disabled onChange={e => e} />
                    <InputIcon width='48%' value={state.invoiceclient?.ic_location} disabled onChange={e => e} />
                </FlexBox>
            </Box>
            <Box width='48%' responsive>
                <Title>Costo de la Compra</Title>
                <CartSection display='flex' direction='column' width='80%'>
                    <FlexBox justify='space-between'>
                        <Text margin='8px'>Fecha de Compra</Text>
                        <Text margin='8px'>{dateFormat(state.i_datSta)}</Text>
                    </FlexBox>
                    <FlexBox justify='space-between'>
                        <Text margin='8px'>Estado</Text>
                        <Text margin='8px'>{buyState(state.i_state)}</Text>
                    </FlexBox>
                    <FlexBox justify='space-between'>
                        <Text margin='8px'>Subtotal</Text>
                        <Text margin='8px'>$ {numberFormat(Math.round(state.i_sub + state.i_taxGat))}</Text>
                    </FlexBox>
                    <FlexBox justify='space-between'>
                        <Text margin='8px'>Domicilio</Text>
                        <Text margin='8px'>$ {numberFormat(Math.round(state.i_delivery))}</Text>
                    </FlexBox>
                    <FlexBox justify='space-between'>
                        <Text margin='8px'>Total</Text>
                        <Text margin='8px' bold fontSize='16px'>$ {numberFormat(Math.round(state.i_sub + state.i_taxGat + state.i_delivery))}</Text>
                    </FlexBox>
                    {!state?.i_epayco && state.i_state === 2 ? <FlexBox justify='space-between'>
                        <Text margin='8px'>Decuento</Text>
                        <Text margin='8px' bold fontSize='16px'>- $ {numberFormat(Math.round(state.i_taxGat))}</Text>
                    </FlexBox> : ''}
                    
                    {state.infoPayment.enabled && <>
                        <FlexBox>
                            <Text margin='8px' whiteSpace='normal' fontSize='12px'>
                                {state.infoPayment.message}
                            </Text>
                        </FlexBox>
                        {state.infoPayment.canPay && <FlexBox justify='space-between'>
                            <CustomButton onClick={() => handleModal('mode_wallet')}><IconLogoType size='27px' color='#0075ff' style={{ margin: '15px 10px' }} /></CustomButton>
                            <CustomButton onClick={() => handleModal('mode_gateway')}><IconBank size='27px' color='#0075ff' style={{ margin: '15px 10px' }} /></CustomButton>
                        </FlexBox>}
                    </>}
                </CartSection>
            </Box>
        </FlexBox>
        <Box height='auto'>
            <TitleShopp>REPORTE DE COMPRA</TitleShopp>
            {!!state.invoiceproducts?.length && <>
                <Title>Productos</Title>
                {state.invoiceproducts?.map(x =>
                    <InfoWrap key={x.ip_id}>
                        <FlexBox width='100%'>
                            <ImgCart height='40px' width='130px' src={`${url_base}static/products/${x.product?.p_id}/${x.product.productphotos[0]?.pp_name}`} />
                            <CartSection width='100%'>
                                <Text bold width='80%'>{x.ip_name}</Text>
                                <DescriptionContainer dangerouslySetInnerHTML={{ __html: x.ip_description }} />
                                <Text fontSize='13px'>Unidades: {x.ip_quantity}</Text>
                                <FlexBox width={window.screen.width <= 768 ? '100%' : '40%'}>
                                    <Text>$ {numberFormat(Math.round(x.ip_price + x.ip_taxGat))}</Text>
                                    <Text>{x.ip_total}</Text>
                                    <Text>$ {numberFormat(Math.round((x.ip_price + x.ip_taxGat) * x.ip_total))}</Text>
                                </FlexBox>
                                {(x.i_state < 3 && x.ip_franchise) && <Text color={PColor}>Su pago está siendo validado, en breve podrá ingresar a su back office.</Text>}
                            </CartSection>
                        </FlexBox>
                    </InfoWrap>
                )}
            </>}
            {!!state.invoiceservices?.length && <>
                <Title>Servicios</Title>
                {state.invoiceservices?.map(x =>
                    <InfoWrap key={x.is_id}>
                        <FlexBox width='50%'>
                            <ImgCart height='40px' width='130px' src={`${url_base}static/services/${x.service.s_id}/${x.service.servicephotos[0]?.sp_name}`} />
                            <CartSection width='100%'>
                                <Text bold width='80%'>{x.is_name}</Text>
                               {/*   */}
                            </CartSection>
                        </FlexBox>
                        <FlexBox width='15%'>
                            <Text>$ {numberFormat(Math.round(x.is_price + x.is_taxGat))}</Text>
                        </FlexBox>
                        <FlexBox width='20%'>
                            <Text>{x.is_total}</Text>
                        </FlexBox>
                        <FlexBox width='15%'>
                            <Text>$ {numberFormat(Math.round((x.is_price + x.is_taxGat) * x.is_total))}</Text>
                        </FlexBox>
                    </InfoWrap>
                )}
            </>}
        </Box>
    </Container>
