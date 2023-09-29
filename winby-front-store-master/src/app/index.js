import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
/* traduccion  */
import '../app/i18n'
/** Styles, estos estilos son necesarios para el funcionamiento de algunos componentes externos instalados
 *  Lo estilos de los componentes internos están escritos todos en styled-components
 */
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/** Layout from page */
import Layout from './pages/Layout'

/** vistas */
import Home from './pages/Home'

import Login from './pages/login/Login'
import RegisterLogin from './pages/login/Register'
import RecoverAccount from './pages/login/RecoverAccount'
import RegisterOrLogin from './pages/login/RegisterOrLogin'
import Categories from './pages/categories'
// import CategoryItems from './pages/categories/CategoryItems'
import { CategoryItemsPage } from './pages/categories'
import Items from './pages/items'
import DetailServices from './pages/items/DetailServices'
import DetailProducts from './pages/items/Details'
import ListItems from './pages/items/List'
import RegisterFranchise from './pages/franchise/Register'
import VendorsRegister from './pages/vendors/Register'
import Vendors from './pages/vendors'
import VendorsItems from './pages/vendors/Items'
import Infofranchise from './pages/franchise/Infofranchise'
import Store from './pages/franchise/Store'
import InvoiceDetail from './pages/invoices/Detail'
import ShoppingCart from './pages/ShoppingCart'
import Search from './pages/seacher'
import landingPage from './pages/landingPage'
import wallet from './pages/wallet'
import Contactos from './components/Contactos/Contactos'
import Politics from './components/Politics/Politics'
import Franchise from './components/Politics/Franchise'
import PolitiscDates from './components/Politics/politicsdates'
import InfoModal from './components/InfoModal/InfoModal'
import Confirmacion from './pages/vendors/Confirmacion'
import AbousV from './pages/aboutus/index'
import Oportunities from './pages/aboutus/Oportunities'
import Allies from './pages/aboutus/Allies'
import LicensePage from './pages/landingPage/LicensePage'
import WhatIsPage from './pages/landingPage/WhatIsPage'
import SalesPage from './pages/landingPage/SalesPage'
import Products from './pages/aboutus/products'
import HelpPqrV from './pages/ayudapqr/index'

/* Metodos de pago nuevas vistas */
import { Purchase } from './components/purchasingProcess'
import { PaymentMethod } from './components/purchasingProcess/selectionpay'
import { ConfirmCourData } from './components/purchasingProcess/confirmCourData'
import { NewLocation } from './components/purchasingProcess/newLocation'
import { ChangeBillData } from './components/purchasingProcess/ChangeBillData'
import { StatePurchase } from './components/purchasingProcess/statePurchasing'
import DatesFacturesV from './pages/shooppingCart/datesfactures'
/* import  imgZoom from './components/imgZoom/imgZoom' */

/** otros */
import ViewSVG from './pages/ViewSVG'
import ContextModal from './common/modal/ContextModal'

// Nuevo proceso de compra
// import { Cart } from './pages/ShoppingCart/index'

import withClearCache from './ClearCache'

