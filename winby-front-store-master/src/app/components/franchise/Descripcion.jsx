import React from 'react'
import infoLicenciaWinby from '../../../assets/img/infoLicenciaWinby.png'
import { Card, Span, Btn, ContainerMain, Img, ImgBg, BodyBtn } from './Styled'
import textureLicenseTwo from '../../../assets/icons/textureLicenseTwo.svg'

export default ({ handleClick }) =>(
    <ContainerMain res grid='1.7fr 1fr'>
        <ImgBg src={textureLicenseTwo} />
        <Card>
            <Span display='block' size='16px' weight='500'>La licencia Winby es tu propia tienda virtual dentro de nuestra plataforma. Donde Tendras miles de productos y servicios en multiples categorías a tu disposicion para que puedas vender los productos que mas se ajusten a tu perfil y a tus gustos</Span>
            <Span display='block' size='20px'>No es necesario tener conocimientos previos porque te enseñaremos paso a paso y desde cero a vender productos por internet.</Span>
            <BodyBtn>
                <Btn margin={window.screen.width > 768 && '120px auto 10px'} onClick={handleClick}>Comienza AHORA</Btn>
            </BodyBtn>
        </Card>
        <Img width={window.screen.width <= 768 ? '360px':'400px'} float='right' height={window.screen.width <= 768 ? '390px':'471px'} src={infoLicenciaWinby} />
    </ContainerMain>
)