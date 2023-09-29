const controllers = {}
const GendersModel = require('../../models/info/GendersModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { g_id, g_state } = req.params

        /** verificando que parametro es para hacer la consulta */
        const data = await GendersModel.findOne({ attributes: ['g_name', 'g_state'], where: { g_id: deCode(g_id), g_state: g_state !== 'false' ? g_state : { [Op.gte]: 0 } } })

        /** respuesta */
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.json({ success: 0, error, message: 'Ha ocurrido un problema, intente mas tarde.' })
    }
}

controllers.getAll = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { g_state } = req.params; let error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await GendersModel.findAll({ attributes: ['g_id', 'g_name', 'g_state'], where: { g_state: g_state !== 'false' ? g_state : { [Op.gte]: 0 } } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.register = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { g_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await GendersModel.create({ g_name, g_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' }) }
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { g_id, g_name } = req.body; let error = false

    /** Editar el registro */
    await GendersModel.update({ g_name }, { where: { g_id: deCode(g_id) } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' }) }
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { g_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await GendersModel.findOne({ attributes: ['g_state'], where: { g_id: deCode(g_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true) { await GendersModel.update({ g_state: data.dataValues.g_state ? 0 : 1 }, { where: { g_id: deCode(g_id) } }).catch(x => error = true) }

    /** respuesta */
    if (error) { res.json({ success: 0, error }) } else if (data !== null && data !== true) { res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' }) } else { res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' }) }
}

module.exports = controllers