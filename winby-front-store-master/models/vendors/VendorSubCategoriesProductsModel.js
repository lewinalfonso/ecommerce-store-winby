const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const SubCategoryProductsModel = require('../categories/SubCategoryProductsModel')
const VendorCategoriesProductsModel = require('./VendorCategoriesProductsModel')

const VendorSubCategoryProductsModel = sequelize.define('vendorsubcategoryproducts', {
    vscp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    vcp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorCategoriesProductsModel,
            key: 'vcp_id'
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
    vscp_groPer: {
        type: Sequelize.FLOAT
    },
    vscp_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    vscp_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    vscp_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = VendorSubCategoryProductsModel