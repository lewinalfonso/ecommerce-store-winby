const express = require('express')
const router = express.Router()
const GendersController = require('../../controllers/info/GendersController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:g_id/:g_state', GendersController.getOne)
/** busca todo los registro */
router.get('/search/all/:g_state', GendersController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', GendersController.register)
/** editar */
router.post('/edit', GendersController.edit)
/** cambiar de estado */
router.post('/change/state', GendersController.changeState)
/** END POST */

module.exports = router