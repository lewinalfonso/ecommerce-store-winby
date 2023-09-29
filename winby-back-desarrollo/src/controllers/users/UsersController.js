const controllers = {}
const path = require('path')
const fse = require('fs-extra')
const UsersModel = require('../../models/users/UsersModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const UserSponsorsModel = require('../../models/users/UserSponsorsModel')
const UserMembersModel = require('../../models/users/UserMembersModel')
const UserPointsModel = require('../../models/users/UserPointsModel')
const UserMoneysModel = require('../../models/users/UserMoneysModel')
const UserStoreCategoryProductsModel = require('../../models/users/UserStoreCategoryProductsModel')
const UserStoreCategoryServicesModel = require('../../models/users/UserStoreCategoryServicesModel')
const UserStoreProductsModel = require('../../models/users/UserStoreProductsModel')
const UserStoreServicesModel = require('../../models/users/UserStoreServicesModel')
const UserRedsModel = require('../../models/users/UserRedsModel')
const { Op } = require('sequelize')
const { deCode, linkBelongsTo, linkHasMany, UpCrFind, makeUniqueSkuPrefix, enCode } = require('../../utils')
const bcrypt = require('bcrypt')
const UserChargesModel = require('../../models/info/UserChargesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const CountriesModel = require('../../models/info/CountriesModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const MoneyReportsModel = require('../../models/users/MoneyReportsModel')
const UserMenusModel = require('../../models/users/UserMenusModel')
const UserSubMenusModel = require('../../models/users/UserSubMenusModel')
const MenuChargesModel = require('../../models/info/MenuChargesModel')
const SubMenuChargesModel = require('../../models/info/SubMenuChargesModel')
const MenusModel = require('../../models/info/MenusModel')
const SubMenusModel = require('../../models/info/SubMenusModel')
const VendorsModel = require('../../models/vendors/VendorsModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ProductAttributesModel = require('../../models/products/ProductAttributesModel')
const ProductPhotosModel = require('../../models/products/ProductPhotosModel')
const CategoryProductsModel = require('../../models/categories/CategoryProductsModel')
const CategoryServicesModel = require('../../models/categories/CategoryServicesModel')
const ServicesModel = require('../../models/services/ServicesModel')
const ServicePhotosModel = require('../../models/services/ServicePhotosModel')
const VendorLegalsModel = require('../../models/vendors/VendorLegalsModel')
const VendorLegalDocumentsModel = require('../../models/vendors/VendorLegalDocumentsModel')
const UserNetworkLiquidationsModel = require('../../models/users/UserNetworkLiquidations')
const UserSponsorVendorsModel = require('../../models/users/UserSponsorVendorsModel')
const InvoicesModel = require('../../models/invoice/InvoicesModel')
const UserContactsModel = require('../../models/users/UserContactsModel')
const ProductLocalsModel = require('../../models/products/ProductLocalsModel')
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const MoneyNetworkUsersModel = require('../../models/info/MoneyNetworkUsersModel')
const MoneyNetworkDatesModel = require('../../models/info/MoneyNetworkDatesModel')
const { UserManagersModel, TypeManagersModel } = require('../../models')
const { errorLogMail } = require('../../utils/logMailer')

/** busca las categorias de productos del usuario */
controllers.getAllStoreCategoryProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_code, min, max } = req.body; let dataU, limit

        /** relaciones de base de datos */
        linkBelongsTo(UserStoreCategoryProductsModel, CategoryProductsModel, 'cp_id', 'cp_id')

        if (up_code) { dataU = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } }) }

        if (max) limit = [min, max]

        const data = await UserStoreCategoryProductsModel.findAll({
            attributes: ['uscp_id', 'uscp_priority', 'uscp_state'],
            include: [{ attributes: ['cp_id', 'cp_name', 'cp_priority', 'cp_horPho', 'cp_verPho', 'cp_state'], model: CategoryProductsModel, where: { cp_state: 1 } }],
            where: { u_id: dataU ? deCode(dataU.u_id) : deCode(u_id), uscp_state: 1 },
            limit
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca la categoria del producto del usuario */
controllers.getOneStoreCategoryProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { uscp_id, cp_id, up_code, u_id, uscp_state } = req.body
        let where = { uscp_state: uscp_state || { [Op.gte]: 0 } }

        /** relaciones de base de datos */
        linkBelongsTo(UserStoreCategoryProductsModel, CategoryProductsModel, 'cp_id', 'cp_id')

        if (uscp_id) where = { ...where, uscp_id: deCode(uscp_id) }
        if (cp_id) where = { ...where, cp_id: deCode(cp_id) }
        if (u_id) where = { ...where, u_id: deCode(u_id) }
        if (up_code) {
            const data = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } })
            if (data) where = { ...where, u_id: deCode(data.u_id) }
        }

        const data = await UserStoreCategoryProductsModel.findOne({
            attributes: ['uscp_id', 'uscp_state'],
            include: [{ attributes: ['cp_id', 'cp_name', 'cp_priority', 'cp_horPho', 'cp_verPho', 'cp_state'], model: CategoryProductsModel, where: { cp_state: 1 } }],
            where
        })
        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca las categorias de servicios del usuario */
controllers.getAllStoreCategoryServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_code, min, max } = req.body; let dataU, limit

        /** relaciones de base de datos */
        linkBelongsTo(UserStoreCategoryServicesModel, CategoryServicesModel, 'cs_id', 'cs_id')

        if (up_code) { dataU = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } }) }

        if (max) limit = [min, max]

        const data = await UserStoreCategoryServicesModel.findAll({
            attributes: ['uscs_id', 'uscs_priority', 'uscs_state'],
            include: [{ attributes: ['cs_id', 'cs_name', 'cs_priority', 'cs_horPho', 'cs_verPho', 'cs_state'], model: CategoryServicesModel, where: { cs_state: 1 } }],
            where: { u_id: dataU ? deCode(dataU.u_id) : deCode(u_id), uscs_state: 1 },
            limit
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca la categoria del servicio del usuario */
controllers.getOneStoreCategoryServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { uscs_id, cs_id, up_code, u_id, uscs_state } = req.body
        let where = { uscs_state: uscs_state || { [Op.gte]: 0 } }

        /** relaciones de base de datos */
        linkBelongsTo(UserStoreCategoryServicesModel, CategoryServicesModel, 'cs_id', 'cs_id')

        if (uscs_id) where = { ...where, uscs_id: deCode(uscs_id) }
        if (cs_id) where = { ...where, cs_id: deCode(cs_id) }
        if (u_id) where = { ...where, u_id: deCode(u_id) }
        if (up_code) {
            const data = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } })
            if (data) where = { ...where, u_id: deCode(data.u_id) }
        }

        const data = await UserStoreCategoryServicesModel.findOne({
            attributes: ['uscs_id', 'uscs_state'],
            include: [{ attributes: ['cs_id', 'cs_name', 'cs_priority', 'cs_horPho', 'cs_verPho', 'cs_state'], model: CategoryServicesModel, where: { cs_state: 1 } }],
            where
        })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca los productos del usuario */
