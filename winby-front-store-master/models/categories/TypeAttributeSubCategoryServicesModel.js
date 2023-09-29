const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const AttributeSubCategoryServicesModel = require('./AttributeSubCategoryServicesModel')

const TypeAttributeSubCategoryServicesModel = sequelize.define('typeattributesubcategoryservices', {
    tascs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    ascs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: AttributeSubCategoryServicesModel,
            key: 'ascs_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    tascs_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    tascs_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    tascs_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    tascs_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = TypeAttributeSubCategoryServicesModel