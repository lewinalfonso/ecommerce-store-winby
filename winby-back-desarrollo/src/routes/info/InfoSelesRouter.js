const express = require('express')
const router = express.Router()
const InfoSelesController = require('../../controllers/info/InfoSelesController')

/** API GET */
/** busca el registro de información activo */
router.get('/search/info', InfoSelesController.getInfo)
/** POST */
/** editar datos */
router.post('/edit/info', InfoSelesController.edit)

module.exports = router