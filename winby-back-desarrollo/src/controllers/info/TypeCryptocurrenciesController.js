const controllers = {}
const TypeCryptocurrenciesModel = require('../../models/info/TypeCryptocurrenciesModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { tc_id, tc_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeCryptocurrenciesModel.findOne({ attributes: ['tc_name', 'tc_state'], where: { tc_id: deCode(tc_id), tc_state: tc_state !== 'false' ? tc_state : { [Op.gte]: 0 } } }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else if (data !== null)
        return res.json({ success: 1, data })
    else
        return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' })
}

controllers.getAll = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { tc_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeCryptocurrenciesModel.findAll({ attributes: ['tc_id', 'tc_name', 'tc_state'], where: { tc_state: tc_state !== 'false' ? tc_state : { [Op.gte]: 0 } } }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else if (!!data.length && data !== true)
        return res.json({ success: 1, data })
    else
        return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' })
}

controllers.register = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { tc_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await TypeCryptocurrenciesModel.create({ tc_name, tc_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else if (data !== null)
        return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' })
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { tc_id, tc_name } = req.body; let error = false

    /** Editar el registro */
    await TypeCryptocurrenciesModel.update({ tc_name }, { where: { tc_id: deCode(tc_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else
        return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' })
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { tc_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await TypeCryptocurrenciesModel.findOne({ attributes: ['tc_state'], where: { tc_id: deCode(tc_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true)
        await TypeCryptocurrenciesModel.update({ tc_state: data.dataValues.tc_state ? 0 : 1 }, { where: { tc_id: deCode(tc_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        res.json({ success: 0, error })
    else if (data !== null && data !== true)
        res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' })
    else
        res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' })
}

module.exports = controllers