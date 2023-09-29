'use strict'
const controllers = {}
const path = require('path')
const fse = require('fs-extra')
const ServicesModel = require('../../models/services/ServicesModel')
const ServiceLocalsModel = require('../../models/services/ServiceLocalsModel')
const ServicePhotosModel = require('../../models/services/ServicePhotosModel')
const ServiceAttributesModel = require('../../models/services/ServiceAttributesModel')
const SubCategoryServicesModel = require('../../models/categories/SubCategoryServicesModel')
const CategoryServicesModel = require('../../models/categories/CategoryServicesModel')
const { deCode, linkBelongsTo, linkHasMany, UpCrNotFind, generateSku } = require('../../utils')
const { Op, fn } = require('sequelize')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')
const ServiceCalendarModel = require('../../models/services/ServiceCalendarModel')
const ServiceCalendarHoursModel = require('../../models/services/ServiceCalendarHoursModel')
const InfoSelesModel = require('../../models/info/InfoSelesModel')
const VendorsModel = require('../../models/vendors/VendorsModel')
const { errorLogMail } = require('../../utils/logMailer')

/** Busca un prestador de servicio */
controllers.getOne = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { s_id, s_state } = req.body

        /** Relacion de base de datos */
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')
        linkHasMany(ServicesModel, ServiceAttributesModel, 's_id', 's_id')
        linkHasMany(ServicesModel, ServiceCalendarModel, 's_id', 's_id')
        linkHasMany(ServiceCalendarModel, ServiceCalendarHoursModel, 'sc_id', 'sc_id')
        linkBelongsTo(ServicesModel, SubCategoryServicesModel, 'scs_id', 'scs_id')
        linkBelongsTo(SubCategoryServicesModel, CategoryServicesModel, 'cs_id', 'cs_id')

        /** busca el cargo del usuario */
        const data = await ServicesModel.findOne({
            attributes: ['s_id', 'v_id', 's_name', 's_description', 's_price', 's_groPer', 's_views', 's_sellers', 's_franchise', 's_outstanding', 's_delivery', 's_state', 's_taxGat', 's_typeVen', 's_sku'],
            include: [
                { attributes: ['sp_id', 'sp_name', 'sp_state'], model: ServicePhotosModel, where: { sp_state: 1 }, required: false },
                {
                    attributes: ['sl_id', 'sl_state'],
                    model: ServiceLocalsModel,
                    where: { sl_state: 1 },
                    required: false,
                    include: [
                        {
                            attributes: ['vl_id', 'v_id', 'c_id', 'd_id', 'm_id', 'vl_address', 'vl_lat', 'vl_lon', 'vl_domFre', 'vl_cosKM', 'vl_name', 'vl_domLoc', 'vl_domNat'],
                            model: VendorsLocalsModel,
                            include: [{ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }],
                            where: { vl_state: 1 }
                        }
                    ]
                },
                { attributes: ['sa_id', 'ascs_id', 'sa_name', 'sa_value', 'sa_priority', 'sa_state'], model: ServiceAttributesModel, where: { sa_state: 1 }, required: false },
                {
                    attributes: ['scs_id', 'scs_name'],
                    model: SubCategoryServicesModel,
                    required: false,
                    include: [{ attributes: ['cs_id', 'cs_name'], model: CategoryServicesModel, required: false }]
                },
                {
                    attributes: ['sc_id', 'sc_type'],
                    include: [{
                        attributes: ['sch_id', 'sch_value'],
                        model: ServiceCalendarHoursModel,
                        where: { sch_state: 1 },
                        required: false
                    }],
                    model: ServiceCalendarModel,
                    where: { sc_state: 1 },
                    required: false
                }],
            where: { s_id: deCode(s_id), s_state: s_state || { [Op.or]: [1, 2] } }
        })
        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todos los prestadores de servicio */
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { v_id, cs_id, scs_id, s_state, min, max, typeOrder, search, noWinber, count, orderCol } = req.body
        let order = [], whereSCS = {}, whereSearch = {}, limit

        /** Relacion de base de datos */
        linkBelongsTo(ServicesModel, SubCategoryServicesModel, 'scs_id', 'scs_id')
        linkBelongsTo(SubCategoryServicesModel, CategoryServicesModel, 'cs_id', 'cs_id')
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')
        linkHasMany(ServicesModel, ServiceCalendarModel, 's_id', 's_id')
        linkHasMany(ServiceCalendarModel, ServiceCalendarHoursModel, 'sc_id', 'sc_id')

        if (typeOrder === 1) order = fn('RAND')
        if (typeOrder === 2) order = [['s_id', 'DESC']]
        if (typeOrder === 3) order = [['s_views', 'DESC']]
        if (typeOrder === 4) order = [['s_sellers', 'DESC']]
        if (typeOrder === 5) order = [['s_sellers', 'DESC'], ['s_views', 'DESC']]

        if (cs_id) whereSCS = { ...whereSCS, cs_id: deCode(cs_id) }
        if (scs_id) whereSCS = { ...whereSCS, scs_id: deCode(scs_id) }

        if (search) {
            let secureSearch = search.replace(/\s+/g, ' ')
            if (secureSearch.charAt(0) === ' ') secureSearch = secureSearch.substring(1)
            if (secureSearch.charAt(secureSearch.length - 1) === ' ') secureSearch = secureSearch.substring(0, secureSearch.length - 1)
            whereSearch = { [Op.or]: [{ s_name: { [Op.substring]: secureSearch } }, { s_sku: { [Op.substring]: secureSearch } }] }
        }

        if (max) limit = [min || 0, max]

        /** Busca todos lo servicios */
        const data = await ServicesModel.findAll({
            attributes: ['s_id', 'v_id', 's_name', 's_description', 's_price', 's_groPer', 's_views', 's_sellers', 's_franchise', 's_outstanding', 's_delivery', 's_state', 's_taxGat', 's_typeVen', 's_sku'],
            include: [{ attributes: ['scs_id', 'cs_id', 'scs_name'], model: SubCategoryServicesModel, where: whereSCS, include: [{ attributes: ['cs_id', 'cs_name'], model: CategoryServicesModel, where: { cs_state: 1 }, required: true }] },
                { attributes: ['sp_id', 'sp_name'], model: ServicePhotosModel, where: { sp_state: 1 }, required: false },
                {
                    attributes: ['sc_id', 'sc_type'],
                    include: [{
                        attributes: ['sch_id', 'sch_value'],
                        model: ServiceCalendarHoursModel,
                        where: { sch_state: 1 },
                        required: false
                    }],
                    model: ServiceCalendarModel,
                    where: { sc_state: 1 },
                    required: false
                }
            ],
            where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, s_state: s_state || { [Op.or]: [1, 2] }, ...(noWinber ? { s_typeVen: { [Op.or]: [1, null] } } : {}), ...whereSearch },
            order,
            limit
        })

        /** respuesta */
        if (data.length) {
            let total = 0
            if (count) {
                total = await ServicesModel.count(
                    { include: [{ model: SubCategoryServicesModel, where: whereSCS }] },
                    { where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, s_state: s_state || { [Op.or]: [1, 2] }, ...(noWinber ? { s_typeVen: { [Op.or]: [1, null] } } : {}), ...whereSearch } }
                )
            }
            return res.json({ success: 1, data, count: total })
        }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca productos similares */
