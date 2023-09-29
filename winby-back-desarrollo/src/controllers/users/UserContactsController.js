const controllers = {}
const UserContactsModel = require('../../models/users/UserContactsModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')
const UserProfilesModel = require('../../models/users/UserProfilesModel')

/** Obtiene todos los registros de contactos */
controllers.getAll = async (req, res) => {
    try {
        // Declarción de variables
        const { uc_code, u_id, uc_state } = req.body

        // Se busca el uc_code si viene el u_id
        let uData
        if (u_id) uData = await UserProfilesModel.findOne({ attributes: ['up_code'], where: { u_id: deCode(u_id) } })

        // Se realiza la petición
        const data = await UserContactsModel.findAll({ attributes: ['uc_id', 'uc_phone', 'uc_message', 'uc_state'], where: { uc_code: uc_code || uData.up_code, uc_state: uc_state || { [Op.gt]: 0 } } })

        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema, intente nuevamente mas tarde.' })
    }
}

// registrar los datos del posible franquiciado
controllers.register = async (req, res) => {
    try {
        // variables y parametros necesarios
        const { uc_code, uc_message, uc_phone } = req.body
        /** registro de usuario */
        await UserContactsModel.create({ uc_code, uc_message, uc_phone, uc_state: 2 })
        /** respuesta */
        return res.json({ success: 1, message: 'Registro exitoso' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Cambia el estado de un registro de contacto */
controllers.changeState = async (req, res) => {
    try {
        // Declaración de variables
        const { uc_id, uc_state } = req.body

        // Se realiza la petición
        await UserContactsModel.update({ uc_state }, { where: { uc_id: deCode(uc_id) } })

        return res.json({ success: 1, data: { uc_id, uc_state }, message: `Se ha ${ uc_state === 1 ? 'marcado como visto' : 'eliminado' } el registro.` })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un prblema, intente nuevamente mas tarde.' })
    }
}

module.exports = controllers