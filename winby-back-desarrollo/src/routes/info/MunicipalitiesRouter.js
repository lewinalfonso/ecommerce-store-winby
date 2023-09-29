const express = require('express')
const router = express.Router()
const MunicipalitiesController = require('../../controllers/info/MunicipalitiesController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:m_id/:m_state', MunicipalitiesController.getOne)
/** busca todo los registro */
router.get('/search/all/:d_id/:m_state', MunicipalitiesController.getAll)
router.post('/search/all/v2', MunicipalitiesController.getAllV2)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', MunicipalitiesController.register)
/** editar */
router.post('/edit', MunicipalitiesController.edit)
/** cambiar de estado */
router.post('/change/state', MunicipalitiesController.changeState)
/** END POST */

module.exports = router