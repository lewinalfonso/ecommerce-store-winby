const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('../users/UsersModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const AdminMoneysModel = sequelize.define('adminmoneys', {
    am_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    am_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    am_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    am_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    am_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = AdminMoneysModel