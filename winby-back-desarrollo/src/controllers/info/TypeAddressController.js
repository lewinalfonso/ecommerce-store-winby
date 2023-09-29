const controllers = {}
const TypeAddressModel = require('../../models/info/TypeAddressModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { ta_id, ta_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeAddressModel.findOne({ attributes: ['ta_name', 'ta_state'], where: { ta_id: deCode(ta_id), ta_state: ta_state !== 'false' ? ta_state : { [Op.gte]: 0 } } }).catch(x => error = true)

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
    const { ta_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeAddressModel.findAll({ attributes: ['ta_id', 'ta_name', 'ta_state'], where: { ta_state: ta_state !== 'false' ? ta_state : { [Op.gte]: 0 } } }).catch(x => error = true)

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
    const { ta_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await TypeAddressModel.create({ ta_name, ta_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else if (data !== null)
        return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' })
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { ta_id, ta_name } = req.body; let error = false

    /** Editar el registro */
    await TypeAddressModel.update({ ta_name }, { where: { ta_id: deCode(ta_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else
        return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' })
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { ta_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await TypeAddressModel.findOne({ attributes: ['ta_state'], where: { ta_id: deCode(ta_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true)
        await TypeAddressModel.update({ ta_state: data.dataValues.ta_state ? 0 : 1 }, { where: { ta_id: deCode(ta_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        res.json({ success: 0, error })
    else if (data !== null && data !== true)
        res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' })
    else
        res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' })
}

module.exports = controllers