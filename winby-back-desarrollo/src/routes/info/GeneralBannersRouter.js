'use strict'

const express = require('express')
const router = express.Router()
const GeneralBannersController = require('../../controllers/info/GeneralBannersController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

// Registra un banner
router.post('/register', multer({ storage }).array('file', 2), GeneralBannersController.register)
// Obtiene todos los banners
router.post('/search/all', GeneralBannersController.getAll)
// Elimina un banner
router.post('/delete', GeneralBannersController.delete)
// Organiza los banners
router.post('/organized', GeneralBannersController.organized)

module.exports = router