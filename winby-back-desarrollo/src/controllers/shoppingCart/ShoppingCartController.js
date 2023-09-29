/* eslint-disable camelcase */
'use strict'
const controllers = {}

const jwt = require('jsonwebtoken')
// const axios = require('axios')

const { deCode, consecutive, enCode } = require('../../utils')
const { Op } = require('sequelize')

const ProductsModel = require('../../models/products/ProductsModel')
const ServicesModel = require('../../models/services/ServicesModel')
const ProductLocalsModel = require('../../models/products/ProductLocalsModel')
const ServiceLocalsModel = require('../../models/services/ServiceLocalsModel')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const ServicePhotosModel = require('../../models/services/ServicePhotosModel')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')
const ConsecutivesModel = require('../../models/info/ConsecutivesModel')
const InvoicesModel = require('../../models/invoice/InvoicesModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const InvoiceClientsModel = require('../../models/invoice/InvoiceClientsModel')
const InvoiceVendorsModel = require('../../models/invoice/InvoiceVendorsModel')
const InvoiceProductsModel = require('../../models/invoice/InvoiceProductsModel')
const InvoiceServicesModel = require('../../models/invoice/InvoiceServicesModel')
const RoutesModel = require('../../models/transporters/RoutesModel')
const TransportRoutesModel = require('../../models/transporters/TransportRoutesModel')
const TransportersModel = require('../../models/transporters/TransportersModel')
const DeliveryReportsModel = require('../../models/transporters/DeliveryReportsModel')
const InfoSelesModel = require('../../models/info/InfoSelesModel')
const { errorLogMail } = require('../../utils/logMailer')

/**
 * Genera una instancia de error
 * @param {String} name Nombre del error
 * @param {String} message Mensaje del error
 * @param {Int} code Código del error
 * @returns {Error} Una instancia de error
 */
function CustomError (name, message, code) {
    const instance = new Error(message)
    instance.name = name
    instance.code = code
    return instance
}

/**
 * Configuración de cookies del carrito de compras.
 */
const cookieConfig = {
    maxAge: 2147483647 * 1000, // Never expire
    httpOnly: process.env.NODE_ENV === 'production', // to disable accessing cookie via client side js
    secure: true, // to force https (if you use it)
    signed: true // Cookie signed
}

/**
 * Formate en una cadena de texto los atributos de un producto o servicio.
 * @param {Array} attrs Array de de objetos de atributos del producto o servicio
 * @return {String} Cadena de texto con los atributos formateados.
 */
const formatItemAttrs = attrs => {
    let formatAttr = ''
    for (let i = 0; i < attrs.length; i++) {
        formatAttr = `${formatAttr}${i > 0 ? ';' : ''}${attrs[i].key}: ${attrs[i][attrs[i].key]}`
    }
    return formatAttr
}

/**
 * Cifra la información del carrito.
 * @param {Object} cart Objeto con la información del carrito
 * @returns {String} un token cifrado con la información del carrito.
 */
const cryptCart = cart => jwt.sign(cart, process.env.JWT_SHOPPING_CART_KEY)

/**
 * Calcula el valor del domicilio de la transportadora Saferbo
 * @param {Int} weight Peso del producto
 * @param {Int} fee Tarifa de la transportadora
 * @param {Int} discount Descuento de la transportadora
 * @param {Int} fletMinNat Flete minino nacional
 * @param {Int} fletMinLoc Flete mínimo local
 * @param {Int} typeLocation Tipo de localidad, 1 => nacional, 2 => local
 * @returns {Int} Valor del domicilio
 */
const SaferboFormDelivery = (weight, fee, discount, fletMinNat, fletMinLoc, typeLocation) => {
    const unitValued = 1500
    const valueDec = typeLocation === 1 ? 0.5 : 0.6
    const costM = 1500
    const unids = 1
    const other = (unitValued * valueDec) < costM ? (costM * unids) : 0
    const otherLoc = (unitValued * valueDec) < costM ? costM * unids : unitValued * valueDec * unids
    // Flete por despacho
    let fletDesp = 0
    if (typeLocation === 1) {
        if (weight * unids * fee * (discount ? (1 - (discount / 100)) : 0) < fletMinNat) {
            fletDesp = fletMinNat + other
        } else {
            fletDesp = weight * unids * fee * (1 - (discount ? discount / 100 : 0)) + other
        }
    } else {
        if (weight * unids * fee * (1 - valueDec) < fletMinNat) {
            fletDesp = fletMinNat + otherLoc
        } else {
            fletDesp = weight * unids * fee * (1 - valueDec) + otherLoc
        }
    }
    return fletDesp
}

/**
 * Calcula el valor del domicilio para la transportadora NAITERBOX
 * @param {Int} weight Peso del producto
 * @param {Int} fee Tarifa de la transportadora
 * @param {Int} discount Descuento de la transportadora
 * @param {Int} flet Flete de la transportadora
 * @param {Int} unitValued Unidad valorada
 * @returns {Int} Valor del domicilio
 */
const NainterboxDelivery = (weight, fee, discount, flet, unitValued) => {
    const handling = 0
    const declareValue = 0.01
    // Flete bruto
    const grossFreight = weight <= 0 ? 0 : flet + (weight <= 5 ? 0 : weight - 5) * fee * (1 - (discount ? discount / 100 : 0))
    // Valoración
    const valued = declareValue * unitValued + handling * unitValued
    // Flete unitario
    const freightUnit = grossFreight ? grossFreight + valued : 0
    return freightUnit
}

/**
 * Calcula el valor del domicilio correspondiente a un vendedor.
 * @param {Object} dataLocal Información del local del vendedor
 * @param {Object} dataUser Información del usuario cliente.
 * @param {Int} weight Peso del producto.
 * @param {Int} itemTotal Total de productos comprados
 * @returns {Int} valor total del domicilio para el vendedor.
 */
const calculateDeliveryCostVendor = async (dataLocal, dataUser, weight, itemTotal) => {
    const { tdc_type, costDelivery, m_id: local_mId } = dataLocal
    const { m_id } = dataUser
    let delivery = 0

    if (tdc_type === 1 || tdc_type === 2) { // Envio logistica winby
        const dataRoutes = await RoutesModel.findOne({ attributes: ['rOriId', 'rDestId', 'tId'], where: { rOriId: deCode(local_mId), rDestId: deCode(m_id), rState: 1 } })
        if (!dataRoutes) throw new CustomError('routes_missings', 'No routes found', 404) // Verificar que exista enviois a la zana
        const dataTransporterRouter = await TransportRoutesModel.findOne({
            attributes: ['trOriId', 'trDestId', 'trType', 'trFee'],
            include: [{ attributes: ['tFletMinNal', 'tFletMinLoc', 'tDescFlet', 'tTypeForm'], model: TransportersModel }],
            where: { tId: deCode(dataRoutes.tId), trOriId: deCode(dataRoutes.rOriId), trDestId: deCode(dataRoutes.rDestId) }
        })
        if (!dataTransporterRouter) throw new CustomError('routes_missings', 'No routes found', 404) // Verificar que exista enviois a la zana
        if (dataTransporterRouter?.transporter?.tTypeForm === 1) {
            delivery = SaferboFormDelivery(weight, dataTransporterRouter.trFee, dataTransporterRouter?.transporter?.tDescFlet, dataTransporterRouter?.transporter?.tFletMinNal, dataTransporterRouter?.transporter?.tFletMinLoc, dataTransporterRouter.trType)
        } else if (dataTransporterRouter?.transporter?.tTypeForm === 2) {
            delivery = NainterboxDelivery(weight, dataTransporterRouter.trFee, dataTransporterRouter?.transporter?.tDescFlet, dataTransporterRouter?.transporter?.tFletMinLoc, itemTotal)
        }
    } else if (tdc_type === 3) { // Envio Fijo
        delivery = costDelivery
    } else if (tdc_type === 4) { // Domiclio gratis
    // Code here
    } if (tdc_type === 5) { // No hay envios
        throw new CustomError('routes_missings', 'No routes found', 404)
    }
    return delivery
}

/**
 * Calcula el valor total del domicilio a pagar por la compra.
 * @param {Array} dataProducts Información de productos
 * @param {Array} dataServices Información de servicios
 * @param {String} m_id Id codificado del municipio del cliente
 * @param {Array} cartProducts Productos en el carrito.
 * @returns {Int} valor total del domicilio para toda la compra.
 */
const calculateDeliveryCost = async (dataProducts, dataServices, m_id, cartProducts) => {
    let totalDelivery = 0
    let locals = []
    let routesMissings = 0
    let invoicevendors = []

    // Calcular total en productos
    for (let i = 0; i < dataProducts.length; i++) {
        const { productlocals, p_id, p_franchise, p_width, p_height, p_length, p_weight } = dataProducts[i]
        const { vl_id, m_id: local_mId, localDelivery, nationalDelivery, vl_domLoc, vl_domNat } = productlocals[0].vendorlocal
        const findLocal = !!locals.find(x => x === vl_id) // Verificar que el local ya esté agregado
        const item = cartProducts.find(x => x.p_id === p_id) // Se busca la información del producto en el carrito

        if (!p_franchise) { // Solo si no es franquicia
            // Verificar la ciudad del cliente que sea igual al local
            try {
                if (m_id === local_mId) { // Se aplica domicilio local
                    if (localDelivery.tdc_type !== 1 && localDelivery.tdc_type !== 2) { // Que no sea domicilio con logística winby
                        if (!findLocal) {
                            locals = [...locals, vl_id]
                            const value = await calculateDeliveryCostVendor({ tdc_type: localDelivery.tdc_type, costDelivery: vl_domLoc, m_id: local_mId }, { m_id })
                            totalDelivery += value
                            invoicevendors = [...invoicevendors, { vl_id, iv_delivery: value, tdc_type: localDelivery.tdc_type }]
                        }
                    } else {
                        // Si es logística winby
                        const volume = ((p_width / 100) * (p_height / 100) * (p_length / 100)) * 400 // Se calcula el peso volumétrico del producto
                        const weight = ((volume > (p_weight / 1000) ? volume : (p_weight / 1000)) * item.p_total)
                        const total = item.p_price * item.p_total

                        if (findLocal) {
                            let invoiceV = invoicevendors.find(x => x.vl_id === vl_id)
                            if (localDelivery.tdc_type === 1) totalDelivery -= invoiceV.iv_delivery // Se elimina el domicilio calculado para actualizar
                            invoiceV = { ...invoiceV, weight: invoiceV.weight + weight, total: invoiceV.total + total }
                            const value = await calculateDeliveryCostVendor({ tdc_type: localDelivery.tdc_type, costDelivery: vl_domLoc, m_id: local_mId }, { m_id }, invoiceV.weight, invoiceV.total)
                            invoicevendors = invoicevendors.map(x => {
                                if (x.vl_id === vl_id) return { ...invoiceV, iv_delivery: value }
                                else return x
                            })
                            // si el domicilio lo paga el cliente
                            if (localDelivery.tdc_type === 1) totalDelivery += value
                        } else {
                            locals = [...locals, vl_id]
                            const value = await calculateDeliveryCostVendor({ tdc_type: localDelivery.tdc_type, costDelivery: vl_domLoc, m_id: local_mId }, { m_id }, weight, total)
                            invoicevendors = [...invoicevendors, { vl_id, iv_delivery: value, tdc_type: localDelivery.tdc_type, weight, total }]
                            if (localDelivery.tdc_type === 1) totalDelivery += value
                        }
                    }
                } else { // Se aplica domicilio nacional
                    if (nationalDelivery.tdc_type !== 1 && nationalDelivery.tdc_type !== 2) { // Que no sea domicilio con logística winby
                        if (!findLocal) {
                            locals = [...locals, vl_id]
                            const value = await calculateDeliveryCostVendor({ tdc_type: nationalDelivery.tdc_type, costDelivery: vl_domNat, m_id: local_mId }, { m_id })
                            totalDelivery += value
                            invoicevendors = [...invoicevendors, { vl_id, iv_delivery: value, tdc_type: nationalDelivery.tdc_type }]
                        }
                    } else {
                        // Si es logística winby
                        const volume = ((p_width / 100) * (p_height / 100) * (p_length / 100)) * 400 // Se calcula el peso volumétrico del producto
                        const weight = ((volume > (p_weight / 1000) ? volume : (p_weight / 1000)) * item.p_total)
                        const total = item.p_price * item.p_total

                        if (findLocal) {
                            let invoiceV = invoicevendors.find(x => x.vl_id === vl_id)
                            if (nationalDelivery.tdc_type === 1) totalDelivery -= invoiceV.iv_delivery
                            invoiceV = { ...invoiceV, weight: invoiceV.weight + weight, total: invoiceV.total + total }
                            const value = await calculateDeliveryCostVendor({ tdc_type: nationalDelivery.tdc_type, costDelivery: vl_domNat, m_id: local_mId }, { m_id }, invoiceV.weight, invoiceV.total)
                            invoicevendors = invoicevendors.map(x => {
                                if (x.vl_id === vl_id) return { ...invoiceV, iv_delivery: value }
                                else return x
                            })
                            // si el domicilio lo paga el cliente
                            if (nationalDelivery.tdc_type === 1) totalDelivery += value
                        } else {
                            locals = [...locals, vl_id]
                            const value = await calculateDeliveryCostVendor({ tdc_type: nationalDelivery.tdc_type, costDelivery: vl_domNat, m_id: local_mId }, { m_id }, weight, total)
                            invoicevendors = [...invoicevendors, { vl_id, iv_delivery: value, tdc_type: nationalDelivery.tdc_type, weight, total }]
                            if (nationalDelivery.tdc_type === 1) totalDelivery += value
                        }
                    }
                }
            } catch (e) {
                if (e.name === 'routes_missings') routesMissings++
            }
        } else {
            if (!findLocal) {
                locals = [...locals, vl_id]
                invoicevendors = [...invoicevendors, { vl_id, iv_delivery: 0, tdc_type: m_id === local_mId ? localDelivery.tdc_type : nationalDelivery.tdc_type, weight: 0, total: item.p_price * item.p_total }]
            }
        }
    }

    // Calcular total en servicios
    // Los servicios no generan costos de envio, por eso solo se genera su respectiva factura del vendedor
    for (let i = 0; i < dataServices.length; i++) {
        const { servicelocals } = dataServices[i]
        const { vl_id, m_id: local_mId, localDelivery, nationalDelivery } = servicelocals[0].vendorlocal
        const findLocal = !!locals.find(x => x === vl_id) // Verificar que el local ya esté agregado

        if (!findLocal) { // Solo si el local no está agregado
            locals = [...locals, vl_id]
            invoicevendors = [...invoicevendors, { vl_id, iv_delivery: 0, tdc_type: m_id === local_mId ? localDelivery.tdc_type : nationalDelivery.tdc_type }]
        }
    }
    return { totalDelivery, routesMissings, invoicevendors }
}

/**
 * Calcula el subtotal de la compra
 * @param {array} products Información de productos
 * @param {array} services Información de servicios
 * @returns {int} Subtotal de la compra
 */
const calculateSubtotal = (products, services) => {
    let total = 0
    // Products
    for (let i = 0; i < products.length; i++) {
        const { p_price, p_total } = products[i]
        total += (p_price * p_total)
    }
    // servicios
    for (let i = 0; i < services.length; i++) {
        const { s_price, s_total } = services[i]
        total += (s_price * s_total)
    }

    return total
}
/**
 * Formatea la información de los items del carrito con la información de la base de datos.
 * @param {array} dataCart Información o items del carrito
 * @param {array} dataDB Infromación de la base de datos
 * @param {int} type Tipo de información a formatear 1 = productos, 2 = servicios
 * @author Wow desarrollos
 * @version 1.0
 * @return {array} items formateados.
 */
const itemsReducer = (dataCart, dataDB, type) => {
    const id = type === 1 ? 'p_id' : 's_id'
    const data = []
    for (let i = 0; i < dataDB.length; i++) {
        const item = dataDB[i]
        const itemCart = dataCart.find(y => y[id] === item[id])
        Object.keys(item.dataValues).forEach(x => { itemCart[x] = item[x] })
        data.push(itemCart)
    }
    return data
}

/**
 * Obtiene todos los items en el carrito.
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Información del carrito de compras.
 * @author Wow desarrollos
 */
controllers.getCartItems = async (req, res) => {
    try {
        const { products, services, location } = req.shoppingCart // Se obtiene la informacíon del carrito actual
        if (!products.length && !services.length) return res.json({ success: 1, products: [], services: [], location: {}, message: 'No tienes productos en el carrito.' })

        // Obtener información de productos
        const dataProducts = await ProductsModel.findAll({
            attributes: ['p_id', 'p_name', 'p_available', 'p_views', 'p_franchise', 'p_quantity', 'p_taxGat'],
            include: [{
                attributes: ['pp_name'],
                model: ProductPhotosModel,
                where: { pp_state: 1 },
                required: false
            }],
            where: { p_id: { [Op.in]: products.map(x => deCode(x.p_id)) } }
        })
        // Obtener información de servicios
        const dataServices = await ServicesModel.findAll({
            attributes: ['s_id', 's_name', 's_views', 's_taxGat'],
            include: [{
                attributes: ['sp_name'],
                model: ServicePhotosModel,
                where: { sp_state: 1 },
                required: false
            }],
            where: { s_id: { [Op.in]: services.map(x => deCode(x.s_id)) } }
        })
        return res.json({
            success: 1,
            message: 'Listando resultados',
            data: {
                products: itemsReducer(products, dataProducts, 1),
                services: itemsReducer(services, dataServices, 2),
                location
            }
        })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error.' })
    }
}

/**
 * Agrega un nuevo item al carrito
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} nuevo carrito de compras
 * @author Wow desarrollos
 */
controllers.addNewItem = async (req, res) => {
    try {
        const { p_id, p_total, s_id, s_total, servicecalendars, p_attributes, s_attributes } = req.body

        let newShoppingCart = req.shoppingCart // Se obtiene la información del carrito actual
        let dataProduct, dataService // Variables para guardar la información del item a agregar

        // Si no existe un p_id o s_id se retorna un error manejado
        if (!p_id && !s_id) return res.cookie('shoppingcart', newShoppingCart, cookieConfig).json({ success: 0, message: 'Debes seleccionar un item para agregar.' })

        if (p_id) {
            if (newShoppingCart.products.find(x => x.p_id === p_id)) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El producto ya se encuentra agregado.' })
            dataProduct = await ProductsModel.findOne({ attributes: ['p_id', 'p_price', 'p_available', 'p_franchise', 'p_delivery'], where: { p_id: deCode(p_id), p_state: 1 } })
            if (!dataProduct || !dataProduct.p_available) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El producto no se encuentra disponible.' })
            newShoppingCart = { ...newShoppingCart, products: [...newShoppingCart.products, { p_id: dataProduct.p_id, p_price: dataProduct.p_price, p_total: p_total || 1, p_attributes: p_attributes || [] }], delivery: 0, invoicevendors: [] }
        } else {
            if (newShoppingCart.services.find(x => x.s_id === s_id)) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El servicio ya se encuentra agregado.' })
            dataService = await ServicesModel.findOne({ attributes: ['s_id', 's_price'], where: { s_id: deCode(s_id), s_state: 1 } })
            if (!dataService) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El servicio no se encuentra disponible.' })
            newShoppingCart = { ...newShoppingCart, services: [...newShoppingCart.services, { s_id: dataService.s_id, s_price: dataService.s_price, s_total: s_total || 1, servicecalendars: [...(servicecalendars?.length ? servicecalendars : [])], s_attributes: s_attributes || [] }], delivery: 0, invoicevendors: [] }
        }

        newShoppingCart = jwt.sign(newShoppingCart, process.env.JWT_SHOPPING_CART_KEY)

        return res.cookie('shoppingcart', newShoppingCart, cookieConfig).json({ success: 1, message: 'Se ha agregado un nuevo item al carrito.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Cambia el total de un item
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} nuevo carrito de compras
 * @author Wow desarrollos
 */
controllers.changeTotalItem = async (req, res) => {
    try {
        const { p_id, p_total, s_id, s_total } = req.body

        let newShoppingCart = req.shoppingCart // Se obtiene la información del carrito actual
        let dataProduct, dataService // Variables para guardar la información del item a agregar

        // Si no existe un p_id o s_id se retorna un error manejado
        if ((!p_id && !p_total) && (!s_id && !s_total)) return res.cookie('shoppingcart', newShoppingCart, cookieConfig).json({ success: 0, message: 'Debes seleccionar un item para agregar.' })

        if (p_id) {
            if (!newShoppingCart.products.find(x => x.p_id === p_id)) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El producto no se encuentra agregado.' })
            dataProduct = await ProductsModel.findOne({ attributes: ['p_id', 'p_price', 'p_available', 'p_franchise', 'p_delivery'], where: { p_id: deCode(p_id), p_state: 1 } })
            if (!dataProduct || (!dataProduct.p_available && dataProduct.p_price < p_total)) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El producto no se encuentra disponible.' })

            let { products } = newShoppingCart
            products = products.map(x => x.p_id === p_id ? { ...x, p_total } : x)
            newShoppingCart = { ...newShoppingCart, products, delivery: 0, invoicevendors: [] }
        } else {
            if (!newShoppingCart.services.find(x => x.s_id === s_id)) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El servicio no se encuentra agregado.' })
            dataService = await ServicesModel.findOne({ attributes: ['s_id', 's_price'], where: { s_id: deCode(s_id), s_state: 1 } })
            if (!dataService) return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 0, message: 'El servicio no se encuentra disponible.' })

            let { services } = newShoppingCart
            services = services.map(x => x.s_id === s_id ? { ...x, s_total } : x)
            newShoppingCart = { ...newShoppingCart, services, delivery: 0, invoicevendors: [] }
        }

        return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 1, message: 'Se ha actualizado el item.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Elimina un item
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} nuevo carrito de compras
 * @author Wow desarrollos
 */
controllers.deleteItem = async (req, res) => {
    try {
        const { p_id, s_id } = req.body

        let newShoppingCart = req.shoppingCart // Se obtiene la información del carrito actual

        // Si no existe un p_id o s_id se retorna un error manejado
        if (!p_id && !s_id) return res.cookie('shoppingcart', newShoppingCart, cookieConfig).json({ success: 0, message: 'Debes seleccionar un item para eliminar.' })

        if (p_id) {
            let { products } = newShoppingCart
            products = products.filter(x => x.p_id !== p_id)
            newShoppingCart = { ...newShoppingCart, products, delivery: 0, invoicevendors: [] }
        } else {
            let { services } = newShoppingCart
            services = services.filter(x => x.s_id !== s_id)
            newShoppingCart = { ...newShoppingCart, services, delivery: 0, invoicevendors: [] }
        }

        return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 1, message: 'Se ha eliminado el item.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Limpia el carrito
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} nuevo carrito de compras
 * @author Wow desarrollos
 */
controllers.cleanCart = async (req, res) => {
    try {
        return res.cookie('shoppingcart', cryptCart({ products: [], services: [], delivery: 0, location: {}, invoicevendors: [] }), cookieConfig).json({ success: 1, message: 'Se ha limpiado el carrito.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Calcula el costo total del domicilio
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} nuevo carrito de compras
 * @author Wow desarrollos
 */
controllers.calculateDelivery = async (req, res) => {
    try {
        const { m_id } = req.body
        const { products, services } = req.shoppingCart

        if (!products.length && !services.length) return res.json({ success: 0, message: 'No tienes items en el carrito.' }) // Verifica que existan items en el carrito
        if (!m_id) return res.json({ success: 0, message: 'Por favor ingresa la dirección de envío.' })

        // Busca la información de los porcentajes
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_winby'], where: { is_state: 1 } })

        // Buscar los locales de los productos
        const dataProducts = await ProductsModel.findAll({
            attributes: ['p_id', 'p_franchise', 'p_width', 'p_height', 'p_length', 'p_weight', 'v_id'],
            include: [
                {
                    attributes: ['pl_id'],
                    include: [{
                        attributes: ['vl_id', 'vl_lat', 'vl_lon', 'vl_domFre', 'vl_cosKM', 'vl_domLoc', 'vl_domNat', 'm_id'],
                        include: [{ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }],
                        model: VendorsLocalsModel
                    }],
                    model: ProductLocalsModel
                }
            ],
            where: { p_id: { [Op.in]: products.map(x => deCode(x.p_id)) } }
        })
        // Buscar los locales de los servicios
        const dataServices = await ServicesModel.findAll({
            attributes: ['s_id'],
            include: [
                {
                    attributes: ['sl_id'],
                    include: [{
                        attributes: ['vl_id', 'vl_lat', 'vl_lon', 'vl_domFre', 'vl_cosKM', 'vl_domLoc', 'vl_domNat', 'm_id'],
                        include: [{ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }],
                        model: VendorsLocalsModel
                    }],
                    model: ServiceLocalsModel
                }
            ],
            where: { s_id: { [Op.in]: services.map(x => deCode(x.s_id)) } }
        })

        const { totalDelivery, routesMissings, invoicevendors } = await calculateDeliveryCost(dataProducts, dataServices, m_id, products)
        if (routesMissings) return res.json({ success: 0, message: 'Actualmente no contamos con envios a tu zona.' })
        const delivery = totalDelivery / (1 - dataIS.is_winby)
        const newShoppingCart = { ...req.shoppingCart, delivery, location: { m_id }, invoicevendors }
        return res.cookie('shoppingcart', cryptCart(newShoppingCart), cookieConfig).json({ success: 1, totalDelivery: delivery })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamete.' })
    }
}

/**
 * Crea una factura con los items del carrito
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} nuevo carrito de compras
 * @author Wow desarrollos
 */
controllers.createInvoice = async (req, res) => {
    try {
        const { u_id, i_vendor, up_name, up_last, u_phoNum, u_email, c_id, d_id, m_id, up_location, up_ideNum } = req.body
        const { products, services, delivery: i_delivery, u_lat, u_lon, invoicevendors } = req.shoppingCart

        if (!products.length && !services.length) return res.json({ success: 0, message: 'No tienes items en el carrito.' }) // Verifica que existan items en el carrito

        const dataConsecutive = await ConsecutivesModel.findOne({ attributes: ['c_id', 'c_value'], where: { c_name: 'factura' } }) // Buscar el consecutivo
        const i_consecutive = consecutive(dataConsecutive.c_value) // Obtiene el nuevo consecutivo
        const i_datSta = new Date(), i_datExp = new Date()

        const subTotal = calculateSubtotal(products, services)
        let locals = []

        // Verifica el codigo del vendedor
        const dataVendorSeller = await UserProfilesModel.findOne({ attributes: ['up_id', 'up_code'], where: { up_code: i_vendor } })

        // Buscar los productos
        const dataProducts = await ProductsModel.findAll({
            attributes: ['p_id', 'p_name', 'p_description', 'p_price', 'p_quantity', 'p_groPer', 'p_franchise', 'p_typeVen', 'p_sku', 'p_taxGat', 'p_width', 'p_height', 'p_length', 'p_weight'],
            include: [
                {
                    attributes: ['pl_id'],
                    include: [{
                        attributes: ['vl_id', 'v_id', 'vl_lat', 'vl_lon', 'vl_domFre', 'vl_cosKM', 'vl_domLoc', 'vl_domNat', 'c_id', 'd_id', 'm_id', 'vl_address'],
                        include: [{ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }],
                        model: VendorsLocalsModel
                    }],
                    model: ProductLocalsModel
                }
            ],
            where: { p_id: { [Op.in]: products.map(x => deCode(x.p_id)) } }
        })

        // Buscar los locales de los servicios
        const dataServices = await ServicesModel.findAll({
            attributes: ['s_id', 's_name', 's_description', 's_price', 's_groPer', 's_taxGat', 's_typeVen', 's_sku', 's_taxGat'],
            include: [
                {
                    attributes: ['sl_id'],
                    include: [{
                        attributes: ['vl_id', 'v_id', 'vl_lat', 'vl_lon', 'vl_domFre', 'vl_cosKM', 'vl_domLoc', 'vl_domNat', 'c_id', 'd_id', 'm_id', 'vl_address'],
                        include: [{ attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }],
                        model: VendorsLocalsModel
                    }],
                    model: ServiceLocalsModel
                }
            ],
            where: { s_id: { [Op.in]: services.map(x => deCode(x.s_id)) } }
        })
        // Crear la factura
        const dataInvoice = await InvoicesModel.create({
            u_id: deCode(u_id),
            i_consecutive,
            i_vendor: dataVendorSeller?.up_code || 'Winby',
            i_datSta,
            i_datExp: i_datExp.setDate(i_datSta.getDate() + 14),
            i_sub: Math.round(subTotal),
            i_delivery: Math.round(i_delivery),
            i_total: Math.round(subTotal + i_delivery),
            i_state: 6,
            i_taxGat: 0
        })
        // Busca la información del cliente
        const dataUserProfile = await UserProfilesModel.findOne({ attributes: ['up_ideNum', 'up_name', 'up_last', 'c_id', 'd_id', 'm_id', 'up_location'], where: { u_id: deCode(u_id) } })
        // Actualiza la información del usuario si no la tiene
        UserProfilesModel.update({
            up_name: dataUserProfile.up_name || up_name,
            up_ideNum: up_ideNum || undefined,
            up_last: dataUserProfile.up_last || up_last,
            c_id: deCode(dataUserProfile.c_id ? dataUserProfile.c_id : c_id),
            d_id: deCode(dataUserProfile.d_id ? dataUserProfile.d_id : d_id),
            m_id: deCode(dataUserProfile.m_id ? dataUserProfile.m_id : m_id),
            up_location: dataUserProfile.up_location || up_location,
            up_lat: u_lat,
            up_lon: u_lon
        }, { where: { u_id: deCode(u_id) } })
        // Registra la información del cliente
        await InvoiceClientsModel.create({
            i_id: deCode(dataInvoice.i_id),
            ic_ideNum: up_ideNum || dataUserProfile.up_ideNum || '',
            ic_name: up_name,
            ic_last: up_last,
            ic_phone: u_phoNum,
            ic_email: u_email,
            c_id: deCode(c_id),
            d_id: deCode(d_id),
            m_id: deCode(m_id),
            ic_location: up_location,
            ic_lat: u_lat,
            ic_lon: u_lon,
            ic_state: 1
        })

        for (let i = 0; i < dataProducts.length; i++) {
            const { productlocals } = dataProducts[i]
            const product = dataProducts[i]
            const { vl_id, v_id, vl_lat, vl_lon, vl_cosKM, vl_domLoc, c_id: local_cId, d_id: local_dId, m_id: local_mId, vl_address } = productlocals[0].vendorlocal
            const findLocal = !!locals.find(x => x === vl_id)
            const invoiceVendor = invoicevendors.find(x => x.vl_id === vl_id)
            // let delivery = 0

            // if (typedeliverycost.tdc_type !== 1 && typedeliverycost.tdc_type !== 2) {
            //     if (!findLocal) {
            //         locals = [...locals, vl_id]
            //         const value = await calculateDeliveryCostVendor(productlocals[0].vendorlocal, { u_lat, u_lon, m_id })
            //         delivery = value
            //     }
            // } else if (typedeliverycost.tdc_type === 1) {
            //     const volume = ((product.p_width / 100) * (product.p_height / 100) * (product.p_length / 100)) * 400
            //     const item = products.find(x => x.p_id === product.p_id)
            //     const value = await calculateDeliveryCostVendor(productlocals[0].vendorlocal, { u_lat, u_lon, m_id }, ((volume > (product.p_weight / 1000) ? volume : (product.p_weight / 1000)) * item.p_total))
            //     delivery = value
            // } else if (typedeliverycost.tdc_type === 2) {
            //     delivery = vendorsDelivery.find(x => x.v_id === v_id)?.delivery || 0
            // }

            if (!findLocal) {
                locals = [...locals, vl_id]
                const dataIVC = await InvoiceVendorsModel.create({
                    i_id: deCode(dataInvoice.i_id),
                    v_id: deCode(v_id),
                    vl_id,
                    iv_delivery: invoiceVendor?.iv_delivery || 0,
                    tdc_type: invoiceVendor?.tdc_type,
                    c_id: deCode(local_cId),
                    d_id: deCode(local_dId),
                    m_id: deCode(local_mId),
                    iv_location: vl_address,
                    iv_lat: vl_lat,
                    iv_lon: vl_lon,
                    iv_domFre: vl_domLoc || 0,
                    iv_cosKM: vl_cosKM || 0,
                    iv_state: 6
                })
                DeliveryReportsModel.create({ tId: enCode(1), iv_id: dataIVC.iv_id, drState: 2 })
            }
            const data = products.find(x => x.p_id === product.p_id)
            const dataInvoiceVendor = await InvoiceVendorsModel.findOne({ attributes: ['iv_id'], where: { i_id: deCode(dataInvoice.i_id), v_id: deCode(v_id), vl_id: deCode(vl_id) } })

            InvoiceProductsModel.create({
                i_id: deCode(dataInvoice.i_id),
                p_id: deCode(product.p_id),
                v_id: deCode(v_id),
                iv_id: dataInvoiceVendor.iv_id,
                ip_sku: product.p_sku,
                ip_name: product.p_name,
                ip_description: product.p_description,
                ip_price: product.p_price,
                ip_quantity: product.p_quantity,
                ip_total: data.p_total,
                ip_taxtGat: product.p_taxGat,
                ip_groPer: product.p_groPer,
                ip_franchise: product.p_franchise,
                ip_attr: formatItemAttrs(data.p_attributes),
                ip_typeVen: product.p_typeVen,
                ip_state: 6
            })
        }

        for (let i = 0; i < dataServices.length; i++) {
            const { servicelocals } = dataServices[i]
            const service = dataServices[i]
            const { vl_id, v_id, vl_lat, vl_lon, vl_cosKM, vl_domLoc, c_id: local_cId, d_id: local_dId, m_id: local_mId, vl_address } = servicelocals[0].vendorlocal
            const findLocal = !!locals.find(x => x === vl_id)
            const invoiceVendor = invoicevendors.find(x => x.vl_id === vl_id)
            // let delivery = 0

            if (!findLocal) {
                locals = [...locals, vl_id]
                // delivery = await calculateDeliveryCostVendor(servicelocals[0].vendorlocal, { u_lat, u_lon, m_id })

                await InvoiceVendorsModel.create({
                    i_id: deCode(dataInvoice.i_id),
                    v_id: deCode(v_id),
                    vl_id,
                    iv_delivery: invoiceVendor?.iv_delivery || 0,
                    tdc_type: invoiceVendor.tdc_type,
                    c_id: deCode(local_cId),
                    d_id: deCode(local_dId),
                    m_id: deCode(local_mId),
                    iv_location: vl_address,
                    iv_lat: vl_lat,
                    iv_lon: vl_lon,
                    iv_domFre: vl_domLoc || 0,
                    iv_cosKM: vl_cosKM || 0,
                    iv_state: 6
                })
            }
            const data = services.find(x => x.s_id === service.s_id)
            const dataInvoiceVendor = await InvoiceVendorsModel.findOne({ attributes: ['iv_id', 'i_id'], where: { i_id: deCode(dataInvoice.i_id), v_id: deCode(v_id), vl_id: deCode(vl_id) } })

            InvoiceServicesModel.create({
                i_id: deCode(dataInvoiceVendor.i_id),
                s_id: deCode(service.s_id),
                v_id: deCode(v_id),
                iv_id: dataInvoiceVendor.iv_id,
                is_sku: service.s_sku,
                is_name: service.s_name,
                is_description: service.s_description,
                is_price: service.s_price,
                is_total: data.s_total,
                is_taxGat: service.s_taxGat,
                is_groPer: service.s_groPer,
                is_attr: formatItemAttrs(data.s_attributes),
                is_typeVen: service.s_typeVen,
                is_state: 6
            })
        }
        // Actualiza el consecutivo
        await ConsecutivesModel.update({ c_value: i_consecutive }, { where: { c_id: deCode(dataConsecutive.c_id) } })
        return res.cookie('shoppingcart', cryptCart({ products: [], services: [], delivery: 0, u_lat: '', u_lon: '' }), cookieConfig).json({ success: 1, message: 'Factura creada correctamente.', data: dataInvoice })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamete.' })
    }
}

module.exports = controllers