'use strict'
const controllers = {}
const { deCode, linkHasMany, linkBelongsTo } = require('../../utils')
const { Op } = require('sequelize')
const AttributeSubCategoryServicesModel = require('../../models/categories/AttributeSubCategoryServicesModel')
const TypeAttributeSubCategoryServicesModel = require('../../models/categories/TypeAttributeSubCategoryServicesModel');
const TypeAttributesModel = require('../../models/info/TypeAttributesModel');

// busca todos los atributo de la sub categoria
controllers.getAllAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ascs_state, scs_id, min, max, typeOrder } = req.body
        let order = [], limit

        /** relación de base de datos */
        linkHasMany(AttributeSubCategoryServicesModel, TypeAttributeSubCategoryServicesModel, 'ascs_id', 'ascs_id')
        linkBelongsTo(AttributeSubCategoryServicesModel, TypeAttributesModel, 'ta_id', 'ta_id')

        if (typeOrder === 1) order = [['ascs_priority', 'ASC']]

        if (max) limit = [min, max]

        /** Desactiva el atributo de la sub categoría */
        const data = await AttributeSubCategoryServicesModel.findAll({
            attributes: ['ascs_id', 'scs_id', 'ta_id', 'ascs_name', 'ascs_priority', 'ascs_state'],
            include: [{ attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel }, { attributes: ['tascs_id', 'tascs_name'], model: TypeAttributeSubCategoryServicesModel, where: { tascs_state: 1 }, required: false }],
            where: { scs_id: scs_id ? deCode(scs_id) : { [Op.gte]: 0 }, ascs_state: ascs_state || { [Op.gte]: 0 } },
            limit,
            order
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// busca un atributo de la sub categoria
controllers.getOneAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ascs_id, ascs_state } = req.body

        /** relación de base de datos */
        linkHasMany(AttributeSubCategoryServicesModel, TypeAttributeSubCategoryServicesModel, 'ascs_id', 'ascs_id')
        linkBelongsTo(AttributeSubCategoryServicesModel, TypeAttributesModel, 'ta_id', 'ta_id')

        /** Desactiva el atributo de la sub categoría */
        const data = await AttributeSubCategoryServicesModel.findOne({
            attributes: ['ascs_id', 'scs_id', 'ta_id', 'ascs_name', 'ascs_priority', 'ascs_state'],
            include: [{ attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel }, { attributes: ['tascs_id', 'tascs_name'], model: TypeAttributeSubCategoryServicesModel, where: { tascs_state: 1 }, required: false }],
            where: { ascs_id: deCode(ascs_id), ascs_state: ascs_state || { [Op.gte]: 0 } },
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// cambiar a estado apagado atributo de la sub categoria
controllers.deleteAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ascs_id } = req.body

        /** Desactiva el atributo de la sub categoría */
        AttributeSubCategoryServicesModel.update({ ascs_state: 0 }, { where: { ascs_id: deCode(ascs_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado el atributo con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// cambiar a estado apagado tipo de atributo de la sub categoria
controllers.deleteTypAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { tascs_id } = req.body

        /** desactiva el tipo de atributo de la sub categoría */
        TypeAttributeSubCategoryServicesModel.update({ tascs_state: 0 }, { where: { tascs_id: deCode(tascs_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado el tipo de atributo con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers