const express = require('express')
const router = express.Router()
const CategoriesServicesController = require('../../controllers/categories/CategoriesServicesController')
const SubCategoryServicesController = require('../../controllers/categories/SubCategoryServicesController')
const AttributeSubCategoryServicesController = require('../../controllers/categories/AttributeSubCategoryServicesController')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

/** CATEGORIA */
/** Busca a una categoria */
router.post('/search/one', CategoriesServicesController.getOne)
/** Busca todas las categorias */
router.post('/search/all', CategoriesServicesController.getAll)
/** Registro o Editar */
router.post('/register', multer({ storage }).array('files'), CategoriesServicesController.register)
/** cambiar a estado apagado categoria */
router.post('/delete', CategoriesServicesController.delete)
/** FIN DE CATEGORIA */

/** SUB CATEGORIA */
/** Busca a una sub categoria */
router.post('/sub/search/one', SubCategoryServicesController.getOneSubCat)
/** Busca a una sub categoria */
router.post('/sub/search/all', SubCategoryServicesController.getAllSubCat)
/** cambiar a estado apagado sub categoria */
router.post('/sub/delete', SubCategoryServicesController.deleteSubCat)
/** FIN DE SUB CATEGORIA */

/** TIPO DE CATEGORIA */
/** busca todo los atributos de la sub categoria */
router.post('/sub/attribute/search/all', AttributeSubCategoryServicesController.getAllAttSubCat)
/** busca un atributo de la sub categoria */
router.post('/sub/attribute/search/one', AttributeSubCategoryServicesController.getOneAttSubCat)
/** cambiar a estado apagado atributo de la sub categoria */
router.post('/sub/attribute/delete', AttributeSubCategoryServicesController.deleteAttSubCat)
/** cambiar a estado apagado tipo de atributo de la sub categoria */
router.post('/sub/attribute/type/delete', AttributeSubCategoryServicesController.deleteTypAttSubCat)
/** FIN DE TIPO DE CATEGORIA */

module.exports = router