const express = require('express')
const router = express.Router()
const axios = require('axios')

/** busca uno */
router.post('/calculating', async (req, res) => {
    try {
        /** variables necesarias */
        const { uLat, uLon, ivLat, ivLon } = req.body

        /** calcula la distancia */
        const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${ uLat },${ uLon }&destinations=${ ivLat },${ ivLon }&language=es-419&key=AIzaSyBZrhTi9hNMr1ktPIgNvX92CGEiQr5Bqts`)

        /** respuesta */
        return res.json({ success: 1, data: result.data })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
})
/** END POST */

module.exports = router