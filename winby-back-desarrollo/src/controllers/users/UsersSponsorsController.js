const controllers = {}
const UsersModel = require('../../models/users/UsersModel')
const UserSponsorsModel = require('../../models/users/UserSponsorsModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const { Op } = require('sequelize')
const { deCode, linkBelongsTo, structureParams, validateParams } = require('../../utils')
const CountriesModel = require('../../models/info/CountriesModel')
const UserPointsModel = require('../../models/users/UserPointsModel')
const UserMembersModel = require('../../models/users/UserMembersModel')

/** Obtiene todos los invitados (Directos) */
controllers.getAllSponsorGuests = async (req, res) => {
    try {
        /** Se reciben las variables */
        const { u_id } = req.body
        /** Se verifican los los parámetros */
        validateParams([structureParams('u_id', u_id, true)])
        /** Relación de tablas */
        linkBelongsTo(UserProfilesModel, CountriesModel, 'c_id', 'c_id')
        linkBelongsTo(UserSponsorsModel, UserProfilesModel, 'u_id', 'u_id')
        linkBelongsTo(UserSponsorsModel, UserMembersModel, 'u_id', 'u_id')
        linkBelongsTo(UserSponsorsModel, UserPointsModel, 'u_id', 'u_id')
        linkBelongsTo(UserSponsorsModel, UsersModel, 'u_id', 'u_id')

        /** Obtener el código del usuario */
        const upData = await UserProfilesModel.findOne({
            attributes: ['up_code'],
            where: { u_id: deCode(u_id) }
        })
        if (!upData) return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })

        /** Obteniendo todos los invitados */
        const uDirects = await UserSponsorsModel.findAll({
            attributes: ['u_id'],
            include: [
                {
                    attributes: ['up_name', 'up_last', 'up_code'],
                    model: UserProfilesModel,
                    include: [{ attributes: ['c_id', 'c_name'], model: CountriesModel }],
                    where: { up_name: { [Op.not]: null }, up_last: { [Op.not]: null } }
                },
                { attributes: ['up_point'], model: UserPointsModel },
                { attributes: ['u_email', 'u_phoNum'], model: UsersModel },
                { attributes: ['um_id', 'um_datExp'], model: UserMembersModel }
            ],
            where: { us_code: upData.up_code }
        })
        if (uDirects.length) return res.json({ success: 1, data: uDirects })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers