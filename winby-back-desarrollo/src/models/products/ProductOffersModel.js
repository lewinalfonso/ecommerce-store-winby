'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const ProductsModel = require('./ProductsModel')
const ProductOfferRowsModel = require('./ProductOfferRowsModel')
const { enCode, validations, validationID, validationMM } = require('../../utils')

const ProductOffersModel = sequelize.define('productOffers', {
    poId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    porId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ProductOfferRowsModel,
            key: 'porId'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('porId', validationID(x)) }
    },
    pId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ProductsModel,
            key: 'p_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('pId', validationID(x)) }
    },
    poPriority: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isValidate (value) {
                validations(value, false, false, 0, 0, false, true)
            }
        }
    },
    poState: {
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
    poDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    poDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = ProductOffersModel