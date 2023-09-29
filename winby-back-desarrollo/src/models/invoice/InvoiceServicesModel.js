const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validationID } = require('../../utils')
const InvoicesModel = require('./InvoicesModel')
const ServicesModel = require('../services/ServicesModel')
const VendorsModel = require('../vendors/VendorsModel')
const InvoiceVendorsModel = require('./InvoiceVendorsModel')

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
    iv_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoiceVendorsModel,
            key: 'iv_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('iv_id', validationID(x)) }
    },
    is_sku: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    is_name: {
        type: Sequelize.STRING(255),
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
    is_taxGat: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    is_groPer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    is_attr: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    is_typeVen: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
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