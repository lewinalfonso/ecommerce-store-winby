'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// import o requisitos
const express = require('express')
const morgan = require('morgan')
const app = express()
const BodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Links = require('./utils/Links')
Links()

// configuracion de puerto
app.set('port', process.env.PORT || 3001)

// Middlewares
app.use(morgan('dev'))
app.use(BodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET_KEY || 'B2EE2E811317D6AAF902646FED7A72A2'))

// Accept all origins
const corsOptions = {
    origin: (_origin, callback) => callback(null, true),
    credentials: true
}
app.use(cors(corsOptions))

app.use(BodyParser.urlencoded({ extended: true }))
/** Ruta estaticas */
app.use('/static', express.static('public'))

// Ruta de transportes
app.use('/transporters', require('./routes/transporters/TransportersRouter'))
// rutas info
app.use('/info/country', require('./routes/info/CountriesRouter'))
app.use('/info/department', require('./routes/info/DepartmentsRouter'))
app.use('/info/municipality', require('./routes/info/MunicipalitiesRouter'))
app.use('/info/accounts', require('./routes/info/AccountTypesRouter'))
app.use('/info/banks', require('./routes/info/TypeBanksRouter'))
app.use('/info/cryptocurrencies', require('./routes/info/TypeCryptocurrenciesRouter'))
app.use('/info/identitys', require('./routes/info/TypeIdentitysRouter'))
app.use('/info/addres', require('./routes/info/TypeAddresRouter'))
app.use('/info/categories', require('./routes/info/CategoriesRouter'))
app.use('/info/colors', require('./routes/info/ColorsRouter'))
app.use('/info/genders', require('./routes/info/GendersRouter'))
app.use('/info/imghome', require('./routes/info/ImgHomeRouter'))
app.use('/info/seles', require('./routes/info/InfoSelesRouter'))
app.use('/info/attributes', require('./routes/info/TypeAttributesRouter'))
app.use('/info/advertisings', require('./routes/info/InfoAdvertisingsRouter'))
app.use('/info/map', require('./routes/info/MapsRouter'))
app.use('/info/delivery', require('./routes/info/TypeDeliveryCostsRouter'))
app.use('/info/banners', require('./routes/info/GeneralBannersRouter'))
app.use('/info/type/manager', require('./routes/info/TypeManagersRouter'))
app.use('/info/pqr', require('./routes/info/helpPQRRouter'))
/** usuario */
app.use('/user', require('./routes/users/UsersRouter'))
/** factura */
app.use('/facture', require('./routes/facture/FactureFranchisesRouter'))
/** Productos */
app.use('/products', require('./routes/products/ProductsRouter'))
/** Proveedores */
app.use('/vendor', require('./routes/vendors/VendorsRouter'))
/** Prestadores */
app.use('/provider', require('./routes/providers/ProvidersRouter'))
/** Servicios */
app.use('/services', require('./routes/services/ServicesRouter'))
/** Categorias */
app.use('/categoryservices', require('./routes/categories/CategoriesServicesRouter'))
app.use('/categoryproducts', require('./routes/categories/CategoriesProductsRouter'))
/** Factura */
app.use('/invoices', require('./routes/invoice/InvoicesRouter'))
/** Buscador */
app.use('/search', require('./routes/search/SearchRouter'))
/** Reportes */
app.use('/reports', require('./routes/reports/AdminMoneyReportsRouter'))

/** Tienda (Store config) */
app.use('/store/kits', require('./routes/store/StoreRouter'))

/**
 * Carrito de compras
 */
app.use('/cart', require('./routes/shoppingCart/ShoppingCartRouter'))

// Reportes
app.use('/reports/flatfile', require('./routes/reports/TransporterDeliveringReports'))

app.use('/', (req, res) => {
    res.send('WOW!')
})

app.listen(app.get('port'), () => { })