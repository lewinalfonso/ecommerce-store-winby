import React from 'react'
import styled from 'styled-components'
import { PColor, BGColor, PVColor, PLColor, SFColor } from '../../../assets/colors'
import { IconWallet, IconQRCode, IconCerrar, IconReloj, IconCheck } from '../../../assets/icons'
export default () => <div>
    <Carts>
        <Btn>
            <Titulo> Pagar<Span>X</Span></Titulo>
        </Btn>
        <Desp>Pagar en efectivo</Desp>
        {/*  Con Iconos  */}
        <Options>
            <DespIcon>Pagar con QR </DespIcon>
            <CodeIcon>
                <IconQRCode size='35px' color={''} color2={''} style={{ marginLeft: '6px' }} />
            </CodeIcon>
        </Options>
        <Options>
            <DespIcon>Tranferir a billetera winby </DespIcon>
            <CodeIcon>
                <IconWallet size='35px' color={''} color2={''} style={{ marginLeft: '6px' }} />
            </CodeIcon>
        </Options>
        {/* Pago reechazado  aceptado */}
        <DespRechazado>
            <H6PR>Pago Rechazado</H6PR>
            <Good>
                <IconCerrar size='70px' color={''} color2={''} style={{ marginLeft: '6px' }} />
            </Good>
        </DespRechazado>
        <DespRechazado>
            <H6PR>Pago Realizado</H6PR>
            <Good>
                <IconCheck size='70px' color={''} color2={''} style={{ marginLeft: '6px' }} />
            </Good>
        </DespRechazado>
        <DespRechazado>
            <Good>
                <IconReloj size='90px' color={''} color2={''} style={{ marginLeft: '6px' }} />
            </Good>
            <H6PR>Esperando Confirmación</H6PR>
        </DespRechazado>
        <OptionsInput>
            <InputIcon type="tex" placeholder="Codigo del aliado"></InputIcon>
        </OptionsInput>
        <OptionsInput>
            <InputIcon type="tex" placeholder="Valor a pagar"></InputIcon>
        </OptionsInput>
        <OptionsInput>
            <InputIcon type="tex" placeholder="Pagar"></InputIcon>
        </OptionsInput>
        <Desp>
            <Button>Enviar</Button>
        </Desp>
        <OptionsInput>
            <InputIcon type="tex" placeholder="Código Billetera Winby"></InputIcon>
            <CodeCodeQr>
                <IconWallet size='35px' color={''} color2={''} style={{ marginLeft: '6px' }} />
            </CodeCodeQr>
        </OptionsInput>
        <OptionsInput>
            <InputIcon type="tex" placeholder="QR-247123"></InputIcon>
        </OptionsInput>
        <OptionsInput>
            <InputIcon type="tex" placeholder="$ 100.000"></InputIcon>
        </OptionsInput>
        <Desp>Pagar con billetera winby</Desp>
        <Desp>Deposito a billetera winby</Desp>
    </Carts>
</div>
const Carts = styled.div`
	width: 500px;
	margin: 50px auto;
    text-align: center;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid ${ PLColor };
    display:block;
`
const Btn = styled.div`
    background-image: linear-gradient(to left, ${ PColor }, ${ PVColor }) ;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px 4px 0 0;
    height: 46px;
    width: 100%;
`
const Titulo = styled.h4`
    color: ${ BGColor };
	bottom: -7px;
	position: relative;
	width: 100%;
`
const Span = styled.span`
    bottom: 18px;
    display: flex;
    cursor: pointer;
    color: ${ BGColor };
    flex: 0.5;
    justify-content: flex-end;
    margin-right: 5%;
    position: relative;
`
const Desp = styled.div`
    padding-top: 11px;
    font-weight: 1000;
    color: ${ SFColor };
    border-bottom: solid 1px ${ PLColor };
    height: auto;
    margin: auto;
    padding-bottom: 10px;
    -webkit-box-pack: center;
    text-align: center;
    cursor: pointer;
    width: 96%;
`
const Options = styled.div`
    display:flex;
    -ms-flex-line-pack: end;
    border-bottom: solid 1px ${ PLColor };
    height: auto;
    margin: auto;
    padding: 5px 5px;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    width: 96%;
`
const DespIcon = styled.div`
    font-size: 15px;
    padding-top: 11px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    left: -13px;
    flex: auto;
    padding-left: 120px;
    border-right: 1px solid  ${ PLColor };
`
const DespRechazado = styled.div`
    padding-top: 20px;
    color:${ PLColor };
    height:  auto;
    margin: auto;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    border-bottom: solid 1px ${ PLColor };
    width: 96%;
    border-radius: 3px 3px 0px 3px;
`
const H6PR = styled.h6`
     margin-bottom: 10px;
`
const Good = styled.div`
    width: 500px;
	margin: 50px auto;
    text-align: center;
    display:block;
`
const Button = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    color: ${ BGColor };
    height: 25px;
    width: 80px;
    border-radius: 5px;
    margin: 30px;
    background-color:${ PColor };
    border-bottom: solid 1px ${ PLColor };
`
const OptionsInput = styled.div`
    display:flex;
    padding-top: 20px;
    font-weight: 1000;
    border-bottom: solid 1px ${ PLColor };
    height: auto;
    margin: auto;
    padding-bottom: 10px;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    width: 96%;
`
const InputIcon = styled.input`
align-content: flex-end;
        display: flex;
        border: none;
        width: inherit;
        outline: none;
        padding-bottom: 5px;

`
const CodeIcon = styled.div`
text-align: center;
    justify-content: center;
    cursor: pointer;
    height: 30px;
    width: 30px;
    margin: 7px 76px 1px 14px;

`
const CodeCodeQr = styled.div`
text-align: center;
    justify-content: center;
    cursor: pointer;
    margin: 7px 76px 1px 14px;
    height: 30px;
    width: 30px;
`