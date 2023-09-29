const controllers = {}
const TypeHelpPQRModel = require('../../models/info/TypeHelpPQRModel')
const HelpPQRModel = require('../../models/info/HelpPQRModel')
const { deCode, UpCrNotFind } = require('../../utils')

/**
 * Obtiene todos los tipos de pqr
 * @param {Object} _ Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.getAllTypes = async (_, res) => {
    try {
        const data = await TypeHelpPQRModel.findAll({ attributes: ['thpId', 'thpName', 'thpIcon'], where: { thpState: 1 }})
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Obtiene un pqr
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.getOne = async (req, res) => {
    try {
        const { hpqrId } = req.body

        const data = await TypeHelpPQRModel.findOne({
            attributes: ['thpId', 'thpName', 'thpIcon'],
            include: [{
                attributes: ['hpqrId', 'hpqrQuestion', 'hpqrAnswer'],
                model: HelpPQRModel,
                where: { hpqrState: 1, hpqrId: deCode(hpqrId) }
            }],
            where: { thpState: 1 }
        })
        if (data) return data

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Obtiene todos los pqr
 * @param {Object} _ Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.getAll = async (_, res) => {
    try {
        const data = await TypeHelpPQRModel.findAll({
            attributes: ['thpId', 'thpName', 'thpIcon'],
            include: [{
                attributes: ['hpqrId', 'hpqrQuestion', 'hpqrAnswer'],
                model: HelpPQRModel,
                where: { hpqrState: 1 }
            }],
            where: { thpState: 1 }
        })
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Registra o edita un pqr
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.registerOrEdit = async (req, res) => {
    try {
        const { hpqrId, thpId, hpqrQuestion, hpqrAnswer } = req.body

        const data = await UpCrNotFind(HelpPQRModel, { thpId, hpqrQuestion, hpqrAnswer, hpqrState: 1 }, false, hpqrId && { id: 'hpqrId', value: hpqrId }, true)
        if (data) return res.json({ success: 1, message: `Se ha ${hpqrId ? 'editado' : 'creado'} un item.` })

        return res.json({ success: 0, message: 'No se ha podido realizar la acción.', data })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Cambia el estado de un pqr
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.changeState = async (req, res) => {
    try {
        const { hpqrId, hpqrState } = req.body
        if (hpqrId && hpqrState !== undefined) {
            await HelpPQRModel.update({ hpqrState }, { where: { hpqrId: deCode(hpqrId) } })
            return res.json({ success: 1, message: `Se ha ${hpqrState ? 'actualizado' : 'eliminado'} el registro.` })
        }
        return res.json({ success: 0, message: 'No se ha podido realizar la acción.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

module.exports = controllers