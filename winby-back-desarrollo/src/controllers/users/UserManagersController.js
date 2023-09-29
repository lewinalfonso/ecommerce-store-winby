const controllers = {}
const { Op } = require('sequelize')
const { UpCrNotFind, deCode } = require('../../utils')
const { UserManagersModel, UsersModel, UserProfilesModel, TypeManagersModel, DepartmentsModel, CountriesModel } = require('../../models')

// busca todo los manager
controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { umState } = req.body
        /** Relacion de base de datos */

        /** verificando que parametro es para hacer la consulta */
        const data = await UserManagersModel.findAll({
            attributes: ['umId', 'uId', 'tmId', 'dId', 'cId', 'umState'],
            include: [
                { attributes: ['tmId', 'tmName'], model: TypeManagersModel },
                { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                { attributes: ['c_id', 'c_name'], model: CountriesModel },
                { attributes: ['u_id', 'u_email', 'u_phoNum'], model: UsersModel, include: [{ attributes: ['up_name', 'up_last', 'up_code'], model: UserProfilesModel }] }
            ],
            where: { umState: umState || { [Op.gte]: 0 } }
        })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })

        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// registra o actualiza un manager
controllers.register = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { umId, uId, tmId, dId, cId } = req.body

        // verifica si existe un gerente con el departamento
        if (dId) {
            const dataD = await UserManagersModel.findOne({ attributes: ['umId'], where: { dId: deCode(dId), uId: { [Op.ne]: deCode(uId) } } })
            if (dataD) return res.json({ success: 0, message: `No es posible ${umId ? 'cambiar el departamento del gerente' : 'registrar un nuevo gerente con el departamento'} por que se encuentra ocupado.` })
        }

        // verifica si existe un gerente con el pais
        if (cId) {
            const dataC = await UserManagersModel.findOne({ attributes: ['umId'], where: { cId: deCode(cId), uId: { [Op.ne]: deCode(uId) } } })
            if (dataC) return res.json({ success: 0, message: `No es posible ${umId ? 'cambiar el pais del gerente' : 'registrar un nuevo gerente con el pais'} por que se encuentra ocupado.` })
        }

        // verifica si existe el mundial
        if (!dId && !cId) {
            const dataDC = await UserManagersModel.findOne({ attributes: ['umId'], where: { dId: { [Op.is]: null }, cId: { [Op.is]: null }, uId: { [Op.ne]: deCode(uId) } } })
            if (dataDC) return res.json({ success: 0, message: `No es posible ${umId ? 'cambiar' : 'registrar'} al gerente en modo mundial por que se encuentra ocupado.` })
        }

        /** registrar Entidad Bancaria de Usuario */
        const data = await UpCrNotFind(UserManagersModel, { u_id: uId, tmId, dId, cId, umState: 1 }, false, !!uId && { id: 'uId', value: uId })

        /** respuesta */
        return res.json({ success: 1, umId: umId || data.umId, message: umId ? 'Ha editado exitosamente al manager.' : 'Ha registrado un nuevo manager.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

// desactiva el manager del usuario
controllers.delete = async (req, res) => {
    try {
        /** variables necesarias */
        const { umId } = req.body

        /** elimina la Entidad Bancaria del Usuario */
        UserManagersModel.update({ umState: 0 }, { where: { umId: deCode(umId) } })

        /** respuesta */
        return res.json({ success: 1, message: 'Se ha eliminado al manager.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers