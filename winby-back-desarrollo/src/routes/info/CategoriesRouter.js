const express = require('express')
const router = express.Router()
const CategoriesController = require('../../controllers/info/CategoriesController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:c_id/:c_state', CategoriesController.getOne)
/** busca todo los registro */
router.get('/search/all/:c_state', CategoriesController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', CategoriesController.register)
/** editar */
router.post('/edit', CategoriesController.edit)
/** cambiar de estado */
router.post('/change/state', CategoriesController.changeState)
/** END POST */

module.exports = router