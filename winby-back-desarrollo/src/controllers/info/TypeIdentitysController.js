const controllers = {}
const TypeIdentitysModel = require('../../models/info/TypeIdentitysModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { ti_id, ti_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeIdentitysModel.findOne({ attributes: ['ti_name', 'ti_state'], where: { ti_id: deCode(ti_id), ti_state: ti_state !== 'false' ? ti_state : { [Op.gte]: 0 } } }).catch(x => error = true)

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
    const { ti_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeIdentitysModel.findAll({ attributes: ['ti_id', 'ti_name', 'ti_state'], where: { ti_state: ti_state !== 'false' ? ti_state : { [Op.gte]: 0 } } }).catch(x => error = true)

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
    const { ti_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await TypeIdentitysModel.create({ ti_name, ti_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else if (data !== null)
        return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' })
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { ti_id, ti_name } = req.body; let error = false

    /** Editar el registro */
    await TypeIdentitysModel.update({ ti_name }, { where: { ti_id: deCode(ti_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else
        return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' })
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { ti_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await TypeIdentitysModel.findOne({ attributes: ['ti_state'], where: { ti_id: deCode(ti_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true)
        await TypeIdentitysModel.update({ ti_state: data.dataValues.ti_state ? 0 : 1 }, { where: { ti_id: deCode(ti_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        res.json({ success: 0, error })
    else if (data !== null && data !== true)
        res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' })
    else
        res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' })
}

module.exports = controllers