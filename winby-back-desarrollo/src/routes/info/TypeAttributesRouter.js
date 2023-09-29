const express = require('express')
const router = express.Router()
const TypeAttributesController = require('../../controllers/info/TypeAttributesController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:ta_id/:ta_state', TypeAttributesController.getOne)
/** busca todo los registro */
router.get('/search/all/:ta_state', TypeAttributesController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', TypeAttributesController.register)
/** editar */
router.post('/edit', TypeAttributesController.edit)
/** cambiar de estado */
router.post('/change/state', TypeAttributesController.changeState)
/** END POST */

module.exports = router