'use strict'

const controllers = {}
const StoreKitsModel = require('../../models/sotore/StoreKitsModel')
const StoreKitItemsModel = require('../../models/sotore/StoreKitItemsModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const ServicesModel = require('../../models/services/ServicesModel')
const ServicePhotosModel = require('../../models/services/ServicePhotosModel')
const { linkBelongsTo, linkHasMany, deCode } = require('../../utils')
const { Op } = require('sequelize')
const { UserProfilesModel } = require('../../models')

/**
 * Todos los kits de productos actual de la tienda.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con todos los registros encontrados.
 */
controllers.getAll = async (req, res) => {
    try {
        const { u_code, u_id } = req.body
        let dataU
        // Relaciones de tablas
        linkHasMany(StoreKitsModel, StoreKitItemsModel, 'skId', 'skId')
        linkBelongsTo(StoreKitItemsModel, ProductsModel, 'p_id', 'pId')
        linkBelongsTo(StoreKitItemsModel, ServicesModel, 's_id', 'sId')
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')

        // bucar el id del usuario
        if (u_code && !u_id) {
            dataU = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code: u_code || 'Winby'} })
            if (!dataU) return res.json({ success: 0, message: 'No se ha encontrado la tienda...' })
        }

        const data = await StoreKitsModel.findAll({
            attributes: ['skId', 'skName'],
            include: [{
                attributes: ['skiId', 'pId', 'sId'],
                include: [{
                    attributes: ['p_id', 'p_name', 'p_price'],
                    include: [{
                        attributes: ['pp_id', 'pp_name'],
                        model: ProductPhotosModel,
                        where: { pp_state: 1 },
                        required: false
                    }],
                    model: ProductsModel,
                    where: { p_state: 1 },
                    required: false
                }, {
                    attributes: ['s_id', 's_name', 's_price'],
                    include: [{
                        attributes: ['sp_id', 'sp_name'],
                        model: ServicePhotosModel,
                        where: { sp_state: 1 },
                        required: false
                    }],
                    model: ServicesModel,
                    where: { s_state: 1 },
                    required: false
                }],
                model: StoreKitItemsModel,
                where: { skiState: 1, [Op.or]: [{ sId: { [Op.ne]: null } }, { pId: { [Op.ne]: null } }] }
            }],
            where: { uId: deCode(u_code ? dataU.u_id : u_id) || { [Op.gt]: 0 }, skState: 1 }
        })

        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Registra un kit de la tienda
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de solicitud
 */
controllers.register = async (req, res) => {
    try {
        const { u_id: uId, skName, products, services } = req.body

        const dataSK = await StoreKitsModel.create({ uId, skName })
        if (!dataSK) return res.json({ success: 0, message: 'Algo ha saldo mal, intente nuevamente.' })

        // registrando los productos
        for (let i = 0; i < products.length; i++) {
            const { p_id } = products[i]
            await StoreKitItemsModel.create({ skId: dataSK.skId, pId: p_id })
        }

        // Registrando los servicios
        for (let i = 0; i < services.length; i++) {
            const { s_id } = services[i]
            await StoreKitItemsModel.create({ skId: dataSK.skId, sId: s_id })
        }

        return res.json({ success: 1, message: 'Se ha configurado el kit correctamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Edita el nombre del kit
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de solicitud
 */
controllers.updateName = async (req, res) => {
    try {
        const { skId, skName } = req.body

        const data = await StoreKitsModel.update({ skName }, { where: { skId: deCode(skId) } })

        if (data) return res.json({ success: 1, message: 'Se ha actualizado el nombre del kit.' })

        return res.json({ success: 0, message: 'No se ha podido realizar la acción.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Registra un item a un kit existente
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.registerItem = async (req, res) => {
    try {
        const { skId, p_id, s_id } = req.body
        let dataInsert = {}

        const data = await StoreKitsModel.findOne({ attributes: ['skId'], where: { skId: deCode(skId), skState: 1 } })
        if (!data) return res.json({ success: 0, message: 'El kit seleccionado no existe.' })

        if (p_id) dataInsert = { pId: p_id }
        else dataInsert = { sId: s_id }

        if (dataInsert) await StoreKitItemsModel.create({ skId, ...dataInsert })

        return res.json({ success: 1, message: 'Se ha agregado un nuevo item al kit.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Elimina un item del kit de la tineda.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.deleteItem = async (req, res) => {
    try {
        const { pId, sId } = req.body
        let where = {}, data = {}

        if (pId) where = { pId: deCode(pId) }
        else where = { sId: deCode(sId) }

        if (where) data = await StoreKitItemsModel.update({ skiState: 0 }, where)
        if (data) return res.json({ success: 1, message: 'Se ha eliminado un item del kit.' })

        return res.json({ success: 0, message: 'Algo ha salido mal, intente nuevamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Elimina todo el kit de la tineda.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respusta de la solicitud.
 */
controllers.deleteAll = async (req, res) => {
    try {
        const { skId } = req.body

        // Elimiando el kit
        await StoreKitsModel.update({ skState: 0 }, { where: { skId: deCode(skId) } })
        // eliminando los items
        StoreKitItemsModel.update({ skiState: 0 }, { where: { skId: deCode(skId), skiState: { [Op.gt]: 0 } } })

        return res.json({ success: 1, message: 'Se ha eliminado el kit de la tienda.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

module.exports = controllers