const express = require('express')
const router = express.Router()
const ProvidersController = require('../../controllers/providers/ProvidersController')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, new Date().getTime() + path.extname(file.originalname))
    }
})

/** API GET */
/** busca un solo prestador */
router.get('/search/one/:p_id/:p_state', ProvidersController.getOne)
/** busca todo los prestadores */
router.get('/search/all/:v_id/:p_state/:all?', ProvidersController.getAll)
/** END GET */

/** API POST */
/** Registro de prestador */
router.post('/register',  ProvidersController.register)
/** Registra la foto de perfil del prestador */
router.post('/register/photo', multer({ storage }).single('p_photo'), ProvidersController.registerPhoto)
/** Registra los documentos del prestador */
router.post('/register/documents', multer({ storage }).array('files'), ProvidersController.registerDocuments)
/** END POST */

module.exports = router