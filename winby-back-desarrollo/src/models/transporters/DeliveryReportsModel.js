const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validationID } = require('../../utils')
const TransportersModel = require('./TransportersModel')
const InvoiceVendorsModel = require('../invoice/InvoiceVendorsModel')

const DeliveryReportsModel = sequelize.define('deliveryReports', {
    drId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    tId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TransportersModel,
            key: 'tId'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('tId', validationID(x, false)) }
    },
    iv_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceVendorsModel,
            key: 'iv_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('iv_id', validationID(x, false)) }
    },
    drState: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 2
    },
    drDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    drDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = DeliveryReportsModel