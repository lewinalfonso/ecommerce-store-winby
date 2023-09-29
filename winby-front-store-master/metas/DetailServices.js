/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const { resolve } = require('path')
const { readFileSync } = require('fs-extra')
const { url, urlBack, deCode, numberFormat, indexExport } = require('../utils')
const { ServicesModel, ServicePhotosModel } = require('../models')

module.exports = router.get('/servicios/detalles/:id/:code?', async (req, res) => {
    // parametros de ruta
    const { id } = req.params
    try {
        let s_id = deCode(id)
        if (!isNaN(s_id)) {
            // busca la información del producto
            const data = await ServicesModel.findOne({
                attributes: ['s_name', 's_price'],
                include: [{ attributes: ['sp_name'], model: ServicePhotosModel, where: { sp_state: 1 } }],
                where: { s_id }
            })
            if (data) {
                const filePath = resolve(__dirname, '../public', 'index.html')
                let fileString = await readFileSync(filePath, 'utf8')
                fileString = fileString.replace('<title>Winby</title>', `<title>${data.s_name} - Winby</title>`)
                fileString = fileString.replace('<meta property="og:title" content="Winby"/>', `<meta property="og:title" content="${data.s_name} - Winby"/>`)
                fileString = fileString.replace('<meta name="description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>', `<meta name="description" content="Precio: $ ${numberFormat(data.s_price)} COP"/>`)
                fileString = fileString.replace('<meta property="og:description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>', `<meta property="og:description" content="Precio: $ ${numberFormat(data.s_price)} COP"/>`)
                fileString = fileString.replace(/%M_IMAGE%/g, `${data.servicephotos?.length ? `${urlBack}/static/services/${id}/${data.servicephotos[0].sp_name}` : `${url}/logo512.png`}`)
                fileString = fileString.replace(/%M_IMAGEW%/g, 500)
                fileString = fileString.replace(/%M_IMAGEH%/g, 500)
                fileString = fileString.replace(/%M_URL%/g, `${url}${req.originalUrl}`)
                res.send(fileString)
            } else Throws('Error de busqueda')
        } else Throws('No es un numero')
    } catch (error) {
        indexExport(req, res, url)
    }
})