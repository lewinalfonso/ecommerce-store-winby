const express = require('express')
const router = express.Router()
const TypeAddressController = require('../../controllers/info/TypeAddressController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:ta_id/:ta_state', TypeAddressController.getOne)
/** busca todo los registro */
router.get('/search/all/:ta_state', TypeAddressController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', TypeAddressController.register)
/** editar */
router.post('/edit', TypeAddressController.edit)
/** cambiar de estado */
router.post('/change/state', TypeAddressController.changeState)
/** END POST */

module.exports = router