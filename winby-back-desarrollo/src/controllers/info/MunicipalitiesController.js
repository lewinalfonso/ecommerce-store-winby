const controllers = {}
const CountriesModel = require('../../models/info/CountriesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const { deCode, linkBelongsTo } = require('../../utils')
const { Op } = require('sequelize')

controllers.getOne = async (req, res) => {
    /** Creacion de Variables, Y Recibiendo Parametros */
    const { m_id, m_state } = req.params; let error = false

    /** Relacion de Base de datos */
    linkBelongsTo(MunicipalitiesModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(DepartmentsModel, CountriesModel, 'c_id', 'c_id')

    /** Verificando que Parametro es Para hacer la Consulta */
    const data = await MunicipalitiesModel.findOne({
        attributes: ['m_name', 'm_state'],
        include: [{
            Attributes: ['d_id', 'd_name'],
            model: DepartmentsModel,
            include: [{
                Attributes: ['c_id', 'c_name', 'c_calCod'],
                model: CountriesModel
            }]
        }],
        where: { m_id: deCode(m_id), m_state:    !== 'false' ? m_state : { [Op.gte]: 0 } }
    }).catch(x => error = true)

    /** Respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún Resultado.' }) }
}

controllers.getAll = async (req, res) => {
    /** Creacion de Variables, Y Recibiendo Parametros */
    const { d_id, m_state } = req.params; let error = false

    /** relacion de base de datos */
    linkBelongsTo(MunicipalitiesModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(DepartmentsModel, CountriesModel, 'c_id', 'c_id')

    /** verificando que parametro es para hacer la consulta */
    const data = await MunicipalitiesModel.findAll({
        attributes: ['m_id', 'm_name', 'm_state'],
        include: [{
            Attributes: ['d_id', 'd_name'],
            model: DepartmentsModel,
            include: [{
                Attributes: ['c_id', 'c_name', 'c_calCod'],
                model: CountriesModel
            }]
        }],
        where: { d_id: d_id !== 'salse' ? deCode(d_id) : { [Op.gte]: 0 }, m_state: m_state !== 'false' ? m_state : { [Op.gte]: 0 } },
        order: [['m_name', 'ASC']]
    }).catch(x => error = true)

    /** Respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún Resultado.' }) }
}

controllers.getAllV2 = async (req, res) => {
    try {
        const { m_state } = req.body
        const data = await MunicipalitiesModel.findAll({ attributes: ['m_id', 'm_name', 'd_id'], where: { m_state: m_state || 1 } })
        if (data.length) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, message: 'Se ha presentado un error.' })
    }
}

controllers.register = async (req, res) => {
    /** Creacion de Variables, Y Recibiendo los datos */
    const { m_name, d_id } = req.body; let error = false

    /** Guardar el Registro */
    const data = await MunicipalitiesModel.create({ m_name, d_id: deCode(d_id), m_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (data !== null) { return res.json({ success: 1, message: 'La nueva Ciudad se ha Registrado Con éxito.' }) }
}

controllers.edit = async (req, res) => {
    /** Creacion de Variables, Y Recibiendo los datos */
    const { m_id, m_name, d_id } = req.body; let error = false

    /** Editar el Registro */
    await MunicipalitiesModel.update({ m_name, d_id: deCode(d_id) }, { where: { m_id: deCode(m_id) } }).catch(x => error = true)

    /** Respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1, message: 'Se ha editado la Ciudad Con éxito.' }) }
}

controllers.changeState = async (req, res) => {
    /** Creacion de Variables, Y Recibiendo los datos */
    const { m_id } = req.body; let error = false

    /** Busca para saber en que estado se encuentra */
    const data = await MunicipalitiesModel.findOne({ attributes: ['m_state'], where: { m_id: deCode(m_id) } }).catch(x => error = true)

    /** Verifica si existe para actualizar */
    if (data !== null && data !== true) await MunicipalitiesModel.update({ m_state: data.dataValues.m_state ? 0 : 1 }, { where: { m_id: deCode(m_id) } }).catch(x => error = true)

    /** respuesta */
    if (error) { res.json({ success: 0, error }) } else if (data !== null && data !== true) { res.json({ success: 1, message: 'Ha Cambiado el estado de la Ciudad Con éxito.' }) } else { res.json({ success: 0, error, message: 'No se ha encontrado ninguna Ciudad, Para Actualizar.' }) }
}

module.exports = controllers