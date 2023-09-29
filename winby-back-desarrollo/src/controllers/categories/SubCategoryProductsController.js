'use strict'
const controllers = {}
const { deCode, linkHasMany } = require('../../utils')
const { Op } = require('sequelize')
const SubCategoryProductsModel = require('../../models/categories/SubCategoryProductsModel')
const CategoryProductsModel = require('../../models/categories/CategoryProductsModel')

/** Busca la información de una Sub categoria */
controllers.getOneSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { scp_id, scp_state } = req.body

        /** verificando que parametro es para hacer la consulta */
        const data = await SubCategoryProductsModel.findOne({
            attributes: ['scp_id', 'cp_id', 'scp_name', 'scp_priority', 'scp_photo', 'scp_state'],
            where: { scp_id: deCode(scp_id), scp_state: scp_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

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
        let order = [], limit

        if (typeOrder === 1) order = [['scp_priority', 'ASC']]

        if (max) limit = [min, max]

        /** verificando que parametro es para hacer la consulta */
        const data = await SubCategoryProductsModel.findAll({
            attributes: ['scp_id', 'cp_id', 'scp_name', 'scp_priority', 'scp_photo', 'scp_state'],
            where: { cp_id: cp_id ? deCode(cp_id) : { [Op.gte]: 0 }, scp_state: scp_state || { [Op.gte]: 0 } },
            order,
            limit
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** cambiar a estado apagado sub categoria */
controllers.deleteSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { scp_id } = req.body

        /** Desactiva la sub categoría */
        SubCategoryProductsModel.update({ scp_state: 0 }, { where: { scp_id: deCode(scp_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado la sub categoría con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers