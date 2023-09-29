const express = require('express')
const router = express.Router()
const TypeBanksController = require('../../controllers/info/TypeBanksController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:tb_id/:tb_state', TypeBanksController.getOne)
/** busca todo los registro */
router.get('/search/all/:tb_state', TypeBanksController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', TypeBanksController.register)
/** editar */
router.post('/edit', TypeBanksController.edit)
/** cambiar de estado */
router.post('/change/state', TypeBanksController.changeState)
/** END POST */

module.exports = router