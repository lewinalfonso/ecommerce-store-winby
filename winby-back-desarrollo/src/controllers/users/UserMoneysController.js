const controllers = {}
const UserMoneysModel = require('../../models/users/UserMoneysModel')
const UsersModel = require('../../models/users/UsersModel')
const MoneyReportsModel = require('../../models/users/MoneyReportsModel')
const { Op } = require('sequelize')
const { deCode, linkBelongsTo } = require('../../utils')

/** Busca un registro */
controllers.getOne = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { u_id, um_state } = req.body

        /** Relacion de base de datos */
        linkBelongsTo(UserMoneysModel, UsersModel, 'u_id', 'u_id')

        /** verificando que parametro es para hacer la consulta */
        const data = await UserMoneysModel.findOne({ attributes: ['um_id', 'um_money', 'um_state'], where: { u_id: deCode(u_id), um_state: um_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** Retirar Dinero */
controllers.withdrawals = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { um_money, u_id, mr_type, ube_id, u_email } = req.body; let dataU, vEmail
        let money = parseInt(um_money)
        /** Verifica que el email a transferir no sea mismo del usuario que hace la transferencia */
        if (mr_type === 2) vEmail = await UsersModel.findOne({ attributes: ['u_email'], where: { u_id: deCode(u_id), u_email } })
        if (vEmail && mr_type === 2) return res.json({ success: 0, message: 'Operación no valida.' })

        /** busca el dinero del usuario */
        const data = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(u_id) } })
        if (!data) return res.json({ success: 0, message: 'El usuario no existe.' })

        /** verifica si es tipo de transferencia a tercero */
        if (mr_type === 2) dataU = await UsersModel.findOne({ attributes: ['u_id'], where: { u_email } })

        /** confirma si existe el usuario a transferir */
        if (!dataU && mr_type === 2) return res.json({ success: 0, message: 'La persona que desea transferir el dinero no existe!.' })

        if (money <= data.um_money && money > 0) {
            /** actualiza el dinero del usuario restandole el monto solicitado */
            UserMoneysModel.update({ um_money: (data.um_money - money) }, { where: { u_id: deCode(u_id) } })

            /** hace un reporte de solicitud de dinero */
            MoneyReportsModel.create({ u_id: deCode(u_id), ube_id: ube_id ? deCode(ube_id) : undefined, mr_money: data.um_money, mr_type, mr_retire: money, uIdConfirm: dataU ? deCode(dataU.u_id) : undefined, mr_state: mr_type === 2 ? 1 : 2 })

            if (mr_type === 2) {
                /** busca el dinero del usuario al que se transfirio */
                const dataUM = await UserMoneysModel.findOne({ attributes: ['um_money'], where: { u_id: deCode(dataU.u_id) } })
                /** actualiza el dinero del usuario restandole el monto solicitado */
                UserMoneysModel.update({ um_money: (dataUM.um_money + money) }, { where: { u_id: deCode(dataU.u_id) } })
                /** hace un reporte de solicitud de dinero */
                MoneyReportsModel.create({ u_id: deCode(dataU.u_id), mr_money: dataUM.um_money, mr_type: 4, mr_confirm: money, uIdConfirm: deCode(u_id), mr_state: 1 })
            }
        } else return res.json({ success: 0, message: 'No posee saldo suficiente para realizar esta operación!.' })

        /** respuesta */
        return res.json({ success: 1, data, message: 'Transacción Exitosa!.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers