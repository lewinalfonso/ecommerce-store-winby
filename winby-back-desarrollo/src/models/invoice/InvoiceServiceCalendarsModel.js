const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const InvoiceServicesModel = require('./InvoiceServicesModel')

const ServiceCalendarModel = sequelize.define('invoiceservicecalendar', {
    isc_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    is_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceServicesModel,
            key: 'is_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    isc_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    isc_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isc_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isc_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    isc_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ServiceCalendarModel