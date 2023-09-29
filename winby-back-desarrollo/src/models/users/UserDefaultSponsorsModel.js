'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()

const UserProfilesModel = require('./UserProfilesModel')

const { enCode, validationID } = require('../../utils')

const UserDefaultSponsorsModel = sequelize.define('userDefaultSponsors', {
    udsId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    up_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UserProfilesModel,
            key: 'up_id'
        },
        get (x) { return enCode(this.getDataValue(x)) },
        set (x) { this.setDataValue('up_id', validationID(x, false)) }
    },
    udsState: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    udsDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    udsDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserDefaultSponsorsModel