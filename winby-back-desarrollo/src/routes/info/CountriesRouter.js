const express = require('express')
const router = express.Router()
const CountriesController = require('../../controllers/info/CountriesController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:c_id/:c_state', CountriesController.getOne)
/** busca todo los registro */
router.get('/search/all/:c_state', CountriesController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', CountriesController.register)
/** editar */
router.post('/edit', CountriesController.edit)
/** cambiar de estado */
router.post('/change/state', CountriesController.changeState)
/** END POST */

module.exports = router