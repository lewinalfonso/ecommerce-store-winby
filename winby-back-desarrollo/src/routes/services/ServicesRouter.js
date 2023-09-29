const express = require('express')
const router = express.Router()
const ServicesController = require('../../controllers/services/ServicesController')
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

/** API GET */
/** Busca los servicio por categoria */
router.get('/category/search/all/sub/:scs_id', ServicesController.getAllSerSubCat)
/** END GET */

/** API POST */
/** busca un solo servicio */
router.post('/search/one', ServicesController.getOne)
/** busca todo los servicios */
router.post('/search/all', ServicesController.getAll)
/** busca todos los servicios similares */
router.post('/search/all/similar', ServicesController.getAllSimilar)
/** Registro de servicio */
router.post('/register', ServicesController.register)
/** Registra la foto de perfil del servicio */
router.post('/register/photo', multer({ storage }).array('files'), ServicesController.registerPhoto)

/** Contador de Vistas */
router.post('/views/:s_id', ServicesController.viewSer)

/** Confirmar un Servicio */
router.post('/confirm', ServicesController.confirm)
/** Cancelar un Servicio */
router.post('/cancel', ServicesController.cancel)

/** Agenda de servicio */

/** Registra o edita la agenda de un servicio */
router.post('/calendar', ServicesController.getCalendar)
router.post('/calendar/register', ServicesController.registerCalendar)
/** END POST */

module.exports = router