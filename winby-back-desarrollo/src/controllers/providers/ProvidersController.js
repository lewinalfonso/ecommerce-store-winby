const controllers = {}
const path = require('path')
const fse = require('fs-extra')
const ProvidersModel = require('../../models/providers/ProvidersModel')
const ProviderDocumentsModel = require('../../models/providers/ProviderDocumentsModel')
const VendorsModel = require('../../models/vendors/VendorsModel')
const TypeIdentitysModel = require('../../models/info/TypeIdentitysModel')
const GendersModel = require('../../models/info/GendersModel')
const CountriesModel = require('../../models/info/CountriesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const { deCode, linkBelongsTo, linkHasMany } = require('../../utils')
const { Op } = require('sequelize')

/** Busca un prestador de servicio */
controllers.getOne = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { v_id, p_state } = req.params; let error = false

    /** Relacion de base de datos */
    linkBelongsTo(ProvidersModel, TypeIdentitysModel, 'ti_id', 'ti_id')
    linkBelongsTo(ProvidersModel, GendersModel, 'g_id', 'g_id')
    linkBelongsTo(ProvidersModel, CountriesModel, 'c_id', 'c_id')
    linkBelongsTo(ProvidersModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(ProvidersModel, MunicipalitiesModel, 'm_id', 'm_id')

    const data = await ProvidersModel.findAll({
        attributes: ['p_id', 'p_ideNum', 'p_name', 'p_last', 'p_email', 'p_phone', 'p_profession', 'p_photo', 'p_state'],
        include: [{ attributes: ['ti_id', 'ti_name'], model: TypeIdentitysModel },
            { attributes: ['g_id', 'g_name'], model: GendersModel },
            { attributes: ['c_id', 'c_name'], model: CountriesModel },
            { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
            { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }
        ],
        where: { v_id: deCode(v_id), p_state: p_state !== 'false' ? p_state : { [Op.or]: [1, 2] } }
    }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

/** Busca todos los prestadores de servicio */
controllers.getAll = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { v_id, p_state, all } = req.params; let error = false

    /** Relacion de base de datos */
    linkBelongsTo(ProvidersModel, TypeIdentitysModel, 'ti_id', 'ti_id')

    const data = await ProvidersModel.findAll({
        attributes: ['p_id', 'v_id', 'p_ideNum', 'p_name', 'p_last', 'p_email', 'p_phone', 'p_profession', 'p_photo', 'p_state'],
        include: [{ attributes: ['ti_id', 'ti_name'], model: TypeIdentitysModel }],
        where: { v_id: all ? { [Op.gte]: 0 } : deCode(v_id), p_state: p_state !== 'false' ? p_state : { [Op.gte]: 0 } }
    }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else if (!!data.length && data !== true) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

/** registra un prestador de servicio */
controllers.register = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { v_id, ti_id, p_ideNum, p_name, p_last, g_id, p_email, p_phone, p_profession, c_id, d_id, m_id } = req.body; let error = false

    /** registrar prestador de servicio */
    const data = await ProvidersModel.create({ v_id: deCode(v_id), ti_id: deCode(ti_id), p_ideNum, p_name, p_last, g_id: deCode(g_id), p_email, p_phone, p_profession, c_id: deCode(c_id), d_id: deCode(d_id), m_id: deCode(m_id), p_photo: '', p_state: 1 }).catch(x => error = true)

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1, p_id: data.p_id, message: 'Ha registrado a un prestador de servicio exitosamente.' }) }
}

/** registra la foto de perfil del prestador de servicio */
controllers.registerPhoto = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { p_id, v_id } = req.body; let error = false

    if (req.file) {
        fse.move(req.file.path, path.join(__dirname, `../../../public/vendors/${v_id}/provider/${p_id}/${req.file.filename}`))
        ProvidersModel.update({ p_photo: req.file.filename }, { where: { p_id: deCode(p_id) } }).catch(x => error = true)
    }

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1 }) }
}

/** registra los documentos del prestador de servicio */
controllers.registerDocuments = async (req, res) => {
    /** creacion de variables, y recibiendo parametros */
    const { p_id, v_id } = req.body; let error = false

    if (req.files) {
        req.files.map(x => {
            fse.move(x.path, path.join(__dirname, `../../../public/vendors/${v_id}/provider/${p_id}/documents/${x.filename}`))
            ProviderDocumentsModel.create({ p_id: deCode(p_id), pd_name: x.filename, pd_state: 1 }).catch(x => error = true)
        })
    }

    /** respuesta */
    if (error) { return res.json({ success: 0, error }) } else { return res.json({ success: 1 }) }
}

module.exports = controllers