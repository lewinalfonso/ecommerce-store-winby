'use strict'
const controllers = {}
const path = require('path')
const fse = require('fs-extra')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ProductLocalsModel = require('../../models/products/ProductLocalsModel')
const ProductAttributesModel = require('../../models/products/ProductAttributesModel')
const SubCategoryProductsModel = require('../../models/categories/SubCategoryProductsModel')
const CategoryProductsModel = require('../../models/categories/CategoryProductsModel')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')
const AttributeSubCategoryProductsModel = require('../../models/categories/AttributeSubCategoryProductsModel')
const { deCode, linkBelongsTo, linkHasMany, UpCrNotFind, generateSku } = require('../../utils')
const { Op, fn } = require('sequelize')
const InfoSelesModel = require('../../models/info/InfoSelesModel')
const VendorsModel = require('../../models/vendors/VendorsModel')
const TypeAttributesModel = require('../../models/info/TypeAttributesModel')
const { errorLogMail } = require('../../utils/logMailer')

/** busca un solo registro */
controllers.getOne = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { p_id, p_state } = req.body

        /** Relacion de base de dato */
        linkBelongsTo(ProductsModel, SubCategoryProductsModel, 'scp_id', 'scp_id')
        linkBelongsTo(SubCategoryProductsModel, CategoryProductsModel, 'cp_id', 'cp_id')
        linkHasMany(ProductsModel, ProductAttributesModel, 'p_id', 'p_id')
        linkBelongsTo(ProductAttributesModel, AttributeSubCategoryProductsModel, 'ascp_id', 'ascp_id')
        linkBelongsTo(AttributeSubCategoryProductsModel, TypeAttributesModel, 'ta_id', 'ta_id')

        /** buscar producto */
        const data = await ProductsModel.findOne({
            attributes: ['p_id', 'v_id', 'p_name', 'p_description', 'p_price', 'p_width', 'p_height', 'p_length', 'p_weight', 'p_quantity', 'p_available', 'p_groPer', 'p_views', 'p_sellers', 'p_franchise', 'p_outstanding', 'p_monFra', 'p_cover', 'p_delivery', 'p_state', 'p_taxGat', 'p_typeVen', 'p_sku'],
            model: ProductsModel,
            include: [{
                attributes: ['scp_id', 'scp_name'],
                model: SubCategoryProductsModel,
                include: [{ attributes: ['cp_id', 'cp_name'], model: CategoryProductsModel }]
            },
            { attributes: ['pp_id', 'pp_name', 'pp_cover'], model: ProductPhotosModel, where: { pp_state: 1 }, required: false },
            {
                attributes: ['pl_id', 'pl_state'],
                model: ProductLocalsModel,
                where: { pl_state: 1 },
                required: false,
                include: [
                    {
                        attributes: ['vl_id', 'vl_name', 'v_id', 'c_id', 'd_id', 'm_id', 'vl_address', 'vl_lat', 'vl_lon', 'vl_domFre', 'vl_cosKM', 'vl_domLoc', 'vl_domNat'],
                        model: VendorsLocalsModel,
                        include: [{ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }]
                    }
                ]
            },
            {
                attributes: ['pa_id', 'ascp_id', 'pa_name', 'pa_value', 'pa_priority', 'pa_state'],
                include: [{
                    attributes: ['ascp_id'],
                    include: [{ attributes: ['ta_id', 'ta_type'], model: TypeAttributesModel }],
                    model: AttributeSubCategoryProductsModel
                }],
                model: ProductAttributesModel,
                where: { pa_state: 1 },
                required: false
            }
            ],
            where: { p_id: deCode(p_id), p_state: p_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resulado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca todo los productos segun la categoria */
controllers.getAllProSubCat = async (req, res) => {
    try {
        const { scp_id } = req.params

        /** Relacion de base de datos */
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')

        const data = await ProductsModel.findAll({
            attributes: ['p_id', 'p_name', 'p_price', 'p_width', 'p_height','p_length', 'p_weight', 'p_quantity', 'p_groPer', 'p_taxGat', 'p_sku'],
            include: [{ attributes: ['pp_id', 'pp_name', 'pp_cover'], model: ProductPhotosModel, required: false }],
            where: { p_state: 1, scp_id: deCode(scp_id) }
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca todos los registro */
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { v_id, cp_id, scp_id, p_state, min, max, search, typeOrder, cover, franchise, noWinber, count, orderCol } = req.body
        let order = [], whereSCP = {}, where = {}, whereSearch = {}, limit
        /** Relaciones de base de dato */
        linkBelongsTo(ProductsModel, SubCategoryProductsModel, 'scp_id', 'scp_id')
        linkBelongsTo(SubCategoryProductsModel, CategoryProductsModel, 'cp_id', 'cp_id')
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')

        if (typeOrder === 1) order = fn('RAND')
        if (typeOrder === 2) order = [['p_id', 'DESC']]
        if (typeOrder === 3) order = [['p_views', 'DESC']]
        if (typeOrder === 4) order = [['p_sellers', 'DESC']]
        if (typeOrder === 5) order = [['p_sellers', 'DESC'], ['p_views', 'DESC']]

        if (cp_id) whereSCP = { ...whereSCP, cp_id: deCode(cp_id) }
        if (scp_id) whereSCP = { ...whereSCP, scp_id: deCode(scp_id) }
        if (cover) where = { [Op.or]: { ...where, p_outstanding: 1 } }
        if (franchise) where = { [Op.or]: { ...where, p_franchise: 1 } }

        if (search) {
            let secureSearch = search.replace(/\s+/g, ' ')
            if (secureSearch.charAt(0) === ' ') secureSearch = secureSearch.substring(1)
            if (secureSearch.charAt(secureSearch.length - 1) === ' ') secureSearch = secureSearch.substring(0, secureSearch.length - 1)
            whereSearch = { [Op.or]: [{ p_name: { [Op.substring]: secureSearch } }, { p_sku: { [Op.substring]: secureSearch } }] }
        }

        if (max) limit = [min || 0, max]

        /** peticion */
        const data = await ProductsModel.findAll({
            attributes: ['p_id', 'v_id', 'p_name', 'p_description', 'p_price', 'p_width', 'p_height', 'p_length', 'p_weight', 'p_quantity', 'p_available', 'p_groPer', 'p_views', 'p_sellers', 'p_franchise', 'p_outstanding', 'p_monFra', 'p_cover', 'p_delivery', 'p_state', 'p_taxGat', 'p_typeVen', 'p_sku'],
            include: [{ attributes: ['scp_id', 'cp_id', 'scp_name'], model: SubCategoryProductsModel, where: whereSCP, required: cp_id || scp_id, include: [{ attributes: ['cp_id', 'cp_name'], model: CategoryProductsModel, where: { cp_state: 1 }, required: true }] },
                { attributes: ['pp_id', 'pp_name', 'pp_cover'], model: ProductPhotosModel, where: { pp_state: 1 }, required: false }
            ],
            where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, p_state: p_state || { [Op.or]: [1, 2] }, ...(noWinber ? { p_typeVen: { [Op.or]: [1, null] } } : {}) , ...whereSearch, ...where },
            order: orderCol || order,
            limit
        })
        /** respuesta */
        if (data.length) {
            let total = 0
            if (count) {
                total = await ProductsModel.count(
                    { include: [{ model: SubCategoryProductsModel, where: whereSCP, required: cp_id || scp_id }] },
                    { where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, p_state: p_state || { [Op.or]: [1, 2] }, ...(noWinber ? { p_typeVen: { [Op.or]: [1, null] } } : {}) , ...whereSearch, ...where } }
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
        const { p_id, scp_id } = req.body
        let where = {}
        /** Relaciones de base de dato */
        linkBelongsTo(ProductsModel, SubCategoryProductsModel, 'scp_id', 'scp_id')
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')

        if (scp_id) { where = { scp_id: deCode(scp_id) } } else {
            const dataP = await ProductsModel.findOne({ attributes: ['scp_id'], where: { p_id: deCode(p_id) } })
            if (!dataP) { return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' }) }
            where = { scp_id: deCode(dataP.scp_id) }
        }
        where = { ...where, p_id: { [Op.ne]: deCode(p_id) }, p_state: 1, p_typeVen: 1 }
        const data = await ProductsModel.findAll({
            attributes: ['p_id', 'v_id', 'p_name', 'p_description', 'p_price', 'p_width', 'p_height', 'p_length', 'p_weight', 'p_quantity', 'p_available', 'p_groPer', 'p_views', 'p_sellers', 'p_franchise', 'p_outstanding', 'p_monFra', 'p_cover', 'p_state', 'p_taxGat', 'p_sku'],
            include: [
                { attributes: ['scp_id', 'cp_id', 'scp_name'], model: SubCategoryProductsModel },
                { attributes: ['pp_id', 'pp_name', 'pp_cover'], model: ProductPhotosModel, where: { pp_state: 1 }, required: false },
                { attributes: ['pa_id', 'ascp_id'], model: ProductAttributesModel }
            ],
            where,
            order: [['p_id', 'DESC']],
            limit: 20
        })
        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Contador de Vistas */
controllers.viewPro = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { p_id } = req.body

        const data = await ProductsModel.findOne({ attributes: ['p_views'], where: { p_id: deCode(p_id) } })

        /** verificando que parametro es para hacer la consulta */
        if (data) ProductsModel.update({ p_views: (data.p_views + 1) }, { where: { p_id: deCode(p_id) } })

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Visualizar Productos más destacados por Franquicia */
controllers.getOutStanding = async (req, res) => {
    try {
        /** Relaciones de base de dato */
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')

        /** peticion */
        const data = await ProductsModel.findAll({
            attributes: ['p_name', 'p_description', 'p_price', 'p_width', 'p_height', 'p_length', 'p_weight', 'p_available', 'p_franchise', 'p_monFra', 'p_cover', 'p_taxGat', 'p_sku'],
            include: [{ attributes: ['pp_id', 'pp_name'], model: ProductPhotosModel, where: { pp_state: 1 }, required: false }],
            where: { p_outstanding: 1, p_state: 1 },
            order: ['p_franchise'],
            limit: 20
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registra los productos del administrador */
controllers.register = async (req, res) => {
    try {
        /** creación de variables y recibiendo parametros */
        const { p_id, v_id, p_name, p_description, p_price, p_width, p_height, p_length, p_weight, p_quantity, p_available, p_groPer, p_views, p_sellers, p_franchise, p_outstanding, p_state, scp_id, subcategoryproduct, productlocals, productattributes, productattributesOld } = req.body
        let dataP

        // Consultar vendedor
        const dataVendor = await VendorsModel.findOne({ attributes: ['v_type', 'v_skuPrefix'], where: { v_id: deCode(v_id) } })

        // Consultar porcentaje comisión de la pasarela
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_taxGat'], where: { is_state: 1 } })
        // Validar estado anterior del producto
        if (p_id) dataP = await ProductsModel.findOne({ attributes: ['p_groPer'], where: { p_id: deCode(p_id) } })

        let p_sku = undefined
        if (!p_id) p_sku = await generateSku(ProductsModel, 'p_sku', dataVendor.v_skuPrefix)

        /** Registrar Productos */
        const data = await UpCrNotFind(ProductsModel, {
            v_id: deCode(v_id),
            scp_id: scp_id ? deCode(scp_id) : subcategoryproduct.scp_id,
            p_name,
            p_description,
            p_price,
            p_width: p_width || undefined,
            p_height: p_height || undefined,
            p_length: p_length || undefined,
            p_weight: p_weight || undefined,
            p_quantity,
            p_available,
            p_groPer,
            p_delivery: 0,
            // p_views: p_views || 0,
            p_sellers: p_sellers || 0,
            p_franchise: p_franchise || undefined,
            p_outstanding: p_outstanding || 0,
            p_state: p_id ? parseInt(p_groPer) !== dataP.p_groPer ? 2 : ((p_state !== null && p_state !== undefined) ? p_state : 2) : 2,
            p_taxGat: (parseFloat(p_price) * dataIS.is_taxGat),
            p_typeVen: (dataVendor.v_type === 2 || dataVendor.v_type === 3) ? 2 : 1,
            p_sku
        }, false, !!p_id && { id: 'p_id', value: p_id })

        /** Registra la dirección del producto */
        if (productlocals.length) {
            for (let i = 0; i < productlocals.length; i++) {
                const { pl_id, vl_id, pl_state } = productlocals[i]
                UpCrNotFind(ProductLocalsModel, { vl_id: deCode(vl_id), p_id: deCode(data.p_id), pl_state: (pl_state !== null && pl_state !== undefined) ? pl_state : 1 }, false, !!pl_id && { id: 'pl_id', value: pl_id })
            }
        }
        if (productattributes.length) {
            for (let i = 0; i < productattributes.length; i++) {
                const { pa_id, pa_name, ascp_id, pa_value, pa_priority, pa_state } = productattributes[i]
                if (ascp_id) UpCrNotFind(ProductAttributesModel, { p_id: deCode(data.p_id), ascp_id: deCode(ascp_id), pa_name, pa_value, pa_priority: pa_priority || i + 1, pa_state: (pa_state !== null && pa_state !== undefined) ? pa_state : 1 }, false, !!pa_id && { id: 'pa_id', value: pa_id })
            }
        }

        if (productattributesOld) {
            for (let i = 0; i < productattributesOld.length; i++) {
                const { pa_id } = productattributesOld[i]
                if (pa_id) UpCrNotFind(ProductAttributesModel, { pa_state: 0 }, false, !!pa_id && { id: 'pa_id', value: pa_id })
            }
        }

        return res.json({ success: 1, p_id: data.p_id, message: p_id ? 'Ha editado un producto con éxito.' : 'Ha registrado un producto con éxito.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registra las imagenes del producto por el administrador */
controllers.registerDocuments = async (req, res) => {
    try {
        /** creación de variables y recibiendo parametros */
        const { p_id, productphotos } = req.body; let arrayPP = []
        /** Registrar las fotos */
        if (productphotos?.length && Array.isArray(productphotos)) {
            for (let i = 0; i < productphotos.length; i++) {
                const { pp_id, pp_name, file, pp_cover, pp_state } = JSON.parse(productphotos[i])

                /** Guarda la foto de la sub categoria */
                if (file) {
                    const findFile = req.files.find((x) => x.filename === pp_name)
                    if (findFile) { fse.move(findFile.path, path.join(__dirname, `../../../public/products/${ p_id }/${ findFile.filename }`)) }
                }

                const data = await UpCrNotFind(ProductPhotosModel, { p_id: deCode(p_id), pp_name, pp_cover: pp_cover || 0, pp_state: (pp_state !== null && pp_state !== undefined) ? pp_state : 1 }, false, !!pp_id && { id: 'pp_id', value: pp_id })
                arrayPP = [...arrayPP, deCode(data.pp_id)]
            }
        } else {
            const { pp_id, pp_name, file, pp_cover, pp_state } = JSON.parse(req.body.productphotos)

            if (file) {
                const findFile = req.files.find((x) => x.filename === pp_name)
                if (findFile) { fse.move(findFile.path, path.join(__dirname, `../../../public/products/${ p_id }/${ findFile.filename }`)) }
            }

            const data = await UpCrNotFind(ProductPhotosModel, { p_id: deCode(p_id), pp_name, pp_cover: pp_cover || 0, pp_state: (pp_state !== null && pp_state !== undefined) ? pp_state : 1 }, false, !!pp_id && { id: 'pp_id', value: pp_id })
            arrayPP = [...arrayPP, deCode(data.pp_id)]
        }

        /** Desactiva todas las fotos eliminadas */
        if (arrayPP.length) { ProductPhotosModel.update({ pp_state: 0 }, { where: { pp_id: { [Op.notIn]: arrayPP }, p_id: deCode(p_id) } }) }

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funciòn para confirmar un Producto */
controllers.confirm = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { p_id, p_state } = req.body

        /** Cambio de estado */
        await ProductsModel.update({ p_state }, { where: { p_id: deCode(p_id) } })

        /** respuesta */
        return res.json({ success: 1, message: p_state ? 'Producto confirmado' : 'Producto Rechazado' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funciòn para confirmar un Producto */
controllers.cancel = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { p_id } = req.body

        /** Cambio de estado */
        ProductsModel.update({ p_state: 0 }, { where: { p_id: deCode(p_id) } })

        /** respuesta */
        return res.json({ success: 1, p_id, message: 'Ha cancelado un producto.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Crea un producto como franquicia o destacado
 * @version 0.0.1
 * @param {object} req cliente
 * @param {object} res respuesta
 * @return {object} resultado
 */
controllers.registerCover = async (req, res) => {
    try {
        /** variables necesarias */
        const { p_id, type, p_monFra } = req.body
        /** activa el producto destacado o franquicia */
        ProductsModel.update({ p_franchise: type === '1' ? 1 : null, p_monFra: type === '1' ? p_monFra : null, p_outstanding: type === '2' ? 1 : null, p_cover: req.file?.filename }, { where: { p_id: deCode(p_id) } })

        if (req.file) fse.move(req.file.path, path.join(__dirname, `../../../public/products/${ p_id }/${ req.file.filename }`))

        /** respuesta */
        return res.json({ success: 1, message: 'Ha registrado un producto como destacado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Desactiva un producto destacado o franquicia
 * @version 0.0.1
 * @param {object} req cliente
 * @param {object} res respuesta
 * @return {object} resultado
 */
controllers.deleteCover = async (req, res) => {
    try {
        /** variables necesarias */
        const { p_id } = req.body
        /** busca el producto */
        const data = await ProductsModel.findOne({ attributes: ['p_cover'], where: { p_id: deCode(p_id) } })

        /** valida si existe el producto */
        if (!data) return res.json({ success: 0, message: 'No existe el producto.' })

        /** activa el producto destacado o franquicia */
        ProductsModel.update({ p_franchise: null, p_monFra: null, p_outstanding: null, p_cover: null }, { where: { p_id: deCode(p_id) } })

        fse.remove(path.join(__dirname, `../../../public/products/${ p_id }/${ data.p_cover }`))

        /** respuesta */
        return res.json({ success: 1, message: 'Eliminado el producto destacado con éxito.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Marca un producto com agotado
 * @version 0.0.1
 * @param {object} req cliente
 * @param {object} res respuesta
 * @return {object} resultado
 */
controllers.outOfStock = async (req, res) => {
    try {
        /** variables necesarias */
        const { p_id, v_id } = req.body
        /** busca el producto */
        const data = await ProductsModel.findOne({ attributes: ['p_id'], where: { p_id: deCode(p_id), v_id: deCode(v_id) } })

        /** valida si existe el producto */
        if (!data) return res.json({ success: 0, message: 'El producto que intentas modificar no existe' })
        ProductsModel.update({ p_available: 0 }, { where: { p_id: deCode(p_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha marcado el producto como agotado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers