const controllers = {}
const AdminMoneysModel = require('../../models/admin/AdminMoneysModel')
const AdminMoneyReportsModel = require('../../models/admin/AdminMoneyReportsModel')
const { Op } = require('sequelize')
const { linkBelongsTo } = require('../../utils')
const UsersModel = require('../../models/users/UsersModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')

controllers.getAdminMoney = async (req, res) => {
    try {
        const data = await AdminMoneysModel.findOne({ attributes: ['am_amount'], where: { am_id: { [Op.gt]: 0 } } })
        if (data) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un error, por favor intentente nuevamente.' })
    }
}

controllers.getAllAdminMoneyReports = async (req, res) => {
    try {
        const { min, max } = req.body

        linkBelongsTo(AdminMoneyReportsModel, UsersModel, 'u_id', 'u_id')
        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')

        const data = await AdminMoneyReportsModel.findAll({
            attributes: ['amr_id', 'amr_amount', 'amr_type', 'amr_total', 'amr_total', 'amr_utility', 'amr_gain', 'amr_retire', 'amr_state', 'amr_datCre'],
            include: [{ attributes: ['u_id'], model: UsersModel, include: [{ attributes: ['up_name', 'up_last'], model: UserProfilesModel }] }],
            order: [['amr_datCre', 'DESC']],
            limit: [min || 0, max || 20]
        })

        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers