'use strict'

const controllers = {}
const GeneralBannersModel = require('../../models/info/GeneralBannersModel')
const fse = require('fs-extra')
const path = require('path')
const { deCode } = require('../../utils')
const { Op } = require('sequelize')

/**
 * Registra un banner
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.register = async (req, res) => {
    try {
        const { typeBanner } = req.body

        if (!req.files?.length) return res.json({ success: 0, message: 'No se ha recibido ninguna imagen.' })
        const data = await GeneralBannersModel.create({ gbImg: req.files[0].filename, gbImgMB: req.files[1]?.filename ? req.files[1]?.filename : null, gbType: typeBanner})

        if (!data) return res.json({ success: 0, message: 'No se ha podido realizar la acción, por favor intente nuevamente.' })

        await fse.move(req.files[0].path, path.join(__dirname, `../../../public/banners/${ data.gbId }/${ req.files[0].filename }`))
        if (req.files[1]?.filename) await fse.move(req.files[1].path, path.join(__dirname, `../../../public/banners/${ data.gbId }/${ req.files[1].filename }`))

        return res.json({ success: 1, message: 'Se ha registrado el banner.', data })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Obtiene todos los banners
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.getAll = async (req, res) => {
    try {
        const { gbType } = req.body
        const dataGB = await GeneralBannersModel.findAll({ attributes: ['gbId', 'gbImg', 'gbImgMB', 'gbType', 'gbPriority'], where: { gbType: gbType || { [Op.gt]: 0 }, gbState: 1 }, order: [['gbPriority', 'ASC']] })
        if (dataGB.length) return res.json({ data: dataGB, success: 1 })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Elimina un banner
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.delete = async (req, res) => {
    try {
        const { gbId } = req.body
        await GeneralBannersModel.destroy({ where: { gbId: deCode(gbId) } })
        return res.json({ success: 1, message: 'Se ha eliminado el banner.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

/**
 * Organiza los banners
 * @param {Object} req Objeto con la información de la petición
 * @param {Object} res Objeto de respuesta de la petición
 * @version 1.0
 * @return {Object} Objeto con el estado de la petición
 */
controllers.organized = async (req, res) => {
    try {
        const { banners } = req.body
        for (let i = 0; i < banners.length; i++) {
            const { gbId, gbType, gbPriority } = banners[i]
            await GeneralBannersModel.update({ gbType, gbPriority }, { where: { gbId: deCode(gbId) } })
        }
        return res.json({ success: 1, message: 'Se han actualizado los banners.' })
    } catch (error) {
        return res.status(500).json({ success: 0, error: true, message: 'Algo ha salido mal, intenta nuevamente' })
    }
}

module.exports = controllers