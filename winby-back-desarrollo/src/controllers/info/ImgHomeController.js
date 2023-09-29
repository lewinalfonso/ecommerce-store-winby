const controllers = {}
const fse = require('fs-extra')
const path = require('path')
const ImgHomeModel = require('../../models/info/ImgHomeModel')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

controllers.getAll = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo parametros */
        const { ih_state } = req.body

        /** verificando que parametro es para hacer la consulta */
        const data = await ImgHomeModel.findAll({ attributes: ['ih_id', 'ih_name', 'ih_url', 'ih_type', 'ih_state'], where: { ih_state: ih_state || { [Op.gte]: 0 } } })

        /** respuesta */
        if (data.length) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

controllers.register = async (req, res) => {
    try {
        /** creacion de variables, y recibiendo los datos */
        const { ih_id, ih_url, ih_name } = req.body

        /** Guardar el registro */
        ImgHomeModel.update({ ih_name: (req.file && req.file.filename) || ih_name, ih_url }, { where: { ih_id: deCode(ih_id) } })
        req.file && fse.move(req.file.path, path.join(__dirname, `../../../public/home/${ ih_id }/${ req.file.filename }`))

        /** respuesta */
        return res.json({ success: 1, message: 'Ha registrado una imagen y URL con éxito.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error, message: 'Ha ocurrido un problema intente nuevamente mas tarde.' })
    }
}

module.exports = controllers