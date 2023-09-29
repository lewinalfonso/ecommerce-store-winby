const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const InvoicesModel = require('../invoice/InvoicesModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserNotificationsModel = sequelize.define('usernotifications', {
    un_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    u_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'u_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    i_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: InvoicesModel,
            key: 'i_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    un_title: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    un_message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    un_type: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    un_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    un_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    un_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserNotificationsModel