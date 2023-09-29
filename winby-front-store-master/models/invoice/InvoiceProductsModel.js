const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const InvoicesModel = require('./InvoicesModel')
const ProductsModel = require('../products/ProductsModel')
const VendorsModel = require('../vendors/VendorsModel')

const InvoiceProductsModel = sequelize.define('invoiceproducts', {
    ip_id: {
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
    p_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ProductsModel,
            key: 'p_id'
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
    ip_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    ip_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ip_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ip_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ip_total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ip_groPer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    ip_franchise: {
        type: Sequelize.INTEGER
    },
    ip_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ip_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ip_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = InvoiceProductsModel