controllers.getAllSimilar = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { s_id, scs_id } = req.body
        let where = {}

        /** Relaciones de base de dato */
        linkBelongsTo(ServicesModel, SubCategoryServicesModel, 'scs_id', 'scs_id')
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')

        if (!!scs_id) where = { scs_id: deCode(scs_id) }
        else {
            const dataP = await ServicesModel.findOne({ attributes: ['scs_id'], where: { s_id: deCode(s_id) } })
            if (!dataP) return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
            where = { scs_id: deCode(dataP.scs_id) }
        }
        where = { ...where, s_id: { [Op.ne]: deCode(s_id), s_typeVen: 1 } }
        const data = await ServicesModel.findAll({
            attributes: ['s_id', 'v_id', 's_name', 's_description', 's_price', 's_groPer', 's_views', 's_sellers', 's_franchise', 's_outstanding', 's_delivery', 's_state', 's_taxGat', 's_sku'],
            include: [{ attributes: ['scs_id', 'cs_id', 'scs_name'], model: SubCategoryServicesModel },
                { attributes: ['sp_id', 'sp_name', 'sp_cover'], model: ServicePhotosModel, where: { sp_state: 1 }, required: false }
            ],
            where,
            order: [['s_id', 'DESC']],
            limit: 20
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Contador de Vistas */
controllers.viewSer = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { s_id } = req.body

        const data = await ServicesModel.findOne({ attributes: ['s_views'], where: { s_id: deCode(s_id) } })

        /** verificando que parametro es para hacer la consulta */
        if (data) ServicesModel.update({ s_views: (data.s_views + 1) }, { where: { s_id: deCode(s_id) } })

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todo los servicios segun la categoria */
controllers.getAllSerSubCat = async (req, res) => {
    try {
        const { scs_id } = req.params

        /** Relacion de base de datos */
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')

        const data = await ServicesModel.findAll({
            attributes: ['s_id', 's_name', 's_price', 's_groPer', 's_delivery', 's_taxGat', 's_sku'],
            include: [{ attributes: ['sp_id', 'sp_name', 'sp_cover'], model: ServicePhotosModel, required: false }],
            where: { s_state: 1, scs_id: deCode(scs_id) }
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registra o editar un servicio */
controllers.register = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { s_id, v_id, s_name, s_description, s_price, s_groPer, s_views, s_sellers, s_state, scs_id, subcategoryservice, serviceattributes, servicelocals, serviceattributesOld } = req.body
        let dataS

        // Consultar vendedor
        const dataVendor = await VendorsModel.findOne({ attributes: ['v_type', 'v_skuPrefix'], where: { v_id: deCode(v_id) } })

        // Consultar porcentaje comisión de la pasarela
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_taxGat'], where: { is_state: 1 } })
        // Verificar el estado anterior del servicio.
        if (s_id) dataS = await ServicesModel.findOne({ attributes: ['s_groPer'], where: { s_id: deCode(s_id) } })

        // Genrear sku
        let s_sku = undefined
        if (!s_id) s_sku = await generateSku(ServicesModel, 's_sku', dataVendor.v_skuPrefix)

        /** registrar prestador de servicio */
        const data = await UpCrNotFind(ServicesModel, { v_id: deCode(v_id), scs_id: scs_id ? deCode(scs_id) : subcategoryservice.scs_id, s_name, s_price, s_description, s_groPer, s_delivery: 0, s_sellers: s_sellers || 0, s_state: s_id ? parseInt(s_groPer) !== dataS.s_groPer ? 2 : ((s_state !== null && s_state !== undefined) ? s_state : 2) : 2, s_taxGat: (parseFloat(s_price) * dataIS.is_taxGat), s_typeVen: (dataVendor.v_type === 2 || dataVendor.v_type === 3) ? 2 : 1, s_sku }, false, !!s_id && { id: 's_id', value: s_id })

        /** registra los atributos del servicio */
        if (serviceattributes.length) {
            for (let i = 0; i < serviceattributes.length; i++) {
                const { sa_id, ascs_id, sa_name, sa_value, sa_priority, sa_state } = serviceattributes[i]
                UpCrNotFind(ServiceAttributesModel, { s_id: deCode(data.s_id), ascs_id: deCode(ascs_id), sa_name, sa_value, sa_priority: sa_priority || i + 1, sa_state: (sa_state !== null && sa_state !== undefined) ? sa_state : 1 }, false, !!sa_id && { id: 'sa_id', value: sa_id })
            }
        }

        if (serviceattributesOld) {
            for (let i = 0; i < serviceattributesOld.length; i++) {
                const { sa_id, ascs_id, sa_name, sa_value, sa_priority } = serviceattributesOld[i]
                if (sa_id) { UpCrNotFind(ServiceAttributesModel, { s_id: deCode(data.s_id), ascs_id: deCode(ascs_id), sa_name, sa_value, sa_priority, sa_state: 0 }, false, !!sa_id && { id: 'sa_id', value: sa_id }) }
            }
        }

        if (servicelocals.length) {
            for (let i = 0; i < servicelocals.length; i++) {
                const { sl_id, vl_id } = servicelocals[i]
                UpCrNotFind(ServiceLocalsModel, { s_id: deCode(data.s_id), vl_id: deCode(vl_id), sl_state: 1 }, false, !!sl_id && { id: 'sl_id', value: sl_id })
            }
        }

        /** respuesta */
        return res.json({ success: 1, s_id: data.s_id, message: s_id ? 'Ha editado un servicio.' : 'Ha registrado a un servicio.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registra o editar imagenes de un servicio */
controllers.registerPhoto = async (req, res) => {
    try {
        /** creación de variables y recibiendo parametros */
        const { s_id, servicephotos } = req.body; let arraySP = []

        /** Registrar las fotos */
        if (servicephotos.length && Array.isArray(servicephotos)) {
            for (let i = 0; i < servicephotos.length; i++) {
                const { sp_id, sp_name, file, sp_cover, sp_state } = JSON.parse(servicephotos[i])

                /** Guarda la foto de la sub categoria */
                if (file) {
                    const findFile = req.files.find((x) => x.filename === sp_name)
                    if (findFile) { fse.move(findFile.path, path.join(__dirname, `../../../public/services/${ s_id }/${ findFile.filename }`)) }
                }

                const data = await UpCrNotFind(ServicePhotosModel, { s_id: deCode(s_id), sp_name, sp_cover: sp_cover || 0, sp_state: (sp_state !== null && sp_state !== undefined) ? sp_state : 1 }, false, !!sp_id && { id: 'sp_id', value: sp_id })
                arraySP = [...arraySP, deCode(data.sp_id)]
            }
        } else {
            const { sp_id, sp_name, file, sp_cover, sp_state } = JSON.parse(req.body.servicephotos)

            /** Guarda la foto de la sub categoria */
            if (file) {
                const findFile = req.files.find((x) => x.filename === sp_name)
                if (findFile) { fse.move(findFile.path, path.join(__dirname, `../../../public/services/${ s_id }/${ findFile.filename }`)) }
            }

            const data = await UpCrNotFind(ServicePhotosModel, { s_id: deCode(s_id), sp_name, sp_cover: sp_cover || 0, sp_state: (sp_state !== null && sp_state !== undefined) ? sp_state : 1 }, false, !!sp_id && { id: 'sp_id', value: sp_id })
            arraySP = [...arraySP, deCode(data.sp_id)]
        }

        /** Desactiva todas las fotos eliminadas */
        if (arraySP.length) { ServicePhotosModel.update({ sp_state: 0 }, { where: { sp_id: { [Op.notIn]: arraySP }, s_id: deCode(s_id) } }) }

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funciòn para confirmar un Servicio */
controllers.confirm = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { s_id, s_state } = req.body

        /** Cambio de estado */
        await ServicesModel.update({ s_state }, { where: { s_id: deCode(s_id) } })

        /** respuesta */
        return res.json({ success: 1, message: s_state ? 'Servicio Confirmado' : 'Servicio Rechazado' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funciòn para confirmar un Servicio */
controllers.cancel = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { s_id } = req.body

        /** Cambio de estado */
        ServicesModel.update({ s_state: 0 }, { where: { s_id: deCode(s_id) } })

        /** respuesta */
        return res.json({ success: 1, s_id, message: 'Ha cancelado un servicio exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registra o edita la agenda del servicio */
controllers.registerCalendar = async (req, res) => {
    try {
        /** Parámetros de la petición */
        const { s_id, schedulle } = req.body
        /** Se registran los horarios */
        for (let i = 0; i < schedulle.length; i++) {
            let scData = await ServiceCalendarModel.findOne({ attributes: ['sc_id'], where: { s_id: deCode(s_id), sc_type: schedulle[i].sc_type } })
            if (!scData) scData = await ServiceCalendarModel.create({ s_id: deCode(s_id), sc_type: schedulle[i].sc_type, sc_state: schedulle[i].sc_state || 1 })
            for (let k = 0; k < schedulle[i].servicecalendarhours.length; k++) {
                let attr
                if (!schedulle[i].servicecalendarhours[k].sch_id) attr = { sc_id: schedulle[i].sc_id || deCode(scData.sc_id) }
                await UpCrNotFind(ServiceCalendarHoursModel, { ...attr, sch_value: schedulle[i].servicecalendarhours[k].sch_value, sch_state: schedulle[i].servicecalendarhours[k].sch_state || 1 }, false, schedulle[i].servicecalendarhours[k].sch_id && { id: 'sch_id', value: schedulle[i].servicecalendarhours[k].sch_id })
            }
        }
        return res.json({ success: 1, message: 'Se ha registrado el calendario para el servicio.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Lista el calendario de un servicio para la vista en admin */
controllers.getCalendar = async (req, res) => {
    try {
        /** Se reciben los parámetros */
        const { s_id } = req.body
        /** Relación de tablas */
        linkHasMany(ServiceCalendarModel, ServiceCalendarHoursModel, 'sc_id', 'sc_id')
        /** Se consultan los datos */
        const data = await ServiceCalendarModel.findAll({ attributes: ['s_id', 'sc_id', 'sc_type', 'sc_state'], include: [{ attributes: ['sch_id', 'sch_value', 'sch_state'], model: ServiceCalendarHoursModel }], where: { s_id: deCode(s_id) } })
        /** Si se encuentran datos, se responden los datos */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningpun resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers