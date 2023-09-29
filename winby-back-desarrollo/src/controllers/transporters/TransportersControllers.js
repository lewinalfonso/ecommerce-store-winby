const controllers = {}
const TransportersModel = require('../../models/transporters/TransportersModel')
const { deCode } = require('../../utils')
const { errorLogMail } = require('../../utils/logMailer')

/** buscar todos los aliados comerciales */
controllers.getAllTransporters = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */

        /** verificando que parametro es para hacer la consulta */
        const data = await TransportersModel.findAll({attributes:  ['tId', 'tName', 'tFletMinNal','tFletMinLoc', 'tDescFlet', 'tState'], where: { tState: 1 }})

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}
controllers.editTransporter = async (req, res) => {
    try {
        /** variables necesarias */
        const { tId, tName, tFletMinNal, tFletMinLoc, tDescFlet, tState } = req.body
        await TransportersModel.update({ tName, tFletMinNal, tFletMinLoc, tDescFlet, tState }, { where: { tId: deCode(tId) } })
        return res.json({ success: 1, message: 'Se ha actualizado la información de la transportadora.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers