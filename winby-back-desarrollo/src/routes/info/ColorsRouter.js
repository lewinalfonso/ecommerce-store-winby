const express = require('express')
const router = express.Router()
const ColorsController = require('../../controllers/info/ColorsController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:c_id/:c_state', ColorsController.getOne)
/** busca todo los registro */
router.get('/search/all/:c_state', ColorsController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', ColorsController.register)
/** editar */
router.post('/edit', ColorsController.edit)
/** cambiar de estado */
router.post('/change/state', ColorsController.changeState)
/** END POST */

module.exports = router