controllers.getAllStoreProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_code, min, max, typeOrder, usp_row } = req.body
        let dataU, order = [], limit

        /** relaciones de base de datos */
        linkBelongsTo(UserStoreProductsModel, ProductsModel, 'p_id', 'p_id')
        linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')
        linkHasMany(ProductsModel, ProductAttributesModel, 'p_id', 'p_id')
        // linkBelongsTo(ProductLocalsModel, Vendo, 'tdc_id', 'tdc_id')

        if (up_code) { dataU = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } }) }

        if (typeOrder === 1) order = [['usp_priority', 'ASC']]
        else if (typeOrder === 2) order = [['usp_id', 'DESC']]

        if (max) limit = [min, max]
        const data = await UserStoreProductsModel.findAll({
            attributes: ['usp_id', 'u_id', 'usp_row', 'usp_priority', 'usp_state'],
            include: [{
                attributes: ['p_id', 'scp_id', 'p_name', 'p_description', 'p_price', 'p_franchise', 'p_quantity', 'p_available', 'p_views', 'p_delivery', 'p_taxGat', 'p_sku'],
                model: ProductsModel,
                where: { p_state: 1 },
                include: [
                    { attributes: ['pp_id', 'pp_name', 'pp_cover', 'pp_state'], model: ProductPhotosModel, where: { pp_state: 1 } },
                    { attributes: ['pa_id', 'ascp_id', 'pa_name', 'pa_value', 'pa_priority'], model: ProductAttributesModel, where: { pa_state: 1 }, required: false },
                    {
                        attributes: ['pl_id', 'vl_id'],
                        model: ProductLocalsModel,
                        include: [{
                            attributes: ['vl_id', 'tdc_idLoc', 'tdc_idNat'],
                            model: VendorsLocalsModel,
                            include: [{ attributes: ['tdc_type'], model: TypeDeliveryCostsModel, as: 'localDelivery' }, { attributes: ['tdc_type'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }]
                        }]
                    }
                ]
            }],
            where: { u_id: dataU ? deCode(dataU.u_id) : deCode(u_id), usp_state: 1, usp_row: usp_row || { [Op.gt]: 0 } },
            order,
            limit
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca los servicios del usuario */
controllers.getAllStoreService = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_code, min, max, uss_row } = req.body; let dataU, limit

        /** relaciones de base de datos */
        linkBelongsTo(UserStoreServicesModel, ServicesModel, 's_id', 's_id')
        linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')

        if (up_code) { dataU = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } }) }

        if (max) limit = [min, max]

        const data = await UserStoreServicesModel.findAll({
            attributes: ['uss_id', 'u_id', 'uss_row', 'uss_priority', 'uss_state'],
            include: [{
                attributes: ['s_id', 'scs_id', 's_name', 's_description', 's_price', 's_views', 's_delivery', 's_taxGat', 's_sku'],
                model: ServicesModel,
                where: { s_state: 1 },
                include: [{ attributes: ['sp_id', 'sp_name', 'sp_cover', 'sp_state'], model: ServicePhotosModel, where: { sp_state: 1 } }]
            }],
            where: { u_id: dataU ? deCode(dataU.u_id) : deCode(u_id), uss_state: 1, uss_row: uss_row || { [Op.gt]: 0 } },
            limit
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registro de un usuario Tienda */
controllers.registerWebUser = async (req, res) => {
    try {
        /** variables necesaria */
        const { u_email, u_phoNum, u_pass, code, up_name, up_last } = req.body

        /** verifica si existe el usuario  */
        const queryU = await UsersModel.findOne({ attributes: ['u_email', 'u_phoNum'], where: { [Op.or]: { u_email, u_phoNum } } })

        if (queryU) {
            if (queryU.u_email === u_email) { return res.json({ success: 0, message: 'El correo electrónico ya existe por lo que no es permitido usarlo.' }) } else { return res.json({ success: 0, message: 'El número de teléfono ya existe por lo que no es permitido usarlo.' }) }
        }

        /** Crear hash */
        const hash = await bcrypt.hashSync(u_pass, 10)

        /** registro de usuario */
        const dataU = await UsersModel.create({ u_phoNum, u_email, u_pass: hash, uc_id: 1, u_state: 1 })

        /** registra el perfil */
        await UserProfilesModel.create({ u_id: deCode(dataU.u_id), up_name, up_last, up_typMod: 1, up_state: 1 })

        /** registra el dinero */
        await UserMoneysModel.create({ u_id: deCode(dataU.u_id), um_money: 0, um_state: 1 })

        /** registra los puntos */
        await UserPointsModel.create({ u_id: deCode(dataU.u_id), up_point: 0, up_state: 1 })

        /** registra el dia de membresia */
        await UserMembersModel.create({ u_id: deCode(dataU.u_id), um_firstPay: new Date(), um_datExp: new Date(), um_state: 1 })

        /**
         * Código comentado por motivos de fácil recuperación
         * #########################################
         */

        /** busca el código del usuario por el correo */
        // const dataPU = await UserProfilesModel.findOne({ attributes: ['up_typMod'], where: { up_code: code } })

        /** registra al patrocinador */
        // UserSponsorsModel.create({ u_id: deCode(dataU.u_id), us_code: dataPU ? code : 'Winby', us_type: dataPU ? dataPU.up_typMod : 1, us_state: 1 })
        /**
         * ##########################################
         */

        /** Relación de base de datos */
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(UserProfilesModel, DepartmentsModel, 'd_id', 'd_id')
        linkBelongsTo(UserProfilesModel, MunicipalitiesModel, 'm_id', 'm_id')
        linkBelongsTo(UsersModel, VendorsModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserMembersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserSponsorsModel, 'u_id', 'u_id')

        /** busca si existe el usuario */
        const data = await UsersModel.findOne({
            attributes: [],
            include: [{
                attributes: ['up_name', 'up_last', 'up_code', 'up_confirm'],
                model: UserProfilesModel,
                required: false,
                include: [
                    { attributes: ['c_id', 'c_name'], model: CountriesModel },
                    { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                    { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }
                ]
            },
            { attributes: ['v_alias', 'tp_id', 'v_ideNum', 'v_nit', 'v_dv', 'v_business', 'v_name', 'v_last', 'v_logo'], model: VendorsModel, required: false },
            { attributes: ['us_code'], model: UserSponsorsModel, required: false },
            { attributes: ['um_datExp'], model: UserMembersModel, required: false }
            ],
            where: { u_id: deCode(dataU.u_id) }
        })

        return res.json({ success: 1, u_id: dataU.u_id, infProfile: { u_email, u_phoNum, vendor: data.vendor, userprofile: data.userprofile, usermember: data.usermember, usersponsor: data.usersponsor }, member: false, message: 'Ha iniciado sesion exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Organiza los productos y servicios seleccionados en la tienda del usuario.
 * @param {object} req Objeto con la información de la petición del usuario.
 * @param {object} res Objeto con la información de respuesta.
 * @return {object} objeto con el estado de la solicitud.
 */
controllers.organizeStoreItems = async (req, res) => {
    try {
        const { u_id, products, services } = req.body
        // Se actualiza el orden de los productos
        for (let i = 0; i < products?.length; i++) {
            const { usp_id, usp_priority } = products[i]
            await UserStoreProductsModel.update({ usp_priority }, { where: { usp_id: deCode(usp_id), u_id: deCode(u_id) } })
        }
        // Se actualiza el orden de los servicios
        for (let i = 0; i < services?.length; i++) {
            const { uss_id, uss_priority } = services[i]
            await UserStoreServicesModel.update({ uss_priority }, { where: { uss_id: deCode(uss_id), u_id: deCode(u_id) } })
        }

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: error?.validation ? error.message : 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

/**
 * Organiza las categorias seleccionadas en la tienda del usuario.
 * @param {object} req Objeto con la información de la petición del usuario.
 * @param {object} res Objeto con la información de respuesta.
 * @return {object} objeto con el estado de la solicitud.
 */
controllers.organizeStoreCategories = async (req, res) => {
    try {
        const { u_id, categoryServices, categoryProducts } = req.body
        // Se actualiza el orden de las categorias de productos
        for (let i = 0; i < categoryProducts?.length; i++) {
            const { cp_id, uscp_priority } = categoryProducts[i]
            await UserStoreCategoryProductsModel.update({ uscp_priority }, { where: { cp_id: deCode(cp_id), u_id: deCode(u_id) } })
        }
        // Se actualiza el orden de los servicios
        for (let i = 0; i < categoryServices?.length; i++) {
            const { cs_id, uscs_priority } = categoryServices[i]
            await UserStoreCategoryServicesModel.update({ uscs_priority }, { where: { cs_id: deCode(cs_id), u_id: deCode(u_id) } })
        }

        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: error?.validation ? error.message : 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

/** busca los directos de un usuario franquisia */
controllers.networkDirectUser = async (req, res) => {
    try {
        const { u_id } = req.params

        /** relacion de base de datos */
        linkBelongsTo(UserSponsorsModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(UserSponsorsModel, UserPointsModel, 'u_id', 'u_id')
        linkBelongsTo(UserSponsorsModel, UserMembersModel, 'u_id', 'u_id')

        /** busca mi codigo */
        const dataUP = await UserProfilesModel.findOne({ attributes: ['up_code'], where: { u_id: deCode(u_id) } })

        /** buscar los usuarios directos */
        const data = await UserSponsorsModel.findAll({
            attributes: ['us_id', 'u_id', 'us_datCre'],
            include: [
                { attributes: ['up_name', 'up_last'], model: UserProfilesModel, include: [{ attributes: ['c_name'], model: CountriesModel }] },
                { attributes: ['up_point'], model: UserPointsModel },
                { attributes: ['um_datExp'], model: UserMembersModel }
            ],
            where: { us_code: dataUP.up_code }
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registro de categorias de productos en la tiendas */
controllers.registerShopCategoryProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { categoryproducts, u_id } = req.body

        /** registrar categorias o actualizar */
        for (let i = 0; i < categoryproducts.length; i++) {
            const { cp_id } = categoryproducts[i]

            await UserStoreCategoryProductsModel.create({ u_id: deCode(u_id), cp_id: deCode(cp_id), uscp_state: 1 })
        }

        /** respuesta */
        return res.json({ success: 1, message: 'La tienda ha sido modificada.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar categorias de productos en la tienda */
controllers.deleteStoreCategoryProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { uscp_id } = req.body

        /** elimina la categoria */
        await UserStoreCategoryProductsModel.destroy({ where: { uscp_id: deCode(uscp_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'La categoría del producto ha sido eliminada.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar todas las categorias de productos en la tienda */
controllers.deleteAllStoreCategoryProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id } = req.body

        /** elimina la categoria */
        await UserStoreCategoryProductsModel.destroy({ where: { u_id: deCode(u_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Las categorías han sido eliminadas.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registro de productos en la tiendas */
controllers.registerStoreProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { userstoreproducts, u_id } = req.body

        /** registrar categorias o actualizar */
        for (let i = 0; i < userstoreproducts.length; i++) {
            const { p_id, usp_row } = userstoreproducts[i]
            await UserStoreProductsModel.create({ u_id: deCode(u_id), p_id: deCode(p_id), usp_row: usp_row || 1, usp_state: 1 })
        }

        /** respuesta */
        return res.json({ success: 1, message: 'La tienda ha sido modificada.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar servicio en la tienda */
controllers.deleteStoreProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { usp_id } = req.body

        /** elimina la categoria */
        await UserStoreProductsModel.destroy({ where: { usp_id: deCode(usp_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'El articulo ha sido eliminado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar servicio en la tienda */
controllers.deleteAllStoreProducts = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, row } = req.body

        /** elimina la categoria */
        await UserStoreProductsModel.destroy({ where: { u_id: deCode(u_id), usp_row: row } })

        /** respuesta */
        return res.json({ success: 1, message: 'Los articulos han sido eliminados.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registro de categorias de servicios en la tiendas */
controllers.registerShopCategoryServices = async (req, res) => {
    try {
        const { categoryservices, u_id } = req.body

        /** registrar categorias o actualizar */
        for (let i = 0; i < categoryservices.length; i++) {
            const { cs_id } = categoryservices[i]

            await UserStoreCategoryServicesModel.create({ u_id: deCode(u_id), cs_id: deCode(cs_id), uscs_state: 1 })
        }

        /** respuesta */
        return res.json({ success: 1, message: 'La tienda ha sido modificada.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar categorias de servicio en la tienda */
controllers.deleteStoreCategoryServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { uscs_id } = req.body

        /** elimina la categoria */
        await UserStoreCategoryServicesModel.destroy({ where: { uscs_id: deCode(uscs_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'La categoría del servicio ha sido eliminada.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar categorias de servicio en la tienda */
controllers.deleteAllStoreCategoryServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id } = req.body

        /** elimina la categoria */
        await UserStoreCategoryServicesModel.destroy({ where: { u_id: deCode(u_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Las categorías han sido eliminadas.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** registro de servicios en la tiendas */
controllers.registerStoreServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { userstoreservices, u_id } = req.body

        /** registrar categorias o actualizar */
        for (let i = 0; i < userstoreservices.length; i++) {
            const { s_id, uss_row } = userstoreservices[i]

            await UserStoreServicesModel.create({ u_id: deCode(u_id), s_id: deCode(s_id), uss_row: uss_row || 1, uss_state: 1 })
        }

        /** respuesta */
        return res.json({ success: 1, message: 'La tienda ha sido modificada.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar servicio en la tienda */
controllers.deleteStoreServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { uss_id } = req.body

        /** elimina la categoria */
        await UserStoreServicesModel.destroy({ where: { uss_id: deCode(uss_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'El articulo ha sido eliminado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar servicio en la tienda */
controllers.deleteAllStoreServices = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, row } = req.body

        /** elimina la categoria */
        await UserStoreServicesModel.destroy({ where: { u_id: deCode(u_id), uss_row: row } })

        /** respuesta */
        return res.json({ success: 1, message: 'Los articulos han sido eliminados.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.registerWebFranchise = async (req, res) => {
    try {
        /** variables y parametros necesarios */
        const { u_id, up_name, up_last, up_code, c_id, d_id, m_id } = req.body

        /** verifica si existe el usuario o el codigo */
        const queryUP = await UserProfilesModel.findOne({ attributes: ['up_id'], where: { up_code: up_code.replace(' ', '') } })

        if (queryUP) { return res.json({ success: 0, message: 'El alias ya se encuentra ocupado, por lo que no es permitido usarlo.' }) }

        /** registro de usuario */
        UsersModel.update({ uc_id: 2 }, { where: { u_id: deCode(u_id) } })

        /** Relación de base de datos */
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkHasMany(MenuChargesModel, SubMenuChargesModel, 'mc_id', 'mc_id')
        linkHasMany(UserProfilesModel, UserStoreCategoryProductsModel, 'u_id', 'u_id')
        linkHasMany(UserStoreCategoryProductsModel, UserStoreSubCategoryProductsModel, 'uscp_id', 'uscp_id')
        linkHasMany(UserStoreSubCategoryProductsModel, UserStoreSubCategoryProductItemsModel, 'usscp_id', 'usscp_id')
        linkHasMany(UserProfilesModel, UserStoreCategoryServicesModel, 'u_id', 'u_id')
        linkHasMany(UserStoreCategoryServicesModel, UserStoreSubCategoryServicesModel, 'uscs_id', 'uscs_id')
        linkHasMany(UserStoreSubCategoryServicesModel, UserStoreSubCategoryServiceItemsModel, 'usscs_id', 'usscs_id')

        /** Busca el menu y sub menu del cargo del usuario  */
        const dataMC = await MenuChargesModel.findAll({ attributes: ['m_id'], include: [{ attributes: ['sm_id'], model: SubMenuChargesModel }], where: { uc_id: 2 } })
        if (dataMC.length) {
            for (let i = 0; i < dataMC.length; i++) {
                const x = dataMC[i]
                const dataUM = await UpCrFind(UserMenusModel, { m_id: x.m_id, u_id: deCode(u_id), um_state: 1 }, { m_id: x.m_id, u_id: deCode(u_id) })
                if (x.submenucharges.length) { x.submenucharges.map((y) => UpCrFind(UserSubMenusModel, { sm_id: y.sm_id, um_id: deCode(dataUM.um_id), usm_state: 1 }, { sm_id: y.sm_id, um_id: deCode(dataUM.um_id) })) }
            }
        }

        /** actualizar el perfil */
        UserProfilesModel.update({ up_name, up_last, up_code: up_code.replace(' ', ''), c_id: deCode(c_id), d_id: deCode(d_id), m_id: deCode(m_id), up_franchise: 1 }, { where: { u_id: deCode(u_id) } })

        /** Categorias - Sub Categoria - Productos y Servicios */
        const dataUP = await UserProfilesModel.findOne({
            attributes: ['up_id'],
            include: [
                {
                    attributes: ['cp_id'],
                    model: UserStoreCategoryProductsModel,
                    where: { uscp_state: 1 },
                    required: false,
                    include: [{
                        attributes: ['scp_id'],
                        model: UserStoreSubCategoryProductsModel,
                        where: { usscp_state: 1 },
                        required: false,
                        include: [{ attributes: ['p_id'], model: UserStoreSubCategoryProductItemsModel, where: { usscpi_state: 1 }, required: false }]
                    }]
                }, {
                    attributes: ['cs_id'],
                    model: UserStoreCategoryServicesModel,
                    where: { uscs_state: 1 },
                    required: false,
                    include: [{
                        attributes: ['scs_id'],
                        model: UserStoreSubCategoryServicesModel,
                        where: { usscs_state: 1 },
                        required: false,
                        include: [{ attributes: ['s_id'], model: UserStoreSubCategoryServiceItemsModel, where: { usscsi_state: 1 }, required: false }]
                    }]
                }
            ],
            where: { up_code: 'Winby' }
        })

        /** Registro Categorias - Sub Categoria - Productos y Servicios */
        for (let i = 0; i < dataUP.userstorecategoryproducts.length; i++) {
            const { cp_id, userstoresubcategoryproducts } = dataUP.userstorecategoryproducts[i]
            /** Registro de Categoria */
            const dataUSCP = await UserStoreCategoryProductsModel.create({ u_id: deCode(u_id), cp_id: deCode(cp_id), uscp_state: 1 })

            for (let ii = 0; ii < userstoresubcategoryproducts.length; ii++) {
                const { scp_id, userstoresubcategoryproductitems } = userstoresubcategoryproducts[ii]
                /** Registro de Sub Categoria */
                const dataUSSCP = await UserStoreSubCategoryProductsModel.create({ uscp_id: deCode(dataUSCP.uscp_id), scp_id: deCode(scp_id), usscp_state: 1 })

                for (let iii = 0; iii < userstoresubcategoryproductitems.length; iii++) {
                    const { p_id } = userstoresubcategoryproductitems[iii]
                    /** Registro de Servicio */
                    UserStoreSubCategoryProductItemsModel.create({ usscp_id: deCode(dataUSSCP.usscp_id), p_id: deCode(p_id), usscpi_state: 1 })
                }
            }
        }

        /** verifica si winby tiene servicios */
        for (let i = 0; i < dataUP.userstorecategoryservices.length; i++) {
            const { cs_id, userstoresubcategoryservices } = dataUP.userstorecategoryservices[i]
            /** Registro de Categoria */
            const dataUSCS = await UserStoreCategoryServicesModel.create({ u_id: deCode(u_id), cs_id: deCode(cs_id), uscs_state: 1 })

            for (let ii = 0; ii < userstoresubcategoryservices.length; ii++) {
                const { scs_id, userstoresubcategoryservicesitems } = userstoresubcategoryservices[ii]
                /** Registro de Sub Categoria */
                const dataUSSCS = await UserStoreSubCategoryServicesModel.create({ uscs_id: deCode(dataUSCS.uscs_id), scs_id: deCode(scs_id), usscs_state: 1 })

                for (let iii = 0; iii < userstoresubcategoryservicesitems.length; iii++) {
                    const { s_id } = userstoresubcategoryservicesitems[iii]
                    /** Registro de Servicio */
                    UserStoreSubCategoryServiceItemsModel.create({ usscs_id: deCode(dataUSSCS.usscs_id), s_id: deCode(s_id), usscsi_state: 1 })
                }
            }
        }

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha registrado exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Inicio de sesion de la tienda */
controllers.loginWebShop = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_phoNum, u_pass } = req.body

        /** Relación de base de datos */
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(UserProfilesModel, DepartmentsModel, 'd_id', 'd_id')
        linkBelongsTo(UserProfilesModel, MunicipalitiesModel, 'm_id', 'm_id')
        linkBelongsTo(UsersModel, VendorsModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserMembersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserSponsorsModel, 'u_id', 'u_id')

        /** busca si existe el usuario */
        const data = await UsersModel.findOne({
            attributes: ['u_id', 'u_email', 'u_phoNum', 'u_pass'],
            include: [{
                attributes: ['up_ideNum', 'up_name', 'up_last', 'up_code', 'up_franchise', 'up_location', 'up_confirm', 'up_ideDoc'],
                model: UserProfilesModel,
                required: false,
                include: [
                    { attributes: ['c_id', 'c_name'], model: CountriesModel },
                    { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                    { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }
                ]
            },
            { attributes: ['v_alias', 'tp_id', 'v_ideNum', 'v_nit', 'v_dv', 'v_business', 'v_name', 'v_last', 'v_logo'], model: VendorsModel, required: false },
            { attributes: ['us_code'], model: UserSponsorsModel, required: false },
            { attributes: ['um_datExp'], model: UserMembersModel, required: false }
            ],
            where: { u_phoNum }
        })

        if (!data) { return res.json({ success: 0, message: `El ${u_phoNum} no se encuentra registrado.` }) }

        /** Compara las contraseñas */
        const compare = await bcrypt.compareSync(u_pass, data.u_pass)

        /** Verifica si la contraseña es correcta */
        if (compare) { return res.json({ success: 1, u_id: data.u_id, infProfile: { u_email: data.u_email, u_phoNum: data.u_phoNum, vendor: data.vendor, userprofile: data.userprofile, usermember: data.usermember, usersponsor: data.usersponsor }, member: data.usermember.um_datExp > new Date(), message: 'Ha iniciado sesion exitosamente.' }) }

        return res.json({ success: 0, message: 'Contraseña incorrecta' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** inicio sesion del admin */
controllers.loginWebAdmin = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_phoNum, u_pass } = req.body

        /** Relación de base de datos */
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserChargesModel, 'uc_id', 'uc_id')
        linkBelongsTo(UsersModel, VendorsModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserMembersModel, 'u_id', 'u_id')

        linkBelongsTo(UserMenusModel, MenusModel, 'm_id', 'm_id')
        linkHasMany(UserMenusModel, UserSubMenusModel, 'um_id', 'um_id')
        linkBelongsTo(UserSubMenusModel, SubMenusModel, 'sm_id', 'sm_id')

        /** busca si existe el usuario */
        const data = await UsersModel.findOne({
            attributes: ['u_id', 'u_pass', 'uc_id'],
            include: [
                { attributes: ['up_name', 'up_last', 'up_wstock'], model: UserProfilesModel },
                { attributes: ['uc_id', 'uc_name'], model: UserChargesModel },
                { attributes: ['v_id'], model: VendorsModel },
                { attributes: ['um_datExp'], model: UserMembersModel }
            ],
            where: { u_phoNum, uc_id: { [Op.gte]: 2 } }
        })

        if (!data) { return res.json({ success: 0, message: `El ${u_phoNum} no se encuentra registrado.` }) }

        /** Compara las contraseñas */
        const compare = await bcrypt.compareSync(u_pass, data.u_pass)

        if (compare) {
            let member = false, userName = '', up_wstock = 0

            /** Verifica si existe en la tabla member */
            if (data.usermember) { member = data.usermember.um_datExp > new Date() }

            if (data.userprofile) {
                userName = `${data.userprofile.up_name} ${data.userprofile.up_last}`
                up_wstock = data.userprofile.up_wstock
            }

            if (deCode(data.usercharge.uc_id) === 3) {
                const dataV = await VendorsModel.findOne({ attributes: ['tp_id', 'v_business', 'v_name', 'v_last'], where: { u_id: deCode(data.u_id) } })
                userName = `${dataV.tp_id === 1 ? `${dataV.v_name} ${dataV.v_last}` : dataV.v_business}`
            }

            /** busca el menu del usuario */
            const menus = await UserMenusModel.findAll({
                attributes: ['um_id'],
                include: [
                    { attributes: ['m_id', 'm_name', 'm_path'], model: MenusModel, where: { m_state: 1 } },
                    {
                        attributes: ['usm_id'],
                        model: UserSubMenusModel,
                        order: [[SubMenusModel, 'sm_priority', 'ASC']],
                        include: [{ attributes: ['sm_id', 'sm_name', 'sm_path', 'sm_priority'], model: SubMenusModel, where: { sm_state: 1 } }]
                    }
                ],
                where: { u_id: deCode(data.u_id), um_state: 1 },
                order: [[MenusModel, 'm_priority', 'ASC']]
            })

            return res.json({ success: 1, menus, u_id: data.u_id, v_id: data.vendor ? data.vendor.v_id : false, userName, uc_id: data.uc_id, uc_name: data.usercharge.uc_name, member, up_wstock, message: 'Ha iniciado sesion exitosamente.' })
        }

        return res.json({ success: 0, message: 'La contraseña no es correcta.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Busca el ID del usuario por codigo */
controllers.getID = async (req, res) => {
    try {
        /** variables necesarias */
        const { up_code } = req.body

        const data = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code } })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Buscar el perfil del usuario con el codigo */
controllers.profileUserWithCode = async (req, res) => {
    try {
        const { up_code } = req.body

        linkBelongsTo(UserProfilesModel, UsersModel, 'u_id', 'u_id')

        const data = await UserProfilesModel.findOne({
            attributes: ['up_id', 'u_id', 'up_name', 'up_last', 'up_code'],
            include: [{
                attributes: ['u_email', 'u_phoNum'],
                model: UsersModel
            }],
            where: { up_code }
        })
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Obtiene todos los usuarios de la lista de liquidación */
controllers.getAllUserNetLiq = async (req, res) => {
    try {
        linkBelongsTo(UserNetworkLiquidationsModel, UsersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')

        const data = await UserNetworkLiquidationsModel.findAll({
            attributes: ['unl_id', 'u_id', 'unl_type'],
            include: [{
                attributes: ['u_phoNum', 'u_email'],
                model: UsersModel,
                include: [{
                    attributes: ['up_code', 'up_name', 'up_last'],
                    model: UserProfilesModel
                }]
            }],
            where: { unl_state: 1 }
        })

        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Agrega un usuario a la liquidación de la red */
controllers.registerUserNetLiq = async (req, res) => {
    try {
        const { u_id, unl_type } = req.body

        // Función helper para buscar la info del usuario
        const getDataLiq = async u_id => {
            // Relaciones de las tablas
            linkBelongsTo(UserNetworkLiquidationsModel, UsersModel, 'u_id', 'u_id')
            linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')

            const data = await UserNetworkLiquidationsModel.findOne({
                attributes: ['unl_id', 'u_id', 'unl_type'],
                include: [{
                    attributes: ['u_phoNum', 'u_email'],
                    model: UsersModel,
                    include: [{
                        attributes: ['up_code', 'up_name', 'up_last'],
                        model: UserProfilesModel
                    }]
                }],
                where: { u_id: deCode(u_id) }
            })
            return data
        }

        // Verificar si ya se encuentra registrado
        const sData = await UserNetworkLiquidationsModel.findOne({ attributes: ['unl_id', 'unl_type', 'unl_state'], where: { u_id: deCode(u_id) } })
        let data

        if (sData) {
            if (sData.unl_state === 1) return res.json({ success: 0, message: 'El usuario ya se encuentra agregado.' })
            else if (sData.unl_state === 0) {
                await UserNetworkLiquidationsModel.update({ unl_type, unl_state: 1 }, { where: { u_id: deCode(u_id) } })
                data = await getDataLiq(u_id)
            }
        }

        if (!data) {
            await UserNetworkLiquidationsModel.create({ u_id: deCode(u_id), unl_type, unl_state: 1 })
            data = await getDataLiq(u_id)
        }
        if (data) return res.json({ success: 1, data, message: 'Se ha agregado un usuario a la lista de liquidación.' })

        return res.json({ success: 0, message: 'No se ha podido agreagar el usuario a la lista.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Elimina un usuario de la lista de liquidación */
controllers.deleteUserNetLiq = async (req, res) => {
    try {
        // Declaración de variables
        const { u_id } = req.body
        await UserNetworkLiquidationsModel.update({ unl_state: 0 }, { where: { u_id: deCode(u_id) } })

        return res.json({ success: 1, u_id, message: 'Se ha eliminado el usuario de la lista de liquidación.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}
/** Edita un usuario de la lista de liquidación */
controllers.editUserNetLiq = async (req, res) => {
    try {
        // Declaración de variables
        const { unl_id, unl_type } = req.body

        await UserNetworkLiquidationsModel.update({ unl_type }, { where: { unl_id: deCode(unl_id) } })

        return res.json({ success: 1, unl_id, unl_type, message: 'Se ha editado el usuario de la lista de liquidación.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca el perfil del usuario */
controllers.profileUser = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_code } = req.body
        let whereU = {}, whereUP = {}
        /** relaciones de base de datos */
        linkBelongsTo(UsersModel, UserChargesModel, 'uc_id', 'uc_id')
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserSponsorsModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(UserProfilesModel, DepartmentsModel, 'd_id', 'd_id')
        linkBelongsTo(UserProfilesModel, MunicipalitiesModel, 'm_id', 'm_id')
        linkBelongsTo(UsersModel, UserMembersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserRedsModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, VendorsModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, UserProfilesModel, 'u_id', 'u_idTyp')

        if (u_id) { whereU = { u_id: deCode(u_id) } }
        if (up_code) { whereUP = { up_code } }

        const data = await UsersModel.findOne({
            attributes: ['u_phoNum', 'u_email'],
            include: [
                { attributes: ['uc_name'], model: UserChargesModel, required: false },
                {
                    attributes: ['up_ideNum', 'up_name', 'up_last', 'up_code', 'up_location', 'up_typMod', 'up_franchise', 'up_confirm', 'up_lat', 'up_lon', 'up_ideDoc'],
                    model: UserProfilesModel,
                    required: false,
                    where: whereUP,
                    include: [
                        { attributes: ['c_id', 'c_name'], model: CountriesModel, required: false },
                        { attributes: ['d_id', 'd_name'], model: DepartmentsModel, required: false },
                        { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel, required: false },
                        { attributes: ['up_code'], model: UserProfilesModel, required: false }
                    ]
                },
                { attributes: ['um_firstPay', 'um_datExp'], model: UserMembersModel, required: false },
                { attributes: ['ur_id'], model: UserRedsModel, required: false },
                { attributes: ['us_code'], model: UserSponsorsModel, required: false },
                { attributes: ['v_alias', 'tp_id', 'v_ideNum', 'v_nit', 'v_dv', 'v_business', 'v_name', 'v_last', 'v_logo'], model: VendorsModel, required: false }
            ],
            where: whereU
        })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún perfil de usuario' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca el email de un usuario por su codigo */
controllers.getEmailCodUser = async (req, res) => {
    try {
        /** variables necesarias */
        const { code } = req.params

        /** relaciones de base de datos */
        linkBelongsTo(UserProfilesModel, UsersModel, 'u_id', 'u_id')

        /** peticion */
        const data = await UserProfilesModel.findOne({ attributes: ['up_id', 'up_name', 'up_last'], include: [{ attributes: ['u_email'], model: UsersModel }], where: { up_code: code } })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún correo electrónico.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registro del codigo del perfil de usuario */
controllers.regCodProUser = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_code } = req.body

        /** peticion */
        const data = await UserProfilesModel.findOne({ attributes: ['up_id'], where: { up_code } })

        if (!data) {
            const dataUP = await UserProfilesModel.findOne({ attributes: ['up_code', 'up_confirm'], where: { u_id: deCode(u_id) } })

            InvoicesModel.update({ i_vendor: up_code }, { where: { i_vendor: dataUP.up_code } })
            UserContactsModel.update({ uc_code: up_code }, { where: { uc_code: dataUP.up_code } })
            UserSponsorsModel.update({ us_code: up_code }, { where: { us_code: dataUP.up_code } })
            UserSponsorVendorsModel.update({ usvCode: up_code }, { where: { usvCode: dataUP.up_code } })
            await UserProfilesModel.update({ up_code, ...(!dataUP.up_confirm ? { up_confirm: 1 } : {}) }, { where: { u_id: deCode(u_id) } })
        }

        /** respuesta */
        if (data) { return res.json({ success: 0, message: 'No es posible usar el apodo por que ya se encuentra ocupado.' }) }

        return res.json({ success: 1, message: 'Se ha cambiado con exito su link.' })
    } catch (error) {
        errorLogMail(error, req)
        console.log(error)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** busca la información para la billetera */
controllers.getInfoWallet = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id } = req.params

        /** peticion */
        const data = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(u_id) } })

        const dataMR = await MoneyReportsModel.findAll({ attributes: ['mr_money', 'mr_retire'], where: { u_id: deCode(u_id) } })

        /** respuesta */
        if (data) { return res.json({ success: 1, data, dataMR }) }

        return res.json({ success: 0, message: 'No se ha encontrado resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funcion recursiva para retonar la red del usuario */
const findRed = async data => {
    const item = { ...data, children: [] }

    /** relaciones de base de datos */
    linkBelongsTo(UserRedsModel, UserProfilesModel, 'u_id', 'u_id')
    linkBelongsTo(UserRedsModel, UserPointsModel, 'u_id', 'u_id')
    linkBelongsTo(UserRedsModel, UserMembersModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')

    const result = await UserRedsModel.findAll({
        attributes: ['u_id'],
        include: [
            { attributes: ['up_name', 'up_last'], model: UserProfilesModel, include: [{ attributes: ['c_id', 'c_name'], model: CountriesModel }] },
            { attributes: ['up_point'], model: UserPointsModel },
            { attributes: ['um_datExp'], model: UserMembersModel }
        ],
        where: { u_idRed: deCode(data.u_id) }
    })

    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            const x = result[i]
            if (!!x.userprofile && !!x.userpoint && !!x.usermember) {
                const data = await findRed({ u_id: x.u_id, name: `${x.userprofile.up_name} ${x.userprofile.up_last}`, point: x.userpoint.up_point, country: x.userprofile.country.c_name, member: x.usermember.um_datExp > new Date() })

                item.children.push(data)
            }
        }
    }
    return item
}

/** Busaca a los usuario de red */
controllers.getRedUser = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id } = req.params

        /** relaciones de base de datos */
        linkBelongsTo(UserProfilesModel, UserPointsModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, UserMembersModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')

        /** busca la información del usuario */
        const dataU = await UserProfilesModel.findOne({
            attributes: ['up_name', 'up_last'],
            include: [{ attributes: ['up_point'], model: UserPointsModel }, { attributes: ['um_datExp'], model: UserMembersModel }, { attributes: ['c_id', 'c_name'], model: CountriesModel }],
            where: { u_id: deCode(u_id) }
        })

        /** peticion */
        const data = await findRed({ u_id, name: `${dataU.up_name} ${dataU.up_last}`, point: dataU.userpoint.up_point, country: dataU.country.c_name, member: dataU.usermember.um_datExp > new Date() })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** activa la red del usuario */
controllers.redActiveUser = async (req, res) => {
    try {
        /** variables neceswarias */
        const { u_id } = req.body
        let u_idRed

        /** relaciones de base de datos */
        linkBelongsTo(UserSponsorsModel, UserProfilesModel, 'up_code', 'us_code')

        /** peticion */
        const dataUP = await UserSponsorsModel.findOne({ attributes: ['us_id', 'us_type'], include: [{ attributes: ['u_id', 'u_idTyp'], model: UserProfilesModel }], where: { u_id: deCode(u_id) } })

        if (dataUP) {
            if (dataUP.us_type === 1) u_idRed = await findRedSpace([dataUP.userprofile.u_id])
            else if (dataUP.us_type === 2 || dataUP.us_type === 3) {
                const dataUR = await UserRedsModel.findAll({ attributes: ['u_id'], where: { u_idRed: deCode(dataUP.userprofile.u_id) } })
                if (dataUR.length) {
                    if (dataUP.us_type === 2 && dataUR.length > 1) u_idRed = await findRedSpace([dataUR[1]?.u_id || dataUP.userprofile.u_id])
                    else if (dataUP.us_type === 3) u_idRed = await findRedSpace([dataUR[0]?.u_id || dataUP.userprofile.u_id])
                    else u_idRed = await findRedSpace([dataUP.userprofile.u_id])
                } else u_idRed = await findRedSpace([dataUP.userprofile.u_id])
            } else u_idRed = await findRedSpace([dataUP.userprofile.u_idTyp])
        } else {
            const dataUPR = await UserProfilesModel.findOne({ attributes: ['u_id', 'up_typMod', 'u_idTyp'], where: { up_code: 'Winby' } })
            if (dataUPR.us_type === 1) u_idRed = await findRedSpace([dataUPR.u_id])
            else if (dataUPR.us_type === 2 || dataUPR.us_type === 3) {
                const dataUR = await UserRedsModel.findAll({ attributes: ['u_id'], where: { u_id: deCode(dataUPR.u_id) } })
                if (dataUR.length) {
                    if (dataUPR.us_type === 2) u_idRed = await findRedSpace([dataUR[1]?.u_id || dataUPR.u_id])
                    else if (dataUPR.us_type === 3) u_idRed = await findRedSpace([dataUR[0]?.u_id || dataUPR.u_id])
                } else u_idRed = await findRedSpace([dataUPR.u_id])
            } else u_idRed = await findRedSpace([dataUPR.u_idTyp])
        }

        const dataUR = await UserRedsModel.findOne({ attributes: ['ur_id'], where: { u_id: deCode(u_id) } })
        if (!dataUR) {
            /** registra el usuario en la red */
            UserRedsModel.create({ u_id: deCode(u_id), u_idRed: deCode(u_idRed), ur_state: 1 })
        }
        UserProfilesModel.update({ up_confirm: 2 }, { where: { u_id: deCode(u_id) } })
        /** respuesta */
        return res.json({ success: 1, message: 'Felicitaciones ya puede construir su red de mercadeo.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Cambiar ubicación de red */
controllers.redChangeLocation = async (req, res) => {
    try {
        /** variables neceswarias */
        const { u_id, up_typMod, nameUser } = req.body; let u_idTyp

        if (up_typMod === 4) {
            const dataUP = await UserProfilesModel.findOne({ attributes: ['u_id'], where: { up_code: nameUser } })
            if (dataUP) { u_idTyp = deCode(dataUP.u_id) } else { return res.json({ success: 0, message: 'El usuario al que hara la selección especifica no existe.' }) }
        }

        /** Actualiza el tipo de ubicacion en la red */
        UserProfilesModel.update({ up_typMod, u_idTyp }, { where: { u_id: deCode(u_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Ubicación en red cambiada exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Funcion recursiva para retonar la red del usuario */
const findRedSpace = async (arrayUser) => {
    /** variables necesarias */
    const user = []

    for (let i = 0; i < arrayUser.length; i++) {
        const x = arrayUser[i]
        /** busca si el usuario x tiene dos abajo */
        const data = await UserRedsModel.findAll({ attributes: ['u_id'], where: { u_idRed: deCode(x) } })
        /** comprueba para almacenar y luego volver a ejecutar o retornar */
        if (data.length > 1) { user.push(data[0].u_id, data[1].u_id) } else { return x }
    }

    return await findRedSpace(user)
}

/** Registro de proveedores */
controllers.registerShopPartner = async (req, res) => {
    try {
        /** variables necesarias */
        const { tp_id, v_ideNum, v_alias, v_nit, v_dv, v_name, v_last, v_business, u_phoNum, u_email, u_pass, u_id, ti_id, vl_ideNum, vl_name, vl_email, vl_phone, vl_landline, vl_profession, code } = req.body
        let dataU

        /** verifica si existe el usuario  */
        if (!u_id) {
            const data = await UsersModel.findOne({ attributes: ['u_email', 'u_phoNum'], where: { [Op.or]: { u_email, u_phoNum } } })

            if (data) {
                if (data.u_email === u_email) return res.json({ success: 0, message: 'El correo electrónico ya existe por lo que no es permitido usarlo.' })
                else return res.json({ success: 0, message: 'El número de teléfono ya existe por lo que no es permitido usarlo.' })
            }
        }

        /** Valida si existe el proveedor */
        const queryV = await VendorsModel.findOne({ attributes: ['v_id'], where: { [Op.or]: { v_ideNum: tp_id === 1 ? v_ideNum : 0, v_nit: tp_id === 1 ? 0 : v_nit }, tp_id } })

        if (queryV) { return res.json({ success: 0, message: 'El proveedor ya se encuentra afiliado a nosotros por lo que no es permitido registrarse de nuevo.' }) }

        /** registro de usuario */
        if (u_id) dataU = { u_id }
        else {
            const hash = await bcrypt.hashSync(u_pass, 10)
            dataU = await UsersModel.create({ u_phoNum, u_email, u_pass: hash, uc_id: 3, u_state: 1 })

            /** registra el perfil */
            UserProfilesModel.create({ u_id: deCode(dataU.u_id), up_typMod: 1, up_state: 1 })

            /** registra el dinero */
            UserMoneysModel.create({ u_id: deCode(dataU.u_id), um_money: 0, um_state: 1 })

            /** registra los puntos */
            UserPointsModel.create({ u_id: deCode(dataU.u_id), up_point: 0, up_state: 1 })

            /** registra el dia de membresia */
            UserMembersModel.create({ u_id: deCode(dataU.u_id), um_firstPay: new Date(), um_datExp: new Date(), um_state: 1 })
        }

        /** busca el codigo del usuario por el correo */
        const dataPU = await UserProfilesModel.findOne({ attributes: ['up_typMod'], where: { up_code: code } })

        /** registra al patrocinador */
        UserSponsorVendorsModel.create({ uId: dataU.u_id, usvCode: dataPU ? code : 'Winby' })

        // Crea el skuPrefix
        const v_skuPrefix = await makeUniqueSkuPrefix(VendorsModel, 'v_skuPrefix')

        /** Aliado Comercial */
        const dataV = await VendorsModel.create({ u_id: deCode(dataU.u_id), v_alias, tp_id, v_ideNum: tp_id === 1 ? v_ideNum : undefined, v_nit: tp_id === 1 ? undefined : v_nit, v_dv: tp_id === 1 ? undefined : v_dv, v_business: tp_id === 1 ? undefined : v_business, v_name: tp_id === 1 ? v_name : undefined, v_last: tp_id === 1 ? v_last : undefined, v_state: 2, v_skuPrefix })

        /** Registrar representante legal */
        const dataVL = await VendorLegalsModel.create({ v_id: deCode(dataV.v_id), ti_id: deCode(ti_id), vl_ideNum, vl_name, vl_email, vl_phone, vl_landline, vl_profession, vl_state: 1 })

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha registrado exitosamente.', u_id: dataU.u_id, v_id: dataV.v_id, vl_id: dataVL.vl_id, userName: tp_id === 1 ? `${v_name} ${v_last}` : v_business })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// Permite a un winber ser un aliado
controllers.winberToVendor = async (req, res) => {
    try {
        const { u_id, tp_id, v_ideNum, v_alias, v_nit, v_dv, v_name, v_last, v_business, ti_id, vl_ideNum, vl_name, vl_email, vl_phone, vl_landline, vl_profession } = req.body

        // Información del usuario
        const dataUser = await UsersModel.findOne({ attributes: ['u_email', 'u_phoNum'], where: { u_id: deCode(u_id) } })
        if (!dataUser) return res.json({ success: 0, message: 'Usuario no valido.' })

        // Verfica la información del vendor
        let dataVendor = await VendorsModel.findOne({ attributes: ['v_id'], where: { u_id: deCode(u_id) } })

        // Crea el skuPrefix
        let v_skuPrefix = undefined
        if (!dataVendor) v_skuPrefix = await makeUniqueSkuPrefix(VendorsModel, 'v_skuPrefix')

        dataVendor = await UpCrFind(VendorsModel, {
            u_id: deCode(u_id),
            v_alias,
            tp_id,
            v_ideNum: tp_id === 1 ? v_ideNum : undefined,
            v_nit: tp_id === 1 ? undefined : v_nit,
            v_dv: tp_id === 1 ? undefined : v_dv,
            v_business: tp_id === 1 ? undefined : v_business,
            v_name: tp_id === 1 ? v_name : undefined,
            v_last: tp_id === 1 ? v_last : undefined,
            v_state: 2,
            v_type: dataVendor ? 3 : 4,
            v_skuPrefix
        }, false, { id: 'u_id', value: u_id })
        // Registrar representante legal
        const dataVendorLegal = await VendorLegalsModel.create({ v_id: deCode(dataVendor.v_id), ti_id: deCode(ti_id), vl_ideNum, vl_name, vl_email, vl_phone, vl_landline, vl_profession, vl_state: 1 })
        if (dataVendorLegal) return res.json({ success: 1, message: 'Su solicitud se ha registrado con éxito.', v_id: dataVendor.v_id, vl_id: dataVendorLegal.vl_id })

        return res.json({ success: 0, message: 'Algo ha salido mal.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema, intente nuevamente mas tarde.' })
    }
}

controllers.getStateWinberToVendor = async (req, res) => {
    try {
        const { u_id } = req.body
        const dataVendor = await VendorsModel.findOne({ attributes: ['v_state', 'v_type'], where: { u_id: deCode(u_id) } })
        return res.json({ success: 1, v_state: dataVendor?.v_state || 0 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema, intente nuevamente mas tarde.' })
    }
}

controllers.updateVendorShopImgBanner = async (req, res) => {
    try {
        const { v_id } = req.body

        if (req.files.length) {
            await VendorsModel.update({ v_banner: req.files[0].filename }, { where: { v_id: deCode(v_id) } })
            fse.move(req.files[0].path, path.join(__dirname, `../../../public/vendors/${v_id}/${req.files[0].filename}`))
        }
        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registro de proveedores */
controllers.registerShopPartnerDocuments = async (req, res) => {
    try {
        /** variables necesarias */
        const { v_id, vl_id } = req.body

        if (req.files.length) {
            VendorsModel.update({ v_logo: req.files[0].filename }, { where: { v_id: deCode(v_id) } })
            fse.move(req.files[0].path, path.join(__dirname, `../../../public/vendors/${v_id}/${req.files[0].filename}`))
            for (let i = 1; i < req.files.length; i++) {
                const file = req.files[i]
                VendorLegalDocumentsModel.create({ vl_id: deCode(vl_id), vld_name: file.filename, vld_state: 1 })
                fse.move(file.path, path.join(__dirname, `../../../public/vendors/${v_id}/legals/${vl_id}/${file.filename}`))
            }
        }

        /** respuesta */
        return res.json({ success: 1 })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registro de proveedores */
controllers.editShopPartner = async (req, res) => {
    try {
        /** variables necesarias */
        const { ti_id, tp_id, v_alias, v_banner, v_business, v_dv, v_id, v_ideNum, v_last, v_logo, v_name, v_nit, vl_email, vl_ideNum, vl_landline, vl_name, vl_phone, vl_profession, edit } = req.body

        /** Relación de base de datos */
        linkHasMany(MenuChargesModel, SubMenuChargesModel, 'mc_id', 'mc_id')

        /** Editar Aliado Comercial */
        VendorsModel.update({ v_alias, tp_id, v_ideNum: tp_id === 1 ? v_ideNum : undefined, v_nit: tp_id === 1 ? undefined : v_nit, v_dv: tp_id === 1 ? undefined : v_dv, v_business: tp_id === 1 ? undefined : v_business, v_name: tp_id === 1 ? v_name : undefined, v_last: tp_id === 1 ? v_last : undefined, v_banner, v_logo, v_state: undefined }, { where: { v_id: deCode(v_id) } })

        /** Editar representante legal */
        VendorLegalsModel.update({ v_id: deCode(v_id), ti_id, vl_ideNum, vl_name, vl_email, vl_phone, vl_landline, vl_profession }, { where: { v_id: deCode(v_id) } })

        if (!edit) {
            const dataV = await VendorsModel.findOne({ attributes: ['u_id'], where: { v_id: deCode(v_id) } })

            /** Busca el menu y sub menu del cargo del usuario  */
            const dataMC = await MenuChargesModel.findAll({ attributes: ['m_id'], include: [{ attributes: ['sm_id'], model: SubMenuChargesModel }], where: { uc_id: 3 } })

            if (dataMC.length) {
                for (let i = 0; i < dataMC.length; i++) {
                    const x = dataMC[i]
                    const dataUM = await UpCrFind(UserMenusModel, { m_id: x.m_id, u_id: deCode(dataV.u_id), um_state: 1 }, { m_id: x.m_id, u_id: deCode(dataV.u_id) })
                    if (x.submenucharges.length) x.submenucharges.map((y) => UpCrFind(UserSubMenusModel, { sm_id: y.sm_id, um_id: deCode(dataUM.um_id), usm_state: 1 }, { sm_id: y.sm_id, um_id: deCode(dataUM.um_id) }))
                }
            }
        }

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha editado exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// Registra la identificación del usuario
controllers.registerIdentities = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, up_ideNum } = req.body

        /** actualiza el perfil del usuario */
        UserProfilesModel.update({ up_ideNum }, { where: { u_id: deCode(u_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha editado exitosamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/**
 * Actualiza la dirección de envio del usuario en la tienda.
 * @param {Object} req Objeto con la información de la solicitud
 * @param {Object} res Objeto con la información de respuedta
 * @version 1.0
 * @return {Object} Json con la respuesta de la solicitud.
 */
controllers.updateUserDelivery = async (req, res) => {
    try {
        const { u_id, c_id, d_id, m_id, up_location, up_lat, up_lon } = req.body

        const data = await UserProfilesModel.findOne({ attributes: ['up_id'], include: [{ attributes: ['u_id'], model: UsersModel, where: { u_state: 1 } }], where: { up_state: 1 } })
        if (!data) return res.json({ success: 0, message: 'El usuario no existe.' })

        const dataUP = await UserProfilesModel.update({ c_id: deCode(c_id), d_id: deCode(d_id), m_id: deCode(m_id), up_location, up_lat, up_lon }, { where: { u_id: deCode(u_id) } })
        if (dataUP) return res.json({ success: 1, message: 'Se ha actualizado la dirección de envio.' })

        return res.json({ success: 0, message: 'Algo ha salido mal, intente nuevamente.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

/**
 * Activa el stock de productos y servicios de un winber
 * @param {Object} req Informacipon de la petición
 * @param {Object} res Información de respuesta
 * @author Hugo Gutierrez
 * @returns {Object} respuesta
 */
controllers.activeWinberStock = async (req, res) => {
    try {
        const { u_id } = req.body
        // Buscar el perfil del usuario
        const dataProfile = await UserProfilesModel.findOne({ attributes: ['up_name', 'up_last', 'up_franchise', 'up_wstock'], where: { u_id: deCode(u_id) } })
        if (!dataProfile) return res.json({ success: 0, message: 'Usuario no valido.' })
        if (dataProfile.up_franchise !== 1) return res.json({ success: 0, message: 'Usted no tiene una licencia activa.' })
        if (dataProfile.up_wstock === 1) return res.json({ success: 0, message: 'Usted ya tiene activo el stock.' })

        // Genera el skuPrefix del aliado
        const v_skuPrefix = await makeUniqueSkuPrefix(VendorsModel, 'v_skuPrefix')
        // Registro en vendors
        const dataVendor = await VendorsModel.create({ u_id: deCode(u_id), v_alias: 'Winber Store', v_type: 2, v_state: 0, v_skuPrefix })

        // Actualizar su menu
        if (dataVendor) {
            linkHasMany(MenuChargesModel, SubMenuChargesModel, 'mc_id', 'mc_id')
            linkHasMany(UsersModel, UserMenusModel, 'u_id', 'u_id')
            linkHasMany(UserMenusModel, UserSubMenusModel, 'um_id', 'um_id')

            // Buscando todos los menuCharges
            const menuCharges = await MenuChargesModel.findAll({ attributes: ['m_id', 'uc_id'], include: [{ attributes: ['sm_id'], model: SubMenuChargesModel }], where: { uc_id: 3 } })

            // Se Obtiene el menu actual del usuario
            const dataUserMenu = await UsersModel.findOne({
                attributes: ['u_id'],
                include: [{ attributes: ['m_id', 'um_id'], model: UserMenusModel, include: [{ attributes: ['sm_id'], model: UserSubMenusModel }] }],
                where: { u_id: deCode(u_id) }
            })

            for (let ii = 0; ii < menuCharges.length; ii++) {
                const y = menuCharges[ii]
                const findUM = dataUserMenu.usermenus?.find(v => v.m_id === y.m_id)
                if (findUM) {
                    for (let iii = 0; iii < y?.submenucharges.length; iii++) {
                        const z = y?.submenucharges[iii]
                        const findSM = findUM.usersubmenus?.find(v => v.sm_id === z.sm_id)
                        if (!findSM) UserSubMenusModel.create({ sm_id: deCode(z.sm_id), um_id: deCode(findUM.um_id), usm_state: 1 })
                    }
                } else {
                    const dataUM = await UserMenusModel.create({ m_id: y.m_id, u_id: deCode(dataUserMenu.u_id), um_state: 1 })
                    for (let iii = 0; iii < y?.submenucharges.length; iii++) {
                        const z = y?.submenucharges[iii]
                        await UserSubMenusModel.create({ sm_id: deCode(z.sm_id), um_id: deCode(dataUM.um_id), usm_state: 1 })
                    }
                }
            }

            // Actulizar estado
            await UserProfilesModel.update({ up_wstock: 1 }, { where: { u_id: deCode(u_id) } })
            return res.json({ success: 1, message: 'Stock activado correctamente.', data: { v_id: dataVendor.v_id } })
        }
        return res.json({ success: 0, message: 'No se ha podido realizar la operación' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

controllers.getUserPoints = async (req, res) => {
    try {
        const { u_id } = req.body
        linkBelongsTo(UserProfilesModel, UserPointsModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, UserMembersModel, 'u_id', 'u_id')
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')

        const sumPoints = data => {
            let sum = data.point
            for (let i = 0; i < data.children.length; i++) {
                const child = data.children[i]
                sum += sumPoints(child)
            }
            return sum
        }

        /** busca la información del usuario */
        const dataU = await UserProfilesModel.findOne({
            attributes: ['up_name', 'up_last'],
            include: [{ attributes: ['up_point'], model: UserPointsModel }, { attributes: ['um_datExp'], model: UserMembersModel }, { attributes: ['c_id', 'c_name'], model: CountriesModel }],
            where: { u_id: deCode(u_id) }
        })

        /** peticion */
        const data = await findRed({ u_id, name: `${dataU.up_name} ${dataU.up_last}`, point: dataU.userpoint.up_point, country: dataU.country.c_name, member: dataU.usermember.um_datExp > new Date() })

        const up_point = data.point
        const totalPoints = sumPoints(data)
        return res.json({ success: 1, data: { up_point, totalPoints } })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, message: 'Algo ha salido mal, por favor intente nuevamente.' })
    }
}

controllers.getUserBonus = async (req, res) => {
    try {
        const { u_id, min, max } = req.body

        linkBelongsTo(MoneyNetworkUsersModel, MoneyNetworkDatesModel, 'mnd_id', 'mnd_id')
        linkBelongsTo(UserManagersModel, TypeManagersModel, 'tmId', 'tmId')

        const data = await MoneyNetworkUsersModel.findAll({
            attributes: ['mnu_id', 'mnu_dirSell', 'mnu_dirSellFran', 'mnu_dirSellFranTo', 'mnu_g25', 'mnu_point', 'mnu_totPoi', 'mnu_min', 'mnu_max', 'mnu_manager', 'mnu_director', 'mnu_dirDir', 'mnu_dirWor'],
            include: [
                { attributes: ['mnd_datIni', 'mnd_datEnd'], model: MoneyNetworkDatesModel }
            ],
            where: { u_id: deCode(u_id), mnu_state: 1 },
            order: [['mnu_id', 'DESC']],
            limit: [min || 0, max || 20]
        })

        const dataG25 = await UserNetworkLiquidationsModel.findOne({ attributes: ['u_id'], where: { u_id: deCode(u_id), unl_state: 1, unl_type: 1 } })
        const dataManager = await UserManagersModel.findOne({ attributes: ['umId', 'uId', 'tmId'], include: [{ attributes: ['tmId', 'tmName', 'tmType'], model: TypeManagersModel }], where: { uId: deCode(u_id), umState: 1 } })

        if (!data.length) return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
        return res.json({ success: 1, data, isG25: !!dataG25?.u_id, dataManager })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

// controllers.getPermissions = async (req, res) => {
//     try {
//         let { u_id } = req.body
//         u_id = enCode(u_id)
//         const user = await UsersModel.findOne({ attributes: ['u_id', 'uc_id'], where: { u_id: deCode(u_id), u_state: 1 } })
//         if (!user) return res.json({ success: 0, message: 'Usuario invalido.' })

//         // Buscar información de la membresia
//         const userMember = await UserMembersModel.findOne({ attributes: ['um_datExp'], where: { u_id: deCode(u_id) } })

//         // Validar si tiene membresia activa
//         const now = new Date()
//         const memberExpired = new Date(userMember.um_datExp)
//         const isActveMember = now <= memberExpired

//         linkBelongsTo(UserMenusModel, MenusModel, 'm_id', 'm_id')
//         linkBelongsTo(MenusModel, MenuChargesModel, 'm_id', 'm_id')
//         linkHasMany(UserMenusModel, UserSubMenusModel, 'um_id', 'um_id')
//         linkBelongsTo(UserSubMenusModel, SubMenusModel, 'sm_id', 'sm_id')
//         linkBelongsTo(SubMenusModel, SubMenuChargesModel, 'sm_id', 'sm_id')
//         linkBelongsTo(SubMenuChargesModel, MenuChargesModel, 'mc_id', 'mc_id')

//         const menus = await UserMenusModel.findAll({
//             attributes: ['um_id'],
//             include: [
//                 {
//                     attributes: ['m_id', 'm_name', 'm_path'],
//                     include: [{ attributes: ['mc_id'], model: MenuChargesModel, where: isActveMember ? { uc_id: { [Op.gt]: 0 } } : { uc_id: { [Op.not]: 2 } }, required: true }],
//                     model: MenusModel,
//                     where: { m_state: 1 }
//                 },
//                 {
//                     attributes: ['usm_id'],
//                     model: UserSubMenusModel,
//                     order: [[SubMenusModel, 'sm_priority', 'ASC']],
//                     include: [
//                         {
//                             attributes: ['sm_id', 'sm_name', 'sm_path', 'sm_priority'],
//                             include: [
//                                 {
//                                     attributes: ['smc_id'],
//                                     model: SubMenuChargesModel,
//                                     include: [{ attributes: ['mc_id'], model: MenuChargesModel, where: isActveMember ? { uc_id: { [Op.gt]: 0 } } : { uc_id: { [Op.not]: 2 } }, required: true }]
//                                 }
//                             ],
//                             model: SubMenusModel,
//                             where: { sm_state: 1 }
//                         }
//                     ]
//                 }
//             ],
//             where: { u_id: deCode(u_id), um_state: 1 },
//             order: [[MenusModel, 'm_priority', 'ASC']]
//         })

//         return res.json({ isActveMember, menus })
//     } catch (e) {
//         return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente' })
//     }
// }

module.exports = controllers