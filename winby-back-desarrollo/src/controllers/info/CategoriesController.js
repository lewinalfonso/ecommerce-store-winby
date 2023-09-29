const controllers = {}
const CategoriesModel = require('../../models/info/CategoriesModel')
const SubCategoriesModel = require('../../models/info/SubCategoriesModel')
const { deCode, linkHasMany } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { c_id, c_state } = req.params; let error = false

    /** Relación de base de datos */
    linkHasMany(CategoriesModel, SubCategoriesModel, 'c_id', 'c_id')

    /** verificando que parametro es para hacer la consulta */
    const data = await CategoriesModel.findOne({
        attributes: ['c_name', 'c_state'],
        include: [{ attributes: ['sc_id', 'sc_name', 'sc_state'], model: SubCategoriesModel, where: { sc_state: c_state !== 'false' ? c_state : { [Op.gte]: 0 } } }],
        where: { c_id: deCode(c_id), c_state: c_state !== 'false' ? c_state : { [Op.gte]: 0 } }
    }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.getAll = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { c_state } = req.params; let error = false

    /** Relación de base de datos */
    linkHasMany(CategoriesModel, SubCategoriesModel, 'c_id', 'c_id')

    /** verificando que parametro es para hacer la consulta */
    const data = await CategoriesModel.findAll({
        attributes: ['c_id', 'c_name', 'c_state'],
        include: [
            {
                attributes: ['sc_id', 'sc_name', 'sc_state'],
                model: SubCategoriesModel,
                where: { sc_state: c_state !== 'false' ? c_state : { [Op.gte]: 0 } }
            }
        ],
        where: { c_state: c_state !== 'false' ? c_state : { [Op.gte]: 0 } }
    }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.register = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { c_name } = req.body; let error = false

    /** Guardar el registro */
    const data = await CategoriesModel.create({ c_name, c_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' }) }
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { c_id, c_name } = req.body; let error = false

    /** Editar el registro */
    await CategoriesModel.update({ c_name }, { where: { c_id: deCode(c_id) } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' }) }
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { c_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await CategoriesModel.findOne({ attributes: ['c_state'], where: { c_id: deCode(c_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true) { await CategoriesModel.update({ c_state: data.dataValues.c_state ? 0 : 1 }, { where: { c_id: deCode(c_id) } }).catch(x => error = true) }

    /** respuesta */
    if (error) { res.json({ success: 0, error }) } else if (data !== null && data !== true) { res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' }) } else { res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' }) }
}

module.exports = controllers