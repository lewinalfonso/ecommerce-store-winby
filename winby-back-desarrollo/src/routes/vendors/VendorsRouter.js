const express = require('express')
const router = express.Router()
const VendorCategoriesProductsController = require('../../controllers/vendors/VendorCategoriesProductsController')
const VendorCategoriesServicesController = require('../../controllers/vendors/VendorCategoriesServicesController')
const VendorsController = require('../../controllers/vendors/VendorsController')

/** API GET */
/** Buscar un local */
router.get('/local/search/one/:vl_id/:vl_state', VendorsController.getOneLocal)
/** Buscar todos los locales */
router.get('/local/search/all/:v_id/:vl_state/:all?', VendorsController.getAllLocal)
/** Busca las categorias de servicios para el vendedor */
router.post('/services/categories/search/all', VendorCategoriesServicesController.getAllCatSer)
/** Busca la categoria de servicio para el vendedor */
router.post('/services/categories/search/one', VendorCategoriesServicesController.getOneCatSer)
/** Busca las sub categorias de productos para el vendedor */
router.post('/services/categories/sub/search/all', VendorCategoriesServicesController.getAllSubCatPro)
/** Busca las categorias de productos para el vendedor */
router.post('/products/categories/search/all', VendorCategoriesProductsController.getAllCatPro)
/** Busca la categoria de producto para el vendedor */
router.post('/products/categories/search/one', VendorCategoriesProductsController.getOneCatPro)
/** Busca las sub categorias de productos para el vendedor */
router.post('/products/categories/sub/search/all', VendorCategoriesProductsController.getAllSubCatPro)
/** Devuelve una lista de 20 Aliados Comerciales Aleatorios */
router.get('/search/twenty/:v_state', VendorsController.getTwenty)
/** END GET */

/** API POST */
/** Buscar los vendedores */
router.post('/search/all', VendorsController.getAllVendors)
/** Buscar el vendedor */
router.post('/search/one', VendorsController.getOneVendors)
/** Actualizar estado */
router.post('/change/state', VendorsController.changeStatusVendor)
/** Buscar info legal del vendedor */
router.post('/legal/search/one', VendorsController.getOneLegalVendor)
/** Buscar documentos legal del vendedor */
router.post('/legal/documents/search/all', VendorsController.getAllDocVendorLegal)
/** Registrar Local */
router.post('/local/register', VendorsController.registerLocal)
/** Editar Local */
router.post('/local/edit', VendorsController.editLocal)
/** Registrar Categoria de Servicio */
router.post('/services/categories/register', VendorCategoriesServicesController.registerCatSer)
/** Eliminar Categoria de Servicio */
router.post('/services/categories/delete', VendorCategoriesServicesController.deleteCatSer)
/** Registrar Categoria de Productos */
router.post('/products/categories/register', VendorCategoriesProductsController.registerCatPro)
/** Eliminar Categoria de Productos */
router.post('/products/categories/delete', VendorCategoriesProductsController.deleteCatPro)

/** Ultils */
// Actilizar los menus de los usuarios
router.post('/update/menu', VendorsController.upateMenuUsers)

/** END POST */

module.exports = router