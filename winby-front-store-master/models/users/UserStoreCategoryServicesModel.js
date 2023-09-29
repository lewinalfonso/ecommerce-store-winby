const Sequelize = require('sequelize')
const connect = require('../database')
const UsersModel = require('./UsersModel')
const CategoryServicesModel = require('../categories/CategoryServicesModel')
const { enCode } = require('../../utils')
const sequelize = connect()

const UserStoreCategoryServicesModel = sequelize.define('userstorecategoryservices', {
    uscs_id: {
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
    cs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: CategoryServicesModel,
            key: 'cs_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    uscs_priority: {
        type: Sequelize.SMALLINT(6),
        allowNull: true,
        defaultValue: 1
    },
    uscs_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    uscs_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    uscs_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = UserStoreCategoryServicesModel