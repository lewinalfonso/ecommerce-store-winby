const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const InvoiceServiceCalendarsModel = require('./InvoiceServiceCalendarsModel')

const ServiceCalendarHoursModel = sequelize.define('invoiceservicecalendarhours', {
    isch_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    isc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceServiceCalendarsModel,
            key: 'isc_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    isch_value: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    isch_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isch_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    isch_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ServiceCalendarHoursModel