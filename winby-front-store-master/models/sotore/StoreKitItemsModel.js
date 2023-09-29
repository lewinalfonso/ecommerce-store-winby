'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const StoreKitsModel = require('./StoreKitsModel')
const ProductsModel = require('../products/ProductsModel')
const ServicesModel = require('../services/ServicesModel')
const { enCode, validations, validationID, validationMM } = require('../../utils')

const StoreKitItemsModel = sequelize.define('storeKitItems', {
    skiId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    skId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: StoreKitsModel,
            key: 'skId'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('skId', validationID(x)) }
    },
    pId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ProductsModel,
            key: 'p_id'
        },
        get (x) { return x ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('pId', validationID(x, false)) }
    },
    sId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ServicesModel,
            key: 's_id'
        },
        get (x) { return x ? enCode(this.getDataValue(x)) : null },
        set (x) { this.setDataValue('sId', validationID(x, false)) }
    },
    skiState: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isValidate (value) {
                validations(value, false, true, 1, 2, false, true)
                validationMM(value, 0, 99)
            }
        }
    },
    skiDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    skiDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = StoreKitItemsModel