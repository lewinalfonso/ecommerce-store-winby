const controllers = {}
const VendorsModel = require('../../models/vendors/VendorsModel')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const CountriesModel = require('../../models/info/CountriesModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const { deCode, linkBelongsTo, linkHasMany, UpCrFind } = require('../../utils')
const { Op, fn } = require('sequelize')
const VendorLegalsModel = require('../../models/vendors/VendorLegalsModel')
const VendorLegalDocumentsModel = require('../../models/vendors/VendorLegalDocumentsModel')
const MenuChargesModel = require('../../models/info/MenuChargesModel')
const SubMenuChargesModel = require('../../models/info/SubMenuChargesModel')
const UserMenusModel = require('../../models/users/UserMenusModel')
const UserSubMenusModel = require('../../models/users/UserSubMenusModel')
const ProductsModel = require('../../models/products/ProductsModel')
const ServicesModel = require('../../models/services/ServicesModel')
const TypeDeliveryCostsModel = require('../../models/info/TypeDeliveryCostsModel')
const UsersModel = require('../../models/users/UsersModel')
const { UserProfilesModel } = require('../../models')

/** buscar todos los aliados comerciales */
controllers.getAllVendors = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { v_state, min, max, info } = req.body
        let attributes = ['v_id', 'v_alias', 'v_logo', 'v_banner'], limit

        if (info) attributes = ['v_id', 'v_alias', 'tp_id', 'v_ideNum', 'v_nit', 'v_dv', 'v_business', 'v_name', 'v_last', 'v_logo', 'v_banner', 'v_state']

        if (max) limit = [min, max]

        /** verificando que parametro es para hacer la consulta */
        const data = await VendorsModel.findAll({
            attributes,
            where: { v_state: v_state !== 'false' ? v_state : { [Op.gte]: 0 }, v_type: { [Op.or]: [1, 3, 4] } },
            limit
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** buscar todos los aliados comerciales */
controllers.getOneVendors = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { v_id, v_state } = req.body

        const data = await VendorsModel.findOne({
            attributes: ['v_id', 'u_id', 'v_alias', 'tp_id', 'v_ideNum', 'v_nit', 'v_dv', 'v_business', 'v_name', 'v_last', 'v_logo', 'v_banner', 'v_state', 'v_type'],
            where: { v_id: deCode(v_id), v_state: v_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** información legal del vendedor */
controllers.getOneLegalVendor = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { v_id } = req.body

        const data = await VendorLegalsModel.findOne({
            attributes: ['vl_id', 'ti_id', 'vl_ideNum', 'vl_name', 'vl_email', 'vl_phone', 'vl_profession', 'vl_landline', 'vl_state'],
            where: { v_id: deCode(v_id) }
        })
        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema, intente mas tarde.' })
    }
}

/** documentos del vendedor */
controllers.getAllDocVendorLegal = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { vl_id } = req.body

        const data = await VendorLegalDocumentsModel.findAll({
            attributes: ['vld_id', 'vld_name'],
            where: { vl_id: deCode(vl_id), vld_state: 1 }
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema, intente mas tarde.' })
    }
}

controllers.getOneLocal = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { vl_id, vl_state } = req.params
        /** verificando que parametro es para hacer la consulta */
        const data = await VendorsLocalsModel.findOne({
            attributes: ['vl_id', 'vl_name', 'vl_phoMob', 'vl_landline', 'vl_email', 'vl_contact', 'vl_address', 'vl_lat', 'vl_lon', 'vl_domLoc', 'vl_domNat', 'vl_domFre', 'vl_cosKM', 'vl_state'],
            include: [
                { attributes: ['c_id', 'c_name'], model: CountriesModel },
                { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel },
                { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' },
                { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }
            ],
            where: { vl_id: deCode(vl_id), vl_state: vl_state !== 'false' ? vl_state : { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Buscar todos los locales por vendedor */
controllers.getAllLocal = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { v_id, vl_state, all } = req.params

        /** Relacion de base de datos */

        /** verificando que parametro es para hacer la consulta */
        const data = await VendorsLocalsModel.findAll({
            attributes: ['vl_id', 'vl_name', 'vl_contact', 'vl_state'],
            include: [
                { attributes: ['c_id', 'c_name'], model: CountriesModel },
                { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel },
                { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'localDelivery' },
                { attributes: ['tdc_id', 'tdc_type', 'tdc_name'], model: TypeDeliveryCostsModel, as: 'nationalDelivery' }
            ],
            where: { v_id: all ? { [Op.gt]: 0 } : deCode(v_id), vl_state: vl_state !== 'false' ? vl_state : { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data.length) { return res.json({ success: 1, data }) }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Devuelve una lista de 20 Aliados Comerciales Aleatorios */
controllers.getTwenty = async (req, res) => {
    const { v_state } = req.params; const error = false

    /** verificando que parametro es para hacer la consulta */
    const data = await VendorsModel.findAll({
        attributes: ['v_id', 'v_alias', 'v_ideNum', 'v_nit', 'v_dv', 'v_business', 'v_name', 'v_last', 'v_logo'],
        where: { v_state: v_state !== 'false' ? v_state : { [Op.gte]: 0 } },
        order: fn('RAND'),
        limit: 20
    })

    /** respuesta */
    if (error) { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) } else if (data.length) { return res.json({ success: 1, data }) } else { return res.json({ success: 0, error, message: 'No se ha encontrado ningún resultado.' }) }
}

/** Registro de Local de un vendedor */
controllers.registerLocal = async (req, res) => {
    try {
        /** variables necesarias */
        const { u_id, vl_name, vl_phoMob, vl_landline, vl_email, vl_contact, vl_lat, vl_lon, tdc_idLoc, tdc_idNat, vl_domFre, vl_cosKM, vl_domLoc, vl_domNat, c_id, d_id, m_id, vl_address } = req.body

        /** busca si el vendedor existe */
        const dataV = await VendorsModel.findOne({ attributes: ['v_id'], where: { u_id: deCode(u_id) } })
        if (dataV) {
            const data = await VendorsLocalsModel.create({
                v_id: deCode(dataV.v_id),
                vl_name,
                vl_phoMob,
                vl_landline,
                vl_email,
                vl_contact,
                c_id: deCode(c_id),
                d_id: deCode(d_id),
                m_id: deCode(m_id),
                vl_address, vl_lat,
                vl_lon,
                tdc_idLoc: deCode(tdc_idLoc),
                tdc_idNat: deCode(tdc_idNat),
                vl_domFre: vl_domFre || undefined,
                vl_cosKM: vl_cosKM || undefined,
                vl_domLoc: vl_domLoc || undefined,
                vl_domNat: vl_domNat || undefined,
                vl_state: 1
            })

            if (data) { return res.json({ success: 1, vl_id: data.vl_id, message: 'Registro de local exito.' }) }
        }

        /** respuesta */
        return res.json({ success: 0, message: 'No tiene permisos para registrar un local.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Registro de Local de un vendedor */
controllers.editLocal = async (req, res) => {
    try {
        /** variables necesarias */
        const { vl_id, vl_name, vl_phoMob, vl_landline, vl_email, vl_contact, c_id, d_id, m_id, vl_address, vl_lat, vl_lon, tdc_idLoc, tdc_idNat, vl_domFre, vl_cosKM, vl_domLoc, vl_domNat } = req.body
        /** busca si el vendedor existe */
        await VendorsLocalsModel.update({
            vl_name,
            vl_phoMob,
            vl_landline,
            vl_email,
            vl_contact,
            c_id: deCode(c_id),
            d_id: deCode(d_id),
            m_id: deCode(m_id),
            vl_address,
            vl_lat,
            vl_lon,
            tdc_idLoc: deCode(tdc_idLoc),
            tdc_idNat: deCode(tdc_idNat),
            vl_domFre: vl_domFre || undefined,
            vl_cosKM: vl_cosKM || undefined,
            vl_domLoc: vl_domLoc || undefined,
            vl_domNat: vl_domNat || undefined
        }, { where: { vl_id: deCode(vl_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Local modificado exitosamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Aceptar o Cancelar un vendedor */
controllers.changeStatusVendor = async (req, res) => {
    try {
        /** variables necesarias */
        const { v_id, v_state } = req.body
        /** Relación de base de datos */
        linkHasMany(MenuChargesModel, SubMenuChargesModel, 'mc_id', 'mc_id')

        const dataV = await VendorsModel.findOne({ attributes: ['u_id', 'v_type'], where: { v_id: deCode(v_id) } })
        /** Registra la categoria de servicios al vendedor */
        VendorsModel.update({ v_state, v_type: v_state ? 1 : undefined }, { where: { v_id: deCode(v_id) } })

        /** Busca el menu y sub menu del cargo del usuario  */
        if (v_state) {
            if (dataV.v_type > 1) await UserProfilesModel.update({ up_wstock: 1 }, { where: { u_id: deCode(dataV.u_id) } })
            const dataMC = await MenuChargesModel.findAll({ attributes: ['m_id'], include: [{ attributes: ['sm_id'], model: SubMenuChargesModel }], where: { uc_id: 3 } })
            for (let i = 0; i < dataMC.length; i++) {
                const { m_id, submenucharges } = dataMC[i]
                const dataUM = await UpCrFind(UserMenusModel, { m_id, u_id: deCode(dataV.u_id), um_state: 1 }, { m_id, u_id: deCode(dataV.u_id) })
                for (let ii = 0; ii < submenucharges.length; ii++) {
                    const { sm_id } = submenucharges[ii]
                    UpCrFind(UserSubMenusModel, { sm_id: deCode(sm_id), um_id: deCode(dataUM.um_id), usm_state: 1 }, { sm_id: deCode(sm_id), um_id: deCode(dataUM.um_id) })
                }
            }
            // Actulizaqr los productos que montó
            ProductsModel.update({ p_typeVen: 1 }, { where: { v_id: deCode(v_id) } })
            ServicesModel.update({ s_typeVen: 1 }, { where: { v_id: deCode(v_id) } })
        } else {
            ProductsModel.update({ p_state: 0 }, { where: { v_id: deCode(v_id) } })
            ServicesModel.update({ s_state: 0 }, { where: { v_id: deCode(v_id) } })
        }

        /** respuesta */
        return res.json({ success: 1, message: v_state ? 'Se ha aceptado al vendedor.' : 'Se ha rechazado al vendedor.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.upateMenuUsers = async (req, res) => {
    try {
        const { uc_id } = req.body
        if (!uc_id) return res.json({ success: 0, message: 'Se requiere el uc_id.' })
        linkHasMany(MenuChargesModel, SubMenuChargesModel, 'mc_id', 'mc_id')
        linkHasMany(UsersModel, UserMenusModel, 'u_id', 'u_id')
        linkHasMany(UserMenusModel, UserSubMenusModel, 'um_id', 'um_id')

        // Buscando todos los menuCharges
        const menuCharges = await MenuChargesModel.findAll({ attributes: ['m_id', 'uc_id'], include: [{ attributes: ['sm_id'], model: SubMenuChargesModel }], where: { uc_id } })

        // Se Obtienen todos los usuarios con el tipo de cargo actual en la iteración
        const users = await UsersModel.findAll({
            attributes: ['u_id'],
            include: [{ attributes: ['m_id', 'um_id'], model: UserMenusModel, include: [{ attributes: ['sm_id'], model: UserSubMenusModel }] }],
            where: { uc_id }
        })
        // return res.json({ menuCharges })
        for (let i = 0; i < users.length; i++) {
            const x = users[i]
            for (let ii = 0; ii < menuCharges.length; ii++) {
                const y = menuCharges[ii]
                const findUM = x.usermenus?.find(v => v.m_id === y.m_id)
                if (findUM) {
                    for (let iii = 0; iii < y?.submenucharges.length; iii++) {
                        const z = y?.submenucharges[iii]
                        const findSM = findUM.usersubmenus?.find(v => v.sm_id === z.sm_id)
                        if (!findSM) UserSubMenusModel.create({ sm_id: deCode(z.sm_id), um_id: deCode(findUM.um_id), usm_state: 1 })
                    }
                } else {
                    const dataUM = await UserMenusModel.create({ m_id: y.m_id, u_id: deCode(x.u_id), um_state: 1})
                    for (let iii = 0; iii < y?.submenucharges.length; iii++) {
                        const z = y?.submenucharges[iii]
                        await UserSubMenusModel.create({ sm_id: deCode(z.sm_id), um_id: deCode(dataUM.um_id), usm_state: 1 })
                    }
                }
            }
        }

        return res.json({ success: 1, message: 'Todo bien todo correcto.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Error interno.' })
    }
}

module.exports = controllers