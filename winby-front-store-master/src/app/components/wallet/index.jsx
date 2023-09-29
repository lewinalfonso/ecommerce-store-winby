import React from 'react'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { IconSee } from '../../../assets/icons'
import { BGColor, PColor, SFColor } from '../../../assets/colors'
import RegisterAccount from './RegisterAccount'
import MoneyReport from './MoneyReport'
import AccountStatus from './AccountStatus'
import bgImage from '../../../assets/icons/textura.svg'
import wallet from '../../../assets/img/wallet.png'
import { numberFormat } from '../../utils'
import Modals from './Modal'
import { Card, Container, ContainerTitle, Span, Section } from '../../common/ListGrid'
import ListAccount from './ListAccount'
import { Link } from 'react-router-dom'

const renderStatusOrder = status => {
    if (status === 1) return 'Entregado'
    else if (status === 2) return 'Despachado'
    else if (status === 3) return 'En espera de despacho'
    else if (status === 4) return 'En preparación'
    else if (status === 5) return 'Compra aprobada'
    else if (status === 6) return 'En espera de pago'
    else if (status === 7) return 'Rechazada'
}

const Wallet = ({ state, onChangeSelect, onChangeInput, onChangeFile, onSubmit, onClickModal, handleOption, handleChange }) => (
    <>
        <Modals visible={state.visible === 1} title={state.visibleRegister ? 'Agregar Cuenta' : 'Cuentas'} onCloseModal={() => onClickModal(0)} width={window.screen.width <= 768 ? '100%' : '80%'}>
            {state.visibleRegister ?
                <RegisterAccount state={state} onChangeSelect={onChangeSelect} onChangeInput={onChangeInput} onChangeFile={onChangeFile} onSubmit={e => onSubmit(e, 1)} handleChange={handleChange} />
                :
                <ListAccount handleOption={handleOption} handleChange={handleChange} />
            }
        </Modals>
        <Modals width={window.screen.width <= 768 ? '100%' : '350px'} padding='10px 30px' visible={state.visible === 2} title={'Transacción Financiera'} onCloseModal={() => onClickModal(0)}>
            <MoneyReport state={state} onChangeSelect={onChangeSelect} onChangeInput={onChangeInput} onSubmit={e => onSubmit(e, 2)} />
        </Modals>
        <Modals visible={state.visible === 3} title={'Estado de Cuenta'} onCloseModal={() => onClickModal(0)} width={window.screen.width <= 768 ? '100%' : '80%'}>
            <AccountStatus state={state} />
        </Modals>
        <Scrollbars style={{ flex: 1 }} autoHeight autoHeightMax="100%" autoHeightMin="100%" autoHide>
            <WalletV>
                <EstructuraWallet>
                    <Center>
                        <Dates>
                            <Title color={SFColor} font='25px'>Saldo</Title>
                            <Title color={SFColor} font='30px' fontweight='900'>$ {numberFormat(state.um_money)}</Title>
                            <Title color={SFColor} font='25px'>Disponible</Title>
                        </Dates>
                    </Center>
                    <Flex>
                        <Button bottom='55px' orintation='left: -5px' rotate='30deg' width='80px' onClick={() => onClickModal(3)}>
                            {/* <Span>Estados de cuenta</Span> */}
                        </Button>
                        <Button bottom='7px' orintation='left: 35%' rotate='0' width='80px' onClick={() => onClickModal(2)}>
                            {/* Operación */}
                        </Button>
                        <Button bottom='55px' orintation='right: -5px' rotate='-30deg' width='80px' onClick={() => onClickModal(1)}>
                            {/* <Span>Agregar Cuenta</Span> */}
                        </Button>
                    </Flex>
                </EstructuraWallet>
                {/* tabla de historial de movimientos */}
                <Container>
                    <Scrollbars id='bodyTable' autoHeightMin="100%" autoHeightMax="100%" autoHeight autoHide>
                        <ContainerTitle margin='10px auto 5px' gridTemplateColumns=' repeat(9, 1fr) 100px' gridTemplateRows='1fr'>
                            <Section><Span del>Consecutivo</Span></Section>
                            <Section><Span del>Vendedor</Span></Section>
                            <Section><Span del>Fecha de compra</Span></Section>
                            <Section><Span del>Fecha de expedición</Span></Section>
                            <Section><Span del>Fecha de pago</Span></Section>
                            <Section><Span del>Subtotal</Span></Section>
                            <Section><Span del>Domicilio</Span></Section>
                            <Section><Span del>Estado</Span></Section>
                            <Section><Span del>Total</Span></Section>
                            <Section><Span del>Acción</Span></Section>
                        </ContainerTitle>
                        {state.invoices?.slice(0, 10)?.map(x =>
                            <Card key={x.i_id} margin='10px auto 5px' gridTemplateColumns='1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 100px' gridTemplateRows='1fr'>
                                <Section><Span regular>{x.i_consecutive}</Span></Section>
                                <Section><Span regular>{x.i_vendor}</Span></Section>
                                <Section><Span regular>{x.i_datSta}</Span></Section>
                                <Section><Span regular>{x.i_datExp}</Span></Section>
                                <Section><Span regular>{x.i_datEnd || 'esperando pago'}</Span></Section>
                                <Section><Span regular>$ {numberFormat(x.i_sub + x.i_taxGat)}</Span></Section>
                                <Section><Span regular>$ {numberFormat(x.i_delivery)}</Span></Section>
                                <Section><Span regular>{renderStatusOrder(x.i_state)}</Span></Section>
                                <Section><Span regular>$ {numberFormat(x.i_total + x.i_taxGat)}</Span></Section>
                                <Section>
                                    <Link to={`/compra/detalles/${x.i_id}`}>
                                        <IconSee size='15px' color={PColor} />
                                    </Link>
                                </Section>
                            </Card>
                        )}
                    </Scrollbars>
                </Container>
            </WalletV>
        </Scrollbars>
    </>
)
const WalletV = styled.div`
    padding: 30px;
    width: 100%;
    background-image: url(${bgImage});
`
const Flex = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    min-width:400px;

`
const Button = styled.button`
    position: absolute;
    opacity: 0;
    bottom: ${({ bottom }) => bottom};
    width: ${({ width }) => width};
    height: 30px;
    ${({ orintation }) => orintation};
    transform: rotate( ${({ rotate }) => rotate});
    z-index: 99;
    background-color: #efefef;
    cursor: pointer;
`
const Center = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom: -122px;
`
const EstructuraWallet = styled.div`
    margin: auto;
    margin-bottom: 70px;
    height: 340px;
    width: 280px;
    background-image: url(${wallet});
    background-size: 100% 100%;
    position: relative;
`
const Dates = styled.div`
    position:absolute;
    z-index:1;
    top: 110px;
    text-align:center;
`
const Title = styled.p`
    position:relative;
    font-weight: ${({ fontweight }) => fontweight ? fontweight : '20'};
    transform: ${({ Transition }) => Transition ? Transition : '0'};
    margin: 0;
    font-size: 1.2em;
    cursor: pointer;
    color:${BGColor};
    color: ${({ color }) => color};
`

export default Wallet