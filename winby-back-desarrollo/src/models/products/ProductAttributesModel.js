const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const ProductsModel = require('./ProductsModel')
const AttributeSubCategoryProductsModel = require('../categories/AttributeSubCategoryProductsModel')

const ProductAttributesModel = sequelize.define('productattributes', {
    pa_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        }
    },
    ascp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: AttributeSubCategoryProductsModel,
            key: 'ascp_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    pa_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    pa_value: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pa_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    pa_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    pa_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    pa_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ProductAttributesModel