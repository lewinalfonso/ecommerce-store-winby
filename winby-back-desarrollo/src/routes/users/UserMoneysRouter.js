const express = require('express')
const router = express.Router()
const UserMoneysController = require('../../controllers/users/UserMoneysController')

/** API POST */
/** Muestra la cantidad de Dinero que posee un Usuario */
router.get('/search/one/:u_id/:um_state', UserMoneysController.getOne)
/** END POST */

/** API POST */
/** END POST */

module.exports = router