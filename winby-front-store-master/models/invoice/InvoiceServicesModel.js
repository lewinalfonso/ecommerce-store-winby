const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const InvoicesModel = require('./InvoicesModel')
const ServicesModel = require('../services/ServicesModel')
const VendorsModel = require('../vendors/VendorsModel')

const InvoiceServicesModel = sequelize.define('invoiceservices', {
    is_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    i_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoicesModel,
            key: 'i_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    s_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ServicesModel,
            key: 's_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    v_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorsModel,
            key: 'v_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    is_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    is_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    is_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_groPer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    is_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    is_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = InvoiceServicesModel