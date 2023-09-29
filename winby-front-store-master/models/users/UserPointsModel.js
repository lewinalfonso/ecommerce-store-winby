const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserPointsModel = sequelize.define('userpoints', {
    up_id: {
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
        }
    },
    up_point: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    up_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    up_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    up_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = UserPointsModel