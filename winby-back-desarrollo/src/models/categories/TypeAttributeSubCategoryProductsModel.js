const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const AttributeSubCategoryProductsModel = require('./AttributeSubCategoryProductsModel')

const TypeAttributeSubCategoryProductsModel = sequelize.define('typeattributesubcategoryproducts', {
    tascp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
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
    tascp_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    tascp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    tascp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    tascp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = TypeAttributeSubCategoryProductsModel