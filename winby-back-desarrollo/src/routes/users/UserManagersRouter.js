const express = require('express')
const router = express.Router()
const UserManagersController = require('../../controllers/users/UserManagersController')

// Buscar todos
router.post('/search/all', UserManagersController.getAll)
// Registro
router.post('/register', UserManagersController.register)
// Eliminar
router.post('/delete', UserManagersController.delete)

module.exports = router