function App() {
    return (<BrowserRouter>
        <Helmet>
            <title>Winby</title>
        </Helmet>
        <Switch>
            <Route exact path='/icons' component={ViewSVG} />
            <Route exact path='/pagina-informacion/:code?' component={AbousV} />
            <Route exact path='/pagina-informacion/oportunidad/:code?' component={Oportunities} />
            <Route exact path='/pagina-informacion/aliados/:code?' component={Allies} />
            <Route exact path='/pagina-informacion/productos/:code?' component={Products} />

            <Route>

                <ContextModal.Provider>
                    <Layout>
                        <Route exact path='/' component={Home} />
                        {/** Buscador */}
                        <Route exact path='/busqueda/:search' component={Search} />
                        {/* Login Pages */}
                        <Route exact path='/user/login' component={Login} />
                        <Route exact path='/user/registro' component={RegisterLogin} />
                        <Route exact path='/user/recuperar-cuenta' component={RecoverAccount} />
                        <Route exact path='/usuario/cuenta' component={RegisterOrLogin} />
                        {/* Store */}
                        <Route exact path='/store/:code' component={Store} />
                        <Route exact path='/articulos/:code' Correo electrónico component={Items} />
                        <Route exact path='/leads/:code' component={LicensePage} />
                        <Route exact path='/MQL/:code' component={WhatIsPage} />
                        <Route exact path='/SQLM/:code' component={landingPage} />
                        <Route exact path='/aliados-comerciales/:code' component={SalesPage} />
                        <Route exact path='/info-licencia' component={Infofranchise} />
                        {/* Ayudapqr */}
                        <Route exact path='/ayuda/pqr' component={HelpPqrV} />
                        {/* categoria   */}
                        <Route exact path='/categorias' component={Categories} />
                        <Route exact path='/licencia/registro' component={RegisterFranchise} />
                        {/* servicios   */}
                        {/* <Route exact path='/servicios/categorias/:id/:mode?' render={props => <CategoryItems {...props} page={3} />} /> */}
                        <Route exact path='/servicios/categorias/:id' component={props => <CategoryItemsPage {...props} type='services' />} />
                        <Route exact path='/servicios/detalles/:id/:code?' render={props => <DetailServices {...props} />} />
                        {/* productos   */}
                        {/* <Route exact path='/productos/categorias/:id/:mode?' render={props => <CategoryItems {...props} page={4} />} /> */}
                        <Route exact path='/productos/categorias/:id' component={props => <CategoryItemsPage {...props} type='products' />} />
                        <Route exact path='/productos/detalles/:id/:code?' component={props => <DetailProducts {...props} />} />
                        {/** factura */}
                        <Route exact path='/compra/detalles/:id' component={InvoiceDetail} />
                        {/* Aliados Comerciales */}
                        <Route exact path='/aliados' component={Vendors} />
                        <Route exact path='/aliados/registro/:code?' component={VendorsRegister} />
                        <Route exact path='/aliados/detalle/:id' component={VendorsItems} />
                        {/** Generales */}
                        <Route exact path='/ofertas' component={props => <ListItems {...props} type={1} />} />
                        <Route exact path='/populares' component={props => <ListItems {...props} type={2} />} />
                        {/** Carrito de compras */}
                        <Route exact path='/carrito' component={ShoppingCart} />
                        <Route exact path='/billetera' component={wallet} />
                        {/* Proceso de compras ---Nuevo-- */}
                        <Route exact path='/proceso-de-compras' component={Purchase} />
                        <Route exact path='/proceso-de-compras/payment-method' component={PaymentMethod} />
                        <Route exact path='/proceso-de-compras/confirmar-informacion' component={ConfirmCourData} />
                        <Route exact path='/proceso-de-compras/registrar-nueva-ubicacion' component={NewLocation} />
                        <Route exact path='/proceso-de-compras/cambiar-datos-de-factura' component={ChangeBillData} />
                        <Route exact path='/estado-de-compra' component={StatePurchase} />
                        <Route exact path='/datos-de-facturacion' component={DatesFacturesV} />
                        {/* * Counter */}
                        <Route exact path='/contactos' component={Contactos} />
                        <Route exact path='/terminos-condiciones' component={Politics} />
                        <Route exact path='/politicas-de-proteccion-de-datos' component={PolitiscDates} />
                        <Route exact path='/contrato-licencia' component={Franchise} />
                        <Route export path='/InfoModalV' component={InfoModal} />
                        <Route exact path='/vendors/confirmacion' component={Confirmacion} />
                        {/* * Counter */}
                        {/* <Route component={NotFound}/> */}
                        {/* Nuevo proceso de compra */}
                        {/* <Route exact path='/cart-items' component={Cart} /> */}
                    </Layout>
                </ContextModal.Provider>
            </Route>
        </Switch>
    </BrowserRouter>
    )
}

const ClearCacheComponent = withClearCache(App)

export default () => <ClearCacheComponent />