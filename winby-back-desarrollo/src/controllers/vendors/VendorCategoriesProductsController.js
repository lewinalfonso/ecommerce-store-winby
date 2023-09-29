const controllers = {}
const VendorCategoriesProductsModel = require('../../models/vendors/VendorCategoriesProductsModel')
const VendorSubCategoriesProductsModel = require('../../models/vendors/VendorSubCategoriesProductsModel')
const { deCode, UpCrNotFind } = require('../../utils')
const { Op } = require('sequelize')

/** Busca la categoria de servicio */
controllers.getOneCatPro = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcp_id, vcp_state } = req.body

        /** peticion */
        const data = await VendorCategoriesProductsModel.findOne({ attributes: ['vcp_id', 'cp_id'], where: { vcp_id: deCode(vcp_id), vcp_state: vcp_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todas las categorias de servicio */
controllers.getAllCatPro = async (req, res) => {
    try {
        /** variables necesarias */
        const { v_id, vcp_state } = req.body

        /** peticion */
        const data = await VendorCategoriesProductsModel.findAll({ attributes: ['vcp_id', 'cp_id'], where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, vcp_state: vcp_state || { [Op.gte]: 0 } } })

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
        const { vcp_id, vscp_state } = req.body

        /** peticion */
        const data = await VendorSubCategoriesProductsModel.findAll({ attributes: ['vscp_id', 'scp_id', 'vscp_groPer'], where: { vcp_id: vcp_id ? deCode(vcp_id) : { [Op.gte]: 0 }, vscp_state: vscp_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registrar o editar Categoria de Servicio */
controllers.registerCatPro = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcp_id, v_id, cp_id, vcp_state, subcategoryproducts } = req.body
        /** Registra la categoria de servicios al vendedor */
        const data = await UpCrNotFind(VendorCategoriesProductsModel, { v_id: deCode(v_id), cp_id: deCode(cp_id), vcp_state: !!vcp_state ? vcp_state : 1 }, false, !!vcp_id && { id: 'vcp_id', value: vcp_id })

        /** registra las subcategoria con los valores del % de utilidad */
        for (let i = 0; i < subcategoryproducts.length; i++) {
            const { vscp_id, scp_id, vscp_groPer, vscp_state } = subcategoryproducts[i];
            /** Registra la sub categoria de servicios al vendedor */
            if (vscp_state === 0 && !vscp_id) ''
            else UpCrNotFind(VendorSubCategoriesProductsModel, { vcp_id: deCode(data.vcp_id), scp_id: deCode(scp_id), vscp_groPer, vscp_state: (vscp_state !== null && vscp_state !== undefined) ? vscp_state : 1 }, false, !!vscp_id && { id: 'vscp_id', value: vscp_id })
        }

        /** respuesta */
        return res.json({ success: 1, message: 'Categoría Registrada Exitosamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Eliminar Categoria de Servicio */
controllers.deleteCatPro = async (req, res) => {
    try {
        /** variables necesarias */
        const { vcp_id, v_id } = req.body

        /** Registra la categoria de servicios al vendedor */
        VendorCategoriesProductsModel.destroy({ where: { vcp_id: deCode(vcp_id), v_id: deCode(v_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ha eliminado la Categoría.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers