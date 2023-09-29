const express = require('express')
const router = express.Router()
const TypeCryptocurrenciesController = require('../../controllers/info/TypeCryptocurrenciesController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:tc_id/:tc_state', TypeCryptocurrenciesController.getOne)
/** busca todo los registro */
router.get('/search/all/:tc_state', TypeCryptocurrenciesController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', TypeCryptocurrenciesController.register)
/** editar */
router.post('/edit', TypeCryptocurrenciesController.edit)
/** cambiar de estado */
router.post('/change/state', TypeCryptocurrenciesController.changeState)
/** END POST */

module.exports = router