const controllers = {}
const UsersModel = require('../../models/users/UsersModel')
const UserMoneysModel = require('../../models/users/UserMoneysModel')
const FactureFranchisesModel = require('../../models/facture/FactureFranchisesModel')
const InfoSelesModel = require('../../models/info/InfoSelesModel')
const PointReportsModel = require('../../models/users/PointReportsModel')
const UserPointsModel = require('../../models/users/UserPointsModel')

const { Op } = require('sequelize')
const { codeRed, deCode, linkBelongsTo, updateOrCreate } = require('../../utils')
const UserSponsorsModel = require('../../models/users/UserSponsorsModel')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const UserMembersModel = require('../../models/users/UserMembersModel')
const MoneyReportsModel = require('../../models/users/MoneyReportsModel')

/** registra una factura */
controllers.register = async (req, res) => {
    /** variables necesarias */
    const { u_id, ff_amount } = req.body; error = false

    /** registra la factura */
    const dataFF = await updateOrCreate(FactureFranchisesModel, {u_id: deCode(u_id), ff_amount, ff_date: new Date(), ff_state: 2}, {u_id: deCode(u_id), ff_state: 2}).catch(x => error = true)

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else
        return res.json({ success: 1, ff_id: dataFF.ff_id, message: 'Factura creada con éxito.' })
}

/** registra una factura */
controllers.confirm = async (req, res) => {
    /** variables necesarias */
    const { ff_id } = req.body; error = false

    /** relaciones de base de datos */
    linkBelongsTo(FactureFranchisesModel, UsersModel, 'u_id', 'u_id')
    linkBelongsTo(UsersModel, UserMembersModel, 'u_id', 'u_id')
    linkBelongsTo(UsersModel, UserSponsorsModel, 'u_id', 'u_id')
    linkBelongsTo(UserSponsorsModel, UserProfilesModel, 'up_code', 'us_code')
    linkBelongsTo(UserProfilesModel, UserPointsModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, UserMoneysModel, 'u_id', 'u_id')

    /** busca la factura */
    const dataFF = await FactureFranchisesModel.findOne({
        attributes: ['ff_amount'],
        include: [{ attributes: ['u_id'], model: UsersModel,
            include: [{ attributes: ['um_id', 'um_datExp'], model: UserMembersModel },
                {attributes: ['us_id'], model: UserSponsorsModel, 
                    include: [{ attributes: ['u_id'], model: UserProfilesModel, 
                        include: [
                            { attributes: ['up_id', 'up_point'], model: UserPointsModel },
                            { attributes: ['um_id', 'um_money'], model: UserMoneysModel }
                        ]
                    }
                ]
            }]
        }],
        where: { ff_id: deCode(ff_id), ff_state: 2 }
    })

    if (!!dataFF && !error) {
        /** busca la info de los % */
        const dataIS = await InfoSelesModel.findOne({ attributes: ['is_por', 'is_porSelFra', 'is_porPoiFra', 'is_porWinFra'], where: { is_state: 1 } }).catch(x => error = true)

        /** actualiza los puntos de la persona que paga */
        await UserPointsModel.update({ up_point: (((dataFF.ff_amount * dataIS.is_porPoiFra) * dataIS.is_por) + dataFF.user.usersponsor.userprofile.userpoint.up_point) }, { where: { up_id: deCode(dataFF.user.usersponsor.userprofile.userpoint.up_id) } }).catch(x => error = true)

        /** registra el reporte de los puntos */
        await PointReportsModel.create({ u_id: deCode(dataFF.user.usersponsor.userprofile.u_id), pr_point: ((dataFF.ff_amount * dataIS.is_porPoiFra) * dataIS.is_por), pr_state: 1 }).catch(x => error = true)

        /** actualiza el dinero de quien lo invito */
        await UserMoneysModel.update({ um_money: ((dataFF.ff_amount * dataIS.is_porSelFra) + dataFF.user.usersponsor.userprofile.usermoney.um_money) }, { where: { um_id: deCode(dataFF.user.usersponsor.userprofile.usermoney.um_id) } }).catch(x => error = true)

        /** Registra el reporte del dinero */
        await MoneyReportsModel.create({ u_id: deCode(dataFF.user.usersponsor.userprofile.u_id), mr_money: (dataFF.ff_amount * dataIS.is_porSelFra), mr_type: 2, mr_state: 1}).catch(x => error = true)

        /** le agrega un año a la fecha */
        let dat = new Date(), datExp = dat >= dataFF.user.usermember.um_datExp ? dat : new Date(dataFF.user.usermember.um_datExp).catch(x => error = true)
        datExp = datExp.setFullYear(datExp.getFullYear()+1)
        await UserMembersModel.update({ um_datExp: new Date(datExp) }, { where: { um_id: deCode(dataFF.user.usermember.um_id) } }).catch(x => error = true)

        /** actualiza la factura */
        await FactureFranchisesModel.update({ ff_epayco: '123123', ff_state: 1 }, { where: { ff_id: deCode(ff_id), ff_state: 2 } }).catch(x => error = true)

        if (!error) return res.json({ success: 1, message: 'La factura ha sido cancelada con exito' })
    }

    /** respuesta */
    if (error)
        return res.json({ success: 0, error })
    else
        return res.json({ success: 0, message: 'La factura no existe.' })
}

module.exports = controllers