const express = require('express')
const router = express.Router()
const DepartmentsController = require('../../controllers/info/DepartmentsController')

/** API GET */
/** busca un solo registro */
router.get('/search/one/:d_id/:d_state', DepartmentsController.getOne)
/** busca todo los registro */
router.get('/search/all/:c_id/:d_state', DepartmentsController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', DepartmentsController.register)
/** editar */
router.post('/edit', DepartmentsController.edit)
/** cambiar de estado */
router.post('/change/state', DepartmentsController.changeState)
/** END POST */

module.exports = router