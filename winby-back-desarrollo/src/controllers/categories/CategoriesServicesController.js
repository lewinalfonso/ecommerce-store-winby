'use strict'
const controllers = {}
const path = require('path')
const fse = require('fs-extra')
const { deCode, linkBelongsTo, linkHasMany, UpCrNotFind, parseJson } = require('../../utils')
const { Op } = require('sequelize')
const CategoryServicesModel = require('../../models/categories/CategoryServicesModel')
const SubCategoryServicesModel = require('../../models/categories/SubCategoryServicesModel')
const AttributeSubCategoryServicesModel = require('../../models/categories/AttributeSubCategoryServicesModel')
const TypeAttributeSubCategoryServicesModel = require('../../models/categories/TypeAttributeSubCategoryServicesModel')
const TypeAttributesModel = require('../../models/info/TypeAttributesModel')

/** Busca un solo registro */
controllers.getOne = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { cs_id, cs_state } = req.body

        /** Relacion de base de datos */
        linkHasMany(CategoryServicesModel, SubCategoryServicesModel, 'cs_id', 'cs_id')
        linkHasMany(SubCategoryServicesModel, AttributeSubCategoryServicesModel, 'scs_id', 'scs_id')
        linkHasMany(AttributeSubCategoryServicesModel, TypeAttributeSubCategoryServicesModel, 'ascs_id', 'ascs_id')
        linkBelongsTo(AttributeSubCategoryServicesModel, TypeAttributesModel, 'ta_id', 'ta_id')

        /** verificando que parametro es para hacer la consulta */
        const data = await CategoryServicesModel.findOne({
            attributes: ['cs_id', 'cs_name', 'cs_priority', 'cs_horPho', 'cs_verPho', 'cs_icon', 'cs_state'],
            include: [{
                attributes: ['scs_id', 'cs_id', 'scs_name', 'scs_priority', 'scs_photo'],
                model: SubCategoryServicesModel,
                include: [{
                    attributes: ['ascs_id', 'ascs_priority', 'ascs_name'],
                    model: AttributeSubCategoryServicesModel,
                    include: [
                        { attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel, required: false },
                        { attributes: ['tascs_id', 'tascs_name'], model: TypeAttributeSubCategoryServicesModel, where: { tascs_state: 1 }, required: false }
                    ],
                    where: { ascs_state: 1 },
                    required: false
                }],
                where: { scs_state: 1 },
                required: false
            }],
            where: { cs_id: deCode(cs_id), cs_state: cs_state || { [Op.gte]: 0 } },
            order: [['cs_priority', 'ASC'], [SubCategoryServicesModel, 'scs_priority', 'ASC'], [SubCategoryServicesModel, { model: AttributeSubCategoryServicesModel }, 'ascs_priority', 'ASC']]
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Buscar todas las categorias */
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { cs_state, min, max, typeOrder } = req.body
        let order = [], limit

        if (typeOrder === 1) order = [['cs_priority', 'ASC']]

        if (max) limit = [min, max]

        /** Relacion de base de datos */
        linkHasMany(CategoryServicesModel, SubCategoryServicesModel, 'cs_id', 'cs_id')

        /** verificando que parametro es para hacer la consulta */
        const data = await CategoryServicesModel.findAll({
            attributes: ['cs_id', 'cs_name', 'cs_priority', 'cs_horPho', 'cs_verPho', 'cs_icon', 'cs_state'],
            include: [{
                attributes: ['scs_id', 'scs_name', 'scs_priority'],
                model: SubCategoryServicesModel,
                where: { scs_state: 1 }
            }],
            where: { cs_state: cs_state || { [Op.gt]: 0 } },
            order,
            limit
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registrar o editar */
controllers.register = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { cs_id, cs_name, cs_priority, cs_horPho, cs_verPho, cs_icon, horPho, verPho, icon, cs_state, subcategoryservices: scs } = req.body

        /** Registra o actualiza una categoria */
        const data = await UpCrNotFind(CategoryServicesModel, { cs_name, cs_horPho: horPho ? req.files[horPho].filename : cs_horPho, cs_verPho: verPho ? req.files[verPho].filename : cs_verPho, cs_icon: icon ? req.files[icon].filename : cs_icon, cs_priority: cs_priority || 1, cs_state: (cs_state !== null && cs_state !== undefined) ? cs_state : 1 }, false, !!cs_id && { id: 'cs_id', value: cs_id })

        /** Mueve las dos fotos de la categoria */
        if (horPho) fse.move(req.files[horPho].path, path.join(__dirname, `../../../public/categories/services/${ data.cs_id }/${ req.files[horPho].filename }`))
        if (verPho) fse.move(req.files[verPho].path, path.join(__dirname, `../../../public/categories/services/${ data.cs_id }/${ req.files[verPho].filename }`))
        if (icon) fse.move(req.files[icon].path, path.join(__dirname, `../../../public/categories/services/${ data.cs_id }/${ req.files[icon].filename }`))
        /** verifica si hay subcategorias */
        if (scs.length) {
            const scsData = parseJson(scs, [])
            for (let i = 0; i < scsData.length; i++) {
                const { scs_id, scs_name, scs_photo, file, scs_priority, scs_state, attributesubcategoryservices: ascs } = scsData[i]

                /** Registra o edita una subcategoria */
                const dataSCS = await UpCrNotFind(SubCategoryServicesModel, { cs_id: deCode(data.cs_id), scs_name, scs_photo, scs_priority: scs_priority || i + 1, scs_state: (scs_state !== null && scs_state !== undefined) ? scs_state : 1 }, false, !!scs_id && { id: 'scs_id', value: scs_id })

                /** Guarda la foto de la sub categoria */
                if (file) {
                    const findFile = req.files.find((x) => x.filename === scs_photo)
                    if (findFile) { fse.move(findFile.path, path.join(__dirname, `../../../public/categories/services/${ data.cs_id }/${ dataSCS.scs_id }/${ scs_photo }`)) }
                }

                /** Verifica si hay atributos */
                if ((ascs || []).length) {
                    for (let ii = 0; ii < ascs.length; ii++) {
                        const { ascs_id, ta_id, ascs_name, typeattribute, ascs_priority, ascs_state, typeattributesubcategoryservices: tascs } = ascs[ii]
                        /** Registra o edita un atributo */
                        const dataASCS = await UpCrNotFind(AttributeSubCategoryServicesModel, { scs_id: deCode(dataSCS.scs_id), ta_id: deCode(ta_id || typeattribute.ta_id), ascs_name, ascs_priority: ascs_priority || ii + 1, ascs_state: (ascs_state !== null && ascs_state !== undefined) ? ascs_state : 1 }, false, !!ascs_id && { id: 'ascs_id', value: ascs_id })

                        /** verifica si hay tipos de atributos  */
                        if (!!(tascs || []).length && typeattribute.ta_type > 1) {
                            for (let iii = 0; iii < tascs.length; iii++) {
                                const { tascs_id, tascs_name, tascs_state } = tascs[iii]
                                /** Registra o edita un atributo */
                                UpCrNotFind(TypeAttributeSubCategoryServicesModel, { ascs_id: deCode(dataASCS.ascs_id), tascs_name, tascs_state: (tascs_state !== null && tascs_state !== undefined) ? tascs_state : 1 }, false, !!tascs_id && { id: 'tascs_id', value: tascs_id })
                            }
                        }
                    }
                }
            }
        }
        /** respuesta */
        return res.json({ success: 1, message: 'La nueva Categoria de Servicios ha sido registrada con éxito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Cambiar estado */
controllers.delete = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { cs_id } = req.body

        /** Verifica si existe para actualizar */
        CategoryServicesModel.update({ cs_state: 0 }, { where: { cs_id: deCode(cs_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado la categoria con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers