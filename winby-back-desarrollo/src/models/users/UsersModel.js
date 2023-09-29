const Sequelize = require('sequelize')
const connect = require('../database')
const UserChargesModel = require('../info/UserChargesModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UsersModel = sequelize.define('users', {
    u_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    u_phoNum: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    u_email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    u_pass: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    u_token: {
        type: Sequelize.STRING(100),
    },
    uc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UserChargesModel,
            key: 'uc_id'
        }
    },
    u_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    u_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    u_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
},{
    timestamps: false,
})

module.exports = UsersModel