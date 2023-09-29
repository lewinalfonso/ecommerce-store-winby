const express = require('express')
const router = express.Router()
const TypeManagersController = require('../../controllers/info/TypeManagersController')

/** API POST */

// Busca todos los tipos de costo de envios
router.post('/search/all', TypeManagersController.getAll)

module.exports = router