const express = require('express')
const { url } = require('./utils')
const router = express.Router()

router.post('/detalles/:id', async (req, res) => {
    res.redirect(`${url}/compra/detalles/${req.params.id}`)
})

module.exports = router