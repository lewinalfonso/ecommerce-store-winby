const controllers = {}
const UsersModel = require('../../models/users/UsersModel')
const { deCode, linkBelongsTo, transporter } = require('../../utils')
const bcrypt = require('bcrypt')
const UserProfilesModel = require('../../models/users/UserProfilesModel')
const RecoverAccountTemplate = require('../../templaste/RecoverAccount')

const generateCode = async () => {
    let u_token = Math.round(Math.random() * (999999 - 100000) + 100000)
    const data = await UsersModel.findOne({ attributes: ['u_token'], where: { u_token } })
    if (data) await generateCode()
    return u_token
}

/**
 * Crea una solicitud para recuperación de cotraseña
 * @param {object} req Objeto con la información de la petición
 * @param {object} res Objeto con la información de respuesta
 * @return {object} Objeto con la respuesta de la solicitud
 */
controllers.createRecover = async (req, res) => {
    try {
        const { u_email, u_phoNum } = req.body
        const where = u_email ? { u_email } : { u_phoNum }

        linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')

        // Buscar el id del usuario
        const uData = await UsersModel.findOne({ attributes: ['u_id', 'u_email', 'u_phoNum'], include: [{ attributes: ['up_name', 'up_last'], model: UserProfilesModel }], where: { ...where, u_state: 1 } })
        if (!uData) return res.json({ success: 0, message: `El ${ u_email ? 'email' : 'número de teléfono' } ${ u_email || u_phoNum } no se encuentra registrado.` })

        // Crerar el token o codigo de recuperación
        let u_token = await generateCode()

        // Insertar el token al usuario
        const data = await UsersModel.update({ u_token }, { where: { u_id: deCode(uData.u_id) } })
        // Eviar el email
        if (data) {
            const mailer = transporter()
            mailer.sendMail({
                from: 'Recuperación de cuenta <no-reply@winby.co>',
                to: uData?.u_email,
                subject: 'Código de verificación.',
                html: RecoverAccountTemplate({ username: '', code: u_token })
            })
        }
        if (data) return res.json({ success: 1, message: 'Operación exitosa.' })
        return res.json({ success: 0, message: 'No se ha podido realizar la operaciónm, por favor intente nuevamente.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

controllers.validateToken = async (req, res) => {
    try {
        const { u_email, u_phoNum, u_token } = req.body
        const where = u_email ? { u_email } : { u_phoNum }

        // Buscar al usuario
        const uData = await UsersModel.findOne({ attributes: ['u_token'], where: { ...where, u_state: 1 } })
        if (!uData) return res.json({ success: 0, message: `El ${ u_email ? 'email' : 'número de teléfono' } ${ u_email || u_phoNum } no se encuentra registrado.` })

        // Verificar el token
        if (uData.u_token === u_token) return res.json({ success: 1, message: 'El código es valido.' })

        return res.json({ success: 0, message: 'El código ingresado no es valido.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

controllers.recoverAccount = async (req, res) => {
    try {
        const { u_email, u_phoNum, u_token, u_pass } = req.body
        const where = u_email ? { u_email } : { u_phoNum }

        // Buscar al usuario
        const uData = await UsersModel.findOne({ attributes: ['u_id', 'u_token'], where: { ...where, u_token, u_state: 1 } })
        if (!uData) return res.json({ success: 0, message: `El ${ u_email ? 'email' : 'número de teléfono' } ${ u_email || u_phoNum } no se encuentra registrado.` })

        // Encriptar contraseña
        const newPass = await bcrypt.hashSync(u_pass, 10)

        // Actualizar la contraseña y borrar el token
        const data = await UsersModel.update({ u_pass: newPass, u_token: '' }, { where: { u_id: deCode(uData.u_id) } })

        return res.json({ success: !!data, message: data ? 'Se ha actualizado la contrseña correctamente.' : 'No se ha podido realizar la operación.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers