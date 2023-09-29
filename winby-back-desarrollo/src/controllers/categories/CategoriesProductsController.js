/* eslint-disable camelcase */
'use strict'
const controllers = {}
const path = require('path')
const fse = require('fs-extra')
const { deCode, linkBelongsTo, linkHasMany, UpCrNotFind, parseJson } = require('../../utils')
const { Op } = require('sequelize')
const CategoryProductsModel = require('../../models/categories/CategoryProductsModel')
const SubCategoryProductsModel = require('../../models/categories/SubCategoryProductsModel')
const AttributeSubCategoryProductsModel = require('../../models/categories/AttributeSubCategoryProductsModel')
const TypeAttributeSubCategoryProductsModel = require('../../models/categories/TypeAttributeSubCategoryProductsModel')
const TypeAttributesModel = require('../../models/info/TypeAttributesModel')

/** Busca un registro */
controllers.getOne = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { cp_id, cp_state } = req.body

        /** Relacion de base de datos */
        linkHasMany(CategoryProductsModel, SubCategoryProductsModel, 'cp_id', 'cp_id')
        linkHasMany(SubCategoryProductsModel, AttributeSubCategoryProductsModel, 'scp_id', 'scp_id')
        linkHasMany(AttributeSubCategoryProductsModel, TypeAttributeSubCategoryProductsModel, 'ascp_id', 'ascp_id')
        linkBelongsTo(AttributeSubCategoryProductsModel, TypeAttributesModel, 'ta_id', 'ta_id')

        /** verificando que parametro es para hacer la consulta */
        const data = await CategoryProductsModel.findOne({
            attributes: ['cp_id', 'cp_name', 'cp_priority', 'cp_horPho', 'cp_verPho', 'cp_icon', 'cp_state'],
            include: [{
                attributes: ['scp_id', 'cp_id', 'scp_name', 'scp_priority', 'scp_photo'],
                model: SubCategoryProductsModel,
                include: [{
                    attributes: ['ascp_id', 'ascp_name', 'ascp_priority'],
                    model: AttributeSubCategoryProductsModel,
                    include: [
                        { attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel, required: false },
                        { attributes: ['tascp_id', 'tascp_name'], model: TypeAttributeSubCategoryProductsModel, where: { tascp_state: 1 }, required: false }
                    ],
                    where: { ascp_state: 1 },
                    required: false
                }],
                where: { scp_state: 1 },
                required: false
            }],
            where: { cp_id: deCode(cp_id), cp_state: cp_state || { [Op.gt]: 0 } },
            order: [['cp_priority', 'ASC'], [SubCategoryProductsModel, 'scp_priority', 'ASC'], [SubCategoryProductsModel, { model: AttributeSubCategoryProductsModel }, 'ascp_priority', 'ASC']]
        })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca la información de una Sub categoria */
controllers.getOneSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { scp_id, scp_state } = req.params

        /** Relacion de base de datos */
        linkHasMany(SubCategoryProductsModel, AttributeSubCategoryProductsModel, 'scp_id', 'scp_id')
        linkHasMany(AttributeSubCategoryProductsModel, TypeAttributeSubCategoryProductsModel, 'ascp_id', 'ascp_id')
        linkBelongsTo(AttributeSubCategoryProductsModel, TypeAttributesModel, 'ta_id', 'ta_id')

        /** verificando que parametro es para hacer la consulta */
        const data = await SubCategoryProductsModel.findOne({
            attributes: ['scp_id', 'scp_name', 'scp_priority', 'scp_photo'],
            include: [{
                attributes: ['ascp_id', 'ascp_name', 'ascp_priority'],
                model: AttributeSubCategoryProductsModel,
                include: [
                    { attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel, required: false },
                    { attributes: ['tascp_id', 'tascp_name'], model: TypeAttributeSubCategoryProductsModel, where: { tascp_state: 1 }, required: false }
                ],
                where: { ascp_state: 1 },
                required: false
            }],
            where: { scp_id: deCode(scp_id), scp_state: scp_state !== 'false' ? scp_state : { [Op.gte]: 0 } },
            order: [['scp_priority', 'ASC'], [AttributeSubCategoryProductsModel, 'ascp_priority', 'ASC']]
        })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca la información de una Sub categoria */
