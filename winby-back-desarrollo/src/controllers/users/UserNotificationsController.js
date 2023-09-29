const controllers = {}
const UserNotificationsModel = require('../../models/users/UserNotificationsModel')
const { Op } = require('sequelize')
const { deCode, /* linkBelongsTo */ } = require('../../utils')
const { validateParams } = require('../../utils/validations') // validate paras new version

/**
 * Lista las notificaciones de un usuario.
 * @param {object} req Objecto con la información de la petición.
 * @param {object} res Objeto con la información de respuesta.
 * @version 1.0
 * @return {object} Objeto con la respuesta de la petición.
 */
controllers.getAllNotifications = async (req, res) => {
    try {
        const { u_id, un_type, min, max } = req.body
        const limit = [min || 0, max || 10]
        validateParams([
            { value: u_id, required: true, id: true }
        ])

        const data = await UserNotificationsModel.findAll({
            attributes: ['un_id', 'u_id', 'i_id', 'un_title', 'un_message', 'un_type', 'un_state', 'un_datCre'],
            where: { u_id: deCode(u_id), un_state: { [Op.gt]: 0 }, un_type },
            order: [['un_datCre', 'DESC']],
            limit
        })

        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: error?.validation ? error.message : 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

controllers.changeStateNotification = async (req, res) => {
    try {
        const { un_id, un_state } = req.body
        validateParams([
            { value: un_id, required: true, id: true },
            { value: un_state, required: true, number: true, math: true, min: 0, max: 2 }
        ])

        const data = await UserNotificationsModel.update({ un_state }, { where: { un_id: deCode(un_id) } })
        if (data) return res.json({ success: 1, message: `Se ha ${ un_state === 0 ? 'eliminado' : un_state === 1 ? 'marcado como leida' : 'marcado como no leida' } la notificación.` })

        return res.json({ success: 0, message: 'No se ha podido realizar la acción.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: error?.validation ? error.message : 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers