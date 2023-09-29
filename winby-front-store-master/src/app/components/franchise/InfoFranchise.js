import React from 'react'
import Header from './SeccionInicio'
import Descripcion from './Descripcion'
import MarketingDigital from './MarketingDigital'
import MarketingMultinivel from './MarketingMultinivel'
import Franquisiados from './Franquiciados'
import ServiciosW from './ServiciosWinby'
import Invertir from './IvertirW'
import Productosyservicios from './ProductosServicios'
import { NavHeader, Punt, Bodytitle, H2 } from './Styled'

export default ({ handleClick }) => <>
    <Header/>
    <Bodytitle>
        <NavHeader width='100%' shadow='0 0 7px 3px #00000020'>
            <H2 position='relative' fontsize='30px' alignitems='center'>¿QUÉ ES LA LICENCIA WINBY?</H2>
        </NavHeader>
        <Punt/>
    </Bodytitle>
    <Descripcion handleClick={handleClick}/>
    <Titulo label='¿QUÉ TIPOS DE MARKETING PODRÁS DESARROLLAR EN WINBY?'/>
    <MarketingDigital/>
    <MarketingMultinivel handleClick={handleClick} />
    <Titulo label='¿PARA QUIÉN ES LA LICENCIA WINBY?'/>
    <Franquisiados/>
    <Titulo label='¿QUÉ TE OFRECE LA LICENCIA WINBY?'/>
    <ServiciosW handleClick={handleClick}/>
    <Titulo label='¿POR QUÉ INVERTIR EN LA LICENCIA WINBY?'/>
    <Invertir/>
    <Productosyservicios handleClick={handleClick}/>
</>

const Titulo = ({ label }) => (
    <NavHeader>
        <H2 textAlign='center'>{label}</H2>
    </NavHeader>
)