controllers.getAllSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { cp_id, scp_state, min, max, typeOrder } = req.body
        let order = []

        if (typeOrder === 1) { order = [['scp_priority', 'ASC']] }

        /** verificando que parametro es para hacer la consulta */
        const data = await SubCategoryProductsModel.findAll({
            attributes: ['scp_id', 'cp_id', 'scp_name', 'scp_priority', 'scp_photo', 'scp_state'],
            where: { cp_id: deCode(cp_id), scp_state: scp_state !== 'false' ? scp_state : { [Op.gte]: 0 } },
            order,
            limit: [min, max]
        })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todo los registro */
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { cp_state, min, max, typeOrder, search } = req.body
        let order = [], limit
        let whereSearch = {}

        if (typeOrder === 1) { order = [['cp_priority', 'ASC']] }
        if (search) whereSearch = { cp_name: { [Op.like]: `${ search }%` } }

        /** Relacion de base de datos */
        linkHasMany(CategoryProductsModel, SubCategoryProductsModel, 'cp_id', 'cp_id')

        if (max) limit = [min, max]

        /** verificando que parametro es para hacer la consulta */
        const data = await CategoryProductsModel.findAll({
            attributes: ['cp_id', 'cp_name', 'cp_priority', 'cp_horPho', 'cp_verPho', 'cp_icon', 'cp_state'],
            include: [{
                attributes: ['scp_id', 'scp_name', 'scp_priority'],
                model: SubCategoryProductsModel,
                where: { scp_state: 1 }
            }],
            where: { cp_state: cp_state || { [Op.gt]: 0 }, ...whereSearch },
            order,
            limit
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registra o edita */
controllers.register = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { cp_id, cp_name, cp_priority, cp_horPho, cp_verPho, cp_icon, horPho, verPho, icon, cp_state, subcategoryproducts: scp } = req.body

        /** Registra o actualiza una categoria */
        const data = await UpCrNotFind(CategoryProductsModel, { cp_name, cp_horPho: horPho ? req.files[horPho].filename : cp_horPho, cp_verPho: verPho ? req.files[verPho].filename : cp_verPho, cp_icon: icon ? req.files[icon].filename : cp_icon, cp_priority: cp_priority || 1, cp_state: (cp_state !== null && cp_state !== undefined) ? cp_state : 1 }, false, !!cp_id && { id: 'cp_id', value: cp_id })

        /** Mueve las dos fotos de la categoria */
        if (horPho) { fse.move(req.files[horPho].path, path.join(__dirname, `../../../public/categories/products/${ data.cp_id }/${ req.files[horPho].filename }`)) }
        if (verPho) { fse.move(req.files[verPho].path, path.join(__dirname, `../../../public/categories/products/${ data.cp_id }/${ req.files[verPho].filename }`)) }
        if (icon) { fse.move(req.files[icon].path, path.join(__dirname, `../../../public/categories/products/${ data.cp_id }/${ req.files[icon].filename }`)) }

        /** verifica si hay subcategorias */
        if (scp.length) {
            const scpData = parseJson(scp, [])
            for (let i = 0; i < scpData.length; i++) {
                const { scp_id, scp_name, scp_photo, file, scp_priority, scp_state, attributesubcategoryproducts: ascp } = scpData[i]
                /** Registra o edita una subcategoria */
                const dataSCP = await UpCrNotFind(SubCategoryProductsModel, { cp_id: deCode(data.cp_id), scp_name, scp_photo, scp_priority: scp_priority || i + 1, scp_state: (scp_state !== null && scp_state !== undefined) ? scp_state : 1 }, false, !!scp_id && { id: 'scp_id', value: scp_id })

                /** Guarda la foto de la sub categoria */
                if (file) {
                    const findFile = req.files.find((x) => x.filename === scp_photo)
                    if (findFile) { fse.move(findFile.path, path.join(__dirname, `../../../public/categories/products/${ data.cp_id }/${ dataSCP.scp_id }/${ scp_photo }`)) }
                }

                /** Verifica si hay atributos */
                if ((ascp || []).length) {
                    for (let ii = 0; ii < ascp.length; ii++) {
                        const { ascp_id, ta_id, ascp_name, typeattribute, ascp_priority, ascp_state, typeattributesubcategoryproducts: tascp } = ascp[ii]
                        /** Registra o edita un atributo */
                        const dataASCP = await UpCrNotFind(AttributeSubCategoryProductsModel, { scp_id: deCode(dataSCP.scp_id), ta_id: deCode(ta_id || typeattribute.ta_id), ascp_name, ascp_priority: ascp_priority || ii + 1, ascp_state: (ascp_state !== null && ascp_state !== undefined) ? ascp_state : 1 }, false, !!ascp_id && { id: 'ascp_id', value: ascp_id })

                        /** verifica si hay tipos de atributos  */
                        if (!!(tascp || []).length && typeattribute.ta_type > 1) {
                            for (let iii = 0; iii < tascp.length; iii++) {
                                const { tascp_id, tascp_name, tascp_state } = tascp[iii]
                                /** Registra o edita un atributo */
                                UpCrNotFind(TypeAttributeSubCategoryProductsModel, { ascp_id: deCode(dataASCP.ascp_id), tascp_name, tascp_state: (tascp_state !== null && tascp_state !== undefined) ? tascp_state : 1 }, false, !!tascp_id && { id: 'tascp_id', value: tascp_id })
                            }
                        }
                    }
                }
            }
        }
        /** respuesta */
        return res.json({ success: 1, message: 'La nueva Categoria de Productos ha sido registrada con éxito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Cambiar estado */
controllers.delete = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { cp_id } = req.body

        /** Desactiva la categoría */
        CategoryProductsModel.update({ cp_state: 0 }, { where: { cp_id: deCode(cp_id) } })

        /** respuesta */
        res.json({ success: 1, message: 'Ha eliminado la categoría con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers