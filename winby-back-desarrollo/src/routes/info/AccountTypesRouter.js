const express = require('express')
const router = express.Router()
const AccountTypesController = require('../../controllers/info/AccountTypesController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:at_id/:at_state', AccountTypesController.getOne)
/** busca todo los registro */
router.get('/search/all/:at_state', AccountTypesController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', AccountTypesController.register)
/** editar */
router.post('/edit', AccountTypesController.edit)
/** cambiar de estado */
router.post('/change/state', AccountTypesController.changeState)
/** END POST */

module.exports = router