const express = require('express')
const router = express.Router()
const InfoAdvertisingsController = require('../../controllers/info/InfoAdvertisingsController')

/** busca uno */
router.post('/search/one', InfoAdvertisingsController.getOne)
/** busca todos */
router.post('/search/all', InfoAdvertisingsController.getAll)
/** Registro */
router.post('/register', InfoAdvertisingsController.register)
/** END POST */

module.exports = router