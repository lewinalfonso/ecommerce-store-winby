const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const SubCategoryProductsModel = require('./SubCategoryProductsModel')
const TypeAttributesModel = require('../info/TypeAttributesModel')

const AttributeSubCategoryProductsModel = sequelize.define('attributesubcategoryproducts', {
    ascp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    ta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: TypeAttributesModel,
            key: 'ta_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ascp_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ascp_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ascp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ascp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ascp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = AttributeSubCategoryProductsModel