import React from 'react'
import bgImg from '../../../assets/fondo_3.svg'
import { BodyBtn, ImgBgServices, Content, Btn, ListContain, Lists, Img } from './Styled'
import comunication from '../../../assets/icons/comunication.svg'

export default ({ handleClick }) => <>
    <Content grid='1.2fr 1fr' res>
        <ListContain>
            <Lists check fontsize='25px'>El uso de nuestra marca y la explotación de nuestro modelo de negocio.</Lists>
            <Lists check fontsize='25px'>Tu propia tienda virtual (donde podrás escoger los productos que quieres vender)</Lists>
            <Lists check fontsize='25px'>Tu propia billetera virtual de Winby (donde podrás transferir todas las utilidades que generes a tu cuenta bancaria ) tus transacciones están protegidas por nosotros.</Lists>
            <Lists check fontsize='25px'>Un completo sistema de administración en el que podrás hacer seguimiento a todas tus ventas y utilidades generadas</Lists>
            <Lists check fontsize='25px'>Un departamento logístico que pondrá los productos y servicios vendidosen manos de tus clientes sin que tengas que mover un solo dedo ni gastarun solo peso en logística, winby se encargara de eso.</Lists>
            <Lists check fontsize='25px'>Un sistema de capacitación, en las estrategias de marketing y ventas que desarrollamos, para que te conviertas en un gran vendedor y generes grandes ingresos.</Lists>
        </ListContain>
        <Img width='100%' src={comunication}/>
        <ImgBgServices src={window.screen.width <= 768 ? '' : bgImg}/>
    </Content>
    <BodyBtn>
        <Btn marginbottom='35px' onClick={handleClick}>Comienza AHORA</Btn>
    </BodyBtn>
</>