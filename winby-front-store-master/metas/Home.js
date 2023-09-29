const express = require('express')
const router = express.Router()
const { resolve } = require('path')
const { readFileSync } = require('fs-extra')
const { url, indexExport } = require('../utils')

module.exports = router.get('/*', async (req, res) => {
    try {
        const filePath = resolve(__dirname, `../public/${req.originalUrl}`)
        await readFileSync(filePath, 'utf8')
        res.sendFile(resolve(__dirname, `../public/${req.originalUrl}`))
    } catch (error) {
        indexExport(req, res, url)
    }
})