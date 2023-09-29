const controllers = {}
const { Op } = require('sequelize')
const InfoAdvertisingUrlsModel = require('../../models/info/InfoAdvertisingUrlsModel')
const PointReportsModel = require('../../models/users/PointReportsModel')
const UserAdvertisingsModel = require('../../models/users/UserAdvertisingsModel')
const UserPointsModel = require('../../models/users/UserPointsModel')
const { deCode } = require('../../utils')

/**
 * Busca las url que ha compartido el usuario en el mes.
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} respuesta de la solicitud
 * @version 1.2
 * @author Wow Desarrollos
 */
controllers.getAll = async (req, res) => {
    try {
        // Recibiendo variables de la petición
        const { u_id, ua_date } = req.body
        // Obteniendo los registros
        const data = await UserAdvertisingsModel.findAll({
            attributes: ['ua_id', 'ua_date', 'ua_state'],
            include: [{ attributes: ['iauId', 'ia_id', 'iauUrl', 'iauType'], model: InfoAdvertisingUrlsModel }],
            where: { u_id: deCode(u_id), ua_date: { [Op.startsWith]: ua_date } }
        })

        // Respuesta exitosa
        if (data.length) return res.json({ success: 1, data })

        // Respuesta no exitosa.
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Agrega y reporta los puntos ganados del usuario por compartir una herramienta de publicidad.
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} respuesta de la solicitud
 * @version 1.2
 * @author Wow Desarrollos
 */
controllers.register = async (req, res) => {
    try {
        // Recibiendo variables de la petición
        const { u_id, ua_date, iauId, point } = req.body

        // Buscar si ya existe el registro para no dar los puntos
        const data = await UserAdvertisingsModel.findOne({
            attributes: ['ua_id'],
            where: { u_id: deCode(u_id), ua_date, iauId: deCode(iauId), ua_state: 1 }
        })
        if (!data) {
            // Se realiza el registro
            await UserAdvertisingsModel.create({ u_id: deCode(u_id), ua_date, iauId, ua_state: 1 })
            // Busca los puntos del usuario
            const dataUP = await UserPointsModel.findOne({ attributes: ['up_point'], where: { u_id: deCode(u_id) } })
            // Actualiza los puntos del usuario
            UserPointsModel.update({ up_point: (dataUP.up_point + point) }, { where: { u_id: deCode(u_id) } })
            // Realiza el reporte de los puntos
            PointReportsModel.create({ u_id: deCode(u_id), pr_point: point, pr_state: 1 })
        }

        // Respuesta
        return res.json({ success: 1 })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers