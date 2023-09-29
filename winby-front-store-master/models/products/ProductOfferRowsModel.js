'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validations, validationMM } = require('../../utils')

const ProductOfferRows = sequelize.define('productOfferRows', {
    porId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    porName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    porPriority: {
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
    porState: {
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
    porDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    porDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamp: false
})

module.exports = ProductOfferRows