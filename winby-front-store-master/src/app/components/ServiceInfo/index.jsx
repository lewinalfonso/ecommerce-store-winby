import React, { useCallback, useEffect } from 'react'
import { ASColor, BGColor, PColor, PLColor, SFColor } from '../../../assets/colors'
import { IconBank, IconTruck, IconViews } from '../../../assets/icons'
import { CustomButton } from '../../common/Buttons'
import { useAddToCartServices } from '../../hooks/useAddToCartServices'
import { useSearchItemCart } from '../../hooks/useSearchItemCart'

import { Container, Span, Select, Title, ButtonContainer, Box, Button, Price } from './styled'

export const ServiceInfo = ({ state, onClick, handlePayoptions, handleQuantity, onChangeSelect }) => {
  
    const [setAddToCart] = useAddToCartServices()
    const [itemCart, searchItemCart] = useSearchItemCart()

    // console.log(itemCart)
    useEffect(() => {
        searchItemCart(state.s_id)
    }, [searchItemCart, itemCart, state.s_id])

    const quantityCal = useCallback(stope => {
        let html
        for (let i = 1; i <= stope; i++) {
            if (i >= 6) {
                html += `<option value="${i}">${i}+ unidad</option>`
                break
            } else { html += `<option value="${i}">${i} unidad</option>` }
        }
        return { __html: html }
    }, [])

    return (
        <Container>
            <Box row padding='5px'>
                <IconViews size='15px' /><Span padding='3px 0 0 10px'>{state.s_views >= 0 ? `${state.s_views} visitas de este producto` : ''}</Span>
            </Box>
            <Title onClick={onClick}>{state.s_name}</Title>
            <Box padding='0' margin='0'>
                <Span>Precio</Span>
                <Price>$ {new Intl.NumberFormat('de-DE').format((state.s_price + state.s_taxGat) || 0)} {/* <Span fontSize='10px' padding='0px 5px' color={PColor}>30% off</Span> */}</Price>
                {/* <Span>Stock disponible: {state.s_available ? 'si' : 'no'}</Span> */}
            </Box>
            <Box padding='0' margin='15px 0'>
                <Box row padding='5px 0 0 0'>
                    <img src={require('../../../assets/icons/mastercard.svg')} style={{ width: '25px' }} alt='incon' /> &nbsp;
                    <IconBank size='27px' color='#0075ff'/>
                </Box>
                <Button color={PColor} fontSize='10px' textAlign='left' onClick={handlePayoptions}>{state.activePay === false ? 'Ver más' : 'Ver menos'}</Button>
                <Span center><IconTruck color={ASColor} size='35px' /> &nbsp; &nbsp; Envío disponible</Span>
                <Span>El costo del envío puede variar según su ubicación</Span>
            </Box>
            <Box row align='center' margin='15px 0'>
                {state.attrMulti?.map((x, i) => <React.Fragment key={`attr_product_${i}`}>
                    <Span fontSize='10px'>{x.pa_name}</Span>
                    <Select name={x.pa_name} onChange={onChangeSelect} >
                        {x.values.map((y, j) => !!y && <option key={`option_attr_${i}${j}`} value={y}>{y}</option>)}
                    </Select>
                </React.Fragment>)}
            </Box>
            <ButtonContainer>
                <CustomButton onClick={() => setAddToCart(state, 1)} bgColor={PColor} padding='7px' width='100%' radius='8px'>
                    <Span fontFamily='PFont-Bold' fontSize='18px' color={BGColor} padding='0 8px'>Comprar Ahora</Span>
                </CustomButton>
                <br />
                <CustomButton onClick={() => setAddToCart(state)} bgColor={`${PColor}33`} padding='7px' width='100%' radius='8px'>
                    <Span fontFamily='PFont-Bold' fontSize='18px' color={itemCart ? PColor : SFColor} padding='0 8px'>{itemCart ? 'Agregar al carrito' : 'Quitar del carrito'}</Span>
                </CustomButton>
            </ButtonContainer>
            <br />
        </Container>
    )
}