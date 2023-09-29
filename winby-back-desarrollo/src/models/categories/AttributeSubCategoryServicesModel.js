const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const SubCategoryServicesModel = require('./SubCategoryServicesModel')
const TypeAttributesModel = require('../info/TypeAttributesModel')

const AttributeSubCategoryServicesModel = sequelize.define('attributesubcategoryservices', {
    ascs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    ascs_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    ascs_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ascs_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    ascs_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    ascs_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = AttributeSubCategoryServicesModel