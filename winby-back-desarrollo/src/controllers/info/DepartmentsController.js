const controllers = {}
const CountriesModel = require('../../models/info/CountriesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const { deCode, linkBelongsTo } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { d_id, d_state } = req.params; let error = false

    /** relacion de base de datos */
    linkBelongsTo(DepartmentsModel, CountriesModel, 'c_id', 'c_id')

    /** verificando que parametro es para hacer la consulta */
    const data = await DepartmentsModel.findOne({
        attributes: ['d_name', 'd_state'],
        include: [{
            attributes: ['c_id', 'c_name', 'c_calCod'],
            model: CountriesModel
        }],
        where: { d_id: deCode(d_id), d_state: d_state !== 'false' ? d_state : { [Op.gte]: 0 } }
    }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.getAll = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { c_id, d_state } = req.params; let error = false

    /** relacion de base de datos */
    linkBelongsTo(DepartmentsModel, CountriesModel, 'c_id', 'c_id')

    /** verificando que parametro es para hacer la consulta */
    const data = await DepartmentsModel.findAll({
        attributes: ['d_id', 'd_name', 'd_state'],
        include: [{
            attributes: ['c_id', 'c_name', 'c_calCod'],
            model: CountriesModel
        }],
        where: { c_id: c_id !== 'false' ? deCode(c_id) : { [Op.gte]: 0 }, d_state: d_state !== 'false' ? d_state : { [Op.gte]: 0 } },
        order: [['d_name', 'ASC']]
        // eslint-disable-next-line no-return-assign
    }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

controllers.register = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    // eslint-disable-next-line
    const { d_name, c_id } = req.body; let error = false

    /** Guardar el registro */
    // eslint-disable-next-line no-return-assign
    const data = await DepartmentsModel.create({ d_name, c_id: deCode(c_id), d_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, message: 'La nueva ciudad se ha registrado con éxito.' }) }
}

controllers.edit = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { d_id, d_name, c_id } = req.body; let error = false

    /** Editar el registro */
    // eslint-disable-next-line no-return-assign
    await DepartmentsModel.update({ d_name, c_id: deCode(c_id) }, { where: { d_id: deCode(d_id) } }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1, message: 'Se ha editado la ciudad con éxito.' }) }
}

controllers.changeState = async (req, res) => {
    /** creacion de variables, y recibiendo los datos */
    const { d_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    // eslint-disable-next-line no-return-assign
    const data = await DepartmentsModel.findOne({ attributes: ['d_state'], where: { d_id: deCode(d_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true) { await DepartmentsModel.update({ d_state: data.dataValues.d_state ? 0 : 1 }, { where: { d_id: deCode(d_id) } }).catch(x => error = true) }

    /** respuesta */
    if (error) { res.json({ success: 0, error }) } else if (data !== null && data !== true) { res.json({ success: 1, message: 'Ha cambiado el estado de la ciudad con éxito.' }) } else { res.json({ success: 0, error, message: 'No se ha encontrado ninguna ciudad, para actualizar.' }) }
}

module.exports = controllers