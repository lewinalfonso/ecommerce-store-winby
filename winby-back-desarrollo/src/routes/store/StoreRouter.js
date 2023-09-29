const express = require('express')
const router = express.Router()
const StoreKitsController = require('../../controllers/store/StoreKitsControlers')

// Obtiene todos los kits configurados.
router.post('/search/all', StoreKitsController.getAll)
// Registra un kit en la tienda
router.post('/register', StoreKitsController.register)
// Edita las propiedades del kit
router.post('/update', StoreKitsController.updateName)
// Registra un item a un kit existente
router.post('/register/item', StoreKitsController.registerItem)
// Elimina un kit completo
router.post('/delete', StoreKitsController.deleteAll)
// Elimina un item de un kit
router.post('/delete/item', StoreKitsController.deleteItem)

module.exports = router