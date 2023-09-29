/* eslint-disable camelcase */
const controllers = {}
const { Op } = require('sequelize')
const InfoAdvertisingsModel = require('../../models/info/InfoAdvertisingsModel')
const InfoAdvertisingUrlsModel = require('../../models/info/InfoAdvertisingUrlsModel')
const { deCode } = require('../../utils')
const { errorLogMail } = require('../../utils/logMailer')

/**
 * Busca una herramienta de publicidad por su el día
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} respuesta de la solicitud.
 * @version 1.2
 * @author Wow Desarrollos
 */
controllers.getOne = async (req, res) => {
    try {
        // Obteniendo variables de la petición
        const { ia_day } = req.body
        // Se Obtiene la información
        const data = await InfoAdvertisingsModel.findOne({
            attributes: ['ia_id', 'ia_day', 'ia_text'],
            include: [{ attributes: ['iauId', 'iauUrl', 'iauType', 'iauPoints', 'iauState'], model: InfoAdvertisingUrlsModel, where: { iauState: 1 }, required: false }],
            where: { ia_day, ia_state: 1 }
        })

        // Respuesta
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Busca todas las herramienta de publicidad
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} respuesta de la solicitud.
 * @version 1.2
 * @author Wow Desarrollos
 */
controllers.getAll = async (req, res) => {
    try {
        const { month } = req.body

        // Se Obtiene la información
        const data = await InfoAdvertisingsModel.findAll({
            attributes: ['ia_id', 'ia_day', 'ia_text'],
            include: [{ attributes: ['iauId', 'iauUrl', 'iauType', 'iauPoints', 'iauState'], model: InfoAdvertisingUrlsModel, where: { iauState: 1 }, required: false }],
            where: { ia_state: 1, ...(month ? { ia_day: { [Op.between]: [30 * (month - 1) + 1, 30 * month] } } : {}) },
            order: [['ia_day', 'ASC']]
        })

        // Respuesta
        if (data.length) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Registra una herramienta de publicidad
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} respuesta de la solicitud.
 * @version 1.2
 * @author Wow Desarrollos
 */
controllers.register = async (req, res) => {
    try {
        // Recibiendo parámetros de la petición
        const { infoAdvertisings } = req.body

        // Guardar los registros
        if (infoAdvertisings && infoAdvertisings.length) {
            for (let i = 0; i < infoAdvertisings.length; i++) {
                const { ia_id, ia_text, infoadvertisingurls } = infoAdvertisings[i]
                InfoAdvertisingsModel.update({ ia_text }, { where: { ia_id: deCode(ia_id) } }) // Se actualiza el día
                // Se actualizan o se crean las urls
                if (infoadvertisingurls && infoadvertisingurls.length) {
                    for (let j = 0; j < infoadvertisingurls.length; j++) {
                        const { add, iauId, iauUrl, iauType, iauPoints, iauState } = infoadvertisingurls[j]
                        if (!add) { // Si el registro existe se actualiza
                            InfoAdvertisingUrlsModel.update({ iauUrl, iauType, iauPoints, iauState }, { where: { iauId: deCode(iauId) } })
                        } else if (iauUrl && iauPoints && iauState !== 0) InfoAdvertisingUrlsModel.create({ ia_id, iauUrl, iauType: iauType || 1, iauPoints, iauState: 1 })
                    }
                }
            }
        }

        // Respuesta
        return res.json({ success: 1, message: 'Ha actualizado los links de compartir en la publicidad.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers