const controllers = {}
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')

/**
 * Obtiene todos los tipos de costos de envios según un estado dado.
 * @param {object} req Datos de petición del cliente
 * @param {object} res Datos de respuesta de la petición
 * @return {object} objeto con la información de la respuesta
 */
controllers.getAll = async (req, res) => {
    try {
        // Declación de variables
        const { tdc_state } = req.body
        // Se realiza la petición
        const data = await TypeDeliveryCostsModel.findAll({ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], where: { tdc_state: tdc_state || 1 } })

        // Se retornan los datos encontrados
        if (data) return res.json({ success: 1, data })

        // Por defecto se retorna un estado de exito fallido.
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers