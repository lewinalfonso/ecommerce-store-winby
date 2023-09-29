import React, { useContext } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { IconTruck } from '../../../assets/icons'
import baloto from '../../../assets/icons/baloto.png'
import billeteraWinby from '../../../assets/icons/billeteraWinby.svg'
import codigoPromocional from '../../../assets/icons/codigoPromocional.svg'
import tarjetaCredito from '../../../assets/icons/tarjetaCredito.svg'
import transferencia from '../../../assets/icons/transferencia.svg'
import efectivo from '../../../assets/icons/efectivo.svg'
import visaCard from '../../../assets/icons/visaCard.svg'
import masterCardCard from '../../../assets/icons/masterCardCard.svg'
import americanExpress from '../../../assets/icons/americanExpress.svg'
import dinersClub from '../../../assets/icons/dinersClub.svg'
import pse from '../../../assets/icons/pse.svg'
import efecty from '../../../assets/icons/efecty.svg'
import via from '../../../assets/icons/via.png'
import { Box, Column, Img, SpanText } from './Styled'
import Modalles from '../../common/modal/Modal'
import { Context } from '../../common/modal/ContextModal'
import styled from 'styled-components'

export const Modal = () => {

    const { isModal, setIsModal } = useContext(Context)
    return (

        <Modalles Icon direction='row' isModal={isModal} setIsModal={setIsModal}>
            <ContentModal>

                <Box onClick={e => e.stopPropagation()} padding='0'>
                    <Scrollbars autoHeight autoHide autoHeightMin={0} autoHeightMax={window.screen.height <= 768 ? 400 : window.screen.height <= 1100 ? 700 : '100%'}>
                        <Box padding='10px 0'>
                            <Column padding='0 20px' flexDir='row' display='flex'>
                                <IconTruck size={window.screen.width < 768 ? '38px' : '65px'} color='#3aaa35' />
                                <SpanText padding={window.screen.width <=768 ? '10px 0 0 35px' : '25px 90px'} weight='bold' fontSize='14px'>Envíos gratuitos</SpanText>
                            </Column>

                            <hr width='95%'/>
                        </Box>
                        <Box padding='10px 0'>
                            <Column display='flex' padding='0 20px' flexDir='initial'>
                                <Column display='flex' padding='0'>
                                    <Img margin='45px 0 0 0' width={window.screen.width < 768 ? '50px' : '70px'} height={window.screen.width < 768 ? '50px' : '65px'} src={billeteraWinby}/>
                                    <Img margin={window.screen.width <= 768 ? '0' : '-13px 0 0' } width={window.screen.width < 768 ? '50px' : '70px'} height={window.screen.width < 768 ? '40px' : '65px'} src={codigoPromocional}/>
                                </Column>
                                <Column padding={window.screen.width <= 768 ? '0 0 0 25px' : '0 80px' }>
                                    <SpanText fontSize={window.screen.width <= 768 ? '16px' : '22px'} weight='bold'>Medios de pago<br/><br/></SpanText>
                                    <SpanText fontSize={window.screen.width <= 768 ? '12px' : '18px'} weight='bold'>Paga con la Billetera Winby<br/></SpanText>
                                    <SpanText fontSize={window.screen.width <= 768 ? '10px' : '14px'}>Es rápido, seguro y no tiene costo adicional.<br/><br/></SpanText>
                                    <SpanText fontSize={window.screen.width <= 768 ? '12px' : '18px'} weight='bold'>Código promocional</SpanText>
                                </Column>
                            </Column>
                            <hr width='95%'/>
                        </Box>
                        <Box padding='10px 0'>
                            <Column padding='0' flexDir='row' display='flex' zIndex='1'>
                                <Img width={window.screen.width < 768 ? '50px' : '75px'} height={window.screen.width < 768 ? '50px' : '65px'} margin={window.screen.width <= 768 ? '10px 25px 0': '10px 30px 0' } src={tarjetaCredito}/>
                                <SpanText padding={window.screen.width <= 768 ? '15px 0 0 5px' : '25px 50px 0'} fontSize={window.screen.width <= 768 ? '11px' : '18px'} weight='bold'>Tarjetas de Créditos</SpanText>
                            </Column>
                            <Column padding={window.screen.width <= 768 ? '0 0 0 100px' : '0 0 0 150px'} zIndex='11'>
                                <Img width={window.screen.width < 768 ? '38px' : '50px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '10px 25px 0 0': '10px 30px 0' } src={visaCard}/>
                                <Img width={window.screen.width < 768 ? '38px' : '50px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '10px 25px 0 0': '10px 30px 0' } src={masterCardCard}/>
                                <Img width={window.screen.width < 768 ? '38px' : '50px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '10px 25px 0 0': '10px 30px 0' } src={americanExpress}/>
                                <Img width={window.screen.width < 768 ? '38px' : '50px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '10px 25px 0 0': '10px 30px 0' } src={dinersClub}/>
                            </Column>
                            <hr style={{ height: '1px', backgroundColor: 'black', border: 'none' }} width='95%'/>
                        </Box>
                        <Box padding='10px 0'>
                            <Column padding='0' flexDir='row' display='flex'>
                                <Img width={window.screen.width < 768 ? '50px' : '75px'} height={window.screen.width < 768 ? '40px' : '65px'} margin={window.screen.width <= 768 ? '10px 25px 0': '10px 30px 0' } src={transferencia}/>
                                <SpanText padding={window.screen.width <= 768 ? '0 5px' : '20px 50px 5px' } fontSize={window.screen.width <=768 ? '11px' : '18px'} weight='bold'>Transferencia desde tu banco<br/><SpanText fontSize={window.screen.width <=768 ? '10px' : '14px'} weight='100'>Termina tu compra y haz un traspaso online sin moverte de tu hogar.</SpanText></SpanText>
                            </Column>
                            <Column padding={window.screen.width <= 768 ? '0 0 0 100px' : '0 0 0 150px'}>
                                <Img width={window.screen.width < 768 ? '80px' : '100px'} height={window.screen.width < 768 ? '38px' : '33px'} margin={window.screen.width <=768 ? '0' : '0 30px'} src={pse}/>
                            </Column>
                            <hr width='95%'/>
                        </Box>
                        <Box padding='10px 0'>
                            <Column padding='0' flexDir='row' display='flex'>
                                <Img width={window.screen.width < 768 ? '50px' : '75px'} height={window.screen.width < 768 ? '40px' : '65px'} margin={window.screen.width <= 768 ? '10px 25px 0': '10px 30px 0' } src={efectivo}/>
                                <SpanText padding={window.screen.width <= 768 ? '15px 0 0 5px' : '20px 50px 0'} fontSize={window.screen.width <=768 ? '11px' : '18px'} weight='bold'>Efectivo en puntos de pago</SpanText>
                            </Column>
                            <Column padding={window.screen.width <= 768 ? '0 0 0 109px' : '0 0 15px 150px'}>
                                <Img width={window.screen.width < 768 ? '60px' : '100px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '0 25px 0 0': '10px 30px 0' } src={baloto}/>
                                <Img width={window.screen.width < 768 ? '50px' : '80px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '0 25px 0 0': '10px 30px 0' } src={efecty}/>
                                <Img width={window.screen.width < 768 ? '50px' : '80px'} height={window.screen.width < 768 ? '38px' : '50px'} margin={window.screen.width <= 768 ? '0 25px 0 0': '10px 30px 0' } src={via}/>
                            </Column>
                        </Box>
                    </Scrollbars>
                </Box>
            </ContentModal>
        </Modalles>

    )}
const ContentModal = styled.div`
    width: 92%;
    display: flex;
    flex-direction: column;
`