const express = require('express')
const router = express.Router()
const TypeDeliveryCostsController = require('../../controllers/info/TypeDeliveryCostsController')

/** API POST */

// Busca todos los tipos de costo de envios
router.post('/search/all', TypeDeliveryCostsController.getAll)

module.exports = router