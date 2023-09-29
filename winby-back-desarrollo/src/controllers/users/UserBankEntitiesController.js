const controllers = {}
const fse = require('fs-extra')
const path = require('path')
const UserBankEntitiesModel = require('../../models/users/UserBankEntitiesModel')
const AccountTypesModel = require('../../models/info/AccountTypesModel')
const TypeBanksModel = require('../../models/info/TypeBanksModel')
const TypeCryptocurrenciesModel = require('../../models/info/TypeCryptocurrenciesModel')
const { Op } = require('sequelize')
const { deCode, linkBelongsTo, UpCrNotFind } = require('../../utils')

/** Busca todo los registro */
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { u_id, ube_state } = req.body
        /** Relacion de base de datos */
        linkBelongsTo(UserBankEntitiesModel, TypeBanksModel, 'tb_id', 'tb_id')
        linkBelongsTo(UserBankEntitiesModel, AccountTypesModel, 'at_id', 'at_id')
        linkBelongsTo(UserBankEntitiesModel, TypeCryptocurrenciesModel, 'tc_id', 'tc_id')

        /** verificando que parametro es para hacer la consulta */
        const data = await UserBankEntitiesModel.findAll({
            attributes: ['ube_id', 'ube_alias', 'ube_accNum', 'ube_hash', 'ube_cerBank', 'ube_type'],
            include: [
                { attributes: ['tb_id', 'tb_name'], model: TypeBanksModel },
                { attributes: ['at_id', 'at_name'], model: AccountTypesModel },
                { attributes: ['tc_id', 'tc_name'], model: TypeCryptocurrenciesModel }
            ],
            where: { u_id: u_id ? deCode(u_id) : { [Op.gte]: 0 }, ube_state: ube_state || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

/** eliminar categorias de servicio en la tienda */
controllers.delete = async (req, res) => {
    try {
        /** variables necesarias */
        const { ube_id } = req.body

        /** elimina la Entidad Bancaria del Usuario */
        await UserBankEntitiesModel.update({ ube_state: 0 }, { where: { ube_id: deCode(ube_id) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha eliminado el tipo de entidad Bancaria.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.register = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { ube_id, u_id, tb_id, at_id, tc_id, ube_alias, ube_accNum, ube_hash, ube_type } = req.body

        /** registrar Entidad Bancaria de Usuario */
        const data = await UpCrNotFind(UserBankEntitiesModel, { u_id: deCode(u_id), tb_id: tb_id ? deCode(tb_id) : undefined, at_id: at_id ? deCode(at_id) : undefined, tc_id: tc_id ? deCode(tc_id) : undefined, ube_alias, ube_accNum, ube_hash, ube_cerBank: req.file ? req.file.filename : undefined, ube_type, ube_state: 1 }, false, !!ube_id && { id: 'ube_id', value: ube_id })
        /** mueve el archivo subido a una carpeta */
        if (!!data && !!req.file) fse.move(req.file.path, path.join(__dirname, `../../../public/users/${ u_id }/banks/${ data.ube_id }/${ req.file.filename }`))

        /** respuesta */
        return res.json({ success: 1, ube_id: data.ube_id, message: ube_id ? 'Ha editado exitosamente la cuenta.' : 'Ha registrado una Cuenta.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers