const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const SubCategoryServicesModel = require('../categories/SubCategoryServicesModel')
const VendorCategoriesServicesModel = require('./VendorCategoriesServicesModel')

const VendorSubCategoriesServicesModel = sequelize.define('vendorsubcategoryservices', {
    vscs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    vcs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: VendorCategoriesServicesModel,
            key: 'vcs_id'
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
    vscs_groPer: {
        type: Sequelize.FLOAT
    },
    vscs_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    vscs_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    vscs_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = VendorSubCategoriesServicesModel