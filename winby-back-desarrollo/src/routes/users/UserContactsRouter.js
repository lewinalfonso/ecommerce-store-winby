const express = require('express')
const router = express.Router()
const UserContactsController = require('../../controllers/users/UserContactsController')

/** Listar */
router.post('/search/all', UserContactsController.getAll)
/** Registro */
router.post('/register', UserContactsController.register)
/** Cambiar estado */
router.post('/change/state', UserContactsController.changeState)

module.exports = router