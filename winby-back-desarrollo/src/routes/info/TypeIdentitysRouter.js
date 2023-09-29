const express = require('express')
const router = express.Router()
const TypeIdentitysController = require('../../controllers/info/TypeIdentitysController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:ti_id/:ti_state', TypeIdentitysController.getOne)
/** busca todo los registro */
router.get('/search/all/:ti_state', TypeIdentitysController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', TypeIdentitysController.register)
/** editar */
router.post('/edit', TypeIdentitysController.edit)
/** cambiar de estado */
router.post('/change/state', TypeIdentitysController.changeState)
/** END POST */

module.exports = router