/* eslint-disable camelcase */
'use strict'
const controllers = {}
const ConsecutivesModel = require('../../models/info/ConsecutivesModel')
const InvoicesModel = require('../../models/invoice/InvoicesModel')
const InvoiceServicesModel = require('../../models/invoice/InvoiceServicesModel')
const ServicesModel = require('../../models/services/ServicesModel')
const ServicePhotosModel = require('../../models/services/ServicePhotosModel')
const InvoiceProductsModel = require('../../models/invoice/InvoiceProductsModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const InvoiceClientsModel = require('../../models/invoice/InvoiceClientsModel')
const InvoiceVendorsModel = require('../../models/invoice/InvoiceVendorsModel')
const InvoiceServiceCalendarsModel = require('../../models/invoice/InvoiceServiceCalendarsModel')
const InvoiceServiceCalendarHoursModel = require('../../models/invoice/InvoiceServiceCalendarHoursModel')
const { deCode, consecutive, linkBelongsTo, linkHasMany, UpCrFind, transporter, enCode } = require('../../utils')
const { Op, fn, col, literal } = require('sequelize')
const PointReportsModel = require('../../models/users/PointReportsModel')
const MoneyReportsModel = require('../../models/users/MoneyReportsModel')
const UserMoneysModel = require('../../models/users/UserMoneysModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const InfoSelesModel = require('../../models/info/InfoSelesModel')
const CountriesModel = require('../../models/info/CountriesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const VendorsModel = require('../../models/vendors/VendorsModel')
const MenuChargesModel = require('../../models/info/MenuChargesModel')
const SubMenuChargesModel = require('../../models/info/SubMenuChargesModel')
const UserMenusModel = require('../../models/users/UserMenusModel')
const UserSubMenusModel = require('../../models/users/UserSubMenusModel')
const UserStoreCategoryProductsModel = require('../../models/users/UserStoreCategoryProductsModel')
const UserStoreCategoryServicesModel = require('../../models/users/UserStoreCategoryServicesModel')
const UserStoreProductsModel = require('../../models/users/UserStoreProductsModel')
const UserStoreServicesModel = require('../../models/users/UserStoreServicesModel')
const UsersModel = require('../../models/users/UsersModel')
const UserRedsModel = require('../../models/users/UserRedsModel')
const UserSponsorsModel = require('../../models/users/UserSponsorsModel')
const UserPointsModel = require('../../models/users/UserPointsModel')
const UserMembersModel = require('../../models/users/UserMembersModel')
const AdminMoneyReportsModel = require('../../models/admin/AdminMoneyReportsModel')
const AdminMoneysModel = require('../../models/admin/AdminMoneysModel')
const WelcomeFranchise = require('../../templaste/WelcomeFranchise')
const NotifyNewInvoiceTemplate = require('../../templaste/NotifyInvoice')
const MoneyNetworkReportsModel = require('../../models/info/MoneyNetworkReportsModel')
const MoneyNetworksModel = require('../../models/info/MoneyNetworksModel')
const MoneyNetworkUsersModel = require('../../models/info/MoneyNetworkUsersModel')
const MoneyNetworkDatesModel = require('../../models/info/MoneyNetworkDatesModel')
const UserNotificationsModel = require('../../models/users/UserNotificationsModel')
const UserSponsorVendorsModel = require('../../models/users/UserSponsorVendorsModel')
const UserManagersModel = require('../../models/users/UserManagersModel')
const ProductLocalsModel = require('../../models/products/ProductLocalsModel')
const ServiceLocalsModel = require('../../models/services/ServiceLocalsModel')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const UserDefaultSponsorsModel = require('../../models/users/UserDefaultSponsorsModel')
const InvoiceVendorStatusModel = require('../../models/invoice/InvoiceVendorStatusModel')
const DebtsReceivableModel = require('../../models/debts/DebtsReceivableModel')
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')
const UserNetworkLiquidationsModel = require('../../models/users/UserNetworkLiquidations')
const crypto = require('crypto')
const { errorLogMail } = require('../../utils/logMailer')

const notifyNewInvoice = async (i_id, i_consecutive) => {
    try {
        linkBelongsTo(InvoiceVendorsModel, VendorsModel, 'v_id', 'v_id')
        linkBelongsTo(VendorsModel, UsersModel, 'u_id', 'u_id')

        const vendorsInvoices = await InvoiceVendorsModel.findAll({
            attributes: ['iv_id', 'i_id', 'v_id', 'iv_datCre'],
            include: [
                {
                    attributes: ['v_id', 'u_id', 'v_alias'],
                    include: [{ attributes: ['u_email'], model: UsersModel }],
                    model: VendorsModel
                }
            ],
            where: { i_id: deCode(i_id) }
        })
        for (let i = 0; i < vendorsInvoices.length; i++) {
            const { vendor } = vendorsInvoices[i]
            const { u_email } = vendor.user
            const mail = transporter()
            mail.sendMail({
                from: 'Nuevo pedido en Winby <no-reply@winby.co>',
                to: u_email,
                subject: 'Winby tu nueva forma de vender.',
                html: NotifyNewInvoiceTemplate(i_consecutive, vendor.v_alias, InvoiceVendorsModel.iv_datCre)
            })
        }
    } catch (e) {
        errorLogMail(e, {})
    }
}

/** busca toda la información de la factura */
controllers.getOne = async (req, res) => {
    try {
        /** variables necesarias */
        const { i_id, i_state } = req.body

        /** relacion de base de datos */
        linkBelongsTo(InvoicesModel, InvoiceClientsModel, 'i_id', 'i_id')
        linkBelongsTo(InvoiceClientsModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(InvoiceClientsModel, DepartmentsModel, 'd_id', 'd_id')
        linkBelongsTo(InvoiceClientsModel, MunicipalitiesModel, 'm_id', 'm_id')
        linkHasMany(InvoicesModel, InvoiceProductsModel, 'i_id', 'i_id')
        linkBelongsTo(InvoiceProductsModel, ProductsModel, 'p_id', 'p_id')
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')
        linkHasMany(InvoicesModel, InvoiceServicesModel, 'i_id', 'i_id')
        linkHasMany(InvoicesModel, InvoiceVendorsModel, 'i_id', 'i_id')
        linkBelongsTo(InvoiceServicesModel, ServicesModel, 's_id', 's_id')
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')

        /** peticion */
        const data = await InvoicesModel.findOne({
            attributes: ['i_id', 'i_consecutive', 'i_datSta', 'i_datEnd', 'i_datExp', 'i_sub', 'i_delivery', 'i_total', 'i_epayco', 'i_state', 'i_datCre', 'i_taxGat'],
            include: [
                {
                    attributes: ['ip_id', 'v_id', 'ip_name', 'ip_description', 'ip_price', 'ip_quantity', 'ip_total', 'ip_groPer', 'ip_franchise', 'ip_state', 'ip_taxGat', 'ip_attr', 'ip_typeVen', 'ip_sku'],
                    model: InvoiceProductsModel,
                    required: false,
                    include: [{
                        attributes: ['p_id', 'p_name', 'p_description', 'p_price', 'p_quantity', 'p_available', 'p_groPer', 'p_state', 'p_taxGat', 'p_sku'],
                        model: ProductsModel,
                        required: false,
                        include: [{ attributes: ['pp_id', 'pp_name', 'pp_cover'], model: ProductPhotosModel, where: { pp_state: 1 }, required: false }]
                    }]
                },
                {
                    attributes: ['is_id', 'v_id', 'is_name', 'is_description', 'is_price', 'is_total', 'is_groPer', 'is_state', 'is_taxGat', 'is_attr', 'is_typeVen', 'is_sku'],
                    model: InvoiceServicesModel,
                    required: false,
                    include: [
                        {
                            attributes: ['s_id', 's_name', 's_description', 's_price', 's_groPer', 's_state', 's_taxGat', 's_sku'],
                            model: ServicesModel,
                            required: false,
                            include: [{ attributes: ['sp_id', 'sp_name', 'sp_cover'], model: ServicePhotosModel, where: { sp_state: 1 }, required: false }]
                        }
                    ]
                },
                {
                    attributes: ['iv_id', 'v_id', 'iv_delivery', 'c_id', 'd_id', 'm_id', 'iv_location', 'iv_lat', 'iv_lon', 'iv_domFre', 'iv_cosKM', 'iv_state'],
                    include: [{
                        attributes: ['ivs_id', 'ivs_type', 'ivs_date'], model: InvoiceVendorStatusModel, order: [['ivs_type', 'DESC']]
                    }],
                    model: InvoiceVendorsModel
                },
                {
                    attributes: ['ic_id', 'ic_name', 'ic_last', 'ic_phone', 'ic_email', 'ic_location', 'ic_lat', 'ic_lon', 'ic_state'],
                    model: InvoiceClientsModel,
                    include: [{ attributes: ['c_id', 'c_name'], model: CountriesModel }, { attributes: ['d_id', 'd_name'], model: DepartmentsModel }, { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }]
                }
            ],
            where: { i_id: deCode(i_id), i_state: i_state || { [Op.gte]: 0 } }
        })
        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca toda las factura del usuario de la tienda */
controllers.getAllShopUser = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id } = req.body

        /** peticion */
        const data = await InvoicesModel.findAll({ attributes: ['i_id', 'i_vendor', 'i_consecutive', 'i_datSta', 'i_datEnd', 'i_datExp', 'i_sub', 'i_delivery', 'i_total', 'i_state', 'i_taxGat'], where: { u_id: deCode(u_id) }, order: [['i_consecutive', 'DESC']] })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Ver pedidos por vendedor */
controllers.getAllVendor = async (req, res) => {
    try {
        /** variables necesarias */
        const { v_id, i_vendor, i_state, i_datExp, iv_state, min, max, typeOrder } = req.body
        let order = []
        /** relacion de base de datos */
        linkHasMany(InvoicesModel, InvoiceVendorsModel, 'i_id', 'i_id')
        linkBelongsTo(InvoicesModel, UserProfilesModel, 'u_id', 'u_id')

        if (typeOrder === 1) order = [['i_datSta', 'DESC']]

        /** peticion */
        const data = await InvoicesModel.findAll({
            attributes: ['i_id', 'i_consecutive', 'i_vendor', 'i_datSta', 'i_datEnd', 'i_datExp', 'i_sub', 'i_delivery', 'i_total', 'i_epayco', 'i_invoice', 'i_state', 'i_taxGat', 'i_datCre'],
            include: [
                {
                    attributes: ['iv_id', 'iv_delivery', 'c_id', 'd_id', 'iv_state', 'iv_datCre'],
                    include: [{ attributes: ['ivs_id', 'ivs_type', 'ivs_date'], model: InvoiceVendorStatusModel }],
                    model: InvoiceVendorsModel,
                    where: { v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, iv_state: iv_state || { [Op.gte]: 0 } }
                },
                { attributes: ['up_ideNum', 'up_name', 'up_last'], model: UserProfilesModel }
            ],
            where: { i_vendor: i_vendor || { [Op.ne]: '' }, i_state: i_state ? { [Op.or]: [i_state] } : { [Op.gte]: 0 }, i_datExp: i_datExp || { [Op.gte]: 0 } },
            order,
            limit: max && [min, max]
        })
        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Ver pedidos por vendedor */
controllers.getAllProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { i_id, v_id, ip_state } = req.body

        /** peticion */
        const data = await InvoiceProductsModel.findAll({
            attributes: ['ip_id', 'i_id', 'p_id', 'v_id', 'ip_name', 'ip_description', 'ip_price', 'ip_quantity', 'ip_total', 'ip_groPer', 'ip_franchise', 'ip_state', 'ip_taxGat', 'ip_attr', 'ip_typeVen', 'ip_sku'],
            where: { i_id: i_id ? deCode(i_id) : { [Op.gte]: 0 }, v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, ip_state: ip_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Ver pedidos por vendedor */
controllers.getAllServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { i_id, v_id, is_state } = req.body

        /** peticion */
        const data = await InvoiceServicesModel.findAll({
            attributes: ['is_id', 'i_id', 's_id', 'v_id', 'is_name', 'is_description', 'is_price', 'is_total', 'is_groPer', 'is_state', 'is_taxGat', 'is_attr', 'is_typeVen', 'is_sku'],
            where: { i_id: i_id ? deCode(i_id) : { [Op.gte]: 0 }, v_id: v_id ? deCode(v_id) : { [Op.gte]: 0 }, is_state: is_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Ver pedidos por vendedor */
controllers.getOneClient = async (req, res) => {
    try {
        /** variables necesarias */
        const { i_id, ic_state } = req.body

        /** relacion de base de datos */
        linkBelongsTo(InvoiceClientsModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(InvoiceClientsModel, DepartmentsModel, 'd_id', 'd_id')
        linkBelongsTo(InvoiceClientsModel, MunicipalitiesModel, 'm_id', 'm_id')

        /** peticion */
        const data = await InvoiceClientsModel.findOne({
            attributes: ['ic_id', 'ic_name', 'ic_last', 'ic_phone', 'ic_email', 'ic_location', 'ic_lat', 'ic_lon', 'ic_state'],
            include: [
                { attributes: ['c_id', 'c_name'], model: CountriesModel },
                { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }
            ],
            where: { i_id: deCode(i_id), ic_state: ic_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registrar factura del usuario */
controllers.register = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, i_vendor, profile, i_delivery, up_name, up_last, u_phoNum, u_email, c_id, d_id, m_id, up_location, up_lat, up_lon, invoiceproducts, invoiceservices, invoicevendors } = req.body

        /** busca el consecutivo */
        const dataC = await ConsecutivesModel.findOne({ attributes: ['c_id', 'c_value'], where: { c_name: 'factura' } })

        /** obtiene el nuevo consecutivo */
        const newConsecutive = consecutive(dataC.c_value), i_datSta = new Date(), i_datExp = new Date()

        let subTotal = 0
        let iProducts = [], iServices = []

        /**
         * Calcular subtotal de la compra
         */

        // Productos
        for (let i = 0; i < invoiceproducts?.length; i++) {
            const { p_id, ip_total, v_id, attributes: ip_attr } = invoiceproducts[i]

            const dataP = await ProductsModel.findOne({ attributes: ['p_name', 'p_description', 'p_price', 'p_quantity', 'p_groPer', 'p_franchise', 'p_taxGat', 'p_typeVen', 'p_sku'], where: { p_id: deCode(p_id), p_state: 1 } })
            if (dataP) {
                let formatAttr = ''
                for (let y = 0; y < (ip_attr || [])?.length; y++) {
                    formatAttr = `${formatAttr}${y > 0 ? ';' : ''}${ip_attr[y].key}: ${ip_attr[y][ip_attr[y].key]}`
                }

                subTotal += (dataP.p_price * ip_total)
                iProducts = [...iProducts, { p_id, v_id, ip_name: dataP.p_name, ip_description: dataP.p_description, ip_price: dataP.p_price, ip_quantity: dataP.p_quantity, ip_total, ip_groPer: dataP.p_groPer, ip_franchise: dataP.p_franchise, ip_taxGat: (dataP.p_taxGat * ip_total), ip_attr: formatAttr, ip_typeVen: dataP.p_typeVen, ip_sku: dataP.p_sku }]
            }
        }

        // Servicios
        for (let i = 0; i < invoiceservices?.length; i++) {
            const { s_id, v_id, is_total, servicecalendars, attributes: is_attr } = invoiceservices[i]
            const dataS = await ServicesModel.findOne({ attributes: ['s_name', 's_description', 's_price', 's_groPer', 's_taxGat', 's_typeVen', 's_sku'], where: { s_id: deCode(s_id), s_state: 1 } })
            if (dataS) {
                let formatAttr = ''
                for (let y = 0; y < (is_attr || [])?.length; y++) {
                    formatAttr = `${formatAttr}${y > 0 ? ';' : ''}${is_attr[y].key}: ${is_attr[y][is_attr.key]}`
                }

                subTotal += (dataS.s_price * is_total)
                iServices = [...iServices, { s_id, v_id, is_name: dataS.s_name, is_description: dataS.s_description, is_price: dataS.s_price, is_total, is_groPer: dataS.s_groPer, servicecalendars, is_taxGat: (dataS.s_taxGat * is_total), is_attr: formatAttr, is_typeVen: dataS.s_typeVen, is_sku: dataS.s_sku }]
            }
        }

        // Consultar porcentaje comisión de la pasarela
        const dataISe = await InfoSelesModel.findOne({ attributes: ['is_taxGat'], where: { is_state: 1 } })

        /** crear factura */
        const data = await InvoicesModel.create({ u_id: deCode(u_id), i_consecutive: newConsecutive, i_vendor, i_datSta, i_datExp: i_datExp.setDate(i_datSta.getDate() + 14), i_sub: Math.round(subTotal), i_delivery: Math.round(i_delivery), i_total: Math.round(subTotal + i_delivery), i_state: 6, i_taxGat: (Math.round(subTotal) * dataISe.is_taxGat) })

        /** busca la información del usuario */
        const dataUP = await UserProfilesModel.findOne({ attributes: ['up_name', 'up_last', 'c_id', 'd_id', 'm_id', 'up_location'], where: { u_id: deCode(u_id) } })

        /** actualiza la información del usuario si no tiene */
        await UserProfilesModel.update({ up_name: (dataUP.up_name || up_name), up_last: (dataUP.up_last || up_last), c_id: !!dataUP.dataValues.c_id ? deCode(dataUP.c_id) : deCode(c_id), d_id: !!dataUP.dataValues.d_id ? deCode(dataUP.d_id) : deCode(d_id), m_id: !!dataUP.dataValues.m_id ? deCode(dataUP.m_id) : deCode(m_id), up_location: (dataUP.up_location || up_location), up_lat, up_lon }, { where: { u_id: deCode(u_id) } })

        /** Registra la información del cliente */
        await InvoiceClientsModel.create({ i_id: deCode(data.i_id), ic_name: up_name, ic_last: up_last, ic_phone: u_phoNum, ic_email: u_email, c_id: deCode(c_id), d_id: deCode(d_id), m_id: deCode(m_id), ic_location: up_location, ic_lat: up_lat, ic_lon: up_lon, ic_state: 1 })

        /**
         * Registrar productos y servicios a la factura
         */

        // Productos
        for (let i = 0; i < iProducts.length; i++) {
            const { p_id, v_id, ip_name, ip_description, ip_price, ip_quantity, ip_total, ip_groPer, ip_franchise, ip_taxGat, ip_attr, ip_typeVen, ip_sku } = iProducts[i]
            /** registro de producto */
            await InvoiceProductsModel.create({ i_id: deCode(data.i_id), p_id: deCode(p_id), v_id: deCode(v_id), ip_name, ip_description, ip_price, ip_quantity, ip_total, ip_groPer, ip_franchise, ip_state: 6, ip_taxGat, ip_attr, ip_typeVen, ip_sku })
        }

        /** registrar servicios de la factura */
        for (let i = 0; i < iServices.length; i++) {
            const { s_id, v_id, is_name, is_description, is_price, is_total, is_groPer, servicecalendars, is_taxGat, is_attr, is_typeVen, is_sku } = iServices[i]
            /** registro de servicio */
            const dataIS = await InvoiceServicesModel.create({ i_id: deCode(data.i_id), s_id: deCode(s_id), v_id: deCode(v_id), is_name, is_description, is_price, is_total, is_groPer, is_state: 6, is_taxGat, is_attr, is_typeVen, is_sku })

            /** verifica si se registro y si existe calendario */
            if (dataIS && servicecalendars?.length) {
                for (let ii = 0; ii < servicecalendars.length; ii++) {
                    const { sc_date, sc_type, servicecalendarhours } = servicecalendars[ii]

                    /** verifica si existen horas en el calendario */
                    if (servicecalendarhours?.length) {
                        /** registra la fecha del calendario */
                        const dataISC = await InvoiceServiceCalendarsModel.create({ is_id: deCode(dataIS.is_id), isc_date: sc_date, isc_type: sc_type, isc_state: 1 })
                        if (dataISC) {
                            /** registra las horas */
                            for (let iii = 0; iii < servicecalendarhours.length; iii++) {
                                InvoiceServiceCalendarHoursModel.create({ isc_id: deCode(dataISC.isc_id), isch_value: servicecalendarhours[iii]?.sch_value, isch_state: 1 })
                            }
                        }
                    }
                }
            }
        }

        // Registrar vendedores de la factura
        for (let i = 0; i < invoicevendors.length; i++) {
            const { v_id, iv_delivery, c_id, d_id, m_id, iv_location, iv_lat, iv_lon, iv_domFre, iv_cosKM } = invoicevendors[i]
            /** registro de vendedor */
            await InvoiceVendorsModel.create({ i_id: deCode(data.i_id), v_id: deCode(v_id), iv_delivery, c_id: deCode(c_id), d_id: deCode(d_id), m_id: deCode(m_id), iv_location, iv_lat, iv_lon, iv_domFre: iv_domFre || 0, iv_cosKM: iv_cosKM || 0, iv_state: 5 })
        }

        if (!profile) await UserProfilesModel.update({ up_name, up_last, c_id: deCode(c_id), d_id: deCode(d_id), m_id: deCode(m_id) }, { where: { u_id: deCode(u_id) } })
        /** actualiza el consecutivo */
        await ConsecutivesModel.update({ c_value: newConsecutive }, { where: { c_id: deCode(dataC.c_id) } })
        return res.json({ success: 1, data, message: 'Pedido realizado con éxito, debe de pagar la compra.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

const approveInvoice = async ({ i_id, x_amount, i_wallet, i_epayco, i_invoice }) => {
    // Relaciones de tablas
    linkBelongsTo(InvoicesModel, InvoiceClientsModel, 'i_id', 'i_id')
    linkHasMany(InvoicesModel, InvoiceProductsModel, 'i_id', 'i_id')
    linkHasMany(InvoicesModel, InvoiceServicesModel, 'i_id', 'i_id')
    linkHasMany(InvoicesModel, InvoiceVendorsModel, 'i_id', 'i_id')
    linkBelongsTo(InvoicesModel, UserProfilesModel, 'up_code', 'i_vendor')
    linkBelongsTo(UserProfilesModel, UserPointsModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, UserMembersModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, UserMoneysModel, 'u_id', 'u_id')
    linkBelongsTo(VendorsModel, UsersModel, 'u_id', 'u_id')

    let email = false

    // Obtener información de la factura
    const data = await InvoicesModel.findOne({
        attributes: ['i_id', 'i_consecutive', 'u_id', 'i_vendor', 'i_total', 'i_taxGat'],
        include: [
            { attributes: ['ip_id', 'p_id', 'ip_price', 'ip_franchise', 'ip_taxGat', 'ip_typeVen'], model: InvoiceProductsModel, required: false },
            { attributes: ['is_id', 'is_typeVen'], model: InvoiceServicesModel, required: false },
            {
                attributes: ['u_id', 'up_confirm', 'up_code', 'up_typMod'],
                model: UserProfilesModel,
                include: [
                    { attributes: ['up_point'], model: UserPointsModel },
                    { attributes: ['um_money'], model: UserMoneysModel }
                ]
            }
        ],
        where: { i_id: deCode(i_id), i_state: { [Op.gt]: 5 } }
    })

    if (data) {
        let sponsorCode = data?.userprofile?.up_code || 'Winby'
        let sponsorTypeMod = data?.userprofile?.up_typMod
        let defaultSponsor = false
        let udsData = {}

        if (sponsorCode === 'Winby') {
            defaultSponsor = true

            linkBelongsTo(UserDefaultSponsorsModel, UserProfilesModel, 'up_id', 'up_id')

            udsData = await UserDefaultSponsorsModel.findOne({
                attributes: ['up_id'],
                include: [{ attributes: ['up_code', 'up_typMod'], model: UserProfilesModel }],
                where: { udsState: 1 }
            })

            if (!udsData) {
                await UserDefaultSponsorsModel.update({ udsState: 1 }, { where: { udsId: { [Op.gt]: 0 } } })
                udsData = await UserDefaultSponsorsModel.findOne({
                    attributes: ['up_id'],
                    include: [{ attributes: ['up_code', 'up_typMod'], model: UserProfilesModel }],
                    where: { udsState: 1 }
                })
            }
            sponsorCode = udsData?.userprofile?.up_code
            sponsorTypeMod = udsData?.userprofile?.up_typMod
        }

        /** confirma si el monto pagado es igual al de la factura */
        if (data.i_total === parseInt(x_amount) || parseInt(data.i_total + data.i_taxGat) === parseInt(x_amount)) {
            const dataUM = await UserMoneysModel.findOne({ attributes: ['um_id', 'um_money'], where: { u_id: deCode(data.u_id) } }) // Dinero del usuario que realiza la compra
            if (dataUM) {
                if (dataUM.um_money < x_amount && i_wallet) return { success: 0, message: 'Saldo insuficiente.' }
            } else return { success: 0, message: 'No se ha encontrado al usuario.' }

            /** confirma el pago de la factura */
            InvoicesModel.update({ i_datEnd: new Date(), i_epayco, i_invoice, i_wallet, i_state: 5 }, { where: { i_id: deCode(data.i_id) } })
            // Confirma el pago para todos los vendedors
            await InvoiceVendorsModel.update({ iv_state: 5 }, { where: { i_id: deCode(data.i_id) } })
            if (i_wallet) {
                UserMoneysModel.update({ um_money: (dataUM?.um_money - x_amount) }, { where: { um_id: deCode(dataUM?.um_id) } })
                MoneyReportsModel.create({ u_id: deCode(data.u_id), mr_money: dataUM?.um_money, mr_type: 8, mr_retire: x_amount, mr_state: 1 })
            } else {
                MoneyReportsModel.create({ u_id: deCode(data.u_id), mr_money: dataUM?.um_money, mr_type: 6, mr_confirm: x_amount, mr_state: 1 })
                MoneyReportsModel.create({ u_id: deCode(data.u_id), mr_money: (dataUM?.um_money + x_amount), mr_type: 7, mr_retire: x_amount, mr_state: 1 })
            }

            if (data.invoiceproducts.length) {
                for (let i = 0; i < data.invoiceproducts.length; i++) {
                    const { ip_id, p_id, ip_price, ip_franchise } = data.invoiceproducts[i]
                    if (ip_franchise) {
                        // Actualiza el estado de la franquicia como finalizada
                        InvoiceProductsModel.update({ ip_state: 1 }, { where: { ip_id: deCode(ip_id) } })
                        /** Verifica que no tenga un patrocinador */
                        const dataS = await UserSponsorsModel.findOne({ attributes: ['us_code'], where: { u_id: deCode(data.u_id) } })
                        /** registra o actualiza el patrocinador del usuario */
                        if (!dataS) {
                            UserSponsorsModel.create({ u_id: deCode(data.u_id), us_code: sponsorCode || 'Winby', us_type: sponsorTypeMod || 1, us_state: 1 })
                            if (defaultSponsor && udsData) UserDefaultSponsorsModel.update({ udsState: 0 }, { where: { up_id: deCode(udsData.up_id) } })
                        } else if (dataS.us_code === 'Winby') UserSponsorsModel.update({ us_code: data?.userprofile?.up_code }, { where: { u_id: deCode(data.u_id), us_code: 'Winby' } })

                        // si el cliente ya tiene un patrocinador y el código de la factura no coincide con este, se busca la información del verdadero patrocinador
                        let isDiffCode = false
                        let dataSponsor = {}
                        if (dataS && dataS.us_code !== data?.i_vendor) {
                            isDiffCode = true
                            dataSponsor = await UserProfilesModel.findOne({
                                attributes: ['u_id', 'up_confirm', 'up_code', 'up_typMod'],
                                include: [
                                    { attributes: ['up_point'], model: UserPointsModel },
                                    { attributes: ['um_money'], model: UserMoneysModel }
                                ],
                                where: { up_code: dataS.us_code }
                            })
                        }

                        /** busca la info de los % */
                        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_por', 'is_porSelFra', 'is_porSelFraTot', 'is_porPoiFra', 'is_porWinFra', 'is_porSelFraTwo', 'is_porSelFraThree', 'is_porSelFraFour'], where: { is_state: 1 } })
                        const pointUserVendor = ((ip_price * dataIS.is_porPoiFra) * dataIS.is_por)

                        if (pointUserVendor > 0) {
                            // Actualiza los puntos de la persona que realiza la venta
                            UserPointsModel.update({ up_point: (pointUserVendor + (isDiffCode ? dataSponsor?.userpoint?.up_point : data?.userprofile?.userpoint?.up_point)) }, { where: { u_id: deCode(isDiffCode ? dataSponsor.u_id : data?.userprofile?.u_id) } })

                            /** registra el reporte de los puntos */
                            PointReportsModel.create({ u_id: deCode(isDiffCode ? dataSponsor.u_id : data?.userprofile?.u_id), pr_point: pointUserVendor, pr_state: 1 })
                        }

                        /** valor del dinero del usuario que hizo la venta */
                        const moneyUV = ip_price * ((isDiffCode ? dataSponsor.up_confirm : data?.userprofile?.up_confirm) === 2 ? dataIS?.is_porSelFra : dataIS?.is_porSelFraTot)

                        /** actualiza el dinero de quien lo invito */
                        UserMoneysModel.update({ um_money: (moneyUV + (isDiffCode ? dataSponsor?.usermoney?.um_money : data?.userprofile?.usermoney?.um_money)) }, { where: { u_id: deCode(isDiffCode ? dataSponsor.u_id : data?.userprofile?.u_id) } })

                        /** Registra el reporte del dinero */
                        MoneyReportsModel.create({ u_id: deCode(isDiffCode ? dataSponsor.u_id : data?.userprofile?.u_id), mr_money: isDiffCode ? dataSponsor?.usermoney?.um_money : data?.userprofile?.usermoney?.um_money, mr_confirm: moneyUV, mr_type: 3, i_id: deCode(data?.i_id), mr_franchise: 1, mr_isDirSellFran: 1, mr_state: 1 })

                        /** verifica si el usuario activo la red */
                        if ((isDiffCode ? dataSponsor.up_confirm : data?.userprofile?.up_confirm) === 2) {
                            /** Busca al usuario nivel 2 para pagarle */
                            linkBelongsTo(UserSponsorsModel, UserProfilesModel, 'up_code', 'us_code')
                            const dataUSTwo = await UserSponsorsModel.findOne({ attributes: ['us_code'], include: [{ attributes: ['u_id'], model: UserProfilesModel }], where: { u_id: deCode(isDiffCode ? dataSponsor.u_id : data?.userprofile?.u_id) } })
                            if (dataUSTwo?.userprofile) {
                                /** le entrega el dinero al nivel 2 */
                                const dataUMTwo = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(dataUSTwo?.userprofile?.u_id) } })

                                /** actualiza el dinero de quien lo invito */
                                UserMoneysModel.update({ um_money: ((ip_price * dataIS?.is_porSelFraTwo) + dataUMTwo?.um_money) }, { where: { u_id: deCode(dataUSTwo?.userprofile?.u_id) } })

                                /** Registra el reporte del dinero */
                                MoneyReportsModel.create({ u_id: deCode(dataUSTwo?.userprofile?.u_id), mr_money: dataUMTwo?.um_money, mr_confirm: (ip_price * dataIS?.is_porSelFraTwo), mr_type: 3, i_id: deCode(data?.i_id), mr_franchise: 1, mr_state: 1 })

                                /** Busca al usuario nivel 3 para pagarle */
                                const dataUSThree = await UserSponsorsModel.findOne({ attributes: ['us_code'], include: [{ attributes: ['u_id'], model: UserProfilesModel }], where: { u_id: deCode(dataUSTwo?.userprofile?.u_id) } })

                                if (dataUSThree?.userprofile) {
                                    /** le entrega el dinero al nivel 3 */
                                    const dataUMThree = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(dataUSThree?.userprofile?.u_id) } })

                                    /** actualiza el dinero de quien lo invito */
                                    UserMoneysModel.update({ um_money: ((ip_price * dataIS?.is_porSelFraThree) + dataUMThree?.um_money) }, { where: { u_id: deCode(dataUSThree?.userprofile?.u_id) } })

                                    /** Registra el reporte del dinero */
                                    MoneyReportsModel.create({ u_id: deCode(dataUSThree?.userprofile?.u_id), mr_money: dataUMThree?.um_money, mr_confirm: (ip_price * dataIS?.is_porSelFraThree), mr_type: 3, i_id: deCode(data?.i_id), mr_franchise: 1, mr_state: 1 })

                                    /** Busca al usuario nivel 4 para pagarle */
                                    const dataUSFour = await UserSponsorsModel.findOne({ attributes: ['us_code'], include: [{ attributes: ['u_id'], model: UserProfilesModel }], where: { u_id: deCode(dataUSThree?.userprofile?.u_id) } })

                                    if (dataUSFour?.userprofile) {
                                        /** le entrega el dinero al nivel 4 */
                                        const dataUMFour = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(dataUSFour?.userprofile?.u_id) } })

                                        /** actualiza el dinero de quien lo invito */
                                        UserMoneysModel.update({ um_money: ((ip_price * dataIS?.is_porSelFraFour) + dataUMFour?.um_money) }, { where: { u_id: deCode(dataUSFour?.userprofile?.u_id) } })

                                        /** Registra el reporte del dinero */
                                        MoneyReportsModel.create({ u_id: deCode(dataUSFour?.userprofile?.u_id), mr_money: dataUMFour?.um_money, mr_confirm: (ip_price * dataIS?.is_porSelFraFour), mr_type: 3, i_id: deCode(data?.i_id), mr_franchise: 1, mr_state: 1 })
                                    }
                                }
                            }
                        }

                        /** busca los meses ofrecido por la franquicia */
                        const dataP = await ProductsModel.findOne({ attributes: ['p_monFra'], where: { p_id: deCode(p_id) } })

                        /** le agrega un año a la fecha */
                        const dat = new Date()
                        const dataUM = await UserMembersModel.findOne({ attributes: ['um_datExp'], where: { u_id: deCode(data.u_id) } })
                        let datExp = dat >= dataUM?.um_datExp ? dat : new Date(dataUM?.um_datExp)
                        datExp = datExp.setMonth(datExp.getMonth() + dataP.p_monFra)
                        const dataUserProfile = await UserProfilesModel.findOne({ attributes: ['up_franchise'], where: { u_id: deCode(data.u_id) } })
                        if (!dataUserProfile?.up_franchise) email = true
                        UserMembersModel.update({ ...(!dataUserProfile?.up_franchise ? { um_firstPay: new Date() } : {}), um_datExp: new Date(datExp) }, { where: { u_id: deCode(data.u_id) } })

                        /** reporte de registro de dinero para winby */
                        let moneyGain = 0
                        if ((isDiffCode ? dataSponsor.up_confirm : data?.userprofile?.up_confirm) === 2) moneyGain = dataIS.is_porWinFra
                        else moneyGain = 1 - dataIS.is_porSelFraTot

                        moneyGain *= ip_price
                        const dataAM = await AdminMoneysModel.findOne({ attributes: ['am_id', 'am_amount'] })
                        AdminMoneysModel.update({ am_amount: ip_price + dataAM.am_amount }, { where: { am_id: deCode(dataAM.am_id) } })
                        AdminMoneyReportsModel.create({ u_id: deCode(data.u_id), amr_amount: dataAM.am_amount, amr_type: 1, amr_total: ip_price, amr_utility: ip_price, amr_gain: moneyGain, amr_state: 1 })

                        /** Relación de base de datos */
                        linkHasMany(MenuChargesModel, SubMenuChargesModel, 'mc_id', 'mc_id')
                        linkHasMany(UserProfilesModel, UserStoreCategoryProductsModel, 'u_id', 'u_id')
                        linkHasMany(UserProfilesModel, UserStoreCategoryServicesModel, 'u_id', 'u_id')
                        linkHasMany(UserProfilesModel, UserStoreProductsModel, 'u_id', 'u_id')
                        linkHasMany(UserProfilesModel, UserStoreServicesModel, 'u_id', 'u_id')

                        /** Busca el menu y sub menu del cargo del usuario  */
                        const dataMC = await MenuChargesModel.findAll({ attributes: ['m_id'], include: [{ attributes: ['sm_id'], model: SubMenuChargesModel }], where: { uc_id: 2 } })
                        const dataUP = await UserProfilesModel.findOne({
                            attributes: ['up_id'],
                            include: [
                                { attributes: ['cp_id'], model: UserStoreCategoryProductsModel, where: { uscp_state: 1 }, required: false },
                                { attributes: ['cs_id'], model: UserStoreCategoryServicesModel, where: { uscs_state: 1 }, required: false },
                                { attributes: ['p_id'], model: UserStoreProductsModel, where: { usp_state: 1 }, required: false },
                                { attributes: ['s_id'], model: UserStoreServicesModel, where: { uss_state: 1 }, required: false }
                            ],
                            where: { up_code: 'Winby' }
                        })

                        if (dataMC.length) {
                            for (let i = 0; i < dataMC.length; i++) {
                                const x = dataMC[i]
                                const dataUM = await UpCrFind(UserMenusModel, { m_id: x.m_id, u_id: deCode(data.u_id), um_state: 1 }, { m_id: x.m_id, u_id: deCode(data.u_id) })
                                if (x.submenucharges.length) { x.submenucharges.map(y => UpCrFind(UserSubMenusModel, { sm_id: deCode(y.sm_id), um_id: deCode(dataUM.um_id), usm_state: 1 }, { sm_id: deCode(y.sm_id), um_id: deCode(dataUM.um_id) })) }
                            }
                        }
                        const dataUPUser = await UserProfilesModel.findOne({ attributes: ['up_franchise'], where: { u_id: deCode(data.u_id) } })
                        if (!dataUPUser.up_franchise) {
                            for (let i = 0; i < dataUP.userstorecategoryproducts.length; i++) {
                                const x = dataUP.userstorecategoryproducts[i]
                                await UserStoreCategoryProductsModel.create({ u_id: deCode(data.u_id), cp_id: deCode(x.cp_id), uscp_state: 1 })
                            }
                            for (let i = 0; i < dataUP.userstorecategoryservices.length; i++) {
                                const x = dataUP.userstorecategoryservices[i]
                                await UserStoreCategoryServicesModel.create({ u_id: deCode(data.u_id), cs_id: deCode(x.cs_id), uscs_state: 1 })
                            }
                            for (let i = 0; i < dataUP.userstoreproducts.length; i++) {
                                const x = dataUP.userstoreproducts[i]
                                await UserStoreProductsModel.create({ u_id: deCode(data.u_id), p_id: deCode(x.p_id), usp_state: 1 })
                            }
                            for (let i = 0; i < dataUP.userstoreservices.length; i++) {
                                const x = dataUP.userstoreservices[i]
                                await UserStoreServicesModel.create({ u_id: deCode(data.u_id), s_id: deCode(x.s_id), uss_state: 1 })
                            }
                            await UserProfilesModel.update({ up_franchise: 1 }, { where: { u_id: deCode(data.u_id) } })
                            await UsersModel.update({ uc_id: 2 }, { where: { u_id: deCode(data.u_id) } })
                        }

                        // Crear notificacion de activación de licencia
                        UserNotificationsModel.create({
                            u_id: deCode(data.u_id),
                            un_title: '¡Tu licencia Winby ha sido activada!',
                            un_message: `Tu licencia Winby ha sido activada correctamente, expira el ${new Date(datExp).toLocaleDateString()}.`,
                            un_type: 2,
                            un_state: 2
                        })
                    } else InvoiceProductsModel.update({ ip_state: 5 }, { where: { ip_id: deCode(ip_id) } })
                }
            }

            if (data.invoiceservices.length) {
                for (let i = 0; i < data.invoiceservices.length; i++) {
                    const { is_id } = data.invoiceservices[i]
                    await InvoiceServicesModel.update({ is_state: 5 }, { where: { is_id: deCode(is_id) } })
                }
            }

            // Notificación de nuevo pedido para los vendedores.
            notifyNewInvoice(data.i_id, data.i_consecutive)
        }

        if (email) {
            const mailer = transporter()
            const dataU = await UsersModel.findOne({ attributes: ['u_email'], where: { u_id: deCode(data.u_id) } })
            mailer.sendMail({
                from: 'Bienvenido a ser parte de Winby <no-reply@winby.co>',
                to: dataU?.u_email,
                subject: 'Winby tu nueva forma de vender.',
                html: WelcomeFranchise
            })
        }

        /**
         * Actulizar las facturas
         */
        const dataIFinish = await InvoicesModel.findOne({
            attributes: ['i_id'],
            include: [{ attributes: ['iv_state'], model: InvoiceVendorsModel }],
            where: { i_id: deCode(i_id) }
        })

        const dataIPro = await InvoiceProductsModel.findAll({ attributes: ['ip_id'], where: { i_id: deCode(i_id), ip_state: { [Op.ne]: 1 } } })
        const dataIServ = await InvoiceServicesModel.findAll({ attributes: ['is_id'], where: { i_id: deCode(i_id), is_state: { [Op.ne]: 1 } } })

        const findActive = dataIFinish?.invoicevendors?.find(x => x.iv_state === 5)

        if (!dataIPro.length && !dataIServ.length) InvoicesModel.update({ i_state: 1 }, { where: { i_id: deCode(i_id) } })
        else if (!findActive) {
            const resFind = dataIFinish?.invoicevendors?.find(x => x.iv_state === 1)
            if (resFind) InvoicesModel.update({ i_state: 1 }, { where: { i_id: deCode(i_id) } })
            else InvoicesModel.update({ i_state: 0 }, { where: { i_id: deCode(i_id) } })
        }
        const dataInvoiceVen = await InvoiceVendorsModel.findAll({
            attributes: ['iv_id'],
            include: [
                { attributes: ['ip_id'], model: InvoiceProductsModel, where: { ip_state: { [Op.ne]: 1 } }, required: false },
                { attributes: ['is_id'], model: InvoiceServicesModel, where: { is_state: { [Op.ne]: 1 } }, required: false }
            ],
            where: { i_id: deCode(data.i_id) }
        })

        for (let i = 0; i < dataInvoiceVen.length; i++) {
            const invoiceV = dataInvoiceVen[i]
            if (!invoiceV.invoiceproducts.length && !invoiceV.invoiceservices.length) InvoiceVendorsModel.update({ iv_state: 1 }, { where: { iv_id: deCode(invoiceV.iv_id) } })
        }

        // Notificación de compra exitosa
        UserNotificationsModel.create({
            u_id: deCode(data.u_id),
            i_id: deCode(data.i_id),
            un_title: '¡Compra aprobada!',
            un_message: `El pago de la compra #${data.i_consecutive} ha sido aprobado, tu compra se encuentra en proceso de despacho.`,
            un_type: 1,
            un_state: 2
        })
        return { success: 1 }
    }

    return { success: 0 }
}

controllers.confirmWompi = async (req, res) => {
    try {
        const statuses = { APPROVED: 5, DECLINED: 8, VOIDED: 9, ERROR: 10 }
        const { event, data: { transaction }, timestamp, signature } = req.body
        if (event !== 'transaction.updated') return res.status(400).json({ succes: false, message: 'Bad request' }) // Validar que el evento sea una actualización de factura

        const createChecksum = `${transaction.id}${transaction.status}${transaction.amount_in_cents}${timestamp}${process.env.WOMPI_SECRET_EVENTS}` // Se crea el checksum de verificación
        const checksumHash = crypto.createHash('sha256').update(createChecksum).digest('hex') // Se cifra el checksum
        if (checksumHash !== signature.checksum) return res.status(401).json({ success: false, message: 'Unauthorized' }) // Si los hash no coinciden, se retorna un error de autorización

        // Se verifica que la factura exista
        const dataInvoice = await InvoicesModel.findOne({ attributes: ['i_id'], where: { i_consecutive: transaction.reference } })
        if (!dataInvoice) return res.status(404).json({ success: false, message: 'Invoice no found' })

        // Se actualiza la data de la factura
        InvoicesModel.update({ i_paymentType: 'WOMPI' }, { where: { i_id: deCode(dataInvoice.i_id) } })

        if (transaction.status === 'APPROVED') {
            const { success, message } = await approveInvoice({ i_id: dataInvoice.i_id, x_amount: transaction.amount_in_cents / 100, i_epayco: transaction.id, i_invoice: transaction.id })
            if (success === 1) return res.status(200).json({ success, message: 'Transaction approved' })
            return res.status(400).json({ success, message })
        } else InvoicesModel.update({ i_state: statuses[transaction.status] }, { where: { i_id: deCode(dataInvoice.i_id) } })

        return res.status(200).json({ success: true })
    } catch (e) {
        return res.status(500).json({ success: false, message: 'Error.' })
    }
}

/** confirmar factura desde epayco */
controllers.confirmEpayco = async (req, res) => {
    try {
        /** variables necesarias */
        const statuses = { 1: 5, 2: 8, 3: 11, 4: 10, 6: 11, 7: 11, 8: 12, 9: 13, 10: 14 }
        let { i_wallet } = req.body
        let i_epayco, i_invoice, x_amount = 0, x_cod_respuesta, x_transaction_id, x_signature, x_currency_code

        if (i_wallet) {
            x_amount = req.body.x_amount
            x_cod_respuesta = req.body.x_cod_respuesta
            i_invoice = req.body.i_invoice
        } else {
            i_epayco = req.query.x_ref_payco
            i_invoice = req.query.x_id_invoice
            x_amount = req.query.x_amount
            x_cod_respuesta = req.query.x_cod_respuesta
            x_transaction_id = req.query.x_transaction_id
            x_currency_code = req.query.x_currency_code
            x_signature = req.query.x_signature
            i_wallet = false

            const createChecksum = `${process.env.EPAYCO_P_CUST_ID_CLIENT}^${process.env.EPAYCO_P_KEY}^${i_epayco}^${x_transaction_id}^${x_amount}^${x_currency_code}` // Se crea el checksum de verificación
            const checksumHash = crypto.createHash('sha256').update(createChecksum).digest('hex') // Se cifra el checksum
            if (checksumHash !== x_signature) return res.status(401).json({ success: false, message: 'Unauthorized' }) // Si los hash no coinciden, se retorna un error de autorización
        }

        // Se verifica que la factura exista
        const dataInvoice = await InvoicesModel.findOne({ attributes: ['i_id'], where: { i_consecutive: i_invoice } })
        if (!dataInvoice) return res.status(404).json({ success: false, message: 'Invoice no found' })

        // Se actualiza la data de la factura
        InvoicesModel.update({ i_paymentType: i_wallet ? 'WALLET' : 'EPAYCO' }, { where: { i_id: deCode(dataInvoice.i_id) } })

        if (parseInt(x_cod_respuesta) === 1) {
            const { success, message } = await approveInvoice({ i_id: dataInvoice.i_id, x_amount: parseFloat(x_amount), i_epayco, i_invoice, i_wallet })
            if (success === 1) return res.status(200).json({ success, message: 'Transaction approved' })
            return res.status(400).json({ success, message })
        } else InvoicesModel.update({ i_state: statuses[x_cod_respuesta] }, { where: { i_id: deCode(dataInvoice.i_id) } })

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Confirmar productos desde el vendedor */
controllers.confirmVendor = async (req, res) => {
    try {
        /** variables necesarias */
        const { invoiceproducts, invoiceservices, v_id, i_vendor, invoicevendors, i_state, i_id } = req.body
        /** relación de base de datos */
        linkBelongsTo(UserProfilesModel, UserPointsModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, UserMoneysModel, 'u_id', 'u_id')
        linkBelongsTo(VendorsModel, UserMoneysModel, 'u_id', 'u_id')
        linkHasMany(InvoicesModel, InvoiceVendorsModel, 'i_id', 'i_id')
        linkBelongsTo(UserSponsorVendorsModel, UserProfilesModel, 'up_code', 'usvCode')
        linkHasMany(ProductsModel, ProductLocalsModel, 'p_id', 'p_id')
        linkBelongsTo(ProductLocalsModel, VendorsLocalsModel, 'vl_id', 'vl_id')
        linkHasMany(ServicesModel, ServiceLocalsModel, 's_id', 's_id')
        linkBelongsTo(ServiceLocalsModel, VendorsLocalsModel, 'vl_id', 'vl_id')

        /** busca el id de usuario del usuario que hizo la compra */
        const dataI = await InvoicesModel.findOne({ attributes: ['u_id', 'i_id', 'i_epayco'], where: { i_id: deCode(i_id) } })

        /** busca la info de los % */
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_por', 'is_minNet', 'is_maxNet', 'is_leader', 'is_manager', 'is_director', 'is_dirDir', 'is_dirWor', 'is_winby'], where: { is_state: 1 } })

        /** registra el ingreso de dinero para el administrador */
        const dataAM = await AdminMoneysModel.findOne({ attributes: ['am_id', 'am_amount'] })

        const data = await UserProfilesModel.findOne({
            attributes: ['u_id'],
            where: { up_code: i_vendor }
        })

        /** Busca busca el id de usuario del aliado comercial */
        const dataV = await VendorsModel.findOne({ attributes: ['u_id', 'v_type'], include: [{ attributes: ['um_money'], model: UserMoneysModel }], where: { v_id: deCode(v_id) } })

        // Busca el patrocinador del vendedor
        const dataUSV = await UserSponsorVendorsModel.findOne({ attributes: ['usvId'], include: [{ attributes: ['u_id'], model: UserProfilesModel }], where: { uId: dataV.u_id } })

        /** variables para el usuario */
        let pointU = 0
        let amountU = 0
        /** variables para el administrador */
        let amountAdmin = dataAM.am_amount
        let totalAdmin = 0
        let utilityAdmin = 0
        let gainAdmin = 0

        /** variables para el vendedor */
        let moneyV = 0

        /** variables de la red */
        let moneyMin = 0
        let moneyMax = 0
        let moneyLeader = 0
        let moneyManager = 0
        let moneyDirector = 0
        let moneyDirDir = 0
        let moneyDirWor = 0

        /** productos de factura */
        for (let i = 0; i < invoiceproducts.length; i++) {
            const { ip_id, p_id, ip_price, ip_total, ip_groPer, ip_state, ip_typeVen } = invoiceproducts[i]

            /** actualiza la compra del producto */
            InvoiceProductsModel.update({ ip_state }, { where: { ip_id: deCode(ip_id), v_id: deCode(v_id) } })

            /** registra el reporte de los puntos */
            if (ip_state) {
                /** Dinero del winber */
                const totalProduct = ip_price * ip_total
                const groPer = ip_groPer / 100
                const value = totalProduct * groPer /* - commission */
                pointU += ip_typeVen === 1 ? dataIS.is_por * totalProduct : 0
                amountU += ip_typeVen === 1 ? (groPer - (dataIS.is_minNet + dataIS.is_maxNet + dataIS.is_leader + (groPer * dataIS.is_manager) + (groPer * dataIS.is_director) + (groPer * dataIS.is_dirDir) + (groPer * dataIS.is_dirWor) + dataIS.is_winby)) * totalProduct : totalProduct * (1 - dataIS.is_winby)
                let d_id
                let c_id

                /** dinero del administrador */
                amountAdmin += totalProduct
                totalAdmin += totalProduct
                utilityAdmin += ip_typeVen === 1 ? value : 0
                gainAdmin += totalProduct * dataIS.is_winby
                if (ip_typeVen === 1) {
                    moneyMin += totalProduct * dataIS.is_minNet
                    moneyMax += totalProduct * dataIS.is_maxNet
                    moneyLeader += totalProduct * dataIS.is_leader
                    moneyManager += (groPer * dataIS.is_manager) * totalProduct
                    moneyDirector += (groPer * dataIS.is_director) * totalProduct
                    moneyDirDir += (groPer * dataIS.is_dirDir) * totalProduct
                    moneyDirWor += (groPer * dataIS.is_dirWor) * totalProduct
                }

                // Verifica si existe mas de una dirección para los productos
                if (invoicevendors?.length > 1) {
                    // Busca todas las direcciones del producto
                    const dataP = await ProductsModel.findOne({
                        attributes: ['p_id'],
                        include: [{ attributes: ['pl_id'], model: ProductLocalsModel, include: [{ attributes: ['c_id', 'd_id'], model: VendorsLocalsModel }] }],
                        where: { p_id: deCode(p_id) }
                    })

                    // Verifica si se encontro un resultado
                    if (dataP) {
                        // Busca el local en que se vendio
                        const resFind = invoicevendors.find(x => x.c_id === dataP.c_id && x.d_id === dataP.d_id)

                        d_id = resFind ? dataP.d_id : invoicevendors[0].d_id
                        c_id = resFind ? dataP.c_id : invoicevendors[0].c_id
                    } else {
                        d_id = invoicevendors[0].d_id
                        c_id = invoicevendors[0].c_id
                    }
                } else if (invoicevendors.length) {
                    d_id = invoicevendors[0].d_id
                    c_id = invoicevendors[0].c_id
                }

                // Registro de reporte
                if (ip_typeVen === 1) {
                    MoneyNetworkReportsModel.create({
                        ip_id: deCode(ip_id),
                        mnr_min: (totalProduct * dataIS.is_minNet),
                        mnr_max: (totalProduct * dataIS.is_maxNet),
                        mnr_leader: (totalProduct * dataIS.is_leader),
                        mnr_manager: ((groPer * dataIS.is_manager) * totalProduct),
                        u_id: dataUSV?.userprofile?.u_id,
                        mnr_director: ((groPer * dataIS.is_director) * totalProduct),
                        d_id,
                        mnr_dirDir: ((groPer * dataIS.is_dirDir) * totalProduct),
                        c_id,
                        mnr_dirWor: ((groPer * dataIS.is_dirWor) * totalProduct),
                        mnr_state: 1
                    })
                }

                /** Dinero del vendedor */
                moneyV += ip_typeVen === 1 ? (ip_price * ip_total) * (1 - (ip_groPer / 100)) : 0
            } else {
                const dataAM = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(dataI.u_id) } })
                /** Registra el reporte del dinero */
                MoneyReportsModel.create({ u_id: deCode(dataI.u_id), mr_money: dataAM?.um_money, mr_confirm: ip_price * ip_total, mr_type: 9, mr_state: 1 })
                /** actualiza el dinero de quien lo invito */
                await UserMoneysModel.update({ um_money: dataAM?.um_money + (ip_price * ip_total) }, { where: { u_id: deCode(dataI.u_id) } })
            }
        }

        /** servicios de factura */
        for (let i = 0; i < invoiceservices.length; i++) {
            const { s_id, is_id, is_price, is_groPer, is_state, is_typeVen } = invoiceservices[i]

            /** actualiza la compra del producto */
            InvoiceServicesModel.update({ is_state }, { where: { is_id: deCode(is_id), v_id: deCode(v_id) } })

            if (is_state) {
                /** Dinero del winber */
                const groPer = is_groPer / 100
                const value = is_price * groPer
                pointU += is_typeVen === 1 ? ((dataIS.is_minNet + dataIS.is_maxNet + dataIS.is_leader) / 100) * is_price : 0
                amountU += is_typeVen === 1 ? (groPer - (dataIS.is_minNet + dataIS.is_maxNet + dataIS.is_leader + (groPer * dataIS.is_manager) + (groPer * dataIS.is_director) + (groPer * dataIS.is_dirDir) + (groPer * dataIS.is_dirWor) + dataIS.is_winby)) * is_price : is_price * (1 - dataIS.is_winby)
                let d_id
                let c_id

                /** dinero del administrador */
                amountAdmin += is_price
                totalAdmin += is_price
                utilityAdmin += is_typeVen === 1 ? value : 0
                gainAdmin += is_price * dataIS.is_winby
                if (is_typeVen === 1) {
                    moneyMin += is_price * dataIS.is_minNet
                    moneyMax += is_price * dataIS.is_maxNet
                    moneyLeader += is_price * dataIS.is_leader
                    moneyManager += (groPer * dataIS.is_manager) * is_price
                    moneyDirector += (groPer * dataIS.is_director) * is_price
                    moneyDirDir += (groPer * dataIS.is_dirDir) * is_price
                    moneyDirWor += (groPer * dataIS.is_dirWor) * is_price
                }

                // Verifica si existe mas de una dirección para los productos
                if (invoicevendors?.length > 1) {
                    // Busca todas las direcciones del producto
                    const dataS = await ServicesModel.findOne({
                        attributes: ['s_id'],
                        include: [{ attributes: ['sl_id'], model: ServiceLocalsModel, include: [{ attributes: ['c_id', 'd_id'], model: VendorsLocalsModel }] }],
                        where: { s_id: deCode(s_id) }
                    })

                    // Verifica si se encontro un resultado
                    if (dataS) {
                        // Busca el local en que se vendio
                        const resFind = invoicevendors.find(x => x.c_id === dataS.c_id && x.d_id === dataS.d_id)

                        d_id = resFind ? dataS.d_id : invoicevendors[0].d_id
                        c_id = resFind ? dataS.c_id : invoicevendors[0].c_id
                    } else {
                        d_id = invoicevendors[0].d_id
                        c_id = invoicevendors[0].c_id
                    }
                } else if (invoicevendors.length) {
                    d_id = invoicevendors[0].d_id
                    c_id = invoicevendors[0].c_id
                }

                // Registro de reporte
                if (is_typeVen === 1) {
                    MoneyNetworkReportsModel.create({
                        is_id: deCode(is_id),
                        mnr_min: (is_price * dataIS.is_minNet),
                        mnr_max: (is_price * dataIS.is_maxNet),
                        mnr_leader: (is_price * dataIS.is_leader),
                        mnr_manager: ((groPer * dataIS.is_manager) * is_price),
                        u_id: dataUSV?.userprofile?.u_id,
                        mnr_director: ((groPer * dataIS.is_director) * is_price),
                        d_id,
                        mnr_dirDir: ((groPer * dataIS.is_dirDir) * is_price),
                        c_id,
                        mnr_dirWor: ((groPer * dataIS.is_dirWor) * is_price),
                        mnr_state: 1
                    })
                }

                /** Dinero del vendedor */
                moneyV += is_typeVen === 1 ? is_price * (1 - (is_groPer / 100)) : 0
            } else {
                const dataAM = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(dataI.u_id) } })
                /** Registra el reporte del dinero */
                MoneyReportsModel.create({ u_id: deCode(dataI.u_id), mr_money: dataAM?.um_money, mr_confirm: is_price, mr_type: 9, mr_state: 1 })
                /** actualiza el dinero de quien lo invito */
                await UserMoneysModel.update({ um_money: dataAM?.um_money + is_price }, { where: { u_id: deCode(dataI.u_id) } })
            }
        }

        for (let i = 0; i < invoicevendors.length; i++) {
            const { iv_id, iv_state, iv_delivery } = invoicevendors[i]
            /** actualiza las ventas del usuario */
            InvoiceVendorsModel.update({ iv_state }, { where: { iv_id: deCode(iv_id), v_id: deCode(v_id) } })
            const valueDelivery = iv_delivery
            moneyV += valueDelivery
            amountAdmin += valueDelivery
            totalAdmin += valueDelivery
        }

        /** Sele paga al winber */
        const dataU = await UserProfilesModel.findOne({
            attributes: ['u_id'],
            include: [{ attributes: ['up_point'], model: UserPointsModel }, { attributes: ['um_money'], model: UserMoneysModel }],
            where: { up_code: i_vendor }
        })

        if (pointU > 0) {
            /** Registra el reporte de los puntos */
            PointReportsModel.create({ u_id: deCode(dataU.u_id), pr_point: pointU, pr_state: 1 })
            /** actualiza los puntos de la persona que paga */
            UserPointsModel.update({ up_point: (dataU.userpoint.up_point + pointU) }, { where: { u_id: deCode(dataU.u_id) } })
        }

        /** Registra el reporte del dinero */
        MoneyReportsModel.create({ u_id: deCode(dataU.u_id), mr_money: dataU.usermoney.um_money, mr_confirm: amountU, mr_type: 3, i_id: deCode(dataI?.i_id), mr_state: 1 })
        /** actualiza el dinero de quien lo invito */
        UserMoneysModel.update({ um_money: (dataU.usermoney.um_money + amountU) }, { where: { u_id: deCode(dataU.u_id) } })

        /** Se le paga el dinero al aliado comercial  */
        if (moneyV > 0) {
            /** Registra el reporte del dinero */
            MoneyReportsModel.create({ u_id: deCode(dataV.u_id), mr_money: dataV.usermoney.um_money, mr_confirm: moneyV, mr_type: 3, i_id: deCode(dataI?.i_id), mr_state: 1 })
            /** actualiza el dinero de quien lo invito */
            UserMoneysModel.update({ um_money: (dataV.usermoney.um_money + moneyV) }, { where: { u_id: deCode(dataV.u_id) } })
        }

        /** registra el ingreso de dinero para el administrador */
        AdminMoneysModel.update({ am_amount: amountAdmin }, { where: { am_id: deCode(dataAM.am_id) } })
        AdminMoneyReportsModel.create({ u_id: deCode(data.u_id), amr_amount: dataAM.am_amount, amr_type: 1, amr_total: totalAdmin, amr_utility: utilityAdmin, amr_gain: gainAdmin, amr_state: 1 })

        /** registra el dinero de la red */
        if (moneyMin > 0 || moneyMax > 0 || moneyLeader > 0 || moneyManager > 0 || moneyDirector > 0 || moneyDirDir > 0 || moneyDirWor > 0) {
            const dataMN = await MoneyNetworksModel.findOne({ attributes: ['mn_id', 'mn_min', 'mn_max', 'mn_leader', 'mn_manager', 'mn_director', 'mn_dirDir', 'mn_dirWor'] })
            MoneyNetworksModel.update({ mn_min: moneyMin + dataMN.mn_min, mn_max: moneyMax + dataMN.mn_max, mn_leader: moneyLeader + dataMN.mn_leader, mn_manager: moneyManager + dataMN.mn_manager, mn_director: moneyDirector + dataMN.mn_director, mn_dirDir: moneyDirDir + dataMN.mn_dirDir, mn_dirWor: moneyDirWor + dataMN.mn_dirWor }, { where: { mn_id: deCode(dataMN.mn_id) } })
        }

        const dataIFinish = await InvoicesModel.findOne({
            attributes: ['i_id'],
            include: [{ attributes: ['iv_state'], model: InvoiceVendorsModel }],
            where: { i_id: deCode(i_id) }
        })

        const findActive = dataIFinish.invoicevendors.find(x => x.iv_state === 5)
        if (!findActive) {
            const resFind = dataIFinish.invoicevendors.find(x => x.iv_state === 1)
            if (resFind) InvoicesModel.update({ i_state: 1 }, { where: { i_id: deCode(i_id) } })
            else InvoicesModel.update({ i_state: 0 }, { where: { i_id: deCode(i_id) } })
        }

        /** respuesta */
        return res.json({ success: 1, message: `La factura ha sido ${i_state ? 'aceptada' : 'cancelada'} con exito.` })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funcion recursiva para retonar la red del usuario */
const findRed = (data, arrayData, arrayPoints) => {
    const item = data

    if (data?.userreds?.length > 0) {
        for (let i = 0; i < data?.userreds?.length; i++) {
            const { u_id } = data?.userreds[i]
            /** busca los puntos del usuario de red */
            const findPoint = arrayPoints.find(x => enCode(x.u_id) === u_id) || { totalPoint: 0 }
            /** busca la información del usuario de red */
            const findData = arrayData.find(x => x.u_id === u_id)
            /** recorre los usuarios debajo */
            if (findData) {
                const a = findRed({ u_id, up_code: findData.up_code, userreds: findData.userreds, totalPoint: parseInt(findPoint.dataValues?.totalPoint || findPoint.totalPoint) }, arrayData, arrayPoints)
                item.totalPoint += a.totalPoint
            }
        }
    }
    return { required: true, u_id: data.u_id, up_code: data.up_code, point: 0, totalPoint: item.totalPoint, min: 0, max: 0, leader: 0, manager: 0, director: 0, dirDir: 0, dirWor: 0 }
}

controllers.registerLiquidations = async (req, res) => {
    try {
        /** variables necesarias */
        const { mnd_datIni, mnd_datEnd } = req.body

        /** busca si existe el rango de fecha */
        const dataMND = await MoneyNetworkDatesModel.findOne({ attributes: ['mnd_id'], where: { [Op.or]: [{ mnd_datIni: { [Op.and]: [{ [Op.gte]: `${mnd_datIni} 00:00:00` }, { [Op.lte]: `${mnd_datEnd} 23:59:59` }] } }, { mnd_datEnd: { [Op.and]: [{ [Op.gte]: `${mnd_datIni} 00:00:00` }, { [Op.lte]: `${mnd_datEnd} 23:59:59` }] } }], mnd_state: 1 } })

        if (dataMND) return res.json({ success: 0, message: 'El rango de fecha no es permitido por que ya existe registrado.' })

        /** busca el total de la factura del minimo maximo y liderazgo */
        const dataMNR = await MoneyNetworkReportsModel.findOne({
            attributes: [[fn('sum', col('mnr_min')), 'totalMin'], [fn('sum', col('mnr_max')), 'totalMax'], [fn('sum', col('mnr_leader')), 'totalLeader']],
            where: { [Op.and]: [{ mnr_datCre: { [Op.gte]: `${mnd_datIni} 00:00:00` } }, { mnr_datCre: { [Op.lte]: `${mnd_datEnd} 23:59:59` } }] }
        })
        if (!dataMNR) return res.json({ success: 0, message: 'No existen reportes en el rango de fecha' })

        // Busca todo los puntos totales de cada usuario
        const dataPR = await PointReportsModel.findAll({ attributes: ['u_id', [fn('sum', col('pr_point')), 'totalPoint']], where: { pr_retire: { [Op.is]: null }, [Op.and]: [{ pr_datCre: { [Op.gte]: `${mnd_datIni} 00:00:00` } }, { pr_datCre: { [Op.lte]: `${mnd_datEnd} 23:59:59` } }] }, group: ['u_id'] })

        /** busca todas las facturas de los gerentes */
        const dataMNRAll = await MoneyNetworkReportsModel.findAll({ attributes: ['mnr_manager', 'u_id', 'mnr_director', 'd_id', 'mnr_dirDir', 'c_id', 'mnr_dirWor'], where: { [Op.and]: [{ mnr_datCre: { [Op.gte]: `${mnd_datIni} 00:00:00` } }, { mnr_datCre: { [Op.lte]: `${mnd_datEnd} 23:59:59` } }] } })

        // Busca todos los usuarios de los gerentes
        const dataUM = await UserManagersModel.findAll({ attributes: ['uId', 'tmId', 'dId', 'cId'], where: { umState: 1 } })

        // Busca todos los ingresos por ventas de productos, servicios y licencias de todos los usuarios.
        const dataUSells = await MoneyReportsModel.findAll({ attributes: ['mr_id', 'u_id', 'i_id', 'mr_franchise', 'mr_isDirSellFran', 'mr_confirm'], where: { mr_type: 3, mr_confirm: { [Op.gt]: 0 }, [Op.and]: [{ mr_datCre: { [Op.gte]: `${ mnd_datIni } 00:00:00` } }, { mr_datCre: { [Op.lte]: `${ mnd_datEnd } 23:59:59` } }], mr_state: 1 } })

        /** busco todo los usuarios */
        const dataU = await UserProfilesModel.findAll({
            attributes: ['u_id', 'up_code'],
            include: [
                { attributes: ['um_datExp'], model: UserMembersModel },
                { attributes: ['um_id', 'um_money'], model: UserMoneysModel },
                { attributes: ['up_id', 'up_point'], model: UserPointsModel },
                { attributes: ['u_id'], model: UserRedsModel, required: false },
                { attributes: ['u_id'], model: UserSponsorsModel, required: false }
            ],
            where: { up_confirm: 2 }
        })

        /** busca la información de las restricciones */
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_netPoi', 'is_netDir', 'is_netReqMin', 'is_netReqMax', 'is_netReqLea', 'is_netReqMem'] })

        /** información del dinero de la red */
        const dataMN = await MoneyNetworksModel.findOne({ attributes: ['mn_id', 'mn_min', 'mn_max', 'mn_leader', 'mn_manager', 'mn_director', 'mn_dirDir', 'mn_dirWor'] })

        // Busca los G25
        const dataG25 = await UserNetworkLiquidationsModel.findAll({ attributes: ['u_id', 'unl_type'], where: { unl_state: 1 } })
        const g25BonusUsers = dataG25.filter(y => y.unl_type === 1) || [] // Busca los usuario a a los que se les dará el bono g25
        const g25DicountUsers = dataG25.filter(y => y.unl_type === 2) || [] // Busca los usuarios que se les quitará el dinero para el bono g25
        let g25Money = 0 // Variable para almacenar el dinero total a repartir en el bono g25

        const newDataU = []
        let totalGPoint = 0
        let vPGMin = 0
        let vPGMax = 0
        let vPGLeader = 0
        let vPGManager = 0
        let vPGDirector = 0
        let vPGDirDir = 0
        let vPGDirWor = 0

        /** registro de reportes */
        const createMND = await MoneyNetworkDatesModel.create({ mnd_datIni, mnd_datEnd, mnd_point: 0, mnd_money: 0, mnd_user: 0, mnd_min: 0, mnd_max: 0, mnd_leader: 0, mnd_manager: 0, mnd_director: 0, mnd_dirDir: 0, mnd_dirWor: 0, mnd_state: 2 })

        /** calcula los puntos totales de un usuario y los puntos globales */
        for (let i = 0; i < dataU.length; i++) {
            const x = dataU[i]

            /** busca los puntos del usuario */
            const findPoint = dataPR.find(y => enCode(y.u_id) === x.u_id) || { totalPoint: 0 }
            const userPoints = findPoint?.dataValues?.totalPoint >= 0 ? findPoint?.dataValues?.totalPoint : findPoint.totalPoint
            let res = {}

            /** calcula los puntos totales del usuario */
            if (dataIS.is_netReqMem === 1) {
                if (x?.usermember?.um_datExp >= new Date()) res = findRed({ u_id: x.u_id, up_code: x.up_code, userreds: x.userreds, totalPoint: parseInt(userPoints) }, dataU, dataPR)
                else res = { required: false, u_id: x.u_id, up_code: x.up_code, point: 0, totalPoint: 0, min: 0, max: 0, leader: 0, manager: 0, director: 0, dirDir: 0, dirWor: 0 }
            } else res = findRed({ u_id: x.u_id, up_code: x.up_code, userreds: x.userreds, totalPoint: parseInt(userPoints) }, dataU, dataPR)

            /** almacena en una variable los resultado de los usuario y el total de los puntos globales */
            if (res.totalPoint > 0) totalGPoint += res.totalPoint
            else res.totalPoint = 0
            newDataU.push(res)
        }
        // return res.json({ success: 0, message: 'todo bien.' })
        /** variables que almacena el total de los valores de puntos */
        const vPMin = parseFloat(dataMNR?.dataValues?.totalMin) / totalGPoint
        const vPMax = parseFloat(dataMNR?.dataValues?.totalMax) / totalGPoint
        const vPLeader = parseFloat(dataMNR?.dataValues?.totalLeader) / totalGPoint
        /** variables de array para actualizar y crear */
        let createMNU = []
        let createMR = []
        let createPR = []
        let updateUP = []
        let updateUM = []

        /** calcula la ganancia de cada uno segun el bonus */
        for (let i = 0; i < newDataU.length; i++) {
            const x = newDataU[i]
            if (x.required) {
                const findUser = dataU.find(y => y.u_id === x.u_id)

                /** busca los puntos del usuario de red */
                const findPoint = dataPR.find(y => enCode(y.u_id) === x.u_id) || { totalPoint: 0 }
                const userPoints = findPoint?.dataValues?.totalPoint >= 0 ? findPoint?.dataValues?.totalPoint : findPoint.totalPoint

                /** variable de requisito si cumplio o no */
                let required = true

                /** verifico si uno de los requisitos es necesario */
                if (dataIS.is_netReqMin === 1 || dataIS.is_netReqMax === 1 || dataIS.is_netReqLea === 1) {
                    /** verifica si tiene el total dep untos */
                    if (dataIS.is_netPoi > parseInt(userPoints)) required = false
                    /** verifica si el usuario tiene dos o mas directos */
                    if (findUser?.usersponsors?.length > dataIS.is_netDir && required) {
                        let directMember = 0
                        for (let i = 0; i < findUser?.usersponsors?.length; i++) {
                            const { u_id } = findUser.usersponsors[i]
                            const findData = dataU.find(x => x.u_id === u_id)
                            if (findData?.usermember?.um_datExp >= new Date()) directMember++
                        }
                        if (directMember < dataIS.is_netDir) required = false
                    } else required = false
                }

                const findUM = dataUM.find(y => y.uId === x.u_id)

                if (findUM) {
                    // busca si el usuario tiene ventas por aliados
                    const usersMNR = dataMNRAll.filter(y => y.u_id === findUM.uId) || []
                    for (let ii = 0; ii < usersMNR.length; ii++) {
                        const { mnr_manager } = usersMNR[ii]
                        newDataU[i].manager += mnr_manager
                        vPGManager += mnr_manager
                    }

                    // verifica si el usuario tiene permiso a ser gerente de departamentos
                    if (findUM.dId) {
                        const deparmentsMNR = dataMNRAll.filter(y => y.d_id === findUM.dId) || []
                        for (let ii = 0; ii < deparmentsMNR.length; ii++) {
                            const { mnr_director } = deparmentsMNR[ii]
                            newDataU[i].director += mnr_director
                            vPGDirector += mnr_director
                        }
                        // verifica si el usuario tiene permiso a ser gerente de pais
                    } else if (findUM.cId) {
                        const countrieMNR = dataMNRAll.filter(y => y.c_id === findUM.cId) || []
                        for (let ii = 0; ii < countrieMNR.length; ii++) {
                            const { mnr_dirDir } = countrieMNR[ii]
                            newDataU[i].dirDir += mnr_dirDir
                            vPGDirDir += mnr_dirDir
                        }
                        // verifica si el usuario tiene permiso a ser gerente global
                    } else if (!findUM.dId && !findUM.cId) {
                        for (let ii = 0; ii < dataMNRAll.length; ii++) {
                            const { mnr_dirWor } = dataMNRAll[ii]
                            newDataU[i].dirWor += mnr_dirWor
                            vPGDirWor += mnr_dirWor
                        }
                    }
                }

                /** almaceno en variables el calculo del dinero */
                newDataU[i].point = parseInt(userPoints)
                const vMin = Math.round(newDataU[i].totalPoint * vPMin)
                const vMax = Math.round(newDataU[i].totalPoint * vPMax)
                const vLeader = Math.round(newDataU[i].totalPoint * vPLeader)

                /** verifico si el dinero se entregara o no */
                newDataU[i].min = dataIS.is_netReqMin === 1 ? (required ? vMin : 0) : vMin
                newDataU[i].minR = dataIS.is_netReqMin === 1 ? (required ? 0 : vMin) : 0
                newDataU[i].max = dataIS.is_netReqMax === 1 ? (required ? vMax : 0) : vMax
                newDataU[i].maxR = dataIS.is_netReqMax === 1 ? (required ? 0 : vMax) : 0
                newDataU[i].leader = dataIS.is_netReqLea === 1 ? (required ? vLeader : 0) : vLeader
                newDataU[i].leaderR = dataIS.is_netReqLea === 1 ? (required ? 0 : vLeader) : 0

                /** guardo en una variable los totales de dinero a entregar */
                vPGMin += vMin
                vPGMax += vMax
                vPGLeader += vLeader

                // Calcular el total de ventas directas de productos, servicios y licencias.
                let mnu_dirSell = 0, mnu_dirSellFran = 0, mnu_dirSellFranTo = 0
                if (dataUSells.length) {
                    dataUSells.filter(y => y.u_id === deCode(x.u_id)).forEach(y => {
                        if (!y.mr_franchise) mnu_dirSell += y.mr_confirm
                        else if (y.mr_franchise && y.mr_isDirSellFran) mnu_dirSellFran += y.mr_confirm
                        else if (y.mr_franchise && !y.mr_isDirSellFran) mnu_dirSellFranTo += y.mr_confirm
                    })
                    mnu_dirSellFranTo += mnu_dirSellFran
                }

                /** registro en los array lo que se creara y actualizara */
                updateUP.push({ up_id: deCode(findUser?.userpoint?.up_id), u_id: deCode(x.u_id), up_point: findUser?.userpoint?.up_point - newDataU[i].point, up_state: 1 })
                updateUM.push({ um_id: deCode(findUser?.usermoney?.um_id), u_id: deCode(x.u_id), um_money: findUser?.usermoney?.um_money + newDataU[i].min + newDataU[i].max + newDataU[i].leader + newDataU[i].manager + newDataU[i].director + newDataU[i].dirDir + newDataU[i].dirWor, um_state: 1 })
                createMNU.push({ mnd_id: deCode(createMND.mnd_id), u_id: deCode(x.u_id), mnu_dirSell, mnu_dirSellFran, mnu_dirSellFranTo, mnu_point: newDataU[i].point, mnu_totPoi: x.totalPoint, mnu_min: newDataU[i].min, mnu_max: newDataU[i].max, mnu_leader: newDataU[i].leader, mnu_minR: newDataU[i].minR, mnu_maxR: newDataU[i].maxR, mnu_leaderR: newDataU[i].leaderR, mnu_manager: newDataU[i].manager, mnu_director: newDataU[i].director, mnu_dirDir: newDataU[i].dirDir, mnu_dirWor: newDataU[i].dirWor, mnu_retire: 0, mnu_state: 1 })
                createMR.push({ u_id: deCode(x.u_id), mr_money: findUser?.usermoney?.um_money, mr_type: 5, mr_confirm: newDataU[i].min + newDataU[i].max + newDataU[i].leader + newDataU[i].manager + newDataU[i].director + newDataU[i].dirDir + newDataU[i].dirWor, mr_state: 1 })
                createPR.push({ u_id: deCode(x.u_id), pr_retire: newDataU[i].point, pr_state: 1 })
            }
        }

        // recorrer a los usuarios de g25 para quitarle el dinero
        g25DicountUsers.map(x => {
            createMNU = createMNU.filter(y => y.u_id !== deCode(x.u_id))
            createMR = createMR.filter(y => y.u_id !== deCode(x.u_id))
            createPR = createPR.filter(y => y.u_id !== deCode(x.u_id))
            updateUP = updateUP.map(y => y.u_id === deCode(x.u_id) ? { ...y, up_point: 0 } : y)
            updateUM = updateUM.map(y => {
                if (y.u_id === deCode(x.u_id)) {
                    g25Money += y.um_money
                    return { ...y, um_money: 0 }
                }
                return y
            })
        })

        // recorrer a los usuarios de g25 para quitarle el dinero
        g25BonusUsers.map(x => {
            const g25UserMoney = g25Money > 0 ? g25Money / g25BonusUsers.length : 0
            createMNU = createMNU.map(y => y.u_id === deCode(x.u_id) ? { ...y, mnu_g25: g25UserMoney } : y)
            createMR = createMR.map(y => y.u_id === deCode(x.u_id) ? { ...y, mr_money: y.mr_money + g25UserMoney } : y)
            updateUM = updateUM.map(y => {
                if (y.u_id === deCode(x.u_id)) return { ...y, um_money: y.um_money + g25UserMoney }
                return y
            })
        })

        // registro y actualización de dinero y puntos, y actualización de dinero disponible en red
        await MoneyNetworkDatesModel.update({ mnd_point: totalGPoint, mnd_money: vPGMin + vPGMax + vPGLeader + vPGManager + vPGDirector + vPGDirDir + vPGDirWor, mnd_user: dataU.length, mnd_min: vPGMin, mnd_max: vPGMax, mnd_leader: vPGLeader, mnd_manager: vPGManager, mnd_director: vPGDirector, mnd_dirDir: vPGDirDir, mnd_dirWor: vPGDirWor, mnd_state: 1 }, { where: { mnd_id: deCode(createMND.mnd_id) } })
        UserPointsModel.bulkCreate(updateUP, { updateOnDuplicate: ['up_id', 'up_point'] })
        UserMoneysModel.bulkCreate(updateUM, { updateOnDuplicate: ['um_id', 'um_money'] })
        MoneyNetworkUsersModel.bulkCreate(createMNU)
        MoneyReportsModel.bulkCreate(createMR)
        PointReportsModel.bulkCreate(createPR)
        MoneyNetworksModel.update({ mn_min: dataMN.mn_min - vPGMin, mn_max: dataMN.mn_max - vPGMax, mn_leader: dataMN.mn_leader - vPGLeader, mn_manager: dataMN.mn_manager - vPGManager, mn_director: dataMN.mn_director - vPGDirector, mn_dirDir: dataMN.mn_dirDir - vPGDirDir, mn_dirWor: dataMN.mn_dirWor - vPGDirWor }, { where: { mn_id: deCode(dataMN.mn_id) } })

        return res.json({ success: 1, data: { mnd_id: createMND.mnd_id, mnd_point: totalGPoint, mnd_user: dataU.length, mnd_min: vPGMin, mnd_max: vPGMax, mnd_leader: vPGLeader, mnd_manager: vPGManager, mnd_director: vPGDirector, mnd_dirDir: vPGDirDir, mnd_dirWor: vPGDirWor }, message: 'Se ha completado la liquidación exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.getAllLiquidations = async (req, res) => {
    try {
        /** variables necesarias */
        const { mnd_state } = req.body

        // busca todo el reporte del dinero
        const data = await MoneyNetworkDatesModel.findAll({ attributes: ['mnd_id', 'mnd_datIni', 'mnd_datEnd', 'mnd_point', 'mnd_money', 'mnd_user', 'mnd_min', 'mnd_max', 'mnd_leader', 'mnd_manager', 'mnd_director', 'mnd_dirDir', 'mnd_dirWor'], where: { mnd_state: mnd_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.getOneLiquidations = async (req, res) => {
    try {
        /** variables necesarias */
        const { mnd_id, mnd_state } = req.body

        // busca todo el reporte del dinero
        const data = await MoneyNetworkDatesModel.findOne({ attributes: ['mnd_id', 'mnd_datIni', 'mnd_datEnd', 'mnd_point', 'mnd_money', 'mnd_user', 'mnd_min', 'mnd_max', 'mnd_leader', 'mnd_manager', 'mnd_director', 'mnd_dirDir', 'mnd_dirWor'], where: { mnd_id: deCode(mnd_id), mnd_state: mnd_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.liquidationUsers = async (req, res) => {
    try {
        /** variables necesarias */
        const { mnd_id } = req.body

        // relacion de base de datos
        linkHasMany(MoneyNetworkDatesModel, MoneyNetworkUsersModel, 'mnd_id', 'mnd_id')
        linkBelongsTo(MoneyNetworkUsersModel, UserProfilesModel, 'u_id', 'u_id')

        // busca todo el reporte del dinero
        const data = await MoneyNetworkDatesModel.findOne({
            attributes: ['mnd_id', 'mnd_datIni', 'mnd_datEnd', 'mnd_point', 'mnd_money', 'mnd_user', 'mnd_min', 'mnd_max', 'mnd_leader', 'mnd_manager', 'mnd_director', 'mnd_dirDir', 'mnd_dirWor'],
            include: [{
                attributes: ['mnu_id', 'mnu_point', 'mnu_totPoi', 'mnu_min', 'mnu_max', 'mnu_leader', 'mnu_minR', 'mnu_maxR', 'mnu_leaderR', 'mnu_manager', 'mnu_director', 'mnu_dirDir', 'mnu_dirWor'],
                model: MoneyNetworkUsersModel,
                include: [{ attributes: ['up_name', 'up_last', 'up_code'], model: UserProfilesModel }],
                where: { mnu_state: 1 }
            }],
            where: { mnd_id: deCode(mnd_id) }
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/***
 * ##########################################
 * #  Nuevas peticiones para las facturas   #
 * ##########################################
 */

/**
 * Obtiene todas las ordenes de un aliado segun un estado
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Wow Desarrollos
 */
controllers.getVendorOrders = async (req, res) => {
    try {
        const { v_id, iv_state, min, max } = req.body

        // Verificar el vendeodr
        const dataVendor = await VendorsModel.findOne({ attributes: ['v_id'], where: { v_id: deCode(v_id) } })
        if (!dataVendor) return res.json({ success: 0, message: 'Vendedor no valido.' })

        const dataInvoicesVendor = await InvoiceVendorsModel.findAll({
            attributes: ['iv_id', 'i_id', 'iv_state', 'iv_datCre'],
            include: [
                {
                    attributes: ['i_id', 'i_consecutive'],
                    include: [{ attributes: ['ic_id', 'ic_ideNum', 'ic_name', 'ic_last', 'ic_email'], model: InvoiceClientsModel }],
                    model: InvoicesModel
                }
            ],
            where: { v_id: deCode(v_id), iv_state },
            limit: [min || 0, max || 20],
            order: [['iv_id', 'DESC']]
        })
        if (dataInvoicesVendor.length) return res.json({ success: 1, message: 'Listando resultados', data: dataInvoicesVendor })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Obtiene todas las ordenes de un aliado segun un estado
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Wow Desarrollos
 */
controllers.getAllVendorOrders = async (req, res) => {
    try {
        const { v_id, i_consecutive, ic_ideNum, iv_state, dateStart, dateEnd, vendorIde, min, max } = req.body

        // Verificar el vendeodr
        let dataVendor
        if (v_id) {
            dataVendor = await VendorsModel.findOne({ attributes: ['v_id'], where: { v_id: deCode(v_id) } })
            if (!dataVendor) return res.json({ success: 0, message: 'Vendedor no valido.' })
        }

        const dataInvoicesVendor = await InvoiceVendorsModel.findAll({
            attributes: ['iv_id', 'i_id', 'iv_state', 'iv_datCre'],
            include: [
                {
                    attributes: ['i_id', 'i_consecutive'],
                    include: [{ attributes: ['ic_id', 'ic_ideNum', 'ic_name', 'ic_last', 'ic_email'], model: InvoiceClientsModel, where: { ic_ideNum: ic_ideNum || { [Op.ne]: null } }, required: !!ic_ideNum }],
                    model: InvoicesModel,
                    where: { i_consecutive: i_consecutive || { [Op.ne]: null } },
                    required: !!i_consecutive || !!ic_ideNum
                },
                {
                    attributes: ['v_id', 'v_ideNum', 'v_nit'],
                    model: VendorsModel,
                    where: { ...(vendorIde ? { [Op.or]: [{ v_ideNum: vendorIde }, { v_nit: vendorIde }] } : { v_id: { [Op.gt]: 0 } }) },
                    required: !!vendorIde
                }
            ],
            where: {
                v_id: v_id ? deCode(v_id) : { [Op.gt]: 0 },
                iv_state: iv_state || { [Op.and]: [{ [Op.gt]: 0 }, { [Op.lt]: 6 }] },
                iv_datCre: (dateStart && dateEnd) ? { [Op.between]: [dateStart, dateEnd] } : ((dateStart && !dateEnd) ? { [Op.gte]: dateStart } : { [Op.ne]: null })
            },
            limit: [min || 0, max || 20]
        })
        if (dataInvoicesVendor.length) return res.json({ success: 1, message: 'Listando resultados', data: dataInvoicesVendor })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Obtiene todas las ordenes de un aliado segun un estado
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Hugo Gutierrez
 */
controllers.getVendorOrderDetail = async (req, res) => {
    try {
        const { v_id, iv_id } = req.body

        // Verificar el vendeodr
        let dataVendor
        if (v_id) {
            dataVendor = await VendorsModel.findOne({ attributes: ['v_id'], where: { v_id: deCode(v_id) } })
            if (!dataVendor) return res.json({ success: 0, message: 'Vendedor no valido.' })
        }
        const dataInvoice = await InvoiceVendorsModel.findOne({
            attributes: ['iv_id', 'i_id', 'iv_delivery', 'iv_state', 'iv_datCre'],
            include: [
                {
                    attributes: ['i_id', 'i_consecutive'],
                    include: [{
                        attributes: ['ic_id', 'ic_ideNum', 'ic_name', 'ic_last', 'ic_phone', 'ic_email', 'ic_location'],
                        include: [
                            { attributes: ['c_id', 'c_name'], model: CountriesModel },
                            { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                            { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }
                        ],
                        model: InvoiceClientsModel
                    }],
                    model: InvoicesModel
                },
                { attributes: ['ivs_id', 'ivs_type', 'ivs_date'], model: InvoiceVendorStatusModel },
                { attributes: ['ip_name', 'ip_sku', 'ip_price', 'ip_total', 'ip_attr'], model: InvoiceProductsModel, required: false },
                { attributes: ['is_name', 'is_sku', 'is_price', 'is_total', 'is_attr'], model: InvoiceServicesModel },
                {
                    attributes: ['vl_name', 'vl_address', 'vl_phoMob', 'vl_landline'],
                    include: [
                        { attributes: ['c_id', 'c_name'], model: CountriesModel },
                        { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                        { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }
                    ],
                    model: VendorsLocalsModel
                }
            ],
            where: { ...(v_id ? { v_id: deCode(v_id) } : {}), iv_id: deCode(iv_id) }
        })
        if (!dataInvoice) return res.json({ success: 0, message: 'La factura no existe.' })

        let subTotal = 0
        // products
        for (let i = 0; i < dataInvoice.invoiceproducts.length; i++) {
            const { ip_price, ip_total } = dataInvoice.invoiceproducts[i]
            subTotal += (ip_price * ip_total)
        }
        // services
        for (let i = 0; i < dataInvoice.invoiceservices.length; i++) {
            const { is_price, is_total } = dataInvoice.invoiceservices[i]
            subTotal += (is_price * is_total)
        }

        return res.json({ success: 1, message: 'Listando resultados', data: { dataInvoice, subTotal } })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Cambia el estado de una orden para el aliado comercial
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Hugo Gutierrez
 */
controllers.vendorChangeStatusOrder = async (req, res) => {
    try {
        const { i_id, v_id, iv_id, iv_state } = req.body

        // Consultar información de la factura general
        const dataInvoice = await InvoicesModel.findOne({ attributes: ['i_id', 'i_state', 'u_id'], include: [{ attributes: ['iv_id', 'iv_state'], model: InvoiceVendorsModel }], where: { i_id: deCode(i_id) } })
        if (!dataInvoice) return res.json({ success: 0, message: 'La factura no existe' })

        // Consultar factura del aliado (provedor)
        const dataInvoiceVendor = await InvoiceVendorsModel.findOne({ attributes: ['iv_state', 'i_id', 'iv_delivery'], where: { iv_id: deCode(iv_id), v_id: deCode(v_id) } })
        if (!dataInvoiceVendor) return res.json({ success: 0, message: 'La factura no existe.' })

        // Si las facturas no coinciden
        if (dataInvoice.i_id !== dataInvoiceVendor.i_id) return res.json({ success: 0, message: 'La orden no es valida.', i: dataInvoice.i_id, a: dataInvoiceVendor.i_id })

        if (iv_state !== 1 && iv_state !== 5 && iv_state !== 7) { // Si es diferente de completar, pagar o cancelar la orden
            // Validar que el stado actual y el siguiente sean correctos
            if ((iv_state === 4 && dataInvoiceVendor.iv_state === 5) || (iv_state === 3 && dataInvoiceVendor.iv_state === 4) || (iv_state === 2 && dataInvoiceVendor.iv_state === 3)) {
                await InvoiceVendorsModel.update({ iv_state }, { where: { iv_id: deCode(iv_id) } }) // Se actuliza al nuevo estado
            } else return res.json({ success: 0, message: 'Acción no permitida.' })
        } else if (iv_state === 7) { // Si se cancela la orden
            if (dataInvoiceVendor.iv_state !== 5) return res.json({ success: 0, message: 'Acción no permitida.' }) // Solo se cancela si el estado es pagado.

            const dataVendor = await VendorsModel.findOne({ attributes: ['u_id'], where: { v_id: deCode(v_id) } }) // buscar el u_id del aliado
            const dataMoneyVendor = await UserMoneysModel.findOne({ attributes: ['um_id', 'um_money'], where: { u_id: deCode(dataVendor.u_id) } }) // Buscar el dinero del vendedor
            const dataMoneyUser = await UserMoneysModel.findOne({ attributes: ['um_id', 'um_money'], where: { u_id: deCode(dataInvoice.u_id) } }) // Busca el dienero del cliente
            const dataMoenyAdmin = await UserMoneysModel.findOne({ attributes: ['um_id', 'um_money'], where: { u_id: 1 } }) // Busca el dinero de winby admin
            const dataInfoSeles = await InfoSelesModel.findOne({ attributes: ['is_winby'], where: { is_state: 1 } }) // Busca el porcentaje de comisión de Winby
            const totalProducts = await InvoiceProductsModel.findOne({ attributes: [[literal('SUM(ip_price * ip_total)'), 'total']], where: { i_id: deCode(i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } }) // Calcular el total en productos
            const totalServices = await InvoiceServicesModel.findOne({ attributes: [[literal('SUM(is_price * is_total)'), 'total']], where: { i_id: deCode(i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } }) // Calcular el total en servicios
            const totalOrder = (parseFloat(totalProducts.dataValues.total) || 0) + (parseFloat(totalServices.dataValues.total) || 0) + (parseFloat(dataInvoiceVendor.iv_delivery) || 0) // Calcular el total de la factura del aliado
            const penaltyCost = totalOrder * dataInfoSeles.is_winby // Calcular el costo penalización por rechazo de orden

            UserMoneysModel.update({ um_money: (dataMoneyUser.um_money + totalOrder) }, { where: { um_id: deCode(dataMoneyUser.um_id) } }) // Regresar dienero al cliente
            MoneyReportsModel.create({ u_id: deCode(dataInvoice.u_id), mr_money: dataMoneyUser.um_money, mr_type: 12, mr_confirm: totalOrder, mr_state: 1, i_id: deCode(i_id) }) // Generar reporte en la billetera del cliente
            InvoiceVendorsModel.update({ iv_state: 7 }, { where: { iv_id: deCode(iv_id) } }) // Se cancela la factura del aliado

            if (dataMoneyVendor.um_money >= penaltyCost) { // Verificar que el aliado tenga dinero
                UserMoneysModel.update({ um_money: (dataMoneyVendor.um_money - penaltyCost) }, { where: { um_id: deCode(dataMoneyVendor.um_id) } }) // Descontar el monto al aliado
                MoneyReportsModel.create({ u_id: deCode(dataVendor.u_id), mr_money: dataMoneyVendor.um_money, mr_type: 10, i_id: deCode(i_id), mr_retire: penaltyCost, mr_state: 1 }) // Generar reporte en la billetera del aliado
                UserMoneysModel.update({ um_money: (dataMoenyAdmin.um_money + penaltyCost) }, { where: { um_id: deCode(dataMoenyAdmin.um_id) } }) // Agregar dinero a winby admin
                MoneyReportsModel.create({ u_id: 1, mr_money: dataMoenyAdmin.um_money, mr_type: 11, mr_confirm: penaltyCost, mr_state: 1 }) // Generar reporte en la billetera de winby admin
            } else DebtsReceivableModel.create({ v_id, dr_amount: penaltyCost, dr_type: 1, dr_state: 2 }) // Se genera el reporte de deuda del aliado
        } else return res.json({ success: 0, message: 'Acción no permitida.' })

        const filterInvoices = dataInvoice.invoicevendors.filter(x => x.iv_id === iv_id || x.iv_state === iv_state) // Verificar si todas las facturas de los aliados ya tienen el mismo estado para actualizar la factura general
        if (filterInvoices.length === dataInvoice.invoicevendors.length) await InvoicesModel.update({ i_state: iv_state }, { where: { i_id: deCode(i_id) } })

        await InvoiceVendorStatusModel.create({ iv_id, ivs_type: iv_state }) // Se crea el reporte de fecha con el nuevo estado
        InvoiceProductsModel.update({ ip_state: iv_state }, { where: { i_id: deCode(i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } }) // Se actualiza el estado de los productos
        InvoiceServicesModel.update({ is_state: iv_state }, { where: { i_id: deCode(i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } }) // Se actualiza el estado de los sercicios

        return res.json({ success: 1, message: 'Se ha cambiado el estado de la orden.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Cuenta el total de ordenes por estado de un aliado
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Hugo Gutierrez
 */
controllers.countVendorOrders = async (req, res) => {
    try {
        const { v_id } = req.body
        const dataInvoicesVendor = await InvoiceVendorsModel.findAll({ attributes: ['iv_state', [fn('count', col('iv_id')), 'total']], where: { v_id: deCode(v_id) }, group: ['iv_state'] })
        return res.json({ data: dataInvoicesVendor })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Calcula el costo de penalización por rechazo de una orden
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Hugo Gutierrez
 */
controllers.getPenaltyCostVendor = async (req, res) => {
    try {
        const { i_id, v_id, iv_id } = req.body
        // Consultar factura del aliado (provedor)
        const dataInvoiceVendor = await InvoiceVendorsModel.findOne({ attributes: ['iv_state', 'i_id', 'iv_delivery'], where: { iv_id: deCode(iv_id), v_id: deCode(v_id) } })
        if (!dataInvoiceVendor) return res.json({ success: 0, message: 'La factura no existe.' })
        // Calcular el total de la factura del aliado
        const totalProducts = await InvoiceProductsModel.findOne({ attributes: [[literal('SUM(ip_price * ip_total)'), 'total']], where: { i_id: deCode(i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } })
        const totalServices = await InvoiceServicesModel.findOne({ attributes: [[literal('SUM(is_price * is_total)'), 'total']], where: { i_id: deCode(i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } })
        const totalOrder = (parseFloat(totalProducts.dataValues.total) || 0) + (parseFloat(totalServices.dataValues.total) || 0) + (parseFloat(dataInvoiceVendor.iv_delivery) || 0)
        // Busca el porcentaje de comisión de Winby
        const dataInfoSeles = await InfoSelesModel.findOne({ attributes: ['is_winby'], where: { is_state: 1 } })
        // Calcular el costo penalización por rechazo de orden
        const penaltyCost = totalOrder * dataInfoSeles.is_winby
        return res.json({ success: 1, penaltyCost })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Confirma la orden del vendedor como entregada
 * @param {Object} req Información de la petición
 * @param {Object} res Información de respuesta
 * @returns {Object} Respuesta del petición
 * @author Wow Desarrollos
 */
controllers.vendorConfirmOrder = async (req, res) => {
    try {
        const { v_id, iv_id, ivs_date } = req.body

        if (!v_id || !iv_id || !ivs_date) return res.json({ success: 0, message: 'No se posible obtener la información solicitada.' })

        // Busca la factura, debe estar en estado de despachado
        const dataIV = await InvoiceVendorsModel.findOne({
            attributes: ['iv_id', 'i_id', 'v_id', 'vl_id', 'iv_delivery', 'tdc_type', 'c_id', 'd_id', 'm_id'],
            include: [{
                attributes: ['vl_id', 'c_id', 'd_id', 'm_id'],
                include: [{ attributes: ['tdc_id', 'tdc_type'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_id', 'tdc_type'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }],
                model: VendorsLocalsModel
            }],
            where: { iv_id: deCode(iv_id), v_id: deCode(v_id), iv_state: 2 }
        })
        if (!dataIV) return res.json({ success: 0, message: 'La factura solicitada no es valida.' })

        // Buscar la factura general
        const dataI = await InvoicesModel.findOne({ attributes: ['i_id', 'u_id', 'i_epayco', 'i_vendor'], where: { i_id: deCode(dataIV.i_id) } })
        // Busca la información de los %
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_por', 'is_minNet', 'is_maxNet', 'is_leader', 'is_manager', 'is_director', 'is_dirDir', 'is_dirWor', 'is_winby'], where: { is_state: 1 } })
        // Busca el dinero actual en el administrador
        const dataAM = await AdminMoneysModel.findOne({ attributes: ['am_id', 'am_amount'] })
        // Busca el id del usuario que hizo la venta con el código
        const dataUserSeller = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code: dataI.i_vendor } })
        // Busca la información del aliado comercial
        const dataV = await VendorsModel.findOne({ attributes: ['u_id', 'v_type'], include: [{ attributes: ['um_money'], model: UserMoneysModel }], where: { v_id: deCode(v_id) } })
        // Busca el patrocinador del vendedor
        const dataUSV = await UserSponsorVendorsModel.findOne({ attributes: ['usvId'], include: [{ attributes: ['u_id'], model: UserProfilesModel }], where: { uId: deCode(dataV.u_id) } })

        // Variables para el usuario
        let pointU = 0
        let amountU = 0
        // Variables para el administrador
        let amountAdmin = dataAM.am_amount
        let totalAdmin = 0
        let utilityAdmin = 0
        let gainAdmin = 0
        // Variables para el vendedor
        let moneyV = 0
        // Variables de la red
        let moneyMin = 0
        let moneyMax = 0
        let moneyLeader = 0
        let moneyManager = 0
        let moneyDirector = 0
        let moneyDirDir = 0
        let moneyDirWor = 0

        // Productos de la factura
        const dataIP = await InvoiceProductsModel.findAll({ attributes: ['ip_id', 'p_id', 'ip_price', 'ip_total', 'ip_groPer', 'ip_state', 'ip_typeVen'], where: { i_id: deCode(dataI.i_id), v_id: deCode(v_id), iv_id: deCode(iv_id), ip_franchise: { [Op.or]: [null, 0] } } })

        for (let i = 0; i < dataIP.length; i++) {
            const { ip_id, ip_price, ip_total, ip_groPer, ip_typeVen } = dataIP[i]
            InvoiceProductsModel.update({ ip_state: 1 }, { where: { ip_id: deCode(ip_id) } }) // Actualiza el estado del producto

            // Registrar el reporte de puntos
            // Dinero del winber
            const totalProduct = ip_price * ip_total
            const groPer = ip_groPer / 100
            const value = totalProduct * groPer // Comisión
            pointU += ip_typeVen === 1 ? dataIS.is_por * totalProduct : 0
            amountU += ip_typeVen === 1 ? (groPer - (dataIS.is_minNet + dataIS.is_maxNet + dataIS.is_leader + (groPer * dataIS.is_manager) + (groPer * dataIS.is_director) + (groPer * dataIS.is_dirDir) + (groPer * dataIS.is_dirWor) + dataIS.is_winby)) * totalProduct : totalProduct * (1 - dataIS.is_winby)
            let d_id, c_id

            // Dinero del administrador
            amountAdmin += totalProduct
            totalAdmin += totalProduct
            utilityAdmin += ip_typeVen === 1 ? value : 0
            gainAdmin += totalProduct * dataIS.is_winby
            if (ip_typeVen === 1) {
                moneyMin += totalProduct * dataIS.is_minNet
                moneyMax += totalProduct * dataIS.is_maxNet
                moneyLeader += totalProduct * dataIS.is_leader
                moneyManager += (groPer * dataIS.is_manager) * totalProduct
                moneyDirector += (groPer * dataIS.is_director) * totalProduct
                moneyDirDir += (groPer * dataIS.is_dirDir) * totalProduct
                moneyDirWor += (groPer * dataIS.is_dirWor) * totalProduct
            }

            // Buscar el local
            d_id = dataIV?.vendorlocal?.d_id
            c_id = dataIV?.vendorlocal?.c_id

            // Registro de reporte
            if (ip_typeVen === 1) {
                MoneyNetworkReportsModel.create({
                    ip_id: deCode(ip_id),
                    mnr_min: (totalProduct * dataIS.is_minNet),
                    mnr_max: (totalProduct * dataIS.is_maxNet),
                    mnr_leader: (totalProduct * dataIS.is_leader),
                    mnr_manager: ((groPer * dataIS.is_maxNet) * totalProduct),
                    u_id: dataUSV?.userprofile?.u_id,
                    mnr_director: ((groPer * dataIS.is_director) * totalProduct),
                    d_id,
                    mnr_dirDir: ((groPer * dataIS.is_dirDir) * totalProduct),
                    c_id,
                    mnr_dirWor: ((groPer * dataIS.is_dirWor) * totalProduct),
                    mnr_state: 1
                })
            }
            // Dinero del vendedor
            moneyV += ip_typeVen === 1 ? (ip_price * ip_total) * (1 - (ip_groPer / 100)) : 0
        }

        // Servicios de la factura
        const dataIServ = await InvoiceServicesModel.findAll({ attributes: ['is_id', 's_id', 'is_price', 'is_total', 'is_groPer', 'is_state', 'is_typeVen'], where: { i_id: deCode(dataI.i_id), v_id: deCode(v_id), iv_id: deCode(iv_id) } })

        for (let i = 0; i < dataIServ.length; i++) {
            const { is_id, is_price, is_groPer, is_typeVen } = dataIServ[i]
            InvoiceServicesModel.update({ is_state: 1 }, { where: { is_id: deCode(is_id) } }) // Actualiza el estado del servicio

            // Dinero del winber
            const groPer = is_groPer / 100
            const value = is_price * groPer
            pointU += is_typeVen === 1 ? ((dataIS.is_minNet + dataIS.is_maxNet + dataIS.is_leader) / 100) * is_price : 0
            amountU += is_typeVen === 1 ? (groPer - (dataIS.is_minNet + dataIS.is_maxNet + dataIS.is_leader + (groPer * dataIS.is_manager) + (groPer * dataIS.is_director) + (groPer * dataIS.is_dirDir) + (groPer * dataIS.is_dirWor) + dataIS.is_winby)) * is_price : is_price * (1 - dataIS.is_winby)
            let d_id, c_id

            // Dinero del administrador
            amountAdmin += is_price
            totalAdmin += is_price
            utilityAdmin += is_typeVen === 1 ? value : 0
            gainAdmin += is_price * dataIS.is_winby
            if (is_typeVen === 1) {
                moneyMin += is_price * dataIS.is_minNet
                moneyMax += is_price * dataIS.is_maxNet
                moneyLeader += is_price * dataIS.is_leader
                moneyManager += (groPer * dataIS.is_manager) * is_price
                moneyDirector += (groPer * dataIS.is_director) * is_price
                moneyDirDir += (groPer * dataIS.is_dirDir) * is_price
                moneyDirWor += (groPer * dataIS.is_dirWor) * is_price
            }

            // Buscar el local
            d_id = dataIV?.vendorlocal?.d_id
            c_id = dataIV?.vendorlocal?.c_id

            // Registro de reporte
            if (is_typeVen === 1) {
                MoneyNetworkReportsModel.create({
                    is_id: deCode(is_id),
                    mnr_min: (is_price * dataIS.is_minNet),
                    mnr_max: (is_price * dataIS.is_maxNet),
                    mnr_leader: (is_price * dataIS.is_leader),
                    mnr_manager: ((groPer * dataIS.is_manager) * is_price),
                    u_id: dataUSV?.userprofile?.u_id,
                    mnr_director: ((groPer * dataIS.is_director) * is_price),
                    d_id,
                    mnr_dirDir: ((groPer * dataIS.is_dirDir) * is_price),
                    c_id,
                    mnr_dirWor: ((groPer * dataIS.is_dirWor) * is_price),
                    mnr_state: 1
                })
            }
            // Dinero del vendedor
            moneyV += is_typeVen === 1 ? is_price * (1 - (is_groPer / 100)) : 0
        }

        // Actualiza la venta del vendedor
        InvoiceVendorsModel.update({ iv_state: 1 }, { where: { iv_id: deCode(iv_id), v_id: deCode(v_id) } })
        InvoiceVendorStatusModel.create({ iv_id, ivs_type: 1, ivs_date }) // Crea el reporte de fechas de la factura
        const valueDelivery = dataIV.iv_delivery
        if (dataIV.tdc_type !== 2) { // Si no es domicilio pagado a winby
            if (dataIV.tdc_type !== 1) moneyV += valueDelivery // si no es domicilio pagado a winby
            amountAdmin += valueDelivery
            totalAdmin += valueDelivery
        }

        // Se le paga al wiber
        const dataU = await UserProfilesModel.findOne({
            attributes: ['u_id'],
            include: [
                { attributes: ['up_point'], model: UserPointsModel },
                { attributes: ['um_money'], model: UserMoneysModel }
            ],
            where: { up_code: dataI.i_vendor }
        })

        if (pointU > 0) {
            // Registra el reporte de los puntos
            PointReportsModel.create({ u_id: deCode(dataU.u_id), pr_point: pointU, pr_state: 1 })
            // Actualiza los puntos de la persona que realiza la
            UserPointsModel.update({ up_point: (dataU.userpoint.up_point + pointU) }, { where: { u_id: deCode(dataU.u_id) } })
        }

        // Registra el reporte del dinero
        MoneyReportsModel.create({ u_id: deCode(dataU.u_id), mr_money: dataU.usermoney.um_money, mr_confirm: amountU, mr_type: 3, i_id: deCode(dataI?.i_id), mr_state: 1 })
        UserMoneysModel.update({ um_money: (dataU.usermoney.um_money + amountU) }, { where: { u_id: deCode(dataU.u_id) } })

        // Se le paga al aliado comercial
        if (moneyV > 0) {
            if (dataIV.tdc_type === 2) { // Si es domicilio pagado a winby
                if (dataV.usermoney.um_money > valueDelivery) {
                    // Reporte de dinero para el aliado
                    MoneyReportsModel.create({ u_id: deCode(dataV.u_id), mr_money: dataV.usermoney.um_money, mr_confirm: 0, mr_retire: valueDelivery, mr_type: 13, i_id: deCode(dataI.i_id), mr_state: 1 }) // Pago de domicilio
                    UserMoneysModel.update({ um_money: (dataV.usermoney.um_money - valueDelivery) }, { where: { u_id: deCode(dataV.u_id) } })

                    // Reporte de dinero para el administrador
                    AdminMoneysModel.update({ am_amount: (dataAM.am_amount + valueDelivery) }, { where: { am_id: deCode(dataAM.am_id) } })
                } else DebtsReceivableModel.create({ v_id, dr_amount: valueDelivery, dr_type: 2, dr_state: 2 }) // Se genera el reporte de deuda del aliado
            }
            // Registra el reporte de dinero
            MoneyReportsModel.create({ u_id: deCode(dataV.u_id), mr_money: dataV.usermoney.um_money, mr_confirm: moneyV, mr_type: 3, i_id: deCode(dataI.i_id), mr_state: 1 })
            // Actualiza el dinero
            UserMoneysModel.update({ um_money: (dataV.usermoney.um_money + moneyV) }, { where: { u_id: deCode(dataV.u_id) } })
        }
        // Registra el ingreso del dinero para el administrador
        AdminMoneysModel.update({ am_amount: amountAdmin }, { where: { am_id: deCode(dataAM.am_id) } })
        AdminMoneyReportsModel.create({ u_id: deCode(dataUserSeller.u_id), amr_amount: dataAM.am_amount, amr_type: 1, amr_total: totalAdmin, amr_utility: utilityAdmin, amr_gain: gainAdmin, amr_state: 1 })

        // Registra el dinero de la red
        if (moneyMin > 0 || moneyMax > 0 || moneyLeader > 0 || moneyManager > 0 || moneyDirector > 0 || moneyDirDir > 0 || moneyDirWor > 0) {
            const dataMN = await MoneyNetworksModel.findOne({ attributes: ['mn_id', 'mn_min', 'mn_max', 'mn_leader', 'mn_manager', 'mn_director', 'mn_dirDir', 'mn_dirWor'] })
            MoneyNetworksModel.update({ mn_min: moneyMin + dataMN.mn_min, mn_max: moneyMax + dataMN.mn_max, mn_leader: moneyLeader + dataMN.mn_leader, mn_manager: moneyManager + dataMN.mn_manager, mn_director: moneyDirector + dataMN.mn_director, mn_dirDir: moneyDirDir + dataMN.mn_dirDir, mn_dirWor: moneyDirWor + dataMN.mn_dirWor }, { where: { mn_id: deCode(dataMN.mn_id) } })
        }

        // Actualizar facturas
        const dataIFinish = await InvoicesModel.findOne({
            attributes: ['i_id'],
            include: [{ attributes: ['iv_state'], model: InvoiceVendorsModel }],
            where: { i_id: deCode(dataI.i_id) }
        })
        const findActive = dataIFinish.invoicevendors.filter(x => x.iv_state !== 1)
        if (!findActive.length) {
            const resFind = dataIFinish.invoicevendors.find(x => x.iv_state === 1)
            if (resFind) InvoicesModel.update({ i_state: 1 }, { where: { i_id: deCode(dataI.i_id) } })
            else InvoicesModel.update({ i_state: 0 }, { where: { i_id: deCode(dataI.i_id) } })
        }
        // Respuesta
        return res.json({ success: 1, message: 'Se ha confirmado la entrega de la orden.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

module.exports = controllers