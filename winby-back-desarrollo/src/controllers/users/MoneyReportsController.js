const controllers = {}
const MoneyReportsModel = require('../../models/users/MoneyReportsModel')
const UsersModel = require('../../models/users/UsersModel')
const { deCode, linkBelongsTo } = require('../../utils')
const UserBankEntitiesModel = require('../../models/users/UserBankEntitiesModel')
const { Op } = require('sequelize')
const AdminMoneyReportsModel = require('../../models/admin/AdminMoneyReportsModel')
const AdminMoneysModel = require('../../models/admin/AdminMoneysModel')
const InvoicesModel = require('../../models/invoice/InvoicesModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const TypeBanksModel = require('../../models/info/TypeBanksModel')
const AccountTypesModel = require('../../models/info/AccountTypesModel')
const { UserMoneysModel } = require('../../models')
const { errorLogMail } = require('../../utils/logMailer')

// Busca un registro
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { u_id, mr_retire, mr_type, mr_state, min, max } = req.body
        let where = {}, limit

        /** Relacion de base de datos */
        linkBelongsTo(MoneyReportsModel, UsersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(MoneyReportsModel, UserBankEntitiesModel, 'ube_id', 'ube_id')
        linkBelongsTo(MoneyReportsModel, InvoicesModel, 'i_id', 'i_id')

        if (u_id) where = { ...where, u_id: deCode(u_id) }
        if (mr_retire) where = { ...where, mr_retire: { [Op.not]: null } }
        if (mr_type) where = { ...where, mr_type }
        if (mr_state) where = { ...where, mr_state }

        if (max) limit = [min, max]

        /** verificando que parametro es para hacer la consulta */
        const data = await MoneyReportsModel.findAll({
            attributes: ['mr_id', 'mr_money', 'mr_retire', 'mr_confirm', 'mr_type', 'mr_state', 'mr_datCre'],
            include: [
                { attributes: ['u_email'], model: UsersModel, include: [{ attributes: ['up_name', 'up_last'], model: UserProfilesModel }] },
                { attributes: ['ube_alias'], model: UserBankEntitiesModel },
                { attributes: ['i_id', 'i_consecutive'], model: InvoicesModel }
            ],
            where,
            limit,
            order: [['mr_datCre', 'DESC']]
        })
        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.getWithdrawalRequests = async (req, res) => {
    try {
        const { mr_state, min, max, count } = req.body
        let limit

        /** Relacion de base de datos */
        linkBelongsTo(MoneyReportsModel, UsersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(MoneyReportsModel, UserBankEntitiesModel, 'ube_id', 'ube_id')
        linkBelongsTo(UserBankEntitiesModel, TypeBanksModel, 'tb_id', 'tb_id')
        linkBelongsTo(UserBankEntitiesModel, AccountTypesModel, 'at_id', 'at_id')

        if (max) limit = [min || 0, max]

        /** verificando que parametro es para hacer la consulta */
        const data = await MoneyReportsModel.findAll({
            attributes: ['mr_id', 'mr_money', 'mr_retire', 'mr_confirm', 'mr_type', 'mr_state', 'mr_datCre', 'mr_datMod'],
            include: [
                { attributes: ['u_email', 'u_id'], model: UsersModel, include: [{ attributes: ['up_name', 'up_last', 'up_ideNum'], model: UserProfilesModel }] },
                {
                    attributes: ['ube_id', 'ube_alias', 'ube_accNum', 'ube_hash', 'ube_cerBank'],
                    include: [
                        { attributes: ['tb_id', 'tb_name'], model: TypeBanksModel },
                        { attributes: ['at_id', 'at_name'], model: AccountTypesModel }
                    ],
                    model: UserBankEntitiesModel
                },
            ],
            where: { mr_state: mr_state !== undefined ? mr_state : { [Op.gte]: 0 }, mr_type: 1 },
            limit,
            order: [['mr_datCre', 'DESC']]
        })
        /** respuesta */
        if (data.length) {
            let total = 0
            if (count) {
                const dataCount = await MoneyReportsModel.count({ where: { mr_state: mr_state !== undefined ? mr_state : { [Op.gte]: 0 }, mr_type: 1 } })
                total = dataCount
            }
            return res.json({ success: 1, data, count: total })
        }

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (e) {
        errorLogMail(e, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema, intente nuevamente mas tarde.' })
    }
}

controllers.withdrawalChangeState = async (req, res) => {
    try {
        /** Recibimiento de parámetros */
        const { mr_id, mr_state } = req.body
        /** Se actualiza el estado del retiro */
        await MoneyReportsModel.update({ mr_state }, { where: { mr_id: deCode(mr_id) } })
        /** Se obtiene la información de retiro */
        const dataRetire = await MoneyReportsModel.findOne({ attributes: ['u_id', 'mr_retire'], where: { mr_id: deCode(mr_id) } })

        /** Se se acepta el retiro se actualiza el saldo de winby */
        if (mr_state === 1) {
            /** Se obtiene el saldo total */
            const dataBalance = await AdminMoneysModel.findOne({ attributes: ['am_id', 'am_amount'] })
            /** Se genera el reporte */
            await AdminMoneyReportsModel.create({ u_id: dataRetire.u_id, amr_amount: dataBalance.am_amount, amr_retire: dataRetire.mr_retire, amr_state: 1 })
            /** Se descuenta el del saldo general */
            await AdminMoneysModel.update({ am_amount: (dataBalance.am_amount - dataRetire.mr_retire) }, { where: { am_id: deCode(dataBalance.am_id) } })
        } if (mr_state === 0) {
            // Si se rechaza el retiro se regresa el dinero al usuario
            const userBalance = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: dataRetire.u_id } })
            UserMoneysModel.update({ um_money: (userBalance.um_money + dataRetire.mr_retire) }, { where: { u_id: dataRetire.u_id } })
        }
        return res.json({ success: 1, message: `Se ha ${ mr_state === 1 ? 'aceptado' : mr_state === 0 ? 'rechazado' : 'actulizado' } el retiro` })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers