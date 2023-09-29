const controllers = {}
const AccountTypesModel = require('../../models/info/AccountTypesModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { at_id, at_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await AccountTypesModel.findOne({ attributes: ['at_name', 'at_state'], where: { at_id: deCode(at_id), at_state: at_state !== 'false' ? at_state : { [Op.gte]: 0 } } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.getAll = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { at_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await AccountTypesModel.findAll({ attributes: ['at_id', 'at_name', 'at_state'], where: { at_state: at_state !== 'false' ? at_state : { [Op.gte]: 0 } } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.register = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { at_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await AccountTypesModel.create({ at_name, at_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' }) }
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { at_id, at_name } = req.body; let error = false

    /** Editar el registro */
    await AccountTypesModel.update({ at_name }, { where: { at_id: deCode(at_id) } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' }) }
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { at_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await AccountTypesModel.findOne({ attributes: ['at_state'], where: { at_id: deCode(at_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true) { await AccountTypesModel.update({ at_state: data.dataValues.at_state ? 0 : 1 }, { where: { at_id: deCode(at_id) } }).catch(x => error = true) }

    /** respuesta */
    if (error) { res.json({ success: 0, error }) } else if (data !== null && data !== true) { res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' }) } else { res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' }) }
}

module.exports = controllers