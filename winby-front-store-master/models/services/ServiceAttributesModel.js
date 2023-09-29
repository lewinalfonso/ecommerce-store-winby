const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')
const ServicesModel = require('./ServicesModel')
const AttributeSubCategoryServicesModel = require('../categories/AttributeSubCategoryServicesModel')

const ServiceAttributesModel = sequelize.define('serviceattributes', {
    sa_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    s_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ServicesModel,
            key: 's_id'
        },
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
    sa_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sa_value: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    sa_priority: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    sa_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    sa_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    sa_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = ServiceAttributesModel