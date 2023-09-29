const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../utils')

const TransportersModel = sequelize.define('transporters', {
    tId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    tName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tFletMinNal: {
        type: Sequelize.INTEGER(20),
        allowNull: false

    },
    tFletMinLoc: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    tDescFlet: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    tTypeForm: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    tState: {
        type: Sequelize.INTEGER(20),
        allowNull: false
    },
    tDatCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    tDatMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = TransportersModel