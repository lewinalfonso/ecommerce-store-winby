/* eslint-disable no-return-assign */
const controllers = {}
const TypeBanksModel = require('../../models/info/TypeBanksModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { tb_id, tb_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeBanksModel.findOne({ attributes: ['tb_name', 'tb_state'], where: { tb_id: deCode(tb_id), tb_state: tb_state !== 'false' ? tb_state : { [Op.gte]: 0 } } }).catch(x => error = true)

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
    const { tb_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await TypeBanksModel.findAll({ attributes: ['tb_id', 'tb_name', 'tb_state'], where: { tb_state: tb_state !== 'false' ? tb_state : { [Op.gte]: 0 } } }).catch(x => error = true)

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
    const { tb_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await TypeBanksModel.create({ tb_name, tb_state: 1 }).catch(() => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else if (data !== null)
        return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' })
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { tb_id, tb_name } = req.body; let error = false

    /** Editar el registro */
    await TypeBanksModel.update({ tb_name }, { where: { tb_id: deCode(tb_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else
        return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' })
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { tb_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await TypeBanksModel.findOne({ attributes: ['tb_state'], where: { tb_id: deCode(tb_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true)
        await TypeBanksModel.update({ tb_state: data.dataValues.tb_state ? 0 : 1 }, { where: { tb_id: deCode(tb_id) } }).catch(x => error = true)

    /** respuesta */
    if (error)
        res.json({ success: 0, error })
    else if (data !== null && data !== true)
        res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' })
    else
        res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' })
}

module.exports = controllers