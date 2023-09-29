const express = require('express')
const router = express.Router()
const CategoriesProductsController = require('../../controllers/categories/CategoriesProductsController')
const SubCategoryProductsController = require('../../controllers/categories/SubCategoryProductsController')
const AttributeSubCategoryProductsController = require('../../controllers/categories/AttributeSubCategoryProductsController')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

/** CATEGORIA */
/** Busca a un solo registro */
router.post('/search/one', CategoriesProductsController.getOne)
/** Busca todo los registro */
router.post('/search/all', CategoriesProductsController.getAll)
/** Registro o Editar */
router.post('/register', multer({ storage }).array('files'), CategoriesProductsController.register)
/** Cambiar estado */
router.post('/delete', CategoriesProductsController.delete)
/** FIN DE CATEGORIA */

/** SUB CATEGORIA */
/** Busca a una sub categoria */
router.post('/sub/search/all', SubCategoryProductsController.getAllSubCat)
/** Busca a una sub categoria */
router.post('/sub/search/one', SubCategoryProductsController.getOneSubCat)
/** cambiar a estado apagado sub categoria */
router.post('/sub/delete', SubCategoryProductsController.deleteSubCat)
/** FIN DE SUB CATEGORIA */

/** TIPO DE CATEGORIA */
/** busca todo los atributos de la sub categoria */
router.post('/sub/attribute/search/all', AttributeSubCategoryProductsController.getAllAttSubCat)
/** busca un atributo de la sub categoria */
router.post('/sub/attribute/search/one', AttributeSubCategoryProductsController.getOneAttSubCat)
/** cambiar a estado apagado atributo de la sub categoria */
router.post('/sub/attribute/delete', AttributeSubCategoryProductsController.deleteAttSubCat)
/** cambiar a estado apagado tipo de atributo de la sub categoria */
router.post('/sub/attribute/type/delete', AttributeSubCategoryProductsController.deleteTypAttSubCat)
/** FIN DE TIPO DE CATEGORIA */

module.exports = router