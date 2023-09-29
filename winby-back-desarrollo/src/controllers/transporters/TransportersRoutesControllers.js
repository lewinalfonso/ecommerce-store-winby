const controllers = {}
const TransportRoutesModel = require('../../models/transporters/TransportRoutesModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const { deCode } = require('../../utils')
const CountriesModel = require('../../models/info/CountriesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const { errorLogMail } = require('../../utils/logMailer')

/** buscar todos los aliados comerciales */
controllers.getAllTransportersRoutes = async (req, res) => {
    try {
        const { tId } = req.body

        const data = await TransportRoutesModel.findAll({
            attributes: ['trId', 'tId', 'trOriId', 'trDestId', 'trType', 'trFee'],
            include: [
                {
                    attributes: ['m_id', 'm_name'],
                    include: [{
                        attributes: ['d_id', 'd_name'],
                        include: [{ attributes: ['c_id', 'c_name'], model: CountriesModel }],
                        model: DepartmentsModel
                    }],
                    model: MunicipalitiesModel,
                    as: 'source'
                },
                {
                    attributes: ['m_id', 'm_name'],
                    include: [{
                        attributes: ['d_id', 'd_name'],
                        include: [{ attributes: ['c_id', 'c_name'], model: CountriesModel }],
                        model: DepartmentsModel
                    }],
                    model: MunicipalitiesModel,
                    as: 'destination'
                }
            ],
            where: { tId: deCode(tId), trState: 1 },
            order: [['trId', 'DESC']]
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}
controllers.registerTransporterRoutes = async (req, res) => {
    try {
        /** variables necesarias */
        const { tId, trOriId, trDestId, trType, trFee } = req.body

        const data = await TransportRoutesModel.create({ tId: deCode(tId), trOriId: deCode(trOriId), trDestId: deCode(trDestId), trType, trFee, trState: 1 })

        if (data) return res.json({ success: 1, message: 'Registro de Ruta de Transportadora exitoso.' })

        /** respuesta */
        return res.json({ success: 0, message: 'Ha ocurrido un error interno' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.delete = async (req, res) => {
    try {
        const { trId } = req.body
        if (!trId) return res.json({ success: 0, message: 'No ha sido posible realizar la operación.' })
        await TransportRoutesModel.destroy({ where: { trId: deCode(trId) } })
        return res.json({ success: 1, message: 'Se ha eliminado la ruta.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers