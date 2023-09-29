import React from 'react'
import SwiperCore, { Navigation, A11y } from 'swiper'
import { Box, Container, ContainerProducts, Main, Price, Span, Title, ButtonContainer, WraperDescription, Select, ContainerOffers, OffersText } from './Styled'
import { BGColor, PColor, SFColor } from '../../../assets/colors'
import { CustomButton } from '../../common/Buttons'
import { IconBank, IconLike, IconProtected, IconShoppingCart } from '../../../assets/icons'
import Scrollbars from 'react-custom-scrollbars'
import Loading from '../../common/Loading'
import ModalProfile from './ModalProfile'
import { numberFormat } from '../../utils'
import { ListOfOffers } from '../ListOfOffers'
import { SliderService } from '../ServiceSlider'
// import Modalles from '../../common/modal/Modal'
// import { Context } from '../../common/modal/ContextModal'
import Modal from './Modal'

SwiperCore.use([Navigation, A11y])

export const DetailServices = ({ state, onClick, handleChangeSlide, refs, handleShop, handleModal, handleClickSchedulle, handlePayoptions, onChangeSelect }) => {

    // const { isModal, setIsModal } = useContext(Context)

    return (
        <Main>
            <Modal
                responsive
                visible={state.modalProfile}
                position='fixed'
                title={'Perfil de prestador de servicio'}
                stateName='modalProfile'
                onCloseModal={handleModal}>

                <ModalProfile state={state} handleClickSchedulle={handleClickSchedulle} />
            </Modal>
            <Container>
                <ContainerProducts>
                    <SliderService state={state} handleChangeSlide={handleChangeSlide} refs={refs} onClick={onClick} />
                    <Box borderLeft padding='10px'>
                        <Span padding='20px 0 0 10px'> {state.s_views} visitas a este servicio</Span>
                        <Title onClick={onClick}>{state.s_name}</Title>
                        <Box margin='15px 0'>
                            <Span>Precio</Span>
                            <Price>$ {numberFormat(state.s_price + state.s_taxGat)}</Price>
                            {/* <Span>Stock disponible: {state.s_available ? 'si' : 'no'}</Span> */}
                        </Box>
                        <Box row align='center' margin='15px 0'>
                            {state.attrMulti?.map((x, i) => <React.Fragment key={`attr_product_${i}`}>
                                <Span fontSize='10px'>{x.sa_name}</Span>
                                <Select name={x.sa_name} onChange={onChangeSelect} >
                                    {x.values.map((y, j) => !!y && <option key={`option_attr_${i}${j}`} value={y}>{y}</option>)}
                                </Select>
                            </React.Fragment>)}
                        </Box>
                        <Box padding='15px' margin='15px 0'>
                            <Span>Compra protegida <IconProtected color='#00fa44' size='15px' /> </Span>
                            <Box row padding='5px 0 0 0'>
                                <img src={require('../../../assets/icons/mastercard.svg')} style={{ width: '25px' }} alt='incon' />&nbsp;&nbsp;
                                <img src={require('../../../assets/icons/visa.svg')} style={{ width: '25px' }} alt='incon' />&nbsp;&nbsp;
                                <img src={require('../../../assets/icons/billeteraWinby.svg')} style={{ width: '25px' }} alt='incon' />&nbsp;&nbsp;
                                <IconBank size='27px' color='#0075ff' />
                            </Box>
                        </Box>
                        <ButtonContainer>
                            <CustomButton onClick={handleModal} bgColor={PColor} padding='7px' width='40%' radius='8px'>
                                <Span color={BGColor} padding='0 8px'>Ver Perfil</Span>
                            </CustomButton>
                            <br />
                            <CustomButton onClick={() => handleShop(1)} bgColor={PColor} padding='7px' width='100%' radius='8px'>
                                <IconLike color={BGColor} size='15px' />
                                <Span color={BGColor} padding='0 8px'>Comprar</Span>
                            </CustomButton>
                            <br />
                            <CustomButton onClick={() => handleShop()} bgColor={`${PColor}33`} padding='7px' width='100%' radius='8px'>
                                <IconShoppingCart color={state.shopping ? PColor : SFColor} size='15px' />
                                <Span color={state.shopping ? PColor : SFColor} padding='0 8px'>{state.shopping ? 'Agregar al carrito' : 'Quitar del carrito'}</Span>
                            </CustomButton>
                        </ButtonContainer>
                    </Box>
                    {/* Descripcion del producto  */}
                    <Box position='relative' borderTop padding='20px'>
                        {state.loading
                            ? <Loading />
                            : <>
                                <Price>Descripción:</Price>
                                <WraperDescription dangerouslySetInnerHTML={{ __html: state.s_description }} />
                            </>
                        }
                    </Box>
                    <ContainerOffers>
                        <OffersText>Articulos en Oferta</OffersText>
                        <Scrollbars autoHeight autoHeightMax={700} autoHeightMin='0' autoHide height='300px' style={{ borderTop: '1px solid rgb(238, 238, 238)' }}  >
                            <ListOfOffers movilmode='true' />
                        </Scrollbars>
                    </ContainerOffers>
                </ContainerProducts>
            </Container>
        </Main>
    )
}