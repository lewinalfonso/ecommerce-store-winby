const controllers = {}
const { Op } = require('sequelize')
const { TypeManagersModel } = require('../../models')

/**
 * Obtiene todos los tipos de gerentes según un estado dado.
 * @param {object} req Datos de petición del cliente
 * @param {object} res Datos de respuesta de la petición
 * @return {object} objeto con la información de la respuesta
 */
controllers.getAll = async (req, res) => {
    try {
        // Declación de variables
        const { tmState } = req.body

        // Se realiza la petición
        const data = await TypeManagersModel.findAll({ attributes: ['tmId', 'tmName', 'tmState'], where: { tmState: tmState || { [Op.gte]: 0 } } })

        // Se retornan los datos encontrados
        if (data.length) return res.json({ success: 1, data })

        // Por defecto se retorna un estado de exito fallido.
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers