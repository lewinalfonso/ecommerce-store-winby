'use strict'
const controllers = {}
const { deCode } = require('../../utils')
const { Op } = require('sequelize')
const SubCategoryServicesModel = require('../../models/categories/SubCategoryServicesModel')

/** Busca la información de una Sub categoria */
controllers.getOneSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { scs_id, scs_state } = req.body
        /** verificando que parametro es para hacer la consulta */
        const data = await SubCategoryServicesModel.findOne({
            attributes: ['scs_id', 'cs_id', 'scs_name', 'scs_priority', 'scs_photo', 'scs_state'],
            where: { scs_id: deCode(scs_id), scs_state: scs_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca las sub categoria */
controllers.getAllSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { cs_id, scs_state, min, max, typeOrder } = req.body
        let order = [], limit
        if (typeOrder === 1) order = [['scs_priority', 'ASC']]

        if (max) limit = [min, max]

        /** verificando que parametro es para hacer la consulta */
        const data = await SubCategoryServicesModel.findAll({
            attributes: ['scs_id', 'cs_id', 'scs_name', 'scs_priority', 'scs_photo', 'scs_state'],
            where: { cs_id: deCode(cs_id), scs_state: scs_state || { [Op.gte]: 0 } },
            order,
            limit
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** cambiar a estado apagado sub categoria */
controllers.deleteSubCat = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { scs_id } = req.body

        /** Desactiva la sub categoría */
        SubCategoryServicesModel.update({ scs_state: 0 }, { where: { scs_id: deCode(scs_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado la sub categoría con exito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers