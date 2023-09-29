const controllers = {}
const InfoSelesModel = require('../../models/info/InfoSelesModel')

controllers.getInfo = async (req, res) => {
    try {
        /** verificando que parametro es para hacer la consulta */
        const data = await InfoSelesModel.findOne({ attributes: ['is_por', 'is_porAdvFra', 'is_porSelFra', 'is_porSelFraTot', 'is_porPoiFra', 'is_porWinFra', 'is_porSelFraTwo', 'is_porSelFraThree', 'is_porSelFraFour', 'is_minNet', 'is_maxNet', 'is_leader', 'is_manager', 'is_director', 'is_dirDir', 'is_dirWor', 'is_winby', 'is_netPoi', 'is_netDir', 'is_netReqMin', 'is_netReqMax', 'is_netReqLea', 'is_netReqMem'], where: { is_state: 1 } })

        /** respuesta */
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}
// editar información
controllers.edit = async (req, res) => {
    try {
        /** Recibiendo los Datos */
        const { is_por, is_porAdvFra, is_porSelFra, is_porSelFraTot, is_porPoiFra, is_porWinFra,  is_porSelFraTwo, is_porSelFraThree, is_porSelFraFour, is_minNet, is_maxNet, is_leader, is_manager, is_director, is_dirDir, is_dirWor, is_winby, is_netPoi, is_netDir, is_netReqMin, is_netReqMax, is_netReqLea, is_netReqMem } = req.body
        /** Editar los Datos */
        await InfoSelesModel.update({ is_por, is_porAdvFra, is_porSelFra, is_porSelFraTot, is_porPoiFra, is_porWinFra, is_porSelFraTwo, is_porSelFraThree, is_porSelFraFour, is_minNet, is_maxNet, is_leader, is_manager, is_director, is_dirDir, is_dirWor, is_winby, is_netPoi, is_netDir, is_netReqMin, is_netReqMax, is_netReqLea, is_netReqMem }, { where: { is_state: 1 } })
        return res.json({ success: 1, message: 'Se han actualizado los datos.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}
module.exports = controllers