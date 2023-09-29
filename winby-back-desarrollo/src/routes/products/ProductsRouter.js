const express = require('express')
const router = express.Router()
const ProductsController = require('../../controllers/products/ProductsController')
const ProductOffersController = require('../../controllers/products/ProductOffersController')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

/** API GET */
/** Busca los productos por categoria */
router.get('/category/search/all/sub/:scp_id', ProductsController.getAllProSubCat)
/** Busca los productos mas destacados por franquicia */
router.get('/search/outstanding/all/:p_outstanding', ProductsController.getOutStanding)
/** END GET */

/** API POST */
/** busca un solo registro */
router.post('/search/one', ProductsController.getOne)
/** busca todos los productos similares */
router.post('/search/all/similar', ProductsController.getAllSimilar)
/** busca todos los registro */
router.post('/search/all', ProductsController.getAll)
/** registro o editar un producto */
router.post('/register', ProductsController.register)
/** registro de los archivos de un producto */
router.post('/register/files', multer({ storage }).array('files'), ProductsController.registerDocuments)
/** registra un producto como destacado o franquicia */
router.post('/register/cover', multer({ storage }).single('file'), ProductsController.registerCover)
/** elimina un producto como destacado o franquicia */
router.post('/delete/cover', ProductsController.deleteCover)

/** Contador de Vistas */
router.post('/views/:p_id', ProductsController.viewPro)

// Marcar producto como agotado
router.post('/outstock', ProductsController.outOfStock)

/** Confirmar un Producto */
router.post('/confirm', ProductsController.confirm)
/** Cancelar un Producto */
router.post('/cancel', ProductsController.cancel)

// Agregar una fila de productos
router.post('/offers/register/row', ProductOffersController.register)
// Obtener todos los productos en oferta
router.post('/offers/search/all', ProductOffersController.getAll)
// Eliminar una fila de productos en oferta
router.post('/offers/delete/row', ProductOffersController.delete)
// Agregar productos a una fila existente
router.post('/offers/register/row/products', ProductOffersController.registerProductsRow)
// Elimina un producto de una fila existente
router.post('/offers/delete/row/product', ProductOffersController.deleteProductRow)
// Organiza los productos de una fila
router.post('/offers/organized/products', ProductOffersController.organizedItems)
/** END POST */

module.exports = router