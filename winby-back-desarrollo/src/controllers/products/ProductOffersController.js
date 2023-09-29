'user strict'

const controllers = {}
const ProductOfferRowsModel = require('../../models/products/ProductOfferRowsModel')
const ProductOffersModel = require('../../models/products/ProductOffersModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const { deCode } = require('../../utils')

/**
 * Obtiene todos los productos en oferta.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con todos los registros encontrados.
 */
controllers.getAll = async (req, res) => {
    try {
        const data = await ProductOfferRowsModel.findAll({
            attributes: ['porId', 'porName', 'porPriority'],
            include: [{
                attributes: ['poId', 'poPriority'],
                include: [{
                    attributes: ['p_id', 'p_name', 'p_description', 'p_price', 'p_taxGat'],
                    include: [{
                        attributes: ['pp_id', 'pp_name'],
                        model: ProductPhotosModel,
                        where: { pp_state: 1 },
                        required: false
                    }],
                    model: ProductsModel,
                    where: { p_state: 1 }
                }],
                model: ProductOffersModel,
                where: { poState: 1 },
                order: [['poPriority', 'ASC']]
            }],
            where: { porState: 1 },
            order: [['porPriority', 'ASC']]
        })

        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Registra una nueva fila con productos.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.register = async (req, res) => {
    try {
        const { porName, porPriority, products } = req.body
        const dataRow = await ProductOfferRowsModel.create({ porName, porPriority })
        if (!dataRow) return res.json({ success: 0, message: 'Algo ha salido mal, intente nuevamente.' })

        for (let i = 0; i < products.length; i++) {
            const { p_id } = products[i]
            await ProductOffersModel.create({ pId: p_id, porId: dataRow.porId })
        }

        return res.json({ success: 1, message: 'Se ha creado una nueva fila de productos.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Elimina una fila de productos completa
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.delete = async (req, res) => {
    try {
        const { porId } = req.body

        const data = await ProductOfferRowsModel.update({ porState: 0 }, { where: { porId: deCode(porId) } })

        if (data) return res.json({ success: 1, message: 'Se ha eliminado la fila de productos.' })

        return res.json({ success: 1, message: 'No se ha podido realizar la acción, intente nuevamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Registra nuevos productos a una fila existente.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.registerProductsRow = async (req, res) => {
    try {
        const { porId, products } = req.body

        const dataRow = await ProductOfferRowsModel.findOne({ attributes: ['porId'], where: { porId: deCode(porId), porState: 1 } })
        if (!dataRow) return res.json({ success: 0, message: 'La fila seleccionada no existe.' })

        for (let i = 0; i < products.length; i++) {
            const { p_id } = products[i]
            const data = await ProductOffersModel.findOne({ attributes: ['poId'], where: { pId: p_id, porId: dataRow.porId } })
            if (!data) ProductOffersModel.create({ pId: p_id, porId: dataRow.porId })
        }

        return res.json({ success: 1, message: 'Se ha creado una nueva fila de productos.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Elimina un producto de una fila existente.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.deleteProductRow = async (req, res) => {
    try {
        const { porId, p_id } = req.body

        const data = await ProductOffersModel.update({ poState: 0 }, { where: { pId: deCode(p_id), porId: deCode(porId) } })

        if (data) return res.json({ success: 1, message: 'Se ha eliminado el producto de la fila.' })

        return res.json({ success: 1, message: 'No se ha podido realizar la acción, intente nuevamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

/**
 * Organiza los productos de una fila.
 * @param {Object} req Información de la petición.
 * @param {Object} res Información de respuesta.
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.organizedItems = async (req, res) => {
    try {
        const { porId, products } = req.body

        for (let i = 0; i < products.length; i++) {
            const { p_id, priority } = products[i]
            await ProductOffersModel.update({ poPriority: priority }, { where: { pId: deCode(p_id), porId: deCode(porId) } })
        }

        return res.json({ success: 1, message: 'Se ha actualizado el orden de los productos en las filas.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intente nuevamente.' })
    }
}

module.exports = controllers