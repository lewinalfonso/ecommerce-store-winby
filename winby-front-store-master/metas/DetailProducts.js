const express = require('express')
const router = express.Router()
/* eslint-disable no-undef */
const { resolve } = require('path')
const { readFileSync } = require('fs-extra')
const { url, urlBack, deCode, numberFormat, indexExport } = require('../utils')
const { ProductsModel, ProductPhotosModel } = require('../models')

module.exports = router.get('/productos/detalles/:id/:code?', async (req, res) => {
    // parametros de ruta
    const { id } = req.params
    try {
        let p_id = deCode(id)
        if (!isNaN(p_id)) {
            // busca la información del producto
            const data = await ProductsModel.findOne({
                attributes: ['p_name', 'p_price'],
                include: [{ attributes: ['pp_name'], model: ProductPhotosModel, where: { pp_state: 1 } }],
                where: { p_id }
            })
            if (data) {
                const filePath = resolve(__dirname, '../public', 'index.html')
                let fileString = await readFileSync(filePath, 'utf8')
                fileString = fileString.replace('<title>Winby</title>', `<title>${data.p_name} - Winby</title>`)
                fileString = fileString.replace('<meta property="og:title" content="Winby"/>', `<meta property="og:title" content="${data.p_name} - Winby"/>`)
                fileString = fileString.replace('<meta name="description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>', `<meta name="description" content="Precio: $ ${numberFormat(data.p_price)} COP"/>`)
                fileString = fileString.replace('<meta property="og:description" content="El Centro Comercial Virtual más Grande de Latinoamérica."/>', `<meta property="og:description" content="Precio: $ ${numberFormat(data.p_price)} COP"/>`)
                fileString = fileString.replace(/%M_IMAGE%/g, `${data.productphotos?.length ? `${urlBack}/static/products/${id}/${data.productphotos[0].pp_name}` : `${url}/logo512.png`}`)
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