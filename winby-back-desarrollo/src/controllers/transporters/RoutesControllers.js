const controllers = {}
const { CountriesModel, DepartmentsModel } = require('../../models')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const RoutesModel = require('../../models/transporters/RoutesModel')
const TransportersModel = require('../../models/transporters/TransportersModel')
const { deCode } = require('../../utils')
const { errorLogMail } = require('../../utils/logMailer')

/** buscar todos los aliados comerciales */
controllers.getAllRoutes = async (req, res) => {
    try {
        /** verificando que parametro es para hacer la consulta */
        const data = await RoutesModel.findAll({
            attributes: ['rId', 'rState'],
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
                },
                { attributes: ['tId', 'tName'], model: TransportersModel }
            ],
            where: { rState: 1 },
            order: [['rId', 'DESC']]
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.registerRoute = async (req, res) => {
    try {
        /** variables necesarias */
        const { rOriId, rDestId, tId } = req.body

        const data = await RoutesModel.create({ rOriId: deCode(rOriId), rDestId: deCode(rDestId), tId: deCode(tId), rState: 1 })

        if (data) { return res.json({ success: 1, rId: data.rId, message: 'Registro de ruta nueva de envio exitosa.' }) }

        /** respuesta */
        return res.json({ success: 0, message: 'Ha ocurrido un error interno' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.delete = async (req, res) => {
    try {
        const { rId } = req.body
        if (!rId) return res.json({ success: 0, message: 'No ha sido posible realizar la acción.' })
        await RoutesModel.destroy({ where: { rId: deCode(rId) } })
        return res.json({ success: 1, message: 'Se ha eliminado la ruta.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.json({ success: 0, error: true, message: 'Ha ocurrido un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers