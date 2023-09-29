const controllers = {}
const CategoryServicesModel = require('../../models/categories/CategoryServicesModel')
const CategoryProductsModel = require('../../models/categories/CategoryProductsModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const ServicesModel = require('../../models/services/ServicesModel')
const ServicePhotosModel = require('../../models/services/ServicePhotosModel')
const SubCategoryProductsModel = require('../../models/categories/SubCategoryProductsModel')
const SubCategoryServicesModel = require('../../models/categories/SubCategoryServicesModel')
const { Op } = require('sequelize')
const { linkHasMany } = require('../../utils')
const { errorLogMail } = require('../../utils/logMailer')

controllers.getAllMatchesCategories = async (req, res) => {
    try {
        // variables necesarias
        const { search } = req.body
        let data
        let secureSearch = search.replace(/\s+/g, ' ')
        if (secureSearch.charAt(0) === ' ') secureSearch = secureSearch.substring(1)
        if (secureSearch.charAt(secureSearch.length - 1) === ' ') secureSearch = secureSearch.substring(0, secureSearch.length - 1)

        // Buscar categorías de productos
        const cpData = await CategoryProductsModel.findAll({
            attributes: ['cp_id', 'cp_name', 'cp_horPho', 'cp_verPho'],
            where: { cp_name: { [Op.substring]: secureSearch }, cp_state: 1 }
        })

        // Buscar subcategorias de productos
        const scpData = await SubCategoryProductsModel.findAll({
            attributes: ['scp_id', 'cp_id', 'scp_name', 'scp_photo'],
            where: { scp_name: { [Op.substring]: secureSearch }, scp_state: 1 }
        })

        // Buscar categorías de servicios
        const csData = await CategoryServicesModel.findAll({
            attributes: ['cs_id', 'cs_name', 'cs_horPho', 'cs_verPho'],
            where: { cs_name: { [Op.substring]: secureSearch }, cs_state: 1 }
        })

        // Buscar subcategorías de servicios
        const scsData = await SubCategoryServicesModel.findAll({
            attributes: ['scs_id', 'cs_id', 'scs_name', 'scs_photo'],
            where: { scs_name: { [Op.substring]: secureSearch }, scs_state: 1 }
        })

        // verifica el resultado
        if (cpData.length) data = data ? { ...data, cpData } : { cpData }
        if (csData.length) data = data ? { ...data, csData } : { csData }
        if (scpData.length) data = data ? { ...data, scpData } : { scpData }
        if (scsData.length) data = data ? { ...data, scsData } : { scsData }

        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todas las coincidencias de prpductos y servicios */
controllers.getAllMatchesProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { search, min, max, typeOrder } = req.body
        let data, orderP = [], orderS = []
        let secureSearch = search.replace(/\s+/g, ' ')
        if (secureSearch.charAt(0) === ' ') secureSearch = secureSearch.substring(1)
        if (secureSearch.charAt(secureSearch.length - 1) === ' ') secureSearch = secureSearch.substring(0, secureSearch.length - 1)

        /** relaciones de base de datos */
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')

        if (typeOrder === 1) {
            orderP = [['p_id', 'DESC']]
            orderS = [['s_id', 'DESC']]
        }

        /** Buscar productos */
        const pData = await ProductsModel.findAll({
            attributes: ['p_id', 'v_id', 'p_name', 'p_description', 'p_price', 'p_delivery', 'p_taxGat'],
            include: [{ attributes: ['pp_id', 'pp_name'], model: ProductPhotosModel, where: { pp_state: 1 } }],
            where: { p_name: { [Op.substring]: secureSearch }, p_state: 1, p_typeVen: { [Op.or]: [1, null] } },
            order: orderP,
            limit: [min || 0, max || 20]
        })

        /** Buscar servicios */
        const sData = await ServicesModel.findAll({
            attributes: ['s_id', 'v_id', 's_name', 's_description', 's_price', 's_delivery', 's_taxGat'],
            include: [{ attributes: ['sp_id', 'sp_name'], model: ServicePhotosModel, where: { sp_state: 1 } }],
            where: { s_name: { [Op.substring]: secureSearch }, s_state: 1, s_typeVen: { [Op.or]: [1, null] } },
            order: orderS,
            limit: [min || 0, max || 20]
        })

        if (pData.length) data = data ? { ...data, pData } : { pData }
        if (sData.length) data = data ? { ...data, sData } : { sData }
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers