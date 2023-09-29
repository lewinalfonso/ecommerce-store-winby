const controllers = {}
const VendorCategoriesServicesModel = require('../../models/vendors/VendorCategoriesServicesModel')
const VendorSubCategoriesServicesModel = require('../../models/vendors/VendorSubCategoriesServicesModel')
const { deCode, linkBelongsTo, UpCrNotFind, linkHasMany } = require('../../utils')
const { Op } = require('sequelize')
const SubCategoryServicesModel = require('../../models/categories/SubCategoryServicesModel')
const CategoryServicesModel = require('../../models/categories/CategoryServicesModel')

/** Busca la categoria de servicio */
controllers.getOneCatSer = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcs_id, vcs_state } = req.body

        /** peticion */
        const data = await VendorCategoriesServicesModel.findOne({ attributes: ['vcs_id', 'cs_id'], where: { vcs_id: deCode(vcs_id), vcs_state: vcs_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todas las categorias de servicio */
controllers.getAllCatSer = async (req, res) => {
    try {
        /** variables necesarias */
        const { v_id, vcs_state } = req.body

        /** peticion */
        const data = await VendorCategoriesServicesModel.findAll({ attributes: ['vcs_id', 'cs_id'], where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, vcs_state: vcs_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todas las categorias de servicio */
controllers.getAllSubCatPro = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcs_id, vscs_state } = req.body

        /** peticion */
        const data = await VendorSubCategoriesServicesModel.findAll({ attributes: ['vscs_id', 'scs_id', 'vscs_groPer'], where: { vcs_id: vcs_id ? deCode(vcs_id) : { [Op.gte]: 0 }, vscs_state: vscs_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registrar o editar Categoria de Servicio */
controllers.registerCatSer = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcs_id, v_id, cs_id, vcs_state, subcategoryservices } = req.body

        /** Registra la categoria de servicios al vendedor */
        const data = await UpCrNotFind(VendorCategoriesServicesModel, { v_id: deCode(v_id), cs_id: deCode(cs_id), vcs_state: vcs_state || 1 }, false, !!vcs_id && { id: 'vcs_id', value: vcs_id })

        /** registra las subcategoria con los valores del % de utilidad */
        for (let i = 0; i < subcategoryservices.length; i++) {
            const { vscs_id, scs_id, vscs_groPer, vscs_state } = subcategoryservices[i]
            /** Registra la sub categoria de servicios al vendedor */
            if (vscs_state === 0 && !vscs_id) ''
            else UpCrNotFind(VendorSubCategoriesServicesModel, { vcs_id: deCode(data.vcs_id), scs_id: deCode(scs_id), vscs_groPer, vscs_state: (vscs_state !== null && vscs_state !== undefined) ? vscs_state : 1 }, false, !!vscs_id && { id: 'vscs_id', value: vscs_id })
        }

        /** respuesta */
        return res.json({ success: 1, message: 'Categoría Registrada Exitosamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Eliminar Categoria de Servicio */
controllers.deleteCatSer = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcs_id, v_id } = req.body

        /** Registra la categoria de servicios al vendedor */
        VendorCategoriesServicesModel.destroy({ where: { vcs_id: deCode(vcs_id), v_id: deCode(v_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado la Categoría.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers