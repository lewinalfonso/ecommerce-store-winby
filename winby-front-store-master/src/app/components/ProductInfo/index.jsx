import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ASColor, BGColor, PColor, PLColor } from '../../../assets/colors'
import { IconBank, IconTruck, IconViews } from '../../../assets/icons'
import { CustomButton } from '../../common/Buttons'
import { useAddToCartProducts } from '../../hooks/useAddToCartProducts'
import { Container, Span, Select, Title, ButtonContainer, Box, Price } from './styled'

export const ProductInfo = ({ state, onClick }) => {
    const history = useHistory()
    const [setAddToCart] = useAddToCartProducts(state.p_id)
    const [attributes, setAttributes] = useState([])

    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
    const isCart = shoppingCart?.invoiceproducts?.find(x => x.p_id === state.p_id)

    // const quantityCal = useCallback(stope => {
    //     let html
    //     for (let i = 1; i <= stope; i++) {
    //         if (i >= 6) {
    //             html += `<option value="${i}">${i}+ unidad</option>`
    //             break
    //         } else { html += `<option value="${i}">${i} unidad</option>` }
    //     }
    //     return { __html: html }
    // }, [])

    const onChange = e => {
        const { name, value } = e.target
        const find = attributes.find(x => x.key === name)

        if (find)
            setAttributes([...attributes.filter(x => x.key !== name), { [name]: value, key: name }])
        else
            setAttributes([...attributes, { [name]: value, key: name }])
    }

    return (
        <Container>
            <Box row padding='5px'>
                <IconViews size='15px' /><Span padding='3px 0 0 10px'>{state.p_views >= 0 ? `${state.p_views} visitas de este producto` : ''}</Span>
            </Box>
            <Title onClick={onClick}>{state.p_name}</Title>
            <Box padding='0' margin='0'>
                <Span>Precio</Span>
                <Price>$ {new Intl.NumberFormat('de-DE').format(parseInt((state.p_price + state.p_taxGat)) || 0)} {/* <Span fontSize='10px' padding='0px 5px' color={PColor}>30% off</Span> */}</Price>
                {/* <Span>Stock disponible: {state.p_available ? 'si' : 'no'}</Span> */}
            </Box>
            <Box row padding='0px'>
                <Span>{state.p_available} (disponibles)</Span>
            </Box>
            <Box padding='0' margin='15px 0'>
                <Box row padding='5px 0 0 0'>
                    <img src={require('../../../assets/icons/mastercard.svg')} style={{ width: '25px' }} alt='incon' />&nbsp;&nbsp;
                    <img src={require('../../../assets/icons/visa.svg')} style={{ width: '25px' }} alt='incon' />&nbsp;&nbsp;
                    <img src={require('../../../assets/icons/billeteraWinby.svg')} style={{ width: '25px' }} alt='incon' />&nbsp;&nbsp;
                    <IconBank size='27px' color='#0075ff' />
                </Box>
                <Span center><IconTruck color={ASColor} size='35px' /> &nbsp; &nbsp; Envío disponible</Span>
                <Span>El costo del envío puede variar según su ubicación</Span>
            </Box>
            {!isCart &&
                <Box row align='center' margin='15px 0'>
                    {state.attrMulti?.map((x, i) => <React.Fragment key={`attr_product_${i}`}>
                        <Span fontSize='10px'>{x.pa_name}</Span>
                        <Select name={x.pa_name} onChange={onChange} >
                            <option key={`option_attr`} value={0}>Seleccione</option>
                            {x.values.map((y, j) => !!y && <option key={`option_attr_${i}${j}`} value={y.tascp_name}>{y.tascp_name}</option>)}
                        </Select>
                    </React.Fragment>)}
                </Box>
            }
            {/* <Box row align='center' margin='15px 0'>
                <Span fontSize='10px'>Cantidad: &nbsp;</Span>
                <Select name='p_total' dangerouslySetInnerHTML={quantityCal(3)} value={state.p_total} onChange={handleQuantity} />

                <Span fontSize='9px'>&nbsp;({state.p_available} disponibles)</Span>
            </Box> */}
            {state.p_available
                ? <ButtonContainer>
                    <CustomButton onClick={() => isCart ? history.push('/carrito') : setAddToCart(state, attributes, 1)} bgColor={PColor} padding='7px' width='100%' radius='8px'>
                        <Span fontFamily='PFont-Bold' fontSize='18px' color={BGColor} padding='0 8px'>Comprar Ahora</Span>
                    </CustomButton>
                    <br />
                    <CustomButton onClick={() => setAddToCart(state, attributes)} bgColor={`${PColor}33`} padding='7px' width='100%' radius='8px'>
                        <Span fontFamily='PFont-Bold' fontSize='18px' color={PColor} padding='0 8px'>{!isCart ? 'Agregar al carrito' : 'Quitar del carrito'}</Span>
                    </CustomButton>

                    {/* <Box margin='40px 0 10px 0' style={{ height: '150px' }} bgColor={PLColor}>
                        <Span>Esta compra está asegurada</Span>
                    </Box> */}
                </ButtonContainer>
                : <Box margin='40px 0 10px 0' style={{ height: '150px' }} bgColor={PLColor}>
                    <Span>Actualmente no hay disponibilidad de este artículo en stock, pero no te preocupes pronto estará nuevamente disponible. <br />
                        Winby tiene cientos de productos similares que te pueden interesar
                    </Span>
                </Box>}
            <br />
        </Container>
    )
}