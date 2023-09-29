const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const SubCategoryProductsModel = require('../categories/SubCategoryProductsModel')
const VendorsModel = require('../vendors/VendorsModel')

const ProductsModel = sequelize.define('products', {
    p_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    scp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: SubCategoryProductsModel,
            key: 'scp_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    p_sku: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true
    },
    p_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    p_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    p_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p_width: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // Alto
    p_height: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // Largo
    p_length: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // Peso
    p_weight: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    p_taxGat: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    p_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p_available: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p_groPer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    p_views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    p_sellers: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p_franchise: {
        type: Sequelize.INTEGER
    },
    p_monFra: {
        type: Sequelize.SMALLINT
    },
    p_outstanding: {
        type: Sequelize.INTEGER
    },
    p_cover: {
        type: Sequelize.STRING(50)
    },
    p_delivery: {
        type: Sequelize.SMALLINT
    },
    p_typeVen: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
    },
    p_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    p_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    p_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ProductsModel