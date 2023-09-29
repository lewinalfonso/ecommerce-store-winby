'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validations, validationMM } = require('../../utils')

const GeneralBannersModel = sequelize.define('generalBanners', {
    gbId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    gbImg: {
        type: Sequelize.STRING,
        allowNull: true
    },
    gbImgMB: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    gbType: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        get (x) { return parseInt(this.getDataValue(x)) },
        validate: {
            isValidate (value) {
                validations(value, false, true, 1, 2, false, true)
                validationMM(value, 0, 99)
            }
        }
    },
    gbPriority: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            isValidate (value) {
                validations(value, false, true, 1, 6, false, true)
                validationMM(value, 0, 999999)
            }
        }
    },
    gbState: {
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
    gbDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    gbDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = GeneralBannersModel