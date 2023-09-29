'use strict'
const controllers = {}
const { deCode, linkHasMany, linkBelongsTo } = require('../../utils')
const { Op } = require('sequelize')
const AttributeSubCategoryProductsModel = require('../../models/categories/AttributeSubCategoryProductsModel')
const TypeAttributeSubCategoryProductsModel = require('../../models/categories/TypeAttributeSubCategoryProductsModel')
const TypeAttributesModel = require('../../models/info/TypeAttributesModel')

/**
 * busca todos los atributo de la sub categoria.
 * @param {object} req lo que viene del cliente.
 * @param {object} res La devolución del cliente.
 * @returns {object} respuesta al cliente.
*/
controllers.getAllAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ascp_state, scp_id, min, max, typeOrder } = req.body
        let order = [], limit

        /** relación de base de datos */
        linkHasMany(AttributeSubCategoryProductsModel, TypeAttributeSubCategoryProductsModel, 'ascp_id', 'ascp_id')
        linkBelongsTo(AttributeSubCategoryProductsModel, TypeAttributesModel, 'ta_id', 'ta_id')

        if (typeOrder === 1) order = [['ascp_priority', 'ASC']]

        if (max) limit = [min, max]

        /** Desactiva el atributo de la sub categoría */
        const data = await AttributeSubCategoryProductsModel.findAll({
            attributes: ['ascp_id', 'scp_id', 'ta_id', 'ascp_name', 'ascp_priority', 'ascp_state'],
            include: [{ attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel }, { attributes: ['tascp_id', 'tascp_name'], model: TypeAttributeSubCategoryProductsModel, where: { tascp_state: 1 }, required: false }],
            where: { scp_id: scp_id ? deCode(scp_id) : { [Op.gte]: 0 }, ascp_state: ascp_state || { [Op.gte]: 0 } },
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

/**
 * busca un atributo de la sub categoria.
 * @param {object} req lo que viene del cliente.
 * @param {object} res La devolución del cliente.
 * @returns {object} respuesta al cliente.
*/
controllers.getOneAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ascp_id, ascp_state } = req.body

        /** relación de base de datos */
        linkHasMany(AttributeSubCategoryProductsModel, TypeAttributeSubCategoryProductsModel, 'ascp_id', 'ascp_id')
        linkBelongsTo(AttributeSubCategoryProductsModel, TypeAttributesModel, 'ta_id', 'ta_id')

        /** Desactiva el atributo de la sub categoría */
        const data = await AttributeSubCategoryProductsModel.findOne({
            attributes: ['ascp_id', 'scp_id', 'ta_id', 'ascp_name', 'ascp_priority', 'ascp_state'],
            include: [{ attributes: ['ta_id', 'ta_name', 'ta_type'], model: TypeAttributesModel }, { attributes: ['tascp_id', 'tascp_name'], model: TypeAttributeSubCategoryProductsModel, where: { tascp_state: 1 }, required: false }],
            where: { ascp_id: deCode(ascp_id), ascp_state: ascp_state || { [Op.gte]: 0 } },
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Cambiar a estado apagado atributo de la sub categoria.
 * @param {object} req lo que viene del cliente.
 * @param {object} res La devolución del cliente.
 * @returns {object} respuesta al cliente.
*/
controllers.deleteAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ascp_id } = req.body

        /** Desactiva el atributo de la sub categoría */
        AttributeSubCategoryProductsModel.update({ ascp_state: 0 }, { where: { ascp_id: deCode(ascp_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado el atributo con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Cambiar a estado apagado tipo de atributo de la sub categoria.
 * @param {object} req lo que viene del cliente.
 * @param {object} res La devolución del cliente.
 * @returns {object} respuesta al cliente.
*/
controllers.deleteTypAttSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { tascp_id } = req.body

        /** desactiva el tipo de atributo de la sub categoría */
        TypeAttributeSubCategoryProductsModel.update({ tascp_state: 0 }, { where: { tascp_id: deCode(tascp_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado el tipo de atributo con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers