'use strict'
const DeliveryReportsModel = require('../../models/transporters/DeliveryReportsModel')
const TransportersModel = require('../../models/transporters/TransportersModel')
const InvoiceVendorsModel = require('../../models/invoice/InvoiceVendorsModel')
const InvoiceVendorStatusModel = require('../../models/invoice/InvoiceVendorStatusModel')
const InvoicesModel = require('../../models/invoice/InvoicesModel')
const InvoiceClientsModel = require('../../models/invoice/InvoiceClientsModel')
const VendorsModel = require('../../models/vendors/VendorsModel')
const DepartmentsModel = require('../../models/info/DepartmentsModel')
const MunicipalitiesModel = require('../../models/info/MunicipalitiesModel')
const VendorsLocalsModel = require('../../models/vendors/VendorsLocalsModel')
const InvoiceProductsModel = require('../../models/invoice/InvoiceProductsModel')

const { Op } = require('sequelize')
const { linkBelongsTo } = require('../../utils')
const { errorLogMail } = require('../../utils/logMailer')
const { Parser } = require('json2csv')
const { ProductsModel } = require('../../models')

const controllers = {}

const downloadResource = (res, filename, fields, data) => {
    const json2csv = new Parser({ fields })
    const csv = json2csv.parse(data)
    res.header('Content-Type', 'text/csv')
    res.attachment(filename)
    return res.send(csv)
}

// class FlatFile {
//     constructor (name, options = {}) {
//         this.FILE_NAME = name
//         this.FILE_TYPE = options.fileType || 1
//     }

//     async _getInvoices() {
//         // linkBelongsTo(DeliveryReportsModel, )
//     }

//     async generate (options) {
//         switch (this.FILE_TYPE) {
//         case 1:
//             // Code
//             break
//         case 6:
//             // Code
//             break
//         }
//         return this
//     }
// }

/**
 * Genera un reporte de envíos de transportadoras
 * @param {object} req Información de la solicitud
 * @param {object} res Información de respuesta
 * @returns {JSON} Respuesta de la solicitud
 * @author Wow Desarrollos
 */
controllers.generateReport = async (req, res) => {
    try {
        const { dateStart, dateEnd, type } = req.body

        linkBelongsTo(InvoiceVendorsModel, VendorsLocalsModel, 'vl_id', 'vl_id')
        linkBelongsTo(InvoiceProductsModel, ProductsModel, 'p_id', 'p_id')

        // const file = new FlatFile('asdfsdf').generate()

        const data = await DeliveryReportsModel.findAll({
            attributes: ['drId', 'drState'],
            include: [
                { attributes: ['tId', 'tName'], model: TransportersModel },
                {
                    attributes: ['iv_location', 'iv_state', 'iv_delivery'],
                    include: [
                        {
                            attributes: ['i_consecutive'],
                            include: [{
                                attributes: ['ic_ideNum', 'ic_name', 'ic_last', 'ic_phone', 'ic_location'],
                                include: [{ attributes: ['d_id', 'd_name'], model: DepartmentsModel }, { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel }],
                                model: InvoiceClientsModel
                            }],
                            model: InvoicesModel
                        },
                        { attributes: ['v_skuPrefix', 'v_name', 'v_last', 'v_alias'], model: VendorsModel },
                        { attributes: ['vl_name', 'vl_phoMob', 'vl_landline'], model: VendorsLocalsModel },
                        { attributes: ['d_id', 'd_name'], model: DepartmentsModel },
                        { attributes: ['m_id', 'm_name'], model: MunicipalitiesModel },
                        {
                            attributes: ['ivs_id', 'ivs_type', 'ivs_date'],
                            model: InvoiceVendorStatusModel,
                            where: { ivs_type: 3, ivs_date: { ...(dateStart && !dateEnd ? { [Op.gte]: dateStart } : (dateStart && dateEnd ? { [Op.between]: [dateStart, `${ dateEnd } 23:59:59`] } : { [Op.ne]: null })) } }
                        },
                        {
                            attributes: ['ip_id', 'ip_price', 'ip_total'],
                            include: [{ attributes: ['p_width', 'p_height', 'p_length', 'p_weight'], model: ProductsModel }],
                            model: InvoiceProductsModel,
                            where: { ip_franchise: { [Op.or]: [null, 0] } },
                            required: true
                        }
                    ],
                    model: InvoiceVendorsModel,
                    where: { iv_state: 3 },
                    required: true
                }
            ],
            where: { drState: 2 }
        })

        if (data.length) return res.json({ success: 1, data })
        return res.json({ success: 0, message: 'No se ha encontrado ningún resultado.' })
    } catch (error) {
        errorLogMail(error, req)
        return res.status(500).json({ success: 0, error: true, message: 'Se ha presentado un error, por favor intente nuevamente.' })
    }
}

module.exports = controllers