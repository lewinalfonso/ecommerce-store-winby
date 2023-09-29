'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode, validations, validationMM, validationID } = require('../../utils')
const UsersModel = require('../users/UsersModel')

const StoreKitsModel = sequelize.define('storeKits', {
    skId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    uId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('uId', validationID(x)) }
    },
    skName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    skState: {
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
    skDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    skDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = StoreKitsModel