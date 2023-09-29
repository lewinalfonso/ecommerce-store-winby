const Sequelize = require('sequelize'),
    connect = require('../database'),
    UsersModel = require('./UsersModel'),
    ServicesModel = require('../services/ServicesModel'),
    { enCode } = require('../../utils'),
    sequelize = connect()

const UserStoreServicesModel = sequelize.define('userstoreservices', {
    uss_id: {
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
    s_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: ServicesModel,
            key: 's_id'
        },
        get (x) { return this.getDataValue(x) ? enCode(this.getDataValue(x)) : null }
    },
    uss_row: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 1
    },
    uss_priority: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: 1
    },
    uss_state: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    uss_datCre: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    uss_datMod: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserStoreServicesModel