const express = require('express')
const router = express.Router()
const InvoicesController = require('../../controllers/invoice/InvoicesController')

/** API GET */
/** busca toda la información de una factura */
router.post('/search/one', InvoicesController.getOne)
/** Busca todas las facturas de un usuario */
router.post('/search/all', InvoicesController.getAllShopUser)
/** END GET */

/** API POST */
/** Busca todas las facturas de un vendedor */
router.post('/vendor/search/all', InvoicesController.getAllVendor)
/** Busca todos los productos de una factura */
router.post('/product/search/all', InvoicesController.getAllProducts)
/** Busca todos los servicios de una factura */
router.post('/service/search/all', InvoicesController.getAllServices)
/** Busca el cliente de una factura */
router.post('/client/search/one', InvoicesController.getOneClient)
/** Registro */
router.post('/register', InvoicesController.register)
/** confirmar por epayco */
router.post('/epayco/confirm', InvoicesController.confirmEpayco)
router.post('/wompi/confirm', InvoicesController.confirmWompi)
/** confirmar productos el vendedor */
router.post('/vendor/confirm', InvoicesController.confirmVendor)
/** Liquidación de puntos de red */
router.post('/liquidation/register', InvoicesController.registerLiquidations)
/** Busca toda las liquidaciónes registradas */
router.post('/liquidation/search/all', InvoicesController.getAllLiquidations)
/** Busca una liquidación */
router.post('/liquidation/search/one', InvoicesController.getOneLiquidations)
/** Liquidación de puntos de red */
router.post('/liquidation/search/all/user', InvoicesController.liquidationUsers)
// Cambiar estado de la orden
router.post('/vendor/change/status', InvoicesController.vendorChangeStatusOrder)
router.post('/vendor/count', InvoicesController.countVendorOrders)
router.post('/vendor/penaltycost', InvoicesController.getPenaltyCostVendor)
router.post('/vendor/search/all/v2', InvoicesController.getVendorOrders)
router.post('/vendor/search/all/orders', InvoicesController.getAllVendorOrders)
router.post('/vendor/search/one', InvoicesController.getVendorOrderDetail)
router.post('/vendor/confirm/v2', InvoicesController.vendorConfirmOrder)
/** END POST */

module.exports = router