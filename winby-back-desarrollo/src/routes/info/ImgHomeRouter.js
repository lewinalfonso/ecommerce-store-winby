const express = require('express')
const router = express.Router()
const ImgHomeController = require('../../controllers/info/ImgHomeController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, new Date().getTime() + path.extname(file.originalname))
    }
})

/** API GET */
/** busca todo los registro */
router.post('/search/all', ImgHomeController.getAll)
/** END GET */

/** API POST */
/** Registro */
router.post('/register', multer({ storage }).single('file'), ImgHomeController.register)
/** END POST */

module.exports = router