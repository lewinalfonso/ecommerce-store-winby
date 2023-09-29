const express = require('express')
const router = express.Router()
const HelpPQRController = require('../../controllers/info/HelpPQRController')

/** API POST */
// Obtiene todos los typos de pqr
router.post('/types/search/all', HelpPQRController.getAllTypes)
// Obtiene todos los pqr
router.post('/search/all', HelpPQRController.getAll)
// Obtiene un pqr
router.post('/search/one', HelpPQRController.getOne)
// Registra o edita un pqr
router.post('/register', HelpPQRController.registerOrEdit)
// Cambia el estado de un pqr
router.post('/update/state', HelpPQRController.changeState)

module.exports = router