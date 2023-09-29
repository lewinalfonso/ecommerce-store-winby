const express = require('express')
const router = express.Router()
const UserBankEntitiesController = require('../../controllers/users/UserBankEntitiesController')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

/** API GET */
/** Busca la información de un Usuario relacionado a una entidad Bancaria */
router.get('/search/one/:ube_id/:ube_state', UserBankEntitiesController.getOne)
/** Busca la información de todos los Usuarios relacionado a las entidades Bancarias */
router.get('/search/all/:ube_state', UserBankEntitiesController.getAll)
/** END GET */

/** API POST */
/** Registra un Usuario a una entidad Bancaria */
router.post('/register', UserBankEntitiesController.register)
/** END POST */

module.exports = router