const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const VendorsModel = require('../vendors/VendorsModel')
const SubCategoryServicesModel = require('../categories/SubCategoryServicesModel')

const ServicesModel = sequelize.define('services', {
    s_id: {
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
    scs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: SubCategoryServicesModel,
            key: 'scs_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    s_sku: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true
    },
    s_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    s_description: {
        type: Sequelize.STRING(5000),
        allowNull: false
    },
    s_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    s_taxGat: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    s_groPer: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    s_views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    s_sellers: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    s_franchise: {
        type: Sequelize.INTEGER
    },
    s_outstanding: {
        type: Sequelize.INTEGER
    },
    s_delivery: {
        type: Sequelize.SMALLINT
    },
    s_typeVen: {
        type: Sequelize.SMALLINT,
        defaultValue: 1
    },
    s_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    s_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    s_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ServicesModel